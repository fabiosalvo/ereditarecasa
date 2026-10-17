// Invio delle email transazionali (recupero password) tramite l'API di Brevo.
export async function sendMail(to: string, subject: string, text: string): Promise<boolean> {
  const key = process.env.BREVO_API_KEY;
  const from = process.env.MAIL_FROM || 'noreply@ereditarecasa.it';
  if (!key) {
    console.warn('[mail] BREVO_API_KEY non configurata: email non inviata a', to);
    return false;
  }
  const res = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: { 'api-key': key, 'Content-Type': 'application/json', accept: 'application/json' },
    body: JSON.stringify({ sender: { email: from, name: 'EreditareCasa' }, to: [{ email: to }], subject, textContent: text }),
  });
  if (!res.ok) console.warn('[mail] invio non riuscito', res.status, await res.text());
  return res.ok;
}
