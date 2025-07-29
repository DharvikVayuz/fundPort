import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy API requests to Cashfree API to avoid CORS issue during development
      '/api': {
        target: 'https://test.cashfree.com',  
        changeOrigin: true,                  
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
