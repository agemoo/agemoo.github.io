import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('homepage and translations omit the removed capability ledger', async () => {
  const [html, i18n] = await Promise.all([
    readFile(new URL('../index.html', import.meta.url), 'utf8'),
    readFile(new URL('../i18n.js', import.meta.url), 'utf8'),
  ]);
  for (const source of [html, i18n]) {
    assert.doesNotMatch(source, /capability-ledger|capability-row/);
    assert.doesNotMatch(source, /<h3>(?:Community|Content|Visual|Workflow)<\/h3>/);
  }
});
