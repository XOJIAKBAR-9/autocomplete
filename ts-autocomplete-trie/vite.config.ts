import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'index.ts',
      name: 'AutoCompleteTrie',
      formats: ['cjs'],
      fileName: 'index'
    }
  }
});