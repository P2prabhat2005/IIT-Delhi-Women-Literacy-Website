import fs from 'fs';
import path from 'path';
import { createCanvas } from '@napi-rs/canvas';
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';

const pdfDir = path.resolve('public/case-studies');
const outDir = path.resolve('src/assets/images/case-studies');
fs.mkdirSync(outDir, { recursive: true });

const files = [
  { slug: 'lalita-devi', pdf: 'lalita-devi.pdf' },
  { slug: 'manisha', pdf: 'manisha.pdf' },
  { slug: 'pooja', pdf: 'pooja.pdf' },
  { slug: 'shabnam', pdf: 'shabnam.pdf' },
  { slug: 'suman', pdf: 'suman.pdf' },
];

async function renderPage(pdfPath, pageNumber, outPath, scale = 2) {
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await getDocument({ data, disableWorker: true, useSystemFonts: true }).promise;
  const page = await doc.getPage(pageNumber);
  const viewport = page.getViewport({ scale });
  const canvas = createCanvas(Math.ceil(viewport.width), Math.ceil(viewport.height));
  const context = canvas.getContext('2d');
  await page.render({ canvasContext: context, viewport }).promise;
  fs.writeFileSync(outPath, canvas.toBuffer('image/jpeg', 90));
  console.log('wrote', path.basename(outPath), Math.round(viewport.width), 'x', Math.round(viewport.height));
}

for (const { slug, pdf } of files) {
  const pdfPath = path.join(pdfDir, pdf);
  // Page 1 usually has the portrait + title for these case studies
  await renderPage(pdfPath, 1, path.join(outDir, `${slug}-page1.jpg`), 2);
  // Also render page 2 as optional supporting visual
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await getDocument({ data, disableWorker: true, useSystemFonts: true }).promise;
  if (doc.numPages >= 2) {
    await renderPage(pdfPath, 2, path.join(outDir, `${slug}-page2.jpg`), 1.5);
  }
}
