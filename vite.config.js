import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist'
  },
  server: {
    proxy: {
      '/socket.io': {
        target: 'https://idocs.onrender.com',
        changeOrigin: true,
        ws: true
      }
    }
  }
})
