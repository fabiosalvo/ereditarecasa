# Linee guida per le guide di EreditareCasa.it

Pubblico: persone che hanno appena perso un familiare e hanno ereditato una casa. Sono spesso stanche, confuse, non esperte. Vogliono sapere **cosa fare, in che ordine, quanto costa e cosa rischiano**.

## File e metadati

Ogni guida è un file Markdown in `src/content/guide/`. Nome file: `<area>-<slug>.md` (es. `tasse-tari.md`). L'URL è `percorso dell'area` + `slug`.

```yaml
---
title: "Titolo che contiene la domanda o la parola chiave (max ~65 caratteri)"
description: "Riassunto per Google, massimo 170 caratteri, con la risposta in breve."
area: tasse            # primi-passi | gestire-la-casa | vendere | tasse | successione | eredi-in-disaccordo | accettare-rinunciare | testamento-legittima | casi | decidere
slug: tari             # vuoto ('') solo per la pagina principale dell'area, con pillar: true
order: 30              # ordine nella lista dell'area
updated: 2026-10-17
verified: 2026-10-17   # SOLO se hai verificato i fatti su fonti primarie aperte (Normattiva, Agenzia delle Entrate, Gazzetta Ufficiale, siti istituzionali)
fonti:
  - title: "Nome leggibile della fonte"
    url: "https://..."
faq:
  - q: "Domanda reale?"
    a: "Risposta completa in 1-3 frasi."
---
```

Tutte le stringhe tra virgolette doppie; virgolette interne con `\"`. Le date sono date YAML (senza virgolette).

## Struttura del testo

1. **Prima frase = la risposta**, in grassetto se utile. Nessuna introduzione generica.
2. Sezioni con `##`, titoli che sono domande o azioni.
3. **Almeno una tabella** (confronto, scadenze, costi, chi paga cosa).
4. **Un "Esempio pratico"** con nomi di fantasia e numeri realistici (es. "Marco e Giulia ereditano...").
5. Un box di attenzione con `> **Attenzione.** ...` per errori comuni o rischi (es. accettazione tacita).
6. Chiusura con il blocco HTML:
   ```html
   <div class="next-step">
     <h2>Cosa fare adesso</h2>
     <p>... con 1-2 link interni utili ...</p>
   </div>
   ```
7. 3-5 FAQ nel frontmatter, diverse dai titoli delle sezioni.

Lunghezza: **minimo 2.000 parole** di corpo del testo (escluse FAQ e frontmatter), ottenute con esempi, casi, tabelle e checklist, mai con riempitivi. Frasi brevi, "tu", lessico semplice; spiega ogni termine tecnico la prima volta. Tono rispettoso del lutto, mai commerciale nelle guide: la vendita è una delle opzioni, non l'obiettivo.

## Accuratezza

- Ogni regola, termine, importo o percentuale deve essere verificato su una fonte primaria che hai **aperto** (Normattiva con URN, Agenzia delle Entrate, Gazzetta Ufficiale, INPS, Garante, siti dei Comuni per esempi). Le fonti secondarie (giornali, blog di studi) servono solo per individuare i temi.
- Se un punto è incerto o dipende dalla giurisprudenza, dillo ("secondo l'orientamento prevalente", "alcune sentenze") e suggerisci il professionista giusto.
- Non inventare numeri, sentenze o percentuali. Meglio "verifica con il Comune" che un dato sbagliato.
- Riforme: dal 1° gennaio 2027 il Testo unico successioni (D.Lgs. 346/1990) confluisce nel D.Lgs. 123/2025 e l'art. 67 TUIR nel D.Lgs. 117/2026; le guide descrivono le regole per le successioni aperte nel 2025-2026 e, dove rilevante, lo segnalano.
- Codice civile: URL Normattiva nella forma `https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:regio.decreto:1942-03-16;262~art732`.

## Link interni utili

- Strumenti: `/strumenti/calcolatore-imposte-successione/`, `/strumenti/scadenzario-successione/`, `/valuta-casa-ereditata/`
- Guide: `/casa-ereditata/vendere/`, `/casa-ereditata/vendere/con-piu-eredi/`, `/casa-ereditata/tasse/`, `/casa-ereditata/tasse/plusvalenza/`, `/casa-ereditata/tasse/imu/`, `/casa-ereditata/successione/`, `/eredi-in-disaccordo/`, `/eredi-in-disaccordo/vendere-quota/`, `/casa-ereditata/accettare-rinunciare/`, `/casa-ereditata/casi/`, `/casa-ereditata/decidere/`, `/glossario/`, `/professionisti/`
- Nuove aree: `/casa-ereditata/primi-passi/`, `/casa-ereditata/gestire-la-casa/`, `/casa-ereditata/testamento-e-legittima/`

Puoi linkare anche le nuove guide in preparazione: l'URL è il percorso dell'area seguito dallo slug.
