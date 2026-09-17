import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { getPlant, getPlantsByGenre, plants } from '../lib/plants/catalog.ts';
import { toVerifiedMediaApiFields } from '../lib/plants/verified-media-api-contract.ts';

const manifest = JSON.parse(readFileSync(new URL('../docs/media-provenance/photo-20260917-anthurium-silver-blush-01.json', import.meta.url), 'utf8'));
const photo = manifest.photos[0];

test('Anthurium Silver Blush has one cautious canonical entity and exact Owner media', () => {
  const plant = getPlant('anthurium', 'silver-blush')!;
  assert.ok(plant);
  assert.equal(plants.filter(p => p.genre === 'anthurium' && p.slug === 'silver-blush').length, 1);
  assert.equal(plant.botanicalName, 'Anthurium ‘Silver Blush’');
  assert.equal(plant.taxonomy.species, 'Rattachement spécifique non confirmé');
  assert.equal(plant.taxonomy.cultivar, null);
  assert.notEqual(plant.slug, 'forgetii-dark-form-silver-blush');
  const media = plant.gallery[0];
  assert.equal(media.src, photo.public_path);
  assert.equal(media.alt, photo.alt);
  assert.equal(media.caption, 'Photo : TIBALDO');
  assert.equal(media.license?.creator, 'TIBALDO');
  assert.equal(media.license?.status, 'verified');
  const bytes = readFileSync(new URL(`../public${photo.asset_path}`, import.meta.url));
  assert.equal(bytes.toString('ascii', 0, 4), 'RIFF');
  assert.equal(bytes.toString('ascii', 8, 12), 'WEBP');
  assert.equal(createHash('sha256').update(bytes).digest('hex'), photo.sha256);
  assert.equal(getPlantsByGenre('anthurium').find(p => p.slug === 'silver-blush')?.gallery[0].src, media.src);
  const api = toVerifiedMediaApiFields(plant, 'photo-wave-test');
  assert.equal(api.primary_media_url, photo.api_url);
  assert.equal(api.primary_media_alt, media.alt);
  assert.equal(api.primary_media_creator, 'TIBALDO');
});
