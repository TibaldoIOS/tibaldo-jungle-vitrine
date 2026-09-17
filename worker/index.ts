/** Cloudflare Worker entry point for the vinext-starter template. */
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";
import { isBetaJungleDeployment } from "../lib/deployment-mode";
import {
  classifyLinksOpen,
  linksOpenEventId,
  LINKS_OPEN_ACTION,
  LINKS_OPEN_PATH,
} from "../lib/links-open-tracking";
import { buildLinksStatsRange, buildLinksStatsWindow, LINKS_STATS_TIME_ZONE } from "../lib/links-open-stats";

interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
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
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self' https://api.open-meteo.com https://shop.tibaldo.fr https://www.googletagmanager.com https://www.google-analytics.com https://analytics.google.com https://region1.google-analytics.com",
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
  const state = env.LINKS_ALERT_SECRET ? "alert_pending" : "alert_not_configured";
  await env.DB.prepare("UPDATE conversion_events SET target = ? WHERE id = ?")
    .bind(state, eventId).run();
}

const LINKS_ALERT_QUEUE_PATH = "/api/internal/links-alerts";
const LINKS_STATS_PATH = "/api/internal/links-stats";

function authorizedInternalLinksRequest(request: Request, env: Env): boolean {
  const configured = env.LINKS_ALERT_SECRET ?? "";
  const supplied = (request.headers.get("authorization") ?? "").replace(/^Bearer /, "");
  if (!configured || configured.length !== supplied.length) return false;
  let mismatch = 0;
  for (let index = 0; index < configured.length; index += 1) mismatch |= configured.charCodeAt(index) ^ supplied.charCodeAt(index);
  return mismatch === 0;
}

async function handleLinksAlertQueue(request: Request, env: Env): Promise<Response> {
  const headers = { "content-type": "application/json", "cache-control": "no-store", "x-content-type-options": "nosniff" };
  if (!authorizedInternalLinksRequest(request, env)) return Response.json({ error: "AUTH_REQUIRED" }, { status: 401, headers });
  if (request.method === "GET") {
    const rows = await env.DB.prepare(
      "SELECT id, action, path, created_at FROM conversion_events WHERE path = ? AND action IN (?, ?) AND target = ? ORDER BY created_at ASC LIMIT 20",
    ).bind(LINKS_OPEN_PATH, "links_open", "links_open_test", "alert_pending").all();
    return Response.json({ events: rows.results }, { headers });
  }
  if (request.method === "POST") {
    let input: { event_id?: unknown; state?: unknown };
    try { input = await request.json() as { event_id?: unknown; state?: unknown }; }
    catch { return Response.json({ error: "INPUT_INVALID" }, { status: 400, headers }); }
    if (typeof input.event_id !== "string" || !/^(?:links-open-|links-test-)[A-Za-z0-9-]{1,100}$/.test(input.event_id)
        || !["alert_provider_accepted", "alert_provider_rejected", "alert_outcome_uncertain"].includes(String(input.state))) {
      return Response.json({ error: "INPUT_INVALID" }, { status: 400, headers });
    }
    const changed = await env.DB.prepare(
      "UPDATE conversion_events SET target = ? WHERE id = ? AND path = ? AND action IN (?, ?)",
    ).bind(input.state, input.event_id, LINKS_OPEN_PATH, "links_open", "links_open_test").run();
    return Response.json({ updated: changed.meta.changes === 1 }, { headers });
  }
  return Response.json({ error: "METHOD_NOT_ALLOWED" }, { status: 405, headers });
}

type CountRow = { count: number | string | null };
type LastOpenRow = { created_at: string };

function rowCount(row: CountRow | null): number {
  const count = Number(row?.count ?? 0);
  return Number.isSafeInteger(count) && count >= 0 ? count : 0;
}

