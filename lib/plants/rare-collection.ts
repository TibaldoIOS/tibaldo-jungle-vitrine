// Une collection éditoriale, sans score de rareté ni offre commerciale.
export const rareCollectionKeys = [
  "colocasia/ghost-rider", "colocasia/pharaohs-mask", "anthurium/dark-source-rvdp",
  "colocasia/black-suksathid", "monstera/devil-monster",
] as const;
export const isRareCollectionPlant = (genre: string, slug: string) =>
  rareCollectionKeys.some(key => key === `${genre}/${slug}`);
