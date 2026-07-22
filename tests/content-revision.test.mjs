import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { LANGUAGES } from '../i18n.js';

test('education copy records coursework and the linked Wuhan degree accurately', async () => {
  const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  assert.match(html, /Aug 2025 — May 2027<\/p>/);
  assert.doesNotMatch(html, /May 2027 \(Expected\)/);
  assert.match(html, /Coursework: Social Media Strategy, Social Media Branding, Strategic Campaigns, Content Creation, Statistical Inference, Data Analytics/);
  assert.match(html, /B\.A\. in Advertising/);
  assert.match(html, /Degree awarded upon completion at SUU/);
  assert.match(html, /Coursework: Writing for Communication, Digital Copy Layout &amp; Design, Advertising Investigation &amp; Analysis, Organizational Communication/);
  assert.doesNotMatch(html, /style="width:\s*(?:550|578)px\s*!important/);
});

test('music section separates performance from two event-coordination records', async () => {
  const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  assert.match(html, /<h2 class="stitle" data-reveal>Music<\/h2>/);
  assert.equal((html.match(/class="life-row"/g) ?? []).length, 3);
  assert.match(html, /Upright bassist in the Southern Utah University jazz big band/);
  assert.match(html, /electric bassist in the T-Bird Marching Band/);
  assert.match(html, /Finalist, 2025 SUU International Student Artist Award/);
  assert.match(html, /Independently planned and produced a campus jazz concert at Wuhan Polytechnic University/);
  assert.match(html, /Developed a hotel × jazz event with Ni Jazz Bar and Fengmao Andi Hotel/);
  assert.match(html, /<h3>Music Event Coordination<\/h3>\s*<div class="life-copy">\s*<p>[^<]+<\/p>\s*<p>[^<]+<\/p>\s*<\/div>/s);
});

test('English and Chinese dictionaries own the revised concise content', () => {
  for (const language of ['en', 'zh']) {
    const copy = LANGUAGES[language].copy;
    assert.ok(copy['#campus-music .life-row:nth-child(3) h3']);
    assert.ok(copy['#campus-music .life-row:nth-child(2) .life-copy p:nth-child(2)']);
    assert.equal(Object.hasOwn(copy, '#projects .project-row:nth-child(1) .project-evidence'), false);
    assert.equal(Object.hasOwn(copy, '#projects .project-row:nth-child(2) .project-evidence'), false);
    assert.equal(Object.hasOwn(copy, '#visual-work .section-intro'), false);
    assert.equal(Object.hasOwn(copy, '#site-footer span:last-child'), false);
  }
  assert.equal(LANGUAGES.en.copy['#edu .edu-entry:nth-child(2) .edu-degree'], 'B.A. in Advertising');
  assert.match(LANGUAGES.en.copy['#edu .edu-entry:nth-child(2) .edu-secondary'], /Degree awarded upon completion at SUU/);
  assert.match(LANGUAGES.zh.copy['#edu .edu-entry:nth-child(2) .edu-secondary'], /完成 SUU 学位后同步授予/);
});

test('concise labels and footer match the edited direction', async () => {
  const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  assert.match(html, /href="#campus-music">Music<\/a>/);
  assert.match(html, /<h3>Workflow<\/h3>/);
  assert.match(html, /<span class="contact-label">Email Me<\/span>/);
  assert.match(html, /<footer[^>]*>\s*<span>© 2026 Mukun Sun<\/span>\s*<\/footer>/s);
  assert.doesNotMatch(html, /A concise selection of product, event, print, and photographic work/);
});
