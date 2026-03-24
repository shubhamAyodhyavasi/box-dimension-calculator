import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Point directly at the TypeScript source so the demo works without a prior build step
      'box-dimension-calculator/core': resolve(__dirname, '../src/core/index.ts'),
      'box-dimension-calculator/react': resolve(__dirname, '../src/react/index.ts'),
      'box-dimension-calculator': resolve(__dirname, '../src/index.ts'),
    },
  },
});
