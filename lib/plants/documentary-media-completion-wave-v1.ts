import type { PlantEntry, PlantMediaLicense } from "./types";

type PlantImage = PlantEntry["gallery"][number];

export type DocumentaryMediaWaveRecord = {
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
  note: `Vague documentaire V1 · contrôle du 31 août 2026. ${note}`,
});

const image = (
  src: string,
  alt: string,
  caption: string,
  width: number,
  height: number,
  license: PlantMediaLicense,
): PlantImage => ({ src, alt, caption, width, height, license });

const ccBy3 = "https://creativecommons.org/licenses/by/3.0/";
const ccBy4 = "https://creativecommons.org/licenses/by/4.0/";
const ccBySa3 = "https://creativecommons.org/licenses/by-sa/3.0/";
const ccBySa4 = "https://creativecommons.org/licenses/by-sa/4.0/";

const verifiedMediaByRoute: Readonly<Record<string, readonly PlantImage[]>> = {
  "/plantes/asparagus/plumosus": [image(
    "/documentary-media-wave-v1/asparagus-setaceus.webp",
    "Rameaux fins et cladodes plumeux d’Asparagus setaceus",
    "Asparagus setaceus · photographie documentaire réelle.",
    1600,
    2165,
    verifiedLicense(
      "Forest & Kim Starr",
      "CC BY 3.0",
      ccBy3,
      "https://commons.wikimedia.org/wiki/File:Starr_050517-9003_Asparagus_setaceus.jpg",
      "La fiche Commons identifie explicitement Asparagus setaceus. Adaptation locale : redimensionnement à 1600 px et conversion WebP, sans transformation morphologique.",
    ),
  )],
  "/plantes/epiphyllum/anguliger": [image(
    "/documentary-media-wave-v1/disocactus-anguliger.webp",
    "Tiges aplaties profondément lobées de Disocactus anguliger",
    "Disocactus anguliger, cactus zigzag · photographie documentaire réelle.",
    1600,
    2400,
    verifiedLicense(
      "Agnieszka Kwiecień, Nova",
      "CC BY-SA 4.0",
      ccBySa4,
      "https://commons.wikimedia.org/wiki/File:Disocactus_anguliger_syn._Epiphyllum_anguliger_2024-02-29_Graz_01.jpg",
      "La fiche Commons documente Disocactus anguliger, synonyme horticole Epiphyllum anguliger, au jardin botanique de l’Université de Graz. Adaptation locale : redimensionnement et conversion WebP.",
    ),
  )],
  "/plantes/pilea/cadierei": [image(
    "/documentary-media-wave-v1/pilea-cadierei.webp",
    "Massif de Pilea cadierei aux feuilles vertes marquées d’argent",
    "Pilea cadierei · photographie documentaire réelle.",
    1600,
    1200,
    verifiedLicense(
      "Krzysztof Ziarnek, Kenraiz",
      "CC BY-SA 4.0",
      ccBySa4,
      "https://commons.wikimedia.org/wiki/File:Pilea_cadierei_kz05.jpg",
      "La fiche Commons identifie explicitement Pilea cadierei, photographié à l’Estufa Fria de Lisbonne. Adaptation locale : redimensionnement et conversion WebP.",
    ),
  )],
  "/plantes/yucca/rostrata": [image(
    "/documentary-media-wave-v1/yucca-rostrata.webp",
    "Rosette dense aux feuilles bleutées étroites de Yucca rostrata",
    "Yucca rostrata · photographie documentaire réelle.",
    1600,
    2241,
    verifiedLicense(
      "Krzysztof Ziarnek, Kenraiz",
      "CC BY-SA 4.0",
      ccBySa4,
      "https://commons.wikimedia.org/wiki/File:Yucca_rostrata_kz01.jpg",
      "La fiche Commons identifie explicitement Yucca rostrata, photographié au Jardín Botánico La Concepción. Adaptation locale : redimensionnement et conversion WebP.",
    ),
  )],
  "/plantes/aloe/vera": [image(
    "/documentary-media-wave-v1/aloe-vera.webp",
    "Rosette de feuilles charnues dentées d’Aloe vera",
    "Aloe vera · photographie documentaire réelle.",
    1600,
    2134,
    verifiedLicense(
      "Gaurav Dhwaj Khadka",
      "CC BY-SA 4.0",
      ccBySa4,
      "https://commons.wikimedia.org/wiki/File:Aloe_vera_(51653).jpg",
      "La fiche Commons identifie explicitement Aloe vera. Adaptation locale : redimensionnement et conversion WebP.",
    ),
  )],
  "/plantes/musa/basjoo": [image(
    "/documentary-media-wave-v1/musa-basjoo.webp",
    "Musa basjoo entier portant de larges feuilles vertes",
    "Musa basjoo · photographie documentaire réelle.",
    1600,
    2085,
    verifiedLicense(
      "Materialscientist",
      "CC BY-SA 3.0",
      ccBySa3,
      "https://commons.wikimedia.org/wiki/File:Musa_basjooSochi1.JPG",
      "La fiche Commons identifie explicitement Musa basjoo, photographié à Sotchi. Adaptation locale : redimensionnement et conversion WebP.",
    ),
  )],
  "/plantes/strelitzia/alba": [image(
    "/documentary-media-wave-v1/strelitzia-alba.webp",
    "Grande feuille et pseudo-tronc de Strelitzia alba en serre",
    "Strelitzia alba · photographie documentaire réelle.",
    1600,
    2812,
    verifiedLicense(
      "Tournasol7",
      "CC BY 4.0",
      ccBy4,
      "https://commons.wikimedia.org/wiki/File:Strelitzia_alba_in_Palm_House_Schoenbrunn_(4).jpg",
      "La fiche Commons identifie explicitement Strelitzia alba dans la Palmenhaus de Schönbrunn. Adaptation locale : redimensionnement et conversion WebP.",
    ),
  )],
};

export const documentaryMediaWaveV1Registry: readonly DocumentaryMediaWaveRecord[] = Object.entries(verifiedMediaByRoute).map(([route, images]) => ({
  route: route as `/plantes/${string}`,
  botanicalIdentity: images[0].alt,
  author: images[0].license?.creator ?? "",
  source: images[0].license?.sourceUrl ?? "",
  license: images[0].license?.license ?? "",
  mediaFile: images[0].src,
  batch: 1,
}));

export const applyDocumentaryMediaCompletionWaveV1 = (plants: PlantEntry[]): PlantEntry[] => plants.map((plant) => {
  const route = `/plantes/${plant.genre}/${plant.slug}`;
  const gallery = verifiedMediaByRoute[route];
  return gallery ? { ...plant, gallery: [...gallery] } : plant;
});
