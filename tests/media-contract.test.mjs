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
  'assets/music/performance.jpg',
];

test('every newly selected public image exists', async () => {
  for (const path of approved) await access(new URL(path, root));
});

test('homepage uses approved lead images and excludes privacy-risk images', () => {
  for (const path of [approved[0], approved[1], approved[2], approved[4]]) {
    assert.match(home, new RegExp(path.replaceAll('/', '\\/')));
  }
  for (const banned of ['professor_classroom.jpg', 'grand_ball_with_friends.jpg', 'with_professor.jpg']) {
    assert.doesNotMatch(home, new RegExp(banned));
  }
});

test('new media includes intrinsic dimensions and full images retain natural ratios', () => {
  assert.doesNotMatch(home, /<img(?![^>]*width=)(?=[^>]*assets\/(?:internship|project|music)\/)/);
  assert.doesNotMatch(home, /<img(?![^>]*height=)(?=[^>]*assets\/(?:internship|project|music)\/)/);
  assert.match(home, /\.experience-media img[^}]*height:auto/);
});
