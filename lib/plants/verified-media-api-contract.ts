import { jungleOrigin } from "../deployment-mode.ts";
import type { PlantEntry } from "./types.ts";
import { isEditorialPlaceholder, isInternalPhotoProductionCopy, isPhotoProductionPlaceholder } from "./types.ts";

export const verifiedMediaApiContractVersion = "1.0";

const canonicalMediaPath = (path: string) =>
  path === "/media/anthurium-pallidiflorum-feuillage-tibaldo-jungle.webp"
    ? path
    : path.replace(/^\/media\//, "/");

export function exactVerifiedPrimaryMedia(plant: PlantEntry) {
  return plant.gallery.find((image) =>
    image.license?.status === "verified" &&
    Boolean(image.license.creator) &&
    Boolean(image.license.sourceUrl) &&
    Boolean(image.license.license) &&
    Boolean(image.license.registryPath) &&
    !isPhotoProductionPlaceholder(image.src) &&
    !isEditorialPlaceholder(image.src) &&
    !isInternalPhotoProductionCopy(`${image.alt} ${image.caption}`)
  ) ?? null;
}

const fnv1a = (input: string) => {
  let hash = 0x811c9dc5;
  for (let index = 0; index < input.length; index += 1) {
    hash ^= input.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }
  return (hash >>> 0).toString(16).padStart(8, "0");
};

export function mediaRegistryVersionFor(plants: readonly PlantEntry[]) {
  const registry = plants
    .map((plant) => {
      const image = exactVerifiedPrimaryMedia(plant);
      return [plant.genre, plant.slug, image?.src ?? "gap", image?.license?.creator ?? "", image?.license?.license ?? "", image?.license?.sourceUrl ?? ""].join("|");
    })
    .sort()
    .join("\n");
  return `jungle-media-v1-${fnv1a(registry)}`;
}

export function toVerifiedMediaApiFields(plant: PlantEntry, mediaRegistryVersion: string) {
  const image = exactVerifiedPrimaryMedia(plant);
  const base = {
    jungle_slug: `plantes/${plant.genre}/${plant.slug}`,
    botanical_name: plant.botanicalName,
    display_name: plant.displayName,
    identity_status: "EXACT_CANONICAL_IDENTITY" as const,
    media_registry_version: mediaRegistryVersion,
  };
  if (!image) return {
    ...base,
    media_status: "HONEST_MEDIA_GAP" as const,
    primary_media_url: null,
    primary_media_alt: null,
    primary_media_width_px: null,
    primary_media_height_px: null,
    primary_media_creator: null,
    primary_media_source_url: null,
    primary_media_license: null,
    primary_media_license_url: null,
  };
  return {
    ...base,
    media_status: "VERIFIED_MEDIA" as const,
    primary_media_url: new URL(canonicalMediaPath(image.src), `${jungleOrigin}/`).toString(),
    primary_media_alt: image.alt,
    primary_media_width_px: image.width,
    primary_media_height_px: image.height,
    primary_media_creator: image.license!.creator!,
    primary_media_source_url: image.license!.sourceUrl!,
    primary_media_license: image.license!.license!,
    primary_media_license_url: image.license!.licenseUrl ?? null,
  };
}
