// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import node from '@astrojs/node';

const site = process.env.RENDER_EXTERNAL_URL || 'http://localhost:4321';

// https://astro.build/config
export default defineConfig({
	site: site,
	integrations: [mdx(), sitemap(), react()],
	adapter: node({
    mode: 'standalone',
  }),
});
