import type { APIRoute } from 'astro';
import { q } from '../../../lib/db';
import { currentUser, isAdmin, json, readBody, sameOrigin } from '../../../lib/auth';
import { CAMPI, PROFESSIONI, leggiProfessionista } from '../../../lib/professionisti';

export const prerender = false;

async function guard(cookies: any) {
  const u = await currentUser(cookies).catch(() => null);
  if (!u) return json({ ok: false, code: 'login' }, 401);
  if (!isAdmin(u)) return json({ ok: false, code: 'vietato' }, 403);
  return null;
}

/** Elenco completo, candidature comprese. */
export const GET: APIRoute = async ({ cookies }) => {
  const no = await guard(cookies);
  if (no) return no;
  const { rows } = await q(
    `select p.*, (select count(*) from contatti c where c.tipo = 'professionista' and c.dati->>'professionista_id' = p.id::text) as richieste
       from professionisti p order by p.attivo, p.creato_il desc`,
  );
  return json({ ok: true, professionisti: rows, professioni: PROFESSIONI });
};

/** Crea o modifica ({id?, ...campi, attivo}), oppure elimina ({id, elimina: true}). */
export const POST: APIRoute = async ({ request, cookies }) => {
  if (!sameOrigin(request)) return json({ ok: false }, 403);
  const no = await guard(cookies);
  if (no) return no;
  const b = await readBody(request);
  const id = Number(b.id) || null;
  if (id && b.elimina === true) {
    await q('delete from professionisti where id = $1', [id]);
    return json({ ok: true });
  }
  if (id && b.solo_attivo === true) {
    await q('update professionisti set attivo = $1, candidatura = false where id = $2', [b.attivo === true, id]);
    return json({ ok: true });
  }
  const p = leggiProfessionista(b);
  if (!p) return json({ ok: false, error: 'Compila nome, cognome, professione e città' }, 400);
  const vals = [...CAMPI.map((k) => p[k]), b.attivo === true];
  if (id) {
    await q(
      `update professionisti set ${CAMPI.map((k, i) => `${k} = $${i + 1}`).join(', ')}, attivo = $${CAMPI.length + 1}, candidatura = false where id = $${CAMPI.length + 2}`,
      [...vals, id],
    );
  } else {
    await q(`insert into professionisti (${CAMPI.join(', ')}, attivo) values (${vals.map((_, i) => `$${i + 1}`).join(', ')})`, vals);
  }
  return json({ ok: true });
};
