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

test('About copy is concise and sends outside work to its own route', async () => {
  const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  assert.match(html, /I study Strategic Communication at Southern Utah University/);
  assert.match(html, /Outside work, I play upright and electric bass/);
  assert.match(html, /href="outside-work\.html"/);
});

test('English and Chinese dictionaries own the revised concise content', () => {
  for (const language of ['en', 'zh']) {
    const copy = LANGUAGES[language].copy;
    assert.equal(Object.hasOwn(copy, '#projects .project-row:nth-child(1) .project-evidence'), false);
    assert.equal(Object.hasOwn(copy, '#projects .project-row:nth-child(2) .project-evidence'), false);
    assert.equal(Object.hasOwn(copy, '#site-footer span:last-child'), false);
  }
  assert.equal(LANGUAGES.en.copy['#edu .edu-entry:nth-child(2) .edu-degree'], 'B.A. in Advertising');
  assert.match(LANGUAGES.en.copy['#edu .edu-entry:nth-child(2) .edu-secondary'], /Degree awarded upon completion at SUU/);
  assert.match(LANGUAGES.zh.copy['#edu .edu-entry:nth-child(2) .edu-secondary'], /完成 SUU 学位后同步授予/);
});

test('concise labels and footer match the edited direction', async () => {
  const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  assert.match(html, /href="outside-work\.html"/);
  assert.match(html, /<span class="contact-label">Email Me<\/span>/);
  assert.match(html, /<footer[^>]*>\s*<span>© 2026 Mukun Sun<\/span>\s*<\/footer>/s);
  assert.doesNotMatch(html, /A concise selection of product, event, print, and photographic work/);
});
