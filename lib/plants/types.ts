export type Level = 1 | 2 | 3 | 4 | 5;
export type PlantTaxonomy = {
  order: string;
  family: string;
  genus: string;
  species: string;
  cultivar: string | null;
  commonNames: string[];
};
export type PlantMediaLicense = {
  status: "verified" | "media-gap";
  creator?: string;
  license?: string;
  licenseUrl?: string;
  sourceUrl?: string;
  registryPath?: string;
  note: string;
};
export type PlantFilters = {
  temperatureMin: number;
  temperatureIdeal: [number, number];
  humidityIdeal: [number, number];
  light: "faible" | "moyenne" | "vive" | "soleil";
  watering: "faible" | "modéré" | "régulier" | "élevé";
  substrateTags: string[];
  growthRate: "lente" | "moyenne" | "rapide";
  habits: ("grimpant" | "rampant" | "retombant" | "terrestre" | "épiphyte" | "hémiépiphyte" | "dressé")[];
  adultSizeCm: number;
  needsSupport: boolean;
  variegated: boolean;
  collection: boolean;
  flowering: boolean;
  petToxic: boolean;
  humanToxic: boolean;
  regions: string[];
};
export type PlantEntry = {
  slug: string; genre: string; genreLabel: string; botanicalName: string; displayName: string; subtitle: string;
  listingName?: string;
  family: string; taxonomy: PlantTaxonomy; filters: PlantFilters; origin: string; habitat: string; hybridization: string; synonyms: string[]; description: string[];
  specimen: { observedHeight: string; note: string };
  growth: { adultSize: string; speed: string; habit: string };
  care: { light: Level; water: Level; humidity: Level; difficulty: Level; difficultyText?: string; lightText: string; watering: string; humidityText: string; temperature: string; substrate: string; repotting: string; fertilizing: string; propagation: string };
  toxicity: { level: string; summary: string; details: string };
  problems: { title: string; cause: string; advice: string }[];
  comparisons: { name: string; difference: string }[];
  faq: { question: string; answer: string }[];
  tibaldoAdvice: string[];
  localSpotlight?: { title: string; text: string };
  editorialSections?: { id: string; eyebrow: string; title: string; paragraphs: string[]; points?: string[] }[];
  mediaNeeds?: { role: string; description: string }[];
  gallery: { src: string; alt: string; caption: string; width: number; height: number; license?: PlantMediaLicense }[];
  seo: { title: string; description: string; keywords: string[] };
  sources: { label: string; url: string }[];
  shopUrl?: string;
  publishedAt: string; updatedAt: string;
};

export const isEditorialPlaceholder = (src?: string) => !src || src.includes("photo-reelle-a-venir") || src.includes("dicksonia-prototype.svg");

export const isPhotoProductionPlaceholder = (src?: string) =>
  !src || src.includes("photo-reelle-a-venir");

export const publicPlantImageAlt = (
  src: string | undefined,
  botanicalName: string,
  alt: string,
) =>
  isPhotoProductionPlaceholder(src)
    ? `Illustration botanique décorative de ${botanicalName}`
    : alt;

const productionCopyPatterns = [
  /photographier avant de publier/i,
  /pourquoi (?:certaines fiches n['’]ont-elles pas encore de photo|la photographie manque-t-elle)/i,
  /(?:photo|photographie|photographies|spécimen)[^.]*?(?:à venir|à ajouter|à réaliser|à préparer|à compléter|à relever|encore nécessaire|avant publication)/i,
  /(?:dimension|dimensions|mesure|mesures)[^.]*?(?:à venir|à ajouter|à compléter|à relever|encore nécessaire)/i,
  /gamme à identifier et photographier/i,
  /fiche (?:préparée|reste locale)[^.]*photograph/i,
];

export const isInternalPhotoProductionCopy = (value?: string) =>
  Boolean(value && productionCopyPatterns.some((pattern) => pattern.test(value)));
