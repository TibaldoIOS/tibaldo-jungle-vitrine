import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import worker from "../dist/server/index.js";
const env={ASSETS:{fetch:async()=>new Response("",{status:404})}};
const ctx={waitUntil(){},passThroughOnException(){}};
const render=path=>worker.fetch(new Request("https://jungle.tibaldo.fr"+path),env,ctx);
test("public substrate pages are indexable, canonical and link to public Shop",async()=>{
  for(const path of ["/substrats","/substrats-en-vrac-lille"]){
    const r=await render(path);const h=await r.text();
    assert.equal(r.status,200);
    assert.doesNotMatch(r.headers.get("x-robots-tag")||"",/noindex|nofollow/);
    assert.match(h,new RegExp('rel="canonical" href="https://jungle.tibaldo.fr'+path+'"'));
    assert.equal((h.match(/<h1\b/g)||[]).length,1);
    assert.doesNotMatch(h,/<meta[^>]*name="robots"[^>]*content="[^"]*(?:noindex|nofollow)/);
    assert.doesNotMatch(h,/https:\/\/beta-(?:jungle|shop)\.tibaldo\.fr/);
    assert.match(h,/https:\/\/shop\.tibaldo\.fr/);
    assert.match(h,/Sybotanica/);assert.match(h,/26 septembre 2026/);
    assert.match(h,/selection-substrats-sybotanica.webp/);
    assert.doesNotMatch(h,/"@type":"(?:Product|Offer)"/);
    if(path==="/substrats")assert.equal((h.match(/data-product-media=/g)||[]).length,24);
  }
});
test("sitemap preserves 157 URLs and both established substrate routes",async()=>{
  const r=await render("/sitemap.xml");const h=await r.text();
  assert.equal(r.status,200);assert.equal((h.match(/<loc>/g)||[]).length,157);
  for(const path of ["/substrats","/substrats-en-vrac-lille"])assert.ok(h.includes("https://jungle.tibaldo.fr"+path+"</loc>"));
});
test("public partnership approval is recorded for all product images",()=>{
  const rows=JSON.parse(readFileSync("app/substrats/product-media.json"));
  assert.equal(rows.length,24);
  for(const r of rows)assert.equal(r.publicPromotion,"OWNER_CONFIRMED_PUBLIC_PARTNERSHIP_USE_2026_09_04");
});
