import { publicPermanentRedirects } from "../lib/seo/public-redirects.ts";
import { expectedPublicSitemapUrlCount } from "./public-sitemap-contract.mjs";

const origin = "http://localhost";
const publicOrigin = "https://jungle.tibaldo.fr";
const betaOrigin = "https://beta-jungle.tibaldo.fr";
const publicMode = process.env.JUNGLE_ENV === "public";
const workerUrl = new URL("../dist/server/index.js", import.meta.url);
const { default: worker } = await import(`${workerUrl.href}?audit=${Date.now()}`);
const env = { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } };
const ctx = { waitUntil() {}, passThroughOnException() {} };
const fetchRoute = (path) => worker.fetch(new Request(`${origin}${path}`, { redirect: "manual" }), env, ctx);
const robotsMeta = (html) =>
  html.match(/<meta(?=[^>]*name=["']robots["'])(?=[^>]*content=["']([^"']*)["'])[^>]*>/i)?.[1] ?? "";
const canonicalFor = (html) =>
  html.match(/<link(?=[^>]*rel=["']canonical["'])(?=[^>]*href=["']([^"']+)["'])[^>]*>/i)?.[1] ?? null;
const hasRestrictiveRobots = (value) => /\b(?:noindex|nofollow)\b/i.test(value ?? "");

const labRoutes = [
  "/lab/v19/anthurium/veitchii",
  "/lab/v19/monstera/deliciosa",
  "/lab/v19/pilea/peperomioides",
  "/lab/v23/anthurium/veitchii",
  "/lab/v23/golden-hub/pilea",
  "/lab/v23/golden-species/pilea-peperomioides",
  "/lab/v25-1/golden-hub/pilea",
  "/lab/v25-1/golden-species/anthurium-veitchii",
  "/lab/v25-2/golden-hub/pilea",
  "/lab/v25-3/golden-hub/pilea",
  "/lab/v25-4/golden-hub/pilea",
];

const sitemapResponse = await fetchRoute("/sitemap.xml");
const errors = [];

if (!publicMode) {
  if (sitemapResponse.status !== 404) errors.push(`Sitemap HTTP ${sitemapResponse.status}, attendu 404 en BÊTA`);
  if (sitemapResponse.headers.get("x-robots-tag") !== "noindex, nofollow") errors.push("Sitemap BÊTA sans X-Robots-Tag noindex, nofollow");

  const robots = await fetchRoute("/robots.txt");
  const robotsText = await robots.text();
  if (robots.status !== 200) errors.push(`robots.txt HTTP ${robots.status}`);
  if (!/^Disallow: \/$/im.test(robotsText)) errors.push("robots.txt BÊTA ne bloque pas la racine");
  if (/^Sitemap:/im.test(robotsText)) errors.push("robots.txt BÊTA déclare encore un sitemap");
  if (robots.headers.get("x-robots-tag") !== "noindex, nofollow") errors.push("robots.txt BÊTA sans X-Robots-Tag noindex, nofollow");

  for (const path of ["/", "/plantes", "/rempotage", "/plantes/anthurium/veitchii"]) {
    const response = await fetchRoute(path);
    const html = await response.text();
    if (response.status !== 200) errors.push(`${path}: HTTP ${response.status}`);
    if (response.headers.get("x-robots-tag") !== "noindex, nofollow") errors.push(`${path}: en-tête X-Robots-Tag incorrect`);
    if (!/\bnoindex\b/i.test(robotsMeta(html)) || !/\bnofollow\b/i.test(robotsMeta(html))) errors.push(`${path}: meta robots BÊTA absente`);
    if (!html.includes("MODE BÊTA / TEST")) errors.push(`${path}: badge BÊTA absent`);
    if (!html.includes(betaOrigin.replace("beta-jungle", "beta-shop"))) errors.push(`${path}: destination Shop BÊTA absente`);
  }

  if (errors.length) {
    console.error(errors.join("\n"));
    process.exitCode = 1;
  } else {
    console.log("Audit SEO BÊTA validé : noindex,nofollow global, robots fermé, sitemap absent, badge et Shop BÊTA préservés.");
  }
  process.exit();
}

if (sitemapResponse.status !== 200) throw new Error(`Sitemap HTTP ${sitemapResponse.status}`);
if (!/^application\/xml\b/i.test(sitemapResponse.headers.get("content-type") ?? "")) errors.push("Sitemap sans type XML");
const xml = await sitemapResponse.text();
const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const paths = locs
  .filter((location) => location.startsWith(publicOrigin))
  .map((location) => new URL(location).pathname);
const duplicateLocations = locs.filter((location, index) => locs.indexOf(location) !== index);
const nonPublicLocations = locs.filter((location) => !location.startsWith(`${publicOrigin}/`) && location !== publicOrigin);
if (locs.length !== expectedPublicSitemapUrlCount) {
  errors.push(`Sitemap contient ${locs.length} URL, attendu ${expectedPublicSitemapUrlCount} selon l’inventaire certifié`);
}
if (duplicateLocations.length) errors.push(`Sitemap contient ${duplicateLocations.length} doublon(s)`);
if (nonPublicLocations.length) errors.push(`Sitemap contient ${nonPublicLocations.length} hôte(s) non PUBLIC`);
if (/beta-jungle|localhost|chatgpt\.site/i.test(xml)) errors.push("Sitemap contient une référence de staging");
if (paths.some((path) => path.startsWith("/lab/"))) errors.push("Sitemap contient une route Lab");

const robots = await fetchRoute("/robots.txt");
const robotsText = await robots.text();
if (robots.status !== 200) errors.push(`robots.txt HTTP ${robots.status}`);
if (!/^Allow: \/$/im.test(robotsText)) errors.push("robots.txt PUBLIC n'autorise pas la racine");
if (/^Disallow: \/$/im.test(robotsText)) errors.push("robots.txt PUBLIC bloque la racine");
if (!new RegExp(`^Sitemap: ${publicOrigin.replaceAll(".", "\\.")}\/sitemap\\.xml$`, "im").test(robotsText)) errors.push("robots.txt PUBLIC sans sitemap canonique");
if (hasRestrictiveRobots(robots.headers.get("x-robots-tag"))) errors.push("robots.txt PUBLIC porte un X-Robots-Tag restrictif");

for (const path of paths) {
  const response = await fetchRoute(path);
  const html = await response.text();
  const canonical = canonicalFor(html);
  if (response.status !== 200) errors.push(`${path}: HTTP ${response.status}`);
  if (!/<title>[^<]+<\/title>/i.test(html)) errors.push(`${path}: title absent`);
  if ((html.match(/<h1(?:\s|>)/gi) ?? []).length !== 1) errors.push(`${path}: H1 non unique`);
  if (!/<meta[^>]+name=["']description["']/i.test(html)) errors.push(`${path}: meta description absente`);
  if (hasRestrictiveRobots(response.headers.get("x-robots-tag"))) errors.push(`${path}: X-Robots-Tag restrictif`);
  if (hasRestrictiveRobots(robotsMeta(html))) errors.push(`${path}: meta robots restrictive`);
  const expected = `${publicOrigin}${path === "/" ? "" : path}`;
  if (canonical !== expected && canonical !== `${expected}/`) errors.push(`${path}: canonical ${canonical ?? "absente"}`);
  if (/beta-jungle\.tibaldo\.fr|localhost|tibaldo\.chatgpt\.site/i.test(canonical ?? "")) errors.push(`${path}: canonical de staging`);
}

for (const path of ["/", "/plantes", "/rempotage"]) {
  const response = await fetchRoute(path);
  const html = await response.text();
  if (response.status !== 200) errors.push(`${path}: prévisualisation HTTP ${response.status}`);
  if (hasRestrictiveRobots(response.headers.get("x-robots-tag"))) errors.push(`${path}: X-Robots-Tag PUBLIC restrictif`);
  if (hasRestrictiveRobots(robotsMeta(html))) errors.push(`${path}: meta robots PUBLIC restrictive`);
  if (/MODE BÊTA|MODE TEST/i.test(html)) errors.push(`${path}: indicateur BÊTA/TEST visible`);
  if (/beta-shop\.tibaldo\.fr/i.test(html)) errors.push(`${path}: lien Shop BÊTA visible`);
  if (!/https:\/\/shop\.tibaldo\.fr/i.test(html)) errors.push(`${path}: destination Shop PUBLIC absente`);
}

let lab200 = 0;
let lab404 = 0;
for (const path of labRoutes) {
  const response = await fetchRoute(path);
  if (response.status === 200) lab200 += 1;
  if (response.status === 404) lab404 += 1;
  if (response.status !== 404) errors.push(`${path}: HTTP ${response.status}, attendu 404`);
}
if (lab200 !== 0 || lab404 !== labRoutes.length) errors.push(`Labs PUBLIC: ${lab200} en 200, ${lab404} en 404`);

for (const [source, destination] of Object.entries(publicPermanentRedirects)) {
  const response = await fetchRoute(source);
  if (response.status !== 301) errors.push(`${source}: redirection ${response.status}, attendu 301`);
  if (new URL(response.headers.get("location") ?? origin).pathname.replace(/\/$/, "") !== destination) errors.push(`${source}: destination incorrecte`);
  if (paths.includes(source)) errors.push(`${source}: source présente dans le sitemap`);
  if ((await fetchRoute(destination)).status !== 200) errors.push(`${source}: destination non 200`);
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Audit SEO PUBLIC validé : ${paths.length} URL uniques, ${lab404} Labs en 404 et ${Object.keys(publicPermanentRedirects).length} redirections directes.`);
}
