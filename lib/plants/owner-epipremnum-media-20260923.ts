import type { PlantEntry, PlantMediaLicense } from "./types.ts";

const sourceUrl = "owner-provided://tibaldo/photo-20260923-epipremnum-owner-01";

const license: PlantMediaLicense = {
  status: "verified",
  creator: "TIBALDO",
  license: "Autorisation d’utilisation confirmée par l’Owner TIBALDO",
  sourceUrl,
  registryPath: "/credits-images",
  note: "Photographies fournies et identifiées par l’Owner TIBALDO. Conversion WebP q85 sans recadrage ni altération générative. Provenance : docs/media-provenance/photo-20260923-epipremnum-owner-01.json.",
};

const mediaByEntity = new Map<string, PlantEntry["gallery"][number]>([
  ["epipremnum/aureum", {
    src: "/owner-media/epipremnum-aureum/epipremnum-aureum-feuillage-dore.webp",
    alt: "Feuillage dense d’Epipremnum aureum, du vert profond au jaune doré lumineux.",
    caption: "Feuillage doré d’Epipremnum aureum. Photo : TIBALDO",
    width: 1536,
    height: 1024,
    license,
  }],
  ["epipremnum/marble-queen", {
    src: "/owner-media/marble-queen/epipremnum-aureum-marble-queen-feuillage-panache-20260923.webp",
    alt: "Epipremnum aureum ‘Marble Queen’ aux feuilles vertes largement marbrées de blanc crème.",
    caption: "Panachure crème et verte de Marble Queen. Photo : TIBALDO",
    width: 1536,
    height: 1024,
    license,
  }],
]);

export function applyOwnerEpipremnumMedia20260923(entries: PlantEntry[]): void {
  for (const [entityId, media] of mediaByEntity) {
    const [genre, slug] = entityId.split("/");
    const index = entries.findIndex((plant) => plant.genre === genre && plant.slug === slug);
    if (index === -1) throw new Error(`Missing canonical Epipremnum entity: ${entityId}`);
    const plant = entries[index];
    const previousVerified = plant.gallery.filter(
      (item) => item.license?.status === "verified" && item.src !== media.src,
    );
    entries[index] = {
      ...plant,
      gallery: [media, ...previousVerified],
      mediaNeeds: [],
      updatedAt: "2026-09-23",
    };
  }
}
