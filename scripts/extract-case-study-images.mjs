/**
 * Extract embedded JPEG/PNG streams from case-study PDFs (no canvas needed).
 * Selects the largest reasonable images per PDF as cover candidates.
 */
import fs from 'fs';
import path from 'path';

const outDir = path.resolve('src/assets/images/case-studies');
const pdfDir = path.resolve('public/case-studies');

const pdfs = [
  { slug: 'lalita-devi', file: 'lalita-devi.pdf' },
  { slug: 'manisha', file: 'manisha.pdf' },
  { slug: 'pooja', file: 'pooja.pdf' },
  { slug: 'shabnam', file: 'shabnam.pdf' },
  { slug: 'suman', file: 'suman.pdf' },
];

function extractJpeg(buffer) {
  const images = [];
  for (let i = 0; i < buffer.length - 1; i += 1) {
    if (buffer[i] === 0xff && buffer[i + 1] === 0xd8) {
      for (let j = i + 2; j < buffer.length - 1; j += 1) {
        if (buffer[j] === 0xff && buffer[j + 1] === 0xd9) {
          const slice = buffer.subarray(i, j + 2);
          if (slice.length > 8_000) {
            images.push(slice);
          }
          i = j + 1;
          break;
        }
      }
    }
  }
  return images;
}

function extractPng(buffer) {
  const images = [];
  const sig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  let start = 0;
  while (start < buffer.length) {
    const idx = buffer.indexOf(sig, start);
    if (idx === -1) break;
    // Find IEND chunk
    let pos = idx + 8;
    let end = -1;
    while (pos + 8 < buffer.length) {
      const length = buffer.readUInt32BE(pos);
      const type = buffer.toString('ascii', pos + 4, pos + 8);
      pos += 12 + length; // length + type + data + crc
      if (type === 'IEND') {
        end = pos;
        break;
      }
    }
    if (end > idx) {
      const slice = buffer.subarray(idx, end);
      if (slice.length > 8_000) images.push(slice);
      start = end;
    } else {
      start = idx + 8;
    }
  }
  return images;
}

fs.mkdirSync(outDir, { recursive: true });

for (const { slug, file } of pdfs) {
  const buffer = fs.readFileSync(path.join(pdfDir, file));
  const jpegs = extractJpeg(buffer)
    .map((data, index) => ({ data, index, ext: 'jpg', size: data.length }))
    .sort((a, b) => b.size - a.size);
  const pngs = extractPng(buffer)
    .map((data, index) => ({ data, index, ext: 'png', size: data.length }))
    .sort((a, b) => b.size - a.size);

  const candidates = [...jpegs, ...pngs].sort((a, b) => b.size - a.size);
  console.log(`\n${slug}: found ${candidates.length} embedded images`);
  candidates.slice(0, 5).forEach((img, i) => {
    console.log(`  #${i + 1} ${img.ext} ${(img.size / 1024).toFixed(1)} KB`);
  });

  if (!candidates.length) {
    console.warn(`  No images extracted for ${slug}`);
    continue;
  }

  // Keep top 2 distinct-size images as portrait + supporting options
  const chosen = candidates.slice(0, 2);
  chosen.forEach((img, i) => {
    const name = i === 0 ? `${slug}-cover.${img.ext}` : `${slug}-detail.${img.ext}`;
    fs.writeFileSync(path.join(outDir, name), img.data);
    console.log(`  wrote ${name}`);
  });
}
