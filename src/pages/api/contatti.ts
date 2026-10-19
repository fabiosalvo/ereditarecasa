import type { APIRoute } from 'astro';
import { q } from '../../lib/db';
import { clientIp, json, normEmail, rateLimited, readBody, sameOrigin, validEmail } from '../../lib/auth';

export const prerender = false;

const TIPI = new Set(['valutazione', 'scadenzario', 'guida', 'percorso']);
const short = (v: unknown, n = 120) => String(v ?? '').trim().slice(0, n) || null;

/** Copia nel database dei contatti lasciati nei moduli (PDF, valutazione, scadenzario, percorso), per il pannello admin. */
export const POST: APIRoute = async ({ request, clientAddress }) => {
  if (!sameOrigin(request)) return json({ ok: false }, 403);
  if (rateLimited('lead:' + clientIp(request, clientAddress), 30)) return json({ ok: false }, 429);
  const b = await readBody(request);
  const f = (b.fields ?? {}) as Record<string, unknown>;
  if (!TIPI.has(b.type) || f.website) return json({ ok: true });
  const email = normEmail(f.email);
  if (email && !validEmail(email)) return json({ ok: false, error: 'Email non valida' }, 400);
  // Tutto il resto (risposte, consensi, pagina di provenienza) resta nel campo dati
  const dati = JSON.stringify({ ...f, consent: b.consent ?? null, source: b.source ?? null }).slice(0, 20000);
  await q('insert into contatti (tipo, email, nome, cognome, telefono, comune, dati) values ($1, $2, $3, $4, $5, $6, $7)', [
    b.type, email || null, short(f.nome, 80), short(f.cognome, 80), short(f.telefono, 40), short(f.comune, 80), dati,
  ]);
  return json({ ok: true });
};
