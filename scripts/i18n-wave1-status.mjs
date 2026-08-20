import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { createServer } from "vite";

const root = new URL("..", import.meta.url).pathname;
const manifest = JSON.parse(await readFile(new URL("../lib/i18n/wave1-editorial-status.generated.json", import.meta.url), "utf8"));
const vite = await createServer({ root, appType: "custom", configFile: false, resolve: { alias: { "@": root } }, server: { middlewareMode: true } });
const [{ plants }, { familyGuides }, { familyEditorials }] = await Promise.all([vite.ssrLoadModule("/lib/plants/catalog.ts"), vite.ssrLoadModule("/lib/plants/family-guides.ts"), vite.ssrLoadModule("/lib/plants/family-editorials.ts")]);
const hash = (value) => createHash("sha256").update(JSON.stringify(value)).digest("hex");
const sourceFor = (path, kind) => {
  if (kind === "identity") { const [, , genre, slug] = path.split("/"); return plants.find((plant) => plant.genre === genre && plant.slug === slug); }
  if (kind === "genre") { const genre = path.split("/")[2]; return { guide: familyGuides[genre], editorials: familyEditorials[genre] ?? [], identities: plants.filter((plant) => plant.genre === genre).map(({ genre: g, slug, botanicalName, updatedAt }) => ({ genre: g, slug, botanicalName, updatedAt })) }; }
  if (kind === "family") { const family = path.split("/").at(-1); return plants.filter((plant) => plant.taxonomy.family.toLowerCase() === family).map(({ genre, slug, botanicalName, subtitle, updatedAt }) => ({ genre, slug, botanicalName, subtitle, updatedAt })); }
  return { path, source: "pilot-v1" };
};
let invalid = 0;
console.log("Jungle multilingue V2 — état éditorial Vague 1\n");
for (const [path, page] of Object.entries(manifest.pages)) {
  const current = hash(sourceFor(path, page.kind));
  const sourceChanged = current !== page.sourceFingerprint;
  const states = ["en", "es"].map((locale) => {
    const translation = page.translations[locale];
    const derived = sourceChanged || translation.translatedFromFingerprint !== current ? "outdated" : translation.status;
    const valid = derived === "published" && translation.parity === "validated";
    if (!valid) invalid += 1;
    return `${locale.toUpperCase()} ${derived}/${translation.parity}`;
  });
  console.log(`${path} · ${states.join(" · ")}`);
}
await vite.close();
if (process.argv.includes("--check") && invalid) { console.error(`\n${invalid} traduction(s) non publiable(s).`); process.exitCode = 1; }
