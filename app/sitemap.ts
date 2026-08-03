import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://jungle.tibaldo.fr/",
      lastModified: new Date("2026-08-03"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://jungle.tibaldo.fr/creation-boutique/",
      lastModified: new Date("2026-08-03"),
      changeFrequency: "weekly",
      priority: 0.75,
    },
  ];
}
