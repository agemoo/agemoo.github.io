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
