import type { APIRoute } from 'astro';
import { q } from '../../../lib/db';
import { clientIp, createResetToken, json, normEmail, rateLimited, readBody, sameOrigin } from '../../../lib/auth';
import { sendMail } from '../../../lib/mail';

export const prerender = false;

export const POST: APIRoute = async ({ request, clientAddress, url }) => {
  if (!sameOrigin(request)) return json({ ok: false }, 403);
  if (rateLimited('reset:' + clientIp(request, clientAddress), 5)) return json({ ok: false, error: 'Troppi tentativi, riprova più tardi' }, 429);
  const email = normEmail((await readBody(request)).email);
  const { rows } = await q('select id from utenti where email = $1', [email]);
  if (rows[0]) {
    const token = await createResetToken(rows[0].id);
    const base = process.env.SITE_URL || `${url.protocol}//${request.headers.get('x-forwarded-host') ?? url.host}`;
    const link = `${base}/reimposta-password/?token=${token}`;
    await sendMail(
      email,
      'Reimposta la password di EreditareCasa',
      `Hai chiesto di reimpostare la password del tuo account EreditareCasa.\n\nApri questo link entro un'ora:\n${link}\n\nSe non sei stato tu, ignora questa email: la password resta quella di prima.`,
    );
  }
  // Stessa risposta in ogni caso, per non rivelare quali email sono registrate
  return json({ ok: true });
};
