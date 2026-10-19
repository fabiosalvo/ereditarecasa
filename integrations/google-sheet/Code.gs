/**
 * Riceve i lead di EreditareCasa.it e li scrive nel Google Sheet a cui è collegato lo script.
 * Un foglio per tipo di lead (valutazione, scadenzario, professionista), creato al primo invio.
 * Per le valutazioni invia anche un'email di avviso, per richiamare entro 2 ore.
 */

// Indirizzi che ricevono l'avviso a ogni nuova richiesta di valutazione (separati da virgola)
const NOTIFY_EMAIL = 'fabio@gromia.com';

// Client ID OAuth di Google usato dal pulsante "Registrati con Google" (lo stesso di PUBLIC_GOOGLE_CLIENT_ID)
const GOOGLE_CLIENT_ID = '';

const COLUMNS = {
  valutazione: [
    'ricevuto', 'nome', 'cognome', 'telefono', 'email', 'comune', 'indirizzo', 'civico', 'tipologia', 'mq', 'occupazione',
    'successione', 'eredi', 'accordo', 'obiettivo', 'tempi', 'note', 'priorita',
    'consenso_privacy', 'consenso_marketing', 'versione_consensi', 'pagina', 'referrer', 'utm', 'stato',
  ],
  scadenzario: [
    'ricevuto', 'email', 'decesso', 'consenso_privacy', 'consenso_marketing', 'versione_consensi',
    'pagina', 'referrer', 'utm',
  ],
  professionista: [
    'ricevuto', 'nome', 'cognome', 'email', 'telefono', 'comune', 'professione', 'professionista', 'messaggio',
    'consenso_privacy', 'consenso_marketing', 'versione_consensi', 'pagina', 'referrer', 'utm',
  ],
  percorso: [
    'ricevuto', 'email', 'decesso', 'rapporto', 'testamento', 'eredi', 'possesso', 'debiti', 'mutuo', 'obiettivo',
    'consenso_privacy', 'consenso_marketing', 'versione_consensi', 'pagina', 'referrer', 'utm',
  ],
  registrazione: [
    'ricevuto', 'email', 'nome', 'cognome', 'metodo', 'verificato', 'guida', 'consenso_privacy', 'consenso_marketing',
    'versione_consensi', 'pagina', 'referrer', 'utm',
  ],
  guida: [
    'ricevuto', 'nome', 'cognome', 'email', 'telefono', 'comune', 'intenzione', 'guida', 'consenso_privacy', 'consenso_marketing', 'versione_consensi',
    'pagina', 'referrer', 'utm',
  ],
};

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const type = data.type;
    if (!COLUMNS[type]) return reply({ ok: false, error: 'Tipo non valido' });

    const f = data.fields || {};
    // Registrazione con Google: l'email vale solo se il token è verificato da Google
    if (type === 'registrazione') {
      f.verificato = 'no';
      if (f.metodo === 'google' && f.google_token) {
        const g = verifyGoogle(f.google_token);
        if (g) { f.email = g.email; f.nome = g.given_name || g.name || f.nome; f.cognome = g.family_name || f.cognome; f.verificato = 'sì'; }
      }
      delete f.google_token;
    }
    const c = data.consent || {};
    const s = data.source || {};
    const row = Object.assign({}, f, {
      ricevuto: new Date(),
      consenso_privacy: c.privacy || '',
      consenso_marketing: c.marketing || '',
      versione_consensi: c.version || '',
      pagina: s.page || '',
      referrer: s.referrer || '',
      utm: s.utm ? JSON.stringify(s.utm) : '',
      priorita: type === 'valutazione' ? priority(f) : '',
      stato: 'Nuovo',
    });

    const sheet = getSheet(type);
    sheet.appendRow(COLUMNS[type].map((col) => clean(row[col])));

    if (type === 'valutazione' && NOTIFY_EMAIL) notify(row);
    return reply({ ok: true });
  } catch (err) {
    return reply({ ok: false, error: String(err) });
  }
}

// Stessa logica del blueprint: caldo se vuole vendere a breve, tiepido se c'è una successione o un conflitto in corso.
function priority(f) {
  const vende = f.obiettivo === 'Vendere' || f.obiettivo === 'Liquidare gli altri eredi';
  if (vende && (f.tempi === 'Entro 3 mesi' || f.tempi === 'Entro 6 mesi')) return 'Caldo';
  if (f.successione === 'In corso' || f.accordo === 'No' || vende) return 'Tiepido';
  return 'Freddo';
}

function notify(row) {
  const subject = `[EreditareCasa] ${row.priorita}: ${[row.nome, row.cognome].filter(Boolean).join(' ') || 'nuova valutazione'} – ${row.comune || ''}`;
  const body = [
    `Priorità: ${row.priorita}`,
    `Nome: ${row.nome} ${row.cognome || ''}`,
    `Telefono: ${row.telefono}`,
    `Email: ${row.email}`,
    `Immobile: ${row.tipologia}, ${row.mq} m², ${row.indirizzo || row.comune} ${row.civico || ''}`,
    `Stato: ${row.occupazione}`,
    `Successione: ${row.successione} · Eredi: ${row.eredi} · Accordo: ${row.accordo}`,
    `Obiettivo: ${row.obiettivo} · Tempi: ${row.tempi}`,
    `Note: ${row.note || '-'}`,
  ].join('\n');
  MailApp.sendEmail(NOTIFY_EMAIL, subject, body);
}

function getSheet(type) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(type);
  if (!sheet) {
    sheet = ss.insertSheet(type);
    sheet.appendRow(COLUMNS[type]);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

// Evita che un valore inviato dal form venga interpretato come formula dal foglio
function clean(v) {
  if (v === undefined || v === null) return '';
  if (typeof v === 'boolean') return v ? 'Sì' : 'No';
  if (v instanceof Date) return v;
  const s = String(v).slice(0, 2000);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function reply(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

// Verifica il token di "Accedi con Google" presso Google e ne restituisce i dati, oppure null.
function verifyGoogle(token) {
  try {
    const res = UrlFetchApp.fetch('https://oauth2.googleapis.com/tokeninfo?id_token=' + encodeURIComponent(token), { muteHttpExceptions: true });
    if (res.getResponseCode() !== 200) return null;
    const t = JSON.parse(res.getContentText());
    if (GOOGLE_CLIENT_ID && t.aud !== GOOGLE_CLIENT_ID) return null;
    if (t.email_verified !== 'true' && t.email_verified !== true) return null;
    return t;
  } catch (err) {
    return null;
  }
}
