import type { PlantEntry, PlantMediaLicense } from "./types";

const license: PlantMediaLicense = {
  status: "verified",
  creator: "Owner Tibaldo · photographie personnelle",
  license: "Droits de réutilisation confirmés par l’Owner",
  licenseUrl: "",
  sourceUrl: "owner-provided://tibaldo/musa-florida-variegata-2026-09-03",
  registryPath: "/credits-images",
  note: "Photographie personnelle fournie par l’Owner le 3 septembre 2026. Identité Musa ‘Florida Variegata’ et droits de réutilisation confirmés par l’Owner. Adaptation locale : conversion WebP sans recadrage ni transformation morphologique.",
};

const gallery: PlantEntry["gallery"] = [{
  src: "/owner-media/musa/musa-florida-variegata-owner-2026-09.webp",
  alt: "Musa ‘Florida Variegata’ en pot, aux feuilles vertes panachées de blanc crème",
  caption: "Musa ‘Florida Variegata’ · photographie personnelle fournie par l’Owner Tibaldo, droits de réutilisation confirmés.",
  width: 1284,
  height: 1230,
  license,
}];

export const applyOwnerMusaFloridaVariegataMediaV1 = (plants: PlantEntry[]): PlantEntry[] => plants.map((plant) => (
  plant.genre === "musa" && plant.slug === "florida-variegata" ? { ...plant, gallery } : plant
));
