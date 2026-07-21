import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const css = await readFile(new URL('../styles.css', import.meta.url), 'utf8');

test('navigation remains useful without desktop-only links', () => {
  assert.match(html, /href="#work"/);
  assert.match(html, /href="#about"/);
  assert.match(html, /href="#contact"/);
  assert.match(html, /class="lang-switch"/);
  assert.doesNotMatch(css, /\.nav-links\s*\{[^}]*display:\s*none/s);
});

test('responsive and reduced-motion safety contracts are present', () => {
  assert.match(css, /overflow-x:\s*clip/);
  assert.match(css, /@media \(max-width:\s*760px\)/);
  assert.match(css, /@media \(prefers-reduced-motion:\s*reduce\)/);
  assert.doesNotMatch(css, /animation:\s*grain|animation:\s*scroll|box-shadow:[^;]*(amber|accent)/);
});

test('semantic and keyboard basics are present', () => {
  assert.match(html, /class="skip-link"/);
  assert.match(css, /:focus-visible/);
  assert.match(html, /<main[\s>]/);
  assert.match(html, /aria-label="Language"/);
});
