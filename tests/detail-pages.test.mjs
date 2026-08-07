import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const css = await readFile(new URL('../detail.css', import.meta.url), 'utf8');
const js = await readFile(new URL('../detail.js', import.meta.url), 'utf8');
const home = await readFile(new URL('../index.html', import.meta.url), 'utf8');

const routes = [
  ['projects/campus-campaign.html', 'campus'],
  ['projects/hotel-jazz.html', 'hotel'],
  ['projects/visual-work.html', 'visual'],
  ['music.html', 'music'],
  ['photography.html', 'photography'],
  ['travel.html', 'travel'],
];

test('home and detail navigation share the restrained glass material', () => {
  assert.match(home, /\.nav\{[^}]*background:var\(--effect-nav-surface-soft\);[^}]*backdrop-filter:blur\(var\(--effect-nav-blur\)\) saturate\(var\(--effect-nav-saturation\)\);/);
  assert.match(css, /\.detail-nav\{[^}]*background:var\(--effect-nav-surface-soft\);[^}]*backdrop-filter:blur\(var\(--effect-nav-blur\)\) saturate\(var\(--effect-nav-saturation\)\);/);
  assert.match(home, /\.nav\.solid\{background:var\(--effect-nav-surface\);/);
  assert.match(css, /\.detail-nav\.solid\{background:var\(--effect-nav-surface\);/);
});

