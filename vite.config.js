import { defineConfig } from 'vite'

export default defineConfig({
  base: './',  // Changed to relative path for the new structure
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: '../dist',  // Output to root directory's dist
    assetsDir: 'assets',
    sourcemap: true
  },
  publicDir: 'public',
  root: '.'
}); 