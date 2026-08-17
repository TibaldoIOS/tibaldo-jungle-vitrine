import { guides } from "@/lib/guides/catalog";
import { plants } from "@/lib/plants/catalog";
import { familyEditorials } from "@/lib/plants/family-editorials";

export const isGenreIndexable = (genre: string) => {
  const children = plants.filter((plant) => plant.genre === genre);
  const uniqueEditorials = familyEditorials[genre as keyof typeof familyEditorials]?.length ?? 0;
  return children.length > 0 || uniqueEditorials >= 3;
};

export const isFamilyIndexable = (family: string) => {
  const children = plants.filter((plant) => plant.taxonomy.family.toLowerCase() === family.toLowerCase());
  const genera = new Set(children.map((plant) => plant.taxonomy.genus.toLowerCase()));
  return children.length >= 3 && genera.size >= 2;
};

export const canonicalGuideSlugs = guides.map(({ slug }) => slug);
