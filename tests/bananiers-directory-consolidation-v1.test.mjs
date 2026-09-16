import assert from "node:assert/strict";
import test from "node:test";

async function html(path) {
  const { default: worker } = await import("../dist/server/index.js");
  const response = await worker.fetch(
    new Request(`https://jungle.tibaldo.fr${path}`),
    { ASSETS: { fetch: async () => new Response("", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
  assert.equal(response.status, 200, path);
  return response.text();
}

test("the main plant directory exposes one Bananiers entry with four unique fiches", async () => {
  const page = await html("/plantes");
  const index = page.match(/<nav class="plants-compact-index"[\s\S]*?<\/nav>/)?.[0];
  assert.ok(index);
  assert.equal((index.match(/href="\/plantes\/bananiers"/g) ?? []).length, 1);
  assert.doesNotMatch(index, /href="\/plantes\/(?:musa|ensete)"/);
  assert.match(index, /Bananiers[\s\S]*?4 fiches/);
  assert.match(page, /32(?:<!-- -->)? univers · Faites défiler pour explorer/);
});

test("Musa and Ensete remain canonical secondary routes inside Bananiers", async () => {
  const group = await html("/plantes/bananiers");
  assert.match(group, /4 fiches sont documentées/);
  for (const path of [
    "/plantes/musa",
    "/plantes/ensete",
    "/plantes/musa/basjoo",
    "/plantes/musa/sikkimensis-red-tiger",
    "/plantes/musa/florida-variegata",
    "/plantes/ensete/ventricosum-maurelii",
  ]) {
    assert.match(group, new RegExp(`href=["']${path.replaceAll("/", "\\/")}["']`, "i"), path);
    const page = await html(path);
    assert.match(page, new RegExp(`rel=["']canonical["'][^>]+${path.replaceAll("/", "\\/")}`, "i"), path);
  }
});
