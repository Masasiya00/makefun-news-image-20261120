// news-image-20261120, v3 — Node 22, standard library only.
//
// The entry image is entry.png beside this file. The program's whole job
// is to place an exact copy of it at /output/entry.png (or at
// $MAKEFUN_OUTPUT_DIR/entry.png when that variable is set, which is how
// the kit lets you try it outside the grader). Nothing is drawn at run
// time and nothing is fetched: the same bytes go out on every run.
//
// Try it locally with:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync } from 'node:fs';
import { join } from 'node:path';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
copyFileSync(new URL('./entry.png', import.meta.url), join(outDir, 'entry.png'));
