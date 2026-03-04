import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://bg3-lockadin.netlify.app',

  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    mdx(),
  ],

  output: 'static',

  markdown: {
    shikiConfig: { theme: 'one-dark-pro' },
  },

  vite: {
    build: {
      cssCodeSplit: false,
    },
  },
});
