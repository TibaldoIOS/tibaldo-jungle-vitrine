import { isLocale } from "@/lib/i18n/config";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as { locale?: string } | null;
  if (!body?.locale || !isLocale(body.locale)) return Response.json({ error: "invalid_locale" }, { status: 400 });
  return Response.json({ locale: body.locale }, { headers: { "Set-Cookie": `tibaldo_locale=${body.locale}; Max-Age=31536000; Path=/; SameSite=Lax; Secure` } });
}

