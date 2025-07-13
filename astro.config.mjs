// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

//const site = process.env.RENDER_EXTERNAL_URL || 'http://localhost:4321';

// https://astro.build/config
export default defineConfig({
	output: 'static',
	site: 'https://drawnix.onrender.com',
	//integrations: [mdx(), sitemap(), react()],
});
