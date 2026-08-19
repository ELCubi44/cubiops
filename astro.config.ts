// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const site = process.env.PUBLIC_SITE_URL ?? 'https://cubiops.com';

export default defineConfig({
  site,
  trailingSlash: 'never',
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
    format: 'directory',
  },
  image: {
    responsiveStyles: true,
  },
  integrations: [
    sitemap({
      changefreq: 'monthly',
      priority: 0.7,
      lastmod: new Date(),
      filter: (page) => !page.includes('/estado'),
    }),
  ],
  vite: {
    server: {
      proxy: {
        '/api/contact': {
          target: 'http://127.0.0.1:3017',
          changeOrigin: false,
        },
      },
    },
  },
});
