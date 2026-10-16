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

1. **Dati di Gromia** in `src/data/site.ts` (`TITOLARE`): compilati; manca il numero REA.
2. **Validazione legale** dell'informativa privacy (`src/pages/privacy.astro`) e dei testi dei consensi (`src/scripts/lead.ts`, `src/components/ConsentFields.astro`, da tenere allineati).
3. **Revisione delle guide** da parte di un professionista, con compilazione di `reviewer`.
4. **Lead su Google Sheet**: segui [integrations/google-sheet/README.md](integrations/google-sheet/README.md) e imposta `PUBLIC_LEAD_ENDPOINT` con l'URL della web app. Il payload contiene `type`, `fields`, `consent` (testo e versione) e `source` (pagina, referrer, UTM), inviato come JSON con `Content-Type: text/plain`.
5. **Caselle email** `info@` e `privacy@ereditarecasa.it`.

## Pubblicazione (Railway)

Il `Dockerfile` compila il sito e lo serve con Caddy (`Caddyfile`: compressione, cache degli asset, pagina 404).

1. Il servizio Railway è collegato a questo repository: ogni push su `main` ripubblica il sito.
2. Variabile del servizio `PUBLIC_LEAD_ENDPOINT`: viene letta in fase di build, quindi dopo averla cambiata serve un nuovo deploy.
3. Dominio: in Railway aggiungi `www.ereditarecasa.it` come dominio personalizzato e crea dal registrar il record CNAME indicato. Reindirizza `ereditarecasa.it` su `www` dal registrar.
4. Verifica il dominio in Google Search Console e invia `https://www.ereditarecasa.it/sitemap-index.xml`.

In alternativa il sito funziona su qualsiasi hosting statico (Cloudflare Pages, Netlify): build `npm run build`, cartella `dist`.
