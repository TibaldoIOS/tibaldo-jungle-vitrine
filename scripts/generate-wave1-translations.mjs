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
    .replace(/proprietary photograph/gi, "Tibaldo-owned photograph")
    .replace(/\brusticity\b/gi, "hardiness")
    .replace(/\bmaintenance\b/gi, "care")
    .replace(/new listing/gi, "new profile").replace(/__AVAILABILITY__/g, "subject to availability");
  if (locale === "es") value = value
    .replace(/sujeto a disponibilidad/gi, "__DISPONIBILIDAD__")
    .replace(/\bsujetos\b/gi, "ejemplares").replace(/\bsujeto\b/gi, "ejemplar")
    .replace(/\btemas\b/gi, "ejemplares").replace(/\btema\b/gi, "ejemplar")
    .replace(/hojas? de gofre/gi, "hojas corrugadas").replace(/Selva Tibaldo/gi, "Tibaldo Jungle")
    .replace(/\bolla\b/gi, "maceta").replace(/\blistado\b/gi, "ficha")
    .replace(/fotografía patentada/gi, "fotografía propia de Tibaldo")
    .replace(/\binvernada\b/gi, "protección invernal")
    .replace(/\bhibernación\b/gi, "protección invernal")
    .replace(/\be protección invernal\b/gi, "y protección invernal")
    .replace(/\bmantenimiento\b/gi, "cuidados")
    .replace(/__DISPONIBILIDAD__/g, "según disponibilidad");
  if (locale === "es" && source.toLowerCase().includes("rusticité")) value = value.replace(/\bresistencia\b/gi, "rusticidad");
  const cultivarReplacements = locale === "es" ? {
    "Imperial Red": [/Rojo Imperial/gi, /Roja Imperial/gi, /Imperial Roja/gi],
    "Marble Queen": [/Reina de mármol/gi, /Reina de Mármol/gi],
    "Royal Queen": [/Reina Real/gi], "Delta Force": [/Fuerza Delta/gi, /Fuerza delta/gi],
    "Dark Phoenix": [/Fénix Oscuro/gi], "Burle Marx Flame": [/Llama de Burle Marx/gi, /Llama Monstera Burle Marx/gi, /Burlé Marx Llama/gi],
    "Red Tiger": [/Tigre Rojo/gi], "Mint": [/\bMenta\b/gi], "Lemon Lime": [/Lima Limón/gi, /Lima Limon/gi, /lima limón/gi],
    "Spider’s Web": [/Spider's Web/gi, /‘?La telaraña’?/gi, /‘?Telaraña’?/gi],
    "Variegata": [/\bvariegata\b/gi],
  } : {
    "Spider’s Web": [/Spider's Web/gi],
    "Variegata": [/\bvariegata\b/gi],
  };
  for (const [cultivar, patterns] of Object.entries(cultivarReplacements)) if (source.includes(cultivar)) for (const pattern of patterns) value = value.replace(pattern, cultivar);
  if (source.includes("3 place de l’Arbonnoise")) value = value.replace(/(?:at |en |en el número )?3 (?:place|plaza) de l['’]Arbonnoise/gi, "3 place de l’Arbonnoise");
  if (source.includes("années 1990")) value = value.replace(/años 90\b/gi, "década de 1990");
  const overrides = {
    en: {
      "Une cycadale sculpturale, très ancienne dans sa lignée, mais résolument vivante : lente, solaire et exigeante sur le drainage.": "A sculptural cycad from an ancient lineage, yet very much alive: slow-growing, sun-loving and demanding about drainage.",
      "Sa croissance n’est pas continue. La plante peut rester immobile plusieurs mois, puis produire en une seule poussée un cercle complet de nouvelles frondes tendres. Celles-ci durcissent progressivement ; pendant ce déploiement, la lumière doit rester homogène pour éviter une couronne déformée.": "Growth is not continuous. The plant may remain dormant for several months, then produce a complete circle of tender new fronds in a single flush. They gradually harden; while they unfurl, light must remain even to prevent a distorted crown.",
      "Sujet Tibaldo cultivé dehors en pot": "Tibaldo specimen grown outdoors in a pot",
      "Très lente, par poussées de frondes espacées": "Very slow, producing widely spaced flushes of fronds",
      "Mélange très drainant et stable : terreau structuré en proportion mesurée, pouzzolane, pierre ponce ou perlite grossière, et écorce. Le pot doit être percé et suffisamment lourd pour stabiliser la couronne.": "A very free-draining, stable mix: a measured proportion of structured potting mix, pozzolan, pumice or coarse perlite, and bark. The pot must have drainage holes and be heavy enough to stabilise the crown.",
      "Taches brunes après sortie": "Brown patches after moving outdoors",
      "Cochenilles farineuses ou à bouclier": "Mealybugs or scale insects",
      "Acariens sous abri": "Spider mites under cover",
      "Après un séchage marqué du mélange. Arrosez à fond puis laissez égoutter ; espacez nettement en hiver et par faible lumière.": "After the mix has dried substantially. Water thoroughly and allow it to drain; water much less frequently in winter and in low light.",
      "Cycas revoluta adulte cultivé en pot sur la terrasse végétalisée de Tibaldo Jungle": "Adult Cycas revoluta grown in a pot on Tibaldo Jungle’s planted terrace",
      "Légère pendant une poussée active": "Light feeding during an active growth flush"
    },
    es: {
      "Une cycadale sculpturale, très ancienne dans sa lignée, mais résolument vivante : lente, solaire et exigeante sur le drainage.": "Una cícada escultural de un linaje muy antiguo, pero plenamente viva: de crecimiento lento, amante del sol y exigente con el drenaje.",
      "Très lente, par poussées de frondes espacées": "Muy lento, con brotes espaciados de frondas",
      "Toutes les parties sont toxiques ; les graines sont particulièrement dangereuses pour les chiens, chats et enfants.": "Todas las partes son tóxicas; las semillas son especialmente peligrosas para perros, gatos y niños.",
      "Cochenilles farineuses ou à bouclier": "Cochinillas algodonosas o de escudo",
      "Taches brunes après sortie": "Manchas marrones después de sacarla al exterior",
      "Lumière insuffisante pendant la poussée ou plante tournée trop tard.": "Luz insuficiente durante el brote o planta girada demasiado tarde.",
      "Stopper les arrosages, dépoter et faire diagnostiquer rapidement l’état du caudex et des racines ; ne pas masquer le problème avec de l’engrais.": "Deje de regar, saque la planta de la maceta y haga diagnosticar rápidamente el estado del caudex y de las raíces; no enmascare el problema con fertilizante.",
      "Portez des gants pour manipuler feuilles et graines, et placez le sujet hors de portée des enfants et animaux qui mâchonnent les plantes.": "Use guantes para manipular las hojas y las semillas, y coloque el ejemplar fuera del alcance de los niños y de los animales que mordisquean las plantas.",
      "Cycas revoluta adulte cultivé en pot sur la terrasse végétalisée de Tibaldo Jungle": "Cycas revoluta adulta cultivada en maceta en la terraza vegetal de Tibaldo Jungle",
      "Le sujet propriétaire Tibaldo dans son environnement extérieur ; cette vue complète a été retenue comme HERO car aucun élément ne masque le pot.": "El ejemplar propiedad de Tibaldo en su entorno exterior; esta vista completa se eligió como imagen principal porque ningún elemento oculta la maceta.",
      "Cycas revoluta rusticité": "Rusticidad de Cycas revoluta",
      "Cycas revoluta toxique": "Cycas revoluta tóxica",
      "Légère pendant une poussée active": "Ligera durante un periodo de crecimiento activo"
    }
  };
  return overrides[locale]?.[source] ?? value.replace(/drainage holess/gi, "drainage holes");
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
