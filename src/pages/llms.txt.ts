import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { AREAS, SITE, guideUrl } from '../data/site';

// Indice del sito per i motori di risposta basati su AI (formato llms.txt): guide, strumenti, blog.
export const GET: APIRoute = async () => {
  const guide = await getCollection('guide');
  const blog = (await getCollection('blog')).sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
  const abs = (p: string) => new URL(p, SITE.url).toString();
  const out: string[] = [
    `# ${SITE.name}`,
    '',
    "> Guide pratiche e verificate sulle fonti ufficiali (Codice civile, Agenzia delle Entrate, Normattiva) per chi eredita una casa in Italia: successione, imposte, accettazione o rinuncia, eredi in disaccordo, vendita. Ogni guida riporta data di aggiornamento e fonti.",
    '',
  ];
  for (const a of AREAS) {
    const items = guide.filter((g) => g.data.area === a.id).sort((x, y) => Number(y.data.pillar) - Number(x.data.pillar) || x.data.order - y.data.order);
    if (!items.length) continue;
    out.push(`## ${a.title}`, '');
    for (const g of items) out.push(`- [${g.data.title}](${abs(guideUrl(g.data.area, g.data.slug))}): ${g.data.description}`);
    out.push('');
  }
  out.push(
    '## Strumenti gratuiti',
    '',
    `- [Calcolatore imposte di successione](${abs('/strumenti/calcolatore-imposte-successione/')}): imposta di successione, ipotecaria e catastale sulla casa.`,
    `- [Scadenzario della successione](${abs('/strumenti/scadenzario-successione/')}): tutte le scadenze dalla data del decesso.`,
    `- [Il tuo percorso](${abs('/percorso/')}): checklist personale in 8 domande.`,
    `- [Modelli di lettera](${abs('/modelli-lettere/')}): lettere pronte per banca, utenze, condominio e coeredi.`,
    `- [Glossario](${abs('/glossario/')}): le parole della successione spiegate in modo semplice.`,
    `- [Osservatorio](${abs('/osservatorio/')}): i numeri delle successioni e delle case ereditate in Italia.`,
    `- [Valutazione della casa ereditata](${abs('/valuta-casa-ereditata/')}): stima gratuita del valore.`,
    `- [Professionisti](${abs('/professionisti/')}): contatto con notaio, avvocato, commercialista o CAF della zona.`,
    '',
    '## Blog',
    '',
    ...blog.map((p) => `- [${p.data.title}](${abs(`/blog/${p.id}/`)}): ${p.data.description}`),
    '',
  );
  return new Response(out.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
