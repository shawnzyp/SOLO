import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    target: 'es2022',
    cssCodeSplit: true,
    lib: {
      entry: {
        index: 'src/index.ts',
        'register-all': 'src/register-all.ts',
        'dd-ui': 'src/dd-ui.css'
      },
      formats: ['es'],
      fileName: (format, entryName) => (entryName === 'dd-ui' ? 'dd-ui.js' : `${entryName}.js`)
    },
    rollupOptions: {
      external: ['lit'],
      output: {
        preserveModules: false,
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.includes('dd-ui.css')) {
            return 'dd-ui.css';
          }
          return assetInfo.name ?? '[name][extname]';
        }
      }
    }
  },
  plugins: [
    dts({
      entryRoot: 'src',
      outputDir: 'dist',
      exclude: ['src/dd-ui.css']
    })
  ]
});
