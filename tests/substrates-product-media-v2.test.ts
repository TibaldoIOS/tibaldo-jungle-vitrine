import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { readyMixes, selectedComponents, nutrition, mineral } from "../app/substrats/selection.ts";
const registry = JSON.parse(readFileSync("app/substrats/product-media.json","utf8"));
test("24 exact product references have unique authentic packaging",()=>{
  const expected=[...readyMixes,...selectedComponents,{...mineral,id:"mineral"},...nutrition];
  assert.equal(registry.length,24);
  assert.equal(new Set(registry.map((p:{mediaId:number})=>p.mediaId)).size,24);
  for(const entry of expected){
    const row=registry.find((p:{id:string})=>p.id===entry.id);
    assert.ok(row,entry.id); assert.equal(row.sourceUrl,entry.source);
    assert.equal(row.officialSybotanica,true); assert.equal(row.aiGenerated,false);
    assert.equal(row.publicPromotion,"SEPARATE_RIGHTS_REVIEW_REQUIRED");
    assert.ok(row.credit); assert.ok(row.rightsBasis); assert.ok(row.originalSha256);
    assert.equal(new URL(row.originalUrl).hostname,"cdn.shopify.com");
    assert.deepEqual(row.variants.map((v:{width:number})=>v.width),[400,800]);
    for(const v of row.variants){
      const bytes=readFileSync("public"+v.src.slice("/media".length));
      assert.equal(createHash("sha256").update(bytes).digest("hex"),v.sha256);
      assert.equal(bytes.length,v.bytes); assert.ok(v.height>0);
      assert.equal(bytes.toString("ascii",8,12),"WEBP"); assert.ok(v.bytes<180000);
    }
  }
});
test("responsive local packshots reserve layout and are lazy, without client fetching",()=>{
  const component=readFileSync("app/substrats/ProductPackshot.tsx","utf8");
  for(const expected of ['srcSet=', 'sizes=', 'width={', 'height={', 'loading="lazy"', 'object']) {
    if(expected!=="object") assert.ok(component.includes(expected),expected);
  }
  assert.doesNotMatch(component,/fetch\(|useEffect|use client/);
  const css=readFileSync("app/substrats/selection.module.css","utf8");
  assert.match(css,/object-fit: contain/); assert.match(css,/:target .packshot/);
  const page=readFileSync("app/substrats/SubstrateSelection.tsx","utf8");
  assert.equal((page.match(/<ProductPackshot/g)||[]).length,4);
  assert.ok(page.includes('id="mineral"'));
});
