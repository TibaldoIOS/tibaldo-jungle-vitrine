import {
  isPublicJungleDeployment,
  jungleOrigin,
} from "@/lib/deployment-mode";

export const dynamic = "force-static";

export function GET() {
  const body = isPublicJungleDeployment
    ? [
        "User-agent: *",
        "Allow: /",
        "Disallow: /admin/",
        "Disallow: /api/",
        "Disallow: /lab/",
        "",
        `Sitemap: ${jungleOrigin}/sitemap.xml`,
        "Host: jungle.tibaldo.fr",
        "",
      ].join("\n")
    : [
        "User-agent: *",
        "Disallow: /",
        "",
        `Host: ${new URL(jungleOrigin).hostname}`,
        "",
      ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": isPublicJungleDeployment
        ? "public, max-age=3600, s-maxage=86400"
        : "no-store",
      ...(isPublicJungleDeployment
        ? {}
        : { "X-Robots-Tag": "noindex, nofollow" }),
    },
  });
}
