import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('the site uses the locked Index-First design system', async () => {
  const [design, tokens, homepage] = await Promise.all([
    readFile(new URL('../DESIGN.md', import.meta.url), 'utf8'),
    readFile(new URL('../tokens.css', import.meta.url), 'utf8'),
    readFile(new URL('../index.html', import.meta.url), 'utf8'),
  ]);
  assert.match(design, /English-first/);
  assert.match(design, /Index-First/);
  assert.match(tokens, /--color-paper:\s*oklch\(0\.152 0\.006 60\)/);
  assert.match(tokens, /--font-display:/);
  assert.match(homepage, /href="tokens\.css"/);
});
