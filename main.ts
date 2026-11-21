// news-image-20261120 entry (Node 22, standard library only).
// The image beside this file, entry.png, sums up the world's news of
// Friday 20 November 2026. This program copies it to /output/entry.png.
// It runs with no network and writes the same bytes on every run.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const src = new URL('./entry.png', import.meta.url);
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const dest = join(outDir, 'entry.png');

if (!existsSync(src)) {
  throw new Error('entry.png is missing next to main.ts');
}
const bytes = readFileSync(src);
if (bytes.length === 0 || bytes.length > 1048576) {
  throw new Error(`entry.png has an unexpected size: ${bytes.length} bytes`);
}
// PNG magic bytes: 89 50 4E 47 0D 0A 1A 0A. Refuse anything that is not a PNG.
const pngMagic = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
if (!bytes.subarray(0, 8).equals(pngMagic)) {
  throw new Error('entry.png is not a PNG file (bad magic bytes)');
}
mkdirSync(outDir, { recursive: true });
writeFileSync(dest, bytes);
// Verify the copy: the file we wrote must match the source byte for byte.
const written = readFileSync(dest);
if (!written.equals(bytes)) {
  throw new Error('the copied entry.png does not match the source');
}
console.log(`wrote ${dest} (${bytes.length} bytes)`);
