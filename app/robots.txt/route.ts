export const dynamic = "force-static";

export function GET() {
  const body = [
    "User-agent: *",
    "Disallow: /",
    "",
    "Host: beta-jungle.tibaldo.fr",
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