test('every second-layer route has the shared bilingual shell', async () => {
  for (const [path, key] of routes) {
    const html = await readFile(new URL(`../${path}`, import.meta.url), 'utf8');
    assert.match(html, new RegExp(`<html[^>]+data-page="${key}"`));
    assert.match(html, /href="(?:\.\.\/)?detail\.css\?v=20260806-title-update"/);
    assert.match(html, /src="(?:\.\.\/)?detail\.js\?v=20260806-title-update"/);
    assert.match(html, /src="(?:\.\.\/)?i18n\.js\?v=20260806-title-update"/);
    assert.equal((html.match(/i18n\.js\?v=/g) ?? []).length, 1, `${path}: one i18n module instance`);
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
  assert.match(campus, /<link rel="canonical" href="https:\/\/mukunsun\.github\.io\/projects\/campus-campaign\.html">/);
  assert.match(campus, /<header class="detail-hero" id="campus-hero"[^>]*>[\s\S]*?<section class="detail-section" id="campus-context"[\s\S]*?<section class="detail-section" id="campus-contribution"[\s\S]*?<section class="detail-section" id="campus-media"/);
  assert.match(campus, /Campus Integrated Campaign/);
  assert.match(campus, /Promotion Team Lead · 2024–2025/);
  assert.match(campus, /Campus welcome and New Year events needed coordinated promotion across online and offline channels\./);
  assert.match(campus, /I led the promotion work, adapted content for each platform, and connected on-site activity with online publishing\./);
  assert.doesNotMatch(campus, /reach|attendance|conversion|team size|team-size/i);

  assert.match(hotel, /<title>Hotel × Jazz \| Mukun Sun<\/title>/);
  assert.match(hotel, /<meta name="description" content="Event concept, partner coordination, WeChat promotion, and visual identity for a hotel and jazz collaboration\.">/);
  assert.match(hotel, /<link rel="canonical" href="https:\/\/mukunsun\.github\.io\/projects\/hotel-jazz\.html">/);
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

test('enhanced Campus, Hotel, and Music images keep focusable real-file links', async () => {
  const expectations = [
    ['projects/campus-campaign.html', '../assets/project/CampusGala/freshmen_welcome_gala.jpg'],
    ['projects/hotel-jazz.html', '../assets/project/Andi/andi_fest_2.png'],
    ['projects/hotel-jazz.html', '../assets/project/Andi/andi_fest.jpg'],
    ['music.html', 'assets/music/suu_jazz_fest/playing.webp'],
    ['music.html', 'assets/music/suu_jazz_fest/performance.jpg'],
    ['music.html', 'assets/music/jazz_in_the_room/jazz_in_the_room.jpg'],
    ['music.html', 'assets/music/grand_ball/headshot.webp'],
    ['music.html', 'assets/music/nomination/with_friends.jpg'],
    ['music.html', 'assets/music/jam_session/jam.webp'],
    ['music.html', 'assets/music/jazz_concert/jazz_concert.webp'],
    ['music.html', 'assets/music/tbird_marching_band/TMB.webp'],
    ['music.html', 'assets/music/welcome-gala/freshmen_welcome_gala.jpg'],
    ['music.html', 'assets/music/environment/environment.webp'],
    ['music.html', 'assets/music/mentors/daren_burns.webp'],
    ['music.html', 'assets/music/mentors/xun_sun.webp'],
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

test('selected visual work preserves the approved gallery with real image links', async () => {
  const html = await readFile(new URL('../projects/visual-work.html', import.meta.url), 'utf8');
  const gallery = [
    ['visual_work/hotone_main.jpg', 1486, 2106, 'HOTONE · Tenth-Anniversary Poster'],
    ['visual_work/hotone_guitar.jpg', 1141, 1626, 'HOTONE · Release Your Musical Passion'],
    ['visual_work/hotone_pedal.jpg', 1322, 1880, 'HOTONE · Ampero II Stomp Detail'],
    ['visual_work/jazz_coast_a.png', 1086, 1448, 'JAZZ NIGHT · Coastline'],
    ['visual_work/jazz_coast_b.png', 1086, 1448, 'JAZZ NIGHT · Variation'],
    ['visual_work/trifold_out.jpg', 1800, 1369, 'Laoshan Folk Arts · Trifold Exterior'],
    ['visual_work/trifold_in.jpg', 1800, 1369, 'Laoshan Folk Arts · Trifold Interior'],
    ['visual_work/jazz_winter.jpg', 989, 1400, 'Winter Jazz Concert · Hotel Event Visual'],
    ['visual_work/banner_museum.png', 1983, 793, 'International Museum Day · Wuhan Museum'],
  ];

  assert.match(html, /<header class="detail-hero" id="visual-hero"[^>]*>[\s\S]*?<section class="detail-section" id="visual-gallery"/);
  assert.match(html, /Event, product, print, and photographic work\./);
  assert.doesNotMatch(html, /visual-lead|visual-archive/);
  for (const [file, width, height, caption] of gallery) {
    assert.match(html, new RegExp(`<a class="media-button" href="\\.\\.\\/assets\\/${file}" data-enlarge>`));
    assert.match(html, new RegExp(`<img src="\\.\\.\\/assets\\/${file}" width="${width}" height="${height}"`));
    assert.ok(html.includes(`<figcaption>${caption}</figcaption>`), caption);
  }
  assert.ok(html.indexOf('hotone_main.jpg') < html.indexOf('hotone_guitar.jpg'));
  assert.ok(html.indexOf('hotone_guitar.jpg') < html.indexOf('hotone_pedal.jpg'));
  assert.ok(html.indexOf('hotone_pedal.jpg') < html.indexOf('jazz_coast_a.png'));
  assert.ok(html.indexOf('jazz_coast_a.png') < html.indexOf('jazz_coast_b.png'));
  assert.ok(html.indexOf('jazz_coast_b.png') < html.indexOf('trifold_out.jpg'));
  assert.ok(html.indexOf('trifold_out.jpg') < html.indexOf('trifold_in.jpg'));
  assert.ok(html.indexOf('trifold_in.jpg') < html.indexOf('jazz_winter.jpg'));
  assert.ok(html.indexOf('jazz_winter.jpg') < html.indexOf('banner_museum.png'));
  assert.match(html, /visual-feature[\s\S]*?hotone_main\.jpg/);
  assert.doesNotMatch(html, /build\/assets|grand_ball_with_friends\.jpg|bass[123]\.jpg/);
});

test('project detail titles preserve whole words at a coordinated display scale', () => {
  assert.match(css, /html\[data-page="campus"\][^,]*,html\[data-page="hotel"\][^,]*,html\[data-page="visual"\][^{]*\{[^}]*font-size:clamp\(3rem,5vw,5rem\);[^}]*overflow-wrap:anywhere;[^}]*word-break:normal;[^}]*hyphens:none;/);
  assert.match(css, /html\[data-page="teaching"\] \.detail-hero h1\{[^}]*font-size:clamp\(3rem,5vw,5rem\);[^}]*word-break:normal;[^}]*hyphens:none;/);
});

test('music route keeps the approved content and media', async () => {
  const html = await readFile(new URL('../music.html', import.meta.url), 'utf8');
  assert.match(html, /<title>Music \| Mukun Sun<\/title>/);
  assert.match(html, /<meta name="description" content="Performances, music projects, and study in upright and electric bass by Mukun Sun\.">/);
  assert.match(html, /<link rel="canonical" href="https:\/\/mukunsun\.github\.io\/music\.html">/);
  assert.match(html, /<header class="detail-hero" id="music-hero"[^>]*>[\s\S]*?<section[^>]+id="music-intro"[\s\S]*?<section[^>]+id="music-timeline"[\s\S]*?<section[^>]+id="music-study"/);
  assert.match(html, /I play upright and electric bass, but much of my music work also happens before the stage: arranging, organizing rehearsals, coordinating venues, and building an event around a band\./);
  const approved = [
    ['assets/music/suu_jazz_fest/playing.webp', 1726, 964],
    ['assets/music/suu_jazz_fest/performance.jpg', 896, 1193],
    ['assets/music/jazz_in_the_room/jazz_in_the_room.jpg', 1446, 903],
    ['assets/music/grand_ball/headshot.webp', 1086, 1448],
    ['assets/music/nomination/with_friends.jpg', 1279, 1706],
    ['assets/music/jam_session/jam.webp', 1672, 941],
    ['assets/music/jazz_concert/jazz_concert.webp', 1448, 1086],
    ['assets/music/tbird_marching_band/TMB.webp', 1086, 1448],
    ['assets/music/welcome-gala/freshmen_welcome_gala.jpg', 1440, 960],
    ['assets/music/environment/environment.webp', 1448, 1086],
    ['assets/music/mentors/daren_burns.webp', 1086, 1448],
    ['assets/music/mentors/xun_sun.webp', 1920, 1280],
  ];
  for (const [file, width, height] of approved) {
    assert.match(html, new RegExp(`<img src="${file.replaceAll('/', '\\/')}" width="${width}" height="${height}"`));
  }
  assert.doesNotMatch(html, /assets\/music\/performance\.jpg|grand_ball_with_friends\.jpg|grand_ball\/grand_ball\.jpg/i);
  assert.doesNotMatch(html, /已生成图像|outside-photography|outside-travel|>Places</);
  assert.match(html, /id="music-fashion-show"[^>]*class="music-event music-event--media"|class="music-event music-event--media"[^>]*id="music-fashion-show"/);
  assert.match(html, /id="music-fashion-show"[\s\S]*?class="detail-media music-event-media"[\s\S]*?environment\.webp/);
  assert.match(html, /id="music-tbird"[^>]*class="music-event music-event--media"|class="music-event music-event--media"[^>]*id="music-tbird"/);
  assert.match(html, /id="music-tbird"[\s\S]*?tbird_marching_band\/TMB\.webp/);
  assert.match(html, /id="music-ni-jazz-bar"[^>]*class="music-event music-event--media"|class="music-event music-event--media"[^>]*id="music-ni-jazz-bar"/);
  assert.match(html, /id="music-ni-jazz-bar"[\s\S]*?jam_session\/jam\.webp/);
  assert.match(html, /id="music-study-burns"[\s\S]*?daren_burns\.webp/);
  assert.match(html, /id="music-study-sun"[\s\S]*?xun_sun\.webp/);
});

test('music history presents verified performances, production work, and study in reverse chronology', async () => {
  const html = await readFile(new URL('../music.html', import.meta.url), 'utf8');
  const orderedIds = [
    'music-artist-finalist', 'music-student-center', 'music-grand-ball', 'music-tbird',
    'music-jazz-fest', 'music-campus-concert', 'music-welcome-gala', 'music-ni-jazz-bar',
    'music-fashion-show',
  ];
  for (const id of orderedIds) assert.match(html, new RegExp(`id="${id}"`));
  for (let index = 1; index < orderedIds.length; index += 1) {
    assert.ok(html.indexOf(orderedIds[index - 1]) < html.indexOf(orderedIds[index]));
  }
  assert.match(html, /Finalist · SUU International Student Artist/);
  assert.match(html, /Independent Jazz Concert/);
  assert.match(html, /Just the Two of Us/);
  assert.match(html, /Studied jazz bass with American bassist Daren Burns in Beijing\./);
  assert.match(html, /Studied with SUU professor Xun Sun\./);
  assert.match(html, /href="https:\/\/www\.youtube\.com\/live\/OFijT_vkp8c\?si=OqEdKbXtynljWJtd"/);
  assert.match(html, /id="music-student-center"[\s\S]*?href="https:\/\/www\.youtube\.com\/live\/y3Lp73YiS2k\?si=wjjuUlMY8UmV4IxE" target="_blank" rel="noopener noreferrer"/);
  const fashion = html.match(/<article class="music-event music-event--media" id="music-fashion-show">[\s\S]*?<\/article>/)?.[0] ?? '';
  assert.equal((fashion.match(/<figure /g) ?? []).length, 1);
  assert.match(fashion, /environment\/environment\.webp/);
  assert.doesNotMatch(fashion, /me_playing_bass\.webp/);
  assert.doesNotMatch(html, /Sun Xun/);
  assert.match(html, /SUU professor Xun Sun/);
});

test('photography owns the supplied images and travel is a factual text ledger', async () => {
  const [photography, travel] = await Promise.all([
    readFile(new URL('../photography.html', import.meta.url), 'utf8'),
    readFile(new URL('../travel.html', import.meta.url), 'utf8'),
  ]);
  const photographyMedia = [
    ['building.webp', 1448, 1086, 'Blue and concrete'],
    ['chongqing.webp', 1086, 1448, 'Chongqing · Night structure'],
    ['walter_disney.webp', 1086, 1448, 'Walt Disney Concert Hall · Curves'],
    ['santa_monica_beach.webp', 1350, 1800, 'Santa Monica · Sunset'],
    ['tongren.webp', 1086, 1448, 'Tongren · Water and paths'],
    ['boats.webp', 1448, 1086, 'San Francisco · Boats on blue water'],
    ['the_strip.webp', 1086, 1448, 'Las Vegas · The Strip'],
  ];
  for (const [file, width, height, caption] of photographyMedia) {
    assert.match(photography, new RegExp(`<a class="media-button" href="assets/photography/${file}" data-enlarge>\\s*<img src="assets/photography/${file}" width="${width}" height="${height}"`));
    assert.ok(photography.includes(`<figcaption>${caption}</figcaption>`), caption);
    assert.doesNotMatch(travel, new RegExp(file.replace('.', '\\.')));
  }
  assert.match(travel, /<div class="travel-ledger">/);
  for (const place of ['Los Angeles', 'San Diego', 'San Francisco', 'Las Vegas', 'Cedar City', 'Zion N.P.', 'Beijing', 'Hong Kong', 'Wuhan', 'Tongren', 'Chengdu']) {
    assert.match(travel, new RegExp(place.replace('.', '\\.')));
  }
  assert.doesNotMatch(travel, /assets\/photography\/|<figure|data-enlarge|<time|itinerary|recommend/i);
});

test('photography presents consistent orientation frames while full sources remain enlargeable', async () => {
  const photography = await readFile(new URL('../photography.html', import.meta.url), 'utf8');
  assert.equal((photography.match(/photography-frame--landscape/g) ?? []).length, 2);
  assert.equal((photography.match(/photography-frame--portrait/g) ?? []).length, 5);
  assert.match(photography, /photography-frame--portrait[\s\S]*?href="assets\/photography\/the_strip\.webp" data-enlarge[\s\S]*?<img src="assets\/photography\/the_strip\.webp" width="1086" height="1448"/);
  assert.match(css, /\.photography-frame--portrait \.media-button\{[^}]*aspect-ratio:3\/4;[^}]*overflow:hidden;/);
  assert.match(css, /\.photography-frame--landscape \.media-button\{[^}]*aspect-ratio:4\/3;[^}]*overflow:hidden;/);
  assert.match(css, /\.photography-frame \.media-button img\{[^}]*height:100%;[^}]*object-fit:cover;/);
});

