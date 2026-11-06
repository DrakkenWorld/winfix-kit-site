import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const html = readFileSync(resolve(root, 'index.html'), 'utf8');
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
assert.equal(ids.length, new Set(ids).size, 'Unique fragment IDs');
for (const [, url] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
  if (url.startsWith('#')) { assert(ids.includes(url.slice(1)), `Fragment ${url}`); continue; }
  if (/^https:\/\//.test(url)) { new URL(url); assert(!/placeholder|YOUR_USERNAME/.test(url)); continue; }
  assert(!url.startsWith('/'), `Project Pages requires relative asset URL: ${url}`);
  const path = resolve(root, url.split(/[?#]/)[0]);
  assert(path === root || path.startsWith(root + sep), 'Local target stays in site');
  assert(existsSync(path), `Local target exists: ${url}`);
}
assert(html.includes('releases/latest'), 'Stable release download');
assert(!html.includes('Starter release'), 'No obsolete release badge');
assert(html.includes('name="viewport"'), 'Responsive viewport');
assert(html.includes('rel="canonical"'), 'Canonical Pages URL');
assert(existsSync(resolve(root, '.nojekyll')));
assert(readFileSync(resolve(root, 'LICENSE'), 'utf8').includes('IN NO EVENT SHALL'));
console.log('PASS: local asset paths, fragments, release link, metadata and license');
