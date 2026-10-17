import type { APIRoute } from 'astro';
import { q } from '../../../lib/db';
import { currentUser, hashPassword, json, readBody, sameOrigin, validPassword, verifyPassword } from '../../../lib/auth';

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies }) => {
  if (!sameOrigin(request)) return json({ ok: false }, 403);
  const u = await currentUser(cookies);
  if (!u) return json({ ok: false, error: 'Accedi di nuovo' }, 401);
  const b = await readBody(request);
  if (!validPassword(b.nuova)) return json({ ok: false, error: 'La nuova password deve avere almeno 8 caratteri' }, 400);
  const { rows } = await q('select password_hash from utenti where id = $1', [u.id]);
  if (rows[0].password_hash && !(await verifyPassword(String(b.attuale ?? ''), rows[0].password_hash))) {
    return json({ ok: false, error: 'La password attuale non è corretta' }, 400);
  }
  await q('update utenti set password_hash = $1 where id = $2', [await hashPassword(b.nuova), u.id]);
  return json({ ok: true });
};
