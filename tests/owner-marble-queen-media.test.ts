import test from 'node:test';
import assert from 'node:assert/strict';
import { plants } from '../lib/plants/catalog.ts';
import { documentaryGallery } from '../lib/plants/documentary-media.ts';
import { applyOwnerMarbleQueenMediaV1 } from '../lib/plants/owner-marble-queen-media-v1.ts';
test('Marble Queen publishes the three Owner photos through the existing gallery contract', () => {
 const plant = plants.find(p=>p.genre==='epipremnum' && p.slug==='marble-queen')!;
 const gallery = documentaryGallery(plant);
 assert.equal(gallery.length,3);
 assert.ok(gallery[0].src.includes('0017'));
 assert.ok(gallery[1].src.includes('0018'));
 assert.ok(gallery[2].src.includes('0019'));
 for(const image of gallery){assert.equal(image.license?.creator,'TIBALDO');assert.match(image.caption,/Photo : TIBALDO/);}
 const other = plants.find(p=>p.genre==='monstera')!;
 assert.equal(applyOwnerMarbleQueenMediaV1([other])[0],other);
});