test('photography gallery uses a full-width heading band above the image sequence', async () => {
  const photography = await readFile(new URL('../photography.html', import.meta.url), 'utf8');
  assert.match(photography, /id="photography-gallery"[\s\S]*?class="photography-gallery-head"[\s\S]*?id="photography-gallery-title"[\s\S]*?class="photography-intro"[\s\S]*?class="photography-gallery-body"[\s\S]*?class="photography-sequence"/);
  assert.match(css, /#photography-gallery\{[^}]*display:block;/);
  assert.match(css, /\.photography-gallery-head\{[^}]*grid-template-columns:minmax\(0,1fr\) minmax\(0,[^)]+\);[^}]*border-top:1px solid var\(--color-rule\);[^}]*border-bottom:1px solid var\(--color-rule\);/);
  assert.match(css, /\.photography-gallery-head h2\{[^}]*white-space:nowrap;[^}]*overflow-wrap:normal;/);
  assert.match(css, /\.photography-frame--landscape\{[^}]*grid-column:1\/-1;[^}]*max-width:none;/);
});

test('outside-work heroes use route-owned images with stable editorial overlays', async () => {
  const pages = [
    ['music.html', 'music', 'assets/music/suu_jazz_fest/playing.webp'],
    ['photography.html', 'photography', 'assets/photography/the_strip.webp'],
    ['travel.html', 'travel', 'assets/travel/bryce_canyon.webp'],
  ];
  for (const [path, key, image] of pages) {
    const html = await readFile(new URL(`../${path}`, import.meta.url), 'utf8');
    assert.match(html, new RegExp(`<header class="detail-hero" id="${key}-hero" data-outside-hero data-reveal>`));
    assert.match(html, new RegExp(`<div class="outside-hero-media" aria-hidden="true">\\s*<img src="${image.replaceAll('/', '\\/')}"`));
  }
  const travel = await readFile(new URL('../travel.html', import.meta.url), 'utf8');
  assert.doesNotMatch(travel, /assets\/photography\//);
  assert.match(css, /\.detail-hero\[data-outside-hero\]\{[^}]*position:relative;[^}]*overflow:hidden;/);
  assert.match(css, /\.outside-hero-media::after\{[^}]*background:var\(--hero-scrim,var\(--outside-hero-scrim\)\);/);
  assert.match(css, /\.outside-hero-media::before\{[^}]*background:var\(--outside-hero-nav-scrim\);/);
  assert.match(css, /\.outside-hero-media img\{[^}]*filter:brightness\(var\(--hero-brightness,var\(--effect-outside-brightness\)\)\) saturate\(var\(--hero-saturation,var\(--effect-outside-saturation\)\)\);/);
  assert.match(css, /html\[data-page="music"\] \.detail-hero\[data-outside-hero\]\{[^}]*--hero-brightness:var\(--effect-music-hero-brightness\);[^}]*--hero-scrim:var\(--music-hero-scrim\);/);
  assert.match(css, /html\[data-page="travel"\] \.detail-hero\[data-outside-hero\]\{[^}]*--hero-brightness:var\(--effect-travel-hero-brightness\);[^}]*--hero-scrim:var\(--travel-hero-scrim\);/);
  assert.match(css, /html\[data-page="photography"\] \.detail-hero h1\{[^}]*white-space:nowrap;/);
  assert.match(css, /html\[data-page="photography"\] \.detail-hero\[data-outside-hero\] h1\{[^}]*grid-column:1\/-1;/);
  assert.match(css, /html\[data-page="photography"\] \.detail-hero\[data-outside-hero\] \.detail-hero-copy\{[^}]*grid-column:2;/);
});

