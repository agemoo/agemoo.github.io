import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');

test('featured work precedes about and education', () => {
  const work = html.indexOf('id="work"');
  const vertex = html.indexOf('id="vertex"');
  const track = html.indexOf('id="track-traction"');
  const jazz = html.indexOf('id="jazz-events"');
  const about = html.indexOf('id="about"');
  assert.ok(work > -1 && vertex > work && track > vertex && jazz > track && about > jazz);
});

test('Vertex is named in the hero and owns the first featured case', () => {
  const hero = html.match(/<header[\s\S]*?<\/header>/)?.[0] ?? '';
  const firstCase = html.match(/<article class="project[\s\S]*?<\/article>/)?.[0] ?? '';
  assert.match(hero, /Vertex Marketing/);
  assert.match(firstCase, /id="vertex"/);
});

test('the page uses an external portfolio stylesheet', async () => {
  assert.match(html, /<link rel="stylesheet" href="styles\.css">/);
  const css = await readFile(new URL('../styles.css', import.meta.url), 'utf8');
  assert.match(css, /\.portfolio-shell/);
});

test('the published résumé target exists', async () => {
  const resume = await readFile(new URL('../assets/Mukun-Sun-Resume.pdf', import.meta.url));
  assert.ok(resume.length > 10_000);
  assert.match(html, /href="assets\/Mukun-Sun-Resume\.pdf"/);
});

test('audited structural fingerprints are absent', async () => {
  const css = await readFile(new URL('../styles.css', import.meta.url), 'utf8');
  assert.doesNotMatch(html, /class="marquee"|class="metrics-grid"|class="pillars"|Team leAd/);
  assert.doesNotMatch(html, /style="[^"]*!important/);
  assert.doesNotMatch(css, /100svh|box-shadow:[^;]*(ember|amber)|overflow-x:\s*hidden/);
  assert.doesNotMatch(html, /C:\/Windows\/Fonts/);
});
