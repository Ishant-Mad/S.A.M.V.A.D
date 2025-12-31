import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // allows external access
    port: 5173, // your dev server port
    allowedHosts: [
      'occupations-kingdom-allowing-serial.trycloudflare.com',
      // you can also allow all hosts temporarily:
      // 'all'
    ],
  },
})
