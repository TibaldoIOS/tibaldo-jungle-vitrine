import type { PlantEntry, PlantMediaLicense } from "./types";

const license: PlantMediaLicense = {
  status: "verified",
  creator: "Owner Tibaldo · photographie personnelle",
  license: "Droits de réutilisation confirmés par l’Owner",
  licenseUrl: "",
  sourceUrl: "owner-provided://tibaldo/monstera-thai-constellation-2026-09-05",
  registryPath: "/credits-images",
  note: "Photographie personnelle fournie par l’Owner le 5 septembre 2026. Identité Monstera deliciosa ‘Thai Constellation’ et droits de réutilisation confirmés par l’Owner. Adaptation locale : conversion WebP sans recadrage ni transformation morphologique.",
};

const gallery: PlantEntry["gallery"] = [{
  src: "/owner-media/monstera/monstera-thai-constellation-owner-2026-09.webp",
  alt: "Monstera deliciosa ‘Thai Constellation’ aux feuilles fenêtrées vert foncé, mouchetées de crème",
  caption: "Monstera deliciosa ‘Thai Constellation’ · photographie personnelle fournie par l’Owner Tibaldo, droits de réutilisation confirmés.",
  width: 1365,
  height: 2048,
  license,
}];

export const applyOwnerMonsteraThaiConstellationMediaV1 = (plants: PlantEntry[]): PlantEntry[] => plants.map((plant) => (
  plant.genre === "monstera" && plant.slug === "thai-constellation" ? { ...plant, gallery } : plant
));
