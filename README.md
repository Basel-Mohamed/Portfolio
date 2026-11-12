# Basel Mohamed — Full Stack AI Engineer Portfolio

A modern, high-performance, bilingual (English/Arabic) AI Engineer portfolio featuring real-time Server-Sent Events (SSE) AI chat streaming, interactive AI system architecture visualizations, and strict TypeScript types.

---

## 🏗️ Architecture Overview

Everything ships as a single Vercel project:

- **Frontend**: React 18, Vite 6, Tailwind CSS v4, Framer Motion, React Router 7, TypeScript.
- **AI Chat API (`api/chat.ts`)**: Vercel Serverless Function that streams Cohere (v2 Chat) tokens to the browser via Server-Sent Events. The API key and system prompt stay server-side; input size and history are capped.
- **Content**: All portfolio content (EN/AR) lives statically in `src/lib/data.ts`; the chatbot system prompt lives in `src/lib/chatbotPrompt.ts`. Edit those files and redeploy to update the site.

---

## 🚀 Getting Started

```bash
npm install
cp .env.example .env   # fill in COHERE_API_KEY
npm run dev            # Vite dev server; also serves /api/chat locally
```

### Deploying (Vercel)

Set these in **Project → Settings → Environment Variables**, then deploy:

| Variable | Scope | Notes |
| --- | --- | --- |
| `COHERE_API_KEY` | server only | **Never** prefix with `VITE_` |
| `COHERE_MODEL` | server only | Optional, defaults to `command-r7b-12-2024` |

---

## 🛠️ Key Features

1. **Streaming AI Assistant**: Embedded chatbot with SSE token streaming, auto-scroll, markdown code syntax highlighting, and server-side system persona guardrails (Vercel Serverless Function).
2. **Interactive AI System Architecture Flow**: Step-by-step pipeline inspector for complex AI workflows (e.g., Arabic Vision OCR, Enterprise RAG with Hybrid Qdrant Vector Search & Re-ranking).
3. **Quantitative Impact Badges**: Showcases measurable engineering outcomes (latency, throughput, R² scores, accuracy improvements).
4. **Bilingual & RTL Ready**: Native English and Arabic layouts with direction-aware transitions.
5. **Mobile-Optimized GPU Animations**: Lightweight CSS keyframe animations for floating elements with zero JS runtime overhead.
