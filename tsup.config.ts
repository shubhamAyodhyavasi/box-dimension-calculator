import { defineConfig } from 'tsup';

export default defineConfig([
  // Core bundle
  {
    entry: { 'core/index': 'src/core/index.ts' },
    format: ['cjs', 'esm'],
    dts: true,
    sourcemap: true,
    clean: false,
    treeshake: true,
    external: ['react', 'vue', '@angular/core'],
  },
  // React bundle
  {
    entry: { 'react/index': 'src/react/index.ts' },
    format: ['cjs', 'esm'],
    dts: true,
    sourcemap: true,
    clean: false,
    treeshake: true,
    external: ['react', 'vue', '@angular/core'],
  },
  // Vue bundle
  {
    entry: { 'vue/index': 'src/vue/index.ts' },
    format: ['cjs', 'esm'],
    dts: true,
    sourcemap: true,
    clean: false,
    treeshake: true,
    external: ['react', 'vue', '@angular/core'],
  },
  // Angular bundle
  {
    entry: { 'angular/index': 'src/angular/index.ts' },
    format: ['cjs', 'esm'],
    dts: true,
    sourcemap: true,
    clean: false,
    treeshake: true,
    external: ['react', 'vue', '@angular/core'],
  },
  // Main entry (core only)
  {
    entry: { index: 'src/index.ts' },
    format: ['cjs', 'esm'],
    dts: true,
    sourcemap: true,
    clean: false,
    treeshake: true,
    external: ['react', 'vue', '@angular/core'],
  },
]);
