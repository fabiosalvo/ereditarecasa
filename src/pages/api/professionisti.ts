import type { APIRoute } from 'astro';
import { q } from '../../lib/db';
import { clientIp, json, normEmail, rateLimited, readBody, sameOrigin, validEmail } from '../../lib/auth';
import { CAMPI, PROFESSIONI, leggiProfessionista } from '../../lib/professionisti';
import { sendMail } from '../../lib/mail';

export const prerender = false;

/** Candidatura di un professionista: resta in attesa finché l'admin non la approva. */
export const POST: APIRoute = async ({ request, clientAddress }) => {
  if (!sameOrigin(request)) return json({ ok: false }, 403);
  if (rateLimited('cand:' + clientIp(request, clientAddress), 5)) return json({ ok: false, error: 'Troppi invii, riprova più tardi' }, 429);
  const b = await readBody(request);
  if (b.website) return json({ ok: true });
  if (b.privacy !== true) return json({ ok: false, error: "Serve la presa visione dell'informativa privacy" }, 400);
  const p = leggiProfessionista(b);
  if (!p) return json({ ok: false, error: 'Compila nome, cognome, professione e città' }, 400);
  p.email = normEmail(p.email);
  if (!validEmail(p.email ?? '')) return json({ ok: false, error: 'Email non valida' }, 400);
  if (!p.albo) return json({ ok: false, error: "Indica l'albo e il numero di iscrizione" }, 400);
  const cols = [...CAMPI, 'candidatura'];
  await q(
    `insert into professionisti (${cols.join(', ')}) values (${cols.map((_, i) => `$${i + 1}`).join(', ')})`,
    [...CAMPI.map((k) => p[k]), true],
  );
  const admin = String(process.env.ADMIN_EMAILS ?? '').split(',')[0]?.trim();
  if (admin) await sendMail(admin, `[EreditareCasa] Nuova candidatura: ${p.nome} ${p.cognome}, ${PROFESSIONI[p.professione!]} a ${p.citta}`, `Approvala o rifiutala dal pannello: /admin/?tipo=professionisti`).catch(() => {});
  return json({ ok: true });
};
