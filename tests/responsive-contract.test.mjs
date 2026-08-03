import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function readContracts() {
  return Promise.all([
    readFile(new URL('../index.html', import.meta.url), 'utf8'),
    readFile(new URL('../projects/vertex-reddit.html', import.meta.url), 'utf8'),
    readFile(new URL('../i18n.js', import.meta.url), 'utf8'),
    readFile(new URL('../music.html', import.meta.url), 'utf8'),
    readFile(new URL('../photography.html', import.meta.url), 'utf8'),
    readFile(new URL('../travel.html', import.meta.url), 'utf8'),
    readFile(new URL('../detail.css', import.meta.url), 'utf8'),
    readFile(new URL('../detail.js', import.meta.url), 'utf8'),
  ]);
}

test('both routes enforce clipping, mobile controls, wrapping, exact cache imports, and stored-language boot', async () => {
  const [home, detail, i18n] = await readContracts();
  for (const html of [home, detail]) {
    assert.match(html, /html\{[^}]*overflow-x:\s*clip;/);
    assert.match(html, /body\{[^}]*overflow-x:\s*clip;/);
    assert.match(html, /@media\s*\(max-width:\s*40rem\)\{[\s\S]*?a,button,summary\{min-height:\s*44px;\}/);
    assert.match(html, /h1,h2,h3[^{}]*\{min-width:\s*0;overflow-wrap:\s*anywhere;\}/);
    assert.match(html, /<html\s+lang="en"[^>]*data-language="en"/);
    assert.equal((html.match(/i18n\.js\?v=/g) ?? []).length, 1);
  }
  assert.match(home, /<script type="module" src="i18n\.js\?v=20260730-outside-routes"><\/script>/);
  assert.match(detail, /<script type="module" src="\.\.\/i18n\.js\?v=20260730-outside-routes"><\/script>/);
  assert.match(i18n, /export const DEFAULT_LANGUAGE = 'en';/);
  assert.match(i18n, /export function getInitialLanguage\(storage = globalThis\.localStorage\)/);
  assert.match(i18n, /storage\?\.getItem\(STORAGE_KEY\)/);
});

test('outside-work detail routes load one shared versioned module and cache-busted shell', async () => {
  const [, , , music, photography, travel, , detailJs] = await readContracts();
  for (const [name, html] of [['music', music], ['photography', photography], ['travel', travel]]) {
    assert.match(html, /<html lang="en"[^>]*data-language="en"/);
    assert.equal((html.match(/i18n\.js/g) ?? []).length, 1, `${name}: one i18n script URL`);
    assert.match(html, /src="i18n\.js\?v=20260730-outside-routes"/);
    assert.match(html, /href="detail\.css\?v=20260730-outside-routes"/);
    assert.match(html, /src="detail\.js\?v=20260730-outside-routes"/);
  }
  assert.doesNotMatch(detailJs, /(?:import|from)\s*['"]\.\/i18n\.js['"]/);
});

test('detail routes collapse at 60rem and 40rem while coarse pointers change only navigation', async () => {
  const [, , , , , , css] = await readContracts();
  assert.match(css, /@media\(max-width:60rem\)\{[^}]*\.detail-hero,\.detail-section,\.music-page-intro\{grid-template-columns:minmax\(0,1fr\);\}/);
  assert.match(css, /@media\(max-width:60rem\)\{\.photography-gallery-head\{grid-template-columns:minmax\(0,1fr\);/);
  assert.match(css, /@media\(max-width:60rem\)\{[\s\S]*?\.music-event--media,\.music-study-row--media\{grid-template-columns:minmax\(132px,\.32fr\) minmax\(0,1fr\);\}/);
  assert.match(css, /@media\(max-width:40rem\)\{[\s\S]*?\.music-event,\.music-event--media\{grid-template-columns:minmax\(0,1fr\)\}/);
  assert.match(css, /@media\(max-width:40rem\)\{[\s\S]*?\.photography-sequence,\.travel-region,\.travel-region-copy p\{grid-template-columns:minmax\(0,1fr\)\}/);
  assert.match(css, /@media\(max-width:40rem\)\{[\s\S]*?\.photography-gallery-head\{grid-template-columns:minmax\(0,1fr\);/);
  assert.match(css, /@media\(max-width:40rem\)\{[\s\S]*?\.photography-gallery-head h2\{white-space:normal;/);
  assert.match(css, /@media\(max-width:60rem\),\(pointer:coarse\)\{\.compact-nav\{display:block;\}\.detail-nav \.links,\.detail-nav \.back-link\{display:none;\}\}/);
  assert.doesNotMatch(css, /@media\(max-width:60rem\),\(pointer:coarse\)\{[^}]*\.(?:detail-hero|detail-section|music-page-intro|music-event|photography-sequence|travel-note)/);
  assert.match(css, /@media\(max-width:40rem\)\{[\s\S]*?html\[data-page="photography"\] \.detail-hero h1\{[^}]*font-size:clamp\([^}]*white-space:nowrap;/);
  assert.match(css, /@media\(max-width:40rem\)\{[\s\S]*?html\[data-page="travel"\] \.outside-hero-media img\{[^}]*object-position:/);
});

test('homepage collapses every asymmetric editorial track at 60rem', async () => {
  const [home] = await readContracts();
  assert.match(home, /@media\(max-width:60rem\)\{\.about-top,\.experience-row,\.experience-detail,\.project-row,\.outside-grid\{grid-template-columns:minmax\(0,1fr\);\}\}/);
  assert.doesNotMatch(home, /\.project-row summary\{/);
});

test('reduced motion exposes content and suppresses grain, spotlight, parallax, and spatial transforms', async () => {
  const [home, detail] = await readContracts();
  assert.match(home, /@media\s*\(prefers-reduced-motion:\s*reduce\)\{[\s\S]*?\[data-reveal\][^}]*opacity:1!important;transform:none!important;transition:none!important;/);
  assert.match(home, /\.grain,\.spot,\.progress\{display:none!important;\}/);
  assert.match(home, /\[data-parallax\] img\{transform:none!important;transition:none!important;\}/);
  assert.match(home, /\.pframe img,[^}]*transform:none!important;transition:none!important;/);
  assert.match(detail, /@media\s*\(prefers-reduced-motion:\s*reduce\)\{html\{scroll-behavior:auto;\}\.progress\{display:none!important;\}\}/);
});

test('reveals remain observer-driven below the fold with no-IO and no-JS fallbacks', async () => {
  const [home] = await readContracts();
  assert.match(home, /<html lang="en" class="no-js"/);
  assert.match(home, /if\(!\('IntersectionObserver' in window\)\)\{revealAll\(\);return;\}/);
  assert.match(home, /var observer=new IntersectionObserver/);
  assert.doesNotMatch(home, /revealTimer|setTimeout\([\s\S]*?revealAll/);
  assert.doesNotMatch(home, /(?<!html\.js\.motion-desktop )\[data-reveal\]\{opacity:0/);
});

test('compact navigation preserves 44px section access through 60rem and on coarse pointers', async () => {
  const [home, detail] = await readContracts();
  assert.match(home, /<details class="compact-nav">[\s\S]*?<summary[^>]*>Sections<\/summary>[\s\S]*?class="compact-links"[^>]*role="navigation"/);
  assert.match(home, /class="compact-links"[^>]*[\s\S]*?href="#about"[\s\S]*?href="#contact"/);
  assert.match(detail, /<details class="compact-nav">[\s\S]*?<summary[^>]*>Sections<\/summary>[\s\S]*?class="compact-links"[^>]*role="navigation"/);
  assert.match(detail, /class="compact-links"[^>]*[\s\S]*?href="#vertex-scope"[\s\S]*?href="#vertex-community"/);
  assert.doesNotMatch(detail, /href="#vertex-attribution"/);
  for (const html of [home, detail]) {
    assert.match(html, /@media \(max-width:60rem\),\(pointer:coarse\)\{[^}]*\.nav \.brand,[^}]*\.lang-switch button,[^}]*\.compact-nav summary,[^}]*\.compact-links a\{min-height:44px;/);
    assert.match(html, /@media \(max-width:60rem\),\(pointer:coarse\)\{\.compact-nav\{display:block;/);
  }
  assert.match(home, /@media \(max-width:60rem\),\(pointer:coarse\)\{\.nav \.links\{display:none;\}\}/);
  assert.match(detail, /@media \(max-width:60rem\),\(pointer:coarse\)\{\.nav \.links,\.back-link\{display:none;\}\}/);
});

test('homepage preserves the required desktop motion contracts without obsolete counters', async () => {
  const [home] = await readContracts();
  assert.match(home, /html\.js\.motion-desktop \.reveal-up\{opacity:0;transform:translateY\(40px\);\}/);
  assert.match(home, /hero\.classList\.add\('loaded'\)/);
  assert.match(home, /\.project-row::after\{[^}]*transform:scaleX\(0\);/);
  assert.match(home, /\.project-row:hover::after,[^}]*\.project-row:focus-visible::after[^}]*transform:scaleX\(1\);/);
  assert.match(home, /html\.js\.motion-desktop \[data-reveal="img"\]\{transform:translateY\(46px\) scale\(1\.04\);\}/);
  assert.match(home, /@media\s*\(pointer:fine\) and \(min-width:40\.001rem\) and \(prefers-reduced-motion:no-preference\)\{\.progress\{display:block;\}\}/);
  assert.match(home, /\.progress\{[^}]*width:100%;[^}]*transform:scaleX\(0\);[^}]*transform-origin:left;/);
  assert.match(home, /html\.js\.motion-desktop \.spot\.on\{opacity:1;\}/);
  assert.match(home, /data-parallax="0\.03"/);
  assert.match(home, /transform:translate3d\(0,var\(--parallax-y,0px\),0\) scale\(1\.08\)/);
  assert.doesNotMatch(home, /data-count|startCount/);
});

test('both routes react to live motion capability changes and gate progress writes', async () => {
  const [home, detail] = await readContracts();
  for (const html of [home, detail]) {
    assert.match(html, /narrowQuery=window\.matchMedia\('\(max-width: 40rem\)'\)/);
    assert.match(html, /reduceQuery=window\.matchMedia\('\(prefers-reduced-motion: reduce\)'\)/);
    assert.match(html, /pointerQuery=window\.matchMedia\('\(pointer: fine\)'\)/);
    assert.match(html, /\[narrowQuery,reduceQuery,pointerQuery\]\.forEach\(function\(query\)\{query\.addEventListener\('change',syncMotionState\);\}\);/);
    assert.match(html, /root\.classList\.toggle\('motion-desktop',motionDesktop\)/);
    assert.match(html, /var progress=h>0\?Math\.min\(1,Math\.max\(0,y\/h\)\):0;[\s\S]*?prog\.style\.transform='scaleX\('\+\(motionDesktop\?progress:0\)\+'\)'/);
    assert.doesNotMatch(html, /prog\.style\.width/);
  }
  assert.match(home, /if\(revealObserver\)\{revealObserver\.disconnect\(\);revealObserver=null;\}/);
  assert.match(home, /var observer=new IntersectionObserver\([\s\S]*?observer\.unobserve\(e\.target\)[\s\S]*?revealObserver=observer;/);
  assert.match(home, /revealEls\.forEach\(function\(el\)\{el\.classList\.add\('in'\);\}\);/);
  assert.match(home, /cancelAnimationFrame\(spotlightFrame\)/);
  assert.match(home, /removeEventListener\('pointermove',onSpotlightMove\)/);
  assert.match(home, /cancelAnimationFrame\(parallaxFrame\)/);
  assert.match(home, /removeEventListener\('scroll',queueParallax\)/);
  assert.match(home, /removeEventListener\('resize',queueParallax\)/);
  assert.match(home, /if\(spotlightListening\)return;/);
  assert.match(home, /if\(parallaxListening\|\|!parallaxItems\.length\)return;/);
});
