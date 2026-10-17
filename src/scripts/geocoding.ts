/**
 * Suggerimenti di comuni e indirizzi con Stadia Maps (Pelias), limitati all'Italia: lo stesso servizio
 * del sito Gromia. In produzione l'accesso si autorizza per dominio nel pannello Stadia (aggiungere
 * ereditarecasa.it); in alternativa si imposta PUBLIC_STADIA_KEY. Se il servizio non risponde il campo
 * resta un normale campo di testo.
 */
export interface Place {
  /** Riga principale: comune, oppure via e civico */
  title: string;
  /** Riga secondaria: provincia/regione, oppure CAP e comune */
  subtitle: string;
  /** Comune dell'indirizzo scelto, per riempire il campo Comune */
  comune?: string;
}

interface Feature {
  properties: { name?: string; label?: string; layer?: string; locality?: string; county?: string; region?: string; postalcode?: string; localadmin?: string };
}

const BASE = 'https://api.stadiamaps.com/geocoding/v1/autocomplete';
const KEY = import.meta.env.PUBLIC_STADIA_KEY as string | undefined;

async function query(text: string, layers: string): Promise<Feature[]> {
  const params = new URLSearchParams({ text, 'boundary.country': 'IT', lang: 'it', size: '6', layers });
  if (KEY) params.set('api_key', KEY);
  const r = await fetch(`${BASE}?${params}`);
  if (!r.ok) throw new Error(`Geocodifica non disponibile (${r.status})`);
  return ((await r.json()) as { features?: Feature[] }).features ?? [];
}

const CIVIC = /\b\d+[a-z]?(\/\d+)?\b/gi;
const dedupe = (list: Place[]) => {
  const seen = new Set<string>();
  return list.filter((p) => {
    const k = `${p.title}|${p.subtitle}`.toLowerCase();
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
};

export async function suggestComuni(text: string): Promise<Place[]> {
  const features = await query(text, 'locality,localadmin');
  return dedupe(
    features.map((f) => {
      const p = f.properties;
      return { title: p.name ?? '', subtitle: [p.county, p.region].filter(Boolean).join(', ') };
    }),
  );
}

/** Indirizzi; se c'è già il comune lo aggiunge alla ricerca. Se il civico non è in archivio cerca la via e lo riporta. */
export async function suggestAddresses(text: string, comune = ''): Promise<Place[]> {
  const withCity = (t: string) => (comune && !t.toLowerCase().includes(comune.toLowerCase()) ? `${t}, ${comune}` : t);
  let features = await query(withCity(text), 'address,street');
  let civic = '';
  if (!features.length && /\d/.test(text)) {
    civic = text.match(CIVIC)?.[0] ?? '';
    const street = text.replace(CIVIC, ' ').replace(/\s+/g, ' ').trim();
    if (street.length >= 3) features = await query(withCity(street), 'address,street');
  }
  return dedupe(
    features.map((f) => {
      const p = f.properties;
      const name = p.name ?? '';
      const label = p.label ?? name;
      const subtitle = (label.startsWith(name) ? label.slice(name.length).replace(/^,\s*/, '') : label).replace(/,?\s*Italia$/, '');
      const title = civic && p.layer === 'street' ? `${name} ${civic}` : name;
      return { title, subtitle, comune: p.locality ?? p.localadmin };
    }),
  );
}
