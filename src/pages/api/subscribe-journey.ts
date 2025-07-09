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
  // 1. Check for server configuration errors first
  if (!mailerLiteApiKey) {
    return new Response(
      JSON.stringify({ message: 'Server configuration error.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // 2. Get and validate the email from the request body
  let email: string;
  try {
    const data = await request.json();
    email = data.email;
  } catch (e) {
    return new Response(
      JSON.stringify({ message: 'Invalid request format.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  if (!email || !isValidEmail(email)) {
    return new Response(
      JSON.stringify({ message: 'Please provide a valid email address.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  console.log(`Attempting to subscribe ${email} to the "Journey" list.`);

  // 3. Prepare the payload for MailerLite
  const mailerlitePayload = {
    email,
    // IMPORTANT: Replace with the Group ID for your "Journey" subscribers.
    // Find this in your MailerLite account under Subscribers -> Groups.
    groups: ['YOUR_JOURNEY_GROUP_ID'], 
    status: 'active', // Use 'active' for single opt-in, or 'unconfirmed' for double opt-in
    resubscribe: true, // Reactivate if they were previously unsubscribed
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
      // If MailerLite returns an error, log it and inform the user.
      const errorBody = await mailerliteResponse.json();
      console.error('MailerLite API Error:', errorBody);
      // You can customize the user-facing message based on the error if you wish
      const errorMessage = errorBody?.message || 'Could not subscribe. The email might be invalid or already subscribed.';
      return new Response(
        JSON.stringify({ message: errorMessage }),
        { status: mailerliteResponse.status, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // 5. Return a success response
    console.log(`Successfully subscribed ${email} to MailerLite.`);
    return new Response(
      JSON.stringify({ message: 'Success! You have joined the journey. Check your inbox!' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Failed to call MailerLite API:', error);
    return new Response(
      JSON.stringify({ message: 'An unexpected error occurred. Please try again later.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};