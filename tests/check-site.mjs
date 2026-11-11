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

  const support = [...html.matchAll(/href="https:\/\/buymeacoffee.com\/drakken"/g)];
  const home = page === 'index.html' || page === 'fr/index.html';
  assert.equal(support.length, home ? 2 : 1, 'A header link and a banner on home pages');
  assert(support[0].index < html.indexOf('</header>'), 'Support link in the header');
  assert(html.includes('winfix-logo.png'), 'Shared project logo');

  if (home) {
    assert(support[1].index > html.indexOf('id="principles"') && support[1].index < html.indexOf('</main>'), 'Support banner at the bottom');
    const hero = html.indexOf('id="winfix-kit"');
    const tools = html.indexOf('id="tools"');
    assert(hero >= 0 && tools > hero, 'Lead with WinFix Kit and then standalone tools');
    assert(html.includes(fr ? 'Préversion publique 2.4.2' : 'Public preview 2.4.2'));
    assert.equal(html.split('https://github.com/DrakkenWorld/winfix-kit-site/releases/download/winfix-kit-v2.4.2/WinFix-Kit-2.4.2-win-x64.zip').length - 1, 2, 'Direct download in hero and release section');
    assert(html.includes('https://github.com/DrakkenWorld/winfix-kit-site/releases/download/winfix-kit-v2.4.2/SHA256SUMS.txt'), 'Versioned checksum');
    assert(html.includes('https://github.com/DrakkenWorld/winfix-kit-site/releases/tag/winfix-kit-v2.4.2'), 'Release notes');
    assert(html.includes(fr ? '<strong>Extraire tout</strong>' : '<strong>Extract All</strong>'));
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
