import { copyFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const source = process.argv[2];
if (!source) {
  throw new Error('Uso: node scripts/extract-logo.mjs <ruta-del-logo>');
}

const outDir = join(root, 'public', 'brand');
const assetsDir = join(root, 'src', 'assets');
mkdirSync(outDir, { recursive: true });
mkdirSync(assetsDir, { recursive: true });
copyFileSync(source, join(assetsDir, 'logo-source.jpg'));

const { data, info } = await sharp(source).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width, height } = info;
const pixels = new Uint8Array(data);

const cream = [254, 251, 246];
const dist = (r, g, b) => Math.hypot(r - cream[0], g - cream[1], b - cream[2]);

const visited = new Uint8Array(width * height);
const queue = [];
const push = (x, y) => {
  const idx = y * width + x;
  if (visited[idx]) return;
  const i = idx * 4;
  if (dist(pixels[i], pixels[i + 1], pixels[i + 2]) > 42) return;
  visited[idx] = 1;
  queue.push(idx);
};

for (let x = 0; x < width; x++) {
  push(x, 0);
  push(x, height - 1);
}
for (let y = 0; y < height; y++) {
  push(0, y);
  push(width - 1, y);
}

while (queue.length) {
  const idx = queue.pop();
  const x = idx % width;
  const y = (idx - x) / width;
  const i = idx * 4;
  const d = dist(pixels[i], pixels[i + 1], pixels[i + 2]);
  const alpha = d < 18 ? 0 : Math.max(0, Math.min(255, Math.round(((d - 18) / 24) * 255)));
  pixels[i + 3] = alpha;
  if (alpha > 0) {
    const t = 1 - alpha / 255;
    pixels[i] = Math.max(0, Math.min(255, Math.round((pixels[i] - cream[0] * t) / (alpha / 255))));
    pixels[i + 1] = Math.max(0, Math.min(255, Math.round((pixels[i + 1] - cream[1] * t) / (alpha / 255))));
    pixels[i + 2] = Math.max(0, Math.min(255, Math.round((pixels[i + 2] - cream[2] * t) / (alpha / 255))));
  }
  if (x > 0) push(x - 1, y);
  if (x + 1 < width) push(x + 1, y);
  if (y > 0) push(x, y - 1);
  if (y + 1 < height) push(x, y + 1);
}

for (let i = 0; i < pixels.length; i += 4) {
  const d = dist(pixels[i], pixels[i + 1], pixels[i + 2]);
  if (d >= 36) continue;
  const alpha = d < 16 ? 0 : Math.max(0, Math.min(255, Math.round(((d - 16) / 20) * 255)));
  pixels[i + 3] = Math.min(pixels[i + 3], alpha);
}

let minX = width;
let minY = height;
let maxX = 0;
let maxY = 0;
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    if (pixels[(y * width + x) * 4 + 3] < 16) continue;
    if (x < minX) minX = x;
    if (y < minY) minY = y;
    if (x > maxX) maxX = x;
    if (y > maxY) maxY = y;
  }
}

const pad = 8;
minX = Math.max(0, minX - pad);
minY = Math.max(0, minY - pad);
maxX = Math.min(width - 1, maxX + pad);
maxY = Math.min(height - 1, maxY + pad);
const cropW = maxX - minX + 1;
const cropH = maxY - minY + 1;
const cropped = Buffer.alloc(cropW * cropH * 4);

for (let y = 0; y < cropH; y++) {
  cropped.set(
    pixels.subarray(((minY + y) * width + minX) * 4, ((minY + y) * width + minX + cropW) * 4),
    y * cropW * 4,
  );
}

const colFill = new Array(cropW).fill(0);
for (let x = 0; x < cropW; x++) {
  let count = 0;
  for (let y = 0; y < cropH; y++) {
    if (cropped[(y * cropW + x) * 4 + 3] > 40) count += 1;
  }
  colFill[x] = count;
}

let inMark = false;
let markEnd = cropW;
let gapStart = -1;
for (let x = 0; x < cropW; x++) {
  if (colFill[x] > 4) {
    inMark = true;
    if (gapStart >= 0 && x - gapStart > 18) {
      markEnd = gapStart;
      break;
    }
    gapStart = -1;
  } else if (inMark && gapStart < 0) {
    gapStart = x;
  }
}

const dark = Buffer.from(cropped);
for (let i = 0; i < dark.length; i += 4) {
  const r = dark[i];
  const g = dark[i + 1];
  const b = dark[i + 2];
  const a = dark[i + 3];
  if (a < 8) continue;
  const isTeal = g > 140 && g > r + 60 && b > 90;
  if (isTeal) continue;
  const lum = 0.299 * r + 0.587 * g + 0.114 * b;
  if (lum < 90) {
    dark[i] = 255;
    dark[i + 1] = 255;
    dark[i + 2] = 255;
  }
}

const markW = Math.max(24, markEnd);
const mark = Buffer.alloc(markW * cropH * 4);
for (let y = 0; y < cropH; y++) {
  mark.set(cropped.subarray((y * cropW) * 4, (y * cropW + markW) * 4), y * markW * 4);
}

await sharp(cropped, { raw: { width: cropW, height: cropH, channels: 4 } })
  .png()
  .toFile(join(outDir, 'logo.png'));

await sharp(dark, { raw: { width: cropW, height: cropH, channels: 4 } })
  .png()
  .toFile(join(outDir, 'logo-on-dark.png'));

await sharp(mark, { raw: { width: markW, height: cropH, channels: 4 } })
  .trim()
  .png()
  .toFile(join(outDir, 'mark.png'));

const markPng = join(outDir, 'mark.png');
await sharp(markPng).resize(180, 180, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toFile(join(root, 'public', 'apple-touch-icon.png'));
await sharp(markPng).resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toFile(join(root, 'public', 'icon-512.png'));
await sharp(markPng).resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toFile(join(root, 'public', 'favicon-32.png'));

console.log({ cropW, cropH, markW, markEnd });
