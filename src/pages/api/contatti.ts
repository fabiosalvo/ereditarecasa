import type { APIRoute } from 'astro';
import { q } from '../../lib/db';
import { clientIp, json, normEmail, rateLimited, readBody, sameOrigin, validEmail } from '../../lib/auth';
import { sendMail } from '../../lib/mail';
import { PROFESSIONI } from '../../lib/professionisti';

export const prerender = false;

const TIPI = new Set(['valutazione', 'scadenzario', 'guida', 'percorso', 'professionista']);
const short = (v: unknown, n = 120) => String(v ?? '').trim().slice(0, n) || null;

/** Richiesta dalla pagina Professionisti: la riceve il professionista scelto (se c'è) e l'amministratore. */
async function inoltra(f: Record<string, unknown>) {
  const id = Number(f.professionista_id) || 0;
  const pro = id ? (await q('select nome, cognome, professione, email from professionisti where id = $1 and attivo', [id])).rows[0] : null;
  const chi = [f.nome, f.cognome].filter(Boolean).join(' ');
  const testo = [
    `Nuova richiesta di contatto da EreditareCasa${pro ? '' : ' (senza un professionista scelto)'}.`,
    '',
    `Nome: ${chi}`,
    `Email: ${f.email ?? ''}`,
    `Telefono: ${f.telefono ?? ''}`,
    `Comune della casa: ${f.comune ?? ''}`,
    `Cerca: ${PROFESSIONI[String(f.professione ?? '')] ?? 'qualsiasi professionista'}`,
    '',
    `Messaggio: ${f.messaggio ?? ''}`,
    '',
    "La persona ha chiesto di essere ricontattata e ha preso visione dell'informativa privacy.",
  ].join('\n');
  if (pro?.email) await sendMail(pro.email, `Richiesta di contatto da ${chi} (EreditareCasa)`, testo);
  const admin = String(process.env.ADMIN_EMAILS ?? '').split(',')[0]?.trim();
  if (admin) await sendMail(admin, `[EreditareCasa] Richiesta per ${pro ? `${pro.nome} ${pro.cognome}` : 'un professionista'}: ${chi}`, testo);
}

/** Copia nel database dei contatti lasciati nei moduli (PDF, valutazione, scadenzario, percorso), per il pannello admin. */
export const POST: APIRoute = async ({ request, clientAddress }) => {
  if (!sameOrigin(request)) return json({ ok: false }, 403);
  if (rateLimited('lead:' + clientIp(request, clientAddress), 30)) return json({ ok: false }, 429);
  const b = await readBody(request);
  const f = (b.fields ?? {}) as Record<string, unknown>;
  if (!TIPI.has(b.type) || f.website) return json({ ok: true });
  const email = normEmail(f.email);
  if (email && !validEmail(email)) return json({ ok: false, error: 'Email non valida' }, 400);
  // Tutto il resto (risposte, consensi, pagina di provenienza) resta nel campo dati
  const dati = JSON.stringify({ ...f, consent: b.consent ?? null, source: b.source ?? null }).slice(0, 20000);
  await q('insert into contatti (tipo, email, nome, cognome, telefono, comune, dati) values ($1, $2, $3, $4, $5, $6, $7)', [
    b.type, email || null, short(f.nome, 80), short(f.cognome, 80), short(f.telefono, 40), short(f.comune, 80), dati,
  ]);
  if (b.type === 'professionista') await inoltra(f).catch((e) => console.warn('[contatti] inoltro non riuscito', e));
  return json({ ok: true });
};