test('detail routes expose no-JS content and mount live reveal hooks', async () => {
  for (const [path, key] of routes) {
    const html = await readFile(new URL(`../${path}`, import.meta.url), 'utf8');
    assert.match(html, new RegExp(`<html lang="en" class="no-js" data-language="en" data-page="${key}">`));
    assert.match(html, new RegExp(`<header class="detail-hero" id="${key}-hero"(?: data-outside-hero)? data-reveal>`));
    const sections = html.match(/<section class="[^"]*\bdetail-section\b[^"]*"[^>]*>/g) ?? [];
    const media = html.match(/<figure class="[^"]*\bdetail-media\b[^"]*"[^>]*>/g) ?? [];
    assert.ok(sections.length > 0, `${path}: sections`);
    if (key === 'travel') assert.equal(media.length, 0, `${path}: text-only route`);
    else assert.ok(media.length > 0, `${path}: media`);
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

test('detail shell does not create a second unversioned i18n module instance', () => {
  assert.doesNotMatch(js, /(?:import|from)\s*['"]\.\/i18n\.js['"]/);
});

test('detail navigation exposes a 44px compact section control at narrow widths and on coarse pointers', () => {
  assert.match(css, /\.compact-nav\{display:none/);
  assert.match(css, /\.compact-nav summary\{[^}]*min-height:44px/);
  assert.match(css, /@media\(max-width:60rem\),\(pointer:coarse\)\{\.compact-nav\{display:block/);
});
