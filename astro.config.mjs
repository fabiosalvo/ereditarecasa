import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import node from '@astrojs/node';

export default defineConfig({
  site: 'https://www.ereditarecasa.it',
  trailingSlash: 'always',
  // Pagine statiche; solo le API di /api/ girano sul server Node
  output: 'static',
  adapter: node({ mode: 'standalone' }),
  integrations: [sitemap({ filter: (page) => !page.includes('/grazie/') && !page.includes('/stampa/') && !page.includes('/api/') && !page.includes('/area-riservata/') && !page.includes('/reimposta-password/') })],
});
