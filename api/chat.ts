import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  // Only accept POST requests
  if (request.method !== 'POST') {
    return response.status(405).json({ message: 'Method not allowed' });
  }

  const { message, chat_history, preamble, temperature } = request.body;
  
  // Use Vercel's securely injected environment variable
  // We include VITE_COHERE_API_KEY as a fallback if they only set that one
  const apiKey = process.env.COHERE_API_KEY || process.env.VITE_COHERE_API_KEY;

  if (!apiKey) {
    return response.status(500).json({ message: 'API key not configured securely on server.' });
  }

  try {
    const res = await fetch('https://api.cohere.com/v1/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        message,
        model: 'command-r7b-12-2024',
        preamble,
        temperature: temperature || 0.3,
        chat_history
      })
    });

    if (!res.ok) {
      const errorData = await res.json();
      return response.status(res.status).json(errorData);
    }

    const data = await res.json();
    return response.status(200).json(data);
  } catch (error: any) {
    console.error('Error proxying to Cohere:', error);
    return response.status(500).json({ message: error.message || 'Internal Server Error' });
  }
}
