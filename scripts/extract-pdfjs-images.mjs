import fs from 'fs';
import path from 'path';
import { createCanvas } from '@napi-rs/canvas';
import { getDocument, OPS } from 'pdfjs-dist/legacy/build/pdf.mjs';

const pdfDir = path.resolve('public/case-studies');
const outDir = path.resolve('src/assets/images/case-studies/_pdfjs');
fs.mkdirSync(outDir, { recursive: true });

const files = [
  { slug: 'shabnam', pdf: 'shabnam.pdf' },
  { slug: 'suman', pdf: 'suman.pdf' },
  { slug: 'lalita-devi', pdf: 'lalita-devi.pdf' },
];

function saveImage(fileName, img) {
  const width = img.width;
  const height = img.height;
  const src = img.data;
  if (!width || !height || !src) return false;

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  const imageData = ctx.createImageData(width, height);
  const dest = imageData.data;
  const channels = Math.round(src.length / (width * height));

  if (channels === 4) {
    dest.set(src);
  } else if (channels === 3) {
    for (let i = 0, j = 0; i < src.length; i += 3, j += 4) {
      dest[j] = src[i];
      dest[j + 1] = src[i + 1];
      dest[j + 2] = src[i + 2];
      dest[j + 3] = 255;
    }
  } else if (channels === 1) {
    for (let i = 0, j = 0; i < src.length; i += 1, j += 4) {
      dest[j] = dest[j + 1] = dest[j + 2] = src[i];
      dest[j + 3] = 255;
    }
  } else {
    console.log(' unsupported channels', channels, fileName, src.length, width, height);
    return false;
  }

  ctx.putImageData(imageData, 0, 0);
  fs.writeFileSync(path.join(outDir, fileName), canvas.toBuffer('image/jpeg', 92));
  console.log(' wrote', fileName, `${width}x${height}`, `ch=${channels}`);
  return true;
}

async function getObj(container, name) {
  return new Promise((resolve) => {
    try {
      container.get(name, (data) => resolve(data));
    } catch {
      resolve(null);
    }
  });
}

for (const { slug, pdf } of files) {
  console.log('\n===', slug, '===');
  const data = new Uint8Array(fs.readFileSync(path.join(pdfDir, pdf)));
  const doc = await getDocument({ data, disableWorker: true, useSystemFonts: true }).promise;
  let n = 0;

  for (let p = 1; p <= Math.min(doc.numPages, 3); p += 1) {
    const page = await doc.getPage(p);
    const ops = await page.getOperatorList();
    const imageNames = [];

    for (let i = 0; i < ops.fnArray.length; i += 1) {
      const fn = ops.fnArray[i];
      if (fn === OPS.paintImageXObject || fn === OPS.paintInlineImageXObject || fn === OPS.paintImageXObjectRepeat) {
        const args = ops.argsArray[i];
        if (args?.[0]) imageNames.push(String(args[0]));
      }
    }

    console.log(' page', p, 'image ops', imageNames.length, imageNames.slice(0, 8));

    for (const name of [...new Set(imageNames)]) {
      let img = await getObj(page.objs, name);
      if (!img?.data) img = await getObj(page.commonObjs, name);
      if (img?.data) {
        n += 1;
        saveImage(`${slug}-p${p}-${n}-${name}.jpg`, img);
      } else {
        console.log('  missing obj', name, img);
      }
    }
  }
  console.log('total saved', n);
}
