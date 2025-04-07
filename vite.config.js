import { defineConfig } from 'vite'

export default defineConfig({
  base: '/3dog/',  // Changed to match GitHub repository name
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',  // Changed back to local dist for gh-pages
    assetsDir: 'assets',
    sourcemap: true
  },
  publicDir: 'public',
  root: '.'
}); 