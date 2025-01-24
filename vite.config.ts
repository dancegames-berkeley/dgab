import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';

export default defineConfig({
  plugins: [sveltekit()],
  css: {
    postcss: './postcss.config.js',
  },
  server: {
    port: 5173,
  }
});