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
  assert.doesNotMatch(page, /name="robots" content="noindex/);
  assert.match(page, /rel="canonical" href="https:\/\/jungle\.tibaldo\.fr\/coulisses\/mes-plantes-de-reve"/);
  assert.doesNotMatch(page, /Adopte-moi/);
  assert.doesNotMatch(page, /Voir cette plante au Shop/);
});

test("Devil Monster dossier separates accepted taxonomy from trade claims", async () => {
  const page = await render("/plantes/monstera/devil-monster");
  assert.match(page, /Monstera deliciosa/);
  assert.match(page, /Commerciale \/ horticole/);
  assert.match(page, /statut officiel comme cultivar ne l’est pas/);
  assert.match(page, /Observer les feuillages/);
  assert.match(page, /sans inventer une chronologie/);
  assert.match(page, /ask\.ifas\.ufl\.edu\/publication\/EP520/);
  assert.match(page, /rhs\.org\.uk\/plants\/swiss-cheese-plants/);
  assert.match(page, /gelliesclub\.com\/products\/monstera-devil-monster-tissue-culture/);
  assert.match(page, /pkplants\.de\/en\/product-page\/monstera-devil-1-pcs/);
  assert.equal((page.match(/owner-media\/monstera-devil-monster\/monstera-devil-monster-/g) ?? []).length >= 13, true);
  assert.doesNotMatch(page, /name="robots" content="noindex/);
  assert.match(page, /"@type":"Article"/);
  assert.match(page, /"@type":"BreadcrumbList"/);
  assert.match(page, /"@type":"FAQPage"/);
  assert.doesNotMatch(page, /"@type":"Product"/);
  assert.doesNotMatch(page, /"@type":"Offer"/);
  assert.doesNotMatch(page, /Adopte-moi/);
});

test("published routes are present in the public sitemap", async () => {
  const sitemap = await render("/sitemap.xml");
  assert.match(sitemap, /coulisses\/mes-plantes-de-reve/);
  assert.match(sitemap, /plantes\/monstera\/devil-monster/);
});

test("home and Monstera genus expose discreet editorial links", async () => {
  const [home, monstera] = await Promise.all([render("/"), render("/plantes/monstera")]);
  assert.match(home, /href="\/coulisses\/mes-plantes-de-reve"/);
  assert.match(home, /Mes plantes de rêve/);
  assert.match(monstera, /href="\/plantes\/monstera\/devil-monster"/);
  assert.match(monstera, /Dossier éditorial · Nom commercial documenté/);
});
