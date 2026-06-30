import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test-setup.ts',
  },
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        canvas: 'src/canvas/index.html',
      },
    },
  },
})
