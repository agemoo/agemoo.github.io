import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('capabilities describe delivered work rather than familiarity', async () => {
  const copy = await readFile(new URL('../i18n.js', import.meta.url), 'utf8');
  for (const banned of ['Working knowledge', 'Familiar with Facebook Ads', 'Understand CPM', '了解 Facebook Ads', '掌握 CPM']) {
    assert.doesNotMatch(copy, new RegExp(banned, 'i'));
  }
  for (const delivered of ['Reddit community operations', 'localized English social copy', 'graphic design', 'short-form video', 'Excel reporting']) {
    assert.match(copy, new RegExp(delivered, 'i'));
  }
});
