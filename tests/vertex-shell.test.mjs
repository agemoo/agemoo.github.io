import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { LANGUAGES } from '../i18n.js';

test('Vertex route uses the N10 scroll-morph shell and Ft5 statement footer', async () => {
  const html = await readFile(new URL('../projects/vertex-reddit.html', import.meta.url), 'utf8');
  assert.match(html, /<html[^>]+data-page="vertex"/);
  assert.match(html, /<nav class="nav" id="vertex-nav"/);
  assert.match(html, /\.nav\.solid\s*\{/);
  assert.match(html, /nav\.classList\.toggle\('solid',y>window\.innerHeight\*0\.7\)/);
  for (const anchor of ['vertex-scope', 'vertex-evidence', 'vertex-attribution']) {
    assert.match(html, new RegExp(`href="#${anchor}"`));
  }
  assert.match(html, /<footer class="footer" id="vertex-footer">/);
  assert.doesNotMatch(html, /class="detail-nav"|class="detail-footer"/);
});

test('Vertex shell copy stays page-specific in both languages', () => {
  for (const language of ['en', 'zh']) {
    const copy = LANGUAGES[language].copy;
    assert.match(copy['#vertex-nav .links'], /#vertex-scope/);
    assert.match(copy['#vertex-nav .links'], /#vertex-evidence/);
    assert.match(copy['#vertex-nav .links'], /#vertex-attribution/);
    assert.ok(copy['#vertex-footer span:first-child']);
    assert.ok(copy['#vertex-footer span:last-child']);
  }
});

test('Vertex evidence uses tabular numbers and the display heading stays within 6rem', async () => {
  const [home, detail] = await Promise.all([
    readFile(new URL('../index.html', import.meta.url), 'utf8'),
    readFile(new URL('../projects/vertex-reddit.html', import.meta.url), 'utf8'),
  ]);
  assert.match(home, /\.experience-proofline strong\{[^}]*font-variant-numeric:tabular-nums/);
  assert.match(detail, /\.evidence-table strong\{[^}]*font-variant-numeric:tabular-nums/);
  assert.match(detail, /h1\{[^}]*font-size:clamp\(3rem,9vw,6rem\)/);
  assert.doesNotMatch(detail, /font-size:clamp\(48px,9vw,112px\)/);
});
