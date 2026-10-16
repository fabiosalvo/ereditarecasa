// Invio dei lead all'endpoint configurato (webhook del CRM, Make, Zapier...).
// Ogni invio porta con sé il testo esatto dei consensi mostrati, per poterli dimostrare (GDPR art. 7.1).

export const CONSENT_VERSION = '2026-10-16';

export const CONSENT_TEXT = {
  privacy:
    "Ho letto l'informativa privacy e chiedo di essere ricontattato per la richiesta inviata.",
  marketing:
    'Acconsento a ricevere via email guide, promemoria sulle scadenze e proposte relative alla vendita della casa. Posso revocare il consenso in ogni momento.',
};

export type LeadType = 'valutazione' | 'scadenzario' | 'professionista';

export async function submitLead(type: LeadType, fields: Record<string, unknown>): Promise<void> {
  const endpoint = import.meta.env.PUBLIC_LEAD_ENDPOINT;
  if (!endpoint) {
    throw new Error('PUBLIC_LEAD_ENDPOINT non configurato');
  }
  const params = new URLSearchParams(location.search);
  const payload = {
    type,
    fields,
    consent: {
      version: CONSENT_VERSION,
      privacy: fields.consent_privacy === true ? CONSENT_TEXT.privacy : null,
      marketing: fields.consent_marketing === true ? CONSENT_TEXT.marketing : null,
      timestamp: new Date().toISOString(),
    },
    source: {
      page: location.pathname,
      referrer: document.referrer || null,
      utm: Object.fromEntries([...params].filter(([k]) => k.startsWith('utm_'))),
    },
  };
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Invio non riuscito (${res.status})`);
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
