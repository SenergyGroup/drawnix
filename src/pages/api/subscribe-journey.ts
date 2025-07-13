// src/pages/api/subscribe-journey.ts
export const prerender = false;

import type { APIRoute } from 'astro';

// ---- ENV VARS ----
const mailerLiteApiKey = import.meta.env.MAILERLITE_API_KEY;

if (!mailerLiteApiKey) {
  console.error("CRITICAL: MAILERLITE_API_KEY is not set in your .env file.");
}

// Basic email validation
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// ---- API Handler ----
export const POST: APIRoute = async ({ request }) => {
  if (!mailerLiteApiKey) {
    return new Response(JSON.stringify({ message: 'Server configuration error.' }), { status: 500 });
  }

  // 1. Get and validate the data from the request body
  let email: string;
  let consent: boolean;
  try {
    const data = await request.json();
    email = data.email;
    consent = data.consent; // ✅ Get the consent value
  } catch (e) {
    return new Response(JSON.stringify({ message: 'Invalid request format.' }), { status: 400 });
  }

  // 2. ✅ SERVER-SIDE VALIDATION: Check for both email and consent
  if (!email || !isValidEmail(email)) {
    return new Response(JSON.stringify({ message: 'Please provide a valid email address.' }), { status: 400 });
  }
  
  // This is the crucial gatekeeper check.
  if (consent !== true) {
    return new Response(JSON.stringify({ message: 'Consent is required to subscribe.' }), { status: 400 });
  }

  console.log(`Consent received for ${email}. Attempting to subscribe...`);

  // 3. Prepare the payload for MailerLite (using your real group ID)
  const mailerlitePayload = {
    email,
    groups: ['159493465834522596'], // Using your actual group ID
    status: 'active',
    resubscribe: true,
  };

  // 4. Make the API call to MailerLite
  try {
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
      const errorBody = await mailerliteResponse.json();
      console.error('MailerLite API Error:', errorBody);
      const errorMessage = errorBody?.message || 'Could not subscribe. The email might be invalid or already subscribed.';
      return new Response(JSON.stringify({ message: errorMessage }), { status: mailerliteResponse.status });
    }
    
    // 5. Return a success response
    console.log(`Successfully subscribed ${email} to MailerLite.`);
    return new Response(JSON.stringify({ message: 'Success! Check your inbox!' }), { status: 200 });

  } catch (error) {
    console.error('Failed to call MailerLite API:', error);
    return new Response(JSON.stringify({ message: 'An unexpected error occurred.' }), { status: 500 });
  }
};