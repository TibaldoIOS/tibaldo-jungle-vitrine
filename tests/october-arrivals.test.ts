import test from 'node:test';
import assert from 'node:assert/strict';
import {plants,getPlant,plantFamilies} from '../lib/plants/catalog.ts';
import {octoberArrivalPlants} from '../lib/plants/arrivals-october-2026.ts';
import {anthuriumArrival,anthuriumWeekendState,anthuriumWeekendStart,anthuriumWeekendEnd,anthuriumEventSchema,anthuriumWeekendOffers,visibleWeekendOffer} from '../lib/events/anthurium-weekend.ts';
import {jungleLocalIdentity} from '../lib/jungle-local-identity.ts';
test('seven new identities, unique canonical routes and registered genera',()=>{
 assert.equal(octoberArrivalPlants.length,7);
 for(const p of octoberArrivalPlants){assert.equal(plants.filter(x=>x.genre===p.genre&&x.slug===p.slug).length,1);assert.ok(plantFamilies.some(g=>g.slug===p.genre));assert.equal(getPlant(p.genre,p.slug)?.shopUrl,undefined);assert.ok(p.showSources);for(const v of Object.values(p.care))assert.ok(v);}
 assert.equal(getPlant('alocasia','micholitziana')?.filters.variegated,false);assert.ok(getPlant('alocasia','frydek-variegata'));assert.ok(getPlant('epiphyllum','anguliger'));assert.ok(getPlant('calathea','orbifolia'));
 assert.equal(getPlant('dieffenbachia','culture')?.taxonomy.cultivar,null);
 assert.equal(getPlant('begonia','maculata-spotlight-green')?.taxonomy.cultivar,'KRMACGR01');
});
test('five event references resolve, 48 expected units, no inferred offer or stock',()=>{
 assert.equal(anthuriumArrival.length,5);assert.equal(anthuriumArrival.reduce((s,p)=>s+p.expected,0),48);
 for(const p of anthuriumArrival)assert.ok(getPlant('anthurium',p.slug));
 assert.deepEqual(anthuriumWeekendOffers,{});assert.equal(visibleWeekendOffer(undefined,Date.now()),null);
 const base={ownerApproved:true as const,regularPrice:20,weekendPrice:18,availability:'confirmée',validFrom:anthuriumWeekendStart,validUntil:anthuriumWeekendEnd};
 assert.equal(visibleWeekendOffer(base,Date.parse(anthuriumWeekendStart)-1),null);assert.ok(visibleWeekendOffer(base,Date.parse(anthuriumWeekendStart)));assert.equal(visibleWeekendOffer(base,Date.parse(anthuriumWeekendEnd)),null);
 assert.equal(visibleWeekendOffer({...base,weekendPrice:NaN},Date.parse(anthuriumWeekendStart)),null);
});
test('Paris date boundaries and canonical venue are exact',()=>{
 assert.equal(anthuriumWeekendState(Date.parse('2026-10-10T07:59:59Z')),'upcoming');
 assert.equal(anthuriumWeekendState(Date.parse('2026-10-10T08:00:00Z')),'current');
 assert.equal(anthuriumWeekendState(Date.parse('2026-10-11T10:59:59Z')),'current');
 assert.equal(anthuriumWeekendState(Date.parse('2026-10-11T11:00:00Z')),'ended');
 const s=anthuriumEventSchema();assert.equal(s.location.geo.latitude,jungleLocalIdentity.latitude);assert.equal(s.location.address.streetAddress,jungleLocalIdentity.streetAddress);assert.equal('offers' in s,false);
});
