import type { APIRoute } from 'astro';
import { q } from '../../../lib/db';
import { consumeResetToken, createSession, hashPassword, isSecure, json, readBody, sameOrigin, validPassword } from '../../../lib/auth';

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies }) => {
  if (!sameOrigin(request)) return json({ ok: false }, 403);
  const b = await readBody(request);
  if (!validPassword(b.password)) return json({ ok: false, error: 'La password deve avere almeno 8 caratteri' }, 400);
  const userId = await consumeResetToken(String(b.token ?? ''));
  if (!userId) return json({ ok: false, error: 'Link scaduto o già usato: chiedine uno nuovo' }, 400);
  await q('update utenti set password_hash = $1 where id = $2', [await hashPassword(b.password), userId]);
  await q('delete from sessioni where utente_id = $1', [userId]);
  await createSession(cookies, userId, isSecure(request));
  return json({ ok: true });
};
