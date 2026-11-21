// news-image-20261120: copy the finished front page into the grading folder.
// Node 22, standard library only. No drawing, no randomness — the two
// grading runs must produce byte-identical output, so this just copies.

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const FOLDER = dirname(fileURLToPath(import.meta.url));
const SRC = join(FOLDER, 'entry.png');
const OUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const OUT = join(OUT_DIR, 'entry.png');

if (!existsSync(SRC)) {
  throw new Error('missing entry.png beside main.ts: ' + SRC);
}

const bytes = readFileSync(SRC);

// A real PNG starts with these eight bytes. Anything else is not our picture.
const SIGNATURE = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
const looksPng = SIGNATURE.every((b, i) => bytes[i] === b);
if (!looksPng) {
  throw new Error('entry.png has wrong magic bytes, not a PNG');
}

const LIMIT = 1024 * 1024;
if (bytes.length > LIMIT) {
  throw new Error('entry.png is ' + bytes.length + ' bytes, over the 1 MiB cap');
}

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT, bytes);

// Read it back and compare, so a short or garbled write fails out loud.
const again = readFileSync(OUT);
if (!again.equals(bytes)) {
  throw new Error('read-back differs from entry.png, copy failed');
}

console.log('wrote ' + OUT + ' (' + again.length + ' bytes)');
