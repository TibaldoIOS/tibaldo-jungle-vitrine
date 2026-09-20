import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { getPlant, getPlantsByGenre, plantFamilies, plants } from '../lib/plants/catalog.ts';
import { toVerifiedMediaApiFields } from '../lib/plants/verified-media-api-contract.ts';

const manifest = JSON.parse(readFileSync(new URL('../docs/media-provenance/photo-20260920-asparagus-plumosus-01.json', import.meta.url), 'utf8'));
const photo = manifest.photos[0];

test('Asparagus Plumosus reuses the exact canonical entity and publishes the improved Owner visual everywhere', () => {
  const plant = getPlant('asparagus', 'plumosus')!;
  assert.ok(plant);
  assert.equal(plants.filter(p => p.genre === 'asparagus' && p.slug === 'plumosus').length, 1);
  assert.equal(plant.botanicalName, 'Asparagus setaceus');
  assert.ok(plant.taxonomy.commonNames.includes('Asparagus plumosus'));
  const media = plant.gallery[0];
  assert.equal(media.src, photo.public_path);
  assert.equal(media.alt, photo.alt);
  assert.equal(media.caption, 'Visuel : TIBALDO');
  assert.equal(media.license?.creator, 'TIBALDO');
  assert.equal(media.license?.status, 'verified');
  const bytes = readFileSync(new URL(`../public${photo.asset_path}`, import.meta.url));
  assert.equal(bytes.toString('ascii', 0, 4), 'RIFF');
  assert.equal(bytes.toString('ascii', 8, 12), 'WEBP');
  assert.equal(bytes.byteLength, photo.bytes);
  assert.equal(createHash('sha256').update(bytes).digest('hex'), photo.sha256);
  assert.equal(getPlantsByGenre('asparagus')[0]?.gallery[0].src, media.src);
  assert.equal(plantFamilies.find(f => f.slug === 'asparagus')?.image, media.src);
  const familyGuidesSource = readFileSync(new URL('../lib/plants/family-guides.ts', import.meta.url), 'utf8');
  assert.match(familyGuidesSource, /asparagus:\s*\{[\s\S]*?asparagus-plumosus-port-aerien\.webp/);
  const api = toVerifiedMediaApiFields(plant, 'photo-wave-test');
  assert.equal(api.primary_media_url, photo.api_url);
  assert.equal(api.primary_media_alt, media.alt);
  assert.equal(api.primary_media_creator, 'TIBALDO');
});
