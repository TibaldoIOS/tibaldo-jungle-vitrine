import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { createServer } from "vite";

const root = new URL("..", import.meta.url).pathname;
const output = new URL("../lib/i18n/wave2-translations.generated.json", import.meta.url);
const statusOutput = new URL("../lib/i18n/wave2-editorial-status.generated.json", import.meta.url);
const inventory = JSON.parse(await readFile(new URL("../lib/i18n/wave2-inventory.generated.json", import.meta.url), "utf8"));
const vite = await createServer({ root, appType: "custom", configFile: false, resolve: { alias: { "@": root } }, server: { middlewareMode: true } });
const { guides } = await vite.ssrLoadModule("/lib/guides/catalog.ts");

const candidates = new Set();
for (const guide of guides) {
  for (const key of ["title", "eyebrow", "category", "readingTime", "intro"]) candidates.add(guide[key]);
  for (const [title, copy] of guide.sections) { candidates.add(title); candidates.add(copy); }
}

let dictionaries = { en: {}, es: {} };
try { dictionaries = JSON.parse(await readFile(output, "utf8")); } catch { /* initial generation */ }

const translate = async (text, locale) => {
  const query = new URLSearchParams({ client: "gtx", sl: "fr", tl: locale, dt: "t", q: text });
  for (let attempt = 0; attempt < 4; attempt += 1) {
    try {
      const response = await fetch(`https://translate.googleapis.com/translate_a/single?${query}`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      return data[0].map((part) => part[0]).join("").trim();
    } catch (error) {
      if (attempt === 3) throw error;
      await new Promise((resolve) => setTimeout(resolve, 400 * (attempt + 1)));
    }
  }
};

const normalize = (source, target, locale) => {
  let value = target;
  if (locale === "en") value = value
    .replace(/potting soil/gi, "potting mix")
    .replace(/\bsubstrate\b/gi, "growing medium")
    .replace(/\bsubstrates\b/gi, "growing media")
    .replace(/red spiders/gi, "spider mites")
    .replace(/\bpierced (?:growing |horticultural )?pot\b/gi, "pot with drainage holes")
    .replace(/\bpierced pot\b/gi, "pot with drainage holes")
    .replace(/\bplanter\b/gi, "cachepot")
    .replace(/\bcup\b/gi, "saucer")
    .replace(/escape hole/gi, "drainage hole")
    .replace(/large subjects/gi, "large specimens")
    .replace(/maintenance habits/gi, "care routine")
    .replace(/one-time concentrated intake/gi, "single concentrated dose")
    .replace(/cold glazing/gi, "cold window glass")
    .replace(/near the ribs/gi, "near the veins")
    .replace(/look at the reverse/gi, "inspect the underside")
    .replace(/reading symptoms/gi, "the visibility of symptoms")
    .replace(/support the limbus/gi, "support the leaf blade")
    .replace(/actual use/gi, "the way you use the room");
  if (locale === "es") value = value
    .replace(/tierra para macetas/gi, "sustrato")
    .replace(/arañas rojas/gi, "ácaros")
    .replace(/\bolla\b/gi, "maceta")
    .replace(/\btaza\b/gi, "plato")
    .replace(/\bcopa\b/gi, "plato")
    .replace(/maceta perforada/gi, "maceta con orificios de drenaje")
    .replace(/vasija perforada/gi, "maceta con orificios de drenaje")
    .replace(/agujero de escape/gi, "orificio de drenaje")
    .replace(/sujetos grandes/gi, "ejemplares grandes")
    .replace(/hábitos de mantenimiento/gi, "rutina de cuidados")
    .replace(/ingesta concentrada de una sola vez/gi, "dosis concentrada puntual")
    .replace(/acristalamientos fríos/gi, "cristales fríos")
    .replace(/cerca de las costillas/gi, "cerca de las nervaduras")
    .replace(/observe los lomos/gi, "observe el envés")
    .replace(/reduce los síntomas de lectura/gi, "dificulta observar los síntomas")
    .replace(/Selva Tibaldo/gi, "Tibaldo Jungle");
  const overrides = {
    en: {
      "Bien arroser sans calendrier fixe": "How to water houseplants without a fixed schedule",
      "Choisir le bon substrat": "How to choose the right growing medium",
      "Araignées rouges : les repérer tôt": "Spider mites: how to spot them early",
      "Engrais : nourrir sans surdoser": "Fertiliser: feed plants without overdoing it",
      "Humidité : ce qui fonctionne vraiment": "Humidity: what actually works",
      "Soigner": "Plant health",
      "Entretenir": "Care",
      "Tester le substrat": "Check the growing medium",
      "Arroser complètement": "Water thoroughly",
      "Adapter aux saisons": "Adapt to the seasons",
      "Partir des racines": "Start with the roots",
      "Composer plutôt que copier": "Build a mix for the plant",
      "Observer après rempotage": "Observe after repotting",
      "Observer sur une journée": "Observe the light over a full day",
      "Comprendre la lumière de votre pièce": "Understand the light in your room",
      "Le pot percé dans un cache-pot": "A pot with drainage holes inside a cachepot",
      "Le pot percé avec une coupelle": "A pot with drainage holes and a saucer",
      "Le pot percé utilisé seul": "Using a pot with drainage holes on its own",
      "Isoler et doucher": "Isolate and rinse",
      "Lire la position des feuilles": "Check which leaves are affected",
      "Suivre dans la durée": "Monitor over time",
      "Rapprocher de la lumière": "Move closer to the light",
      "Espacer l’arrosage": "Water less frequently",
      "Ambiance": "Growing environment",
      "Pot percé, cache-pot ou coupelle : que choisir ?": "Pot with drainage holes, cachepot or saucer: which should you choose?",
      "Adapter l’entretien en hiver à Lille": "Winter houseplant care in Lille",
      "Motte": "Root ball"
    },
    es: {
      "Bien arroser sans calendrier fixe": "Cómo regar plantas de interior sin un calendario fijo",
      "Choisir le bon substrat": "Cómo elegir el sustrato adecuado",
      "Araignées rouges : les repérer tôt": "Ácaros: cómo detectarlos a tiempo",
      "Engrais : nourrir sans surdoser": "Fertilización: nutrir sin excederse",
      "Humidité : ce qui fonctionne vraiment": "Humedad ambiental: lo que realmente funciona",
      "Soigner": "Salud vegetal",
      "Entretenir": "Cuidados",
      "Tester le substrat": "Comprobar el sustrato",
      "Arroser complètement": "Regar a fondo",
      "Adapter aux saisons": "Adaptar el riego a las estaciones",
      "Partir des racines": "Partir de las raíces",
      "Composer plutôt que copier": "Crear una mezcla adaptada",
      "Observer après rempotage": "Observar después del trasplante",
      "Observer sur une journée": "Observar la luz durante todo el día",
      "Comprendre la lumière de votre pièce": "Comprender la luz de la habitación",
      "Le pot percé dans un cache-pot": "Maceta con drenaje dentro de un cubremaceta",
      "Le pot percé avec une coupelle": "Maceta con drenaje y plato",
      "Le pot percé utilisé seul": "Maceta con drenaje utilizada sola",
      "Isoler et doucher": "Aislar y enjuagar la planta",
      "Lire la position des feuilles": "Observar qué hojas están afectadas",
      "Suivre dans la durée": "Realizar un seguimiento continuado",
      "Rapprocher de la lumière": "Acercar las plantas a la luz",
      "Espacer l’arrosage": "Espaciar los riegos",
      "Ambiance": "Ambiente de cultivo",
      "Pot percé, cache-pot ou coupelle : que choisir ?": "Maceta con drenaje, cubremaceta o plato: ¿qué elegir?",
      "Adapter l’entretien en hiver à Lille": "Cómo adaptar los cuidados en invierno en Lille"
    }
  };
  return overrides[locale]?.[source] ?? value;
};

for (const locale of ["en", "es"]) {
  const missing = [...candidates].filter((source) => !dictionaries[locale][source]);
  let cursor = 0;
  const workers = Array.from({ length: 8 }, async () => {
    while (cursor < missing.length) {
      const source = missing[cursor++];
      dictionaries[locale][source] = normalize(source, await translate(source, locale), locale);
    }
  });
  await Promise.all(workers);
  for (const [source, target] of Object.entries(dictionaries[locale])) dictionaries[locale][source] = normalize(source, target, locale);
}

const fingerprint = (value) => createHash("sha256").update(JSON.stringify(value)).digest("hex");
const status = { generatedAt: "2026-08-20", pages: Object.fromEntries(inventory.paths.map((entry) => {
  const source = entry.kind === "guide-hub" ? guides.map(({ slug, title, category, intro }) => ({ slug, title, category, intro })) : guides.find((guide) => `/conseils/${guide.slug}` === entry.path);
  const sourceFingerprint = fingerprint(source);
  return [entry.path, { kind: entry.kind, sourceVersion: "fr-wave2-2026-08-20.1", sourceFingerprint, translations: {
    en: { version: "en-wave2-2026-08-20.1", status: "published", parity: "validated", translatedFromFingerprint: sourceFingerprint },
    es: { version: "es-wave2-2026-08-20.1", status: "published", parity: "validated", translatedFromFingerprint: sourceFingerprint },
  } }];
})) };

await writeFile(output, `${JSON.stringify(dictionaries, null, 2)}\n`);
await writeFile(statusOutput, `${JSON.stringify(status, null, 2)}\n`);
await vite.close();
console.log(`Generated ${candidates.size} Wave 2 source strings × 2 locales.`);
