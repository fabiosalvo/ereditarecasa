// Marcature schema.org riusate da più pagine (strumenti e servizi).
import { SITE } from '../data/site';

const abs = (path: string) => new URL(path, SITE.url).toString();
const provider = { '@id': `${SITE.url}/#organization` };

/** Strumento gratuito online (calcolatore, scadenzario, percorso). */
export const webApp = (name: string, path: string, description: string) => ({
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name,
  url: abs(path),
  description,
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  browserRequirements: 'Richiede JavaScript',
  inLanguage: 'it-IT',
  isAccessibleForFree: true,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  provider,
});

/** Servizio gratuito su richiesta (valutazione, contatto con professionisti). */
export const service = (name: string, path: string, description: string, serviceType: string) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name,
  url: abs(path),
  description,
  serviceType,
  areaServed: { '@type': 'Country', name: 'Italia' },
  audience: { '@type': 'Audience', audienceType: 'Eredi di un immobile' },
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR', description: 'Gratuito e senza impegno' },
  provider,
});
