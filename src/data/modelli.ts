// Kit di modelli di lettera per chi ha ereditato una casa.
// I campi da compilare sono tra parentesi quadre. I testi sono modelli generali:
// vanno adattati al caso concreto e, nei punti delicati (accettazione dell'eredità,
// vendita di quote, liti tra eredi), verificati con un notaio o un avvocato.

export type Modello = {
  id: string;
  titolo: string;
  categoria: 'Banca e conti' | 'Utenze e servizi' | 'Casa e condominio' | 'Tra eredi' | 'Enti e uffici';
  quando: string;
  destinatario: string;
  invio: string;
  testo: string;
  attenzione?: string;
  guida?: string;
  fonti?: { title: string; url: string }[];
};

const CC = 'https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:regio.decreto:1942-03-16;262';

const FONTE_ART_460 = {
  title: "Codice civile, art. 460: poteri del chiamato prima dell'accettazione (Normattiva)",
  url: `${CC}~art460`,
};
const FONTE_ART_476 = {
  title: 'Codice civile, art. 476: accettazione tacita (Normattiva)',
  url: `${CC}~art476`,
};

export const MODELLI: Modello[] = [
  // 1
  {
    id: 'banca-comunicazione-decesso',
    titolo: 'Comunicazione del decesso alla banca e richiesta del saldo alla data del decesso',
    categoria: 'Banca e conti',
    quando:
      "Serve nelle prime settimane, per avvisare la banca, bloccare carte e deleghe e ottenere per iscritto l'elenco dei rapporti e il saldo alla data del decesso, dati necessari per la dichiarazione di successione.",
    destinatario: "Ufficio successioni della banca o filiale presso cui il defunto aveva i rapporti",
    invio:
      "PEC della banca o raccomandata A/R; in alternativa consegna allo sportello facendoti rilasciare copia con timbro e data di ricezione. Allega certificato o estratto dell'atto di morte, copia del tuo documento d'identità e codice fiscale e, se già disponibile, la dichiarazione sostitutiva di atto notorio che indica gli eredi.",
    testo: `[Nome e cognome del mittente]
[Indirizzo, CAP, Comune]
[Telefono] - [Email o PEC]

Spett.le [Nome della banca]
Ufficio successioni / Filiale di [Comune], [indirizzo della filiale]
[PEC o indirizzo della banca]

[Luogo], [data]

Oggetto: comunicazione del decesso di [nome e cognome del defunto], codice fiscale [codice fiscale del defunto], e richiesta di informazioni sui rapporti intestati o cointestati

Il/La sottoscritto/a [nome e cognome], nato/a a [luogo di nascita] il [data di nascita], codice fiscale [codice fiscale], in qualità di [figlio/a, coniuge, altro grado di parentela] e chiamato/a all'eredità di [nome e cognome del defunto], nato/a a [luogo di nascita del defunto] il [data di nascita del defunto],

comunica

che [nome e cognome del defunto] è deceduto/a a [luogo del decesso] il [data del decesso], come risulta dal certificato allegato.

Chiede pertanto:

1. di bloccare con effetto immediato carte di pagamento, carte di credito e deleghe collegate ai rapporti del defunto;
2. l'elenco di tutti i rapporti intestati o cointestati al defunto alla data del decesso (conti correnti, libretti, depositi titoli, fondi, polizze collocate dalla banca, cassette di sicurezza, finanziamenti, mutui, garanzie prestate), con l'indicazione per ciascuno degli eventuali cointestatari e del tipo di firma (congiunta o disgiunta);
3. il saldo di ciascun rapporto alla data del decesso, compresi i ratei di interessi maturati a quella data, e il controvalore dei titoli alla stessa data, ai fini della dichiarazione di successione;
4. l'elenco degli addebiti e degli accrediti registrati dopo il decesso, con l'indicazione di quelli che saranno stornati;
5. l'indicazione di eventuali polizze assicurative abbinate a mutui o finanziamenti;
6. l'elenco dei documenti richiesti dalla banca per la successiva pratica di successione e per lo svincolo delle somme, con le eventuali spese.

Chiede inoltre che ogni comunicazione relativa ai rapporti del defunto sia inviata al seguente recapito: [indirizzo, email o PEC].

La presente comunicazione ha il solo scopo di informare la banca del decesso e di ottenere le informazioni necessarie agli adempimenti di legge; non costituisce accettazione dell'eredità né richiesta di svincolo delle somme.

Distinti saluti.

[Firma]
[Nome e cognome]

Allegati:
- certificato o estratto dell'atto di morte;
- copia del documento d'identità e del codice fiscale del/della sottoscritto/a;
- [eventuale dichiarazione sostitutiva di atto notorio sugli eredi].`,
    attenzione:
      "Chiedere informazioni e far bloccare carte e deleghe sono atti di semplice vigilanza. Non prelevare e non usare la carta del defunto: usare i suoi soldi può essere considerato accettazione tacita dell'eredità. Per legge la banca non può consegnare le somme agli eredi senza la prova della presentazione della dichiarazione di successione o la dichiarazione scritta che non c'era obbligo di presentarla.",
    guida: '/casa-ereditata/primi-passi/conto-defunto/',
    fonti: [
      {
        title: 'Testo unico successioni, D.Lgs. 346/1990, art. 48: obblighi delle banche (Normattiva)',
        url: 'https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.legislativo:1990-10-31;346~art48',
      },
      {
        title: 'Codice civile, art. 1722: estinzione del mandato (Normattiva)',
        url: `${CC}~art1722`,
      },
      FONTE_ART_460,
      FONTE_ART_476,
    ],
  },

  // 2
  {
    id: 'banca-pagamento-spese-funerarie',
    titolo: 'Richiesta alla banca di pagare la fattura del funerale dal conto del defunto',
    categoria: 'Banca e conti',
    quando:
      "Serve quando il conto del defunto è bloccato e la famiglia chiede alla banca di pagare direttamente all'impresa funebre la fattura del funerale. Non è un obbligo di legge: la banca può accettare o rifiutare, secondo le sue procedure.",
    destinatario: 'Ufficio successioni della banca presso cui il defunto aveva il conto',
    invio:
      "PEC o raccomandata A/R, oppure consegna allo sportello con copia per ricevuta. Allega fattura intestata con i dati del defunto o degli eredi, certificato di morte, documenti d'identità di chi firma e, se la banca lo chiede, il consenso scritto degli altri chiamati all'eredità.",
    testo: `[Nome e cognome del mittente]
[Indirizzo, CAP, Comune]
[Telefono] - [Email o PEC]

Spett.le [Nome della banca]
Ufficio successioni / Filiale di [Comune]
[PEC o indirizzo]

[Luogo], [data]

Oggetto: richiesta di pagamento della fattura delle spese funerarie di [nome e cognome del defunto] dal conto n. [numero o IBAN del conto]

Il/La sottoscritto/a [nome e cognome], codice fiscale [codice fiscale], in qualità di chiamato/a all'eredità di [nome e cognome del defunto], deceduto/a il [data del decesso], già comunicato a codesta banca in data [data della comunicazione del decesso],

chiede

che codesta banca, se le sue procedure lo consentono, provveda a pagare direttamente, con addebito sul conto n. [numero o IBAN] intestato al defunto, la fattura n. [numero fattura] del [data fattura] emessa dall'impresa funebre [denominazione dell'impresa], partita IVA [partita IVA], per l'importo di euro [importo], mediante bonifico sul conto IBAN [IBAN dell'impresa funebre] intestato alla stessa impresa.

Il pagamento è richiesto esclusivamente per le spese funerarie del defunto. Si chiede di rilasciare quietanza o contabile del pagamento, utile anche per la dichiarazione di successione.

[Se ci sono altri chiamati all'eredità:] La richiesta è condivisa dagli altri chiamati all'eredità, [nomi e cognomi], che la sottoscrivono per consenso.

Se la banca non ritiene di poter procedere, si chiede di comunicarlo per iscritto, indicando gli eventuali documenti necessari.

Distinti saluti.

[Firma]
[Nome e cognome]

[Firme per consenso degli altri chiamati all'eredità]

Allegati:
- copia della fattura dell'impresa funebre;
- certificato o estratto dell'atto di morte;
- copia dei documenti d'identità dei firmatari.`,
    attenzione:
      "La prassi varia da banca a banca: alcune pagano la fattura del funerale dal conto bloccato, altre no. Pagare il funerale con i soldi del defunto è un caso discusso: alcune pronunce lo considerano un atto di pietà e non un'accettazione, ma non c'è una regola certa. Fai pagare la banca direttamente all'impresa funebre, non prelevare tu i contanti, e se temi debiti nell'eredità parlane prima con un notaio. Le spese funerarie documentate sono deducibili nella dichiarazione di successione entro un limite fissato dalla legge.",
    guida: '/casa-ereditata/primi-passi/conto-defunto/',
    fonti: [
      {
        title: 'Testo unico successioni, D.Lgs. 346/1990, art. 24: spese mediche e funerarie (Normattiva)',
        url: 'https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.legislativo:1990-10-31;346~art24',
      },
      {
        title: 'Testo unico successioni, D.Lgs. 346/1990, art. 48: obblighi delle banche (Normattiva)',
        url: 'https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.legislativo:1990-10-31;346~art48',
      },
      FONTE_ART_476,
    ],
  },

  // 3
  {
    id: 'utenze-voltura-disdetta-luce-gas',
    titolo: 'Voltura o disdetta della fornitura di luce o gas dopo il decesso',
    categoria: 'Utenze e servizi',
    quando:
      "Serve quando avete deciso cosa fare delle forniture della casa: intestarle a un erede o a un familiare senza interrompere il servizio (voltura) oppure chiudere il contratto e disattivare il contatore (disdetta).",
    destinatario: 'Venditore di energia elettrica o gas indicato in bolletta (non il distributore)',
    invio:
      "Canale indicato dal venditore: area clienti, PEC, email o raccomandata A/R. Molti venditori hanno un modulo apposito per la voltura per decesso: se c'è, usa quello e allega questa lettera solo come accompagnamento. Allega certificato di morte o autocertificazione, documento d'identità, foto della lettura del contatore e, per la voltura, il titolo sull'immobile anche in autocertificazione.",
    testo: `[Nome e cognome del mittente]
[Indirizzo, CAP, Comune]
[Telefono] - [Email o PEC]

Spett.le [Nome del venditore di luce o gas]
[Indirizzo, PEC o canale indicato in bolletta]

[Luogo], [data]

Oggetto: decesso dell'intestatario [nome e cognome del defunto] - fornitura di [energia elettrica / gas naturale] - codice cliente [codice cliente] - [POD / PDR] [codice POD o PDR] - richiesta di [voltura / disdetta]

Il/La sottoscritto/a [nome e cognome], nato/a a [luogo di nascita] il [data di nascita], codice fiscale [codice fiscale], comunica che l'intestatario della fornitura in oggetto, [nome e cognome del defunto], codice fiscale [codice fiscale del defunto], è deceduto/a il [data del decesso].

La fornitura riguarda l'immobile in [indirizzo completo dell'immobile, scala, piano, interno].

Lettura del contatore alla data del [data della lettura]: [lettura], come da foto allegata.

[Scegliere una delle due opzioni]

OPZIONE A - Voltura
Chiede la voltura del contratto a proprio nome, senza interruzione della fornitura, a decorrere dalla prima data utile. Dichiara di avere titolo sull'immobile in qualità di [chiamato/a all'eredità / comproprietario/a / detentore/detentrice / coniuge che vi abita]. Chiede di indicare i costi della pratica, l'eventuale deposito cauzionale e le condizioni economiche applicate al nuovo contratto. Per l'addebito delle bollette future indica l'IBAN [IBAN].

OPZIONE B - Disdetta
Chiede la cessazione del contratto e la disattivazione del punto di fornitura a decorrere dalla prima data utile, con emissione della bolletta di chiusura sulla base della lettura indicata. Chiede di indicare come verrà restituito o compensato l'eventuale deposito cauzionale.

Chiede infine che la bolletta di chiusura dei consumi fino al decesso e ogni comunicazione siano inviate al seguente recapito: [indirizzo, email o PEC].

Distinti saluti.

[Firma]
[Nome e cognome]

Allegati:
- certificato di morte o dichiarazione sostitutiva di certificazione del decesso;
- copia del documento d'identità e del codice fiscale;
- foto della lettura del contatore;
- [per la voltura: dichiarazione sostitutiva sul titolo di possesso o detenzione dell'immobile].`,
    attenzione:
      "Nei moduli di voltura per decesso capita di dover barrare la casella \"erede\": dichiararsi erede per iscritto può essere letto come accettazione dell'eredità. Se non hai ancora deciso, indica la qualità di chiamato all'eredità o di detentore dell'immobile. Le bollette dei consumi fino al decesso sono debiti dell'eredità: pagarle con i soldi del defunto prima di aver deciso è rischioso. Pagare con soldi tuoi i consumi successivi, per evitare il distacco, è di norma un atto di conservazione.",
    guida: '/casa-ereditata/gestire-la-casa/utenze/',
    fonti: [
      {
        title: "ARERA, Atlante per il consumatore: come si richiede la voltura (gas)",
        url: 'https://www.arera.it/en/atlante-per-il-consumatore/gas/il-contratto/voltura-e-subentro/come-si-richiede-la-voltura',
      },
      {
        title: "ARERA, Atlante per il consumatore: cos'è la voltura (gas)",
        url: 'https://www.arera.it/en/atlante-per-il-consumatore/gas/il-contratto/voltura-e-subentro/cose-la-voltura',
      },
      {
        title: 'ARERA, Atlante per il consumatore: morosità del precedente intestatario (gas)',
        url: 'https://www.arera.it/atlante-per-il-consumatore/gas/il-contratto/voltura-e-subentro/il-venditore-puo-addebitare-la-morosita-del-precedente-intestatario-in-caso-di-subentro-o-di-voltura',
      },
      FONTE_ART_460,
      FONTE_ART_476,
    ],
  },

  // 4
  {
    id: 'condominio-comunicazione-amministratore',
    titolo: "Comunicazione del decesso all'amministratore di condominio e richiesta della situazione dei pagamenti",
    categoria: 'Casa e condominio',
    quando:
      "Serve nelle prime settimane, per far sapere all'amministratore chi è il nuovo riferimento, ricevere convocazioni e avvisi e scoprire arretrati e lavori deliberati prima di decidere sull'eredità. Una seconda comunicazione, con i nomi definitivi dei proprietari, va inviata quando la successione è definita.",
    destinatario: "Amministratore del condominio in cui si trova l'appartamento",
    invio:
      "PEC, email con conferma di lettura o raccomandata A/R: serve una prova scritta della data. Allega copia del certificato di morte e, quando disponibili, i dati di tutti gli eredi con codici fiscali e quote.",
    testo: `[Nome e cognome del mittente]
[Indirizzo, CAP, Comune]
[Telefono] - [Email o PEC]

Spett.le [Nome dell'amministratore o dello studio]
Amministratore del Condominio [nome o indirizzo del condominio]
[Indirizzo, email o PEC]

[Luogo], [data]

Oggetto: Condominio [indirizzo] - unità [scala, piano, interno], dati catastali [foglio, particella, subalterno] - decesso del condomino [nome e cognome del defunto] e richiesta della situazione contabile

Il/La sottoscritto/a [nome e cognome], codice fiscale [codice fiscale], in qualità di [figlio/a, coniuge, altro] di [nome e cognome del defunto], comunica che il condomino [nome e cognome del defunto], proprietario dell'unità in oggetto, è deceduto/a il [data del decesso].

[Prima comunicazione:] Fino alla definizione della successione, il/la sottoscritto/a fa da riferimento per la famiglia. Si chiede di inviare avvisi di pagamento, convocazioni e verbali al seguente recapito: [indirizzo, email o PEC].

[Comunicazione dei nuovi proprietari, anche ai fini dell'aggiornamento del registro di anagrafe condominiale:] Si comunica che, a seguito della successione, l'unità risulta di proprietà di:
- [nome e cognome], codice fiscale [codice fiscale], residenza [indirizzo], quota [quota];
- [nome e cognome], codice fiscale [codice fiscale], residenza [indirizzo], quota [quota];
- [eventuale titolare di diritto di abitazione o usufrutto: nome e cognome, codice fiscale, diritto].
Per l'assemblea, i comproprietari indicano come rappresentante [nome e cognome].

Si chiede cortesemente di inviare:
1. l'estratto conto dell'unità, con le rate pagate e quelle scadute e non pagate alla data del decesso;
2. le rate in scadenza e il bilancio preventivo dell'esercizio in corso;
3. l'ultimo rendiconto consuntivo approvato;
4. i verbali delle assemblee degli ultimi [due/tre] anni, con l'indicazione di eventuali lavori straordinari deliberati o in discussione e delle relative quote a carico dell'unità;
5. notizia di eventuali solleciti, decreti ingiuntivi o contenziosi che riguardano l'unità;
6. copia del regolamento di condominio e delle tabelle millesimali.

Distinti saluti.

[Firma]
[Nome e cognome]

Allegati:
- copia del certificato di morte;
- [eventuale: elenco degli eredi con codici fiscali e quote].`,
    attenzione:
      "Comunicare il decesso e chiedere informazioni è un atto di vigilanza che puoi fare anche prima di accettare l'eredità. Non firmare impegni di pagamento degli arretrati \"in qualità di erede\" finché non hai deciso: le rate non pagate dal defunto e, secondo l'orientamento prevalente, i lavori deliberati prima del decesso sono debiti dell'eredità. Le variazioni dei dati dei proprietari vanno comunicate all'amministratore per iscritto entro sessanta giorni (art. 1130, n. 6, c.c.); l'art. 63 disp. att. c.c. riguarda invece la riscossione dei contributi e gli obblighi di chi vende e di chi compra.",
    guida: '/casa-ereditata/gestire-la-casa/condominio/',
    fonti: [
      {
        title: "Codice civile, art. 1130: attribuzioni dell'amministratore e anagrafe condominiale (Normattiva)",
        url: `${CC}~art1130`,
      },
      {
        title: 'Disposizioni di attuazione del codice civile, art. 63: riscossione dei contributi (Normattiva)',
        url: 'https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:regio.decreto:1942-03-30;318~art63',
      },
      {
        title: 'Disposizioni di attuazione del codice civile, art. 67: rappresentanza in assemblea (Normattiva)',
        url: 'https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:regio.decreto:1942-03-30;318~art67',
      },
      FONTE_ART_460,
    ],
  },

  // 5
  {
    id: 'assicurazione-polizza-casa',
    titolo: "Comunicazione del decesso alla compagnia assicurativa della polizza casa",
    categoria: 'Casa e condominio',
    quando:
      "Serve quando il defunto aveva una polizza sulla casa (incendio, danni, responsabilità civile): per sapere se la copertura resta attiva, a chi intestarla e se va adeguata a una casa che resterà vuota o sarà affittata.",
    destinatario: "Compagnia assicurativa o agenzia che gestisce la polizza",
    invio:
      "PEC o raccomandata A/R alla compagnia, oppure all'agenzia con copia per ricevuta. Allega certificato di morte, copia della polizza o dell'ultima quietanza e documento d'identità.",
    testo: `[Nome e cognome del mittente]
[Indirizzo, CAP, Comune]
[Telefono] - [Email o PEC]

Spett.le [Nome della compagnia assicurativa]
[Agenzia di (Comune), indirizzo, email o PEC]

[Luogo], [data]

Oggetto: polizza n. [numero di polizza] intestata a [nome e cognome del defunto] - immobile in [indirizzo dell'immobile] - comunicazione del decesso del contraente

Il/La sottoscritto/a [nome e cognome], codice fiscale [codice fiscale], in qualità di [figlio/a, coniuge, altro] del contraente [nome e cognome del defunto], codice fiscale [codice fiscale del defunto], comunica che il contraente è deceduto/a il [data del decesso].

La polizza in oggetto riguarda l'immobile in [indirizzo completo]. Si informa che l'immobile [è attualmente disabitato / è abitato da (nome e cognome) / è dato in locazione].

Si chiede di comunicare per iscritto:
1. se la copertura resta in vigore e fino a quale data è coperta dal premio già pagato;
2. le modalità per intestare la polizza ai nuovi titolari o a uno di essi, e i documenti necessari;
3. se lo stato attuale dell'immobile (in particolare se disabitato) richiede una comunicazione o una modifica delle condizioni, e con quali effetti sul premio;
4. le modalità per l'eventuale recesso alla scadenza e per il rimborso della parte di premio non goduta, se previsto dal contratto;
5. se risultano sinistri aperti o premi non pagati.

Si chiede di inviare ogni comunicazione al seguente recapito: [indirizzo, email o PEC], e di indicare le modalità di pagamento delle prossime rate, dato che il conto del contraente non è più operativo.

Distinti saluti.

[Firma]
[Nome e cognome]

Allegati:
- copia del certificato di morte;
- copia della polizza o dell'ultima quietanza;
- copia del documento d'identità.`,
    attenzione:
      "Mantenere attiva l'assicurazione della casa e pagarne il premio con soldi propri è di norma un atto di conservazione del bene. Leggi però le condizioni di polizza: molte prevedono obblighi di comunicazione se la casa resta disabitata a lungo o cambia uso, e la mancata comunicazione può incidere sulla copertura. Incassare come erede un indennizzo per un sinistro, invece, può avere effetti sull'accettazione dell'eredità: chiedi prima al notaio.",
    guida: '/casa-ereditata/gestire-la-casa/',
    fonti: [FONTE_ART_460],
  },

  // 6
  {
    id: 'inquilino-subentro-eredi',
    titolo: "Comunicazione all'inquilino del subentro degli eredi nel contratto di locazione",
    categoria: 'Casa e condominio',
    quando:
      "Serve quando la casa ereditata è affittata: il contratto prosegue con gli eredi, che diventano i nuovi locatori alle stesse condizioni. La lettera dice all'inquilino chi sono gli eredi, chi li rappresenta e su quale conto pagare il canone.",
    destinatario: "Inquilino (conduttore) dell'immobile",
    invio:
      "Raccomandata A/R o PEC, se l'inquilino ne ha una; in alternativa consegna a mano con firma per ricevuta su una copia. Meglio se firmata da tutti gli eredi.",
    testo: `[Nome e cognome degli eredi o dell'erede incaricato]
[Indirizzo, CAP, Comune]
[Telefono] - [Email o PEC]

Gent.le [Nome e cognome dell'inquilino]
[Indirizzo dell'immobile locato]

[Luogo], [data]

Oggetto: contratto di locazione dell'immobile in [indirizzo, scala, piano, interno], registrato il [data di registrazione] al n. [numero o codice identificativo del contratto] - decesso del locatore [nome e cognome del defunto] e subentro degli eredi

Gentile [Nome e cognome dell'inquilino],

con la presente Le comunichiamo che il locatore, [nome e cognome del defunto], è deceduto/a il [data del decesso].

Il contratto di locazione prosegue alle stesse condizioni, senza alcuna variazione per Lei. Nella posizione di locatore subentrano gli eredi:
- [nome e cognome], codice fiscale [codice fiscale], quota [quota];
- [nome e cognome], codice fiscale [codice fiscale], quota [quota].

Per ogni comunicazione relativa al contratto può rivolgersi a [nome e cognome del referente], [telefono], [email o PEC], incaricato/a dagli eredi di tenere i rapporti con Lei.

A partire dal canone in scadenza il [data], La preghiamo di versare il canone e gli oneri accessori, nelle stesse misure e scadenze previste dal contratto, mediante bonifico sul conto:
IBAN [IBAN]
intestato a [intestatario del conto]
causale: "Canone [mese/anno] - immobile [indirizzo]".

La preghiamo di non effettuare più versamenti sul conto del defunto, che non è più operativo. [Se ci sono canoni già versati dopo il decesso:] Le chiediamo di indicarci gli eventuali pagamenti effettuati dopo il [data del decesso], in modo da verificarli con la banca.

Il deposito cauzionale versato all'inizio del contratto, pari a euro [importo], resta vincolato secondo quanto previsto dal contratto e sarà regolato dagli eredi alla sua conclusione.

Restiamo a disposizione per qualsiasi chiarimento.

Cordiali saluti.

[Firme degli eredi]
[Nomi e cognomi]`,
    attenzione:
      "Incassare i canoni e comportarsi da locatori sono atti da proprietario: secondo l'orientamento prevalente valgono come accettazione tacita dell'eredità. Se non avete ancora deciso se accettare, parlatene con un notaio prima di inviare la lettera e di indicare un nuovo conto. Ricordate anche di comunicare il subentro all'Agenzia delle Entrate con il modello RLI e di decidere la tassazione dei canoni: chiedete a un CAF o a un commercialista termini e codici. Non pretendete che l'inquilino lasci la casa per il decesso del proprietario: il contratto continua.",
    guida: '/casa-ereditata/casi/casa-con-inquilino/',
    fonti: [
      FONTE_ART_476,
      {
        title: "Codice civile, art. 1105: amministrazione della cosa comune (Normattiva)",
        url: `${CC}~art1105`,
      },
    ],
  },

  // 7
  {
    id: 'coeredi-notifica-retratto-successorio',
    titolo: 'Notifica ai coeredi della proposta di vendita della propria quota a un terzo (art. 732 c.c.)',
    categoria: 'Tra eredi',
    quando:
      "Serve quando vuoi vendere la tua quota di casa ereditata a un estraneo: prima devi offrirla agli altri coeredi alle stesse condizioni. Dall'ultima notifica i coeredi hanno due mesi per esercitare la prelazione; senza notifica possono riscattare la quota dall'acquirente finché dura la comunione ereditaria.",
    destinatario: 'Ciascuno degli altri coeredi (una lettera per ognuno)',
    invio:
      "Raccomandata A/R o PEC a ogni coerede, conservando le ricevute: il termine di due mesi decorre dall'ultima notifica ricevuta. In casi delicati si può usare la notifica tramite ufficiale giudiziario. Allega, se possibile, copia della proposta d'acquisto scritta del terzo. È consigliabile far rivedere il testo da un avvocato o dal notaio.",
    testo: `[Nome e cognome del coerede che vende]
[Indirizzo, CAP, Comune]
[Telefono] - [Email o PEC]

Gent.le [Nome e cognome del coerede destinatario]
[Indirizzo o PEC]

[Luogo], [data]

Oggetto: notificazione della proposta di alienazione della quota ereditaria ai sensi dell'art. 732 del codice civile - eredità di [nome e cognome del defunto], deceduto/a il [data del decesso]

Il/La sottoscritto/a [nome e cognome], nato/a a [luogo di nascita] il [data di nascita], codice fiscale [codice fiscale], coerede di [nome e cognome del defunto] per la quota di [quota ereditaria],

premesso che

- nell'eredità di [nome e cognome del defunto] è compreso l'immobile sito in [indirizzo], identificato al Catasto Fabbricati del Comune di [Comune] al foglio [foglio], particella [particella], subalterno [subalterno] [ed eventuali pertinenze];
- tra il/la sottoscritto/a e gli altri coeredi, [nomi e cognomi], è tuttora in corso la comunione ereditaria;
- il/la sottoscritto/a intende alienare a un terzo estraneo all'eredità [la propria intera quota ereditaria / la propria quota dell'immobile sopra indicato, pari a (quota)];

notifica

la seguente proposta di alienazione, affinché Ella possa esercitare, se lo ritiene, il diritto di prelazione previsto dall'art. 732 c.c., alle medesime condizioni:

- oggetto: [descrizione esatta della quota oggetto di vendita];
- prezzo: euro [importo in cifre] ([importo in lettere]);
- modalità di pagamento: [es. intero prezzo al rogito / acconto di euro (importo) alla firma del preliminare e saldo al rogito];
- termine per la stipula dell'atto: entro il [data], presso il notaio [nome del notaio o "da scegliere di comune accordo"];
- altre condizioni: [es. spese notarili a carico dell'acquirente, eventuali garanzie, nessuna condizione sospensiva legata al mutuo].

[Facoltativo:] L'acquirente proposto è [nome e cognome o denominazione]; si allega copia della sua proposta scritta.

Ai sensi dell'art. 732 c.c., il diritto di prelazione deve essere esercitato entro due mesi dall'ultima delle notificazioni inviate ai coeredi. La invito a comunicare per iscritto, all'indirizzo sopra indicato, se intende esercitarlo. In mancanza di adesione entro tale termine, il/la sottoscritto/a potrà alienare la quota al terzo alle condizioni sopra indicate.

Distinti saluti.

[Firma]
[Nome e cognome]

Allegati:
- [eventuale copia della proposta d'acquisto del terzo].`,
    attenzione:
      "Vendere la propria quota ereditaria significa accettare l'eredità: la legge lo considera accettazione (art. 477 c.c.). Prima di notificare la proposta, quindi, la decisione di accettare deve essere già presa. Le condizioni comunicate devono essere quelle reali: se poi vendi al terzo a un prezzo più basso o a condizioni migliori, la prelazione può considerarsi violata e i coeredi possono riscattare la quota. Fai rivedere la notifica da un avvocato o dal notaio, soprattutto se l'eredità comprende più beni.",
    guida: '/eredi-in-disaccordo/vendere-quota/',
    fonti: [
      {
        title: 'Codice civile, art. 732: diritto di prelazione dei coeredi (Normattiva)',
        url: `${CC}~art732`,
      },
      {
        title: "Codice civile, art. 477: donazione, vendita e cessione dei diritti di successione (Normattiva)",
        url: `${CC}~art477`,
      },
    ],
  },

  // 8
  {
    id: 'coerede-occupa-casa-richiesta',
    titolo: 'Richiesta formale al coerede che occupa la casa da solo',
    categoria: 'Tra eredi',
    quando:
      "Serve quando un coerede vive nella casa ereditata o la usa in esclusiva senza un accordo. La lettera chiede di poter usare la casa anche voi o, in alternativa, propone un accordo con un compenso; mette per iscritto la richiesta, che è spesso decisiva per un'eventuale indennità di occupazione.",
    destinatario: 'Coerede che occupa la casa',
    invio:
      "Raccomandata A/R o PEC, conservando la ricevuta. Usa un tono pacato: la lettera potrebbe essere letta anche da un giudice o da un mediatore. Se la situazione è già conflittuale, è meglio che la scriva un avvocato.",
    testo: `[Nome e cognome del mittente]
[Indirizzo, CAP, Comune]
[Telefono] - [Email o PEC]

Gent.le [Nome e cognome del coerede]
[Indirizzo]

[Luogo], [data]

Oggetto: immobile in [indirizzo], caduto nell'eredità di [nome e cognome del defunto] - uso della casa comune e proposta di accordo

Caro/a [nome],

come sai, l'immobile in [indirizzo] è caduto nell'eredità di [nome e cognome del defunto], deceduto/a il [data del decesso], ed è oggi in comunione tra noi coeredi nelle seguenti quote: [nome] [quota], [nome] [quota], [nome] [quota].

Dal [data o periodo] abiti la casa [stabilmente / in modo esclusivo] e ne hai le chiavi. Secondo il codice civile ciascun comproprietario può usare la cosa comune, purché non ne alteri la destinazione e non impedisca agli altri di farne parimenti uso secondo il loro diritto. Finora non abbiamo preso alcun accordo scritto sull'uso della casa.

Ti chiedo quindi, con spirito di collaborazione, di scegliere una di queste soluzioni entro il [data, es. 30 giorni dal ricevimento]:

1. consentire anche a me [e agli altri coeredi] di usare la casa, consegnandomi una copia delle chiavi e concordando i tempi;
2. continuare a usare la casa in esclusiva, riconoscendo agli altri coeredi un compenso mensile di euro [importo] complessivi, da dividere secondo le quote, e sostenendo da solo/a le spese d'uso (utenze, rate condominiali ordinarie, TARI); le spese straordinarie restano a carico di tutti pro quota;
3. acquistare le quote degli altri coeredi a un prezzo da determinare sulla base di una stima [di un tecnico scelto insieme / dell'importo di euro (importo)], con eventuale pagamento a rate;
4. concordare la vendita dell'intera casa o la sua locazione, dividendo il ricavato secondo le quote.

Sono disponibile a incontrarci, anche con l'aiuto di un mediatore, per trovare la soluzione più adatta a tutti. In assenza di risposta entro il termine indicato, mi riservo di tutelare i miei diritti nelle sedi opportune, anche per quanto riguarda il compenso per l'uso esclusivo dal ricevimento di questa lettera.

Un caro saluto.

[Firma]
[Nome e cognome]`,
    attenzione:
      "Chi chiede l'uso della casa o un compenso agisce come comproprietario: è un comportamento da erede e, se non hai ancora accettato l'eredità, può valere come accettazione tacita. Il diritto a un'indennità per l'uso esclusivo dipende dal caso concreto e dalla giurisprudenza: secondo l'orientamento prevalente conta soprattutto se l'occupante ha impedito agli altri di usare la casa, per esempio dopo una richiesta scritta. L'importo indicato è una proposta, non un diritto certo. Se nella casa vive il coniuge superstite con il diritto di abitazione, questa lettera non va usata: le regole sono diverse.",
    guida: '/eredi-in-disaccordo/coerede-occupa-casa/',
    fonti: [
      {
        title: 'Codice civile, art. 1102: uso della cosa comune (Normattiva)',
        url: `${CC}~art1102`,
      },
      FONTE_ART_476,
    ],
  },

  // 9
  {
    id: 'accordo-gestione-provvisoria-casa',
    titolo: 'Proposta di accordo tra eredi per la gestione provvisoria della casa',
    categoria: 'Tra eredi',
    quando:
      "Serve nei mesi in cui la casa è in comunione e non avete ancora deciso se venderla, affittarla o tenerla: fissa per iscritto chi tiene le chiavi, chi anticipa le spese, come si dividono e come si prendono le decisioni.",
    destinatario: 'Tutti i coeredi o chiamati all\'eredità',
    invio:
      "Email o PEC a tutti i coeredi con la proposta; una volta concordato il testo, firmatelo tutti in tante copie quante sono le parti (o con firma digitale). Non serve registrarlo se riguarda solo la gestione delle spese.",
    testo: `ACCORDO PER LA GESTIONE PROVVISORIA DELL'IMMOBILE IN [INDIRIZZO]

Tra i sottoscritti:
- [nome e cognome], nato/a a [luogo] il [data], codice fiscale [codice fiscale], quota [quota];
- [nome e cognome], nato/a a [luogo] il [data], codice fiscale [codice fiscale], quota [quota];
- [nome e cognome], nato/a a [luogo] il [data], codice fiscale [codice fiscale], quota [quota];

premesso che l'immobile in [indirizzo], identificato al Catasto Fabbricati del Comune di [Comune] al foglio [foglio], particella [particella], subalterno [subalterno], fa parte dell'eredità di [nome e cognome del defunto], deceduto/a il [data del decesso], e che le parti non hanno ancora deciso la destinazione definitiva dell'immobile,

si conviene quanto segue, in via provvisoria e fino al [data] o fino a una diversa decisione comune.

1. Referente. [Nome e cognome] è incaricato/a di tenere i rapporti con amministratore di condominio, fornitori, Comune e assicurazione, e di informare gli altri di ogni comunicazione ricevuta entro [numero] giorni.

2. Chiavi. Le chiavi sono custodite da [nome e cognome]; una copia è consegnata a [nomi]. Nessuno cambia le serrature né consegna chiavi a terzi senza avvisare gli altri.

3. Uso della casa. Nessuno abita stabilmente la casa né la concede in uso a terzi senza il consenso scritto di tutti. Gli accessi per pulizie, controlli e sopralluoghi sono comunicati agli altri con [numero] giorni di anticipo.

4. Utenze. Restano attive le seguenti forniture: [luce / gas / acqua], con le seguenti impostazioni: [es. caldaia in antigelo, acqua chiusa al rubinetto generale]. Le altre sono disdette.

5. Spese. Le spese di conservazione (rate condominiali, utenze minime, assicurazione, TARI, IMU, piccole riparazioni urgenti) sono anticipate da [nome e cognome / ciascuno a turno] e ripartite tra le parti in proporzione alle quote. Le spese urgenti fino a euro [importo] possono essere sostenute dal referente senza consenso preventivo, avvisando gli altri; oltre tale importo serve l'accordo [della maggioranza delle quote / di tutti].

6. Rendiconto. Ogni [mese / trimestre / semestre] il referente invia a tutti un rendiconto con le spese sostenute e le ricevute; i conguagli si pagano entro [numero] giorni sul conto IBAN [IBAN] o direttamente a chi ha anticipato.

7. Debiti del defunto. Gli arretrati del defunto (bollette, rate condominiali, imposte maturate prima del decesso) sono annotati a parte e non vengono pagati finché le parti non hanno deciso sull'accettazione dell'eredità, salvo diverso accordo scritto.

8. Beni mobili. Nessuno porta via mobili, oggetti o documenti dalla casa prima di un inventario fotografico condiviso, salvo i documenti necessari alla successione, di cui si informa gli altri.

9. Decisioni importanti. Locazione, lavori non urgenti, vendita e incarichi ad agenzie immobiliari richiedono una decisione scritta, secondo le regole di legge sulla comunione.

10. Disaccordi. In caso di disaccordo le parti si impegnano a incontrarsi entro [numero] giorni e, se necessario, a tentare una mediazione prima di rivolgersi al giudice.

[Luogo], [data]

Firme:
[Nome e cognome] ____________________
[Nome e cognome] ____________________
[Nome e cognome] ____________________`,
    attenzione:
      "Un accordo limitato alla custodia della casa e al pagamento delle spese di conservazione rientra di norma negli atti che il chiamato può compiere prima di accettare (art. 460 c.c.). Se invece l'accordo prevede di affittare la casa, incassare canoni, fare lavori di miglioria o metterla in vendita, ciascun firmatario si comporta da erede e il rischio di accettazione tacita è alto: in quel caso decidete prima se accettare, anche con beneficio d'inventario. Per le decisioni della comunione valgono le maggioranze del codice civile: chiedi a un professionista se l'accordo tocca atti importanti.",
    guida: '/casa-ereditata/gestire-la-casa/',
    fonti: [
      FONTE_ART_460,
      FONTE_ART_476,
      {
        title: 'Codice civile, art. 1105: amministrazione della cosa comune (Normattiva)',
        url: `${CC}~art1105`,
      },
      {
        title: "Codice civile, art. 1108: innovazioni e altri atti eccedenti l'ordinaria amministrazione (Normattiva)",
        url: `${CC}~art1108`,
      },
      {
        title: 'Codice civile, art. 1110: rimborso di spese (Normattiva)',
        url: `${CC}~art1110`,
      },
    ],
  },

  // 10
  {
    id: 'comune-tari-casa-non-occupata',
    titolo: 'Dichiarazione al Comune per la TARI della casa ereditata non occupata: cessazione o riduzione',
    categoria: 'Enti e uffici',
    quando:
      "Serve dopo il decesso, quando la casa resta vuota: per intestare la TARI ai nuovi possessori e chiedere la riduzione prevista dal regolamento comunale oppure, se tutte le utenze sono cessate e la casa è svuotata, la cessazione. La dichiarazione va presentata nei termini del regolamento, spesso entro 90 giorni.",
    destinatario: "Ufficio tributi del Comune in cui si trova la casa, o il gestore che riscuote la TARI per conto del Comune",
    invio:
      "Usa prima di tutto il modulo pubblicato dal Comune o dal gestore (sportello online, PEC, email o consegna allo sportello): questa lettera può accompagnarlo o sostituirlo dove il regolamento lo consente. Allega copia del documento d'identità, certificato di morte o autocertificazione e, per la cessazione, le lettere di chiusura delle utenze e le foto della casa vuota.",
    testo: `[Nome e cognome del mittente]
[Indirizzo, CAP, Comune]
[Telefono] - [Email o PEC]

Spett.le Comune di [Comune]
Ufficio Tributi - TARI
[Indirizzo o PEC]

[Luogo], [data]

Oggetto: TARI - immobile in [indirizzo, scala, piano, interno], dati catastali [foglio, particella, subalterno], superficie [mq] - decesso dell'intestatario [nome e cognome del defunto], codice fiscale [codice fiscale del defunto] - dichiarazione di [subentro e richiesta di riduzione / cessazione]

Il/La sottoscritto/a [nome e cognome], nato/a a [luogo di nascita] il [data di nascita], codice fiscale [codice fiscale], in qualità di [chiamato/a all'eredità / comproprietario/a] dell'immobile in oggetto, comunica che l'intestatario della posizione TARI, [nome e cognome del defunto], è deceduto/a il [data del decesso].

Comproprietari dell'immobile: [nomi, cognomi e codici fiscali degli altri possessori, se noti].

Dichiara che dal [data] l'immobile non è occupato da alcuno e non vi è stabilita la residenza di alcuno.

[Scegliere una delle due opzioni]

OPZIONE A - Subentro con richiesta di riduzione
L'immobile resta [arredato / con le seguenti utenze attive: (luce, gas, acqua)] ed è tenuto a disposizione per uso limitato e discontinuo. Chiede l'intestazione della posizione TARI a proprio nome [e degli altri comproprietari] e l'applicazione della riduzione prevista dall'art. [numero dell'articolo] del regolamento comunale TARI per [descrizione della riduzione, es. abitazioni tenute a disposizione per uso limitato e discontinuo], a decorrere dal [data].

OPZIONE B - Cessazione
L'immobile è privo di tutte le utenze attive dal [data] ed è completamente privo di arredi dal [data], come risulta dalla documentazione allegata. Chiede pertanto la cessazione dell'applicazione della TARI a decorrere dal [data], secondo quanto previsto dall'art. [numero dell'articolo] del regolamento comunale.

Chiede infine di ricevere gli avvisi di pagamento al seguente recapito: [indirizzo, email o PEC] e di comunicare se sono dovuti importi relativi al periodo precedente al decesso.

Il/La sottoscritto/a si impegna a comunicare ogni variazione nei termini previsti dal regolamento.

Distinti saluti.

[Firma]
[Nome e cognome]

Allegati:
- copia del documento d'identità;
- certificato di morte o dichiarazione sostitutiva;
- [per la cessazione: lettere di cessazione delle utenze di luce, gas e acqua; foto dei locali vuoti];
- [eventuale modulo comunale compilato].`,
    attenzione:
      "Esclusioni e riduzioni non sono uguali in tutti i Comuni: molti regolamenti considerano tassabile la casa che ha anche una sola utenza attiva oppure è arredata, e concedono l'esclusione solo se mancano entrambe. Leggi il regolamento TARI e la delibera tariffaria del tuo Comune e indica nella lettera gli articoli esatti. Dichiararsi possessore o subentrare come \"erede\" in un modulo comunale può essere letto come comportamento da erede: se non hai ancora deciso, indica la qualità di chiamato all'eredità e chiedi consiglio al notaio. La TARI fino alla data del decesso è un debito dell'eredità.",
    guida: '/casa-ereditata/tasse/tari/',
    fonti: [
      {
        title: 'Legge 147/2013, art. 1, commi 641-668 e 684-697: TARI (Normattiva)',
        url: 'https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:legge:2013-12-27;147',
      },
      FONTE_ART_460,
    ],
  },

  // 11
  {
    id: 'registro-generale-testamenti-certificato',
    titolo: 'Richiesta di certificato al Registro generale dei testamenti',
    categoria: 'Enti e uffici',
    quando:
      "Serve per sapere se il defunto ha lasciato un testamento ricevuto o depositato presso un notaio e dove si trova. Dopo la morte chiunque abbia interesse può chiederlo; prima della morte non si ottiene alcuna informazione. Un testamento olografo mai consegnato a un notaio non risulta nel Registro: cerca anche tra le carte personali.",
    destinatario: 'Ministero della Giustizia - Ufficio centrale degli archivi notarili, Registro generale dei testamenti',
    invio:
      "Solo per via telematica: il modulo ufficiale, scaricabile dalla scheda \"Il Registro generale dei testamenti\" sul sito del Ministero della Giustizia, si invia per email a registrogeneraletestamenti.ucan@giustizia.it o per PEC a registrogeneraletestamenti.ucan@giustiziacert.it, con copia semplice del documento d'identità. La scheda indica anche costi (tassa fissa e marche da bollo), modalità di pagamento e di consegna del certificato: verifica sempre la versione aggiornata prima dell'invio. Usa il modulo ufficiale; questo testo può servire come messaggio di accompagnamento.",
    testo: `Oggetto: richiesta di certificato del Registro generale dei testamenti - [nome e cognome del defunto], nato/a a [luogo di nascita] il [data di nascita], deceduto/a a [luogo del decesso] il [data del decesso]

Spett.le Ministero della Giustizia
Ufficio centrale degli archivi notarili - Registro generale dei testamenti

Il/La sottoscritto/a [nome e cognome], nato/a a [luogo di nascita] il [data di nascita], codice fiscale [codice fiscale], residente in [indirizzo, CAP, Comune], in qualità di [figlio/a, coniuge, altro interesse],

chiede

il rilascio del certificato delle iscrizioni presenti nel Registro generale dei testamenti a nome di:
[nome e cognome del defunto], nato/a a [luogo di nascita] il [data di nascita], codice fiscale [codice fiscale del defunto], deceduto/a a [luogo del decesso] il [data del decesso].

Chiede che il certificato sia rilasciato in formato [elettronico, all'indirizzo email (indirizzo) / cartaceo, spedito con (modalità di spedizione) all'indirizzo (indirizzo)].

Si allegano:
- il modulo di richiesta compilato e sottoscritto;
- copia semplice del documento d'identità del/della richiedente;
- la prova del pagamento di quanto dovuto, secondo le modalità indicate sul sito del Ministero [e le marche da bollo, se richieste in quella forma].

Recapiti per eventuali comunicazioni: [telefono], [email o PEC].

Distinti saluti.

[Luogo], [data]

[Firma]
[Nome e cognome]`,
    attenzione:
      "Il Registro indica solo i testamenti ricevuti o depositati presso notai (e, per l'estero, presso le autorità consolari italiane), non il loro contenuto. Per i testamenti olografi pubblicati di recente il Ministero consiglia di attendere almeno tre mesi dal decesso, perché gli atti più recenti potrebbero non risultare ancora. Chiedere il certificato non comporta accettazione dell'eredità.",
    guida: '/casa-ereditata/testamento-e-legittima/testamento-e-casa/',
    fonti: [
      {
        title: 'Ministero della Giustizia: Il Registro generale dei testamenti (Come fare per)',
        url: 'https://www.giustizia.it/giustizia/it/mg_3_9_11.page',
      },
      {
        title: 'Ministero della Giustizia: Amministrazione degli archivi notarili',
        url: 'https://www.giustizia.it/giustizia/page/it/amministrazione_archivi_notarili',
      },
    ],
  },

  // 12
  {
    id: 'agenzia-entrate-correzione-intestazione-catastale',
    titolo: "Istanza all'Agenzia delle Entrate per correggere l'intestazione catastale dopo la successione",
    categoria: 'Enti e uffici',
    quando:
      "Serve quando, dopo la dichiarazione di successione, la visura catastale mostra un errore nell'intestazione della casa: nomi o codici fiscali sbagliati, quote o diritti non corretti, usufrutto o diritto di abitazione rimasto a nome del defunto. Con l'istanza si chiede all'Ufficio provinciale - Territorio di correggere i dati catastali.",
    destinatario: "Agenzia delle Entrate - Direzione provinciale di [provincia] - Ufficio provinciale - Territorio competente per il luogo in cui si trova l'immobile",
    invio:
      "La via principale è il servizio online \"Istanza rettifica dati catastali\" nell'area riservata del sito dell'Agenzia (SPID, CIE o CNS). In alternativa si usa il Modello 9T - Modello Unico Istanza, presentato allo sportello dell'Ufficio provinciale - Territorio oppure inviato per posta, email o PEC; si può anche usare il cassetto fiscale. Questo testo riprende i contenuti richiesti (generalità, dati dell'immobile, errore riscontrato) e può accompagnare il modello. Allega visura catastale aggiornata, estremi o copia della dichiarazione di successione e della voltura, documento d'identità. Se l'errore è dell'ufficio l'istanza è gratuita e in carta semplice; negli altri casi è dovuta l'imposta di bollo.",
    testo: `[Nome e cognome del richiedente]
[Indirizzo, CAP, Comune]
[Telefono] - [Email o PEC]

Spett.le Agenzia delle Entrate
Direzione provinciale di [provincia] - Ufficio provinciale - Territorio
[Indirizzo o PEC dell'ufficio]

[Luogo], [data]

Oggetto: istanza di correzione dei dati catastali relativi all'intestazione - Comune di [Comune], Catasto [Fabbricati / Terreni], [sezione, se presente], foglio [foglio], particella [particella], subalterno [subalterno]

Il/La sottoscritto/a [nome e cognome], nato/a a [luogo di nascita] il [data di nascita], codice fiscale [codice fiscale], in qualità di [titolare del diritto di (proprietà / altro diritto) per la quota di (quota)] sull'immobile in oggetto, sito in [indirizzo],

premesso che

- l'immobile faceva parte dell'eredità di [nome e cognome del defunto], codice fiscale [codice fiscale del defunto], deceduto/a il [data del decesso];
- la dichiarazione di successione è stata presentata il [data di presentazione], protocollo/riferimento [numero di protocollo o estremi della registrazione], con richiesta di voltura catastale [automatica / presentata separatamente il (data), protocollo (numero)];
- dalla visura catastale aggiornata al [data della visura] l'intestazione risulta la seguente: [riportare l'intestazione attuale, con nomi, codici fiscali, diritti e quote];

segnala

il seguente errore: [descrizione precisa, es. "il codice fiscale di (nome) è indicato come (codice errato) anziché (codice corretto)"; oppure "la quota di (nome) è indicata in (quota errata) anziché (quota corretta)"; oppure "il diritto di usufrutto risulta ancora intestato al defunto, benché estinto con la sua morte"];

chiede

la correzione dell'intestazione catastale come segue: [riportare l'intestazione corretta, con nomi, codici fiscali, diritti e quote], in conformità alla dichiarazione di successione sopra indicata [e al titolo di provenienza (atto notarile del (data), notaio (nome), repertorio (numero))].

Il/La sottoscritto/a ritiene che l'errore sia [imputabile all'ufficio / derivante da un errore nella dichiarazione o nella domanda di voltura]. [Se l'errore non è imputabile all'ufficio: si allega la prova del pagamento dell'imposta di bollo.]

Recapiti per comunicazioni: [telefono], [email o PEC].

Distinti saluti.

[Firma]
[Nome e cognome]

Allegati:
- copia del documento d'identità;
- visura catastale aggiornata;
- copia della ricevuta della dichiarazione di successione e dei quadri relativi all'immobile;
- [copia della domanda di voltura, se presentata separatamente];
- [copia del titolo di provenienza, se utile].`,
    attenzione:
      "Se l'errore sta nella dichiarazione di successione stessa (per esempio un immobile dimenticato o una quota sbagliata), la correzione catastale da sola non basta: va presentata una dichiarazione modificativa, sostitutiva o integrativa, con le possibili imposte e sanzioni, e conviene farsi seguire da chi ha preparato la dichiarazione. Il servizio online \"Contact Center\" per la correzione dei dati catastali non è più disponibile dal 1° gennaio 2026. Nelle province di Trento e Bolzano il catasto è gestito dalle Province autonome. Sul rapporto tra voltura e accettazione dell'eredità la giurisprudenza non è uniforme: se stai valutando la rinuncia, chiedi prima al notaio.",
    guida: '/casa-ereditata/successione/',
    fonti: [
      {
        title: "Agenzia delle Entrate: Correzione dati catastali - Che cos'è",
        url: 'https://www.agenziaentrate.gov.it/portale/schede/fabbricatiterreni/correzione-dati-catastali/scheda-info-correzione-dati-catastali',
      },
      {
        title: 'Agenzia delle Entrate: Correzione dati catastali in ufficio',
        url: 'https://www.agenziaentrate.gov.it/portale/schede/fabbricatiterreni/correzione-dati-catastali/correzione-dati-catastali-uffici-provinciali',
      },
      {
        title: 'Agenzia delle Entrate: Istanza rettifica dati catastali (servizio online)',
        url: 'https://www.agenziaentrate.gov.it/portale/istanza-rettifica-dati-catastali-cittadini',
      },
      {
        title: 'Agenzia delle Entrate: Correzione dati catastali - Modello e istruzioni',
        url: 'https://www.agenziaentrate.gov.it/portale/schede/fabbricatiterreni/correzione-dati-catastali/modello-e-istruzioni',
      },
    ],
  },
];
