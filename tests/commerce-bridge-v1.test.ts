import {readFileSync} from "node:fs";
import test from "node:test";
import assert from "node:assert/strict";

const bar=readFileSync(new URL("../app/plantes/PlantShopBar.tsx",import.meta.url),"utf8");
const profile=readFileSync(new URL("../app/plantes/GoldenSpeciesProfile.tsx",import.meta.url),"utf8");
const header=readFileSync(new URL("../app/SiteChrome.tsx",import.meta.url),"utf8");
const mobile=readFileSync(new URL("../app/MobileJungleMenu.tsx",import.meta.url),"utf8");
const substrate=readFileSync(new URL("../app/substrats/SubstrateCommerce.tsx",import.meta.url),"utf8");
const substratePage=readFileSync(new URL("../app/substrats/page.tsx",import.meta.url),"utf8");

test("commerce bridge requests only the exact encyclopedia id and keeps Shop as cart authority",()=>{
 assert.match(bar,/searchParams\.set\("encyclopedie", encyclopediaId\)/);
 assert.match(profile,/encyclopediaId={`\$\{plant\.genre\}\/\$\{plant\.slug\}`}/);
 assert.doesNotMatch(bar,/botanicalName|includes\(|normalize/);
 assert.match(bar,/\/produits\/\$\{encodeURIComponent\(product\.slug\)\}/);
 assert.match(bar,/Voir au Shop/);
 assert.doesNotMatch(bar,/Ajouter au panier|Voir et ajouter/);
 assert.doesNotMatch(bar,/localStorage|supabase|auth|panier.*setItem/i);
});

test("desktop and mobile navigation expose Shop cart and account shortcuts",()=>{
 for(const source of [header,mobile]){
  assert.match(source,/Panier/);assert.match(source,/Mon compte/);
  assert.match(source,/selection\?panier=ouvert/);assert.match(source,/espace-client/);
 }
});

test("substrate bridge uses reviewed product ids and never fuzzy-maps coco chips",()=>{
 assert.match(substrate,/"sphaigne-sechee": "213a2aa4-23a3-4e30-bc08-b5c576768759"/);
 assert.match(substrate,/"charbon-actif": "90d23443-4224-4172-8b5f-6e70867df5b6"/);
 assert.match(substrate,/zeolite: "72e14d1a-7df3-44eb-b96a-2e2aaba6ce52"/);
 assert.doesNotMatch(substrate,/2b61c7c8-482b-4825-8833-c13c7ad0da8a/);
 assert.doesNotMatch(substrate,/includes\(|normalize|sale_price|15\.49|10\.99|6\.49/);
 assert.match(substrate,/item\.id === productId/);
 assert.match(substratePage,/Comprendre ce composant/);
});
