import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { plants, getPlant, getPlantsByGenre } from '../lib/plants/catalog.ts';
import { rareCollectionKeys } from '../lib/plants/rare-collection.ts';
import { rarePlantEntries } from '../lib/plants/rare-plants.ts';
import { toPlantApiV2 } from '../lib/plants/api-contract.ts';
test('four additions resolve through canonical catalog, genus and API, with no commerce',()=>{
 for(const p of rarePlantEntries){
  const published=getPlant(p.genre,p.slug)!;
  assert.ok(published);assert.ok(getPlantsByGenre(p.genre).includes(published));
  assert.equal(plants.filter(x=>x.genre===p.genre&&x.slug===p.slug).length,1);
  assert.equal(toPlantApiV2(published).encyclopediaSlug,`plantes/${p.genre}/${p.slug}`);
  assert.equal(published.shopUrl,undefined);assert.equal(published.gallery[0].license?.status,'media-gap');
  assert.ok(existsSync(`public${published.gallery[0].src}`));
 }
});
test('collection reuses Devil and never aliases Suksathid #2 or expands RVDP',()=>{
 assert.equal(rareCollectionKeys.length,5);
 for(const k of rareCollectionKeys){const [g,s]=k.split('/');assert.ok(getPlant(g,s));}
 assert.equal(plants.filter(p=>p.genre==='monstera'&&p.slug==='devil-monster').length,1);
 const unknown=getPlant('colocasia','black-suksathid')!;assert.equal(unknown.filters.adultSizeCm,null);assert.deepEqual(unknown.synonyms,[]);
 assert.equal(getPlant('anthurium','dark-source-rvdp')!.botanicalName,'Anthurium Dark Source × RVDP');
 assert.equal(getPlant('colocasia','pharaohs-mask')!.taxonomy.cultivar,'Cophama');
});
test('all required visible care sections are present and dates remain explicit',()=>{
 for(const p of rarePlantEntries){assert.ok(p.showSources);assert.ok(p.sources.length);for(const v of Object.values(p.care)) assert.ok(v);assert.ok(p.editorialSections?.some(s=>s.id==='culture-et-acclimatation'));assert.equal(p.updatedAt,'2026-10-04');}
});
