import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'src/index.ts'),
        'register-all': resolve(__dirname, 'src/register-all.ts'),
      },
      output: {
        preserveModules: true,
        entryFileNames: '[name].js',
        assetFileNames: (chunk) => {
          if (chunk.name?.includes('tokens')) return 'tokens/[name][extname]';
          if (chunk.name?.includes('dd-ui')) return 'styles/[name][extname]';
          return '[name][extname]';
        },
      },
    },
    sourcemap: true,
    target: 'es2022',
    emptyOutDir: true,
  },
  plugins: [
    viteStaticCopy({
      targets: [
        { src: 'src/tokens/tokens.json', dest: 'tokens' },
        { src: 'src/tokens/tokens.css', dest: 'tokens' },
        { src: 'src/styles/dd-ui.css', dest: 'styles' },
        { src: 'src/styles/theme.css', dest: 'styles' },
      ],
    }),
  ],
});
