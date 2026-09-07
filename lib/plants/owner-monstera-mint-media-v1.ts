import type { PlantEntry, PlantMediaLicense } from "./types";

const license: PlantMediaLicense = {
  status: "verified",
  creator: "TIBALDO",
  license: "Droits de réutilisation confirmés par l’Owner",
  licenseUrl: "",
  sourceUrl: "owner-provided://tibaldo/monstera-mint-2026-09-05",
  registryPath: "/credits-images",
  note: "Photographie personnelle fournie par l’Owner le 5 septembre 2026. Identité Monstera deliciosa ‘Mint’ et droits de réutilisation confirmés par l’Owner. Adaptation locale : conversion WebP sans recadrage ni transformation morphologique.",
};

const gallery: PlantEntry["gallery"] = [{
  src: "/owner-media/monstera/monstera-mint-owner-2026-09.webp",
  alt: "Monstera deliciosa ‘Mint’ aux grandes feuilles fenêtrées, marbrées de vert menthe et de crème",
  caption: "Monstera deliciosa ‘Mint’ · Photo : TIBALDO.",
  width: 1080,
  height: 1350,
  license,
}];

export const applyOwnerMonsteraMintMediaV1 = (plants: PlantEntry[]): PlantEntry[] => plants.map((plant) => (
  plant.genre === "monstera" && plant.slug === "mint" ? { ...plant, gallery } : plant
));
