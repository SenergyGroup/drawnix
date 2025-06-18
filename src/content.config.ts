import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) => z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: image().optional(),
	}),
});

const videos = defineCollection({
        loader: glob({ base: './src/content/videos', pattern: '**/*.mdx' }),
        schema: ({ image }) =>
                z.object({
                        title: z.string(),
                        date: z.coerce.date(),
                        tags: z.array(z.string()).optional(),
                        heroImage: image().optional(),
                }),
});

const resources = defineCollection({
        loader: glob({ base: './src/content/resources', pattern: '**/*.mdx' }),
        schema: ({ image }) =>
                z.object({
                        title: z.string(),
                        date: z.coerce.date(),
                        tags: z.array(z.string()).optional(),
                        heroImage: image().optional(),
                }),
});

export const collections = { blog, videos, resources };
