import type { APIRoute } from 'astro';
import { q } from '../../../lib/db';
import { currentUser, json, readBody, sameOrigin } from '../../../lib/auth';

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies }) => {
  if (!sameOrigin(request)) return json({ ok: false }, 403);
  const u = await currentUser(cookies);
  if (!u) return json({ ok: false }, 401);
  const b = await readBody(request);
  const nome = String(b.nome ?? '').trim().slice(0, 80) || null;
  const cognome = String(b.cognome ?? '').trim().slice(0, 80) || null;
  await q('update utenti set nome = $1, cognome = $2, consenso_marketing = $3 where id = $4', [nome, cognome, b.marketing === true, u.id]);
  return json({ ok: true });
};
