import type { PlantEntry } from "./types.ts";

type PlantImage = PlantEntry["gallery"][number];

/** Visitor-facing attribution intentionally excludes internal rights workflow. */
export function publicMediaCredit(image: PlantImage) {
  const creator = image.license?.creator?.trim();
  const publicCreator = creator
    ?.replace(/\s*\([^)]*(?:owner|source fournie|validation|certifi)[^)]*\)/gi, "")
    .replace(/\s*·\s*(?:source fournie|source autorisée|droits? confirmés?).*$/gi, "")
    .trim();
  return publicCreator ? `Photo : ${publicCreator}` : "Photographie botanique";
}
