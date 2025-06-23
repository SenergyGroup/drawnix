// src/pages/api/request-pdf.ts
export const prerender = false;

import type { APIRoute } from 'astro';
import { Resend } from 'resend';

const resendApiKey = import.meta.env.RESEND_API_KEY;
const emailFromAddress = import.meta.env.EMAIL_FROM_ADDRESS;
const pdfFileNameFromEnv = import.meta.env.PDF_URL;

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

export const POST: APIRoute = async ({ request, url }) => { // <--- ADD `url` to the context
  if (!resendApiKey || !emailFromAddress) {
    return new Response(
      JSON.stringify({ message: 'Server configuration error. Please check server logs.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // Determine siteUrl and pdfUrl INSIDE the handler
  const siteUrl = import.meta.env.SITE_URL || url.origin; // Use url.origin from the API context
  
  // Use the PDF_URL from .env directly if it's a full URL.
  // If it's a relative path, construct it with siteUrl.
  let pdfUrl: string;
  if (pdfFileNameFromEnv && (pdfFileNameFromEnv.startsWith('http://') || pdfFileNameFromEnv.startsWith('https://'))) {
    pdfUrl = pdfFileNameFromEnv; // It's already a full URL
  } else {
    // Assume it's a relative path in public or a specific filename
    const effectivePdfFileName = pdfFileNameFromEnv || 'Drawnix_Archetype_Full_Guide.pdf';
    pdfUrl = `${siteUrl.endsWith('/') ? siteUrl.slice(0, -1) : siteUrl}/${effectivePdfFileName.startsWith('/') ? effectivePdfFileName.substring(1) : effectivePdfFileName}`;
  }


  try {
    // --- DEBUGGING START ---
    const rawBody = await request.text(); // Read as text first
    console.log("Raw request body:", rawBody);
    if (!rawBody) {
      console.error("Request body is empty!");
      return new Response(JSON.stringify({ message: 'Request body is empty.' }), { status: 400 });
    }
    const data = JSON.parse(rawBody); // Then parse
    // --- DEBUGGING END ---

    // const data = await request.json(); // Original line
    const email = data.email;
    const archetypeResult = data.archetypeResult || "Your Archetype";

    if (!email || !isValidEmail(email)) {
      return new Response(
        JSON.stringify({ message: 'Invalid email address provided.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // console.log(`Email captured: ${email} for result: ${archetypeResult}`);
    // console.log(`PDF URL being sent: ${pdfUrl}`);

    const { data: sendData, error: sendError } = await resend.emails.send({
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