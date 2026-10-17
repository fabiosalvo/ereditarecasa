import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { guideUrl, pdfName } from '../data/site';

// Elenco delle pagine da stampare in PDF, letto da scripts/genera-pdf.mjs
export const GET: APIRoute = async () => {
  const guides = await getCollection('guide');
  const items = guides.map((g) => ({
    url: guideUrl(g.data.area, g.data.slug),
    file: pdfName(g.data.area, g.data.slug),
    title: g.data.title,
  }));
  items.push({ url: '/stampa/guida-completa/', file: 'guida-completa-casa-ereditata.pdf', title: 'Guida completa alla casa ereditata' });
  return new Response(JSON.stringify(items, null, 2), { headers: { 'Content-Type': 'application/json' } });
};
