// Directory dei professionisti: campi comuni ad API pubblica e pannello admin.
export const PROFESSIONI: Record<string, string> = {
  notaio: 'Notaio',
  avvocato: 'Avvocato',
  commercialista: 'Commercialista',
  geometra: 'Geometra o architetto',
};

export const CAMPI = ['nome', 'cognome', 'professione', 'studio', 'citta', 'provincia', 'indirizzo', 'telefono', 'email', 'sito', 'albo', 'specializzazioni', 'bio'] as const;

/** Pulisce i dati arrivati da un modulo; null se mancano i campi indispensabili. */
export function leggiProfessionista(b: Record<string, unknown>) {
  const out: Record<string, string | null> = {};
  for (const k of CAMPI) out[k] = String(b[k] ?? '').trim().slice(0, k === 'bio' || k === 'specializzazioni' ? 800 : 160) || null;
  if (out.sito && !/^https?:\/\//i.test(out.sito)) out.sito = 'https://' + out.sito;
  if (!out.nome || !out.cognome || !out.citta || !PROFESSIONI[out.professione ?? '']) return null;
  return out;
}
