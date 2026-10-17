import type { APIRoute } from 'astro';
import { destroySession, json, sameOrigin } from '../../../lib/auth';

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies }) => {
  if (!sameOrigin(request)) return json({ ok: false }, 403);
  await destroySession(cookies);
  return json({ ok: true });
};
