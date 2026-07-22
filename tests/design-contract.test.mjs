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
  assert.match(tokens, /--color-accent-deep:\s*oklch\(0\.55 0\.145 42\)/);
  assert.match(tokens, /--ease-legacy:\s*cubic-bezier\(\.22,1,\.36,1\)/);
  assert.match(homepage, /href="tokens\.css"/);
  assert.match(homepage, /--ember-d:var\(--color-accent-deep\)/);
  assert.match(homepage, /--ease2:var\(--ease-legacy\)/);
  assert.doesNotMatch(homepage, /class="ghost"[^>]*>营</);
  assert.doesNotMatch(design, /中文为主、英文为辅/);
  for (const section of ['experience', 'projects', 'education', 'campus/music', 'visual work', 'contact']) {
    assert.match(design, new RegExp(section, 'i'));
  }
});
