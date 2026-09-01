import type { PlantEntry, PlantMediaLicense } from "./types";

type PlantImage = PlantEntry["gallery"][number];

const verified = (creator: string, license: string, licenseUrl: string, sourceUrl: string, note: string): PlantMediaLicense => ({
  status: "verified", creator, license, licenseUrl, sourceUrl, registryPath: "/credits-images",
  note: `Vague documentaire Wave 4 V1 · contrôle du 1er septembre 2026. ${note}`,
});

const media: Readonly<Record<string, PlantImage>> = {
  "/plantes/philodendron/grazielae": {
    src: "/documentary-media-wave-4-v1/philodendron-grazielae.webp",
    alt: "Philodendron grazielae grimpant, aux feuilles cordiformes épaisses",
    caption: "Philodendron grazielae au New York Botanical Garden · Krzysztof Ziarnek, Kenraiz.", width: 1400, height: 2205,
    license: verified("Krzysztof Ziarnek, Kenraiz", "CC BY-SA 4.0", "https://creativecommons.org/licenses/by-sa/4.0/", "https://commons.wikimedia.org/wiki/File:Philodendron_grazielae_kz1.jpg", "La fiche Commons identifie explicitement Philodendron grazielae. Redimensionnement et conversion WebP."),
  },
  "/plantes/strelitzia/caudata": {
    src: "/documentary-media-wave-4-v1/strelitzia-caudata.webp",
    alt: "Population de Strelitzia caudata dans son habitat rocheux d’Afrique australe",
    caption: "Strelitzia caudata dans son habitat · Tony Rebelo.", width: 1400, height: 934,
    license: verified("Tony Rebelo", "CC BY-SA 4.0", "https://creativecommons.org/licenses/by-sa/4.0/", "https://commons.wikimedia.org/wiki/File:Strelitzia_caudata_63769847.jpg", "Observation iNaturalist revue et classée Strelitzia caudata sur Commons. Redimensionnement et conversion WebP."),
  },
  "/plantes/monstera/subpinnata": {
    src: "/documentary-media-wave-4-v1/monstera-subpinnata.webp",
    alt: "Feuille profondément divisée de Monstera subpinnata en forêt tropicale",
    caption: "Monstera subpinnata observée en Équateur · Jared Shorma.", width: 1400, height: 1867,
    license: verified("Jared Shorma (blazeclaw)", "CC BY 4.0", "https://creativecommons.org/licenses/by/4.0/", "https://www.inaturalist.org/observations/220637449", "Observation iNaturalist Research Grade identifiée Monstera subpinnata ; photographie 390651723. Redimensionnement et conversion WebP."),
  },
  "/plantes/alocasia/longiloba": {
    src: "/documentary-media-wave-4-v1/alocasia-longiloba.webp",
    alt: "Grande feuille sagittée d’Alocasia longiloba dans son habitat forestier",
    caption: "Alocasia longiloba observée en Malaisie · Lyu yi-chi.", width: 1400, height: 1050,
    license: verified("Lyu yi-chi (pchi45)", "CC BY 4.0", "https://creativecommons.org/licenses/by/4.0/", "https://www.inaturalist.org/observations/155580390", "Observation iNaturalist Research Grade identifiée Alocasia longiloba ; photographie 268953438. Redimensionnement et conversion WebP."),
  },
};

export const documentaryMediaWave4V1Registry = Object.entries(media).map(([route, image]) => ({
  route, source: image.license?.sourceUrl ?? "", creator: image.license?.creator ?? "", license: image.license?.license ?? "", localFile: image.src,
}));

export const applyDocumentaryMediaCompletionWave4V1 = (plants: PlantEntry[]): PlantEntry[] => plants.map((plant) => {
  const image = media[`/plantes/${plant.genre}/${plant.slug}`];
  return image ? { ...plant, gallery: [image] } : plant;
});
