import type { APIRoute } from 'astro';
import { currentUser, json } from '../../../lib/auth';

export const prerender = false;

export const GET: APIRoute = async ({ cookies }) => {
  const u = await currentUser(cookies).catch(() => null);
  if (!u) return json({ ok: false });
  return json({ ok: true, utente: u });
};
