import {readFileSync} from "node:fs";
import test from "node:test";
import assert from "node:assert/strict";

const bar=readFileSync(new URL("../app/plantes/PlantShopBar.tsx",import.meta.url),"utf8");
const profile=readFileSync(new URL("../app/plantes/GoldenSpeciesProfile.tsx",import.meta.url),"utf8");
const header=readFileSync(new URL("../app/SiteChrome.tsx",import.meta.url),"utf8");
const mobile=readFileSync(new URL("../app/MobileJungleMenu.tsx",import.meta.url),"utf8");

test("commerce bridge requests only the exact encyclopedia id and keeps Shop as cart authority",()=>{
 assert.match(bar,/searchParams\.set\("encyclopedie", encyclopediaId\)/);
 assert.match(profile,/encyclopediaId={`\$\{plant\.genre\}\/\$\{plant\.slug\}`}/);
 assert.doesNotMatch(bar,/botanicalName|includes\(|normalize/);
 assert.match(bar,/\/produits\/\$\{encodeURIComponent\(product\.id\)\}/);
 assert.doesNotMatch(bar,/localStorage|supabase|auth|panier.*setItem/i);
});

test("desktop and mobile navigation expose Shop cart and account shortcuts",()=>{
 for(const source of [header,mobile]){
  assert.match(source,/Panier/);assert.match(source,/Mon compte/);
  assert.match(source,/selection\?panier=ouvert/);assert.match(source,/espace-client/);
 }
});
