import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { mountInitialFragmentNavigation } from '../detail.js';

const css = await readFile(new URL('../detail.css', import.meta.url), 'utf8');
const js = await readFile(new URL('../detail.js', import.meta.url), 'utf8');

const routes = [
  ['projects/campus-campaign.html', 'campus'],
  ['projects/hotel-jazz.html', 'hotel'],
  ['projects/visual-work.html', 'visual'],
  ['outside-work.html', 'outside'],
];

test('every second-layer route has the shared bilingual shell', async () => {
  for (const [path, key] of routes) {
    const html = await readFile(new URL(`../${path}`, import.meta.url), 'utf8');
    assert.match(html, new RegExp(`<html[^>]+data-page="${key}"`));
    assert.match(html, /href="(?:\.\.\/)?detail\.css"/);
    assert.match(html, /src="(?:\.\.\/)?detail\.js"/);
    assert.match(html, /src="(?:\.\.\/)?i18n\.js\?v=20260729-personal-site"/);
    assert.match(html, /data-lang="en"/);
    assert.match(html, /data-lang="zh"/);
    assert.match(html, /href="(?:\.\.\/)?index\.html"/);
  }
});

test('project pages use the approved facts, metadata, and section order', async () => {
  const [campus, hotel] = await Promise.all([
    readFile(new URL('../projects/campus-campaign.html', import.meta.url), 'utf8'),
    readFile(new URL('../projects/hotel-jazz.html', import.meta.url), 'utf8'),
  ]);

  assert.match(campus, /<title>Campus Integrated Campaign \| Mukun Sun<\/title>/);
  assert.match(campus, /<meta name="description" content="Promotion coordination for campus welcome and New Year events across online and offline channels\.">/);
  assert.match(campus, /<link rel="canonical" href="https:\/\/agemoo\.github\.io\/projects\/campus-campaign\.html">/);
  assert.match(campus, /<header class="detail-hero" id="campus-hero"[^>]*>[\s\S]*?<section class="detail-section" id="campus-context"[\s\S]*?<section class="detail-section" id="campus-contribution"[\s\S]*?<section class="detail-section" id="campus-media"/);
  assert.match(campus, /Campus Integrated Campaign/);
  assert.match(campus, /Promotion Team Lead · 2024–2025/);
  assert.match(campus, /Campus welcome and New Year events needed coordinated promotion across online and offline channels\./);
  assert.match(campus, /I led the promotion work, adapted content for each platform, and connected on-site activity with online publishing\./);
  assert.doesNotMatch(campus, /reach|attendance|conversion|team size|team-size/i);

  assert.match(hotel, /<title>Hotel × Jazz \| Mukun Sun<\/title>/);
  assert.match(hotel, /<meta name="description" content="Event concept, partner coordination, WeChat promotion, and visual identity for a hotel and jazz collaboration\.">/);
  assert.match(hotel, /<link rel="canonical" href="https:\/\/agemoo\.github\.io\/projects\/hotel-jazz\.html">/);
  assert.match(hotel, /<header class="detail-hero" id="hotel-hero"[^>]*>[\s\S]*?<section class="detail-section" id="hotel-context"[\s\S]*?<section class="detail-section" id="hotel-contribution"[\s\S]*?<section class="detail-section" id="hotel-media"/);
  assert.match(hotel, /<h1>Hotel × Jazz<\/h1>/);
  assert.match(hotel, /Campaign &amp; Visual Communication · 2024/);
  assert.match(hotel, /A balcony performance connected Ni Jazz Bar with Fengmao Andi Hotel around a hotel-and-art event concept\./);
  assert.match(hotel, /I developed the event concept, coordinated the partners and performance, planned WeChat promotion, and designed a consistent visual identity\./);
});

test('project media uses only approved files at natural dimensions', async () => {
  const [campus, hotel] = await Promise.all([
    readFile(new URL('../projects/campus-campaign.html', import.meta.url), 'utf8'),
    readFile(new URL('../projects/hotel-jazz.html', import.meta.url), 'utf8'),
  ]);
  assert.match(campus, /<img src="\.\.\/assets\/project\/CampusGala\/freshmen_welcome_gala\.jpg" width="1600" height="1067"[^>]*>/);
  assert.match(hotel, /<img src="\.\.\/assets\/project\/Andi\/andi_fest_2\.png" width="1039" height="462" alt="Wide Hotel × Jazz event composition showing the performance and instruments" loading="lazy" decoding="async">/);
  assert.match(hotel, /<img src="\.\.\/assets\/project\/Andi\/andi_fest\.jpg" width="1280" height="960" alt="Audience and performance area at the Hotel × Jazz event" loading="lazy" decoding="async">/);
});

