import type { ImageMetadata } from 'astro';
import type { AreaId } from './site';
import hero from '../assets/foto/hero-anziani.jpg';
import chiavi from '../assets/foto/chiavi.jpg';
import vendere from '../assets/foto/vendere.jpg';
import tasse from '../assets/foto/tasse.jpg';
import successione from '../assets/foto/successione.jpg';
import eredi from '../assets/foto/eredi-in-disaccordo.jpg';
import accettare from '../assets/foto/accettare-rinunciare.jpg';
import casi from '../assets/foto/casi.jpg';
import decidere from '../assets/foto/decidere.jpg';

// Foto reali da Unsplash (licenza Unsplash: uso commerciale gratuito, senza obbligo di attribuzione).
// Il numero tra parentesi è l'ID della foto su images.unsplash.com.
export type Foto = { src: ImageMetadata; alt: string };

export const FOTO_HERO: Foto = {
  src: hero, // 1554331292-735256644d5f
  alt: 'Una coppia di anziani seduta di spalle su una panchina guarda le colline e i vigneti',
};

export const FOTO_CHIAVI: Foto = {
  src: chiavi, // 1643804926339
  alt: 'Un mazzo di chiavi di casa appoggiato su un tavolo di legno',
};

export const FOTO_AREA: Record<AreaId, Foto> = {
  'primi-passi': { src: chiavi, alt: 'Un mazzo di chiavi di casa appoggiato su un tavolo di legno' }, // 1643804926339
  'gestire-la-casa': { src: decidere, alt: 'Abbaini con balconi e tetti in coppi di un palazzo italiano' }, // 1668749603181
  'testamento-legittima': { src: successione, alt: 'Una scrivania antica con documenti e strumenti per scrivere' }, // 1766802106922
  vendere: { src: vendere, alt: 'Una mano porge le chiavi di casa davanti alla porta di ingresso' }, // 1741156386380
  tasse: { src: tasse, alt: 'Calcolatrice e penna appoggiate su fogli di calcolo' }, // 1648201637025
  successione: { src: successione, alt: 'Una scrivania antica con documenti e strumenti per scrivere' }, // 1766802106922
  'eredi-in-disaccordo': { src: eredi, alt: 'Due persone con una tazza di caffè ciascuna sedute allo stesso tavolo di legno' }, // 1640037984424
  'accettare-rinunciare': { src: accettare, alt: 'Una mano firma un documento su una scrivania' }, // 1521791055366
  casi: { src: casi, alt: 'Una stanza in ristrutturazione con puntelli e materiali sul pavimento' }, // 1634586648651
  decidere: { src: decidere, alt: 'Abbaini con balconi e tetti in coppi di un palazzo italiano' }, // 1668749603181
};
