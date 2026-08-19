import { copyFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = join(root, 'public');
const assetsDir = join(root, 'src', 'assets');

mkdirSync(join(publicDir, 'fonts'), { recursive: true });
mkdirSync(join(publicDir, 'images'), { recursive: true });
mkdirSync(join(publicDir, 'brand'), { recursive: true });

const fontCandidates = [
  join(root, 'node_modules/@fontsource-variable/plus-jakarta-sans/files/plus-jakarta-sans-latin-wght-normal.woff2'),
  join(root, 'node_modules/@fontsource-variable/plus-jakarta-sans/files/plus-jakarta-sans-latin-standard-normal.woff2'),
];

const fontSource = fontCandidates.find((file) => {
  try {
    copyFileSync(file, join(publicDir, 'fonts/plus-jakarta-sans.woff2'));
    return true;
  } catch {
    return false;
  }
});

if (!fontSource) {
  throw new Error('No se encontró la fuente Plus Jakarta Sans. Ejecuta npm install.');
}

const originals = ['hero-connections.png', 'process-flow.png', 'case-study-abstract.png'];

for (const name of originals) {
  const input = join(assetsDir, name);
  const base = name.replace(/\.png$/, '');
  await sharp(input).webp({ quality: 78 }).toFile(join(publicDir, 'images', `${base}.webp`));
  await sharp(input).avif({ quality: 55 }).toFile(join(publicDir, 'images', `${base}.avif`));
}

await sharp(join(assetsDir, 'hero-connections.png'))
  .resize(1200, 630, { fit: 'cover', position: 'centre' })
  .webp({ quality: 80 })
  .toFile(join(publicDir, 'og.webp'));

const iconSvg = join(publicDir, 'favicon.svg');
await sharp(iconSvg).resize(180, 180).png().toFile(join(publicDir, 'apple-touch-icon.png'));
await sharp(iconSvg).resize(512, 512).png().toFile(join(publicDir, 'icon-512.png'));
await sharp(iconSvg).resize(32, 32).png().toFile(join(publicDir, 'favicon-32.png'));

console.log('Recursos visuales generados en public/');
