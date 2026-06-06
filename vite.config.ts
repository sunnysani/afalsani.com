import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@src': resolve(__dirname, 'src'),
      '@components': resolve(__dirname, 'src/components'),
      '@data': resolve(__dirname, 'src/data'),
      '@hooks': resolve(__dirname, 'src/hooks'),
      '@styles': resolve(__dirname, 'src/styles'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('/react-dom/') || id.includes('/react/')) return 'react-vendor'
        },
      },
    },
  },
})
