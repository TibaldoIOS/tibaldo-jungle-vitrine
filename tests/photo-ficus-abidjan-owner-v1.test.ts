import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { getPlant, getPlantsByGenre } from '../lib/plants/catalog.ts';

const manifest = JSON.parse(readFileSync(new URL('../docs/media-provenance/photo-20260916-ficus-abidjan-01.json', import.meta.url), 'utf8'));
const photo = manifest.photos[0];

test('Abidjan has one exact canonical cultivar entity and preserves the species entity', () => {
  const matches = getPlantsByGenre('ficus').filter(p => p.slug === 'abidjan');
  assert.equal(matches.length, 1);
  assert.equal(matches[0].botanicalName, 'Ficus elastica ‘Abidjan’');
  assert.equal(matches[0].taxonomy.cultivar, 'Abidjan');
  assert.ok(getPlant('ficus', 'elastica'));
});

test('Abidjan preserves the first exact Owner WebP as a verified secondary view', () => {
  const plant = getPlant('ficus', 'abidjan')!;
  const media = plant.gallery[1];
  assert.equal(media.src, photo.public_path);
  assert.equal(media.alt, photo.alt);
  assert.equal(media.caption, 'Photo : TIBALDO');
  assert.equal(media.license?.creator, 'TIBALDO');
  assert.equal(media.license?.status, 'verified');
  const bytes = readFileSync(new URL(`../public${photo.asset_path}`, import.meta.url));
  assert.equal(bytes.toString('ascii', 0, 4), 'RIFF');
  assert.equal(bytes.toString('ascii', 8, 12), 'WEBP');
  assert.equal(createHash('sha256').update(bytes).digest('hex'), photo.sha256);
  assert.equal(getPlantsByGenre('ficus').find(p => p.slug === 'abidjan')?.gallery[1].src, media.src);
});
