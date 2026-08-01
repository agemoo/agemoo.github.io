import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const home = await readFile(new URL('index.html', root), 'utf8');

const approved = [
  'assets/internship/VertexMkt/1.jpg',
  'assets/internship/SUU_TA/classroom.jpg',
  'assets/project/CampusGala/freshmen_welcome_gala.jpg',
  'assets/project/Andi/andi_fest_2.png',
  'assets/project/Andi/andi_fest.jpg',
  'assets/jazz_winter.jpg',
  'assets/music/suu_jazz_fest/performance.jpg',
  'assets/music/suu_jazz_fest/playing.webp',
  'assets/music/jazz_in_the_room/jazz_in_the_room.jpg',
  'assets/music/grand_ball/headshot.webp',
  'assets/music/nomination/with_friends.jpg',
  'assets/music/jazz_concert/jazz_concert.jpg',
  'assets/music/welcome-gala/freshmen_welcome_gala.jpg',
  'assets/music/environment/environment.webp',
  'assets/music/environment/me_playing_bass.webp',
  'assets/music/mentors/Daren Burns.jpg',
  'assets/photography/building.webp',
  'assets/photography/chongqing.webp',
  'assets/photography/santa_monica_beach.webp',
  'assets/photography/tongren.webp',
  'assets/photography/walter_disney.webp',
  'assets/photography/boats.webp',
];

test('every newly selected public image exists', async () => {
  for (const path of approved) await access(new URL(path, root));
});

test('homepage uses approved lead images and excludes privacy-risk images', () => {
  for (const path of [approved[0], approved[1], approved[2], approved[3], approved[5], approved[6]]) {
    assert.match(home, new RegExp(path.replaceAll('/', '\\/')));
  }
  assert.match(home, /assets\/photography\/walter_disney\.webp/);
  assert.match(home, /class="project-row project-row--visual"[\s\S]*?src="assets\/jazz_winter\.jpg" width="989" height="1400" alt="Winter Jazz Concert key visual poster designed for a hotel jazz event"/);
  assert.doesNotMatch(home, /class="project-row project-row--visual"[\s\S]*?src="build\/assets\/hotone_main\.jpg"/);
  assert.doesNotMatch(home, /已生成图像/);
  for (const banned of ['professor_classroom.jpg', 'grand_ball_with_friends.jpg', 'with_professor.jpg']) {
    assert.doesNotMatch(home, new RegExp(banned));
  }
});

test('production copy uses Rednote naming instead of Xiaohongshu', async () => {
  const production = [
    home,
    await readFile(new URL('i18n.js', root), 'utf8'),
    ...await Promise.all([
      'projects/campus-campaign.html',
      'projects/hotel-jazz.html',
      'projects/vertex-reddit.html',
      'projects/visual-work.html',
      'outside-work.html',
    ].map((path) => readFile(new URL(path, root), 'utf8'))),
  ].join('\n');
  assert.doesNotMatch(production, /xiaohongshu|小红书/i);
});

test('new media includes intrinsic dimensions and full images retain natural ratios', () => {
  assert.doesNotMatch(home, /<img(?![^>]*width=)(?=[^>]*assets\/(?:internship|project|music)\/)/);
  assert.doesNotMatch(home, /<img(?![^>]*height=)(?=[^>]*assets\/(?:internship|project|music)\/)/);
  assert.match(home, /\.experience-media img[^}]*height:auto/);
});

test('Photography alone owns the approved photographs with intrinsic dimensions', async () => {
  const [photography, travel] = await Promise.all([
    readFile(new URL('photography.html', root), 'utf8'),
    readFile(new URL('travel.html', root), 'utf8'),
  ]);
  assert.equal((photography.match(/assets\/photography\/(?:building|chongqing|santa_monica_beach|tongren|walter_disney|boats)\.webp/g) ?? []).length, 12);
  assert.doesNotMatch(photography, /<img(?![^>]*width=)(?=[^>]*assets\/photography\/)/);
  assert.doesNotMatch(photography, /<img(?![^>]*height=)(?=[^>]*assets\/photography\/)/);
  assert.doesNotMatch(photography, /assets\/photography\/(?!building|chongqing|santa_monica_beach|tongren|walter_disney|boats)[^"']+/);
  assert.doesNotMatch(travel, /assets\/photography\/|<figure|data-enlarge/);
});
