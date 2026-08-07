import { requireEventAdminApi } from "@/lib/events/admin";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    await requireEventAdminApi();
    const { env } = await import("cloudflare:workers");
    const bucket = (env as unknown as { MEDIA?: R2Bucket }).MEDIA;
    if (!bucket) return Response.json({ error: "Stockage média indisponible." }, { status: 503 });
    const form = await request.formData();
    const file = form.get("file");
    if (!(file instanceof File) || !file.type.startsWith("image/")) return Response.json({ error: "Image invalide." }, { status: 400 });
    if (file.size > 8_000_000) return Response.json({ error: "Image trop volumineuse (8 Mo maximum)." }, { status: 400 });
    const extension = file.name.split(".").pop()?.replace(/[^a-z0-9]/gi, "").toLowerCase() || "jpg";
    const key = `events/${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}.${extension}`;
    await bucket.put(key, file.stream(), { httpMetadata: { contentType: file.type, cacheControl: "public, max-age=31536000, immutable" } });
    return Response.json({ url: `/api/event-media/${key}` });
  } catch {
    return Response.json({ error: "Accès administrateur requis." }, { status: 401 });
  }
}
