/**
 * Vercel Serverless Function: POST /api/chat
 *
 * Proxies chat requests to Cohere (v2 Chat API) and re-emits the stream as
 * Server-Sent Events in the shape the frontend expects:
 *   data: {"token":"..."}\n\n   (repeated)
 *   data: {"error":"..."}\n\n   (on upstream failure mid-stream)
 *   data: [DONE]\n\n
 *
 * Required env (Vercel → Project → Settings → Environment Variables):
 *   COHERE_API_KEY        server-only secret, never prefix with VITE_
 * Optional:
 *   COHERE_MODEL          defaults to command-r7b-12-2024
 *   VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY   to load the admin-edited prompt
 */
// Explicit .js extension is required: package.json is "type": "module", so Vercel
// runs this as native Node ESM, which does not resolve extensionless imports.
import { CHATBOT_PROMPT } from '../src/lib/chatbotPrompt.js';

const COHERE_URL = 'https://api.cohere.com/v2/chat';
const DEFAULT_MODEL = 'command-r7b-12-2024';
const MAX_MESSAGE_CHARS = 2000;
const MAX_HISTORY_TURNS = 10;
const MAX_HISTORY_CHARS = 4000;

type Role = 'user' | 'assistant';
interface CohereMessage {
  role: Role | 'system';
  content: string;
}

function json(status: number, body: Record<string, unknown>): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });
}

/** Admin-editable prompt lives in Supabase (public-read RLS); fall back to the bundled one. */
async function loadSystemPrompt(): Promise<string> {
  const url = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const key = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;
  if (!url || !key) return CHATBOT_PROMPT;

  try {
    const res = await fetch(`${url}/rest/v1/site_settings?select=ai_prompt&id=eq.1`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
      signal: AbortSignal.timeout(3000),
    });
    if (!res.ok) return CHATBOT_PROMPT;
    const rows = (await res.json()) as Array<{ ai_prompt?: string }>;
    const prompt = rows[0]?.ai_prompt?.trim();
    return prompt || CHATBOT_PROMPT;
  } catch {
    return CHATBOT_PROMPT;
  }
}

function sanitizeHistory(raw: unknown): CohereMessage[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .slice(-MAX_HISTORY_TURNS)
    .map((m): CohereMessage | null => {
      if (!m || typeof m !== 'object') return null;
      const { role, message } = m as { role?: unknown; message?: unknown };
      if (typeof message !== 'string' || !message.trim()) return null;
      const r = String(role).toUpperCase();
      const mapped: Role | null =
        r === 'USER' ? 'user' : r === 'CHATBOT' || r === 'ASSISTANT' ? 'assistant' : null;
      if (!mapped) return null;
      return { role: mapped, content: message.slice(0, MAX_HISTORY_CHARS) };
    })
    .filter((m): m is CohereMessage => m !== null);
}

export async function POST(request: Request): Promise<Response> {
  const apiKey = process.env.COHERE_API_KEY;
  if (!apiKey) {
    console.error('[api/chat] COHERE_API_KEY is not set');
    return json(500, { message: 'Chat service is not configured (missing API key).' });
  }

  let body: { message?: unknown; chat_history?: unknown };
  try {
    body = await request.json();
  } catch {
    return json(400, { message: 'Invalid JSON body.' });
  }

  const message = typeof body.message === 'string' ? body.message.trim() : '';
  if (!message) return json(400, { message: '`message` is required.' });
  if (message.length > MAX_MESSAGE_CHARS) {
    return json(413, { message: `Message too long (max ${MAX_MESSAGE_CHARS} characters).` });
  }

  const messages: CohereMessage[] = [
    { role: 'system', content: await loadSystemPrompt() },
    ...sanitizeHistory(body.chat_history),
    { role: 'user', content: message },
  ];

  let upstream: Response;
  try {
    upstream = await fetch(COHERE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'text/event-stream',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: process.env.COHERE_MODEL || DEFAULT_MODEL,
        messages,
        temperature: 0.3,
        stream: true,
      }),
      signal: AbortSignal.timeout(30000),
    });
  } catch (err) {
    console.error('[api/chat] upstream fetch failed', err);
    return json(502, { message: 'Could not reach the AI provider.' });
  }

  if (!upstream.ok || !upstream.body) {
    const detail = await upstream.text().catch(() => '');
    console.error(`[api/chat] upstream ${upstream.status}: ${detail.slice(0, 500)}`);
    const status = upstream.status === 429 ? 429 : 502;
    return json(status, {
      message: status === 429 ? 'Rate limit exceeded (429).' : `AI provider error (${upstream.status}).`,
    });
  }

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  const reader = upstream.body.getReader();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const send = (payload: string) => controller.enqueue(encoder.encode(`data: ${payload}\n\n`));
      let buffer = '';
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() ?? '';

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith('data:')) continue;
            const data = trimmed.slice(5).trim();
            if (!data || data === '[DONE]') continue;
            try {
              const evt = JSON.parse(data);
              if (evt.type === 'content-delta') {
                const text: string | undefined = evt.delta?.message?.content?.text;
                if (text) send(JSON.stringify({ token: text }));
              }
            } catch {
              // ignore malformed upstream frames
            }
          }
        }
      } catch (err) {
        console.error('[api/chat] stream error', err);
        send(JSON.stringify({ error: 'The response was interrupted. Please try again.' }));
      } finally {
        send('[DONE]');
        controller.close();
      }
    },
    cancel() {
      reader.cancel().catch(() => {});
    },
  });

  return new Response(stream, {
    status: 200,
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
      'X-Accel-Buffering': 'no',
    },
  });
}
