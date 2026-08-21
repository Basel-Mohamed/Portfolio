# Basel Mohamed — Full Stack AI Engineer Portfolio

A modern, high-performance, bilingual (English/Arabic) AI Engineer portfolio featuring real-time Server-Sent Events (SSE) AI chat streaming, interactive AI system architecture visualizations, dynamic Supabase CMS integration, and strict TypeScript types.

---

## 🏗️ Architecture Overview

The system is organized into a clean decoupled full-stack architecture:

- **Frontend (`Portfolio`)**: React 18, Vite 6, Tailwind CSS v4, Framer Motion, React Router 7, TypeScript.
- **Backend Service (`portfolio-backend`)**: Python FastAPI asynchronous microservice powering real-time LLM inference streaming (Cohere Command-R) via Server-Sent Events (SSE) and context sliding windows.
- **Dynamic Content & CMS**: Supabase PostgreSQL for live content sync, theme switcher overrides, and system prompt management.

---

## 🚀 Getting Started

### 1. Frontend Setup
```bash
# Install frontend dependencies
npm install

# Start Vite local development server (proxies /api to http://localhost:8000)
npm run dev
```

### 2. Backend Setup (`portfolio-backend`)
```bash
# Navigate to backend directory
cd "D:/My Projects/portfolio-backend"

# Install Python dependencies
pip install -r requirements.txt

# Launch FastAPI server with hot reload
uvicorn main:app --reload --port 8000
```

---

## 🛠️ Key Features

1. **Streaming AI Assistant**: Embedded chatbot with SSE token streaming, auto-scroll, markdown code syntax highlighting, and server-side system persona guardrails.
2. **Interactive AI System Architecture Flow**: Step-by-step pipeline inspector for complex AI workflows (e.g., Arabic Vision OCR, Enterprise RAG with Hybrid Qdrant Vector Search & Re-ranking).
3. **Quantitative Impact Badges**: Showcases measurable engineering outcomes (latency, throughput, R² scores, accuracy improvements).
4. **Bilingual & RTL Ready**: Native English and Arabic layouts with direction-aware transitions.
5. **Mobile-Optimized GPU Animations**: Lightweight CSS keyframe animations for floating elements with zero JS runtime overhead.
