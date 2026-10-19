import type { APIRoute } from 'astro';
import { q } from '../../../lib/db';
import { currentUser, isAdmin, json } from '../../../lib/auth';

export const prerender = false;

type Col = [key: string, label: string];
const COLS: Record<string, Col[]> = {
  utenti: [['creato_il', 'Registrato il'], ['nome', 'Nome'], ['cognome', 'Cognome'], ['email', 'Email'], ['metodo', 'Accesso'], ['marketing', 'Consenso marketing'], ['ultimo_accesso', 'Ultimo accesso']],
  guida: [['creato_il', 'Data'], ['nome', 'Nome'], ['cognome', 'Cognome'], ['email', 'Email'], ['telefono', 'Telefono'], ['comune', 'Comune'], ['intenzione', 'Intenzione'], ['guida', 'Guida'], ['marketing', 'Consenso marketing']],
  valutazione: [['creato_il', 'Data'], ['nome', 'Nome'], ['cognome', 'Cognome'], ['email', 'Email'], ['telefono', 'Telefono'], ['indirizzo', 'Indirizzo'], ['civico', 'Civico'], ['comune', 'Comune'], ['tipologia', 'Tipo'], ['mq', 'm²'], ['obiettivo', 'Obiettivo'], ['tempi', 'Tempi'], ['marketing', 'Consenso marketing']],
  altri: [['creato_il', 'Data'], ['tipo', 'Modulo'], ['nome', 'Nome'], ['cognome', 'Cognome'], ['email', 'Email'], ['telefono', 'Telefono'], ['marketing', 'Consenso marketing']],
};

async function rows(tipo: string, cerca: string, limit: number) {
  const like = `%${cerca.toLowerCase()}%`;
  if (tipo === 'utenti') {
    const { rows } = await q(
      `select creato_il, nome, cognome, email,
              case when google_sub is not null and password_hash is not null then 'Google + password'
                   when google_sub is not null then 'Google' else 'Email e password' end as metodo,
              case when consenso_marketing then 'Sì' else 'No' end as marketing, ultimo_accesso
         from utenti
        where $1 = '%%' or lower(coalesce(nome,'') || ' ' || coalesce(cognome,'') || ' ' || email) like $1
        order by creato_il desc limit $2`,
      [like, limit],
    );
    return rows;
  }
  const filtro = tipo === 'altri' ? `tipo in ('scadenzario', 'percorso')` : `tipo = '${tipo === 'guida' ? 'guida' : 'valutazione'}'`;
  const { rows } = await q(
    `select creato_il, tipo, nome, cognome, email, telefono, comune, dati from contatti
      where ${filtro}
        and ($1 = '%%' or lower(coalesce(nome,'') || ' ' || coalesce(cognome,'') || ' ' || coalesce(email,'') || ' ' || coalesce(telefono,'') || ' ' || coalesce(comune,'')) like $1)
      order by creato_il desc limit $2`,
    [like, limit],
  );
  return rows.map((r: any) => {
    const d = r.dati ?? {};
    return { ...d, ...r, dati: undefined, marketing: d.consent_marketing === true ? 'Sì' : 'No' };
  });
}

const fmt = (v: unknown) => (v instanceof Date ? v.toLocaleString('it-IT', { timeZone: 'Europe/Rome' }) : v == null ? '' : String(v));
const csvCell = (v: string) => (/[";\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v);

/** Dati per il pannello admin: solo per gli indirizzi in ADMIN_EMAILS. ?tipo=utenti|guida|valutazione|altri &q=ricerca &formato=csv */
export const GET: APIRoute = async ({ cookies, url }) => {
  const u = await currentUser(cookies).catch(() => null);
  if (!u) return json({ ok: false, code: 'login' }, 401);
  if (!isAdmin(u)) return json({ ok: false, code: 'vietato' }, 403);
  const tipo = COLS[url.searchParams.get('tipo') ?? ''] ? url.searchParams.get('tipo')! : 'utenti';
  const cerca = (url.searchParams.get('q') ?? '').trim().slice(0, 100);
  const csv = url.searchParams.get('formato') === 'csv';
  const data = await rows(tipo, cerca, csv ? 100000 : 5000);
  const cols = COLS[tipo];
  const table = data.map((r: any) => cols.map(([k]) => fmt(r[k])));

  if (csv) {
    // Punto e virgola e BOM: si apre bene in Excel italiano
    const body = '﻿' + [cols.map(([, l]) => l), ...table].map((row) => row.map(csvCell).join(';')).join('\r\n');
    return new Response(body, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="ereditarecasa-${tipo}-${new Date().toISOString().slice(0, 10)}.csv"`,
        'Cache-Control': 'no-store',
      },
    });
  }

  const conta = async (sql: string) => Number((await q(sql)).rows[0].n);
  const totali = {
    utenti: await conta('select count(*) as n from utenti'),
    guida: await conta(`select count(*) as n from contatti where tipo = 'guida'`),
    valutazione: await conta(`select count(*) as n from contatti where tipo = 'valutazione'`),
    altri: await conta(`select count(*) as n from contatti where tipo in ('scadenzario', 'percorso')`),
    settimana: await conta(`select (select count(*) from utenti where creato_il > now() - interval '7 days') + (select count(*) from contatti where creato_il > now() - interval '7 days') as n`),
  };
  return json({ ok: true, tipo, colonne: cols.map(([, l]) => l), righe: table, totali });
};