test('enhanced Campus, Hotel, and Outside images keep focusable real-file links', async () => {
  const expectations = [
    ['projects/campus-campaign.html', '../assets/project/CampusGala/freshmen_welcome_gala.jpg'],
    ['projects/hotel-jazz.html', '../assets/project/Andi/andi_fest_2.png'],
    ['projects/hotel-jazz.html', '../assets/project/Andi/andi_fest.jpg'],
    ['outside-work.html', 'assets/music/performance.jpg'],
    ['outside-work.html', 'assets/photography/building.webp'],
    ['outside-work.html', 'assets/photography/chongqing.webp'],
    ['outside-work.html', 'assets/photography/santa_monica_beach.webp'],
    ['outside-work.html', 'assets/photography/tongren.webp'],
    ['outside-work.html', 'assets/photography/walter_disney.webp'],
  ];

  for (const [path, source] of expectations) {
    const html = await readFile(new URL(`../${path}`, import.meta.url), 'utf8');
    const escapedSource = source.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    assert.match(
      html,
      new RegExp(`<a class="media-button" href="${escapedSource}" data-enlarge>\\s*<img src="${escapedSource}"`),
      `${path}: ${source}`,
    );
  }
});

test('selected visual work preserves the approved archive with real image links', async () => {
  const html = await readFile(new URL('../projects/visual-work.html', import.meta.url), 'utf8');
  const lead = [
    ['hotone_main.jpg', 1500, 2120, 'HOTONE · Tenth-Anniversary Poster'],
    ['jazz_coast_a.jpg', 1300, 1828, 'JAZZ NIGHT · Coastline'],
    ['trifold_out.jpg', 1800, 1369, 'Laoshan Folk Arts · Trifold Exterior'],
  ];
  const archive = [
    ['jazz_winter.jpg', 989, 1400, 'Winter Jazz Concert · Hotel Event Visual'],
    ['hotone_guitar.jpg', 1500, 1656, 'HOTONE · Release Your Musical Passion'],
    ['hotone_pedal.jpg', 1500, 1928, 'HOTONE · Ampero II Stomp Detail'],
    ['jazz_coast_b.jpg', 1300, 1828, 'JAZZ NIGHT · Variation'],
    ['piano_a.jpg', 1300, 1838, 'PIANO DUO · Main Poster'],
    ['piano_b.jpg', 1300, 1828, 'PIANO DUO · Variation'],
    ['trifold_in.jpg', 1800, 1369, 'Laoshan Folk Arts · Trifold Interior'],
    ['banner_museum.jpg', 1084, 437, 'International Museum Day · Wuhan Museum'],
    ['bass1.jpg', 1100, 1467, 'Bass · Night Study'],
    ['bass2.jpg', 1100, 1466, 'Bass · Study 02'],
    ['bass3.jpg', 1100, 1467, 'Bass · Study 03'],
  ];

  assert.match(html, /<header class="detail-hero" id="visual-hero"[^>]*>[\s\S]*?<section class="detail-section" id="visual-lead"[\s\S]*?<section class="detail-section" id="visual-archive"/);
  assert.match(html, /A selected archive of event, product, print, and photographic work\./);
  for (const [file, width, height, caption] of [...lead, ...archive]) {
    assert.match(html, new RegExp(`<a class="media-button" href="\\.\\.\\/assets\\/${file}" data-enlarge>`));
    assert.match(html, new RegExp(`<img src="\\.\\.\\/assets\\/${file}" width="${width}" height="${height}"`));
    assert.ok(html.includes(`<figcaption>${caption}</figcaption>`), caption);
  }
  assert.ok(html.indexOf('hotone_main.jpg') < html.indexOf('jazz_coast_a.jpg'));
  assert.ok(html.indexOf('jazz_coast_a.jpg') < html.indexOf('trifold_out.jpg'));
  assert.ok(html.indexOf('trifold_out.jpg') < html.indexOf('jazz_winter.jpg'));
  assert.doesNotMatch(html, /build\/assets|grand_ball_with_friends\.jpg/);
});

