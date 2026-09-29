import assert from "node:assert/strict";
import test from "node:test";
import worker from "../dist/server/index.js";

const env = { ASSETS: { fetch: async () => new Response("", { status: 404 }) } };
const ctx = { waitUntil() {}, passThroughOnException() {} };
const render = async (path: string) => {
  const response = await worker.fetch(new Request(`https://jungle.tibaldo.fr${path}`), env, ctx);
  return { response, html: await response.text() };
};

test("post-opening surfaces use current Studio information without stale future announcements", async () => {
  for (const path of ["/", "/contact", "/services", "/substrats", "/substrats-en-vrac-lille"]) {
    const { response, html } = await render(path);
    assert.equal(response.status, 200, path);
    assert.match(html, /Le Studio Végétal est ouvert à Lille/, path);
    assert.doesNotMatch(html, /Premières ventes|Inauguration le|Le Studio se prépare/, path);
    assert.match(html, /href="\/contact#horaires"/, path);
    assert.match(html, /Itinéraire/, path);
    assert.match(html, /Encyclopédie/, path);
  }
});

test("Owner address and hours are visible on the current visit surfaces", async () => {
  const home = await render("/");
  const contact = await render("/contact");
  for (const { html } of [home, contact]) {
    assert.match(html, /3 place de l’Arbonnoise/);
    assert.match(html, /59000 Lille/);
    assert.match(html, /Mardi[^<]{0,20}14[^<]{0,8}19/);
    assert.match(html, /Mercredi[^<]{0,20}samedi[^<]{0,20}10[^<]{0,8}19/i);
    assert.match(html, /Dimanche[^<]{0,20}10[^<]{0,8}13/i);
  }
  assert.match(contact.html, /Lundi[^<]{0,10}fermé/i);
  assert.match(contact.html, /id="itineraire"/);
});

test("Sybotanica copy distinguishes Shop publications, packaged mixes, bulk components and guide content", async () => {
  const services = await render("/services");
  const substrates = await render("/substrats");
  const bulk = await render("/substrats-en-vrac-lille");
  assert.match(services.html, /références publiées sont proposées sur le Shop/);
  assert.match(services.html, /sans promesse de disponibilité ni de conditionnement/);
  assert.match(substrates.html, /seules les références publiées dans le Shop disposent d’un accès commercial direct/);
  assert.match(substrates.html, /Studio est ouvert du mardi au dimanche/);
  assert.match(bulk.html, /mélanges conditionnés, composants horticoles en vrac/i);
  assert.match(bulk.html, /il ne représente pas un inventaire en temps réel/i);
  assert.match(bulk.html, /Aucune commande ni aucun retrait ne sont supposés actifs/i);
  assert.doesNotMatch(bulk.html, /click &amp; collect via le Shop pour les références publiées/i);
});

test("the inauguration URL remains crawlable as an honest past-event archive", async () => {
  const { response, html } = await render("/evenements/ouverture-tibaldo-jungle-lille");
  assert.equal(response.status, 200);
  assert.match(html, /Événement passé/);
  assert.match(html, /"eventStatus":"https:\/\/schema\.org\/EventCompleted"/);
  assert.match(html, /ne constitue pas un reportage de l’événement/);
  assert.doesNotMatch(html, /"eventStatus":"https:\/\/schema\.org\/EventScheduled"/);
  assert.doesNotMatch(html, /Confirmer ma venue|Valider ma venue/);
});
