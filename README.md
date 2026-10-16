# EreditareCasa.it

Sito verticale sulla casa ereditata: guide, strumenti e richiesta di valutazione. Sito statico in [Astro](https://astro.build), senza database né cookie di profilazione.

## Sviluppo

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # genera dist/
```

## Struttura

| Percorso | Contenuto |
| --- | --- |
| `src/content/guide/*.md` | Guide in Markdown. `area` + `slug` decidono l'URL; `pillar: true` è la pagina principale dell'area |
| `src/data/site.ts` | Brand, aree tematiche, menu e **dati del titolare** |
| `src/data/glossario.ts` | Voci del glossario |
| `src/pages/strumenti/` | Calcolatore imposte e scadenzario |
| `src/pages/valuta-casa-ereditata.astro` | Form di valutazione in 3 passi |
| `src/scripts/lead.ts` | Invio dei lead e testo versionato dei consensi |

### Aggiungere una guida

Crea un file in `src/content/guide/` con questo frontmatter (le stringhe con `:` vanno tra virgolette):

```yaml
---
title: "Titolo della guida"
description: "Massimo 170 caratteri, usata come meta description."
area: tasse          # vendere | tasse | successione | eredi-in-disaccordo | accettare-rinunciare | casi | decidere
slug: nome-url       # → /casa-ereditata/tasse/nome-url/
order: 30
updated: 2026-10-16
reviewer:            # da compilare dopo la revisione del professionista
  name: "Avv. Nome Cognome"
  role: "Avvocato, Foro di Milano"
faq:
  - q: "Domanda?"
    a: "Risposta."
---
```

Senza `reviewer` la pagina mostra "Revisione professionale in corso".

## Prima della pubblicazione

1. **Dati di Gromia** in `src/data/site.ts` (`TITOLARE`): ragione sociale, sede, P.IVA, REA. Sono obbligatori nel footer e nell'informativa.
2. **Validazione legale** dell'informativa privacy (`src/pages/privacy.astro`) e dei testi dei consensi (`src/scripts/lead.ts`, `src/components/ConsentFields.astro`, da tenere allineati).
3. **Revisione delle guide** da parte di un professionista, con compilazione di `reviewer`.
4. **Endpoint dei lead**: impostare `PUBLIC_LEAD_ENDPOINT` (vedi `.env.example`) con un webhook HTTPS che accetta JSON, per esempio Make o Zapier verso il CRM di Gromia. L'endpoint deve consentire richieste CORS dal dominio del sito. Il payload contiene `type`, `fields`, `consent` (testo e versione) e `source` (pagina, referrer, UTM).
5. **Caselle email** `info@` e `privacy@ereditarecasa.it`.

## Pubblicazione (Cloudflare Pages, gratuito)

1. Cloudflare Pages → Create project → collega questo repository.
2. Build command `npm run build`, output directory `dist`.
3. Variabile d'ambiente `PUBLIC_LEAD_ENDPOINT`.
4. Collega il dominio `www.ereditarecasa.it` e reindirizza `ereditarecasa.it` su `www`.
5. Verifica il dominio in Google Search Console e invia `https://www.ereditarecasa.it/sitemap-index.xml`.