test('outside work keeps Music, Photography, and Travel in the approved order', async () => {
  const html = await readFile(new URL('../outside-work.html', import.meta.url), 'utf8');
  assert.match(html, /<title>Outside Work \| Mukun Sun<\/title>/);
  assert.match(html, /<meta name="description" content="Music, photography, and travel that shape how Mukun Sun pays attention to people and atmosphere\.">/);
  assert.match(html, /<link rel="canonical" href="https:\/\/agemoo\.github\.io\/outside-work\.html">/);
  assert.match(html, /<section class="detail-section" id="outside-music"[\s\S]*?<section class="detail-section" id="outside-photography"[\s\S]*?<section class="detail-section" id="outside-travel"/);
  assert.match(html, /I play upright bass in the SUU Jazz Big Band and electric bass in the T-Bird Marching Band\. Music has also led me into concert planning and event coordination\./);
  assert.match(html, /Photography is another way I study light, objects, and atmosphere\./);
  assert.match(html, /Travel and museums are another way I pay attention to place, design, and atmosphere\. This section will grow through original photographs and short notes rather than travel-guide summaries\./);
  const approved = [
    ['assets/music/performance.jpg', 896, 1193],
    ['assets/photography/building.webp', 1448, 1086],
    ['assets/photography/chongqing.webp', 1086, 1448],
    ['assets/photography/santa_monica_beach.webp', 1350, 1800],
    ['assets/photography/tongren.webp', 1086, 1448],
    ['assets/photography/walter_disney.webp', 1086, 1448],
  ];
  for (const [file, width, height] of approved) {
    assert.match(html, new RegExp(`<img src="${file.replaceAll('/', '\\/')}" width="${width}" height="${height}"`));
  }
  assert.doesNotMatch(html, /src="[^"]*(?:professor|classroom|group|grand_ball_with_friends|with_friends)/i);
  assert.doesNotMatch(html, /已生成图像|outside-places|>Places</);
});

test('detail routes expose no-JS content and mount live reveal hooks', async () => {
  for (const [path, key] of routes) {
    const html = await readFile(new URL(`../${path}`, import.meta.url), 'utf8');
    assert.match(html, new RegExp(`<html lang="en" class="no-js" data-language="en" data-page="${key}">`));
    assert.match(html, new RegExp(`<header class="detail-hero" id="${key}-hero" data-reveal>`));
    const sections = html.match(/<section class="detail-section"[^>]*>/g) ?? [];
    const media = html.match(/<figure class="detail-media"[^>]*>/g) ?? [];
    assert.ok(sections.length > 0, `${path}: sections`);
    assert.ok(media.length > 0, `${path}: media`);
    assert.equal(sections.every((tag) => tag.includes('data-reveal')), true, `${path}: section reveals`);
    assert.equal(media.every((tag) => tag.includes('data-reveal="media"')), true, `${path}: media reveals`);
    assert.match(html, /root\.className=root\.className\.replace\('no-js','js'\)/);
    assert.match(html, new RegExp(`<dialog class="image-dialog" id="${key}-dialog"`));
    assert.match(html, /data-dialog-close/);
    assert.match(html, new RegExp(`<footer class="footer" id="${key}-footer"`));
  }
});

test('detail reveals use restrained capability-gated motion with complete fallbacks', () => {
  assert.match(css, /html\.js\.motion-detail \[data-reveal\]\{opacity:0;/);
  assert.match(css, /html\.js\.motion-detail \[data-reveal="media"\][^}]*scale\(1\.015\)/);
  assert.match(css, /@media\(max-width:40rem\),\(pointer:coarse\)\{\[data-reveal\][^}]*opacity:1!important;transform:none!important;transition:none!important;/);
  assert.match(css, /@media\(prefers-reduced-motion:reduce\)\{html\{scroll-behavior:auto\}[^}]*\[data-reveal\][^}]*opacity:1!important;transform:none!important;transition:none!important;/);
  assert.match(js, /const narrowQuery = window\.matchMedia\?\.\('\(max-width: 40rem\)'\)/);
  assert.match(js, /const pointerQuery = window\.matchMedia\?\.\('\(pointer: fine\)'\)/);
  assert.match(js, /root\.classList\.toggle\('motion-detail', motionEnabled\)/);
  assert.match(js, /revealObserver\?\.disconnect\(\)/);
  assert.match(js, /\[narrowQuery, reduceQuery, pointerQuery\]\.forEach/);
});

