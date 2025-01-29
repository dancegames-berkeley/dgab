import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
  css: {
    postcss: './postcss.config.js',
  },
  server: {
    proxy: {
      '/assets': {
        target: 'https://dancegames.studentorg.berkeley.edu/',
        changeOrigin: true,
      }
    }
  },
});