import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // string shorthand for simple proxy
      '/api': {
        target: 'http://localhost:5000', // IMPORTANT: Change this to your backend's port
        changeOrigin: true,
      },
    }
  }
})