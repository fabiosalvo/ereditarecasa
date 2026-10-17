import type { APIRoute } from 'astro';
import { q } from '../../../lib/db';
import { clientIp, createSession, hashPassword, isSecure, json, normEmail, rateLimited, readBody, sameOrigin, validEmail, validPassword } from '../../../lib/auth';

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies, clientAddress }) => {
  if (!sameOrigin(request)) return json({ ok: false, error: 'Richiesta non valida' }, 403);
  if (rateLimited('reg:' + clientIp(request, clientAddress), 10)) return json({ ok: false, error: 'Troppi tentativi, riprova tra qualche minuto' }, 429);
  const b = await readBody(request);
  if (b.website) return json({ ok: true });
  const email = normEmail(b.email);
  if (!validEmail(email)) return json({ ok: false, error: 'Indirizzo email non valido' }, 400);
  if (!validPassword(b.password)) return json({ ok: false, error: 'La password deve avere almeno 8 caratteri' }, 400);
  if (b.privacy !== true) return json({ ok: false, error: "Per registrarti devi dichiarare di aver letto l'informativa privacy" }, 400);

  const exists = await q('select id from utenti where email = $1', [email]);
  if (exists.rows.length) return json({ ok: false, error: 'Esiste già un account con questa email: accedi', code: 'esiste' }, 409);

  const nome = String(b.nome ?? '').trim().slice(0, 80) || null;
  const { rows } = await q(
    'insert into utenti (email, nome, password_hash, consenso_marketing, versione_consensi) values ($1, $2, $3, $4, $5) returning id',
    [email, nome, await hashPassword(b.password), b.marketing === true, String(b.versione ?? '')],
  );
  await createSession(cookies, rows[0].id, isSecure(request));
  return json({ ok: true, utente: { email, nome } });
};
