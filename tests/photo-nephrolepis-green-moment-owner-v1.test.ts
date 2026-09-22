import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { getPlant } from '../lib/plants/catalog.ts';

const manifest = JSON.parse(readFileSync(new URL('../docs/media-provenance/photo-20260916-nephrolepis-green-moment-01.json', import.meta.url), 'utf8'));
for (const photo of manifest.photos) {
  const [, genre, slug] = photo.canonical_slug.split('/');
  test(`${slug}: previous Owner media remains archived after the corrected exact association`, () => {
    const plant = getPlant(genre, slug)!;
    assert.ok(plant);
    const bytes = readFileSync(new URL(`../public${photo.asset_path}`, import.meta.url));
    assert.equal(bytes.toString('ascii', 0, 4), 'RIFF');
    assert.equal(bytes.toString('ascii', 8, 12), 'WEBP');
    assert.equal(createHash('sha256').update(bytes).digest('hex'), photo.sha256);
    assert.notEqual(plant.gallery[0].src, photo.public_path);
  });
}
