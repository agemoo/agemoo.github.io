import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolveOutsideRoute, mountOutsideRedirect } from '../outside-redirect.js';

test('legacy Outside Work fragments resolve to direct subject routes', () => {
  assert.equal(resolveOutsideRoute('#outside-music'), 'music.html');
  assert.equal(resolveOutsideRoute('#outside-photography'), 'photography.html');
  assert.equal(resolveOutsideRoute('#outside-travel'), 'travel.html');
  assert.equal(resolveOutsideRoute(''), 'index.html#outside-work');
  assert.equal(resolveOutsideRoute('#unknown'), 'index.html#outside-work');
});

test('redirect mount replaces history instead of adding an intermediate page', () => {
  const calls = [];
  const target = mountOutsideRedirect({
    hash: '#outside-photography',
    replace: (value) => calls.push(value),
  });
  assert.equal(target, 'photography.html');
  assert.deepEqual(calls, ['photography.html']);
});

test('outside-work is a compatibility document rather than a visible chooser', async () => {
  const html = await readFile(new URL('../outside-work.html', import.meta.url), 'utf8');
  assert.match(html, /src="outside-redirect\.js"/);
  assert.match(html, /http-equiv="refresh" content="0; url=index\.html#outside-work"/);
  assert.match(html, /Return to Outside Work \/ 返回工作之外/);
  assert.doesNotMatch(html, /<main|id="outside-music"|id="outside-photography"|id="outside-travel"/);
});

test('Music is a standalone bilingual route with a full-width timeline', async () => {
  const html = await readFile(new URL('../music.html', import.meta.url), 'utf8');
  const css = await readFile(new URL('../detail.css', import.meta.url), 'utf8');
  assert.match(html, /data-page="music"/);
  assert.match(html, /<section[^>]+id="music-intro"/);
  assert.match(html, /<section[^>]+id="music-timeline"/);
  assert.match(html, /<section[^>]+id="music-study"/);
  assert.match(html, /<section[^>]+class="[^"]*\bmusic-page-intro\b[^"]*"[^>]+id="music-intro"/);
  assert.equal((html.match(/class="music-event(?:\s|\")/g) ?? []).length, 9);
  assert.match(html, /https:\/\/www\.youtube\.com\/live\/OFijT_vkp8c\?si=OqEdKbXtynljWJtd/);
  assert.match(css, /\.music-page-content\{[^}]*grid-column:1\/-1/);
  assert.match(css, /\.music-page-intro\{[^}]*grid-template-columns:minmax\(0,\.72fr\) minmax\(0,1\.28fr\)/);
  assert.match(css, /\.music-event--media\{[^}]*grid-template-columns:minmax\(132px,[^)]+\) minmax\(0,1fr\) minmax\(240px,[^)]+\)/);
  assert.match(css, /\.music-event:not\(\.music-event--media\) \.music-event-copy\{[^}]*grid-column:2\/-1/);
});

test('Photography and Travel are independent bilingual routes', async () => {
  const [photography, travel] = await Promise.all([
    readFile(new URL('../photography.html', import.meta.url), 'utf8'),
    readFile(new URL('../travel.html', import.meta.url), 'utf8'),
  ]);
  assert.match(photography, /data-page="photography"/);
  assert.match(photography, /id="photography-gallery"/);
  assert.match(travel, /data-page="travel"/);
  assert.match(travel, /id="travel-notes"/);
  assert.doesNotMatch(`${photography}\n${travel}`, /coming soon|寰呮洿鏂皘鏁鏈熷緟/i);
});

test('Photography and Travel images each have one primary route', async () => {
  const [photography, travel] = await Promise.all([
    readFile(new URL('../photography.html', import.meta.url), 'utf8'),
    readFile(new URL('../travel.html', import.meta.url), 'utf8'),
  ]);
  const files = [
    'building.webp', 'chongqing.webp', 'santa_monica_beach.webp',
    'tongren.webp', 'walter_disney.webp',
  ];
  for (const file of files) {
    const count = (photography.match(new RegExp(file, 'g')) ?? []).length
      + (travel.match(new RegExp(file, 'g')) ?? []).length;
    assert.equal(count, 2, `${file}: one href and one img on one route`);
  }
});
