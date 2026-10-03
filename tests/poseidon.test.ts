import assert from 'node:assert/strict';
import test from 'node:test';
import {plants,getPlant,getPlantsByGenre} from '../lib/plants/catalog.ts';
import {toPlantApiV2} from '../lib/plants/api-contract.ts';
const plant=getPlant('monstera','poseidon')!;
test('Poseidon is one horticultural identity with unknown species and height',()=>{assert.equal(plants.filter(p=>p.genre==='monstera'&&p.slug==='poseidon').length,1);assert.equal(plant.botanicalName,'Monstera ‘Poseidon’');assert.equal(plant.taxonomy.species,'Identité spécifique non établie');assert.equal(plant.filters.adultSizeCm,null);assert.equal(plant.filters.variegated,false);});
test('canonical discovery includes Monstera and Araceae without commercial offer',()=>{assert.ok(getPlantsByGenre('monstera').includes(plant));assert.equal(plant.taxonomy.family,'Araceae');assert.ok(plant.seo.keywords.includes('Monstera Poseidon'));assert.equal(plant.shopUrl,undefined);assert.equal(toPlantApiV2(plant).encyclopediaSlug,'plantes/monstera/poseidon');});
test('no unlicensed documentary image; fallback and future media roles retained',()=>{assert.deepEqual(plant.gallery,[]);assert.equal(plant.mediaNeeds?.length,4);assert.match(toPlantApiV2(plant).imageUrl,/photo-reelle-a-venir.svg$/);});
test('comparison links resolve in both directions and uncertainty is explicit',()=>{assert.ok(plant.comparisons.every(c=>plants.some(p=>`/plantes/${p.genre}/${p.slug}`===c.href)));assert.ok(getPlant('monstera','burle-marx-flame')!.comparisons.some(c=>c.href==='/plantes/monstera/poseidon'));assert.match(plant.hybridization,/Aucun enregistrement officiel/);assert.equal(plant.faq.length,12);assert.ok(plant.showSources);});
