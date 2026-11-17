import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({ mode }) => {
  const siteUrl = (loadEnv(mode, process.cwd(), 'VITE_').VITE_SITE_URL || 'https://davide-lucano.netlify.app')
    .replace(/\/+$/, '');

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'safari-css-crossorigin-fix',
        transformIndexHtml(html) {
          return html
            .replace(/<link rel="stylesheet" crossorigin href="([^"]+)">/g, '<link rel="stylesheet" href="$1">')
            .replace(/https:\/\/davide-lucano\.netlify\.app/g, siteUrl);
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      target: 'es2020',
      cssTarget: ['safari15.4', 'chrome100', 'firefox100'],
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor-react': ['react', 'react-dom'],
            'vendor-motion': ['motion'],
            'vendor-lucide': ['lucide-react'],
          },
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
