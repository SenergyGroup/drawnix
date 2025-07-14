// src/pages/api/request-pdf.ts
export const prerender = false;

import type { APIRoute } from 'astro';
import { Resend } from 'resend';

// ---- ENV VARS ----
const resendApiKey = import.meta.env.RESEND_API_KEY;
const emailFromAddress = import.meta.env.EMAIL_FROM_ADDRESS;
const pdfFileNameFromEnv = "pdf/Digital Archetypes.pdf";
const mailerLiteApiKey = import.meta.env.MAILERLITE_API_KEY; // For MailerLite

// Initial console errors for critical missing keys
if (!resendApiKey) {
  console.error("CRITICAL: RESEND_API_KEY is not set.");
}
if (!emailFromAddress) {
  console.error("CRITICAL: EMAIL_FROM_ADDRESS is not set.");
}
if (!mailerLiteApiKey) {
  console.warn("WARNING: MAILERLITE_API_KEY is not set. MailerLite integration will be skipped if consent is given.");
}

/* ---------- helpers ---------- */
const resend = new Resend(resendApiKey); // Initialize Resend only if key exists

// Basic email validation (from your current code)
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/* ---------- handler ---------- */
export const POST: APIRoute = async ({ request, url }) => {
  /* ----- basic config checks ----- */
  if (!resendApiKey || !emailFromAddress) {
    console.error('Server configuration error: RESEND_API_KEY or EMAIL_FROM_ADDRESS missing.');
    return new Response(
      JSON.stringify({ message: 'Server configuration error. Please check server logs.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  let email: string;
  let archetypeResult: string;
  let consent: boolean;

  try {
    const data = await request.json();
    email = data.email;
    archetypeResult = data.archetypeResult || "Your Archetype";
    consent = data.consent === true; // Ensure it's explicitly true

  } catch (e) {
    console.error("Error parsing request body:", e);
    return new Response(
      JSON.stringify({ message: 'Invalid request body. Expected JSON.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  if (!email || !isValidEmail(email)) {
    return new Response(
      JSON.stringify({ message: 'Invalid email address provided.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  /* ----- build PDF link (using concise version from ChatGPT, adapted from your logic) ----- */
  const siteUrl = import.meta.env.SITE_URL || url.origin;
  const pdfUrl  =
    pdfFileNameFromEnv?.match(/^https?:\/\//)
      ? pdfFileNameFromEnv
      : `${siteUrl.replace(/\/$/, '')}/${(pdfFileNameFromEnv || 'Drawnix_Archetype_Full_Guide.pdf').replace(/^\//, '')}`;

  console.log(`Attempting to send PDF to ${email} for archetype ${archetypeResult}. PDF URL: ${pdfUrl}. Consent: ${consent}`);

  try {
    /* ----- 1 – send PDF instantly via Resend ----- */
    const { data: sendData, error: resendError } = await resend.emails.send({
      from: `Digital Archetypes <${emailFromAddress}>`,
      to: [email],
      subject: `Your Digital Archetype Guide: ${archetypeResult}`,
      html: `
        <h1>Here's your Digital Archetype Guide!</h1>
        <p>Thank you for discovering your archetype. We hope this guide helps you on your digital building journey.</p>
        <p>You identified as: <strong>${archetypeResult}</strong></p>
        <p>Click the link below to download your full PDF guide:</p>
        <p><a href="${pdfUrl}" target="_blank" style="display:inline-block;padding:10px 20px;background-color:#007bff;color:#ffffff;text-decoration:none;border-radius:5px;">Download Your PDF Guide</a></p>
        <p>If the button doesn't work, copy and paste this link into your browser: ${pdfUrl}</p>
        <br>
        <p>Best regards,</p>
        <p>Drawnix</p>
      `,
    });

    if (resendError) {
      console.error('Resend API Error:', resendError);
      return new Response(
        JSON.stringify({ message: 'Failed to send email via Resend. Please try again later.' }),
        { status: 502, headers: { 'Content-Type': 'application/json' } } // 502 Bad Gateway if external service fails
      );
    }

    console.log(`Resend success for ${email}:`, sendData?.id);

    /* ----- 2 – add to MailerLite if opted in ----- */
    if (consent && mailerLiteApiKey) {
      console.log(`Consent given by ${email}. Attempting to add to MailerLite.`);
      try {
        const mailerlitePayload = {
          email,
          status: 'active', // Use "unconfirmed" to trigger double-opt-in email
          groups: ['157945024413173186'], // IMPORTANT: Replace with your actual Group ID (as a string, e.g., "12345"). Or omit/use [] if not assigning to a group.
          fields: { archetype: archetypeResult }, // Ensure 'archetype' is a custom field in MailerLite
          resubscribe: true, // Set to true if you want to reactivate previously unsubscribed or bounced emails
        };
        // console.log("MailerLite Payload:", JSON.stringify(mailerlitePayload, null, 2));

        const mailerliteResponse = await fetch('https://connect.mailerlite.com/api/subscribers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${mailerLiteApiKey}`,
          },
          body: JSON.stringify(mailerlitePayload),
        });

        if (!mailerliteResponse.ok) {
          const errorBody = await mailerliteResponse.text(); // Get text for more flexible error logging
          console.error(`MailerLite API Error (${mailerliteResponse.status}):`, errorBody);
          // Log this error, but don't fail the whole request since the PDF was sent.
        } else {
          const successBody = await mailerliteResponse.json().catch(() => ({})); // Parse JSON if possible
          console.log(`Email ${email} successfully processed by MailerLite:`, successBody?.data?.id || 'OK');
        }
      } catch (mlError) {
        console.error('Error during MailerLite API call:', mlError);
        // Log this error, but don't fail the whole request.
      }
    } else if (consent && !mailerLiteApiKey) {
      console.warn(`Consent given by ${email}, but MAILERLITE_API_KEY is not configured. Skipping MailerLite.`);
    }

    return new Response(
      JSON.stringify({ message: 'Success! Your PDF guide is on its way to your inbox.' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) { // Catch any other unexpected errors during the process
    console.error('Generic Request PDF Error:', error);
    return new Response(
      JSON.stringify({ message: 'An unexpected error occurred processing your request.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};