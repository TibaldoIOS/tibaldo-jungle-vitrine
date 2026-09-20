import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { getPlant, getPlantsByGenre, plants } from '../lib/plants/catalog.ts';

const manifest = JSON.parse(readFileSync(new URL('../docs/media-provenance/photo-20260917-dracaena-hahnii-01.json', import.meta.url), 'utf8'));
const photo = manifest.photos[0];

test('Dracaena trifasciata Hahnii has one canonical entity and exact Owner media', () => {
  const plant = getPlant('sansevieria', 'hahnii')!;
  assert.ok(plant);
  assert.equal(plants.filter(p => p.genre === 'sansevieria' && p.slug === 'hahnii').length, 1);
  assert.equal(plant.botanicalName, 'Dracaena trifasciata ‘Hahnii’');
  assert.equal(plant.taxonomy.species, 'Dracaena trifasciata');
  assert.equal(plant.taxonomy.cultivar, 'Hahnii');
  assert.ok(plant.synonyms.includes('Sansevieria trifasciata ‘Hahnii’'));
  const media = plant.gallery.find(item => item.src === photo.public_path)!;
  assert.ok(media);
  assert.equal(media.src, photo.public_path);
  assert.equal(media.alt, photo.alt);
  assert.equal(media.caption, 'Photo : TIBALDO');
  assert.equal(media.license?.creator, 'TIBALDO');
  assert.equal(media.license?.status, 'verified');
  const bytes = readFileSync(new URL(`../public${photo.asset_path}`, import.meta.url));
  assert.equal(bytes.toString('ascii', 0, 4), 'RIFF');
  assert.equal(bytes.toString('ascii', 8, 12), 'WEBP');
  assert.equal(createHash('sha256').update(bytes).digest('hex'), photo.sha256);
  assert.ok(getPlantsByGenre('sansevieria').find(p => p.slug === 'hahnii')?.gallery.some(item => item.src === media.src));
});
