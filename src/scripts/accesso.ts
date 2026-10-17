// Stato di accesso dell'utente. La verità è il server (/api/auth/io/); in questo browser
// teniamo solo un promemoria per non far lampeggiare i contenuti riservati.
const KEY = 'ec-accesso';

export type Utente = {
  email: string;
  nome: string | null;
  consenso_marketing?: boolean;
  ha_password?: boolean;
  google?: boolean;
  creato_il?: string;
};

export function hasAccess(): boolean {
  try {
    return Boolean(localStorage.getItem(KEY));
  } catch {
    return false;
  }
}

export async function me(): Promise<Utente | null> {
  try {
    const r = await fetch('/api/auth/io/', { credentials: 'same-origin', cache: 'no-store' });
    if (!r.ok) return null;
    return (await r.json()).utente ?? null;
  } catch {
    return null;
  }
}

export function markLoggedIn(u: Utente) {
  try {
    localStorage.setItem(KEY, JSON.stringify({ email: u.email, nome: u.nome }));
  } catch {}
  document.documentElement.classList.remove('ec-locked');
  document.documentElement.classList.add('ec-logged');
  document.dispatchEvent(new CustomEvent('ec:unlocked', { detail: u }));
}

export function markLoggedOut() {
  try {
    localStorage.removeItem(KEY);
  } catch {}
  document.documentElement.classList.remove('ec-logged');
  if (document.querySelector('[data-gate]')) document.documentElement.classList.add('ec-locked');
}

export async function api(path: string, body: unknown = {}) {
  try {
    const r = await fetch(`/api/auth/${path}/`, {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    return (await r.json()) as { ok: boolean; error?: string; code?: string; utente?: Utente };
  } catch {
    return { ok: false, error: 'Servizio non disponibile, riprova tra poco' };
  }
}

/** Esegue `then` subito se l'utente ha già fatto l'accesso, altrimenti apre la finestra di accesso. */
export function requireLogin(then: () => void, mode: 'registrati' | 'accedi' = 'registrati') {
  if (document.documentElement.classList.contains('ec-logged')) return then();
  (window as any).ecOpenAuth?.(mode, then);
}
