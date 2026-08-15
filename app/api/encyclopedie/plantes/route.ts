import { plants } from "@/lib/plants/catalog";

export const dynamic = "force-static";

export function GET() {
  const entries = plants.map((plant) => ({
    id: `${plant.genre}/${plant.slug}`,
    genre: plant.genre,
    genreLabel: plant.genreLabel,
    slug: plant.slug,
    displayName: plant.displayName,
    botanicalName: plant.botanicalName,
    cultivar: plant.taxonomy.cultivar,
    family: plant.taxonomy.family,
    imageUrl: `https://jungle.tibaldo.fr${plant.gallery[0].src}`,
    imageAlt: plant.gallery[0].alt,
    encyclopediaSlug: `plantes/${plant.genre}/${plant.slug}`,
    encyclopediaUrl: `https://jungle.tibaldo.fr/plantes/${plant.genre}/${plant.slug}`,
    publishedAt: plant.publishedAt,
    updatedAt: plant.updatedAt,
  }));

  return Response.json(entries, {
    headers: {
      "Access-Control-Allow-Origin": "https://caisse.tibaldo.fr",
      "Cache-Control": "public, max-age=300, s-maxage=3600",
    },
  });
}
