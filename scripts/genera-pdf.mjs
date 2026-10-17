// Genera i PDF delle guide in public/pdf/ a partire dal sito compilato.
// Uso: npm run build && npm run pdf   (richiede Chromium: CHROME_PATH o il browser di Playwright)
import { spawn } from 'node:child_process';
import { mkdir } from 'node:fs/promises';
import { chromium } from 'playwright';

const PORT = 4329;
const BASE = `http://localhost:${PORT}`;
const OUT = new URL('../public/pdf/', import.meta.url);

const server = spawn('npx', ['astro', 'preview', '--port', String(PORT)], { stdio: 'ignore' });
// Astro 7 lascia il server in background: va fermato con il suo comando
const stop = () => {
  server.kill();
  spawn('npx', ['astro', 'preview', 'stop'], { stdio: 'ignore' });
};

async function waitForServer() {
  for (let i = 0; i < 60; i++) {
    try {
      const res = await fetch(`${BASE}/pdf-manifest.json`);
      if (res.ok) return res.json();
    } catch {}
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error('Il server di anteprima non risponde');
}

try {
  const items = await waitForServer();
  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {});
  const page = await browser.newPage();
  for (const item of items) {
    await page.goto(BASE + item.url, { waitUntil: 'networkidle' });
    await page.emulateMedia({ media: 'print' });
    await page.pdf({
      path: new URL(item.file, OUT).pathname,
      format: 'A4',
      printBackground: true,
      margin: { top: '18mm', bottom: '20mm', left: '16mm', right: '16mm' },
      displayHeaderFooter: true,
      headerTemplate: '<span></span>',
      footerTemplate:
        '<div style="width:100%;font-size:8px;color:#5e5d59;padding:0 16mm;display:flex;justify-content:space-between;font-family:sans-serif"><span>EreditareCasa.it · informazioni generali, non consulenza</span><span><span class="pageNumber"></span> / <span class="totalPages"></span></span></div>',
    });
    console.log('PDF', item.file);
  }
  await browser.close();
} finally {
  stop();
}
