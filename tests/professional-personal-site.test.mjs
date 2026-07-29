import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { LANGUAGES } from '../i18n.js';

const home = await readFile(new URL('../index.html', import.meta.url), 'utf8');

test('homepage follows the approved two-layer index order', () => {
  const ids = ['about', 'experience', 'projects', 'edu', 'outside-work', 'contact'];
  let cursor = home.indexOf('id="top"');
  for (const id of ids) {
    const next = home.indexOf(`id="${id}"`);
    assert.ok(next > cursor, `${id} is out of order`);
    cursor = next;
  }
  assert.doesNotMatch(home, /id="campus-music"|id="visual-work"/);
});

test('hero and About use the approved concise identity copy', () => {
  assert.match(home, /<div class="role[^>]*>Communication, community, and music\.<\/div>/);
  assert.doesNotMatch(home, /class="roleen"/);
  assert.match(home, /I study Strategic Communication at Southern Utah University/);
  assert.match(home, /Outside work, I play upright and electric bass/);
  assert.doesNotMatch(home, /capability-ledger|capability-row|<h3>Workflow<\/h3>/);
  assert.equal(LANGUAGES.zh.copy['.hero .role'], '传播、社群与音乐。');
  const about = [
    LANGUAGES.zh.copy['#about .about-copy p:nth-child(1)'],
    LANGUAGES.zh.copy['#about .about-copy p:nth-child(2)'],
  ].join('\n');
  assert.doesNotMatch(about, /社区运营/);
});

test('homepage exposes three second-layer work routes', () => {
  for (const href of [
    'projects/campus-campaign.html',
    'projects/hotel-jazz.html',
    'projects/visual-work.html',
  ]) assert.match(home, new RegExp(`href="${href}"`));
  assert.equal((home.match(/class="project-row/g) ?? []).length, 3);
  assert.doesNotMatch(home, /<details class="project-row/);
});

test('Outside Work is one asymmetric homepage gateway', () => {
  assert.match(home, /<section[^>]+id="outside-work"/);
  assert.match(home, /href="outside-work\.html"/);
  for (const label of ['Music', 'Photography', 'Places']) assert.match(home, new RegExp(label));
  assert.doesNotMatch(home, /href="(?:music|photography|places)\.html"/);
});

test('contact is neutral rather than a campaign sales pitch', () => {
  assert.match(home, /Get in touch\./);
  assert.match(home, /You can reach me by email or LinkedIn\./);
  assert.doesNotMatch(home, /Let.{0,3}s make the next campaign/);
});
