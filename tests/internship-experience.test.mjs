import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { LANGUAGES } from '../i18n.js';

async function readHomepage() {
  return readFile(new URL('../index.html', import.meta.url), 'utf8');
}

test('homepage presents exactly two internships in reverse chronological order', async () => {
  const home = await readHomepage();
  const section = home.match(/<section[^>]+id="experience"[\s\S]*?<\/section>/)?.[0] ?? '';
  assert.equal((section.match(/class="experience-row(?:\s|\")/g) ?? []).length, 2);
  assert.ok(section.indexOf('experience-row--vertex') < section.indexOf('experience-row--teaching'));
  assert.match(section, /Internship Experience/);
  assert.match(section, /Southern Utah University × Wuhan Polytechnic University/);
  assert.match(section, /English Writing Teaching Assistant/);
  assert.match(section, /May 2026/);
  assert.match(section, /200\+/);
});

test('teaching-assistant copy stays within the approved evidence boundary', async () => {
  const home = await readHomepage();
  const section = home.match(/<section[^>]+id="experience"[\s\S]*?<\/section>/)?.[0] ?? '';
  const bilingualCopy = JSON.stringify(LANGUAGES);
  for (const phrase of [
    /bilingual classroom support/i,
    /attendance and assignment grading/i,
    /written feedback/i,
    /final-grade data/i,
    /course completion reporting/i,
  ]) assert.match(`${section}\n${bilingualCopy}`, phrase);
  assert.match(LANGUAGES.zh.copy['#experience .experience-row--teaching .experience-responsibility'], /200 多名学生/);
  assert.match(LANGUAGES.zh.copy['#experience .experience-row--teaching .experience-responsibility'], /Excel/);
  assert.doesNotMatch(`${section}\n${bilingualCopy}`, /Sharon Lyman|\$450|airfare|82%|96%|30%/i);
});

test('each internship has stable scoped translation selectors', () => {
  for (const modifier of ['vertex', 'teaching']) {
    for (const field of ['experience-company', 'experience-role', 'experience-dates', 'experience-responsibility']) {
      const selector = `#experience .experience-row--${modifier} .${field}`;
      assert.ok(Object.hasOwn(LANGUAGES.en.copy, selector), selector);
      assert.ok(Object.hasOwn(LANGUAGES.zh.copy, selector), selector);
    }
  }
  assert.equal(LANGUAGES.en.copy['#experience .placard'], 'Internship Experience');
  assert.equal(LANGUAGES.zh.copy['#experience .placard'], '实习经历');
});

test('internship list uses one outer rule and one separator per following row', async () => {
  const home = await readHomepage();
  assert.match(home, /\.experience-list\{[^}]*border-block:1px solid var\(--line-2\);/);
  assert.match(home, /\.experience-row\+\.experience-row\{[^}]*border-top:1px solid var\(--line-2\);/);
});

test('teaching experience pairs its copy with the approved natural-ratio classroom image', async () => {
  const home = await readHomepage();
  const section = home.match(/<article class="experience-row experience-row--teaching"[\s\S]*?<\/article>/)?.[0] ?? '';
  assert.match(section, /<figure class="experience-media" data-reveal="img">/);
  assert.match(section, /src="assets\/internship\/SUU_TA\/me_classroom\.jpg" width="1435" height="1279" alt="Mukun Sun supporting an English writing class in Wuhan"/);
  assert.match(home, /\.experience-row--teaching>div:last-child\{display:grid;grid-template-columns:minmax\(0,1\.05fr\) minmax\(240px,\.95fr\);/);
  assert.match(home, /\.experience-media img\{[^}]*height:auto/);
});
