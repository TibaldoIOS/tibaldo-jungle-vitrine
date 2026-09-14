import assert from "node:assert/strict";
import test from "node:test";
import worker from "../dist/server/index.js";
import { plants } from "../lib/plants/catalog.ts";
import { isInternalPhotoProductionCopy } from "../lib/plants/types.ts";

const escape = text => text.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#x27;");
const sectionContaining = (html, marker) => (html.match(/<section\b[^>]*>[\s\S]*?<\/section>/g) ?? []).find(section => section.includes(marker)) ?? "";

// These are presentation guarantees, not a frozen release-wide plant count.
for (const plant of plants) {
  test(`shared profile keeps distinct portrait, identity and form: ${plant.genre}/${plant.slug}`, async () => {
    const path = `/plantes/${plant.genre}/${plant.slug}`;
    const response = await worker.fetch(new Request(`https://jungle.tibaldo.fr${path}`), {
      ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
    }, { waitUntil() {}, passThroughOnException() {} });
    assert.equal(response.status, 200);
    const html = (await response.text()).split("</main>")[0];
    const description = plant.description.filter(text => !isInternalPhotoProductionCopy(text));
    const advice = plant.tibaldoAdvice.filter(text => !isInternalPhotoProductionCopy(text));
    const portrait = sectionContaining(html, "Portrait botanique");
    const identity = sectionContaining(html, 'id="identite"');
    const story = sectionContaining(html, `aria-labelledby="golden-story-${plant.genre}-${plant.slug}"`);
    assert.ok(portrait && identity && story, "All existing chapter sections remain");
    assert.ok(description.length > 1 || advice.length, "Chapter 02 needs existing substantive content, never filler");
    for (const [index, paragraph] of description.entries()) {
      const markup = `<p>${escape(paragraph)}</p>`;
      assert.ok((index ? story : portrait).includes(markup), "Every existing description paragraph keeps a home");
      assert.ok(!(index ? portrait : story).includes(markup), "Portrait is not repeated in chapter 02");
    }
    const habitat = `<p>${escape(plant.habitat)}</p>`;
    assert.ok(identity.includes(habitat), "Habitat remains in identity");
    assert.ok(!story.includes(habitat), "Habitat is not repeated in chapter 02");
    if (advice[0]) assert.ok(story.includes(`<p>${escape(advice[0])}</p>`), "Existing observation advice remains");
    assert.ok(story.includes(`id="golden-story-${plant.genre}-${plant.slug}"`), "Story anchor remains");
    assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
  });
}
