import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const guide = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/guide' }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(170),
    area: z.enum(['vendere', 'tasse', 'successione', 'eredi-in-disaccordo', 'accettare-rinunciare', 'casi', 'decidere']),
    // Slug relativo all'area; vuoto per la pagina pilastro dell'area
    slug: z.string().default(''),
    pillar: z.boolean().default(false),
    order: z.number().default(100),
    updated: z.coerce.date(),
    reviewer: z
      .object({ name: z.string(), role: z.string(), url: z.string().optional() })
      .optional(),
    // Data dell'ultima verifica dei contenuti sulle fonti normative ufficiali
    verified: z.coerce.date().optional(),
    fonti: z.array(z.object({ title: z.string(), url: z.string().url() })).default([]),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
  }),
});

export const collections = { guide };