test('shared detail footer separates its children and stacks at narrow widths', () => {
  assert.match(css, /\.footer\{[^}]*width:min\(100% - 2 \* clamp\(20px,5vw,80px\),1240px\);[^}]*display:flex;[^}]*gap:var\(--space-sm\);[^}]*border-top:1px solid var\(--color-rule\);/);
  assert.match(css, /\.footer a\{[^}]*display:flex;[^}]*min-height:44px;/);
  assert.match(css, /@media\(max-width:40rem\)\{[^}]*\.footer\{flex-direction:column;align-items:flex-start;/);
});

test('detail shell uses locked tokens and balanced safe grids', () => {
  assert.match(css, /@import url\(['"]tokens\.css['"]\)/);
  assert.doesNotMatch(css, /#[0-9a-f]{3,8}\b|rgba?\(|hsla?\(|oklch\(/i);
  assert.match(css, /grid-template-columns:[^;}]*minmax\(0,/);
  assert.match(css, /\.detail-media img[^}]*height:auto/);
  assert.match(css, /html[^}]*overflow-x:clip/);
  assert.match(css, /body[^}]*overflow-x:clip/);
});

test('image dialog supports keyboard close and focus restoration', () => {
  assert.match(js, /export function mountImageDialog\(dialog\)/);
  assert.match(js, /event\.key === 'Escape'/);
  assert.match(js, /previousFocus\?\.focus\(\)/);
  assert.match(js, /dialog\.close\(\)/);
});

test('Outside Work captures only approved initial fragments before body parsing', async () => {
  const html = await readFile(new URL('../outside-work.html', import.meta.url), 'utf8');
  assert.match(html, /window\.__initialOutsideHash = window\.location\.hash/);
  for (const hash of ['#outside-music', '#outside-photography', '#outside-travel']) assert.match(html, new RegExp(hash));
  assert.match(html, /window\.history\.replaceState\(null, '', window\.location\.pathname \+ window\.location\.search\)/);
  assert.doesNotMatch(html, /#outside-places/);
});

test('initial fragment enhancement scrolls smoothly only for motion-capable desktop', () => {
  const calls = [];
  const frames = [];
  const target = {
    classList: { add: (value) => calls.push(['class', value]) },
    scrollIntoView: (value) => calls.push(['scroll', value]),
  };
  const view = {
    __initialOutsideHash: '#outside-photography',
    location: { pathname: '/outside-work.html', search: '?lang=en' },
    history: { replaceState: (...args) => calls.push(['history', ...args]) },
    matchMedia: () => ({ matches: true }),
  };
  const mounted = mountInitialFragmentNavigation({
    window: view,
    document: { querySelector: (selector) => selector === '#outside-photography' ? target : null },
    requestAnimationFrame: (callback) => frames.push(callback),
  });
  assert.equal(mounted, true);
  frames.shift()();
  frames.shift()();
  assert.deepEqual(calls.find(([type]) => type === 'scroll'), ['scroll', { behavior: 'smooth', block: 'start' }]);
  assert.deepEqual(calls.find(([type]) => type === 'history'), ['history', null, '', '/outside-work.html?lang=en#outside-photography']);
});

test('initial fragment enhancement falls back to auto and ignores invalid targets', () => {
  const calls = [];
  const target = { classList: { add() {} }, scrollIntoView: (value) => calls.push(value) };
  const immediate = (callback) => callback();
  const base = {
    location: { pathname: '/outside-work.html', search: '' },
    history: { replaceState() {} },
    matchMedia: () => ({ matches: false }),
  };
  assert.equal(mountInitialFragmentNavigation({
    window: { ...base, __initialOutsideHash: '#outside-travel' },
    document: { querySelector: () => target },
    requestAnimationFrame: immediate,
  }), true);
  assert.deepEqual(calls.at(-1), { behavior: 'auto', block: 'start' });
  assert.equal(mountInitialFragmentNavigation({
    window: { ...base, __initialOutsideHash: '#outside-invalid' },
    document: { querySelector: () => target },
    requestAnimationFrame: immediate,
  }), false);
});

test('detail navigation exposes a 44px compact section control at narrow widths', () => {
  assert.match(css, /\.compact-nav\{display:none/);
  assert.match(css, /\.compact-nav summary\{[^}]*min-height:44px/);
  assert.match(css, /@media\(max-width:60rem\)\{[^}]*\.compact-nav\{display:block/);
});
