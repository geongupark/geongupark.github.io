import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    /** Exactly one. A name you haven't used before creates /categories/<name>. */
    category: z.string().default('etc'),
    /** Any number. Each one creates /tags/<name>. */
    tags: z.array(z.string()).default([]),
    /** Excluded from production builds while true. */
    draft: z.boolean().default(false),
    /** Optional name that groups posts into a series. */
    series: z.string().optional(),
  }),
});

export const collections = { blog };
