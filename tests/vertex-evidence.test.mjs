import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('Vertex evidence presents the approved internship scope without attribution language', async () => {
  const [home, detail, i18n] = await Promise.all([
    readFile(new URL('../index.html', import.meta.url), 'utf8'),
    readFile(new URL('../projects/vertex-reddit.html', import.meta.url), 'utf8'),
    readFile(new URL('../i18n.js', import.meta.url), 'utf8'),
  ]);
  const copy = `${home}\n${detail}\n${i18n}`;
  for (const value of ['793K', '3,548', '482', '406K', '891', '90', '91.7%']) {
    assert.match(copy, new RegExp(value.replace('.', '\\.')));
  }
  assert.doesNotMatch(copy, /representative|attribution boundary|归因边界|归因说明/i);
  assert.match(copy, /participated in operating/i);
  assert.doesNotMatch(copy, /personally generated all|owned all results/i);
});

test('homepage keeps summary evidence while the detail route owns the full evidence table', async () => {
  const [home, detail, i18n] = await Promise.all([
    readFile(new URL('../index.html', import.meta.url), 'utf8'),
    readFile(new URL('../projects/vertex-reddit.html', import.meta.url), 'utf8'),
    readFile(new URL('../i18n.js', import.meta.url), 'utf8'),
  ]);
  const homeExperience = home.match(/<section[^>]+id="experience"[\s\S]*?<\/section>/)?.[0] ?? '';
  const detailEvidence = detail.match(/<section id="vertex-evidence"[\s\S]*?<\/section>/)?.[0] ?? '';
  for (const value of ['5', '793K', '91.7%']) assert.match(homeExperience, new RegExp(value.replace('.', '\\.')));
  for (const value of ['15,433', '472', '3,548', '482', '406K', '891', '90']) {
    const pattern = new RegExp(value);
    assert.doesNotMatch(homeExperience, pattern);
    assert.match(detailEvidence, pattern);
  }
  assert.equal((detailEvidence.match(/<tr>/g) ?? []).length, 8);
  assert.match(homeExperience, /<p class="experience-proofline"><strong>5<\/strong> accounts · <strong>793K<\/strong> views · up to <strong>91\.7%<\/strong> U\.S\. audience share<\/p>/);
  assert.doesNotMatch(homeExperience, /experience-attribution/);
  assert.match(i18n, /'#experience \.experience-proofline'/);
  assert.doesNotMatch(homeExperience, /class="proof"/);
  assert.match(i18n, /'#vertex-evidence': `<h2/);
});

test('Vertex appears as experience rather than a repeated project', async () => {
  const home = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  assert.match(home, /id="experience"/);
  assert.equal((home.match(/<p class="experience-company">Vertex Marketing<\/p>/g) ?? []).length, 1);
  assert.match(home, /href="projects\/vertex-reddit\.html"/);
});
