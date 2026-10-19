// Connessione a Postgres (DATABASE_URL) e creazione delle tabelle al primo uso.
import pg from 'pg';

type Query = (text: string, params?: unknown[]) => Promise<{ rows: any[]; rowCount: number | null }>;

let queryFn: Query | null = null;
let ready: Promise<void> | null = null;

const SCHEMA = `
create table if not exists utenti (
  id bigserial primary key,
  email text not null unique,
  nome text,
  password_hash text,
  google_sub text unique,
  consenso_marketing boolean not null default false,
  versione_consensi text,
  creato_il timestamptz not null default now(),
  ultimo_accesso timestamptz
);
create table if not exists sessioni (
  token_hash text primary key,
  utente_id bigint not null references utenti(id) on delete cascade,
  scade_il timestamptz not null,
  creato_il timestamptz not null default now()
);
create table if not exists reset_password (
  token_hash text primary key,
  utente_id bigint not null references utenti(id) on delete cascade,
  scade_il timestamptz not null
);
create index if not exists sessioni_utente on sessioni(utente_id);
alter table utenti add column if not exists cognome text;
create table if not exists contatti (
  id bigserial primary key,
  tipo text not null,
  email text,
  nome text,
  cognome text,
  telefono text,
  comune text,
  dati jsonb not null default '{}',
  creato_il timestamptz not null default now()
);
create index if not exists contatti_tipo on contatti(tipo, creato_il desc);
create table if not exists professionisti (
  id bigserial primary key,
  nome text not null,
  cognome text not null,
  professione text not null,
  studio text,
  citta text not null,
  provincia text,
  indirizzo text,
  telefono text,
  email text,
  sito text,
  albo text,
  specializzazioni text,
  bio text,
  attivo boolean not null default false,
  candidatura boolean not null default false,
  creato_il timestamptz not null default now()
);
create index if not exists professionisti_attivi on professionisti(attivo, citta)
`;

/** Per i test: usa un'altra implementazione (es. PGlite) al posto di pg. */
export function setQuery(fn: Query) {
  queryFn = fn;
  ready = null;
}

export async function q(text: string, params: unknown[] = []) {
  if (!queryFn) {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error('DATABASE_URL non configurato');
    const pool = new pg.Pool({ connectionString: url, max: Number(process.env.PG_POOL_MAX) || 5, ssl: /sslmode=require/.test(url) ? { rejectUnauthorized: false } : undefined });
    queryFn = (t, p) => pool.query(t, p as any[]);
  }
  if (!ready) {
    const fn = queryFn;
    ready = (async () => {
      for (const stmt of SCHEMA.split(';').map((s) => s.trim()).filter(Boolean)) await fn(stmt);
    })().catch((err) => {
      // Database non raggiungibile: si riprova alla richiesta successiva invece di restare bloccati
      ready = null;
      throw err;
    });
  }
  await ready;
  return queryFn(text, params);
}
