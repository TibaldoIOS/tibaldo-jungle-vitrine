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

const BETA_CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self' https://api.open-meteo.com",
  "frame-src https://www.google.com https://www.youtube.com https://www.youtube-nocookie.com",
  "media-src 'self' https:",
  "worker-src 'self' blob:",
  "manifest-src 'self'",
  "upgrade-insecure-requests",
].join("; ");

const STATIC_ASSET_PATTERN = /\.(?:avif|gif|ico|jpe?g|png|svg|webp|woff2?)$/i;

function withBetaHeaders(request: Request, response: Response): Response {
  const { pathname } = new URL(request.url);
  const headers = new Headers(response.headers);
  headers.set("X-Robots-Tag", "noindex, nofollow");
  headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=(), usb=()");
  headers.set("Content-Security-Policy", BETA_CONTENT_SECURITY_POLICY);

  // Stable, non-fingerprinted editorial media may change between BETA reviews,
  // so cache it for one day rather than indefinitely. Hashed application assets
  // retain their immutable one-year cache policy.
  if (STATIC_ASSET_PATTERN.test(pathname)) {
    headers.set("Cache-Control", "public, max-age=86400, stale-while-revalidate=604800");
    if (pathname.toLowerCase().endsWith(".webp")) headers.set("Content-Type", "image/webp");
  }
  if (pathname.startsWith("/assets/") || pathname.startsWith("/_next/static/")) {
    headers.set("Cache-Control", "public, max-age=31536000, immutable");
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

// Image security config. SVG sources with .svg extension auto-skip the
// optimization endpoint on the client side (served directly, no proxy).
// To route SVGs through the optimizer (with security headers), set
// dangerouslyAllowSVG: true in next.config.js and uncomment below:
// const imageConfig: ImageConfig = { dangerouslyAllowSVG: true };

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (STATIC_ASSET_PATTERN.test(url.pathname)) {
      return withBetaHeaders(request, await env.ASSETS.fetch(request));
    }

    if (url.pathname === "/_vinext/image") {
      const allowedWidths = [...DEFAULT_DEVICE_SIZES, ...DEFAULT_IMAGE_SIZES];
      const response = await handleImageOptimization(request, {
        fetchAsset: (path) => env.ASSETS.fetch(new Request(new URL(path, request.url))),
        transformImage: async (body, { width, format, quality }) => {
          const result = await env.IMAGES.input(body).transform(width > 0 ? { width } : {}).output({ format, quality });
          return result.response();
        },
      }, allowedWidths);
      return withBetaHeaders(request, response);
    }

    const response = await handler.fetch(request, env, ctx);
    return withBetaHeaders(request, response);
  },
};

export default worker;
