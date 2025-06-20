import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	//loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
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
        // REMOVE OR COMMENT OUT THIS LINE:
        // loader: glob({ base: './src/content/videos', pattern: '**/*.mdx' }),
        schema: ({ image }) =>
                z.object({
                        title: z.string(),
                        date: z.coerce.date(),
                        tags: z.array(z.string()).optional(),
                        heroImage: image().optional(),
                }),
});

const resources = defineCollection({
        //loader: glob({ base: './src/content/resources', pattern: '**/*.mdx' }),
        schema: ({ image }) =>
                z.object({
                        title: z.string(),
                        date: z.coerce.date(),
                        tags: z.array(z.string()).optional(),
                        heroImage: image().optional(),
                }),
});

const testCollectionDefinition = defineCollection({ // Renamed variable for clarity, not strictly necessary
  // For 'test' collection, you don't need a loader if files are directly in src/content/test/
  // Astro will find them by convention.
  schema: z.object({
    title: z.string(),
  }),
});

export const collections = {
  'blog': blog, // Explicitly using string keys for clarity, but { blog } works too
  'videos': videos,
  'resources': resources,
  'test': testCollectionDefinition, // <<<<< CHANGE THIS LINE
};
