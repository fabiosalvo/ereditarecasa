export const SITE = {
  name: 'EreditareCasa',
  domain: 'ereditarecasa.it',
  url: 'https://www.ereditarecasa.it',
  tagline: 'La guida per chi ha ereditato una casa',
  description:
    'Hai ereditato una casa? Guide pratiche su successione, tasse, eredi in disaccordo e vendita, con strumenti di calcolo e scadenze.',
};

// Dati del titolare e prestatore del servizio (D.Lgs. 70/2003 art. 7, GDPR art. 13).
export const TITOLARE = {
  ragioneSociale: 'Gromia S.r.l.',
  sede: 'Via Segantini 26, 20143 Milano',
  piva: 'IT08726630968',
  // Numero di iscrizione al Registro delle Imprese (per le società coincide con il codice fiscale)
  registroImprese: 'Registro delle Imprese di Milano Monza Brianza Lodi n. 08726630968',
  // TODO: numero REA (es. MI-1234567), dalla visura camerale
  rea: '',
  emailPrivacy: 'privacy@ereditarecasa.it',
  emailContatti: 'info@ereditarecasa.it',
};

export type AreaId =
  | 'vendere'
  | 'tasse'
  | 'successione'
  | 'eredi-in-disaccordo'
  | 'accettare-rinunciare'
  | 'casi'
  | 'decidere';

export const AREAS: { id: AreaId; path: string; title: string; short: string }[] = [
  { id: 'vendere', path: '/casa-ereditata/vendere/', title: 'Vendere casa ereditata', short: 'Passaggi, documenti, tempi e costi della vendita.' },
  { id: 'tasse', path: '/casa-ereditata/tasse/', title: 'Tasse sulla casa ereditata', short: 'Imposta di successione, ipotecaria, catastale, IMU, plusvalenza.' },
  { id: 'successione', path: '/casa-ereditata/successione/', title: 'Successione con immobili', short: 'Dichiarazione, volture e scadenze quando c’è una casa.' },
  { id: 'eredi-in-disaccordo', path: '/eredi-in-disaccordo/', title: 'Eredi in disaccordo', short: 'Quando un erede non vuole vendere: quote, divisione, mediazione.' },
  { id: 'accettare-rinunciare', path: '/casa-ereditata/accettare-rinunciare/', title: 'Accettare o rinunciare', short: 'Accettazione, beneficio d’inventario e rinuncia all’eredità.' },
  { id: 'casi', path: '/casa-ereditata/casi/', title: 'Situazioni particolari', short: 'Casa con mutuo, occupata, non conforme, usufrutto del coniuge.' },
  { id: 'decidere', path: '/casa-ereditata/decidere/', title: 'Vendere, affittare o tenere', short: 'Costi, rendimenti e pro e contro di ogni scelta.' },
];

export const areaById = (id: AreaId) => AREAS.find((a) => a.id === id)!;

export const guideUrl = (area: AreaId, slug: string) => areaById(area).path + (slug ? `${slug}/` : '');

export const NAV = [
  { href: '/casa-ereditata/', label: 'Guide' },
  { href: '/strumenti/', label: 'Strumenti' },
  { href: '/eredi-in-disaccordo/', label: 'Eredi in disaccordo' },
  { href: '/professionisti/', label: 'Professionisti' },
];
