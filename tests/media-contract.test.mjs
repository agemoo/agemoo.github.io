import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const home = await readFile(new URL('index.html', root), 'utf8');

const approved = [
  'assets/internship/SUU_TA/me_classroom.jpg',
  'assets/project/CampusGala/freshmen_welcome_gala.jpg',
  'assets/project/Andi/andi_fest_2.png',
  'assets/project/Andi/andi_fest.jpg',
  'assets/jazz_winter.jpg',
  'assets/music/performance.jpg',
  'assets/photography/building.webp',
  'assets/photography/chongqing.webp',
  'assets/photography/santa_monica_beach.webp',
  'assets/photography/tongren.webp',
  'assets/photography/walter_disney.webp',
];

test('every newly selected public image exists', async () => {
  for (const path of approved) await access(new URL(path, root));
});

test('homepage uses approved lead images and excludes privacy-risk images', () => {
  for (const path of [approved[0], approved[1], approved[2], approved[4]]) {
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
