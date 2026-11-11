import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const pages = [
  'index.html', 'fr/index.html',
  'disk-space-analyzer/index.html', 'fr/analyseur-disque/index.html',
  'system-health-report/index.html', 'fr/rapport-sante/index.html',
];
const site = 'https://drakkenworld.github.io/winfix-kit-site/';
const sitemap = readFileSync(resolve(root, 'sitemap.xml'), 'utf8');

for (const page of pages) {
  const html = readFileSync(resolve(root, page), 'utf8');
  const fr = page.startsWith('fr/');
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(ids.length, new Set(ids).size, `${page}: unique IDs`);
  assert(html.includes(`<html lang="${fr ? 'fr' : 'en'}">`));
  assert(html.includes('name="viewport"'));
  assert(html.includes('hreflang="en"') && html.includes('hreflang="fr"'));
  const canonical = site + page.replace(/index\.html$/, '');
  assert(html.includes(`rel="canonical" href="${canonical}"`));
  assert(sitemap.includes(`<loc>${canonical}</loc>`));
  for (const [, url] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (url.startsWith('https://')) { new URL(url); continue; }
    assert(!url.startsWith('/'), `Project Pages needs a relative URL: ${url}`);
    const [local, fragment] = url.split('#');
    let target = local ? resolve(dirname(resolve(root, page)), local) : resolve(root, page);
    if (local.endsWith('/')) target = resolve(target, 'index.html');
    assert(target.startsWith(root + sep), `Target stays in the site: ${url}`);
    assert(existsSync(target), `Missing local target on ${page}: ${url}`);
    if (fragment) assert(readFileSync(target, 'utf8').includes(`id="${fragment}"`), `Missing fragment: ${url}`);
  }

  if (page === 'index.html' || page === 'fr/index.html') {
    const hero = html.indexOf('id="winfix-kit"');
    const tools = html.indexOf('id="tools"');
    assert(hero >= 0 && tools > hero && html.indexOf('buymeacoffee.com') > tools, 'Lead with WinFix Kit and then standalone tools');
    assert.equal([...html.matchAll(/href="https:\/\/buymeacoffee.com\/drakken"/g)].length, 1);
    assert(html.includes(fr ? 'Publication en préparation' : 'Release in preparation'));
    assert(!html.includes('/winfix-kit/releases/'), 'No unverified unified-app download link');
    assert(html.includes(fr ? 'Aucune obligation' : 'No obligation'));
    assert(html.includes(`winfix-home-${fr ? 'fr' : 'en'}.png`));
    assert(!/<script[^>]+src="https?:\/\//.test(html));
  } else {
    const download = html.indexOf('.exe');
    const advanced = html.indexOf('class="advanced-download"');
    assert(download >= 0 && advanced > download, 'Windows app before PowerShell');
    assert(html.includes('href="../#winfix-kit"'));
    if (page.includes('health') || page.includes('sante'))
      assert(html.includes(fr ? 'Créer le rapport' : 'Create report'));
    else
      assert(html.includes(`-Language ${fr ? 'fr' : 'en'}</code>`));
  }
}

assert(existsSync(resolve(root, '.nojekyll')));
assert(readFileSync(resolve(root, 'LICENSE'), 'utf8').includes('IN NO EVENT SHALL'));
console.log('PASS: six bilingual pages, relative links, fragments, screenshots, publication status and standalone downloads');
