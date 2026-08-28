type ApiPlant = {
  slug: string;
  genre: string;
  genreLabel: string;
  botanicalName: string;
  displayName: string;
  listingName?: string;
  subtitle: string;
  taxonomy: {
    order: string;
    family: string;
    genus: string;
    species: string;
    cultivar: string | null;
    commonNames: string[];
  };
  synonyms: string[];
  description: string[];
  gallery: { src: string; alt: string; caption: string; width: number; height: number }[];
  publishedAt: string;
  updatedAt: string;
};

const origin = "https://jungle.tibaldo.fr";
const fallbackImage = {
  src: "/photo-reelle-a-venir.svg",
  alt: "Photographie éditoriale à venir",
  caption: "Photographie éditoriale en préparation.",
  width: 1200,
  height: 1600,
};

const absoluteUrl = (path: string) => new URL(path, origin).toString();
const canonicalMediaPath = (path: string) => path.replace(/^\/media\//, "/");
export const encyclopediaSlugOf = (plant: Pick<ApiPlant, "genre" | "slug">) => `plantes/${plant.genre}/${plant.slug}`;

export function toPlantApiV1(plant: ApiPlant) {
  const image = plant.gallery[0] ?? fallbackImage;
  const encyclopediaSlug = encyclopediaSlugOf(plant);
  return {
    id: `${plant.genre}/${plant.slug}`,
    genre: plant.genre,
    genreLabel: plant.genreLabel,
    slug: plant.slug,
    displayName: plant.displayName,
    botanicalName: plant.botanicalName,
    cultivar: plant.taxonomy.cultivar,
    family: plant.taxonomy.family,
    imageUrl: absoluteUrl(canonicalMediaPath(image.src)),
    imageAlt: image.alt,
    encyclopediaSlug,
    encyclopediaUrl: `${origin}/${encyclopediaSlug}`,
    publishedAt: plant.publishedAt,
    updatedAt: plant.updatedAt,
  };
}

export function toPlantApiV2(plant: ApiPlant) {
  const v1 = toPlantApiV1(plant);
  const images = (plant.gallery.length ? plant.gallery : [fallbackImage]).map((image) => ({
    path: canonicalMediaPath(image.src),
    url: absoluteUrl(canonicalMediaPath(image.src)),
    alt: image.alt,
    caption: image.caption,
    width: image.width,
    height: image.height,
  }));
  return {
    ...v1,
    contractVersion: "2.0",
    navigationGenre: plant.genre,
    taxonomyGenreDiffers: plant.taxonomy.genus.toLowerCase() !== plant.genre,
    listingName: plant.listingName ?? null,
    subtitle: plant.subtitle,
    taxonomy: {
      order: plant.taxonomy.order,
      family: plant.taxonomy.family,
      genus: plant.taxonomy.genus,
      species: plant.taxonomy.species,
      cultivar: plant.taxonomy.cultivar,
      commonNames: plant.taxonomy.commonNames,
    },
    synonyms: plant.synonyms,
    description: plant.description,
    primaryImage: images[0],
    images,
  };
}

export const apiContractFallbackImage = fallbackImage;
