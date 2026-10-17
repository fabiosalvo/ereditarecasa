import type { APIRoute } from 'astro';
import { q } from '../../../lib/db';
import { COOKIE, currentUser, json, sameOrigin } from '../../../lib/auth';

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies }) => {
  if (!sameOrigin(request)) return json({ ok: false }, 403);
  const u = await currentUser(cookies);
  if (!u) return json({ ok: false }, 401);
  await q('delete from utenti where id = $1', [u.id]);
  cookies.delete(COOKIE, { path: '/' });
  return json({ ok: true });
};
