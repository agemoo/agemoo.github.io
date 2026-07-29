import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const css = await readFile(new URL('../detail.css', import.meta.url), 'utf8');
const js = await readFile(new URL('../detail.js', import.meta.url), 'utf8');

test('detail shell uses locked tokens and balanced safe grids', () => {
  assert.match(css, /@import url\(['"]tokens\.css['"]\)/);
  assert.doesNotMatch(css, /#[0-9a-f]{3,8}\b|rgba?\(|hsla?\(|oklch\(/i);
  assert.match(css, /grid-template-columns:[^;}]*minmax\(0,/);
  assert.match(css, /\.detail-media img[^}]*height:auto/);
  assert.match(css, /html[^}]*overflow-x:clip/);
  assert.match(css, /body[^}]*overflow-x:clip/);
});

test('image dialog supports keyboard close and focus restoration', () => {
  assert.match(js, /export function mountImageDialog\(dialog\)/);
  assert.match(js, /event\.key === 'Escape'/);
  assert.match(js, /previousFocus\?\.focus\(\)/);
  assert.match(js, /dialog\.close\(\)/);
});

test('detail navigation exposes a 44px compact section control at narrow widths', () => {
  assert.match(css, /\.compact-nav\{display:none/);
  assert.match(css, /\.compact-nav summary\{[^}]*min-height:44px/);
  assert.match(css, /@media\(max-width:60rem\)\{[^}]*\.compact-nav\{display:block/);
});
