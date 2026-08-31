import { guides } from "@/lib/guides/catalog";
import { plants } from "@/lib/plants/catalog";
import { familyEditorials } from "@/lib/plants/family-editorials";
export { familyHubDecision, familyHubDecisions, isFamilyIndexable, isRouteIndexable } from "./family-indexability-contract";

export const isGenreIndexable = (genre: string) => {
  const children = plants.filter((plant) => plant.genre === genre);
  const uniqueEditorials = familyEditorials[genre as keyof typeof familyEditorials]?.length ?? 0;
  return children.length > 0 || uniqueEditorials >= 3;
};

export const canonicalGuideSlugs = guides.map(({ slug }) => slug);
