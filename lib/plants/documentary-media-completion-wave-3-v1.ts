import type { PlantEntry, PlantMediaLicense } from "./types";

type PlantImage = PlantEntry["gallery"][number];

export type DocumentaryMediaWave3Record = {
  route: `/plantes/${string}`;
  botanicalIdentity: string;
  author: string;
  source: string;
  license: string;
  mediaFile: string;
  sha256: string;
  identityConfidence: "high";
  rightsConfidence: "high";
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
  note: `Vague documentaire Wave 3 V1 · contrôle du 1er septembre 2026. ${note}`,
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
const ccBySa2 = "https://creativecommons.org/licenses/by-sa/2.0/";
const ccBySa4 = "https://creativecommons.org/licenses/by-sa/4.0/";
const publicDomain = "https://creativecommons.org/publicdomain/mark/1.0/";

const verifiedMediaByRoute: Readonly<Record<string, readonly PlantImage[]>> = {
  "/plantes/alocasia/zebrina": [image(
    "/documentary-media-wave-3-v1/alocasia-zebrina.webp",
    "Alocasia zebrina aux pétioles zébrés et aux feuilles sagittées",
    "Alocasia zebrina au Fairchild Tropical Botanic Garden · photographie documentaire réelle.",
    1600,
    1067,
    verifiedLicense("David J. Stang", "CC BY-SA 4.0", ccBySa4, "https://commons.wikimedia.org/wiki/File:Alocasia_zebrina_1zz.jpg", "La fiche Commons identifie Alocasia zebrina au Fairchild Tropical Botanic Garden. Adaptation locale : redimensionnement et conversion WebP sans transformation morphologique."),
  )],
  "/plantes/alocasia/macrorrhizos": [image(
    "/documentary-media-wave-3-v1/alocasia-macrorrhizos.webp",
    "Grande feuille sagittée d’Alocasia macrorrhizos couverte de gouttes d’eau",
    "Alocasia macrorrhizos · photographie documentaire réelle.",
    1200,
    1600,
    verifiedLicense("Qian2007", "CC BY-SA 4.0", ccBySa4, "https://commons.wikimedia.org/wiki/File:Alocasia_macrorrhizos_2025.jpg", "La fiche Commons et sa catégorie taxonomique identifient Alocasia macrorrhizos. Adaptation locale : redimensionnement et conversion WebP."),
  )],
  "/plantes/alocasia/odora": [image(
    "/documentary-media-wave-3-v1/alocasia-odora.webp",
    "Alocasia odora parmi les plantes d’un jardin botanique",
    "Alocasia odora à Hijuela del Botánico, La Orotava · photographie documentaire réelle.",
    1600,
    1067,
    verifiedLicense("Mike Peel", "CC BY-SA 4.0", ccBySa4, "https://commons.wikimedia.org/wiki/File:At_La_Orotava_2023_120_-_Alocasia_odora.jpg", "Le fichier Commons identifie Alocasia odora à Hijuela del Botánico. Adaptation locale : redimensionnement et conversion WebP."),
  )],
  "/plantes/alocasia/sinuata": [image(
    "/documentary-media-wave-3-v1/alocasia-sinuata.webp",
    "Feuilles gaufrées et brillantes d’Alocasia sinuata",
    "Alocasia sinuata aux Philippines · photographie documentaire réelle.",
    1600,
    1200,
    verifiedLicense("Obsidian Soul", "CC0 1.0", cc0, "https://commons.wikimedia.org/wiki/File:Alocasia_sinuata_(Philippines)_0002.jpg", "La fiche Commons identifie Alocasia sinuata aux Philippines. Adaptation locale : redimensionnement et conversion WebP."),
  )],
  "/plantes/chlorophytum/comosum": [image(
    "/documentary-media-wave-3-v1/chlorophytum-comosum.webp",
    "Feuillage rubané et fleurs blanches de Chlorophytum comosum",
    "Chlorophytum comosum en floraison · photographie documentaire réelle.",
    1600,
    1200,
    verifiedLicense("Juan Carlos Fonseca Mata", "CC BY-SA 4.0", ccBySa4, "https://commons.wikimedia.org/wiki/File:Malamadre_(Chlorophytum_comosum).jpg", "Le fichier Commons identifie Chlorophytum comosum et montre son feuillage et ses fleurs. Adaptation locale : redimensionnement et conversion WebP."),
  )],
  "/plantes/dicksonia/antarctica": [image(
    "/documentary-media-wave-3-v1/dicksonia-antarctica.webp",
    "Dicksonia antarctica aux grandes frondes dans une forêt australienne",
    "Dicksonia antarctica sur l’Overland Track en Australie · photographie documentaire réelle.",
    1600,
    1067,
    verifiedLicense("brewbooks", "CC BY-SA 2.0", ccBySa2, "https://commons.wikimedia.org/wiki/File:Dicksonia_antarctica_(Tasmanian_Tree_Fern)_-_Flickr_-_brewbooks.jpg", "La fiche Commons identifie Dicksonia antarctica dans son contexte forestier australien. Adaptation locale : redimensionnement et conversion WebP."),
  )],
  "/plantes/plumeria/rubra": [image(
    "/documentary-media-wave-3-v1/plumeria-rubra.webp",
    "Bouquet de fleurs blanches et jaunes de Plumeria rubra",
    "Plumeria rubra en floraison · photographie documentaire réelle.",
    1600,
    1065,
    verifiedLicense("Vengolis", "CC BY-SA 4.0", ccBySa4, "https://commons.wikimedia.org/wiki/File:Plumeria_rubra_2852.jpg", "La fiche Commons identifie Plumeria rubra en floraison. Adaptation locale : redimensionnement et conversion WebP."),
  )],
  "/plantes/strelitzia/nicolai": [image(
    "/documentary-media-wave-3-v1/strelitzia-nicolai.webp",
    "Strelitzia nicolai et ses grandes inflorescences sombres au jardin botanique",
    "Strelitzia nicolai au Jardin botanique de Madère · photographie documentaire réelle.",
    1600,
    1200,
    verifiedLicense("NasserHalaweh", "CC BY-SA 4.0", ccBySa4, "https://commons.wikimedia.org/wiki/File:Strelitziaceae_Strelitzia_nicolai_1.jpg", "Le fichier Commons identifie Strelitzia nicolai au Jardin botanique de Madère. Adaptation locale : redimensionnement et conversion WebP."),
  )],
  "/plantes/strelitzia/reginae": [image(
    "/documentary-media-wave-3-v1/strelitzia-reginae.webp",
    "Inflorescence orange et bleue de Strelitzia reginae",
    "Strelitzia reginae au jardin botanique de l’université de Hokkaido · photographie documentaire réelle.",
    1600,
    1200,
    verifiedLicense("Reinhold Möller Ermell", "CC BY-SA 4.0", ccBySa4, "https://commons.wikimedia.org/wiki/File:Strelitzia_reginae-20091014-RM-115622.jpg", "Le fichier Commons identifie Strelitzia reginae au jardin botanique de l’université de Hokkaido. Adaptation locale : redimensionnement et conversion WebP."),
  )],
  "/plantes/strelitzia/juncea": [image(
    "/documentary-media-wave-3-v1/strelitzia-juncea.webp",
    "Touffe de Strelitzia juncea aux feuilles étroites et fleurs orange",
    "Strelitzia juncea au jardin botanique de Kirstenbosch · photographie documentaire réelle.",
    1600,
    1200,
    verifiedLicense("Andrew massyn", "Domaine public", publicDomain, "https://commons.wikimedia.org/wiki/File:Strelitzia_juncea.JPG", "Le fichier Commons identifie Strelitzia juncea au jardin botanique de Kirstenbosch et a été placé dans le domaine public par son auteur. Adaptation locale : redimensionnement et conversion WebP."),
  )],
};

const sha256ByRoute: Readonly<Record<string, string>> = {
  "/plantes/alocasia/zebrina": "97abc529c416ce529631e918d394f160ef51beb76810853a93653f9bb4b9feb8",
  "/plantes/alocasia/macrorrhizos": "38e778268f52d4d2a9d109e37bf83bbef8ab42f241aa86bca2596ae814ef363c",
  "/plantes/alocasia/odora": "2321ef2870c6fefca4ceaf00c36901c010e82853d9c6050fe42e1b66a4aefba0",
  "/plantes/alocasia/sinuata": "68c358165e59acad4e63fe9abfe03340cd87e257ae7b61f6e1ae5e5dbb4752d0",
  "/plantes/chlorophytum/comosum": "79d52d5a0268bb82b6667983b1f41c044449e13431d5ce0fc5d67af0d48f047a",
  "/plantes/dicksonia/antarctica": "fe8e86f88608b9ef222fb60d7d560e8312f18585c20702861f9b860a40e98a2d",
  "/plantes/plumeria/rubra": "822b3a810bd98d65030df65fc402afbb95fa3f85dfa86c0d8e2d71e3772e4db0",
  "/plantes/strelitzia/nicolai": "9fde9caed9f93e5a7fe0201e03e1b9abd64b1e3a1c350eb3c9ac6f69d15c2394",
  "/plantes/strelitzia/reginae": "2095cb84f278abca725ea3002653ec5b93c7189c812553784a01bbf4edc47301",
  "/plantes/strelitzia/juncea": "9d34cb613b39ffc499a7859f89d4e8c218433e19d401150ad5a9ebf3db2be5c4",
};

export const documentaryMediaWave3V1Registry: readonly DocumentaryMediaWave3Record[] = Object.entries(verifiedMediaByRoute).map(([route, images]) => ({
  route: route as `/plantes/${string}`,
  botanicalIdentity: images[0].alt,
  author: images[0].license?.creator ?? "",
  source: images[0].license?.sourceUrl ?? "",
  license: images[0].license?.license ?? "",
  mediaFile: images[0].src,
  sha256: sha256ByRoute[route] ?? "",
  identityConfidence: "high",
  rightsConfidence: "high",
}));

export const applyDocumentaryMediaCompletionWave3V1 = (plants: PlantEntry[]): PlantEntry[] => plants.map((plant) => {
  const route = `/plantes/${plant.genre}/${plant.slug}`;
  const gallery = verifiedMediaByRoute[route];
  return gallery ? { ...plant, gallery: [...gallery] } : plant;
});
