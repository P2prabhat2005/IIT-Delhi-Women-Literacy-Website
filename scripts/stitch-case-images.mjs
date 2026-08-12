import fs from 'fs';
import path from 'path';
import { createCanvas, loadImage } from '@napi-rs/canvas';
import { getDocument, OPS } from 'pdfjs-dist/legacy/build/pdf.mjs';

const outDir = path.resolve('src/assets/images/case-studies');
fs.mkdirSync(outDir, { recursive: true });

async function getObj(container, name) {
  return new Promise((resolve) => {
    try {
      container.get(name, (data) => resolve(data || null));
    } catch {
      resolve(null);
    }
  });
}

function toCanvas(img) {
  const { width, height, data } = img;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  const imageData = ctx.createImageData(width, height);
  const dest = imageData.data;
  const channels = Math.round(data.length / (width * height));
  if (channels === 4) dest.set(data);
  else if (channels === 3) {
    for (let i = 0, j = 0; i < data.length; i += 3, j += 4) {
      dest[j] = data[i];
      dest[j + 1] = data[i + 1];
      dest[j + 2] = data[i + 2];
      dest[j + 3] = 255;
    }
  } else return null;
  ctx.putImageData(imageData, 0, 0);
  return canvas;
}

async function extractLargestPhotos(slug, pdfFile, minArea = 80_000) {
  const data = new Uint8Array(fs.readFileSync(path.resolve('public/case-studies', pdfFile)));
  const doc = await getDocument({ data, disableWorker: true, useSystemFonts: true }).promise;
  const photos = [];

  for (let p = 1; p <= doc.numPages; p += 1) {
    const page = await doc.getPage(p);
    const ops = await page.getOperatorList();
    const names = [];
    for (let i = 0; i < ops.fnArray.length; i += 1) {
      if (ops.fnArray[i] === OPS.paintImageXObject || ops.fnArray[i] === OPS.paintInlineImageXObject) {
        names.push(String(ops.argsArray[i][0]));
      }
    }

    // Group consecutive near-full-width thin strips into stitched photos
    const strips = [];
    for (const name of names) {
      let img = await getObj(page.objs, name);
      if (!img?.data) img = await getObj(page.commonObjs, name);
      if (!img?.data) continue;
      strips.push({ name, img, w: img.width, h: img.height });
    }

    let i = 0;
    while (i < strips.length) {
      const start = strips[i];
      // Single large photo
      if (start.w * start.h >= minArea && start.h > 120) {
        const canvas = toCanvas(start.img);
        if (canvas) photos.push({ page: p, canvas, area: start.w * start.h });
        i += 1;
        continue;
      }

      // Stitch consecutive similar-width thin strips
      if (start.w >= 500 && start.h <= 120) {
        const group = [start];
        let j = i + 1;
        while (j < strips.length && strips[j].w >= start.w - 80 && strips[j].h <= 120) {
          group.push(strips[j]);
          j += 1;
        }
        if (group.length >= 4) {
          const width = Math.max(...group.map((g) => g.w));
          const height = group.reduce((sum, g) => sum + g.h, 0);
          if (width * height >= minArea) {
            const canvas = createCanvas(width, height);
            const ctx = canvas.getContext('2d');
            let y = 0;
            for (const g of group) {
              const piece = toCanvas(g.img);
              if (piece) ctx.drawImage(piece, 0, y);
              y += g.h;
            }
            photos.push({ page: p, canvas, area: width * height });
          }
        }
        i = Math.max(j, i + 1);
        continue;
      }
      i += 1;
    }
  }

  photos.sort((a, b) => b.area - a.area);
  return photos;
}

const targets = [
  { slug: 'shabnam', pdf: 'shabnam.pdf' },
  { slug: 'suman', pdf: 'suman.pdf' },
];

for (const { slug, pdf } of targets) {
  console.log('\n', slug);
  const photos = await extractLargestPhotos(slug, pdf);
  console.log(' photos found', photos.length);
  photos.slice(0, 3).forEach((photo, index) => {
    const name = index === 0 ? `${slug}-cover.jpg` : `${slug}-detail-${index}.jpg`;
    fs.writeFileSync(path.join(outDir, name), photo.canvas.toBuffer('image/jpeg', 92));
    console.log(' wrote', name, photo.canvas.width, 'x', photo.canvas.height);
  });
}
