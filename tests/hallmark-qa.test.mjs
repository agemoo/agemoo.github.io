import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const [home, detail, tokens, i18n] = await Promise.all([
  readFile(new URL('index.html', root), 'utf8'),
  readFile(new URL('projects/vertex-reddit.html', root), 'utf8'),
  readFile(new URL('tokens.css', root), 'utf8'),
  readFile(new URL('i18n.js', root), 'utf8'),
]);

function inlineStyles(html) {
  return [...html.matchAll(/<style>([\s\S]*?)<\/style>/g)].map((match) => match[1]).join('\n');
}

test('Hallmark stamp records the final critique and gate groups', () => {
  assert.match(tokens, /Hallmark · pre-emit critique: P[3-5] H[3-5] E[3-5] S[3-5] R[3-5] V[3-5]/);
  assert.match(tokens, /contrast: pass \(40–41\)/);
  assert.match(tokens, /nav: N10/);
  assert.match(tokens, /footer: Ft5/);
  assert.match(tokens, /mobile: pass \(34, 49, 50–57\)/);
});

test('render CSS consumes locked color tokens instead of raw colors', () => {
  for (const [name, css] of [['homepage', inlineStyles(home)], ['Vertex detail', inlineStyles(detail)]]) {
    assert.doesNotMatch(css, /#[0-9a-f]{3,8}\b|rgba?\(|hsla?\(|oklch\(/i, `${name} contains a raw color`);
  }
  assert.match(tokens, /--color-accent-ink:/);
  assert.match(tokens, /--color-faint:\s*oklch\(0\.6\b/);
});

test('motion avoids layout-property transitions and stacked hover effects', () => {
  for (const html of [home, detail]) {
    assert.doesNotMatch(html, /transition(?:-property)?\s*:[^;}]*\b(?:width|height|top|left|margin|padding|gap)\b/i);
  }
  assert.doesNotMatch(home, /\.experience-link:hover\{[^}]*gap:/);
});

test('hero, responsive image track, and display wrapping satisfy layout gates', () => {
  assert.match(home, /\.hero\{[^}]*padding-block:96px 128px;/);
  assert.match(home, /\.about-top\{[^}]*grid-template-columns:minmax\(0,1\.55fr\) minmax\(0,1fr\)/);
  assert.match(home, /h1,h2,h3,[^{}]*\{min-width:0;overflow-wrap:anywhere;\}/);
  assert.match(detail, /h1,h2,h3\{min-width:0;overflow-wrap:anywhere;\}/);
  assert.match(home, /@media \(max-width:60rem\)\{\.nav \.links\{display:none;\}\}/);
});

test('clickable affordances have nowrap and explicit interaction states', () => {
  for (const html of [home, detail]) {
    assert.match(html, /white-space:nowrap/);
    assert.match(html, /button:disabled,\[aria-disabled="true"\]/);
    assert.match(html, /a:active/);
    assert.match(html, /summary:active/);
  }
});

test('spacing declarations avoid off-scale pixel values', () => {
  for (const [name, css] of [['homepage', inlineStyles(home)], ['Vertex detail', inlineStyles(detail)]]) {
    const failures = [];
    for (const match of css.matchAll(/(?:margin|padding|gap)(?:-[a-z]+)?\s*:\s*([^;}]+)/gi)) {
      for (const px of match[1].matchAll(/(-?\d+(?:\.\d+)?)px\b/g)) {
        const value = Number(px[1]);
        if (value % 4 !== 0) failures.push(`${match[0]} (${value}px)`);
      }
    }
    assert.deepEqual(failures, [], `${name} uses off-scale spacing:\n${failures.join('\n')}`);
  }
});

test('empty hero ornaments are absent and the remaining cue is hidden from assistive tech', () => {
  assert.doesNotMatch(home, /class="hero-kick|class="nameen|class="status/);
  assert.doesNotMatch(home, /hero-kick|hero-foot \.status/);
  assert.match(i18n, /class="bar" aria-hidden="true"/);
});
