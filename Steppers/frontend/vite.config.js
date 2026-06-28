import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
    },
  },

  build: {
    // Target modern browsers — smaller output, no legacy polyfills
    target: 'esnext',

    // Use esbuild (already default, but explicit)
    minify: 'esbuild',
    cssMinify: true,

    // Raise warning limit (Three.js chunks are legitimately large)
    chunkSizeWarningLimit: 1500,

    rollupOptions: {
      output: {
        // Split vendor code into separately-cached chunks.
        // Three.js / R3F alone is ~1.5MB — users only re-download if it changes.
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Three.js + React Three ecosystem (largest chunk)
            if (
              id.includes('three') ||
              id.includes('@react-three/fiber') ||
              id.includes('@react-three/drei')
            ) {
              return 'vendor-three';
            }
            // React core
            if (
              id.includes('react-dom') ||
              id.includes('react-router-dom') ||
              id.includes('react/')
            ) {
              return 'vendor-react';
            }
            // State management
            if (id.includes('@reduxjs') || id.includes('react-redux')) {
              return 'vendor-redux';
            }
            // Animation
            if (id.includes('gsap')) {
              return 'vendor-gsap';
            }
            // HTTP client
            if (id.includes('axios')) {
              return 'vendor-axios';
            }
          }
        },
      },
    },
  },
})
