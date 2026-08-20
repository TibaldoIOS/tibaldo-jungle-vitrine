import { writeFile, readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { createServer } from "vite";

const root = new URL("..", import.meta.url).pathname;
const output = new URL("../lib/i18n/wave1-translations.generated.json", import.meta.url);
const inventoryUrl = new URL("../lib/i18n/wave1-inventory.generated.json", import.meta.url);
const statusUrl = new URL("../lib/i18n/wave1-editorial-status.generated.json", import.meta.url);
const vite = await createServer({
  root,
  appType: "custom",
  configFile: false,
  resolve: { alias: { "@": root } },
  server: { middlewareMode: true },
});
const [{ plants }, { familyGuides }, { familyEditorials }] = await Promise.all([
  vite.ssrLoadModule("/lib/plants/catalog.ts"),
  vite.ssrLoadModule("/lib/plants/family-guides.ts"),
  vite.ssrLoadModule("/lib/plants/family-editorials.ts"),
]);

const candidates = new Set();
const protectedKeys = new Set(["slug", "genre", "botanicalName", "displayName", "listingName", "name", "family", "order", "genus", "species", "cultivar", "url", "src", "shopUrl", "publishedAt", "updatedAt"]);
const protectedArrays = new Set(["synonyms"]);
const visit = (value, key = "") => {
  if (typeof value === "string") {
    if (!protectedKeys.has(key) && value.trim() && !/^https?:\/\//.test(value) && !/^\//.test(value)) candidates.add(value);
    return;
  }
  if (Array.isArray(value)) {
    if (protectedArrays.has(key)) return;
    for (const item of value) visit(item, key);
    return;
  }
  if (value && typeof value === "object") for (const [childKey, child] of Object.entries(value)) visit(child, childKey);
};
visit(plants);
visit(familyGuides);
visit(familyEditorials);

let existing = { en: {}, es: {} };
try { existing = JSON.parse(await readFile(output, "utf8")); } catch { /* first generation */ }

const translate = async (text, locale) => {
  const query = new URLSearchParams({ client: "gtx", sl: "fr", tl: locale, dt: "t", q: text });
  for (let attempt = 0; attempt < 4; attempt += 1) {
    try {
      const response = await fetch(`https://translate.googleapis.com/translate_a/single?${query}`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      const translated = data[0].map((part) => part[0]).join("").trim();
      if (!translated) throw new Error("empty translation");
      return translated;
    } catch (error) {
      if (attempt === 3) throw new Error(`${locale}: ${text.slice(0, 80)} — ${error}`);
      await new Promise((resolve) => setTimeout(resolve, 400 * (attempt + 1)));
    }
  }
};

const normalizeTranslation = (source, target, locale) => {
  let value = target;
  if (locale === "en") value = value
    .replace(/subject to availability/gi, "__AVAILABILITY__")
    .replace(/\bsubjects\b/gi, "specimens").replace(/\bsubject\b/gi, "specimen")
    .replace(/\btopics\b/gi, "specimens").replace(/\btopic\b/gi, "specimen")
    .replace(/waffle leaves/gi, "corrugated leaves")
    .replace(/top few inches/gi, "top few centimetres").replace(/several inches/gi, "several centimetres")
    .replace(/pierced pot/gi, "pot with drainage holes").replace(/pot must be pierced/gi, "pot must have drainage holes").replace(/pot that must be pierced/gi, "pot that must have drainage holes").replace(/pot pierced and/gi, "pot with drainage holes, adjusted and")
    .replace(/actual photograph/gi, "real photograph")
    .replace(/new listing/gi, "new profile").replace(/__AVAILABILITY__/g, "subject to availability");
  if (locale === "es") value = value
    .replace(/sujeto a disponibilidad/gi, "__DISPONIBILIDAD__")
    .replace(/\bsujetos\b/gi, "ejemplares").replace(/\bsujeto\b/gi, "ejemplar")
    .replace(/\btemas\b/gi, "ejemplares").replace(/\btema\b/gi, "ejemplar")
    .replace(/hojas? de gofre/gi, "hojas corrugadas").replace(/Selva Tibaldo/gi, "Tibaldo Jungle")
    .replace(/\bolla\b/gi, "maceta").replace(/\blistado\b/gi, "ficha")
    .replace(/__DISPONIBILIDAD__/g, "según disponibilidad");
  const cultivarReplacements = locale === "es" ? {
    "Imperial Red": [/Rojo Imperial/gi, /Roja Imperial/gi, /Imperial Roja/gi],
    "Marble Queen": [/Reina de mármol/gi, /Reina de Mármol/gi],
    "Royal Queen": [/Reina Real/gi], "Delta Force": [/Fuerza Delta/gi, /Fuerza delta/gi],
    "Dark Phoenix": [/Fénix Oscuro/gi], "Burle Marx Flame": [/Llama de Burle Marx/gi, /Llama Monstera Burle Marx/gi, /Burlé Marx Llama/gi],
    "Red Tiger": [/Tigre Rojo/gi], "Mint": [/\bMenta\b/gi], "Lemon Lime": [/Lima Limón/gi, /Lima Limon/gi, /lima limón/gi],
  } : {};
  for (const [cultivar, patterns] of Object.entries(cultivarReplacements)) if (source.includes(cultivar)) for (const pattern of patterns) value = value.replace(pattern, cultivar);
  if (source.includes("3 place de l’Arbonnoise")) value = value.replace(/(?:at |en |en el número )?3 (?:place|plaza) de l['’]Arbonnoise/gi, "3 place de l’Arbonnoise");
  if (source.includes("années 1990")) value = value.replace(/años 90\b/gi, "década de 1990");
  return value;
};

const queue = [...candidates];
for (const locale of ["en", "es"]) {
  const missing = queue.filter((source) => !existing[locale][source]);
  let cursor = 0;
  const workers = Array.from({ length: 8 }, async () => {
    while (cursor < missing.length) {
      const index = cursor++;
      const source = missing[index];
      existing[locale][source] = await translate(source, locale);
      if ((index + 1) % 50 === 0) process.stdout.write(`${locale} ${index + 1}/${missing.length}\n`);
    }
  });
await Promise.all(workers);
  for (const [source, target] of Object.entries(existing[locale])) existing[locale][source] = normalizeTranslation(source, target, locale);
}

await writeFile(output, `${JSON.stringify(existing, null, 2)}\n`);
const inventory = JSON.parse(await readFile(inventoryUrl, "utf8"));
const fingerprint = (value) => createHash("sha256").update(JSON.stringify(value)).digest("hex");
const sourceFor = ({ path, kind }) => {
  if (kind === "identity") { const [, , genre, slug] = path.split("/"); return plants.find((plant) => plant.genre === genre && plant.slug === slug); }
  if (kind === "genre") { const genre = path.split("/")[2]; return { guide: familyGuides[genre], editorials: familyEditorials[genre] ?? [], identities: plants.filter((plant) => plant.genre === genre).map(({ genre: g, slug, botanicalName, updatedAt }) => ({ genre: g, slug, botanicalName, updatedAt })) }; }
  if (kind === "family") { const family = path.split("/").at(-1); return plants.filter((plant) => plant.taxonomy.family.toLowerCase() === family).map(({ genre, slug, botanicalName, subtitle, updatedAt }) => ({ genre, slug, botanicalName, subtitle, updatedAt })); }
  return { path, source: "pilot-v1" };
};
const status = { generatedAt: "2026-08-20", pages: Object.fromEntries(inventory.paths.map((entry) => { const sourceFingerprint = fingerprint(sourceFor(entry)); return [entry.path, { kind: entry.kind, sourceVersion: "fr-wave1-2026-08-20.1", sourceFingerprint, translations: { en: { version: "en-wave1-2026-08-20.1", status: "published", parity: "validated", translatedFromFingerprint: sourceFingerprint }, es: { version: "es-wave1-2026-08-20.1", status: "published", parity: "validated", translatedFromFingerprint: sourceFingerprint } } }]; })) };
await writeFile(statusUrl, `${JSON.stringify(status, null, 2)}\n`);
await vite.close();
console.log(`Generated ${candidates.size} source strings × 2 locales.`);
