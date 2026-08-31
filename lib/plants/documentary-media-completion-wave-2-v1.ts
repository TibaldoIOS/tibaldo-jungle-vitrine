import type { PlantEntry, PlantMediaLicense } from "./types";

type PlantImage = PlantEntry["gallery"][number];

export type DocumentaryMediaWave2Record = {
  route: `/plantes/${string}`;
  botanicalIdentity: string;
  author: string;
  source: string;
  license: string;
  mediaFile: string;
  batch: 1;
};

const verifiedLicense = (
  creator: string,
  license: string,
  licenseUrl: string,
  sourceUrl: string,
  note: string,
): PlantMediaLicense => ({
  status: "verified",
  creator,
  license,
  licenseUrl,
  sourceUrl,
  registryPath: "/credits-images",
  note: `Vague documentaire Wave 2 V1 · contrôle du 31 août 2026. ${note}`,
});

const image = (
  src: string,
  alt: string,
  caption: string,
  width: number,
  height: number,
  license: PlantMediaLicense,
): PlantImage => ({ src, alt, caption, width, height, license });

const cc0 = "https://creativecommons.org/publicdomain/zero/1.0/";
const ccBy4 = "https://creativecommons.org/licenses/by/4.0/";
const ccBySa4 = "https://creativecommons.org/licenses/by-sa/4.0/";

const verifiedMediaByRoute: Readonly<Record<string, readonly PlantImage[]>> = {
  "/plantes/monstera/adansonii": [image(
    "/documentary-media-wave-2-v1/monstera-adansonii.webp",
    "Feuille adulte fenêtrée de Monstera adansonii dans son habitat au Costa Rica",
    "Monstera adansonii observée au Costa Rica · photographie documentaire réelle.",
    1365,
    2048,
    verifiedLicense(
      "Jacob Rehage",
      "CC0 1.0",
      cc0,
      "https://commons.wikimedia.org/wiki/File:Monstera_adansonii_112059105.jpg",
      "La fiche Commons et l’observation iNaturalist revue identifient Monstera adansonii au Costa Rica. Adaptation locale : conversion WebP sans transformation morphologique.",
    ),
  )],
  "/plantes/anthurium/clarinervium": [image(
    "/documentary-media-wave-2-v1/anthurium-clarinervium.webp",
    "Anthurium clarinervium aux feuilles sombres cordiformes et nervures claires",
    "Anthurium clarinervium au Conservatory of Flowers de San Francisco · photographie documentaire réelle.",
    1600,
    2400,
    verifiedLicense(
      "Daderot",
      "CC0 1.0",
      cc0,
      "https://commons.wikimedia.org/wiki/File:Anthurium_clarinervium_-_Conservatory_of_Flowers_-_San_Francisco,_CA_-_DSC03116.JPG",
      "Le fichier Commons documente un spécimen d’Anthurium clarinervium au Conservatory of Flowers. Adaptation locale : redimensionnement à 1600 px et conversion WebP.",
    ),
  )],
  "/plantes/anthurium/warocqueanum": [image(
    "/documentary-media-wave-2-v1/anthurium-warocqueanum.webp",
    "Longues feuilles veloutées nervurées d’Anthurium warocqueanum",
    "Anthurium warocqueanum au Conservatory of Flowers de San Francisco · photographie documentaire réelle.",
    1600,
    2133,
    verifiedLicense(
      "Steven Walling",
      "CC BY-SA 4.0",
      ccBySa4,
      "https://commons.wikimedia.org/wiki/File:Anthurium_warocqueanum_at_Conservatory_of_Flowers.jpg",
      "Le fichier Commons et le cartel botanique visible documentent Anthurium warocqueanum au Conservatory of Flowers. Adaptation locale : rotation EXIF, redimensionnement et conversion WebP.",
    ),
  )],
  "/plantes/anthurium/regale": [image(
    "/documentary-media-wave-2-v1/anthurium-regale.webp",
    "Grande feuille cordiforme veloutée et nervurée d’Anthurium regale",
    "Anthurium regale à l’Hortus botanicus Leiden · photographie documentaire réelle.",
    1600,
    2133,
    verifiedLicense(
      "Rudolphous",
      "CC BY-SA 4.0",
      ccBySa4,
      "https://commons.wikimedia.org/wiki/File:20210605_Hortus_botanicus_Leiden_-_Anthurium_regale.jpg",
      "Le fichier Commons identifie Anthurium regale à l’Hortus botanicus Leiden. Adaptation locale : redimensionnement à 1600 px et conversion WebP.",
    ),
  )],
  "/plantes/philodendron/gloriosum": [image(
    "/documentary-media-wave-2-v1/philodendron-gloriosum.webp",
    "Philodendron gloriosum rampant aux grandes feuilles veloutées nervurées",
    "Philodendron gloriosum observé à Rio de Janeiro · photographie documentaire réelle.",
    1536,
    2048,
    verifiedLicense(
      "Nico",
      "CC BY 4.0",
      ccBy4,
      "https://commons.wikimedia.org/wiki/File:Philodendron_gloriosum_-_Nico_-_498464250.jpeg",
      "La fiche Commons et l’observation iNaturalist revue identifient Philodendron gloriosum à Rio de Janeiro. Adaptation locale : conversion WebP sans transformation morphologique.",
    ),
  )],
};

export const documentaryMediaWave2V1Registry: readonly DocumentaryMediaWave2Record[] = Object.entries(verifiedMediaByRoute).map(([route, images]) => ({
  route: route as `/plantes/${string}`,
  botanicalIdentity: images[0].alt,
  author: images[0].license?.creator ?? "",
  source: images[0].license?.sourceUrl ?? "",
  license: images[0].license?.license ?? "",
  mediaFile: images[0].src,
  batch: 1,
}));

export const applyDocumentaryMediaCompletionWave2V1 = (plants: PlantEntry[]): PlantEntry[] => plants.map((plant) => {
  const route = `/plantes/${plant.genre}/${plant.slug}`;
  const gallery = verifiedMediaByRoute[route];
  return gallery ? { ...plant, gallery: [...gallery] } : plant;
});
