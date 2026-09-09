import type { PlantEntry, PlantMediaLicense } from "./types.ts";

const license: PlantMediaLicense = {
  status: "verified",
  creator: "TIBALDO",
  license: "Droits de réutilisation confirmés par l’Owner",
  sourceUrl: "owner-provided://tibaldo/marble-queen-2026-09-08",
  registryPath: "/credits-images",
  note: "Source Owner/TIBALDO : IMG_0017.JPG, IMG_0018.JPG, IMG_0019.JPG, conversation 6a98800e-4770-83eb-9e70-ede85b60478a. Autorisation explicite du 8 septembre 2026. Originaux et empreintes conservés ; recadrage et conversion WebP uniquement. Preuves : docs/media-provenance/marble-queen-owner-2026-09-08.json.",
};

const gallery: PlantEntry["gallery"] = [
  { src: "/owner-media/marble-queen/epipremnum-marble-queen-plante-tibaldo-1200.webp", alt: "Pothos Marble Queen en pot, vu de dessus, aux feuilles en cœur marbrées de vert et de blanc crème.", caption: "Le feuillage marbré de Marble Queen. Photo : TIBALDO", width: 1200, height: 1500, license },
  { src: "/owner-media/marble-queen/epipremnum-marble-queen-detail-panachure-tibaldo-1200.webp", alt: "Gros plan sur les feuilles du pothos Marble Queen, marbrées de vert et de blanc crème, avec quelques gouttes d’eau.", caption: "Les marbrures et la surface des feuilles. Photo : TIBALDO", width: 1200, height: 1500, license },
  { src: "/owner-media/marble-queen/epipremnum-marble-queen-vue-trois-quarts-tibaldo-1200.webp", alt: "Pothos Marble Queen vu de trois quarts, avec son feuillage vert et blanc crème au-dessus d’un pot noir.", caption: "Le port de la plante vu de trois quarts. Photo : TIBALDO", width: 1200, height: 1500, license },
];

export const applyOwnerMarbleQueenMediaV1 = (plants: PlantEntry[]): PlantEntry[] => plants.map((plant) => (
  plant.genre === "epipremnum" && plant.slug === "marble-queen" ? { ...plant, gallery } : plant
));
