import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('hero leads with the U.S.-audience value proposition', async () => {
  const [html, i18n] = await Promise.all([
    readFile(new URL('../index.html', import.meta.url), 'utf8'),
    readFile(new URL('../i18n.js', import.meta.url), 'utf8'),
  ]);
  assert.match(i18n, /I make social content feel native to the community it enters\./);
  assert.match(i18n, /for U\.S\. audiences/);
  assert.doesNotMatch(html, /class="ghost"/);
  assert.doesNotMatch(i18n, /\.hero \.ghost/);
});

test('homepage exposes complete sharing metadata', async () => {
  const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  assert.match(html, /rel="canonical" href="https:\/\/agemoo\.github\.io\/"/);
  assert.match(html, /rel="icon" href="assets\/favicon\.svg"/);
  assert.match(html, /property="og:title"/);
  assert.match(html, /property="og:description"/);
  assert.match(html, /property="og:type" content="website"/);
  assert.match(html, /property="og:url" content="https:\/\/agemoo\.github\.io\/"/);
  assert.match(html, /property="og:image" content="https:\/\/agemoo\.github\.io\/build\/assets\/banner_museum\.jpg"/);
  assert.match(html, /property="og:image:width" content="1084"/);
  assert.match(html, /property="og:image:height" content="437"/);
  assert.match(html, /property="og:image:alt" content="International Museum Day banner designed for Wuhan Museum"/);
  assert.match(html, /name="twitter:card" content="summary_large_image"/);
  assert.match(html, /name="twitter:title"/);
  assert.match(html, /name="twitter:description"/);
  assert.match(html, /name="twitter:image" content="https:\/\/agemoo\.github\.io\/build\/assets\/banner_museum\.jpg"/);
  assert.match(html, /name="twitter:image:alt" content="International Museum Day banner designed for Wuhan Museum"/);
  assert.doesNotMatch(html, /(?:og:image|twitter:image)" content="[^"]*portrait\.jpg"/);
});

test('production HTML does not reference workstation-local font files', async () => {
  const [home, detail] = await Promise.all([
    readFile(new URL('../index.html', import.meta.url), 'utf8'),
    readFile(new URL('../projects/vertex-reddit.html', import.meta.url), 'utf8'),
  ]);
  for (const html of [home, detail]) {
    assert.doesNotMatch(html, /url\(['"]?[A-Za-z]:[\\/]/);
  }
});

test('favicon uses the roman initial instead of the removed Chinese glyph', async () => {
  const favicon = await readFile(new URL('../assets/favicon.svg', import.meta.url), 'utf8');
  assert.match(favicon, /<svg/);
  assert.match(favicon, />M<\/text>/);
  assert.doesNotMatch(favicon, /营/);
});
