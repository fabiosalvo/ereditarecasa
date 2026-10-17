// Accesso alle guide complete: dopo l'email lo ricordiamo in questo browser.
const KEY = 'ec-accesso';

export function hasAccess(): boolean {
  try {
    return Boolean(localStorage.getItem(KEY));
  } catch {
    return false;
  }
}

export function unlock(email: string): void {
  try {
    localStorage.setItem(KEY, JSON.stringify({ email, at: new Date().toISOString() }));
  } catch {
    // archiviazione non disponibile: sblocchiamo solo questa pagina
  }
  document.documentElement.classList.remove('ec-locked');
  document.dispatchEvent(new CustomEvent('ec:unlocked'));
}
