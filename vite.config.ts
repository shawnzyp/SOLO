import { defineConfig } from 'vite';

export default defineConfig(({ command }) => ({
  base: command === 'serve' ? '/' : './',
  server: {
    port: 4173,
  },
  build: {
    outDir: 'docs',
    emptyOutDir: true,
  },
}));
