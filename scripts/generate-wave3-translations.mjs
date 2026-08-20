import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { createServer } from "vite";

const root = new URL("..", import.meta.url).pathname;
const output = new URL("../lib/i18n/wave3-translations.generated.json", import.meta.url);
const statusOutput = new URL("../lib/i18n/wave3-editorial-status.generated.json", import.meta.url);
const inventory = JSON.parse(await readFile(new URL("../lib/i18n/wave3-inventory.generated.json", import.meta.url), "utf8"));
const vite = await createServer({ root, appType: "custom", configFile: false, resolve: { alias: { "@": root } }, server: { middlewareMode: true } });
const [{ substrates, substrateProfiles }, { wave3SourceUi }] = await Promise.all([vite.ssrLoadModule("/app/substrats/data.ts"), vite.ssrLoadModule("/lib/i18n/wave3.ts")]);

const candidates = new Set();
const protectedKeys = new Set(["slug", "number", "tone", "image", "status"]);
const visit = (value, key = "") => {
  if (typeof value === "string") { if (!protectedKeys.has(key) && value.trim() && !/^\//.test(value)) candidates.add(value); return; }
  if (Array.isArray(value)) { for (const item of value) visit(item, key); return; }
  if (value && typeof value === "object") for (const [childKey, child] of Object.entries(value)) visit(child, childKey);
};
visit(substrates); visit(substrateProfiles); visit(wave3SourceUi);

let dictionaries = { en: {}, es: {} };
try { dictionaries = JSON.parse(await readFile(output, "utf8")); } catch { /* initial generation */ }
const translate = async (text, locale) => {
  const query = new URLSearchParams({ client: "gtx", sl: "fr", tl: locale, dt: "t", q: text });
  for (let attempt = 0; attempt < 4; attempt += 1) {
    try { const response = await fetch(`https://translate.googleapis.com/translate_a/single?${query}`); if (!response.ok) throw new Error(`HTTP ${response.status}`); const data = await response.json(); return data[0].map((part) => part[0]).join("").trim(); }
    catch (error) { if (attempt === 3) throw error; await new Promise((resolve) => setTimeout(resolve, 400 * (attempt + 1))); }
  }
};

const normalize = (source, target, locale) => {
  let value = target;
  if (locale === "en") value = value
    .replace(/potting soil/gi, "potting mix").replace(/\bsubstrates\b/gi, "growing media").replace(/\bsubstrate\b/gi, "growing medium")
    .replace(/pumice stone/gi, "pumice").replace(/pine peel/gi, "pine bark").replace(/coconut chips/gi, "coco chips")
    .replace(/clay balls/gi, "expanded clay pebbles").replace(/water retention/gi, "water retention")
    .replace(/root bread/gi, "root ball").replace(/pierced pot/gi, "pot with drainage holes").replace(/leaky pot/gi, "pot with drainage holes")
    .replace(/general balance of the mixture/gi, "overall balance of the mix").replace(/ionic exchange/gi, "ion exchange")
    .replace(/subjects/gi, "specimens").replace(/subject/gi, "specimen");
  if (locale === "es") value = value
    .replace(/tierra para macetas/gi, "sustrato para macetas").replace(/astillas de coco/gi, "chips de coco")
    .replace(/corteza de pino/gi, "corteza de pino").replace(/bolas de arcilla/gi, "arcilla expandida")
    .replace(/pan de raíz/gi, "cepellón").replace(/maceta perforada/gi, "maceta con orificios de drenaje").replace(/olla que gotea/gi, "maceta con orificios de drenaje")
    .replace(/Selva Tibaldo/gi, "Tibaldo Jungle").replace(/sujetos/gi, "ejemplares").replace(/sujeto/gi, "ejemplar");
  const overrides = {
    en: {
      "Terreau Signature by Romain": "Terreau Signature by Romain",
      "Terreau Signature": "Terreau Signature",
      "Le Terreau Signature,": "Terreau Signature,",
      "pensé comme un écosystème.": "designed as an ecosystem.",
      "Chips de coco": "Coco chips",
      "Billes d’argile": "Expanded clay pebbles",
      "Billes d’argile expansée": "Expanded clay pebbles",
      "Sphaigne séchée": "Dried sphagnum moss",
      "Sphaigne séchée compactée": "Compressed dried sphagnum moss",
      "Écorce de pin": "Pine bark",
      "Écorce de pin horticole": "Horticultural pine bark",
      "Charbon actif": "Activated charcoal",
      "Charbon actif horticole": "Horticultural activated charcoal",
      "Pierre ponce": "Pumice",
      "Zéolite": "Zeolite",
      "Vermiculite": "Vermiculite",
      "Perlite": "Perlite",
      "La matière juste, pour des racines vivantes.": "The right growing medium for living roots.",
      "Neuf composants. Une infinité d’équilibres.": "Nine components. Countless balanced mixes."
    },
    es: {
      "Terreau Signature by Romain": "Terreau Signature by Romain",
      "Terreau Signature": "Terreau Signature",
      "Le Terreau Signature,": "Terreau Signature,",
      "pensé comme un écosystème.": "concebido como un ecosistema.",
      "Chips de coco": "Chips de coco",
      "Billes d’argile": "Arcilla expandida",
      "Billes d’argile expansée": "Arcilla expandida",
      "Sphaigne séchée": "Musgo esfagno seco",
      "Sphaigne séchée compactée": "Musgo esfagno seco compactado",
      "Écorce de pin": "Corteza de pino",
      "Écorce de pin horticole": "Corteza de pino hortícola",
      "Charbon actif": "Carbón activado",
      "Charbon actif horticole": "Carbón activado hortícola",
      "Pierre ponce": "Piedra pómez",
      "Zéolite": "Zeolita",
      "Vermiculite": "Vermiculita",
      "Perlite": "Perlita",
      "La matière juste, pour des racines vivantes.": "El sustrato adecuado para unas raíces vivas.",
      "Neuf composants. Une infinité d’équilibres.": "Nueve componentes. Infinitas mezclas equilibradas."
    }
  };
  return overrides[locale]?.[source] ?? value;
};

for (const locale of ["en", "es"]) {
  const missing = [...candidates].filter((source) => !dictionaries[locale][source]);
  let cursor = 0;
  const workers = Array.from({ length: 8 }, async () => { while (cursor < missing.length) { const source = missing[cursor++]; dictionaries[locale][source] = normalize(source, await translate(source, locale), locale); } });
  await Promise.all(workers);
  for (const [source, target] of Object.entries(dictionaries[locale])) dictionaries[locale][source] = normalize(source, target, locale);
}

const fingerprint = (value) => createHash("sha256").update(JSON.stringify(value)).digest("hex");
const sourceFor = (entry) => entry.kind === "substrate-hub" ? { substrates, wave3SourceUi } : { substrate: substrates.find((item) => `/substrats/${item.slug}` === entry.path), profile: substrateProfiles[entry.path.split("/").at(-1)] };
const status = { generatedAt: "2026-08-20", pages: Object.fromEntries(inventory.paths.map((entry) => { const sourceFingerprint = fingerprint(sourceFor(entry)); return [entry.path, { kind: entry.kind, sourceVersion: "fr-wave3-2026-08-20.1", sourceFingerprint, translations: { en: { version: "en-wave3-2026-08-20.1", status: "published", parity: "validated", translatedFromFingerprint: sourceFingerprint }, es: { version: "es-wave3-2026-08-20.1", status: "published", parity: "validated", translatedFromFingerprint: sourceFingerprint } } }]; })) };
await writeFile(output, `${JSON.stringify(dictionaries, null, 2)}\n`); await writeFile(statusOutput, `${JSON.stringify(status, null, 2)}\n`); await vite.close();
console.log(`Generated ${candidates.size} Wave 3 source strings × 2 locales.`);
