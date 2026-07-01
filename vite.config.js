import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Honor the PORT env var when provided (falls back to Vite's default 5173).
  server: { port: process.env.PORT ? Number(process.env.PORT) : undefined },
})
