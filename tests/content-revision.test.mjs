import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { LANGUAGES } from '../i18n.js';

test('education copy keeps coursework concise and emphasizes the Business Analytics minor', async () => {
  const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  assert.match(html, /Aug 2025 — May 2027<\/p>/);
  assert.doesNotMatch(html, /May 2027 \(Expected\)/);
  assert.match(html, /Coursework: Social Media Strategy, Social Media Branding, Strategic Campaigns, Content Creation, Statistical Inference, Data Analytics/);
  assert.match(html, /B\.A\. in Advertising/);
  assert.doesNotMatch(html, /Degree awarded upon completion at SUU/);
  assert.match(html, /<p class="edu-secondary">Minor · Business Analytics<\/p>/);
  assert.match(html, /\.edu-secondary\{[^}]*font-size:clamp\(12px,1\.2vw,14px\)[^}]*font-weight:600[^}]*color:var\(--amber\)/);
  assert.match(html, /Coursework: Writing for Communication, Digital Copy Layout &amp; Design, Advertising Investigation &amp; Analysis, Organizational Communication/);
  assert.doesNotMatch(html, /style="width:\s*(?:550|578)px\s*!important/);
});

test('About copy is concise and the homepage links directly to outside-work routes', async () => {
  const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  assert.match(html, /I study Strategic Communication at Southern Utah University/);
  assert.match(html, /Outside work, I play upright and electric bass/);
  assert.match(html, /href="music\.html"/);
  assert.match(html, /href="photography\.html"/);
  assert.match(html, /href="travel\.html"/);
  assert.doesNotMatch(html, /href="outside-work\.html(?:#outside-[^"]*)?"/);
});

test('English and Chinese dictionaries own the revised concise content', () => {
  for (const language of ['en', 'zh']) {
    const copy = LANGUAGES[language].copy;
    assert.equal(Object.hasOwn(copy, '#projects .project-row:nth-child(1) .project-evidence'), false);
    assert.equal(Object.hasOwn(copy, '#projects .project-row:nth-child(2) .project-evidence'), false);
    assert.equal(Object.hasOwn(copy, '#site-footer span:last-child'), false);
  }
  assert.equal(LANGUAGES.en.copy['#edu .edu-entry:nth-child(2) .edu-degree'], 'B.A. in Advertising');
  assert.equal(Object.hasOwn(LANGUAGES.en.copy, '#edu .edu-entry:nth-child(2) .edu-secondary'), false);
  assert.equal(Object.hasOwn(LANGUAGES.zh.copy, '#edu .edu-entry:nth-child(2) .edu-secondary'), false);
});

test('concise labels and footer match the edited direction', async () => {
  const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  assert.doesNotMatch(html, /class="outside-action"/);
  assert.match(html, /<span class="contact-label">Email Me<\/span>/);
  assert.match(html, /<footer[^>]*>\s*<span>© 2026 Mukun Sun<\/span>\s*<\/footer>/s);
  assert.doesNotMatch(html, /A concise selection of product, event, print, and photographic work/);
});
