import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://jungle.tibaldo.fr/sitemap.xml",
    host: "https://jungle.tibaldo.fr",
  };
}
