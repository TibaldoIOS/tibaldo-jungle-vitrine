import type { MetadataRoute } from "next";
import { plants } from "@/lib/plants/catalog";
import { familyGuides } from "@/lib/plants/family-guides";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://jungle.tibaldo.fr/",
      lastModified: new Date("2026-08-05"),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...["plantes", "substrats", "rempotage", "services", "contact"].map((path, index) => ({
      url: `https://jungle.tibaldo.fr/${path}/`,
      lastModified: new Date("2026-08-05"),
      changeFrequency: "weekly" as const,
      priority: index === 1 ? 0.9 : 0.8,
    })),
    ...Object.keys(familyGuides).map((genre) => ({ url: `https://jungle.tibaldo.fr/plantes/${genre}/`, lastModified: new Date("2026-08-06"), changeFrequency: "monthly" as const, priority: 0.8 })),
    ...plants.map((plant) => ({ url: `https://jungle.tibaldo.fr/plantes/${plant.genre}/${plant.slug}/`, lastModified: new Date(plant.updatedAt), changeFrequency: "monthly" as const, priority: 0.85 })),
    {
      url: "https://jungle.tibaldo.fr/creation-boutique/",
      lastModified: new Date("2026-08-03"),
      changeFrequency: "weekly",
      priority: 0.75,
    },
  ];
}
