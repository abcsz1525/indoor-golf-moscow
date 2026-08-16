import { readFile, writeFile } from 'node:fs/promises';

const [sourcePath, outputPath = sourcePath] = process.argv.slice(2);

if (!sourcePath) {
  throw new Error('Usage: node scripts/remove-ymel-from-restored-home.mjs <source> [output]');
}

const source = await readFile(sourcePath, 'utf8');
const startMarker = '(0,Q.jsxs)(y.a,{href:`https://golfstore.by/`';
const endMarker = ']})]})})}var Ye=';
const start = source.indexOf(startMarker);
const end = source.indexOf(endMarker, start);

if (start === -1 || end === -1) {
  throw new Error('YMEL home partner block was not found in the restored bundle');
}

// The first `]})` in endMarker closes the YMEL card itself. Keeping it leaves
// one extra closing token in the minified bundle and breaks the homepage.
const patched = `${source.slice(0, start)}${source.slice(end + 3)}`;

if (patched.includes('Открыть сайт YMEL Group')) {
  throw new Error('YMEL home partner marker remains after patching');
}

await writeFile(outputPath, patched);
