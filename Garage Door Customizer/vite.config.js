import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  base: '/test-deployment/dist/',
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://chi-api.renoworks.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    },
    // <<< add this to always serve index.html for SPA routing
    historyApiFallback: true,
  }
});