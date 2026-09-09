import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import test from "node:test";
import { plants } from "../lib/plants/catalog.ts";
import { exactVerifiedPrimaryMedia } from "../lib/plants/verified-media-api-contract.ts";

const read = (path: string) => readFileSync(new URL(`../${path}`, import.meta.url));
test("Thai and Mint preserve exact authorized bytes", () => {
  for (const [slug, hash] of [["thai-constellation", "d751916a843002a763bb400e1e92d65693630af66355e9bec43382d8127daa50"], ["mint", "d35df71d5bc64c37eada319bba23837df44828842e623f8b6a62c8c540341edc"]]) {
    const plant = plants.find(p => p.genre === "monstera" && p.slug === slug)!;
    const media = exactVerifiedPrimaryMedia(plant)!;
    assert.equal(media.license?.creator, "TIBALDO");
    assert.equal(createHash("sha256").update(read(`public${media.src}`)).digest("hex"), hash);
  }
});
test("Marble Queen and Pilea derivatives match recorded provenance", () => {
  const marble = JSON.parse(read("docs/media-provenance/marble-queen-owner-2026-09-08.json").toString());
  for (const f of marble.files.filter((f: {file: string}) => f.file.startsWith("work/jungle/public/"))) {
    assert.equal(createHash("sha256").update(read(f.file.replace("work/jungle/", ""))).digest("hex"), f.sha256);
  }
  const pilea = JSON.parse(read("docs/media-provenance/pilea-peperomioides-owner-2026-09-08.json").toString());
  for (const s of pilea.sources) for (const f of s.derivatives.filter((f: {app: string}) => f.app === "jungle")) {
    assert.equal(createHash("sha256").update(read(`public${f.path}`)).digest("hex"), f.sha256);
  }
});
test("cultivar media cannot replace Golden Aureum", () => {
  const marble = plants.find(p => p.genre === "epipremnum" && p.slug === "marble-queen")!;
  const golden = plants.find(p => p.genre === "epipremnum" && p.slug === "aureum")!;
  assert.ok(exactVerifiedPrimaryMedia(marble)?.src.includes("/marble-queen/"));
  // Aureum is absent from this PUBLIC catalogue; never invent or borrow its media.
  if (golden) assert.ok(golden.gallery.every(m => !m.src.includes("/marble-queen/")));
  assert.ok(plants.filter(p => p !== marble).every(p => p.gallery.every(m => !m.src.includes("/marble-queen/"))));
  assert.ok(exactVerifiedPrimaryMedia(plants.find(p => p.genre === "pilea" && p.slug === "peperomioides")!)?.src.includes("/pilea-peperomioides/"));
});
test("build modes and approved public work remain separate", () => {
  const pkg = JSON.parse(read("package.json").toString());
  assert.equal(pkg.scripts.build, "npm run build:public");
  assert.match(pkg.scripts["build:beta"], /JUNGLE_ENV=beta/);
  assert.notEqual(JSON.parse(read(".openai/hosting.json").toString()).project_id, JSON.parse(read(".openai/hosting.public.json").toString()).project_id);
  assert.doesNotMatch(read("app/plantes/GoldenGenusHub.tsx").toString(), /monstera-leaf-identification-owner-reference/);
  assert.match(read("app/plantes/GoldenSpeciesProfile.tsx").toString(), /SpeciesCareLinks/);
  assert.match(read("app/layout.tsx").toString(), /metadataBase: new URL\(jungleOrigin\)/);
});
