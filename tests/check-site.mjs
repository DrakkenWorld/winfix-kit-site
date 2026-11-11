import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
for (const page of ['index.html', 'fr/index.html']) {
const html = readFileSync(resolve(root, page), 'utf8');
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
assert.equal(ids.length, new Set(ids).size, 'Unique fragment IDs');
for (const [, url] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
  if (url.startsWith('#')) { assert(ids.includes(url.slice(1)), `Fragment ${url}`); continue; }
  if (/^https:\/\//.test(url)) { new URL(url); assert(!/placeholder|YOUR_USERNAME/.test(url)); continue; }
  assert(!url.startsWith('/'), `Project Pages requires relative asset URL: ${url}`);
  const path = resolve(dirname(resolve(root, page)), url.split(/[?#]/)[0]);
  assert(path === root || path.startsWith(root + sep), 'Local target stays in site');
  assert(existsSync(path), `Local target exists: ${url}`);
}
assert(html.includes('releases/latest'), 'Stable release download');
assert(html.includes('winfix-system-health-report/releases/download/v1.0.0/WinFix-SystemHealthReport-v1.0.0.zip'), 'System Health Report ZIP');
assert(html.includes(page.startsWith('fr/') ? 'Start-FR.cmd' : 'Start-EN.cmd'), 'Localized launcher');
assert(!html.includes('Starter release'), 'No obsolete release badge');
assert(html.includes('name="viewport"'), 'Responsive viewport');
assert(html.includes('rel="canonical"'), 'Canonical Pages URL');
assert.equal([...html.matchAll(/href="https:\/\/buymeacoffee.com\/drakken"/g)].length, 1, 'One voluntary support link per page');
assert(html.indexOf('buymeacoffee.com') < html.indexOf('class="hero"'), 'Support is visible above the hero');
assert(!/<script[^>]+src="https?:\/\//.test(html), 'No third-party donation widget');
assert(html.includes('hreflang="en"') && html.includes('hreflang="fr"'), 'Both language alternatives');
if (page.startsWith('fr/')) {
  assert(html.includes('<html lang="fr">'));
  assert(html.includes('Aucune obligation') && html.includes('M’offrir un café'));
  assert(html.includes('-Language fr</code>'));
  assert(!html.includes('Coming later') && !html.includes('Download stable release'));
} else {
  assert(html.includes('<html lang="en">'));
  assert(html.includes('No obligation') && html.includes('Buy me a coffee'));
}
}
assert(existsSync(resolve(root, '.nojekyll')));
assert(readFileSync(resolve(root, 'LICENSE'), 'utf8').includes('IN NO EVENT SHALL'));
console.log('PASS: both languages, assets, fragments, release links, voluntary support, metadata and license');
