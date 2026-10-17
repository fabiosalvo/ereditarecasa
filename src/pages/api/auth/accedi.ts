import type { APIRoute } from 'astro';
import { q } from '../../../lib/db';
import { clientIp, createSession, isSecure, json, normEmail, rateLimited, readBody, sameOrigin, verifyPassword } from '../../../lib/auth';

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies, clientAddress }) => {
  if (!sameOrigin(request)) return json({ ok: false, error: 'Richiesta non valida' }, 403);
  const b = await readBody(request);
  const email = normEmail(b.email);
  if (rateLimited('login:' + clientIp(request, clientAddress), 20) || rateLimited('login:' + email, 8)) {
    return json({ ok: false, error: 'Troppi tentativi, riprova tra qualche minuto' }, 429);
  }
  const { rows } = await q('select id, nome, password_hash from utenti where email = $1', [email]);
  const u = rows[0];
  const ok = await verifyPassword(String(b.password ?? ''), u?.password_hash ?? null);
  if (!u || !ok) {
    const msg = u && !u.password_hash ? 'Questo account usa l\'accesso con Google: usa "Accedi con Google" oppure imposta una password con "Password dimenticata"' : 'Email o password non corretti';
    return json({ ok: false, error: msg }, 401);
  }
  await createSession(cookies, u.id, isSecure(request));
  return json({ ok: true, utente: { email, nome: u.nome } });
};
