# Lead su Google Sheet

I form del sito inviano i lead a una web app Google Apps Script, che li scrive in un Google Sheet: un foglio per tipo (`valutazione`, `scadenzario`, `professionista`) e un'email di avviso per ogni richiesta di valutazione, con priorità Caldo, Tiepido o Freddo.

## Configurazione (10 minuti)

1. Crea un Google Sheet, per esempio "EreditareCasa – Lead", con l'account Google di Gromia.
2. Menu **Estensioni → Apps Script**. Cancella il contenuto di `Codice.gs` e incolla [`Code.gs`](./Code.gs).
3. In cima al file, imposta `NOTIFY_EMAIL` con gli indirizzi che devono ricevere gli avvisi.
4. **Esegui il deployment → Nuovo deployment → Tipo: App web**.
   - Esegui come: **Me**
   - Chi ha accesso: **Chiunque**
5. Autorizza lo script quando richiesto: serve per scrivere nel foglio e inviare email.
6. Copia l'**URL dell'app web** (termina con `/exec`) e impostalo come variabile `PUBLIC_LEAD_ENDPOINT` nell'hosting del sito. Poi rifai il deploy del sito.

Se modifichi lo script, usa **Gestisci deployment → Modifica → Nuova versione**: l'URL resta lo stesso.

## Note

- Il foglio contiene dati personali: condividilo solo con chi gestisce i lead e cancella le righe oltre i tempi di conservazione indicati nell'informativa (24 mesi dall'ultimo contatto).
- La colonna `stato` serve per il lavoro commerciale (Nuovo, Contattato, Appuntamento, Incarico, Perso).
- Le quote Google per account gratuiti consentono circa 100 email al giorno: più che sufficienti all'avvio.
