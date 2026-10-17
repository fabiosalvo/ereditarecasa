import type { APIRoute } from 'astro';
import { q } from '../../../lib/db';
import { clientIp, createSession, isSecure, json, normEmail, rateLimited, readBody, sameOrigin } from '../../../lib/auth';

export const prerender = false;

/** Accesso con Google: verifica il token presso Google, poi crea o collega l'account. */
export const POST: APIRoute = async ({ request, cookies, clientAddress }) => {
  if (!sameOrigin(request)) return json({ ok: false }, 403);
  if (rateLimited('google:' + clientIp(request, clientAddress), 20)) return json({ ok: false, error: 'Troppi tentativi' }, 429);
  const clientId = process.env.PUBLIC_GOOGLE_CLIENT_ID || import.meta.env.PUBLIC_GOOGLE_CLIENT_ID;
  if (!clientId) return json({ ok: false, error: "L'accesso con Google non è ancora attivo" }, 503);
  const b = await readBody(request);
  const res = await fetch('https://oauth2.googleapis.com/tokeninfo?id_token=' + encodeURIComponent(String(b.credential ?? '')));
  if (!res.ok) return json({ ok: false, error: 'Accesso con Google non riuscito' }, 401);
  const t = await res.json();
  if (t.aud !== clientId || !(t.email_verified === true || t.email_verified === 'true')) return json({ ok: false, error: 'Accesso con Google non valido' }, 401);
  const email = normEmail(t.email);
  const found = await q('select id from utenti where google_sub = $1 or email = $2 order by (google_sub = $1) desc limit 1', [t.sub, email]);
  let id: number;
  if (found.rows[0]) {
    id = found.rows[0].id;
    await q('update utenti set google_sub = $1, nome = coalesce(nome, $2) where id = $3', [t.sub, t.name ?? null, id]);
  } else {
    const ins = await q(
      'insert into utenti (email, nome, google_sub, consenso_marketing, versione_consensi) values ($1, $2, $3, $4, $5) returning id',
      [email, t.name ?? null, t.sub, b.marketing === true, String(b.versione ?? '')],
    );
    id = ins.rows[0].id;
  }
  await createSession(cookies, id, isSecure(request));
  return json({ ok: true, utente: { email, nome: t.name ?? null } });
};
