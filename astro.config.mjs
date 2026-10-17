import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import node from '@astrojs/node';

export default defineConfig({
  site: 'https://www.ereditarecasa.it',
  trailingSlash: 'always',
  // Pagine statiche; solo le API di /api/ girano sul server Node
  output: 'static',
  adapter: node({ mode: 'standalone' }),
  integrations: [sitemap({ filter: (page) => !['/grazie/', '/stampa/', '/api/', '/area-riservata/', '/reimposta-password/', '/accedi/', '/password-dimenticata/'].some((p) => page.includes(p)) })],
});
