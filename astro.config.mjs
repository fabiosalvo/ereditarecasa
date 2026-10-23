import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import node from '@astrojs/node';
import { readdirSync, readFileSync } from 'node:fs';
import { guideUrl } from './src/data/site.ts';

const SITE = 'https://www.ereditarecasa.it';
// Data di ultimo aggiornamento per URL, letta dal frontmatter di guide e articoli: va nella sitemap (<lastmod>)
const fm = (file, key) => readFileSync(file, 'utf8').match(new RegExp(`^${key}:\\s*"?([^"\\n]+)"?`, 'm'))?.[1]?.trim();
const lastmod = new Map();
for (const f of readdirSync('src/content/guide')) {
  const file = `src/content/guide/${f}`;
  lastmod.set(SITE + guideUrl(fm(file, 'area'), fm(file, 'slug') ?? ''), fm(file, 'updated'));
}
for (const f of readdirSync('src/content/blog')) {
  const file = `src/content/blog/${f}`;
  lastmod.set(`${SITE}/blog/${f.replace(/\.md$/, '')}/`, fm(file, 'updated') ?? fm(file, 'date'));
}
const newest = [...lastmod.values()].filter(Boolean).sort().pop();

export default defineConfig({
  site: SITE,
  trailingSlash: 'always',
  // Pagine statiche; solo le API di /api/ girano sul server Node
  output: 'static',
  adapter: node({ mode: 'standalone' }),
  integrations: [
    sitemap({
      filter: (page) => !['/grazie/', '/stampa/', '/api/', '/area-riservata/', '/reimposta-password/', '/accedi/', '/password-dimenticata/', '/admin/'].some((p) => page.includes(p)),
      serialize(item) {
        const d = lastmod.get(item.url) ?? (['/', '/casa-ereditata/', '/blog/'].includes(new URL(item.url).pathname) ? newest : undefined);
        if (d) item.lastmod = new Date(d).toISOString();
        return item;
      },
    }),
  ],
});
