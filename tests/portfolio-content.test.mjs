import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { LANGUAGES } from '../i18n.js';

const flattenCopy = (language) => JSON.stringify(LANGUAGES[language].copy);
const publicCopy = `${flattenCopy('en')}\n${flattenCopy('zh')}`;

test('Vertex has matching bilingual case keys', () => {
  const required = [
    'vertex.eyebrow',
    'vertex.title',
    'vertex.role',
    'vertex.scope',
    'vertex.portfolioLabel',
    'vertex.attribution',
    'vertex.metric.accounts',
    'vertex.metric.karma',
    'vertex.metric.contributions',
    'vertex.metric.views',
    'vertex.metric.upvotes',
    'vertex.metric.comments',
    'vertex.metric.peakViews',
    'vertex.metric.usAudience',
    'vertex.workflow.title',
    'vertex.workflow.description',
    'vertex.workflow.boundary',
    'vertex.learning',
  ];
  for (const key of required) {
    assert.ok(LANGUAGES.en.copy[key], `missing English ${key}`);
    assert.ok(LANGUAGES.zh.copy[key], `missing Chinese ${key}`);
  }
});

test('Vertex public figures match the approved account portfolio', () => {
  for (const expected of [
    '5', '15,433', '472', '226', '246', '16', '793K', '3,548', '482',
    '406K', '891', '90', '100%', '91.7%', '15',
  ]) {
    assert.match(publicCopy, new RegExp(expected.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }
});

test('Vertex copy states attribution and human-review boundaries', () => {
  assert.match(flattenCopy('en'), /historical assets/i);
  assert.match(flattenCopy('en'), /participated in operating and analyzing/i);
  assert.match(flattenCopy('en'), /human review/i);
  assert.match(flattenCopy('en'), /does not post, vote, or manage accounts/i);
  assert.match(flattenCopy('zh'), /历史资产/);
  assert.match(flattenCopy('zh'), /参与运营和分析/);
  assert.match(flattenCopy('zh'), /人工审核/);
});

test('public copy makes no unsupported Vertex claims', () => {
  assert.doesNotMatch(publicCopy, /adopted by the team|已在团队中采用|saved \d+|节省了?\d+|automatically posts|可自动发帖|created 793K|创造了?79/iu);
});

test('protected client names are absent from public copy', async () => {
  const source = await readFile('D:/VertexMkt/tmp/reddit-comment-drafter-staged/references/protected-brands.md', 'utf8');
  const rows = source.split('\n').filter((line) => line.startsWith('|') && !line.includes('---'));
  const names = rows.flatMap((line) => line.split('|').map((cell) => cell.trim()).filter(Boolean));
  for (const name of names) {
    const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const standaloneName = new RegExp(`(^|[^A-Za-z0-9])${escaped}([^A-Za-z0-9]|$)`, 'i');
    assert.doesNotMatch(publicCopy, standaloneName, `public copy exposes ${name}`);
  }
});
