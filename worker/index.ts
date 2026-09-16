/** Cloudflare Worker entry point for the vinext-starter template. */
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";
import { isBetaJungleDeployment } from "../lib/deployment-mode";
import {
  classifyLinksOpen,
  linksOpenEventId,
  LINKS_OPEN_PATH,
} from "../lib/links-open-tracking";

interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
  LINKS_ALERT_URL?: string;
  LINKS_ALERT_SECRET?: string;
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

const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self' https://api.open-meteo.com https://shop.tibaldo.fr",
  "frame-src https://www.google.com https://www.youtube.com https://www.youtube-nocookie.com",
  "media-src 'self' https:",
  "worker-src 'self' blob:",
  "manifest-src 'self'",
  "upgrade-insecure-requests",
].join("; ");

const STATIC_ASSET_PATTERN = /\.(?:avif|gif|ico|jpe?g|mp4|png|svg|webm|webp|woff2?)$/i;
const CONTROLLED_MEDIA_PREFIX = "/media/";

async function recordLinksOpen(request: Request, env: Env): Promise<void> {
  const cf = (request as Request & { cf?: { botManagement?: { verifiedBot?: boolean } } }).cf;
  const classification = classifyLinksOpen(request, cf?.botManagement?.verifiedBot === true);
  if (classification.kind === "excluded") return;

  const now = new Date();
  const eventId = linksOpenEventId(classification.action, now);
  const inserted = await env.DB.prepare(
    "INSERT OR IGNORE INTO conversion_events (id, action, path, target, created_at) VALUES (?, ?, ?, NULL, ?)",
  ).bind(
    eventId,
    classification.action,
    LINKS_OPEN_PATH,
    now.toISOString(),
  ).run();

  // A duplicate opening is neither counted nor alerted. Email delivery stays
  // outside the response path: a provider failure must never block /liens.
  if (inserted.meta.changes !== 1) return;
  if (!env.LINKS_ALERT_URL || !env.LINKS_ALERT_SECRET) {
    await env.DB.prepare("UPDATE conversion_events SET target = ? WHERE id = ?")
      .bind("alert_not_configured", eventId).run();
    return;
  }

  try {
    const alert = await fetch(env.LINKS_ALERT_URL, {
      method: "POST",
      headers: {
        authorization: `Bearer ${env.LINKS_ALERT_SECRET}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        event_id: eventId,
        kind: classification.kind,
        occurred_at: now.toISOString(),
        path: LINKS_OPEN_PATH,
      }),
      redirect: "error",
      signal: AbortSignal.timeout(10_000),
    });
    const result = alert.ok ? await alert.json() as { state?: string } : null;
    const state = result?.state === "PROVIDER_ACCEPTED"
      ? "alert_provider_accepted"
      : `alert_failed_${alert.status}`;
    await env.DB.prepare("UPDATE conversion_events SET target = ? WHERE id = ?")
      .bind(state, eventId).run();
  } catch {
    await env.DB.prepare("UPDATE conversion_events SET target = ? WHERE id = ?")
      .bind("alert_outcome_uncertain", eventId).run();
  }
}

function getControlledMediaAssetPath(pathname: string): string | null {
  if (!pathname.startsWith(CONTROLLED_MEDIA_PREFIX)) return null;

  const relativePath = pathname.slice(CONTROLLED_MEDIA_PREFIX.length);
  if (!relativePath || relativePath.includes("..") || !STATIC_ASSET_PATTERN.test(relativePath)) {
    return null;
  }

  return `/${relativePath}`;
}

function withDeploymentHeaders(request: Request, response: Response): Response {
  const { pathname } = new URL(request.url);
  const headers = new Headers(response.headers);
  if (isBetaJungleDeployment) {
    headers.set("X-Robots-Tag", "noindex, nofollow");
  }
  headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=(), usb=()");
  const isTour = pathname.startsWith("/visite-jungle/");
  const policy = isTour
    ? CONTENT_SECURITY_POLICY
        .replace("script-src 'self' 'unsafe-inline'", "script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval'")
        .replace("connect-src 'self'", "connect-src 'self' blob:")
    : CONTENT_SECURITY_POLICY;
  headers.set("Content-Security-Policy", policy);
  if (isTour) headers.set("Cache-Control", "public, max-age=0, must-revalidate");

  // Stable, non-fingerprinted editorial media may change between BETA reviews,
  // so cache it for one day rather than indefinitely. Hashed application assets
  // retain their immutable one-year cache policy.
  if (STATIC_ASSET_PATTERN.test(pathname)) {
    headers.set("Cache-Control", "public, max-age=86400, stale-while-revalidate=604800");
    if (pathname.toLowerCase().endsWith(".webp")) headers.set("Content-Type", "image/webp");
    if (pathname.toLowerCase().endsWith(".mp4")) headers.set("Content-Type", "video/mp4");
    if (pathname.toLowerCase().endsWith(".webm")) headers.set("Content-Type", "video/webm");
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

    // The virtual tour is a self-contained, same-origin static experience.
    if (url.pathname.startsWith("/visite-jungle/")) {
      return withDeploymentHeaders(request, await env.ASSETS.fetch(request));
    }


    // Sites may dispatch files that physically exist in the static bundle
    // before the Worker runs. Public editorial media therefore uses a stable
    // virtual prefix: the request reaches the Worker, which fetches the
    // original bundled asset and applies the deployment MIME/cache/security policy.
    const controlledMediaAssetPath = getControlledMediaAssetPath(url.pathname);
    if (url.pathname.startsWith(CONTROLLED_MEDIA_PREFIX)) {
      if (!controlledMediaAssetPath) return withDeploymentHeaders(request, new Response("Not found", { status: 404 }));

      const assetUrl = new URL(controlledMediaAssetPath, request.url);
      const assetRequest = new Request(assetUrl, request);
      return withDeploymentHeaders(request, await env.ASSETS.fetch(assetRequest));
    }

    // With run_worker_first enabled, hashed application bundles reach this
    // Worker before the asset dispatcher. Serve them explicitly so CSS and
    // hydration modules cannot fall through to the application router.
    if (url.pathname.startsWith("/assets/") || url.pathname.startsWith("/_next/static/")) {
      return withDeploymentHeaders(request, await env.ASSETS.fetch(request));
    }

    if (STATIC_ASSET_PATTERN.test(url.pathname)) {
      return withDeploymentHeaders(request, await env.ASSETS.fetch(request));
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
      return withDeploymentHeaders(request, response);
    }

    const response = await handler.fetch(request, env, ctx);
    if (url.pathname === LINKS_OPEN_PATH && response.status >= 200 && response.status < 400) {
      ctx.waitUntil(recordLinksOpen(request, env));
    }
    return withDeploymentHeaders(request, response);
  },
};

export default worker;
