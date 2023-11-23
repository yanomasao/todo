import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 9120,
    proxy: {
      '/api': {
        target: 'http://localhost:9121',
        changeOrigin: true,
      },
    },
  },
})
