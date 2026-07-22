import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('Vertex evidence uses the approved representative-account scope', async () => {
  const [home, detail, i18n] = await Promise.all([
    readFile(new URL('../index.html', import.meta.url), 'utf8'),
    readFile(new URL('../projects/vertex-reddit.html', import.meta.url), 'utf8'),
    readFile(new URL('../i18n.js', import.meta.url), 'utf8'),
  ]);
  const copy = `${home}\n${detail}\n${i18n}`;
  for (const value of ['793K', '3,548', '482', '406K', '891', '90', '91.7%']) {
    assert.match(copy, new RegExp(value.replace('.', '\\.')));
  }
  assert.match(copy, /representative/i);
  assert.match(copy, /participated in operating/i);
  assert.doesNotMatch(copy, /personally generated all|owned all results/i);
});

test('Vertex appears as experience rather than a repeated project', async () => {
  const home = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  assert.match(home, /id="experience"/);
  assert.equal((home.match(/Vertex Marketing/g) ?? []).length, 1);
  assert.match(home, /href="projects\/vertex-reddit\.html"/);
});
