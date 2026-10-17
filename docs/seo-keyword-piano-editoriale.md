# EreditareCasa: ricerca keyword e piano editoriale (19 ottobre 2026 - 10 gennaio 2027)

Documento di lavoro SEO, redatto il 17 ottobre 2026. Copre: metodo, cluster di keyword con la copertura attuale del sito, gap, piano editoriale di 12 settimane, ottimizzazioni on-page e 10 featured snippet.

> **Nota sulle fonti.** Le risposte dei featured snippet e le affermazioni normative riprendono quanto già scritto nelle guide del sito, che rinviano a fonti primarie. Ogni nuovo contenuto va comunque verificato su fonti primarie aperte prima della pubblicazione, come chiedono `docs/linee-guida-contenuti.md` e il metodo editoriale. I temi segnati con **(da verificare)** dipendono da prassi o novità che non ho controllato su fonte primaria.

---

## 1. Metodo (dichiarato)

Non abbiamo accesso a strumenti che danno i volumi di ricerca (Ahrefs, Semrush, Keyword Planner). **In questo documento non c'è nessun dato di volume.** Ho usato solo metodi verificabili e ripetibili:

| Metodo | Cosa ho fatto | Esito |
|---|---|---|
| **Google Autocomplete** | Ho interrogato `suggestqueries.google.com/complete/search?client=firefox&hl=it&gl=it` per i **28 semi** richiesti. Per ogni seme: il seme da solo, 6 prefissi ("come", "quanto", "cosa", "posso", "chi paga", "conviene") e 21 suffissi alfabetici ("seme a" ... "seme z"), cioè 28 query per seme e circa 780 query in tutto. Poi ho fatto un secondo giro su **44 semi aggiuntivi** legati alla vendita e al calendario (es. "vendita casa ereditata", "erede non vuole vendere", "valutazione casa ereditata", "imu dicembre 2026", "successione precompilata"), ciascuno con 7 suffissi. | **3.537 suggerimenti unici** raccolti il 17/10/2026. I dati grezzi sono in un file JSON nella scratchpad della sessione (non sono nel repository). |
| **WebSearch** | Ricerche mirate per capire l'intento e i dubbi ricorrenti: "vendere casa ereditata prima della successione", "casa ereditata occupata da un erede chi paga imu 730 forum", "valutazione casa ereditata gratuita", "erede non vuole vendere", "successione precompilata 2026". | Ho visto chi compare nei risultati (Money.it, Wikicasa, Brocardi, RealAdvisor, Condominioweb, Fiscoetasse, Dequo, PMI.it) e quali equivoci circolano (vedi 1.2). |
| **Google Trends** | Ho provato l'endpoint `trends.google.com/trends/api/explore`. | **Bloccato (HTTP 429).** Non ci sono confronti Trends: la stagionalità si basa sul calendario fiscale, non su curve di ricerca. |
| **Analisi del sito** | Ho estratto title, description e H2 delle 49 guide e dei 6 articoli del blog, e cercato nel testo i temi candidati (`grep`). | Ogni cluster ha una pagina che lo copre, oppure è marcato "scoperta". |

### 1.1 Come leggere la stima "potenziale" (qualitativa)

L'Autocomplete non misura i volumi. Indica però che una query ha una domanda ricorrente e quali code lunghe esistono. La stima **Alta / Media / Bassa** combina tre segnali osservabili:

1. **Ampiezza del seme**: quanti suggerimenti unici produce un seme con prefissi e suffissi. Ad esempio "accettazione eredità" ne produce 235, "dichiarazione di successione" 232, "rinuncia eredità" 231, "imposta di successione" 227, "quota legittima" 211, "divisione ereditaria" 210, "casa ereditata" 207, "tasse successione" 181, "successione casa" 174, "casa donata" 157, "usufrutto casa" 155. Più in basso "vendere casa ereditata" 74, "prima casa ereditata" 70, "plusvalenza casa ereditata" 18, "casa ereditata fratelli" 16, "casa ereditata affittare" 7, "comprare quota fratello" 0.
2. **Posizione**: se la query compare tra i primi suggerimenti del seme base o di un prefisso. L'ordine riflette la popolarità relativa.
3. **Ricorrenza trasversale**: se la stessa formulazione esce da semi diversi. Ad esempio "occupata da un erede" esce sia da "casa ereditata" sia da "imu casa ereditata", e "prima dei 5 anni" esce in 13 suggerimenti distinti da 5 semi.

- **Alta**: seme ampio (oltre 150 suggerimenti) **oppure** query che compare tra i primi 3 del seme base e ricorre in almeno 3 semi.
- **Media**: compare nel seme base o in un prefisso, oppure ricorre in 2 semi.
- **Bassa**: compare solo nelle espansioni alfabetiche, oppure **nessun suggerimento** (es. "valutazione casa ereditata", "quanto vale casa ereditata", "agenzia immobiliare casa ereditata", "successione 2027").

> **Limite.** Un seme giuridico (es. "eredità giacente", 194 suggerimenti) può essere ampio perché lo cercano i professionisti (curatori, avvocati). Ampiezza non vuol dire traffico utile. Per questo la priorità finale pesa anche l'intento e la vicinanza alla vendita.

### 1.2 Cosa ho imparato da WebSearch sull'intento

- **"Vendere casa ereditata prima della successione"**: le prime SERP (Money.it, Wikicasa, Brocardi, Dequo) rispondono "no, serve prima la dichiarazione". È una domanda di chi vuole vendere subito, quindi intento vicino alla vendita. Oggi nessuna nostra pagina contiene la frase "prima della successione" (grep = 0).
- **"Prima dei 5 anni"**: alcuni siti generalisti (Investireoggi, Trend-online) confondono la regola della plusvalenza sugli immobili comprati con la casa ereditata. È un'occasione per essere la risposta corretta e chiara. La nostra guida plusvalenza ha già la regola giusta ma non ha "5 anni" né "tasse vendita" nel title.
- **IMU con un erede che abita la casa** (madre, fratello): nei forum (Condominioweb, Fiscoetasse) le risposte sono contraddittorie. C'è spazio per una pagina autorevole. Il tema è anche stagionale: saldo IMU del 16 dicembre.
- **"Valutazione casa ereditata gratuita"**: la SERP è presidiata da portali e agenzie (RealAdvisor, Von Poll). L'Autocomplete non suggerisce nulla, quindi il volume è probabilmente basso, ma la query è molto transazionale. Strategia: non inseguire la head ma intercettare la valutazione **a valle** delle domande informative (prezzo, quote, valore in successione, divisione).
- **"Successione precompilata"**: la domanda c'è ("successione precompilata agenzia entrate", "da quando", "come funziona", "documenti da allegare"), ma le SERP parlano soprattutto della 730 precompilata. È un buco informativo **(da verificare** sulle pagine dell'Agenzia).

---

## 2. Cluster di keyword

Legenda copertura: **Coperta** = c'è una pagina dedicata con la keyword in title o H1. **Parziale** = il tema è trattato, ma la keyword manca in title/H1 oppure è solo una sezione H2. **Scoperta** = nessuna pagina (gap).

### 2.A Cluster transazionale / commerciale: "vendere" (priorità massima)

