// Password (scrypt), sessioni con cookie httpOnly, limiti ai tentativi e controlli sulle richieste.
import { createHash, randomBytes, scrypt as _scrypt, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';
import type { AstroCookies } from 'astro';
import { q } from './db';

const scrypt = promisify(_scrypt) as (pw: string, salt: Buffer, len: number, opts: object) => Promise<Buffer>;
const N = 16384, R = 8, P = 1, LEN = 64;

export const COOKIE = 'ec_sess';
const SESSION_DAYS = 30;

export async function hashPassword(pw: string): Promise<string> {
  const salt = randomBytes(16);
  const key = await scrypt(pw, salt, LEN, { N, r: R, p: P, maxmem: 64 * 1024 * 1024 });
  return `scrypt$${N}$${R}$${P}$${salt.toString('base64')}$${key.toString('base64')}`;
}

export async function verifyPassword(pw: string, stored: string | null): Promise<boolean> {
  if (!stored) return false;
  const [alg, n, r, p, salt, hash] = stored.split('$');
  if (alg !== 'scrypt') return false;
  const expected = Buffer.from(hash, 'base64');
  const key = await scrypt(pw, Buffer.from(salt, 'base64'), expected.length, { N: +n, r: +r, p: +p, maxmem: 64 * 1024 * 1024 });
  return key.length === expected.length && timingSafeEqual(key, expected);
}

const sha = (s: string) => createHash('sha256').update(s).digest('hex');
export const newToken = () => randomBytes(32).toString('base64url');

export async function createSession(cookies: AstroCookies, userId: number, secure: boolean) {
  const token = newToken();
  const expires = new Date(Date.now() + SESSION_DAYS * 864e5);
  await q('insert into sessioni (token_hash, utente_id, scade_il) values ($1, $2, $3)', [sha(token), userId, expires]);
  await q('update utenti set ultimo_accesso = now() where id = $1', [userId]);
  cookies.set(COOKIE, token, { httpOnly: true, secure, sameSite: 'lax', path: '/', expires });
}

export type Utente = { id: number; email: string; nome: string | null; cognome: string | null; consenso_marketing: boolean; ha_password: boolean; google: boolean; creato_il: string };

export async function currentUser(cookies: AstroCookies): Promise<Utente | null> {
  const token = cookies.get(COOKIE)?.value;
  if (!token) return null;
  const { rows } = await q(
    `select u.id, u.email, u.nome, u.cognome, u.consenso_marketing, u.password_hash is not null as ha_password,
            u.google_sub is not null as google, u.creato_il
       from sessioni s join utenti u on u.id = s.utente_id
      where s.token_hash = $1 and s.scade_il > now()`,
    [sha(token)],
  );
  return rows[0] ?? null;
}

export async function destroySession(cookies: AstroCookies) {
  const token = cookies.get(COOKIE)?.value;
  if (token) await q('delete from sessioni where token_hash = $1', [sha(token)]);
  cookies.delete(COOKIE, { path: '/' });
}

export async function createResetToken(userId: number): Promise<string> {
  const token = newToken();
  await q('delete from reset_password where utente_id = $1', [userId]);
  await q('insert into reset_password (token_hash, utente_id, scade_il) values ($1, $2, $3)', [sha(token), userId, new Date(Date.now() + 3600e3)]);
  return token;
}

export async function consumeResetToken(token: string): Promise<number | null> {
  const { rows } = await q('delete from reset_password where token_hash = $1 and scade_il > now() returning utente_id', [sha(token)]);
  return rows[0]?.utente_id ?? null;
}

// --- richieste ---

export const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' } });

/** Accetta solo POST JSON dallo stesso sito (difesa CSRF insieme al cookie SameSite=Lax). */
export function sameOrigin(request: Request): boolean {
  const origin = request.headers.get('origin');
  const host = request.headers.get('x-forwarded-host') ?? request.headers.get('host');
  if (!origin || !host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

// In produzione il sito è sempre in https (TLS chiuso da Railway prima di Caddy): cookie sempre Secure
export const isSecure = (request: Request) =>
  process.env.NODE_ENV === 'production' ||
  (request.headers.get('x-forwarded-proto') ?? new URL(request.url).protocol.replace(':', '')) === 'https';

const hits = new Map<string, { n: number; reset: number }>();
/** Massimo `max` tentativi per chiave ogni 15 minuti. */
export function rateLimited(key: string, max = 10): boolean {
  const now = Date.now();
  const h = hits.get(key);
  if (!h || h.reset < now) {
    hits.set(key, { n: 1, reset: now + 15 * 60e3 });
    return false;
  }
  h.n++;
  return h.n > max;
}

export const clientIp = (request: Request, fallback: string) =>
  request.headers.get('x-forwarded-for')?.split(',')[0].trim() || fallback;

export const normEmail = (e: unknown) => String(e ?? '').trim().toLowerCase();
export const validEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e) && e.length <= 254;
export const validPassword = (p: unknown) => typeof p === 'string' && p.length >= 8 && p.length <= 200;

export async function readBody(request: Request): Promise<Record<string, any>> {
  try {
    return await request.json();
  } catch {
    return {};
  }
}

/** Amministratori: indirizzi in ADMIN_EMAILS (separati da virgola), con accesso fatto al sito. */
export function isAdmin(u: { email: string } | null): boolean {
  if (!u) return false;
  const list = String(process.env.ADMIN_EMAILS ?? '').split(',').map((e) => e.trim().toLowerCase()).filter(Boolean);
  return list.includes(u.email.toLowerCase());
}
