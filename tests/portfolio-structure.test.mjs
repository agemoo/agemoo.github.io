import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('homepage separates personal-site content into compact sections', async () => {
  const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  for (const id of ['about', 'experience', 'projects', 'edu', 'outside-work', 'contact']) {
    assert.match(html, new RegExp(`<section[^>]+id="${id}"`));
  }
  for (const href of [
    'projects/campus-campaign.html',
    'projects/hotel-jazz.html',
    'projects/visual-work.html',
  ]) assert.match(html, new RegExp(`href="${href}"`));
  assert.equal((html.match(/class="project-row"/g) ?? []).length, 3);
  assert.doesNotMatch(html, /<section[^>]+id="visual-work"/);
  assert.doesNotMatch(html, /<details class="project-row/);
  assert.equal((html.match(/class="case"/g) ?? []).length, 0);
  assert.doesNotMatch(html, /Selected Impact|19,000|8,000\+|Team leAd/);
});

test('artwork previews keep natural proportions', async () => {
  const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  assert.match(html, /\.visual-preview img\s*\{[^}]*height:\s*auto/s);
  assert.doesNotMatch(html, /\.visual-preview img\s*\{[^}]*object-fit:\s*cover/s);
});
