import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { getPlant, plantFamilies, plants } from '../lib/plants/catalog.ts';
import { toVerifiedMediaApiFields } from '../lib/plants/verified-media-api-contract.ts';

const manifest = JSON.parse(readFileSync(new URL('../docs/media-provenance/photo-20260920-three-01.json', import.meta.url), 'utf8'));

test('three named Owner photos map to the exact existing canonical entities and public surfaces', () => {
  for (const [genre, slug, index] of [['epiphyllum', 'anguliger', 0], ['dicksonia', 'antarctica', 1], ['sansevieria', 'hahnii', 2]] as const) {
    const plant = getPlant(genre, slug)!;
    const photo = manifest.photos[index];
    assert.ok(plant);
    assert.equal(plants.filter(p => p.genre === genre && p.slug === slug).length, 1);
    assert.equal(plant.gallery[0].src, photo.public_path);
    assert.equal(plant.gallery[0].alt, photo.alt);
    assert.equal(plant.gallery[0].license?.status, 'verified');
    assert.equal(plant.gallery[0].license?.creator, 'TIBALDO');
    const bytes = readFileSync(new URL(`../public${photo.asset_path}`, import.meta.url));
    assert.equal(bytes.toString('ascii', 0, 4), 'RIFF');
    assert.equal(bytes.toString('ascii', 8, 12), 'WEBP');
    assert.equal(bytes.byteLength, photo.bytes);
    assert.equal(createHash('sha256').update(bytes).digest('hex'), photo.sha256);
    const api = toVerifiedMediaApiFields(plant, 'photo-wave-test');
    assert.equal(api.primary_media_url, photo.api_url);
    assert.equal(api.primary_media_alt, photo.alt);
  }
  assert.equal(plantFamilies.find(f => f.slug === 'epiphyllum')?.image, manifest.photos[0].public_path);
  assert.equal(plantFamilies.find(f => f.slug === 'dicksonia')?.image, manifest.photos[1].public_path);
  assert.equal(plantFamilies.find(f => f.slug === 'sansevieria')?.image, manifest.photos[2].public_path);
});
