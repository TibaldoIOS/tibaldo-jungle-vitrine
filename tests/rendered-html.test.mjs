import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";
import { plants } from "../lib/plants/catalog.ts";
import { isPhotoProductionPlaceholder } from "../lib/plants/types.ts";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  return response;
}

test("renders the homepage SEO signals and editorial content", async () => {
  const response = await render();

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
  const html = await response.text();
  assert.match(html, /<title>Tibaldo Jungle — Studio Végétal à Lille<\/title>/i);
  assert.match(
    html,
    /<meta(?=[^>]*name=["']description["'])(?=[^>]*content=["'][^"']*Nouveauté à Lille[^"']*26 septembre 2026[^"']*["'])[^>]*>/i,
  );
  assert.match(html, /<link(?=[^>]*rel=["']canonical["'])(?=[^>]*href=["']https:\/\/jungle\.tibaldo\.fr\/?["'])[^>]*>/i);
  assert.match(html, /application\/ld\+json/i);
  assert.match(html, /Plantes rares[\s\S]*&amp; tropicales[\s\S]*à Lille\./i);
  assert.match(html, /Plantes d’intérieur et d’extérieur, espèces exotiques, pépites rares et conseils passionnés\./i);
  assert.match(html, /class=["']hero-line["']/i);
  assert.match(html, /data-parallax=["']18["']/i);
  assert.match(html, /Trois univers/i);
  assert.match(html, /href=["']\/substrats["']/i);
  assert.match(html, /Conseiller sans sur-vendre/i);
  assert.match(html, /Grande ouverture · 26 septembre 2026 · Lille/i);
  assert.match(html, /Rempotage gratuit toute l’année/i);
  assert.match(html, /href=["']\/evenements\/ouverture-tibaldo-jungle-lille["']/i);
  assert.doesNotMatch(html, /Lille · Nord · France/i);
  assert.match(html, /href=["'](?:https:\/\/jungle\.tibaldo\.fr)?\/favicon\.png["']/i);
});

test("renders the substrates collection with local SEO metadata", async () => {
  const response = await render("/substrats");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /<title>Substrats en vrac à Lille/i);
  assert.match(html, /rel=["']canonical["'][^>]*href=["']https:\/\/jungle\.tibaldo\.fr\/substrats["']/i);
  assert.match(html, /CollectionPage/i);
  assert.match(html, /ItemList/i);
  assert.match(html, /Terreau Signature by Romain/i);
  assert.match(html, /Écorce de pin/i);
  assert.match(html, /Sphaigne séchée/i);
  assert.match(html, /Zéolite/i);
  assert.match(html, /src=["']\/substrats\/terreau-signature-substrat-plantes-lille\.jpg["']/i);
  assert.match(html, /src=["']\/substrats\/sphaigne-sechee-substrat-plantes-lille-v2\.png["']/i);
});

test("blocks beta crawling and exposes no beta sitemap", async () => {
  const robots = await render("/robots.txt");
  assert.equal(robots.status, 200);
  assert.match(robots.headers.get("content-type") ?? "", /^text\/plain\b/i);
  const robotsText = await robots.text();
  assert.match(robotsText, /Disallow: \/$/im);
  assert.doesNotMatch(robotsText, /Sitemap:/i);

  const sitemap = await render("/sitemap.xml");
  assert.equal(sitemap.status, 404);
  assert.equal(sitemap.headers.get("x-robots-tag"), "noindex, nofollow");
});

test("keeps Jungle Scroll Story D isolated, server rendered and non-indexable", async () => {
  const response = await render("/lab/deliciosa/d");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /LAB D/);
  assert.match(html, /data-story-sequence="facts"/);
  assert.match(html, /data-story-sequence="identity"/);
  assert.match(html, /data-story-sequence="morphology"/);
  assert.match(html, /data-story-sequence="cultivate"/);
  assert.match(html, /Monstera[\s\S]*deliciosa[\s\S]*Liebm\./);
  assert.match(html, /Observer[\s\S]*Arroser[\s\S]*Égoutter/);
  assert.match(html, /<meta name="robots" content="noindex, nofollow, nocache"/i);
  assert.doesNotMatch(html, /botanix\.com/i);

  const servedProfile = await render("/plantes/monstera/deliciosa");
  assert.equal(servedProfile.status, 200);
  assert.doesNotMatch(await servedProfile.text(), /Jungle Scroll Story|LAB D/i);

  const motionSource = readFileSync(
    new URL("../app/__lab/deliciosa/ScrollStoryController.tsx", import.meta.url),
    "utf8",
  );
  assert.equal((motionSource.match(/addEventListener\("scroll"/g) ?? []).length, 1);
  assert.match(motionSource, /requestAnimationFrame/);
  assert.match(motionSource, /prefers-reduced-motion: reduce/);
  assert.match(motionSource, /\{ passive: true \}/);
});

test("Visual P1 target routes expose no internal production placeholders", async () => {
  const routes = [
    "/plantes/bananiers",
    "/plantes/cycas/revoluta",
    "/plantes/dicksonia/antarctica",
    "/fleurs",
  ];
  const internalCopy = /PHOTO RÉELLE DU SPÉCIMEN|AJOUTER AVANT PUBLICATION|Photographie Tibaldo à venir|Photographies propriétaires à préparer|reportage botanique\s*à compléter|\?>\+/i;
  for (const route of routes) {
    const response = await render(route);
    assert.equal(response.status, 200, route);
    const html = await response.text();
    assert.doesNotMatch(html, internalCopy, route);
    assert.match(html, /<meta name="robots" content="noindex, nofollow/i, route);
    assert.match(html, /https:\/\/beta-shop\.tibaldo\.fr/i, route);
  }
});

test("photo-debt routes expose no internal production copy to visitors", async () => {
  const photoDebtPlants = plants.filter((plant) =>
    isPhotoProductionPlaceholder(plant.gallery[0]?.src),
  );
  const photoDebtRoutes = [
    ...new Set([
      "/plantes",
      ...photoDebtPlants.map((plant) => `/plantes/${plant.genre}`),
      ...photoDebtPlants.map(
        (plant) => `/plantes/${plant.genre}/${plant.slug}`,
      ),
    ]),
  ];
  const internalCopy = /PHOTO RÉELLE DU SPÉCIMEN|AJOUTER AVANT PUBLICATION|Photographie Tibaldo à venir|Photographies propriétaires à préparer|reportage botanique\s*à compléter|photographier avant de publier|pourquoi (?:certaines fiches n['’]ont-elles pas encore de photo|la photographie manque-t-elle)|(?:photo|photographie|photographies|spécimen)[^.<>\"]*?(?:à venir|à ajouter|à réaliser|à préparer|à compléter|à relever|encore nécessaire|avant publication)|(?:dimension|dimensions|mesure|mesures)[^.<>\"]*?(?:à venir|à ajouter|à compléter|à relever|encore nécessaire)|gamme à identifier et photographier/i;

  for (const route of photoDebtRoutes) {
    const response = await render(route);
    assert.equal(response.status, 200, route);
    const html = await response.text();
    const visitorContent = html
      .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
      .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ");
    const imageAlts = [...html.matchAll(/\balt=["']([^"']*)["']/gi)]
      .map((match) => match[1])
      .join(" ");
    assert.doesNotMatch(`${visitorContent} ${imageAlts}`, internalCopy, route);
  }
});

test("Warocqueanum uses a scoped multiline species hero without changing its H1", async () => {
  const response = await render("/plantes/anthurium/warocqueanum");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /plant-profile-hero-anthurium-warocqueanum/i);
  assert.match(html, /<h1[^>]*>[\s\S]*?Anthurium[\s\S]*?warocqueanum[\s\S]*?<\/h1>/i);

  const css = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(css, /\.plant-profile-hero-anthurium-warocqueanum h1\{[^}]*font-size:clamp\(60px,7\.2vw,104px\)/i);
  assert.match(css, /\.plant-profile-hero-anthurium-warocqueanum \.scientific-binomial\{[^}]*flex-direction:column[^}]*white-space:normal/i);
});

test("the photo fallback remains trackable but contains no visitor-facing production note", () => {
  const fallback = readFileSync(new URL("../public/photo-reelle-a-venir.svg", import.meta.url), "utf8");
  assert.match(fallback, /viewBox=["']0 0 1200 1500["']/i);
  assert.doesNotMatch(fallback, /PHOTO RÉELLE DU SPÉCIMEN|AJOUTER AVANT PUBLICATION|Photographie réelle à venir/i);
});

test("Visual P1 preserves the three approved beta pilots", async () => {
  for (const route of ["/plantes", "/plantes/monstera", "/plantes/monstera/thai-constellation"]) {
    const response = await render(route);
    assert.equal(response.status, 200, route);
    const html = await response.text();
    assert.match(html, /<meta name="robots" content="noindex, nofollow/i, route);
    assert.match(html, /https:\/\/beta-shop\.tibaldo\.fr/i, route);
  }
});

test("links the opening event contextually from major editorial pages", async () => {
  for (const route of ["/plantes", "/substrats", "/services"]) {
    const response = await render(route);
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.match(html, /href=["']\/evenements\/ouverture-tibaldo-jungle-lille["']/i);
    assert.match(html, /Nouvelle boutique de plantes à Lille/i);
  }
});

test("renders the opening event with complete crawlable SEO data", async () => {
  const response = await render("/evenements/ouverture-tibaldo-jungle-lille");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /<title>Ouverture du Studio Végétal à Lille — 26 septembre 2026<\/title>/i);
  assert.match(html, /<meta(?=[^>]*property=["']og:title["'])(?=[^>]*content=["']Que faire à Lille le 26 septembre 2026 \? Ouverture du Studio Végétal["'])[^>]*>/i);
  assert.match(html, /<meta(?=[^>]*name=["']twitter:title["'])(?=[^>]*content=["']Que faire à Lille le 26 septembre 2026 \? Ouverture du Studio Végétal["'])[^>]*>/i);
  assert.match(html, /<link(?=[^>]*rel=["']canonical["'])(?=[^>]*href=["']https:\/\/jungle\.tibaldo\.fr\/evenements\/ouverture-tibaldo-jungle-lille["'])[^>]*>/i);
  assert.match(html, /<h1>Ouverture du Studio Végétal – Tibaldo Jungle à Lille<\/h1>/i);
  assert.match(html, /"@type":"Event"/i);
  assert.match(html, /"isAccessibleForFree":true/i);
  assert.match(html, /"@type":"FAQPage"/i);
  assert.match(html, /"@type":"BreadcrumbList"/i);
  assert.match(html, /26 septembre 2026/i);
  assert.doesNotMatch(html, /Que faire à Lille ce week-end/i);
});

test("serves every retained SEO migration as one direct 301", async () => {
  const redirects = new Map([
    ["/creation-boutique", "/coulisses"],
    ["/diagnostic-plante-lille", "/sos-plantes"],
    ["/traitement-thrips-lille", "/sos-plantes"],
    ["/conseils/thrips-plantes-interieur-lille", "/conseils/thrips-plantes-interieur"],
    ["/conseils/rempoter-plante-quand-comment", "/rempotage"],
    ["/rempotage-monstera-lille", "/rempotage-plantes-lille"],
    ["/substrat-alocasia-lille", "/plantes/alocasia"],
    ["/livraison-fleurs-coupees-lille", "/fleurs-sur-commande-lille"],
    ["/bouquets-fleurs-livraison-lille", "/fleurs-sur-commande-lille"],
  ]);
  for (const [source, destination] of redirects) {
    const response = await render(source);
    assert.equal(response.status, 301, source);
    assert.equal(new URL(response.headers.get("location"), "https://jungle.tibaldo.fr").pathname.replace(/\/$/, ""), destination);
  }
});

test("conserves the existing plant encyclopedia API contract", async () => {
  const response = await render("/api/encyclopedie/plantes");
  assert.equal(response.status, 200);
  const entries = await response.json();
  assert.ok(entries.length > 0);
  const expectedFields = ["id", "genre", "genreLabel", "slug", "displayName", "botanicalName", "cultivar", "family", "imageUrl", "imageAlt", "encyclopediaSlug", "encyclopediaUrl", "publishedAt", "updatedAt"];
  for (const entry of entries) {
    assert.deepEqual(Object.keys(entry), expectedFields);
    assert.match(entry.encyclopediaSlug, /^plantes\/[a-z0-9-]+\/[a-z0-9-]+$/);
    assert.equal(entry.encyclopediaUrl, `https://jungle.tibaldo.fr/${entry.encyclopediaSlug}`);
    assert.match(entry.imageUrl, /^https:\/\/jungle\.tibaldo\.fr\//);
    assert.ok(entry.botanicalName);
  }
  assert.equal(new Set(entries.map((entry) => entry.id)).size, entries.length);
  assert.equal(new Set(entries.map((entry) => entry.encyclopediaSlug)).size, entries.length);
  assert.ok(entries.some((entry) => entry.encyclopediaSlug === "plantes/epiphyllum/anguliger"));
});

test("exposes an additive versioned plant encyclopedia V2", async () => {
  const response = await render("/api/v2/encyclopedie/plantes");
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("x-tibaldo-contract-version"), "2.0");
  const entries = await response.json();
  assert.ok(entries.length > 0);
  assert.equal(new Set(entries.map((entry) => entry.botanicalName.toLowerCase())).size, entries.length);
  for (const entry of entries) {
    assert.equal(entry.contractVersion, "2.0");
    assert.ok(entry.navigationGenre);
    assert.ok(entry.taxonomy.genus);
    assert.equal(entry.taxonomyGenreDiffers, entry.taxonomy.genus.toLowerCase() !== entry.navigationGenre);
    assert.ok(entry.taxonomy.species);
    assert.ok(entry.primaryImage.url);
    assert.ok(entry.images.length > 0);
    assert.equal(entry.primaryImage.url, entry.imageUrl);
    for (const image of entry.images) {
      assert.match(image.path, /^\//);
      assert.equal(image.url, `https://jungle.tibaldo.fr${image.path}`);
      assert.ok(existsSync(new URL(`../public${image.path}`, import.meta.url)), `Média absent : ${image.path}`);
    }
  }
  const taxonKeys = entries.map((entry) => [entry.taxonomy.genus, entry.taxonomy.species, entry.taxonomy.cultivar ?? ""].join("|").toLowerCase());
  assert.equal(new Set(taxonKeys).size, entries.length);
});

test("returns 404 for an unknown encyclopedia plant page", async () => {
  const response = await render("/plantes/inconnu/plante-inconnue");
  assert.equal(response.status, 404);
});

test("renders Dicksonia, its hierarchy and the shared species hero fallback", async () => {
  for (const path of ["/plantes/dicksonia", "/plantes/famille/dicksoniaceae", "/plantes/dicksonia/antarctica"]) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
  }
  const plantsHtml = await (await render("/plantes")).text();
  assert.match(plantsHtml, /href=["']\/plantes\/dicksonia["']/i);
  const speciesHtml = await (await render("/plantes/dicksonia/antarctica")).text();
  assert.match(speciesHtml, /<h1[^>]*>[\s\S]*?Dicksonia[\s\S]*?antarctica[\s\S]*?<\/h1>/i);
  assert.match(speciesHtml, /has-editorial-fallback/i);
  assert.match(speciesHtml, /Cultiver Dicksonia antarctica à Lille et dans le Nord/i);
  assert.match(speciesHtml, /rel=["']canonical["'][^>]+plantes\/dicksonia\/antarctica/i);
  assert.doesNotMatch(speciesHtml, /Dictyonia/i);
  const api = await (await render("/api/encyclopedie/plantes")).json();
  assert.equal(api.length, 46);
  assert.ok(api.some((entry) => entry.encyclopediaSlug === "plantes/dicksonia/antarctica"));
});

test("renders the Agave, Fatsia and five-species Strelitzia cluster", async () => {
  const paths = [
    "/plantes/agave", "/plantes/agave/americana-variegata",
    "/plantes/fatsia", "/plantes/fatsia/japonica-spiders-web",
    "/plantes/strelitzia", "/plantes/strelitzia/alba", "/plantes/strelitzia/caudata",
    "/plantes/strelitzia/juncea", "/plantes/strelitzia/nicolai", "/plantes/strelitzia/reginae",
  ];
  for (const path of paths) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assert.match(html, /<h1/i, path);
    assert.match(html, /rel=["']canonical["']/i, path);
    if (path.split("/").length === 4) assert.match(html, /has-editorial-fallback/i, path);
    assert.doesNotMatch(html, /\/_vinext\/image/i, path);
    assert.match(html, /noindex/i, path);
  }
  const hub = await (await render("/plantes/strelitzia")).text();
  assert.match(hub, /cinq espèces/i);
  assert.match(hub, /synonyme de S\. alba/i);
  assert.doesNotMatch(hub, /href=["']\/plantes\/strelitzia\/augusta/i);
  const api = await (await render("/api/v2/encyclopedie/plantes")).json();
  assert.equal(api.length, 46);
  assert.equal(new Set(api.map((entry) => entry.encyclopediaSlug)).size, 46);
});

test("uses only owner-approved Botanical Genus Heroes and excludes rejected prototypes", async () => {
  const strelitzia = await (await render("/plantes/strelitzia")).text();
  assert.match(strelitzia, /class=["'][^"']*botanical-genus-hero[^"']*["']/i);
  assert.match(strelitzia, /data-genus=["']strelitzia["']/i);
  assert.match(strelitzia, /class=["']botanical-genus-svg["']/i);
  assert.match(strelitzia, /aria-hidden=["']true["']/i);

  const chlorophytum = await (await render("/plantes/chlorophytum")).text();
  assert.match(chlorophytum, /class=["'][^"']*botanical-genus-hero[^"']*["']/i);
  assert.match(chlorophytum, /data-genus=["']chlorophytum["']/i);
  assert.match(chlorophytum, /class=["']botanical-genus-mask["']/i);
  assert.match(chlorophytum, /chlorophytum-v2\.svg/i);
  assert.doesNotMatch(chlorophytum, /\/_vinext\/image/i);
  assert.ok(existsSync(new URL("../public/images/botanical-heroes/prototypes/chlorophytum-v2.svg", import.meta.url)));

  for (const [genre, asset] of [
    ["alocasia", "alocasia-v32.svg"],
    ["dicksonia", "dicksonia-prototype.svg"],
  ]) {
    const html = await (await render(`/plantes/${genre}`)).text();
    assert.match(html, /class=["'][^"']*botanical-genus-hero[^"']*["']/i, genre);
    assert.match(html, new RegExp(`data-genus=["']${genre}["']`, "i"), genre);
    assert.match(html, /class=["']botanical-genus-mask["']/i, genre);
    assert.match(html, new RegExp(asset.replace(".", "\\."), "i"), genre);
    assert.doesNotMatch(html, /\/_vinext\/image/i, genre);
    assert.ok(existsSync(new URL(`../public/images/botanical-heroes/prototypes/${asset}`, import.meta.url)), genre);
  }

  const monstera = await (await render("/plantes/monstera")).text();
  assert.doesNotMatch(monstera, /class=["'][^"']*botanical-genus-hero[^"']*["']/i);
  assert.doesNotMatch(monstera, /monstera-prototype\.svg/i);
  assert.match(monstera, /class=["'][^"']*photo-genus-hero[^"']*["']/i);
  assert.match(monstera, /monstera-deliciosa-feuilles\.jpg/i);
  assert.match(monstera, /fetchpriority=["']high["']/i);

  const anthurium = await (await render("/plantes/anthurium")).text();
  assert.doesNotMatch(anthurium, /class=["'][^"']*botanical-genus-hero[^"']*["']/i);
});

test("renders the three V2.1 genus pilots with crawlable one-time motion primitives", async () => {
  const signatures = new Map([
    ["alocasia", /Humide ne veut pas dire détrempé/i],
    ["chlorophytum", /Des stolons aux jeunes plants/i],
    ["dicksonia", /Humidifier sans enfermer/i],
  ]);

  for (const [genre, signature] of signatures) {
    const html = await (await render(`/plantes/${genre}`)).text();
    assert.match(html, new RegExp(`genus-pilot-${genre}`, "i"), genre);
    assert.match(html, /genus-motion-v1/i, genre);
    assert.match(html, /data-motion=["'](?:metric|editorial|process|composition|service|section)["']/i, genre);
    assert.match(html, signature, genre);
    assert.match(html, /application\/ld\+json/i, genre);
    assert.match(html, new RegExp(`rel=["']canonical["'][^>]+plantes/${genre}`, "i"), genre);
  }

  const anthurium = await (await render("/plantes/anthurium")).text();
  assert.doesNotMatch(anthurium, /genus-motion-v1/i);

  const css = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(css, /\.genus-motion-v1 \[data-motion/i);
  assert.match(css, /@media\(prefers-reduced-motion:reduce\)[\s\S]*\.genus-motion-v1/i);
});

test("renders Editorial Rhythm V1 only on the three pilots with accessible compact interactions", async () => {
  for (const genre of ["alocasia", "chlorophytum", "dicksonia"]) {
    const html = await (await render(`/plantes/${genre}`)).text();
    assert.match(html, /class=["'][^"']*pilot-rhythm-secondary[^"']*["']/i, genre);
    assert.match(html, new RegExp(`pilot-botanical-fragment-${genre}`, "i"), genre);
    assert.match(html, /aria-hidden=["']true["'][^>]+data-motion=["']fragment["']/i, genre);
    assert.match(html, /class=["']rhythm-symptom-index["']/i, genre);
    assert.match(html, /Causes possibles/i, genre);
    assert.match(html, /Bon réflexe/i, genre);
    assert.match(html, /class=["']rhythm-faq-list["']/i, genre);
    assert.match(html, /aria-expanded=["']false["']/i, genre);
    assert.match(html, /aria-controls=/i, genre);
  }

  for (const untouched of ["/plantes", "/plantes/anthurium", "/plantes/anthurium/veitchii"]) {
    const html = await (await render(untouched)).text();
    assert.doesNotMatch(html, /pilot-rhythm-secondary|rhythm-symptom-index|rhythm-faq-list/i, untouched);
  }

  const css = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(css, /Editorial Rhythm V1/i);
  assert.match(css, /@media\(prefers-reduced-motion:reduce\)[\s\S]*\.rhythm-faq-panel/i);
});

test("renders /plantes V3 as a crawlable editorial mosaic and Botanical Directory", async () => {
  const html = await (await render("/plantes")).text();
  assert.match(html, /class=["'][^"']*plants-hub-hero[^"']*["']/i);
  assert.match(html, /href=["']#recherche-plantes["']/i);
  assert.match(html, /id=["']recherche-plantes["']/i);
  assert.match(html, /class=["'][^"']*plants-v3-essential-grid[^"']*["']/i);
  assert.match(html, /class=["'][^"']*botanical-directory-v3[^"']*["']/i);
  assert.match(html, /aria-expanded=["']true["']/i);
  assert.match(html, /aria-controls=/i);
  assert.match(html, /Trente et un genres/i);
  for (const name of ["Monstera", "Anthurium", "Philodendron", "Chlorophytum", "Sansevieria"]) {
    assert.match(html, new RegExp(`>${name}<`, "i"), name);
  }
  assert.match(html, /<details[^>]*>[\s\S]*Collection/i);
});

test("renders Thai Constellation as the only Species Editorial V3 prototype", async () => {
  const thai = await (await render("/plantes/monstera/thai-constellation")).text();
  assert.match(thai, /thai-profile-v3/i);
  assert.match(thai, /thai-v3-identity-sheet/i);
  assert.match(thai, /thai-v3-care-grid/i);
  assert.match(thai, /thai-v3-substrate/i);
  assert.match(thai, /Causes possibles/i);
  assert.match(thai, /aria-expanded=["']false["']/i);
  assert.match(thai, /Thai Constellation[\s\S]*Albo Variegata/i);
  assert.doesNotMatch(thai, /\/\_vinext\/image/i);

  for (const path of ["/plantes/anthurium/veitchii", "/plantes/monstera/deliciosa"]) {
    const html = await (await render(path)).text();
    assert.doesNotMatch(html, /thai-profile-v3|thai-v3-identity-sheet/i, path);
  }
});

test("renders Species UX NEXT only for Monstera deliciosa", async () => {
  const response = await render("/plantes/monstera/deliciosa");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /species-next-page/i);
  assert.match(html, /Sommaire de la fiche Monstera deliciosa/i);
  for (const id of ["apercu", "identite", "comprendre", "cultiver", "racines", "diagnostic", "comparer", "regard", "faq", "sources", "explorer"]) {
    assert.match(html, new RegExp(`id=["']${id}["']`, "i"), id);
  }
  assert.equal((html.match(/class=["'][^"']*species-next-nav[^"']*["']/gi) ?? []).length >= 1, true);
  for (const href of ["#apercu", "#identite", "#cultiver", "#diagnostic", "#comparer", "#faq"]) {
    assert.match(html, new RegExp(`href=["']${href}["']`, "i"), href);
  }
  assert.doesNotMatch(html, /plant-care-passport|plant-identity-signature|plant-taxonomy|care-meter-grid|plant-gallery/i);
  assert.match(html, /Monstera borsigiana[\s\S]*synonyme/i);
  assert.match(html, /Rhaphidophora tetrasperma/i);
  assert.match(html, /Causes possibles[\s\S]*Comment vérifier[\s\S]*Action conseillée/i);
  assert.match(html, /Conseil du Studio/i);
  assert.doesNotMatch(html, /Observation Tibaldo Jungle/i);
  assert.match(html, /aria-expanded=["']false["']/i);
  assert.match(html, /"@type":"FAQPage"/i);
  assert.match(html, /Pourquoi les nouvelles feuilles n’ont-elles pas de trous/i);
  assert.match(html, /monstera-deliciosa-feuilles\.jpg/i);
  assert.doesNotMatch(html, /botanix\.com/i);
  assert.match(html, /<meta name="robots" content="noindex, nofollow/i);
  assert.match(html, /rel=["']canonical["'][^>]+plantes\/monstera\/deliciosa/i);

  for (const untouched of [
    "/plantes/monstera",
    "/plantes/monstera/thai-constellation",
    "/plantes/monstera/mint",
    "/plantes/monstera/adansonii",
    "/plantes/monstera/burle-marx-flame",
    "/plantes/monstera/esqueleto",
    "/plantes/anthurium/veitchii",
  ]) {
    const untouchedHtml = await (await render(untouched)).text();
    assert.doesNotMatch(untouchedHtml, /species-next-page/i, untouched);
  }
});

test("serves species hero photos directly without the vinext image optimizer", async () => {
  for (const [path, image] of [
    ["/plantes/cycas/revoluta", "/images/cycas-revoluta/cycas-revoluta-terrasse-tibaldo.webp"],
    ["/plantes/monstera/deliciosa", "/monstera-deliciosa-feuilles.jpg"],
    ["/plantes/anthurium/veitchii", "/anthurium-veitchii-king.jpg"],
  ]) {
    const html = await (await render(path)).text();
    assert.match(html, new RegExp(`<img[^>]+src=["']${image.replaceAll("/", "\\/")}["']`, "i"), path);
    assert.match(html, /fetchpriority=["']high["']/i, path);
    assert.match(html, /loading=["']eager["']/i, path);
    assert.match(html, /decoding=["']async["']/i, path);
    assert.doesNotMatch(html, /\/_vinext\/image/i, path);
  }
});

test("renders the Bananiers cluster and preserves its API identities", async () => {
  for (const path of ["/plantes/bananiers", "/plantes/musa", "/plantes/ensete", "/plantes/musa/basjoo", "/plantes/musa/sikkimensis-red-tiger", "/plantes/musa/florida-variegata", "/plantes/ensete/ventricosum-maurelii"]) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assert.match(html, /<h1/i, path);
    assert.match(html, /canonical/i, path);
  }
  const entries = await (await render("/api/v2/encyclopedie/plantes")).json();
  const florida = entries.find((entry) => entry.encyclopediaSlug === "plantes/musa/florida-variegata");
  assert.equal(florida.taxonomy.species, "Non déterminée");
  assert.equal(florida.cultivar, "Florida Variegata");
});

test("consolidates the V2 hierarchy without orphaning Anthurium or Bananiers", async () => {
  const plantsPage = await (await render("/plantes")).text();
  assert.match(plantsPage, /href=["']\/plantes\/bananiers["']/i);
  assert.doesNotMatch(plantsPage, /class=["']plant-family-card["'][^>]+href=["']\/plantes\/(?:musa|ensete)["']/i);

  const anthurium = await (await render("/plantes/anthurium")).text();
  assert.match(anthurium, /href=["']\/plantes\/anthurium\/clarinervium["']/i);
  assert.match(anthurium, /href=["']\/plantes\/anthurium\/warocqueanum["']/i);

  const bananiers = await (await render("/plantes/bananiers")).text();
  for (const path of ["/plantes/musa", "/plantes/ensete", "/plantes/musa/basjoo", "/plantes/musa/sikkimensis-red-tiger", "/plantes/musa/florida-variegata", "/plantes/ensete/ventricosum-maurelii"]) {
    assert.match(bananiers, new RegExp(`href=["']${path.replaceAll("/", "\\/")}["']`, "i"), path);
  }
});

test("serves complete SEO metadata for the nine V2 pages", async () => {
  const paths = [
    "/plantes/anthurium/clarinervium",
    "/plantes/anthurium/warocqueanum",
    "/plantes/bananiers",
    "/plantes/musa",
    "/plantes/ensete",
    "/plantes/musa/basjoo",
    "/plantes/musa/sikkimensis-red-tiger",
    "/plantes/musa/florida-variegata",
    "/plantes/ensete/ventricosum-maurelii",
  ];
  for (const path of paths) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assert.match(html, /<title>[^<]+<\/title>/i, path);
    assert.match(html, /<meta[^>]+name=["']description["'][^>]+content=["'][^"']+/i, path);
    assert.match(html, /<meta[^>]+property=["']og:title["']/i, path);
    assert.match(html, /<meta[^>]+property=["']og:image["']/i, path);
    assert.match(html, /"@type":"BreadcrumbList"/i, path);
    assert.match(html, /<link[^>]+rel=["']canonical["']/i, path);
    assert.match(html, /noindex/i, path);
  }
});
