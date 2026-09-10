import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { getPlant, getPlantsByGenre } from '../lib/plants/catalog.ts';
import { toVerifiedMediaApiFields } from '../lib/plants/verified-media-api-contract.ts';

const manifest = JSON.parse(readFileSync(new URL('../docs/media-provenance/photo-20260910-monstera-01.json', import.meta.url), 'utf8'));
for (const photo of manifest.photos) {
  const slug = photo.canonical_slug.split('/').at(-1);
  test(`${slug}: canonical primary, genus and API use the exact Owner WebP`, () => {
    const plant = getPlant('monstera', slug)!;
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
    assert.equal(getPlantsByGenre('monstera').find(p => p.slug === slug)?.gallery[0].src, media.src);
    const api = toVerifiedMediaApiFields(plant, 'photo-wave-test');
    assert.equal(api.primary_media_url, photo.api_url);
    assert.equal(api.primary_media_alt, media.alt);
    assert.equal(api.primary_media_creator, 'TIBALDO');
  });
}
test('Esqueleto historical licensed view is retained; Dubia has no media gap', () => {
  const old = manifest.photos.find((p: { canonical_slug: string; previous_gallery: unknown }) => p.canonical_slug.endsWith('/esqueleto')).previous_gallery;
  assert.deepEqual(getPlant('monstera', 'esqueleto')!.gallery.slice(1), old);
  assert.equal(getPlant('monstera', 'dubia')!.gallery.length, 1);
  assert.deepEqual(getPlant('monstera', 'dubia')!.mediaNeeds, []);
});
