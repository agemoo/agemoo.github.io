import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const css = await readFile(new URL('../styles.css', import.meta.url), 'utf8');

test('the desktop hero does not delay the current internship case', () => {
  assert.match(css, /\.hero h1\s*\{[^}]*max-width:\s*15ch[^}]*font-size:\s*clamp\(3\.7rem,\s*7vw,\s*6\.25rem\)/s);
  assert.match(css, /\.selected-work\s*\{[^}]*padding-top:\s*clamp\(3\.5rem,\s*6vw,\s*6rem\)/s);
});

test('gallery previews crop mismatched source ratios without altering originals', () => {
  assert.match(css, /\.art img\s*\{[^}]*object-fit:\s*cover/s);
  assert.match(css, /\.art-grid \.art\s*\{[^}]*aspect-ratio:/s);
});
