import { defineConfig } from 'vite';

export default defineConfig({
  root: 'apps/chronicles',
  server: {
    port: 5173,
  },
  preview: {
    port: 4173,
  },
  build: {
    outDir: '../../dist',
    emptyOutDir: true,
  },
});
