import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('both pages meet responsive and language-loading contracts', async () => {
  const [home, detail] = await Promise.all([
    readFile(new URL('../index.html', import.meta.url), 'utf8'),
    readFile(new URL('../projects/vertex-reddit.html', import.meta.url), 'utf8'),
  ]);
  for (const html of [home, detail]) {
    assert.match(html, /overflow-x:\s*clip/);
    assert.match(html, /prefers-reduced-motion:\s*reduce/);
    assert.match(html, /i18n\.js\?v=20260722-index-redesign/);
  }
  assert.match(home, /@media\s*\(max-width:\s*40rem\)/);
  assert.match(home, /min-height:\s*44px/);
});

test('homepage limits continuous motion and removes obsolete counters', async () => {
  const home = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  assert.match(home, /html\.js\.motion-desktop \.marquee \.track/);
  assert.match(home, /html\.js\.motion-desktop \[data-reveal\],html\.js\.motion-desktop \.reveal-up\{opacity:1!important/);
  assert.doesNotMatch(home, /data-count|startCount/);
});