| # | Keyword principale | Varianti e long tail (da Autocomplete) | Intento | Potenziale | Pagina attuale | Copertura |
|---|---|---|---|---|---|---|
| A1 | vendere casa ereditata | come vendere casa ereditata; cosa serve per vendere casa ereditata; documenti necessari per vendere casa ereditata; posso vendere casa ereditata; vendita casa ereditata tra fratelli | Commerciale | Alta | `/casa-ereditata/vendere/` (vendere.md) | Parziale: il title "Come vendere una casa ereditata, passo per passo" non contiene "cosa serve" né "documenti" |
| A2 | vendita casa ereditata tasse | tasse vendita casa ereditata; vendita casa ereditata tasse per chi vende; tasse a carico del venditore; irpef su vendita casa ereditata; vendita casa ereditata si pagano tasse | Commerciale/informativo | Alta (44 suggerimenti con "vendita casa ereditata") | `/casa-ereditata/tasse/plusvalenza/` | Parziale: il title parla solo di "plusvalenza" |
| A3 | vendere casa ereditata prima dei 5 anni | vendita casa ereditata entro 5 anni; dopo 5 anni; dopo 10 anni; vendere prima casa ereditata prima dei 5 anni senza riacquisto; prima e dopo cinque anni | Commerciale | Alta (13 varianti da 5 semi) | Plusvalenza e agevolazioni prima casa (sezioni H2) | Parziale: nessun title contiene "5 anni" |
| A4 | quando si può vendere una casa ereditata | posso vendere subito una casa ereditata; dopo quanto tempo posso vendere casa ereditata; vendere casa ereditata prima della successione; si può vendere prima della successione | Commerciale | Media-Alta | Nessuna (vendere.md tratta i tempi per fasi) | **Scoperta** |
| A5 | erede non vuole vendere | se un erede non vuole vendere la casa cosa succede; mio fratello non vuole vendere la casa ereditata; coerede non vuole vendere immobile; cosa fare se un fratello non vuole vendere | Commerciale | Alta (28 suggerimenti con "non vuole vendere") | `/eredi-in-disaccordo/` | Coperta: aggiungere "fratello" al title |
| A6 | vendere quota casa ereditata | posso vendere la mia quota/parte di casa ereditata; cessione quota; acquisto quota casa ereditata; vendere la propria quota di eredità | Commerciale | Media | `/eredi-in-disaccordo/vendere-quota/` | Coperta |
| A7 | casa ereditata tra fratelli | casa ereditata da due/tre fratelli; vendita casa ereditata tra fratelli; casa ereditata in comproprietà tra fratelli; divisione casa tra fratelli | Commerciale | Media | `/casa-ereditata/vendere/con-piu-eredi/`; blog fratelli | Parziale: "fratelli" manca dal title della guida |
| A8 | comprare quota fratello | liquidare i fratelli; divisione con conguaglio; acquisto quota casa ereditata e prima casa | Commerciale | Bassa (0 suggerimenti) | `/casa-ereditata/vendere/comprare-quota-fratelli/` | Coperta |
| A9 | quanto vale la casa ereditata / valutazione | valore casa per successione; successione valore casa; dichiarazione di successione valore immobili; valore catastale o commerciale (divisione) | Transazionale | Bassa per la head (0 suggerimenti), Media per "valore" in successione e divisione | `/valuta-casa-ereditata/`; `/casa-ereditata/vendere/prezzo/` | Parziale: manca una guida "valore in successione vs valore di mercato" |
| A10 | vendere casa ereditata con figli minorenni | rinuncia/accettazione eredità minorenni; giudice tutelare; beneficio inventario minore | Commerciale | Media (21 suggerimenti con "minorenn") | Citato in casi.md ("Erede minore", solo H2) | **Scoperta** |
| A11 | vendere casa con usufrutto / nuda proprietà | posso vendere casa con usufrutto; vendere una casa con usufrutto cosa succede; il proprietario può vendere una casa con usufrutto; usufrutto casa si può vendere | Commerciale | Media (usufrutto: 141 suggerimenti) | `/casa-ereditata/successione/riunione-usufrutto/` tratta un altro intento (morte dell'usufruttuario) | **Scoperta** |
| A12 | accettazione eredità per vendita immobile | accettazione eredità necessaria/obbligatoria per vendita immobile; trascrizione accettazione eredità; quanto costa la trascrizione; accettazione tacita per vendita dopo 10 anni; ultraventennale | Commerciale | Alta (seme "accettazione eredità" = 235) | Sezioni in vendere.md e accettare-rinunciare.md | **Scoperta** come pagina dedicata |
| A13 | casa ereditata da ristrutturare | vendere casa da ristrutturare; ristrutturazione casa ereditata; bonus casa ereditata | Commerciale | Bassa | Bonus edilizi (altro intento) | **Scoperta** |
| A14 | costi vendita casa ereditata | spese vendita casa ereditata; spese notarili vendita casa ereditata; quanto costa vendere una casa ereditata | Commerciale | Media | vendere.md (H2 "Quanto costa vendere") | Parziale |
| A15 | casa ereditata con mutuo | ereditare casa con mutuo; mutuo casa ereditata; casa ereditata con ipoteca | Commerciale/informativo | Media (nel seme base di "ereditare casa") | `/casa-ereditata/accettare-rinunciare/debiti-ipoteca/` | Parziale: "mutuo" manca dal title |
| A16 | vendere casa ereditata o affittare | casa ereditata vendere o affittare; affittare una casa ereditata da più eredi | Commerciale | Media | `/casa-ereditata/decidere/`; blog affittare | Coperta (il title va reso più naturale) |
| A17 | casa ereditata all'estero / procura per vendere | vendita casa ereditata all'estero; procura per vendere casa ereditata | Commerciale | Bassa | `/casa-ereditata/casi/erede-estero/` | Parziale |

### 2.B Cluster informativo: tasse e costi

| # | Keyword principale | Varianti e long tail | Intento | Potenziale | Pagina attuale | Copertura |
|---|---|---|---|---|---|---|
| B1 | imposta di successione | quanto si paga; quando non si paga; aliquote; franchigia; immobili; come si calcola; come pagare (F24, autoliquidazione); rateizzare | Informativo | Alta (227) | `/casa-ereditata/tasse/` | Parziale: il title dice "Tasse sulla casa ereditata", non "imposta di successione" |
| B2 | franchigia successione | figli; fratelli; nipoti; linea retta; coniuge; per ogni erede; 1 milione; handicap/legge 104 | Informativo | Alta (101; 75 suggerimenti con "franchigia") | tasse.md (H2 "aliquote e franchigie") | Parziale |
| B3 | imposta di successione tra fratelli / nipoti / zii | tasse successione zio nipote; da zio a nipote; nipoti in linea collaterale; tra cugini | Informativo | Alta (decine di varianti zio/zia/nipote nei semi "imposta" e "tasse") | tasse.md, blog "quanto costa" (caso nipote) | **Scoperta** come pagina dedicata |
| B4 | costi successione casa | quanto costa successione casa; costi successione caf; notaio; commercialista; successione notaio o caf | Informativo/commerciale (scelta del servizio) | Alta | `/casa-ereditata/successione/costi/`; blog quanto costa | Coperta; manca un confronto CAF/notaio/commercialista |
| B5 | imu casa ereditata | chi paga imu casa ereditata; abitata dalla madre; abitata dal fratello; non abitata; da quando si paga; seconda casa ereditata imu; esenzione | Informativo | Alta (87, ricorrente in 4 semi) | `/casa-ereditata/tasse/imu/` | Parziale: "madre", "fratello" e "da quando" mancano da title e description |
| B6 | casa ereditata occupata da un erede | chi paga imu; 730; isee; invalido; occupata senza titolo | Informativo/commerciale | Alta (1° suggerimento del seme "casa ereditata") | `/eredi-in-disaccordo/coerede-occupa-casa/` | Parziale: il title "Il fratello vive nella casa..." non usa la formula cercata |
| B7 | casa ereditata dove abita la madre | 730; isee; i figli devono pagare l'imu | Informativo | Media-Alta (nel seme base) | `/casa-ereditata/casi/diritto-abitazione-coniuge/` | Parziale |
| B8 | plusvalenza casa ereditata | plusvalenza vendita casa ereditata; plusvalenza superbonus casa ereditata; plusvalenza 110 casa ereditata | Informativo | Media (18) | `/casa-ereditata/tasse/plusvalenza/` | Coperta; superbonus **scoperto** |
| B9 | casa ereditata 730 | codice utilizzo 730; quota casa ereditata 730; vendita casa ereditata va dichiarata nel 730; seconda casa ereditata 730 | Informativo | Media (21) | `/casa-ereditata/tasse/730-casa-ereditata/` | Parziale: "vendita... va dichiarata nel 730" non ha risposta esplicita |
| B10 | casa ereditata isee | quanto incide una casa ereditata sull'isee; quota casa ereditata isee | Informativo | Media | `/casa-ereditata/tasse/isee/` | Coperta |
| B11 | prima casa ereditata | agevolazioni prima casa ereditata; casa ereditata conta come prima casa; acquisto prima casa avendone già una ereditata; successione prima casa requisiti | Informativo | Alta (70; 86 suggerimenti con "prima casa") | `/casa-ereditata/tasse/agevolazioni-prima-casa/` | Coperta; aggiungere "vendita entro 5 anni" al title |
| B12 | ereditare casa senza pagare tasse | come non pagare successione casa; come evitare imposta di successione; come pagare meno tasse successione | Informativo | Media-Alta (prefissi "come" di 3 semi) | Nessuna pagina specifica | **Scoperta** (da trattare con onestà: solo strumenti legali) |
| B13 | tasse successione Europa / estero | tasse successione francia; spagna; svizzera; europa | Informativo | Media | `/casa-ereditata/tasse/europa/` | Coperta |
| B14 | TARI casa ereditata | tari casa ereditata non abitata | Informativo | Bassa | `/casa-ereditata/tasse/tari/` | Coperta |

### 2.C Cluster informativo: successione, accettazione, rinuncia

| # | Keyword principale | Varianti e long tail | Intento | Potenziale | Pagina attuale | Copertura |
|---|---|---|---|---|---|---|
| C1 | dichiarazione di successione | come fare; chi la fa; online; precompilata; posso farla da solo; fai da te; documenti da allegare; presentata da un solo erede; integrativa | Informativo | Alta (232) | `/casa-ereditata/successione/` | Parziale: "come fare" e "documenti" mancano dal title |
| C2 | successione fai da te / precompilata | successione precompilata agenzia entrate; da quando; come funziona; successione telematica istruzioni; pagamento non andato a buon fine; allegati non conformi | Informativo (alternativa al servizio a pagamento) | Media-Alta | Citata in successione.md | **Scoperta** |
| C3 | documenti successione | elenco documenti; caf; agenzia entrate; casa/immobili; atto notorio successione | Informativo | Alta (129) | successione.md (H2 "Documenti da preparare") | Parziale |
| C4 | tempi successione | quanto tempo per successione casa; tempi successione immobile; tempi voltura; entro quanto tempo | Informativo | Alta (120) | successione.md, voltura | Parziale |
| C5 | voltura catastale successione | automatica; tempi; costo; prima della successione; senza successione; sanzioni | Informativo | Media (98) | `/casa-ereditata/successione/voltura-catastale/` | Coperta |
| C6 | successione tardiva | successione non fatta; presentata in ritardo; sanzioni; dopo 10 anni; casa ereditata mai dichiarata | Informativo | Media | `/casa-ereditata/successione/successione-tardiva/` | Coperta |
| C7 | accettazione eredità | tacita; con beneficio di inventario; costo notaio; termini; trascrizione; per vendita immobile | Informativo | Alta (235) | `/casa-ereditata/accettare-rinunciare/`, accettazione tacita | Coperta (pillar), con A12 scoperto |
| C8 | rinuncia eredità | come fare; quanto costa (notaio, tribunale, CAF); termini; chi subentra; a favore di un fratello; figli minorenni; e pensione di reversibilità / TFR; rinuncia eredità chi paga imu | Informativo | Alta (231) | accettare-rinunciare.md (H2 "Come si rinuncia"), rinunciare-solo-casa | **Scoperta** come pagina dedicata |
| C9 | beneficio di inventario | come funziona; costo; termini; pro e contro; minori | Informativo | Media-Alta | accettare-rinunciare.md (H2) | Parziale |
| C10 | eredità giacente | curatore; chi paga imu; vendita immobili | Informativo (anche professionale) | Alta per ampiezza, Media per utilità | `/casa-ereditata/accettare-rinunciare/eredita-giacente/` | Coperta |
| C11 | casa ereditata comunione dei beni | la casa ereditata rientra/entra nella comunione dei beni; casa ereditata dopo il matrimonio; prima del matrimonio; separazione dei beni; in caso di separazione | Informativo | Media-Alta (12 varianti, 4 nel seme "casa ereditata") | Nessuna | **Scoperta** |
| C12 | successione casa cointestata | successione di casa cointestata; casa in comproprietà | Informativo | Bassa-Media | Nessuna | **Scoperta** |
| C13 | casa popolare ereditata | ereditare casa popolare; successione casa popolare (riscattata / non riscattata) | Informativo | Media (8 varianti, nel seme base di "ereditare casa") | Solo un cenno in convivente-di-fatto | **Scoperta** |

### 2.D Cluster informativo: testamento, legittima, divisione, donazione

| # | Keyword principale | Varianti e long tail | Intento | Potenziale | Pagina attuale | Copertura |
|---|---|---|---|---|---|---|
| D1 | successione senza testamento | coniuge e due figli; tabella; quote; con figli; senza figli; fratelli; cosa fare | Informativo | Alta (103) | `/casa-ereditata/testamento-e-legittima/` | Parziale: il title "Chi eredita la casa..." non contiene "senza testamento" |
| D2 | quota legittima | figli; 2 figli; coniuge e due figli; come si calcola; quota disponibile; tabella; posso rinunciare | Informativo | Alta (211) | Stessa pillar | Parziale |
| D3 | testamento e casa | testamento casa a un solo figlio; testamento olografo trovato in casa; pubblicazione testamento (costo, tempi); testamento impugnato posso vendere casa | Informativo | Media | `/casa-ereditata/testamento-e-legittima/testamento-e-casa/`, azione-riduzione | Coperta; "olografo/pubblicazione" vanno messe nel title |
| D4 | divisione ereditaria | tra fratelli; giudiziale; con conguaglio (esempio); consensuale; costi; mediazione obbligatoria | Informativo/commerciale | Alta (210) | `/eredi-in-disaccordo/divisione-amichevole/`, `/divisione-giudiziale/` | Coperta |
| D5 | mediazione eredità | costo mediazione eredità; divisione ereditaria mediazione obbligatoria | Commerciale | Media | Sezioni in divisione-giudiziale ed eredi-in-disaccordo | Parziale (backlog) |
| D6 | indennità di occupazione coerede | immobile ereditato; come si calcola; comproprietario; prescrizione; da quando decorre | Commerciale | Media-Alta (seme ampio) | coerede-occupa-casa | Parziale: la keyword manca dal title |
| D7 | casa donata | si può vendere; dopo quanto posso venderla; va in successione; dai genitori; con usufrutto; rischi per chi compra; nuova legge | Informativo/commerciale | Alta (157) | `/casa-ereditata/testamento-e-legittima/casa-donata/`; blog legge 182/2025 | Parziale: "si può vendere" manca dal title |
| D8 | donazione o successione | differenza costi tra successione e donazione; imposta di successione e donazione | Informativo (genitori che pianificano) | Media | Nessuna | **Scoperta** (bassa vicinanza alla vendita) |

### 2.E Cluster navigazionale / strumenti

| # | Keyword | Varianti | Intento | Potenziale | Pagina attuale | Copertura |
|---|---|---|---|---|---|---|
| E1 | calcolo imposta di successione | calcolo imposta di successione online; calcolo tasse successione online; simulazione costi successione; calcolatore | Navigazionale/strumento | Media (emersi "online" e "simulazione") | `/strumenti/calcolatore-imposte-successione/` | Coperta: aggiungere "online" e "simulazione" alla description |
| E2 | scadenze successione | entro quanto tempo; termine dichiarazione; scadenze IMU | Strumento | Media | `/strumenti/scadenzario-successione/` | Coperta |
| E3 | modelli lettere / fac simile | rinuncia eredità fac simile; dichiarazione di successione fac simile; lettera divisione ereditaria fac simile; mediazione divisione ereditaria fac simile; atto notorio successione fac simile | Strumento | Media-Alta ("fac simile" ricorre in molti semi) | `/modelli-lettere/` | Parziale: verificare che i 12 modelli coprano "richiesta indennità di occupazione" e "proposta acquisto quota" |
| E4 | valutazione casa ereditata | quanto vale casa ereditata; stima immobile divisione ereditaria | Transazionale | Bassa (0 suggerimenti) ma massimo valore per il business | `/valuta-casa-ereditata/` | Coperta |
| E5 | sgombero casa defunto | svuotare casa ereditata; sgombero casa costo/prezzi | Commerciale (servizio) | Media (molto rumore: notizie, nomi di città) | `/casa-ereditata/primi-passi/svuotare-casa/` | Coperta |

---

## 3. Priorità

### 3.1 Top 20 keyword per priorità

Punteggio qualitativo = potenziale (Autocomplete) × vicinanza alla vendita (lead per la valutazione) × gap o facilità di miglioramento. Le prime 8 sono quelle più vicine al lead.

| Pos. | Keyword | Cluster | Potenziale | Vicinanza alla vendita | Azione |
|---|---|---|---|---|---|
| 1 | vendere casa ereditata (cosa serve, documenti) | A1 | Alta | Massima | Ottimizzare il title di vendere.md (settimana 1) |
| 2 | vendita casa ereditata tasse | A2 | Alta | Massima | Nuovo title per la guida plusvalenza (settimana 1) |
| 3 | vendere casa ereditata prima dei 5 anni | A3 | Alta | Massima | H2 e FAQ nella guida plusvalenza + title prima casa (settimane 1-2) |
| 4 | quando/dopo quanto si può vendere una casa ereditata (anche prima della successione) | A4 | Media-Alta | Massima | **Nuova guida** (settimana 1) |
| 5 | erede / fratello non vuole vendere | A5 | Alta | Alta | Title e aggiornamento (settimana 7) |
| 6 | casa ereditata occupata da un erede (IMU, indennità) | B6/D6 | Alta | Alta | Title coerede + aggiornamento IMU (settimane 5 e 7) |
| 7 | accettazione eredità per vendita immobile / trascrizione | A12 | Alta | Alta | **Nuova guida** (settimana 3) |
| 8 | vendere quota casa ereditata / casa tra fratelli | A6/A7 | Media | Alta | Title con-piu-eredi (settimana 1) |
| 9 | imu casa ereditata (madre, fratello, da quando) | B5/B7 | Alta | Media | Aggiornamento + blog sul saldo del 16/12 (settimana 5) |
| 10 | imposta di successione / franchigia | B1/B2 | Alta | Bassa-Media | Title pillar tasse (settimana 3) + calcolatore |
| 11 | dichiarazione di successione (come fare, da soli, precompilata) | C1/C2 | Alta | Media (punto d'ingresso nel funnel) | **Nuova guida** "fai da te" (settimana 10) + title pillar |
| 12 | costi successione casa (CAF/notaio/commercialista) | B4 | Alta | Media | Blog di confronto (settimana 1) |
| 13 | successione senza testamento / quota legittima | D1/D2 | Alta | Media (chi eredita, quindi chi vende) | Title della pillar testamento (settimana 4) |
| 14 | rinuncia eredità (costi, chi subentra) | C8 | Alta | Bassa-Media (chi rinuncia non vende, ma i coeredi sì) | **Nuova guida** (settimana 2) |
| 15 | casa ereditata e comunione dei beni | C11 | Media-Alta | Media (chi firma la vendita) | **Nuova guida** (settimana 4) |
| 16 | casa donata: si può vendere | D7 | Alta | Alta | Title casa-donata (settimana 2) |
| 17 | vendere casa ereditata con figli minorenni | A10 | Media | Alta | **Nuova guida** (settimana 7) |
| 18 | vendere casa con usufrutto / nuda proprietà | A11 | Media | Alta | **Nuova guida** (settimana 9) |
| 19 | quanto vale la casa ereditata / valore in successione | A9/E4 | Bassa-Media | Massima | **Nuova guida** "valore immobili" (settimana 6) + title della guida prezzo |
| 20 | casa ereditata con mutuo | A15 | Media | Alta | **Nuova guida** (settimana 8) |

### 3.2 Gap principali (contenuti da creare)

| Gap | Perché conta | Formato | Settimana |
|---|---|---|---|
| Quando si può vendere (anche "prima della successione") | Intento di vendita immediato; 0 occorrenze sul sito | Nuova guida area vendere | 1 |
| Rinuncia all'eredità (pagina dedicata) | Seme molto ampio (231), oggi solo un H2 | Nuova guida area accettare-rinunciare | 2 |
| Accettazione e trascrizione per vendere | Blocca i rogiti; domanda molto ampia | Nuova guida area accettare-rinunciare | 3 |
| Casa ereditata e comunione dei beni | 12 varianti; risposta netta (art. 179 c.c.) | Nuova guida area casi | 4 |
| Valore della casa nella successione vs valore di mercato | Ponte naturale verso la valutazione | Nuova guida area successione | 6 |
| Figli minorenni: accettare e vendere | Vendita con autorizzazione del giudice: serve guida | Nuova guida area casi | 7 |
| Casa ereditata con mutuo | Nel seme base di "ereditare casa" | Nuova guida area casi | 8 |
| Vendere con usufrutto / nuda proprietà | Ampio cluster usufrutto, intento di vendita | Nuova guida area casi | 9 |
| Successione fai da te / precompilata | Domanda in crescita sul servizio online | Nuova guida area successione | 10 |
| Imposta tra fratelli, nipoti, zii | Molte varianti parentela per parentela | Nuova guida area tasse | 11 |
| Casa cointestata | Domanda frequente dei coniugi superstiti | Nuova guida area casi | 12 |
| Casa popolare ereditata; mediazione per eredità; donazione o successione | Potenziale medio, bassa vicinanza alla vendita | Backlog dopo la settimana 12 | - |
| Superbonus e plusvalenza; "ereditare senza pagare tasse"; reversibilità e rinuncia | Domande specifiche, bene come articoli blog | Blog | 3, 4, 9 |

---

## 4. Ottimizzazioni on-page (pagine esistenti)

> **Attenzione al suffisso del title.** `src/layouts/Base.astro` aggiunge " | EreditareCasa" (16 caratteri) a ogni title che non contiene già il nome del sito. Google mostra circa 55-60 caratteri, quindi con il suffisso un title di oltre 45 caratteri viene troncato in SERP, anche se il sito resta ben riconoscibile. Due opzioni:
> (a) accettare il troncamento del suffisso: è la scelta consigliata, perché le keyword stanno all'inizio;
> (b) togliere il suffisso per i title oltre 50 caratteri. Richiede di modificare il layout, quindi va deciso a parte.
> I title proposti qui sotto restano entro 65 caratteri e hanno la keyword principale nei primi 40. L'H1 delle guide coincide con `title` (`[...path].astro` usa `<h1>{d.title}</h1>`), quindi cambiare il title cambia anche l'H1. Descrizioni: massimo 170 caratteri, il limite dello schema.

Da applicare in **batch nelle settimane 1-2**, salvo dove è indicata un'altra settimana. Dopo ogni modifica aggiornare `updated:` e richiedere l'indicizzazione in Search Console.

| # | File | Keyword mancante | Title attuale | **Nuovo title proposto** | **Nuova description proposta** |
|---|---|---|---|---|---|
| 1 | `src/content/guide/vendere.md` | cosa serve, documenti, tempi | Come vendere una casa ereditata, passo per passo | Vendere casa ereditata: cosa serve, documenti, tempi e costi | Cosa serve per vendere una casa ereditata: successione, accettazione trascritta, documenti, conformità, tasse e tempi fase per fase. Con la checklist completa. |
| 2 | `src/content/guide/tasse-plusvalenza.md` | tasse vendita, 5 anni | Plusvalenza sulla casa ereditata, quando si paga | Tasse sulla vendita della casa ereditata: plusvalenza e 5 anni | Chi vende una casa ereditata paga tasse? Di norma nessuna plusvalenza, anche prima dei 5 anni. Le eccezioni (donazione, quote comprate, terreni) con esempi. |
| 3 | `src/content/guide/vendere-piu-eredi.md` | fratelli | Vendere una casa ereditata con più eredi | Vendere casa ereditata tra fratelli o con più eredi | Come si vende una casa ereditata tra fratelli o più eredi: chi firma, come si divide il ricavato, tempi, spese anticipate ed erede lontano o che non risponde. |
| 4 | `src/content/guide/tasse-agevolazioni-prima-casa.md` | vendita entro 5 anni | Agevolazione prima casa in successione: requisiti e decadenza | Prima casa in successione: requisiti e vendita entro 5 anni | Con la prima casa in successione ipotecaria e catastale costano 200 € ciascuna. Requisiti, altri eredi, cosa succede se vendi entro 5 anni, riacquisto e credito. |
| 5 | `src/content/guide/testamento-casa-donata.md` | si può vendere | Casa ricevuta in donazione dal defunto: collazione e rischi | Casa donata dai genitori: si può vendere? Collazione e rischi | Una casa donata si può vendere, ma conta nella successione: collazione tra coeredi e possibile riduzione. Dal 18/12/2025 chi la compra è più tutelato. Cosa sapere. |
| 6 | `src/content/guide/tasse.md` (sett. 3) | imposta di successione, franchigie | Tasse sulla casa ereditata, tutte le imposte da pagare | Imposta di successione sulla casa: aliquote, franchigie e tasse | Imposta di successione con franchigie (1 milione per coniuge e figli, 100.000 tra fratelli), ipotecaria, catastale, IMU e plusvalenza: chi paga e quanto, con esempi. |
| 7 | `src/content/guide/testamento-legittima.md` (sett. 4) | successione senza testamento, quota legittima | Chi eredita la casa: quote di legge, testamento e legittima | Successione senza testamento e quota legittima: chi eredita | Chi eredita senza testamento (coniuge, figli, fratelli, genitori) e quanto spetta per legge se c'è un testamento: quote, tabelle ed esempi sulla casa ereditata. |
| 8 | `src/content/guide/tasse-imu.md` (sett. 5) | madre, fratello, da quando | IMU sulla casa ereditata, chi paga e quanto | IMU casa ereditata: chi paga, da quando e se ci vive un erede | Chi paga l'IMU sulla casa ereditata vuota, abitata dalla madre o da un fratello: quote, da quando si paga, scadenze 16 giugno e 16 dicembre, comodato ed esenzioni. |
| 9 | `src/content/guide/casi-diritto-abitazione-coniuge.md` (sett. 5) | dove abita la madre | Diritto di abitazione del coniuge sulla casa ereditata | Casa ereditata dove abita la madre: diritto di abitazione | Se la madre vedova vive nella casa ha il diritto di abitazione a vita (art. 540 c.c.): chi paga l'IMU, come va nel 730 dei figli, quanto vale e se si può vendere. |
| 10 | `src/content/guide/vendere-prezzo-casa-ereditata.md` (sett. 6) | quanto vale | Come stabilire il prezzo di una casa ereditata | Quanto vale la casa ereditata: prezzo, OMI e perizia | Valore catastale e valore di mercato non coincidono. Come stimare quanto vale la casa ereditata con le quotazioni OMI, quando serve una perizia e quanto pesano i lavori. |
| 11 | `src/content/guide/eredi-in-disaccordo.md` (sett. 7) | fratello | Un erede non vuole vendere la casa, cosa fare | Un erede o un fratello non vuole vendere la casa: cosa fare | Fratello o coerede che non vuole vendere la casa ereditata: le soluzioni, dall'accordo alla vendita della quota, dalla mediazione obbligatoria alla divisione giudiziale. |
| 12 | `src/content/guide/eredi-coerede-occupa-casa.md` (sett. 7) | occupata da un erede, indennità di occupazione | Il fratello vive nella casa ereditata: cosa puoi fare | Casa ereditata occupata da un erede: indennità e soluzioni | Un coerede può usare la casa ma non escludere gli altri: quando è dovuta l'indennità di occupazione, come chiederla, chi paga IMU e spese, perché l'usucapione è rara. |
| 13 | `src/content/guide/accettare-debiti-ipoteca.md` (sett. 8) | (cannibalizzazione) | Casa ereditata con debiti, cartelle o ipoteca: cosa rischi | Invariato. Il "mutuo" va alla nuova guida casa-con-mutuo; qui aggiungere solo un link verso di essa | Invariata |
| 14 | `src/content/guide/successione.md` (sett. 10) | come fare, documenti | Dichiarazione di successione con immobili, la guida | Dichiarazione di successione con casa: come farla e documenti | Come fare la dichiarazione di successione con una casa: chi la presenta, scadenza di 12 mesi, documenti da allegare, tempi, volture, costi, ritardi e sanzioni. |
| 15 | `src/content/guide/successione-costi.md` (sett. 10) | CAF, notaio | Quanto costa la successione con una casa: imposte e compensi | Quanto costa la successione di una casa: imposte, CAF e notaio | Imposte ipotecaria e catastale, bollo, tasse fisse, compensi indicativi di CAF, commercialista e notaio, trascrizione dell'accettazione: tre esempi di costo totale. |
| 16 | `src/content/guide/tasse-730-casa-ereditata.md` (sett. 12) | vendita nel 730 | Casa ereditata nel 730: quadro B, quota, giorni e codici | Casa ereditata nel 730: quadro B, codici e vendita | Casa ereditata nel 730: quadro B, quota e giorni, codici utilizzo, coniuge con diritto di abitazione, IMU sostitutiva. E se l'hai venduta: va dichiarata? |
| 17 | `src/content/guide/testamento-testamento-e-casa.md` | olografo, pubblicazione (costi) | Testamento e casa: olografo, pubblico, pubblicazione e legato | Testamento olografo e casa: pubblicazione, costi e legato | Come riconoscere un testamento valido, cosa fare se lo trovi in casa, come e quanto costa la pubblicazione, cosa cambia con un legato sulla casa e chi è l'esecutore. |
| 18 | `src/content/guide/decidere.md` | formula di ricerca "vendere o affittare" | Casa ereditata, vendere, affittare o tenere? | Casa ereditata: vendere o affittare? I conti a confronto | Vendere, affittare o tenere la casa ereditata: costi annui, rendimento netto su 5 anni con un esempio di calcolo, rischi e come decidere tra eredi. |
| 19 | `src/content/guide/accettare-rinunciare.md` (sett. 2, insieme alla nuova guida rinuncia) | termini, costi | Accettare o rinunciare all'eredità di una casa | Accettare o rinunciare all'eredità: termini, costi e casa | Accettazione espressa, tacita o con beneficio d'inventario, oppure rinuncia: come scegliere se c'è una casa, i termini (3 mesi, 40 giorni, 10 anni) e i costi. |
| 20 | `src/pages/strumenti/calcolatore-imposte-successione.astro` | online, simulazione | (title "Calcolatore imposte di successione sulla casa") | Calcolo imposta di successione online: simulatore gratuito | Aggiungere "simulazione" e "online" alla description esistente, senza superare 170 caratteri |

**Altre azioni on-page (senza cambiare il title):**

- **FAQ da aggiungere** nel frontmatter `faq`, che il template già trasforma in rich result:
  - vendere.md: "Si può vendere una casa ereditata prima della successione?"
  - tasse-plusvalenza.md: "La vendita della casa ereditata va dichiarata nel 730?"
  - eredi-quota.md: "Posso vendere la mia parte di casa ereditata senza il consenso dei fratelli?"
  - tasse-imu.md: "Chi paga l'IMU se nella casa ereditata vive un fratello?"
- **H2 da aggiungere**:
  - tasse-plusvalenza.md: "Vendere prima o dopo 5 anni: cosa cambia davvero".
  - vendere.md: "Si può vendere subito? Cosa deve esserci prima del rogito", con link alla nuova guida quando-vendere.
- **CTA verso la valutazione**: va inserita in modo coerente con le linee guida (tono non commerciale nelle guide) nel blocco `next-step` di vendere.md, vendere-prezzo, vendere-piu-eredi, eredi-quota, comprare-quota-fratelli, eredi-in-disaccordo e decidere: "un valore condiviso è il primo passo per mettersi d'accordo".

---

## 5. Piano editoriale (12 settimane: 19 ottobre 2026 - 10 gennaio 2027)

**Ritmo:** 2 articoli blog a settimana (lunedì e giovedì) + 1 guida nuova o aggiornata. Le ottimizzazioni on-page della sezione 4 sono indicate nella colonna "Guide".

**Stagionalità di cui tiene conto il piano:**
- saldo IMU il **16 dicembre 2026**: contenuti IMU nelle settimane 5-7, così hanno 3-5 settimane per indicizzarsi;
- fine anno: cose da fare entro il 31/12 e scelta se vendere a dicembre o a gennaio (settimane 7-8);
- feste di Natale: famiglie riunite, fratelli che parlano della casa, eredi all'estero che rientrano (settimane 8-9);
- **testi unici in vigore dal 1° gennaio 2027** (D.Lgs. 123/2025 e 117/2026): settimane 11-12;
- legge di bilancio 2027: settimana 10, **solo se** contiene novità rilevanti;
- rinnovo DSU/ISEE di gennaio (settimana 12).

Il 730 e l'acconto IMU di giugno restano per il trimestre successivo (vedi 5.3).

**Legenda CTA:** VAL = valutazione `/valuta-casa-ereditata/` · CALC = `/strumenti/calcolatore-imposte-successione/` · SCAD = `/strumenti/scadenzario-successione/` (con promemoria email) · PDF = PDF della guida `/pdf/<area>-<slug>.pdf` o `/pdf/guida-completa-casa-ereditata.pdf` · REG = registrazione `/accedi/` (area riservata, promemoria) · LETT = `/modelli-lettere/`.

### 5.1 Calendario

#### Settimana 1 (19-25 ottobre): vendita, quick win

| Tipo | Titolo SEO (≤65) | Keyword principale | Secondarie | Intento | Link interni (da → verso) | CTA |
|---|---|---|---|---|---|---|
| **Nuova guida** `src/content/guide/vendere-quando-vendere.md` → `/casa-ereditata/vendere/quando-vendere/` | Dopo quanto si può vendere la casa ereditata? Tempi reali | quando si può vendere una casa ereditata | vendere casa ereditata prima della successione; posso vendere subito una casa ereditata; dopo quanto tempo posso vendere casa ereditata; tempi vendita casa ereditata | Commerciale | **Verso:** `/casa-ereditata/vendere/`, `/casa-ereditata/successione/`, `/casa-ereditata/accettare-rinunciare/atti-accettazione-tacita/`, `/casa-ereditata/tasse/plusvalenza/`, `/blog/case-ereditate-mercato-venditori-over-60/`. **Da:** vendere.md (nuovo H2), successione.md, primi-passi.md ("Mesi 3-12"), `/percorso/` | VAL (preparare la vendita mentre si chiude la successione) + SCAD |
| Blog (lun.) `/blog/successione-caf-notaio-commercialista/` | Successione: CAF, notaio o commercialista? Costi e differenze | successione notaio o caf | quanto costa dichiarazione di successione al caf; dal commercialista; dal notaio; successione notaio obbligatorio; successione senza notaio | Informativo/commerciale | **Verso:** `/casa-ereditata/successione/costi/`, `/casa-ereditata/successione/`, `/professionisti/`, `/blog/quanto-costa-ereditare-casa-2026/`. **Da:** successione-costi.md, successione.md | CALC + PDF (`/pdf/successione-costi.pdf`) |
| Blog (gio.) `/blog/casa-ereditata-agenzia-immobiliare/` | Casa ereditata e agenzia immobiliare: mandato, firme, provvigione | agenzia immobiliare casa ereditata | mandato di vendita più eredi; provvigione vendita casa ereditata; documenti per vendere casa ereditata; vendita casa ereditata tra fratelli | Commerciale | **Verso:** `/casa-ereditata/vendere/con-piu-eredi/`, `/casa-ereditata/vendere/prezzo/`, `/casa-ereditata/vendere/cosa-controlla-acquirente/`, `/eredi-in-disaccordo/`. **Da:** vendere.md, vendere-piu-eredi.md | **VAL** (CTA principale) + LETT |
| On-page | Batch sezione 4: righe 1, 2, 3 (vendere, plusvalenza, con-piu-eredi) + FAQ e H2 indicati | | | | | |

#### Settimana 2 (26 ottobre - 1 novembre): rinuncia e casa donata

| Tipo | Titolo SEO | Keyword principale | Secondarie | Intento | Link interni | CTA |
|---|---|---|---|---|---|---|
| **Nuova guida** `src/content/guide/accettare-rinuncia-eredita.md` → `/casa-ereditata/accettare-rinunciare/rinuncia-eredita/` | Rinuncia all'eredità: come si fa, costi e chi subentra | rinuncia eredità | quanto costa rinuncia eredità (notaio, tribunale); termini; chi subentra; rinuncia eredità e debiti; figli minorenni; rinuncia eredità chi paga imu | Informativo | **Verso:** `/casa-ereditata/accettare-rinunciare/`, `/casa-ereditata/accettare-rinunciare/rinunciare-solo-casa/`, `/casa-ereditata/accettare-rinunciare/debiti-ipoteca/`, `/casa-ereditata/accettare-rinunciare/eredita-giacente/`. **Da:** accettare-rinunciare.md, rinunciare-solo-casa.md, debiti-ipoteca.md, casi.md | PDF + SCAD (termini di 3 mesi e 40 giorni) |
| Blog (lun.) `/blog/rinuncia-eredita-a-favore-di-un-fratello/` | Rinuncia all'eredità a favore di un fratello: perché non esiste | rinuncia eredità a favore di un fratello | rinuncia a favore di altri / dei figli; rinuncia eredità chi subentra; rappresentazione; cessione quota | Informativo | **Verso:** nuova guida rinuncia, `/casa-ereditata/accettare-rinunciare/atti-accettazione-tacita/` (ha già l'esempio "rinuncia a favore del fratello"), `/eredi-in-disaccordo/vendere-quota/`, `/casa-ereditata/vendere/comprare-quota-fratelli/` | VAL (se l'obiettivo è lasciare la casa al fratello: valore della quota) |
| Blog (gio.) `/blog/dichiarazione-successione-un-solo-erede/` | Dichiarazione di successione presentata da un solo erede: si può? | dichiarazione di successione presentata da un solo erede | un solo erede; chi la fa; obbligati in solido; rimborso spese tra coeredi; obbligo di presentazione | Informativo | **Verso:** `/casa-ereditata/successione/`, `/casa-ereditata/successione/costi/`, `/casa-ereditata/gestire-la-casa/` (rendiconto), `/blog/fratelli-casa-ereditata-errori/` | SCAD + LETT |
| On-page | Righe 4, 5, 19 (prima casa, casa donata, accettare-rinunciare) | | | | | |

#### Settimana 3 (2-8 novembre): accettazione per vendere, imposta

| Tipo | Titolo SEO | Keyword principale | Secondarie | Intento | Link interni | CTA |
|---|---|---|---|---|---|---|
| **Nuova guida** `src/content/guide/accettare-trascrizione-accettazione.md` → `/casa-ereditata/accettare-rinunciare/trascrizione-accettazione/` | Accettazione eredità per vendere casa: trascrizione e costi | accettazione eredità per vendita immobile | trascrizione accettazione eredità; quanto costa trascrizione accettazione; accettazione tacita eredità; come verificare trascrizione; accettazione per vendita immobile dopo 10 anni / ultraventennale | Commerciale | **Verso:** `/casa-ereditata/vendere/`, `/casa-ereditata/vendere/cosa-controlla-acquirente/`, `/casa-ereditata/accettare-rinunciare/atti-accettazione-tacita/`, `/casa-ereditata/successione/costi/`. **Da:** vendere.md (H2 "L'accettazione e la trascrizione"), cosa-controlla-acquirente.md, nuova guida quando-vendere | VAL + PDF |
| Blog (lun.) `/blog/ereditare-casa-senza-pagare-tasse/` | Ereditare casa pagando meno tasse: cosa è legale e cosa no | come ereditare casa senza pagare tasse | come evitare imposta di successione; come non pagare successione casa; franchigia; agevolazione prima casa; donazione in vita | Informativo | **Verso:** `/casa-ereditata/tasse/`, `/casa-ereditata/tasse/agevolazioni-prima-casa/`, `/casa-ereditata/successione/costi/`, `/blog/quanto-costa-ereditare-casa-2026/` | **CALC** |
| Blog (gio.) `/blog/casa-ereditata-da-ristrutturare-vendere/` | Casa ereditata da ristrutturare: vendere così o fare i lavori? | vendere casa ereditata da ristrutturare | ristrutturazione casa ereditata; bonus edilizi erede; vendere casa vecchia; quanto valgono i lavori | Commerciale | **Verso:** `/casa-ereditata/vendere/prezzo/`, `/casa-ereditata/tasse/bonus-edilizi/`, `/casa-ereditata/decidere/`, `/casa-ereditata/casi/immobile-irregolare/` | **VAL** |
| On-page | Riga 6 (pillar tasse: imposta di successione e franchigie) | | | | | |

#### Settimana 4 (9-15 novembre): famiglia, comunione, legittima

| Tipo | Titolo SEO | Keyword principale | Secondarie | Intento | Link interni | CTA |
|---|---|---|---|---|---|---|
| **Nuova guida** `src/content/guide/casi-comunione-dei-beni.md` → `/casa-ereditata/casi/comunione-dei-beni/` | Casa ereditata e comunione dei beni: è anche del coniuge? | casa ereditata comunione dei beni | la casa ereditata rientra nella comunione dei beni; casa ereditata dopo il matrimonio; separazione dei beni; casa ereditata in caso di separazione; chi firma la vendita | Informativo | **Verso:** `/casa-ereditata/vendere/`, `/casa-ereditata/testamento-e-legittima/`, `/casa-ereditata/casi/diritto-abitazione-coniuge/`, `/casa-ereditata/tasse/730-casa-ereditata/`. **Da:** casi.md (nuova voce), vendere.md (sezione "chi firma"), testamento-legittima.md | VAL + PDF |
| Blog (lun.) `/blog/superbonus-plusvalenza-casa-ereditata/` | Superbonus e casa ereditata: si paga la plusvalenza se vendi? | plusvalenza superbonus casa ereditata | plusvalenza 110 casa ereditata; vendita entro 10 anni superbonus; rate residue bonus erede | Informativo/commerciale | **Verso:** `/casa-ereditata/tasse/plusvalenza/`, `/casa-ereditata/tasse/bonus-edilizi/`, `/blog/testi-unici-2027-successioni/` | VAL + CALC. **(da verificare:** esclusione degli immobili acquisiti per successione nell'art. 67, c. 1, lett. b-bis TUIR e nel nuovo testo unico) |
| Blog (gio.) `/blog/casa-ereditata-vuota-inverno/` | Casa ereditata vuota in inverno: 10 controlli contro i danni | casa ereditata vuota | casa vuota riscaldamento; tubi gelati casa vuota; assicurazione casa vuota; chi risponde dei danni | Informativo | **Verso:** `/casa-ereditata/gestire-la-casa/casa-vuota/`, `/casa-ereditata/gestire-la-casa/utenze/`, `/casa-ereditata/gestire-la-casa/condominio/`, `/casa-ereditata/decidere/` | PDF checklist + REG (promemoria visite) |
| On-page | Riga 7 (pillar testamento: senza testamento + legittima) | | | | | |

#### Settimana 5 (16-22 novembre): IMU, verso il saldo

| Tipo | Titolo SEO | Keyword principale | Secondarie | Intento | Link interni | CTA |
|---|---|---|---|---|---|---|
| **Aggiornamento guida** `src/content/guide/tasse-imu.md` (riga 8) + `casi-diritto-abitazione-coniuge.md` (riga 9) | IMU casa ereditata: chi paga, da quando e se ci vive un erede | imu casa ereditata | chi paga imu casa ereditata abitata dalla madre; abitata dal fratello; da quando si paga; seconda casa ereditata imu; imu casa ereditata senza successione | Informativo | Nuovi H2 "Se nella casa vive un fratello" e "IMU senza successione presentata", con la sentenza di Cassazione 2025 sul diritto di abitazione con comproprietari terzi **(da verificare** su fonte primaria). **Verso:** coerede-occupa-casa, diritto-abitazione-coniuge, SCAD | SCAD + CALC |
| Blog (lun.) `/blog/saldo-imu-dicembre-2026-casa-ereditata/` | Saldo IMU 16 dicembre 2026 sulla casa ereditata: chi paga | saldo imu dicembre 2026 casa ereditata | scadenza imu dicembre 2026; imu casa ereditata primo anno; calcolo imu pro quota; F24 eredi; IMU arretrata del defunto | Informativo (stagionale) | **Verso:** `/casa-ereditata/tasse/imu/`, `/strumenti/scadenzario-successione/`, `/casa-ereditata/casi/diritto-abitazione-coniuge/`, `/casa-ereditata/tasse/tari/` | **SCAD + REG** (promemoria 16/12) |
| Blog (gio.) `/blog/successione-telematica-errori/` | Successione telematica: 8 errori che bloccano l'invio | successione telematica errori | pagamento non andato a buon fine; addebito respinto; allegati non conformi; ricevute successione telematica; discordanza dati intestatario | Informativo | **Verso:** `/casa-ereditata/successione/`, `/casa-ereditata/successione/voltura-catastale/`, `/casa-ereditata/successione/costi/`, `/professionisti/` | PDF + `/professionisti/` |

#### Settimana 6 (23-29 novembre): valore e valutazione

| Tipo | Titolo SEO | Keyword principale | Secondarie | Intento | Link interni | CTA |
|---|---|---|---|---|---|---|
| **Nuova guida** `src/content/guide/successione-valore-immobili.md` → `/casa-ereditata/successione/valore-immobili/` | Valore della casa nella successione: come si calcola | valore casa successione | dichiarazione di successione valore immobili; valore catastale; rendita rivalutata e coefficienti; valore catastale o commerciale nella divisione; valore immobile prima casa | Informativo → transazionale | **Verso:** `/strumenti/calcolatore-imposte-successione/`, `/casa-ereditata/vendere/prezzo/`, `/valuta-casa-ereditata/`, `/eredi-in-disaccordo/divisione-amichevole/`. **Da:** tasse.md, successione.md, vendere-prezzo, calcolatore | **CALC → VAL** (passare dal valore fiscale al valore di mercato) |
| Blog (lun.) `/blog/costi-vendita-casa-ereditata-esempio/` | Quanto costa vendere una casa ereditata: esempio con 3 fratelli | costi vendita casa ereditata | spese vendita casa ereditata; spese notarili; APE; provvigione; conformità; chi paga tra gli eredi | Commerciale | Pagina principale sul tema resta vendere.md (H2 "Quanto costa vendere"), da linkare nel primo paragrafo per evitare la cannibalizzazione. **Verso:** `/casa-ereditata/vendere/`, `/casa-ereditata/vendere/con-piu-eredi/`, `/casa-ereditata/tasse/plusvalenza/` | **VAL** |
| Blog (gio.) `/blog/successione-legge-104-franchigia/` | Erede disabile e successione: franchigia di 1,5 milioni | franchigia successione portatore handicap | imposta di successione legge 104; esenzione; disabili; come si chiede | Informativo | **Verso:** `/casa-ereditata/tasse/`, `/strumenti/calcolatore-imposte-successione/`, `/casa-ereditata/tasse/isee/` | CALC |
| On-page | Riga 10 (guida prezzo: "Quanto vale la casa ereditata") + rilettura della pagina `/valuta-casa-ereditata/` (link verso le guide prezzo e valore-immobili) | | | | | |

#### Settimana 7 (30 novembre - 6 dicembre): disaccordi e minori

| Tipo | Titolo SEO | Keyword principale | Secondarie | Intento | Link interni | CTA |
|---|---|---|---|---|---|---|
| **Nuova guida** `src/content/guide/casi-erede-minorenne.md` → `/casa-ereditata/casi/erede-minorenne/` | Casa ereditata con figli minorenni: accettare e vendere | vendere casa ereditata con figli minorenni | accettazione eredità minorenni; beneficio di inventario minore; autorizzazione giudice tutelare; rinuncia eredità minorenni; minore divenuto maggiorenne | Commerciale | **Verso:** `/casa-ereditata/accettare-rinunciare/`, nuova guida rinuncia, `/casa-ereditata/vendere/`, `/professionisti/`. **Da:** casi.md (H2 "Erede minore"), accettare-rinunciare.md | VAL + `/professionisti/`. **(da verificare:** autorizzazione notarile dopo il D.Lgs. 149/2022, art. 21) |
| Blog (lun.) `/blog/vendere-casa-ereditata-dicembre-o-gennaio/` | Vendere la casa ereditata a dicembre o a gennaio? Cosa cambia | quando conviene vendere casa ereditata | IMU dell'anno; rogito a fine anno; testi unici 2027; 730 dell'anno dopo; spese della casa vuota | Commerciale (stagionale) | **Verso:** `/casa-ereditata/vendere/quando-vendere/`, `/casa-ereditata/tasse/imu/`, `/blog/testi-unici-2027-successioni/`, `/casa-ereditata/decidere/` | **VAL** |
| Blog (gio.) `/blog/osservatorio-tempi-vendita-case-ereditate/` | Quanto tempo serve per vendere una casa ereditata: i dati | tempi vendita casa ereditata | tempi successione casa; tempi medi di vendita; mercato 2026; venditori over 60 | Commerciale (asset per link e stampa) | **Verso:** `/osservatorio/`, `/blog/case-ereditate-mercato-venditori-over-60/`, `/casa-ereditata/vendere/quando-vendere/`. Usare solo dati pubblici verificabili (OMI/NTN, Banca d'Italia, sondaggio congiunturale) | VAL + REG |
| On-page | Righe 11, 12 (eredi-in-disaccordo, coerede-occupa-casa) + verificare in `/modelli-lettere/` un modello "richiesta indennità di occupazione" | | | | | |

#### Settimana 8 (7-13 dicembre): fine anno, mutuo, famiglia

| Tipo | Titolo SEO | Keyword principale | Secondarie | Intento | Link interni | CTA |
|---|---|---|---|---|---|---|
| **Nuova guida** `src/content/guide/casi-casa-con-mutuo.md` → `/casa-ereditata/casi/casa-con-mutuo/` | Casa ereditata con mutuo: chi paga le rate e come vendere | casa ereditata con mutuo | ereditare casa con mutuo; polizza mutuo morte; accollo; estinzione e vendita; casa con ipoteca | Commerciale | **Verso:** `/casa-ereditata/accettare-rinunciare/debiti-ipoteca/`, `/casa-ereditata/primi-passi/conto-defunto/`, `/casa-ereditata/vendere/`. **Da:** debiti-ipoteca.md (riga 13), casi.md, conto-defunto.md | VAL + PDF |
| Blog (lun.) `/blog/casa-ereditata-cose-da-fare-31-dicembre/` | Casa ereditata: 7 cose da fare entro il 31 dicembre | casa ereditata scadenze fine anno | saldo IMU; ravvedimento successione; spese da documentare per il 730; TARI; rate dei bonus; assicurazione | Informativo (stagionale) | **Verso:** SCAD, `/casa-ereditata/tasse/imu/`, `/casa-ereditata/successione/successione-tardiva/`, `/casa-ereditata/tasse/730-casa-ereditata/` | **SCAD + REG** |
| Blog (gio.) `/blog/natale-casa-ereditata-fratelli/` | Feste in famiglia e casa ereditata: come parlarne tra fratelli | casa ereditata fratelli accordo | casa ereditata tra fratelli; fratello non vuole vendere; accordo di gestione; valore condiviso | Commerciale (soft) | **Verso:** `/eredi-in-disaccordo/`, `/blog/fratelli-casa-ereditata-errori/`, `/casa-ereditata/gestire-la-casa/`, `/modelli-lettere/` | **VAL** ("un valore neutro da cui partire") + LETT |

#### Settimana 9 (14-20 dicembre): usufrutto, estero

| Tipo | Titolo SEO | Keyword principale | Secondarie | Intento | Link interni | CTA |
|---|---|---|---|---|---|---|
| **Nuova guida** `src/content/guide/casi-usufrutto-nuda-proprieta.md` → `/casa-ereditata/casi/usufrutto-nuda-proprieta/` | Vendere casa ereditata con usufrutto o nuda proprietà | vendere casa con usufrutto | posso vendere casa con usufrutto; vendere nuda proprietà; usufrutto casa valore; tabella dei coefficienti; usufrutto della madre e vendita | Commerciale | **Verso:** `/casa-ereditata/successione/riunione-usufrutto/`, `/casa-ereditata/casi/diritto-abitazione-coniuge/`, `/casa-ereditata/vendere/prezzo/`. **Da:** riunione-usufrutto.md, casi.md, diritto-abitazione-coniuge.md | **VAL** |
| **Aggiornamento guida** `src/content/guide/casi-erede-estero.md` | (title invariato) H2 "Procura per vendere la casa ereditata" | procura per vendere casa ereditata | vendita casa ereditata all'estero; procura consolare; apostille | Commerciale | **Verso:** blog del giovedì | VAL |
| Blog (lun.) `/blog/rinuncia-eredita-reversibilita-tfr/` | Rinuncia all'eredità: pensione di reversibilità e TFR restano? | rinuncia eredità e pensione di reversibilità | chi rinuncia all'eredità ha diritto al TFR; rinuncia e debiti; rinuncia eredità cosa comporta | Informativo | **Verso:** nuova guida rinuncia, `/casa-ereditata/accettare-rinunciare/debiti-ipoteca/` | PDF. **(da verificare** sulle fonti INPS e sull'art. 2122 c.c.) |
| Blog (gio.) `/blog/erede-estero-vendere-casa-procura/` | Vivi all'estero? Vendere la casa ereditata con la procura | vendita casa ereditata all'estero | procura per vendere casa ereditata; firmare il rogito a distanza; erede all'estero; codice fiscale | Commerciale (stagionale: rientri per le feste) | **Verso:** `/casa-ereditata/casi/erede-estero/`, `/casa-ereditata/vendere/con-piu-eredi/`, `/casa-ereditata/tasse/europa/` | **VAL** |

#### Settimana 10 (21-27 dicembre): successione fai da te, manovra

| Tipo | Titolo SEO | Keyword principale | Secondarie | Intento | Link interni | CTA |
|---|---|---|---|---|---|---|
| **Nuova guida** `src/content/guide/successione-fai-da-te.md` → `/casa-ereditata/successione/fai-da-te/` | Fare la successione da soli online: guida passo per passo | dichiarazione di successione fai da te | posso fare la dichiarazione di successione da solo; successione precompilata agenzia entrate; come presentare la dichiarazione di successione telematica; documenti da allegare | Informativo | **Verso:** `/casa-ereditata/successione/`, `/casa-ereditata/successione/costi/`, blog sugli errori della telematica, `/blog/successione-caf-notaio-commercialista/`. **Da:** successione.md (righe 14, 15), successione-costi.md | **REG** (checklist salvabile) + PDF + SCAD. **(da verificare** sulla guida dell'Agenzia del 15/06/2026 e sul servizio di precompilata) |
| Blog (lun.) `/blog/legge-bilancio-2027-casa-ereditata/` | Legge di bilancio 2027: cosa cambia per chi eredita casa | legge di bilancio 2027 successioni | IMU 2027; bonus edilizi 2027; cedolare secca 2027; imposta di successione 2027 | Informativo (news) | **Condizionale:** pubblicare solo se il testo approvato contiene novità rilevanti; altrimenti sostituire con il blog di riserva R1. **Verso:** `/casa-ereditata/tasse/`, `/casa-ereditata/tasse/bonus-edilizi/`, `/blog/testi-unici-2027-successioni/` | REG (avvisi novità) |
| Blog (gio.) `/blog/donazione-o-testamento-casa-figli/` | Donazione o testamento per lasciare la casa ai figli? | donazione o successione casa | differenza costi tra successione e donazione; casa donata si può vendere; imposta di successione e donazione | Informativo (pubblico: genitori) | **Verso:** `/casa-ereditata/testamento-e-legittima/casa-donata/`, `/blog/casa-donata-legge-182-2025/`, `/casa-ereditata/testamento-e-legittima/` | CALC + PDF |

#### Settimana 11 (28 dicembre - 3 gennaio): testi unici 2027

| Tipo | Titolo SEO | Keyword principale | Secondarie | Intento | Link interni | CTA |
|---|---|---|---|---|---|---|
| **Nuova guida** `src/content/guide/tasse-fratelli-nipoti-zii.md` → `/casa-ereditata/tasse/fratelli-nipoti-zii/` | Imposta di successione tra fratelli, nipoti e zii: esempi | imposta di successione tra fratelli | tasse successione zio nipote; franchigia fratelli; nipoti in linea collaterale; tra cugini; da zia a nipote | Informativo | **Verso:** `/casa-ereditata/tasse/`, CALC, `/blog/quanto-costa-ereditare-casa-2026/`, `/casa-ereditata/testamento-e-legittima/`. **Da:** tasse.md (H2 aliquote), blog "quanto costa" (caso nipote) | **CALC** + VAL (chi eredita dallo zio spesso vende) |
| **Aggiornamento guide** tasse.md, successione.md, tasse-plusvalenza.md, successione-costi.md, tasse-agevolazioni-prima-casa.md | Box "Dal 1° gennaio 2027" con i nuovi riferimenti (D.Lgs. 123/2025 e 117/2026) e `verified:` aggiornato | testo unico successioni 2027 | testo unico successioni aggiornato; nuovo testo unico successioni e donazioni | Informativo | Link a `/blog/testi-unici-2027-successioni/` | - |
| Blog (lun.) `/blog/successione-2026-presentata-nel-2027/` | Decesso nel 2026, successione nel 2027: quali regole valgono? | successione 2027 | testo unico successioni 2027; dichiarazione di successione 2027; scadenza dei 12 mesi a cavallo d'anno | Informativo | **Verso:** `/blog/testi-unici-2027-successioni/` (aggiornarne `updated:`), `/casa-ereditata/successione/`, SCAD | **SCAD** |
| Blog (gio.) `/blog/calendario-2027-casa-ereditata/` | Casa ereditata: tutte le scadenze del 2027 in un calendario | scadenze 2027 casa ereditata | scadenze imu 2027; 730 2027; acconto imu giugno 2027; tari 2027 | Informativo/strumento | **Verso:** SCAD, `/casa-ereditata/tasse/imu/`, `/casa-ereditata/tasse/730-casa-ereditata/`, `/casa-ereditata/tasse/tari/` | **SCAD + REG** + PDF calendario |

#### Settimana 12 (4-10 gennaio 2027): ISEE, cointestata, mercato

| Tipo | Titolo SEO | Keyword principale | Secondarie | Intento | Link interni | CTA |
|---|---|---|---|---|---|---|
| **Nuova guida** `src/content/guide/casi-casa-cointestata.md` → `/casa-ereditata/casi/casa-cointestata/` | Successione di una casa cointestata: cosa si eredita | successione casa cointestata | casa cointestata coniugi morte; casa in comproprietà; quota del defunto; vendere casa cointestata dopo la morte | Informativo/commerciale | **Verso:** `/casa-ereditata/testamento-e-legittima/`, nuova guida comunione-dei-beni, `/casa-ereditata/casi/diritto-abitazione-coniuge/`, `/casa-ereditata/vendere/` | VAL |
| **Aggiornamento guide** tasse-isee.md (ISEE 2027), tasse-730-casa-ereditata.md (riga 16, "vendita va dichiarata?") | - | casa ereditata isee | quanto incide una casa ereditata sull'isee; isee 2027 | Informativo | Link a SCAD | REG |
| Blog (lun.) `/blog/isee-2027-casa-ereditata/` | ISEE 2027 e casa ereditata: quando entra e quanto pesa | isee 2027 casa ereditata | quanto incide una casa ereditata sull'isee; quota casa ereditata isee; DSU 2027 | Informativo (stagionale) | Pagina principale sul tema resta `/casa-ereditata/tasse/isee/`: l'articolo è la notizia stagionale e la linka subito | CALC + REG |
| Blog (gio.) `/blog/vendere-casa-ereditata-2027-mercato/` | Vendere casa ereditata nel 2027: prezzi, tempi e consigli | vendere casa ereditata 2027 | mercato immobiliare 2027; prezzi case 2027; tempi di vendita | Commerciale | **Verso:** `/osservatorio/`, `/blog/case-ereditate-mercato-venditori-over-60/`, `/casa-ereditata/vendere/`, `/casa-ereditata/vendere/prezzo/` | **VAL** |

**Riserve** (se un tema salta o non è verificabile in tempo):
- R1: "Casa popolare ereditata: subentro, riscatto e vendita" (guida `casi-casa-popolare.md`);
- R2: "Mediazione per eredità: come funziona e quanto costa" (guida `eredi-mediazione.md` → `/eredi-in-disaccordo/mediazione/`);
- R3: "Comprare una casa ereditata: i 6 rischi da controllare" (blog, lato acquirente, verso cosa-controlla-acquirente).

### 5.2 Riepilogo del piano

| Settimana | Guida (nuova / aggiornata) | Blog 1 | Blog 2 | Focus |
|---|---|---|---|---|
| 1 | NUOVA quando-vendere + on-page 1-3 | CAF, notaio o commercialista | Agenzia immobiliare | Vendita |
| 2 | NUOVA rinuncia-eredita + on-page 4, 5, 19 | Rinuncia a favore di un fratello | Successione da un solo erede | Accettare/rinunciare |
| 3 | NUOVA trascrizione-accettazione + on-page 6 | Ereditare pagando meno tasse | Casa da ristrutturare | Vendita/tasse |
| 4 | NUOVA comunione-dei-beni + on-page 7 | Superbonus e plusvalenza | Casa vuota in inverno | Famiglia |
| 5 | AGG. IMU + coniuge (on-page 8, 9) | Saldo IMU 16/12 | Errori successione telematica | IMU (stagionale) |
| 6 | NUOVA valore-immobili + on-page 10 | Costi vendita: esempio | Legge 104 e franchigia | Valutazione |
| 7 | NUOVA erede-minorenne + on-page 11, 12 | Vendere a dicembre o a gennaio | Osservatorio: tempi di vendita | Vendita |
| 8 | NUOVA casa-con-mutuo | 7 cose entro il 31/12 | Feste e fratelli | Fine anno |
| 9 | NUOVA usufrutto-nuda-proprieta + AGG. erede-estero | Rinuncia e reversibilità | Erede all'estero e procura | Vendita |
| 10 | NUOVA fai-da-te + on-page 14, 15 | Legge di bilancio 2027 (condizionale) | Donazione o testamento | Successione |
| 11 | NUOVA fratelli-nipoti-zii + AGG. testi unici | Decesso 2026, successione 2027 | Calendario 2027 | Testi unici |
| 12 | NUOVA casa-cointestata + AGG. ISEE e 730 | ISEE 2027 | Vendere nel 2027 | ISEE/mercato |

Totale: **24 articoli blog**, **11 nuove guide** (a 49 si arriva a 60), **20 ottimizzazioni on-page**, 4 aggiornamenti di contenuto, 3 riserve.

### 5.3 Dopo le 12 settimane (anticipazione)

- **Marzo-aprile 2027:** guida 730 aggiornata a fine marzo, prima del 730 precompilato di fine aprile; blog "Casa ereditata nel 730/2027: quote e giorni".
- **Maggio-giugno 2027:** acconto IMU del 16 giugno (riciclare il blog sul saldo); blog "Vendere in estate".
- Misurare in Search Console (12 settimane): impressioni e posizione per le 20 keyword prioritarie; CTR delle pagine con il nuovo title rispetto alle 4 settimane precedenti; click verso `/valuta-casa-ereditata/` (evento) per ogni pagina.

---

## 6. Dieci idee di featured snippet

Formato: un paragrafo di 40-50 parole subito sotto l'H2 che riprende la domanda, oppure come FAQ nel frontmatter. Ogni risposta riprende regole già presenti nelle guide; vanno ricontrollate al momento della pubblicazione.

| # | Domanda (H2 o FAQ) | Risposta (40-50 parole) | Pagina di destinazione |
|---|---|---|---|
| 1 | Si può vendere una casa ereditata prima della successione? | No. Il notaio non può stipulare la vendita di un immobile caduto in successione se gli eredi non provano di aver presentato la dichiarazione di successione. Serve anche l'accettazione dell'eredità, trascritta nei registri immobiliari. Nel frattempo puoi però far valutare la casa e cercare un acquirente. | Nuova guida quando-vendere; vendere.md (FAQ) |
| 2 | Se vendo la casa ereditata prima di 5 anni pago tasse? | Di norma no: la casa ricevuta per successione non genera plusvalenza tassabile, in qualsiasi momento la vendi. I 5 anni contano solo se hai usato l'agevolazione prima casa in successione: vendendo prima, senza ricomprare entro un anno l'abitazione principale, perdi lo sconto e paghi differenza e sanzioni. | tasse-plusvalenza.md; tasse-agevolazioni-prima-casa.md |
| 3 | La casa ereditata entra nella comunione dei beni? | No. Per l'articolo 179 del Codice civile i beni ricevuti per successione o donazione sono personali, anche se sei sposato in comunione legale. Il coniuge non ne diventa comproprietario, salvo che il testamento li attribuisca espressamente alla comunione. Per venderla firma solo l'erede. | Nuova guida comunione-dei-beni |
| 4 | Chi paga l'IMU sulla casa ereditata dove abita la madre? | Se la madre è la vedova e la casa era l'abitazione familiare dei due coniugi, ha il diritto di abitazione e paga lei l'IMU come unico soggetto passivo. Se è la sua abitazione principale e non è di lusso, l'IMU non è dovuta. I figli non pagano. | tasse-imu.md; casi-diritto-abitazione-coniuge.md |
| 5 | Quanto costa fare la successione di una casa? | Per un figlio con i requisiti prima casa si parte da circa 650 euro tra imposte fisse (200 euro ipotecaria e 200 catastale), bollo, tributi e compenso. Senza agevolazione si pagano il 2% di ipotecaria e l'1% di catastale sul valore catastale, più l'eventuale imposta di successione. | successione-costi.md; blog quanto-costa |
| 6 | Cosa succede se un erede non vuole vendere la casa? | Nessuno può essere obbligato a vendere, ma nessuno è obbligato a restare in comunione. Puoi vendere la tua quota, proporre a chi vuole tenerla di liquidarti o avviare la mediazione obbligatoria. Se fallisce, il giudice divide: assegna la casa a un erede con conguaglio oppure la vende. | eredi-in-disaccordo.md |
| 7 | Entro quando va presentata la dichiarazione di successione? | Entro 12 mesi dalla data di apertura della successione, che di norma coincide con il decesso. Basta che la presenti uno degli eredi, anche per tutti. Non è obbligatoria se l'eredità va a coniuge e parenti in linea retta, non comprende immobili e non supera 100.000 euro. | successione.md; SCAD |
| 8 | Quanto si paga di imposta di successione tra fratelli? | Tra fratelli e sorelle l'imposta di successione è del 6% sulla parte della quota che supera 100.000 euro per ciascun erede. Se c'è una casa si aggiungono l'ipotecaria del 2% e la catastale dell'1% sul valore catastale, oppure 200 euro ciascuna con i requisiti prima casa. | Nuova guida fratelli-nipoti-zii; tasse.md |
| 9 | Quanto spetta di legittima al coniuge con due figli? | Con il coniuge e due o più figli, al coniuge spetta un quarto del patrimonio e ai figli, insieme, la metà, divisa in parti uguali. Il quarto restante è la quota disponibile, che il testamento può lasciare a chiunque. Il coniuge ha inoltre il diritto di abitare la casa familiare. | testamento-legittima.md |
| 10 | La vendita della casa ereditata va dichiarata nel 730? | Di norma no: vendere una casa ereditata non genera plusvalenza tassabile, quindi il prezzo non va indicato nel 730. Nella dichiarazione dell'anno successivo indichi però la casa nel quadro B, per la tua quota e per i giorni in cui l'hai posseduta. Fanno eccezione i terreni edificabili. | tasse-730-casa-ereditata.md; tasse-plusvalenza.md |

Note di verifica sugli snippet:
- **4**: la Cassazione (2025, citata da Edotto) esclude il diritto di abitazione automatico se la casa era in comproprietà con terzi diversi dal coniuge. Va scritto nella guida, mentre lo snippet si limita al caso dei due coniugi.
- **2**: va controllata la decorrenza dei 5 anni (dalla dichiarazione di successione o dall'apertura), su cui le fonti secondarie non concordano.

---

## 7. Appendice: estratto dei suggerimenti Autocomplete più utili (17/10/2026)

Solo le formulazioni che ispirano titoli e H2. L'elenco completo, con 3.537 suggerimenti, è nella scratchpad di sessione e non è stato salvato nel repository.

- **casa ereditata** (prime 10, in ordine): occupata da un erede chi paga imu · occupata da un erede · casa ereditata · occupata da un erede 730 · dove abita la madre 730 · diventa seconda casa · abitata da un erede · vendere o affittare · in comunione dei beni · con abusi edilizi.
- **come + casa ereditata**: svuotare · vendere · dichiarare · intestare · dividere · calcolare imu · pagare imu · donare · rinunciare · liberarsi di una casa ereditata.
- **vendere casa ereditata**: tasse · prima dei 5 anni · cosa serve · dopo 10 anni · con figli minorenni · dopo 5 anni · prima della successione · plusvalenza · con testamento.
- **posso + vendere**: posso vendere subito una casa ereditata · quando posso vendere · appena ereditata · dopo quanto tempo · la mia quota · la mia parte.
- **erede non vuole vendere**: erede non vuole vendere casa · se un erede non vuole vendere la casa cosa succede · la sua quota · casa ereditata un erede non vuole vendere · mio fratello non vuole vendere la casa ereditata.
- **imu casa ereditata**: abitata dal fratello · non abitata · abitata dalla madre · da quando si paga · abitata da un erede · dal coniuge superstite · coniuge e figli.
- **successione casa**: costi · ai figli · quanto si paga · cointestata · figlio unico · dei genitori · coniuge e figli · popolare.
- **dichiarazione di successione**: agenzia delle entrate · chi la fa · on line · istruzioni · precompilata · presentata da un solo erede · integrativa · costi · e accettazione eredità · posso farla da solo.
- **rinuncia eredità**: termini · costo · minori · tribunale · più eredi · chi subentra · a favore di un fratello · e pensione di reversibilità · chi paga i debiti · chi paga imu.
- **accettazione eredità**: con beneficio di inventario · per vendita immobile · costo · tacita · termine · come trascrivere · come verificare la trascrizione.
- **Nessun suggerimento** (domanda debole o assente): valutazione casa ereditata · quanto vale casa ereditata · agenzia immobiliare casa ereditata · casa ereditata da ristrutturare · successione 2027 · saldo imu casa ereditata · comprare quota fratello.
