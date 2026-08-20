/** Cloudflare Worker entry point for the vinext-starter template. */
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";

interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
  IMAGES: {
    input(stream: ReadableStream): {
      transform(options: Record<string, unknown>): {
        output(options: { format: string; quality: number }): Promise<{ response(): Response }>;
      };
    };
  };
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

const multilingualPilotPaths = new Set([
  "/", "/plantes", "/plantes/cycas/revoluta", "/plantes/anthurium/clarinervium",
  "/plantes/monstera/thai-constellation", "/plantes/bananiers", "/conseils/arroser-plantes-interieur",
]);

function localizedRequestPath(pathname: string) {
  const match = pathname.match(/^\/(en|es)(\/.*)?$/);
  return { locale: match?.[1] ?? "fr", canonical: match ? match[2] || "/" : pathname.replace(/\/$/, "") || "/" };
}

// Image security config. SVG sources with .svg extension auto-skip the
// optimization endpoint on the client side (served directly, no proxy).
// To route SVGs through the optimizer (with security headers), set
// dangerouslyAllowSVG: true in next.config.js and uncomment below:
// const imageConfig: ImageConfig = { dangerouslyAllowSVG: true };

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/_vinext/image") {
      const allowedWidths = [...DEFAULT_DEVICE_SIZES, ...DEFAULT_IMAGE_SIZES];
      return handleImageOptimization(request, {
        fetchAsset: (path) => env.ASSETS.fetch(new Request(new URL(path, request.url))),
        transformImage: async (body, { width, format, quality }) => {
          const result = await env.IMAGES.input(body).transform(width > 0 ? { width } : {}).output({ format, quality });
          return result.response();
        },
      }, allowedWidths);
    }

    const response = await handler.fetch(request, env, ctx);
    const type = response.headers.get("content-type") ?? "";
    if (!type.includes("text/html")) return response;
    const page = localizedRequestPath(url.pathname);
    if (!multilingualPilotPaths.has(page.canonical)) return response;
    let html = await response.text();
    html = html.replace(/<html([^>]*?)lang=["'][^"']+["']([^>]*)>/i, `<html$1lang="${page.locale}"$2>`);
    if (page.locale === "fr") {
      const alternates = `<link rel="alternate" hreflang="fr" href="https://jungle.tibaldo.fr${page.canonical}"><link rel="alternate" hreflang="en" href="https://jungle.tibaldo.fr/en${page.canonical === "/" ? "" : page.canonical}"><link rel="alternate" hreflang="es" href="https://jungle.tibaldo.fr/es${page.canonical === "/" ? "" : page.canonical}"><link rel="alternate" hreflang="x-default" href="https://jungle.tibaldo.fr${page.canonical}">`;
      html = html.replace(/<\/head>/i, `${alternates}</head>`);
    }
    const headers = new Headers(response.headers);
    headers.delete("content-length");
    if (url.hostname !== "jungle.tibaldo.fr") {
      headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
    }
    return new Response(html, { status: response.status, statusText: response.statusText, headers });
  },
};

export default worker;
