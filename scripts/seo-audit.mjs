const origin = "http://localhost";
const workerUrl = new URL("../dist/server/index.js", import.meta.url);
const { default: worker } = await import(`${workerUrl.href}?audit=${Date.now()}`);
const env = { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } };
const ctx = { waitUntil() {}, passThroughOnException() {} };
const fetchRoute = (path) => worker.fetch(new Request(`${origin}${path}`, { redirect: "manual" }), env, ctx);
const sitemapResponse = await fetchRoute("/sitemap.xml");
if (sitemapResponse.status !== 200) throw new Error(`Sitemap HTTP ${sitemapResponse.status}`);
const xml = await sitemapResponse.text();
const paths = [...xml.matchAll(/<loc>https:\/\/jungle\.tibaldo\.fr([^<]*)<\/loc>/g)].map((match) => match[1] || "/");
const errors = [];
for (const path of paths) {
  const response = await fetchRoute(path);
  const html = await response.text();
  const canonical = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)/i)?.[1] ?? html.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical/i)?.[1];
  if (response.status !== 200) errors.push(`${path}: HTTP ${response.status}`);
  if (!/<title>[^<]+<\/title>/i.test(html)) errors.push(`${path}: title absent`);
  if ((html.match(/<h1(?:\s|>)/gi) ?? []).length !== 1) errors.push(`${path}: H1 non unique`);
  if (!/<meta[^>]+name=["']description["']/i.test(html)) errors.push(`${path}: meta description absente`);
  if (/noindex/i.test(html)) errors.push(`${path}: noindex présent dans le sitemap`);
  const expected = `https://jungle.tibaldo.fr${path === "/" ? "" : path}`;
  if (canonical !== expected && canonical !== `${expected}/`) errors.push(`${path}: canonical ${canonical ?? "absente"}`);
}
const redirects = {
  "/creation-boutique": "/coulisses", "/diagnostic-plante-lille": "/sos-plantes", "/traitement-thrips-lille": "/sos-plantes",
  "/conseils/thrips-plantes-interieur-lille": "/conseils/thrips-plantes-interieur", "/conseils/rempoter-plante-quand-comment": "/rempotage",
  "/rempotage-monstera-lille": "/rempotage-plantes-lille", "/substrat-alocasia-lille": "/plantes/alocasia",
  "/livraison-fleurs-coupees-lille": "/fleurs-sur-commande-lille", "/bouquets-fleurs-livraison-lille": "/fleurs-sur-commande-lille",
};
for (const [source, destination] of Object.entries(redirects)) {
  const response = await fetchRoute(source);
  if (response.status !== 301) errors.push(`${source}: redirection ${response.status}, attendu 301`);
  if (new URL(response.headers.get("location") ?? origin).pathname !== destination) errors.push(`${source}: destination incorrecte`);
  if (paths.includes(source)) errors.push(`${source}: source présente dans le sitemap`);
  if ((await fetchRoute(destination)).status !== 200) errors.push(`${source}: destination non 200`);
}
if (errors.length) { console.error(errors.join("\n")); process.exitCode = 1; }
else console.log(`Audit SEO validé : ${paths.length} URL canoniques et ${Object.keys(redirects).length} redirections directes.`);
