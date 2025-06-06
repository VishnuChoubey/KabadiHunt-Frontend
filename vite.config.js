import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    chunkSizeWarningLimit: 1500, // increase warning limit (in KB)
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'], // example: separate vendor chunk
        },
      },
    },
  },
})
