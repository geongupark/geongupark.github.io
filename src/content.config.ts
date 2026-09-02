import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    /** 하나만. 새 이름을 적으면 /categories/<이름> 이 자동으로 생깁니다. */
    category: z.string().default('etc'),
    /** 여러 개. /tags/<이름> 이 자동으로 생깁니다. */
    tags: z.array(z.string()).default([]),
    /** true 면 프로덕션 빌드에서 제외됩니다. */
    draft: z.boolean().default(false),
    /** 연재물 묶음 이름 (선택) */
    series: z.string().optional(),
  }),
});

export const collections = { blog };
