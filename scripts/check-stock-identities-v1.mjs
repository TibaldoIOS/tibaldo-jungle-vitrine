import assert from "node:assert/strict";
import { stockIdentityPlants } from "../lib/plants/stock-identities-v1.ts";
import { horticulturalIdentityPlants } from "../lib/plants/horticultural-identities-v1.ts";
const origin = process.argv[2] || "http://localhost:4209";
const mode = process.argv[3] || "public";
const canonicalOrigin = mode === "beta" ? "https://beta-jungle.tibaldo.fr" : "https://jungle.tibaldo.fr";
const allPlants = [...stockIdentityPlants, ...horticulturalIdentityPlants];
const paths = allPlants.map(p => "/plantes/" + p.genre + "/" + p.slug);
const hubs = [...new Set(allPlants.map(p => "/plantes/" + p.genre)), "/plantes/fougeres"];
const results = [];
const titles = new Set();
for (const path of [...paths, ...hubs]) {
  const response = await fetch(origin + path);
  assert.equal(response.status, 200, path);
  const html = await response.text();
  assert.equal((html.match(/<h1[\s>]/g) || []).length, 1, path + " H1");
  const canonical = html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"/)?.[1];
  assert.equal(canonical, canonicalOrigin + path, path + " canonical");
  const robots = html.match(/<meta[^>]*name="robots"[^>]*content="([^"]+)"/)?.[1] || "";
  if (mode === "beta") assert.match(robots, /noindex/); else assert.doesNotMatch(robots, /noindex/);
  const schemas = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(m => JSON.parse(m[1]));
  assert.ok(schemas.length, path + " schema");
  const types = JSON.stringify(schemas);
  assert.match(types, /BreadcrumbList/);
  assert.doesNotMatch(types, /"@type":"(?:Product|Offer|AggregateRating)"/);
  if (paths.includes(path)) {
    const title = html.match(/<title>([\s\S]*?)<\/title>/)?.[1];
    assert.ok(title && !titles.has(title), path + " unique title"); titles.add(title);
    assert.ok(html.includes('id="sources-botaniques"'), path + " visible sources");
    assert.ok(html.includes('id="multiplication"'), path + " multiplication");
    const hub = path.slice(0,path.lastIndexOf("/"));
    const hubHtml = await (await fetch(origin + hub)).text();
    assert.ok(hubHtml.includes('href="' + path + '"'), path + " hub referrer");
  }
  results.push({path,http:response.status,canonical,robots,jsonld:"PASS"});
}
const sitemap = await fetch(origin + "/sitemap.xml");
if (mode === "beta") assert.equal(sitemap.status, 404);
else { assert.equal(sitemap.status,200); const xml = await sitemap.text(); for (const p of paths) assert.ok(xml.includes(canonicalOrigin+p),p+" sitemap"); }
const robots = await (await fetch(origin + "/robots.txt")).text();
if (mode === "beta") assert.match(robots,/Disallow: \/(?:\r?\n|$)/); else assert.doesNotMatch(robots,/Disallow: \/(?:\r?\n|$)/);
console.log(JSON.stringify({mode,results,sitemap:sitemap.status,robots:"PASS"},null,2));
