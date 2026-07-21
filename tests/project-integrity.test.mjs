import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { LANGUAGES } from '../i18n.js';

const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const copy = JSON.stringify(LANGUAGES);

test('Track & Traction is labeled as academic and in progress', () => {
  assert.match(copy, /Independent Academic Project/);
  assert.match(copy, /In Progress/);
  assert.match(copy, /独立课程项目/);
  assert.match(copy, /进行中/);
  assert.doesNotMatch(copy, /achieved 150|reached 50 followers|获得150名|达到50名粉丝/i);
});

test('featured cases use distinct project identities', () => {
  assert.match(html, /id="track-traction"/);
  assert.match(html, /id="jazz-events"/);
  assert.match(html, /id="experiments"/);
});

test('creative works retain full links and always-visible captions', () => {
  for (const asset of ['hotone_main.jpg', 'jazz_coast_a.jpg', 'piano_a.jpg', 'trifold_out.jpg', 'banner_museum.jpg', 'bass1.jpg']) {
    assert.match(html, new RegExp(`href="build/assets/${asset}"[\\s\\S]{0,500}class="art-caption"`));
  }
  assert.doesNotMatch(html, /class="label"/);
});
