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
    "/images/monstera-adansonii-plante-feuilles-perforees.jpg",
    "Monstera adansonii en pot, aux feuilles vertes perforées.",
    "Monstera adansonii en pot, aux feuilles naturellement perforées.",
    799,
    1000,
    verifiedLicense(
      "TIBALDO (image fournie par l’Owner)",
      "Autorisation d’utilisation confirmée par l’Owner TIBALDO",
      "https://tibaldo.fr/credits-images",
      "https://tibaldo.fr/credits-images",
      "L’Owner TIBALDO a fourni cette photographie pour publication sur Jungle et Shop. Le JPEG source 799 × 1000 (SHA-256 3f21c5ebabf5f0774cfefb3bebd938fed753d9112af3c4920083269419e9929f) montre un Monstera adansonii en pot aux feuilles naturellement perforées.",
    ),
  )],
  "/plantes/anthurium/clarinervium": [image(
    "/images/anthurium-clarinervium-feuilles-veloutees-nervures-claires.jpg",
    "Anthurium clarinervium aux feuilles vert foncé veloutées et aux nervures claires.",
    "Photo : TIBALDO",
    1200,
    1200,
    verifiedLicense(
      "TIBALDO (photographie fournie par l’Owner)",
      "Autorisation d’utilisation confirmée par l’Owner TIBALDO",
      "https://tibaldo.fr/credits-images",
      "https://tibaldo.fr/credits-images",
      "Preuve contrôlée le 10 septembre 2026. L’Owner TIBALDO a fourni cette photographie personnelle pour publication dans Jungle, Caisse et Shop. Le JPEG source 1200 × 1200 (SHA-256 e1a1a0e72967cdfd37b0930f81e3d0cc4cf58d99945fe3108e56c75059f3b49c) montre un Anthurium clarinervium aux feuilles veloutées et aux nervures claires.",
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
