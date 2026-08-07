export const dynamic = "force-dynamic";

export async function GET(_request: Request, context: { params: Promise<{ key: string[] }> }) {
  const { key } = await context.params;
  const { env } = await import("cloudflare:workers");
  const bucket = (env as unknown as { MEDIA?: R2Bucket }).MEDIA;
  const object = bucket ? await bucket.get(key.join("/")) : null;
  if (!object) return new Response("Image introuvable", { status: 404 });
  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("etag", object.httpEtag);
  headers.set("cache-control", "public, max-age=31536000, immutable");
  return new Response(object.body, { headers });
}
