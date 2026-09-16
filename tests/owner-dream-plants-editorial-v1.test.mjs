import assert from "node:assert/strict";
import test from "node:test";
const render = async (path) => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const response = await worker.fetch(
    new Request(`https://jungle.tibaldo.fr${path}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
  assert.equal(response.status, 200, `${path} must render`);
  return response.text();
};

test("dream plants preview is linked, honest and protected from indexing", async () => {
  const [coulisses, page] = await Promise.all([
    render("/coulisses"),
    render("/coulisses/mes-plantes-de-reve"),
  ]);
  assert.match(coulisses, /href="\/coulisses\/mes-plantes-de-reve"/);
  assert.match(page, /Mes plantes de rêve/);
  assert.match(page, /Un rêve de culture — pas encore dans la collection du Studio/);
  assert.match(page, /Découvrir sa fiche botanique/);
  assert.match(page, /name="robots" content="noindex, follow"/);
  assert.match(page, /rel="canonical" href="https:\/\/jungle\.tibaldo\.fr\/coulisses\/mes-plantes-de-reve"/);
  assert.doesNotMatch(page, /Adopte-moi/);
  assert.doesNotMatch(page, /Voir cette plante au Shop/);
});

test("Devil Monster dossier separates accepted taxonomy from trade claims", async () => {
  const page = await render("/plantes/monstera/devil-monster");
  assert.match(page, /Monstera deliciosa Liebm\./);
  assert.match(page, /Appellation commerciale ou horticole/);
  assert.match(page, /Cultivar non établi/);
  assert.match(page, /Provenance[\s\S]*Non certifiée/);
  assert.match(page, /powo\.science\.kew\.org\/taxon\/87478-1/);
  assert.match(page, /shop\.rareplantsjapan\.jp\/products\/7-57devil/);
  assert.match(page, /name="robots" content="noindex, follow"/);
  assert.doesNotMatch(page, /Adopte-moi/);
});

test("preview routes stay out of the public sitemap", async () => {
  const sitemap = await render("/sitemap.xml");
  assert.doesNotMatch(sitemap, /mes-plantes-de-reve/);
  assert.doesNotMatch(sitemap, /devil-monster/);
});
