import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { getPlant } from '../lib/plants/catalog.ts';

const manifest = JSON.parse(readFileSync(new URL('../docs/media-provenance/photo-20260916-strelitzia-alba-01.json', import.meta.url), 'utf8'));
for (const photo of manifest.photos) {
  const [, genre, slug] = photo.canonical_slug.split('/');
  test(`${slug}: the earlier Owner WebP remains preserved in the canonical gallery`, () => {
    const plant = getPlant(genre, slug)!;
    assert.ok(plant);
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
  });
}
