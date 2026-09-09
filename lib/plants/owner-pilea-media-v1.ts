import type { PlantEntry, PlantMediaLicense } from "./types.ts";

const license: PlantMediaLicense = {
  status: "verified",
  creator: "TIBALDO",
  license: "Droits de réutilisation confirmés par l’Owner",
  sourceUrl: "owner-provided://tibaldo/pilea-peperomioides-2026-09-08",
  registryPath: "/credits-images",
  note: "Source Owner/TIBALDO : IMG_0023.JPG, IMG_0024.JPG, IMG_0025.JPG, conversation 6a98800e-4770-83eb-9e70-ede85b60478a. Autorisation explicite du 8 septembre 2026. Originaux et empreintes conservés ; recadrage et conversion WebP uniquement. Preuves : docs/media-provenance/pilea-peperomioides-owner-2026-09-08.json.",
};

const gallery: PlantEntry["gallery"] = [
  { src: "/owner-media/pilea-peperomioides/pilea-peperomioides-plante-tibaldo-1200.webp", alt: "Pilea peperomioides en pot, feuilles rondes vertes portées par de longs pétioles", caption: "La plante et son port. Photo : TIBALDO", width: 1200, height: 1500, license },
  { src: "/owner-media/pilea-peperomioides/pilea-peperomioides-feuillage-tibaldo-1200.webp", alt: "Feuillage du Pilea peperomioides, avec ses feuilles rondes et ses longs pétioles", caption: "Le feuillage et les pétioles. Photo : TIBALDO", width: 1200, height: 1500, license },
  { src: "/owner-media/pilea-peperomioides/pilea-peperomioides-detail-tibaldo-1200.webp", alt: "Détail des feuilles peltées du Pilea peperomioides, couvertes de gouttes d’eau", caption: "Les feuilles vues de près. Photo : TIBALDO", width: 1200, height: 1500, license },
];

export const applyOwnerPileaMediaV1 = (plants: PlantEntry[]): PlantEntry[] => plants.map((plant) => (
  plant.genre === "pilea" && plant.slug === "peperomioides" ? { ...plant, gallery } : plant
));
