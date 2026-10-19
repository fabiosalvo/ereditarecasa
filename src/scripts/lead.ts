// Invio dei lead all'endpoint configurato (webhook del CRM, Make, Zapier...).
// Ogni invio porta con sé il testo esatto dei consensi mostrati, per poterli dimostrare (GDPR art. 7.1).

export const CONSENT_VERSION = '2026-10-16';

export const CONSENT_TEXT = {
  privacy:
    "Ho letto l'informativa privacy e chiedo di essere ricontattato per la richiesta inviata.",
  registrazione:
    "Registrandomi dichiaro di aver letto l'informativa privacy (registrazione per leggere le guide complete).",
  marketing:
    'Acconsento a ricevere via email guide, promemoria sulle scadenze e proposte relative alla vendita della casa. Posso revocare il consenso in ogni momento.',
};

export type LeadType = 'valutazione' | 'scadenzario' | 'professionista' | 'guida' | 'percorso' | 'registrazione';

export async function submitLead(type: LeadType, fields: Record<string, unknown>): Promise<void> {
  // Campo trappola invisibile: lo compilano solo i bot
  if (fields.website) return;
  delete fields.website;
  const endpoint = import.meta.env.PUBLIC_LEAD_ENDPOINT;
  const params = new URLSearchParams(location.search);
  const payload = {
    type,
    fields,
    consent: {
      version: CONSENT_VERSION,
      privacy: type === 'registrazione' ? CONSENT_TEXT.registrazione : fields.consent_privacy === true ? CONSENT_TEXT.privacy : null,
      marketing: fields.consent_marketing === true ? CONSENT_TEXT.marketing : null,
      timestamp: new Date().toISOString(),
    },
    source: {
      page: location.pathname,
      referrer: document.referrer || null,
      utm: Object.fromEntries([...params].filter(([k]) => k.startsWith('utm_'))),
    },
  };
  // Copia nel database del sito (pannello admin); le registrazioni sono già nella tabella utenti
  const saved: Promise<boolean> =
    type === 'registrazione' || type === 'professionista'
      ? Promise.resolve(false)
      : fetch('/api/contatti/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
          .then((r) => r.ok)
          .catch(() => false);
  if (!endpoint) {
    if (await saved) return;
    throw new Error('PUBLIC_LEAD_ENDPOINT non configurato');
  }
  try {
    await sendToSheet(endpoint, payload);
  } catch (err) {
    // Basta che il contatto sia arrivato in una delle due destinazioni
    if (await saved) return;
    throw err;
  }
  await saved;
}

async function sendToSheet(endpoint: string, payload: unknown): Promise<void> {
  // text/plain evita la richiesta preliminare CORS, che Google Apps Script non gestisce;
  // il corpo resta JSON e lo script lo legge da e.postData.contents.
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Invio non riuscito (${res.status})`);
  const body = await res.json().catch(() => null);
  if (body && body.ok === false) throw new Error(body.error || 'Invio rifiutato');
}

// Valori del form come oggetto; le checkbox diventano booleani.
export function formToObject(form: HTMLFormElement): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const el of Array.from(form.elements) as HTMLInputElement[]) {
    if (!el.name) continue;
    if (el.type === 'checkbox') out[el.name] = el.checked;
    else if (el.type === 'radio') {
      if (el.checked) out[el.name] = el.value;
    } else out[el.name] = el.value.trim();
  }
  return out;
}