function linksOpenCountStatement(env: Env, start?: string, end?: string) {
  let sql = "SELECT COUNT(*) AS count FROM conversion_events WHERE path = ? AND action = ?";
  const bindings: string[] = [LINKS_OPEN_PATH, LINKS_OPEN_ACTION];
  if (start) {
    sql += " AND created_at >= ?";
    bindings.push(start);
  }
  if (end) {
    sql += " AND created_at < ?";
    bindings.push(end);
  }
  return env.DB.prepare(sql).bind(...bindings);
}

async function handleLinksStats(request: Request, env: Env): Promise<Response> {
  const headers = { "content-type": "application/json", "cache-control": "no-store", "x-content-type-options": "nosniff" };
  if (!authorizedInternalLinksRequest(request, env)) return Response.json({ error: "AUTH_REQUIRED" }, { status: 401, headers });
  if (request.method !== "GET") return Response.json({ error: "METHOD_NOT_ALLOWED" }, { status: 405, headers });

  const generatedAt = new Date();
  const canonicalWindow = buildLinksStatsWindow(generatedAt);
  const url = new URL(request.url);
  let requestedWindow;
  try {
    requestedWindow = buildLinksStatsRange({
      start: url.searchParams.get("start"),
      end: url.searchParams.get("end"),
    }, generatedAt);
  } catch (error) {
    const reason = error instanceof RangeError ? error.message : "RANGE_INVALID";
    return Response.json({ error: "RANGE_INVALID", reason }, { status: 400, headers });
  }

  const [lifetime, firstOpen, lastOpen, today, sevenDays, rangeCount] = await Promise.all([
    linksOpenCountStatement(env).first<CountRow>(),
    env.DB.prepare(
      "SELECT created_at FROM conversion_events WHERE path = ? AND action = ? ORDER BY created_at ASC LIMIT 1",
    ).bind(LINKS_OPEN_PATH, LINKS_OPEN_ACTION).first<LastOpenRow>(),
    env.DB.prepare(
      "SELECT created_at FROM conversion_events WHERE path = ? AND action = ? ORDER BY created_at DESC LIMIT 1",
    ).bind(LINKS_OPEN_PATH, LINKS_OPEN_ACTION).first<LastOpenRow>(),
    linksOpenCountStatement(env, canonicalWindow.todayStart, canonicalWindow.end).first<CountRow>(),
    linksOpenCountStatement(env, canonicalWindow.start, canonicalWindow.end).first<CountRow>(),
    linksOpenCountStatement(env, requestedWindow.start, requestedWindow.end).first<CountRow>(),
  ]);

  const daily: CountRow[] = [];
  for (let offset = 0; offset < requestedWindow.daily.length; offset += 50) {
    const days = requestedWindow.daily.slice(offset, offset + 50);
    const results = await env.DB.batch<CountRow>(
      days.map((day) => linksOpenCountStatement(env, day.start, day.end)),
    );
    daily.push(...results.map((result) => result.results[0] ?? { count: 0 }));
  }

  return Response.json({
    timezone: LINKS_STATS_TIME_ZONE,
    generated_at: generatedAt.toISOString(),
    start: requestedWindow.startDate,
    end: requestedWindow.endDate,
    start_at: requestedWindow.start,
    end_exclusive_at: requestedWindow.end,
    range_count: rowCount(rangeCount),
    today: rowCount(today),
    seven_days: rowCount(sevenDays),
    lifetime: rowCount(lifetime),
    first_open: firstOpen?.created_at ?? null,
    last_open: lastOpen?.created_at ?? null,
    daily: requestedWindow.daily.map((day, index) => ({ date: day.date, count: rowCount(daily[index] ?? null) })),
  }, { headers });
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

    if (url.pathname === LINKS_ALERT_QUEUE_PATH) {
      return withDeploymentHeaders(request, await handleLinksAlertQueue(request, env));
    }

    if (url.pathname === LINKS_STATS_PATH) {
      return withDeploymentHeaders(request, await handleLinksStats(request, env));
    }

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
