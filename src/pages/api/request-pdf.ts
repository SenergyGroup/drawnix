// src/pages/api/request-pdf.ts
import type { APIRoute } from 'astro';
import { Resend } from 'resend';

const resendApiKey = import.meta.env.RESEND_API_KEY;
const emailFromAddress = import.meta.env.EMAIL_FROM_ADDRESS;
const siteUrl = import.meta.env.SITE_URL || Astro.url.origin; // SITE_URL from .env or derive
const pdfFileName = import.meta.env.PDF_URL || 'Drawnix_Archetype_Full_Guide.pdf';

if (!resendApiKey) {
  console.error("RESEND_API_KEY is not set.");
}
if (!emailFromAddress) {
  console.error("EMAIL_FROM_ADDRESS is not set.");
}

const resend = new Resend(resendApiKey);

// Basic email validation
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export const POST: APIRoute = async ({ request }) => {
  if (!resendApiKey || !emailFromAddress) {
    return new Response(
      JSON.stringify({ message: 'Server configuration error.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const data = await request.json();
    const email = data.email;
    const archetypeResult = data.archetypeResult || "Your Archetype"; // Optional: pass the user's result title

    if (!email || !isValidEmail(email)) {
      return new Response(
        JSON.stringify({ message: 'Invalid email address provided.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const pdfUrl = `${siteUrl.endsWith('/') ? siteUrl.slice(0, -1) : siteUrl}/${pdfFileName}`;

    // Here you could also save the email to your database or mailing list
    // console.log(`Email captured: ${email} for result: ${archetypeResult}`);

    const { data: sendData, error: sendError } = await resend.emails.send({
      from: `Drawnix Archetypes <${emailFromAddress}>`, // Sender name and email
      to: [email],
      subject: `Your Drawnix Archetype Guide: ${archetypeResult}`,
      html: `
        <h1>Here's your Drawnix Archetype Guide!</h1>
        <p>Thank you for discovering your archetype. We hope this guide helps you on your digital building journey.</p>
        <p>You identified as: <strong>${archetypeResult}</strong></p>
        <p>Click the link below to download your full PDF guide:</p>
        <p><a href="${pdfUrl}" target="_blank" style="display:inline-block;padding:10px 20px;background-color:#007bff;color:#ffffff;text-decoration:none;border-radius:5px;">Download Your PDF Guide</a></p>
        <p>If the button doesn't work, copy and paste this link into your browser: ${pdfUrl}</p>
        <br>
        <p>Best regards,</p>
        <p>The Drawnix Team</p>
      `,
    });

    if (sendError) {
      console.error('Resend API Error:', sendError);
      return new Response(
        JSON.stringify({ message: 'Failed to send email. Please try again later.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ message: 'Success! Your PDF guide is on its way to your inbox.' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Request PDF Error:', error);
    return new Response(
      JSON.stringify({ message: 'An unexpected error occurred.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};