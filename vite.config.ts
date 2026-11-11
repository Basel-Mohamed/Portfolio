import { defineConfig } from 'vitest/config'
import { loadEnv, type Plugin } from 'vite'
import path from 'path'
import { Readable } from 'stream'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

/**
 * Dev-only: serve the Vercel functions in /api from the Vite dev server, so
 * `npm run dev` behaves like production without a separate backend.
 * Server-only secrets (e.g. COHERE_API_KEY) are read from .env into process.env
 * here; they are never exposed to the client bundle (no VITE_ prefix).
 */
function vercelApiDev(): Plugin {
  return {
    name: 'vercel-api-dev',
    apply: 'serve',
    configureServer(server) {
      Object.assign(process.env, loadEnv(server.config.mode, process.cwd(), ''))

      server.middlewares.use('/api/chat', async (req, res) => {
        try {
          const mod = await server.ssrLoadModule('/api/chat.ts')
          const handler = mod[req.method ?? 'GET']
          if (typeof handler !== 'function') {
            res.statusCode = 405
            res.end('Method Not Allowed')
            return
          }

          const chunks: Buffer[] = []
          for await (const chunk of req) chunks.push(chunk as Buffer)
          const request = new Request(`http://localhost${req.originalUrl ?? '/api/chat'}`, {
            method: req.method,
            headers: req.headers as Record<string, string>,
            body: chunks.length ? Buffer.concat(chunks) : undefined,
          })

          const response: Response = await handler(request)
          res.statusCode = response.status
          response.headers.forEach((value, key) => res.setHeader(key, value))
          if (response.body) {
            Readable.fromWeb(response.body as import('stream/web').ReadableStream).pipe(res)
          } else {
            res.end()
          }
        } catch (err) {
          server.config.logger.error(`[api/chat] ${String(err)}`)
          res.statusCode = 500
          res.end(JSON.stringify({ message: 'Dev API handler crashed.' }))
        }
      })
    },
  }
}

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./setupTests.ts'],
    globals: true
  },
  plugins: [
    react(),
    tailwindcss(),
    vercelApiDev(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  assetsInclude: ['**/*.svg', '**/*.csv'],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        }
      }
    }
  }
})