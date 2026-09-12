import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { getPlant, getPlantsByGenre } from '../lib/plants/catalog.ts';
import { toVerifiedMediaApiFields } from '../lib/plants/verified-media-api-contract.ts';

const manifest = JSON.parse(readFileSync(new URL('../docs/media-provenance/photo-20260912-forgetii-01.json', import.meta.url), 'utf8'));
for (const photo of manifest.photos) {
  const slug = photo.canonical_slug.split('/').at(-1);
  test(`${slug}: canonical primary, genus and API use the exact Owner WebP`, () => {
    const plant = getPlant('anthurium', slug)!;
    assert.ok(plant);
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
    assert.equal(getPlantsByGenre('anthurium').find(p => p.slug === slug)?.gallery[0].src, media.src);
    const api = toVerifiedMediaApiFields(plant, 'photo-wave-test');
    assert.equal(api.primary_media_url, photo.api_url);
    assert.equal(api.primary_media_alt, media.alt);
    assert.equal(api.primary_media_creator, 'TIBALDO');
  });
}
