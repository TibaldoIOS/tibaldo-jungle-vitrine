export const LINKS_OPEN_PATH = "/liens";
export const LINKS_OPEN_ACTION = "links_open";
export const LINKS_OPEN_TEST_ACTION = "links_open_test";
export const LINKS_OPEN_DEDUPE_MS = 5_000;
export const LINKS_OPEN_TEST_HEADER = "x-tibaldo-control";
export const LINKS_OPEN_TEST_VALUE = "qr-links-test-v1";

const BOT_USER_AGENT = /(?:bot|crawler|spider|slurp|facebookexternalhit|whatsapp|telegrambot|discordbot|linkedinbot|twitterbot|googleother|google-inspectiontool|lighthouse|pagespeed|pingdom|uptimerobot|statuscake|headlesschrome|curl|wget)/i;

export type LinksOpenClassification =
  | { kind: "visit"; action: typeof LINKS_OPEN_ACTION }
  | { kind: "test"; action: typeof LINKS_OPEN_TEST_ACTION }
  | { kind: "excluded"; reason: "method" | "path" | "html" | "prefetch" | "known_bot" };

export function classifyLinksOpen(request: Request, verifiedBot = false): LinksOpenClassification {
  const url = new URL(request.url);
  if (request.method !== "GET") return { kind: "excluded", reason: "method" };
  if (url.pathname !== LINKS_OPEN_PATH) return { kind: "excluded", reason: "path" };

  const accept = request.headers.get("accept") ?? "";
  if (!accept.toLowerCase().includes("text/html")) return { kind: "excluded", reason: "html" };

  const purpose = `${request.headers.get("purpose") ?? ""} ${request.headers.get("sec-purpose") ?? ""}`;
  if (/prefetch|prerender/i.test(purpose)) return { kind: "excluded", reason: "prefetch" };

  const userAgent = request.headers.get("user-agent") ?? "";
  if (verifiedBot || BOT_USER_AGENT.test(userAgent)) return { kind: "excluded", reason: "known_bot" };

  if (request.headers.get(LINKS_OPEN_TEST_HEADER) === LINKS_OPEN_TEST_VALUE) {
    return { kind: "test", action: LINKS_OPEN_TEST_ACTION };
  }

  return { kind: "visit", action: LINKS_OPEN_ACTION };
}

export function linksOpenEventId(action: string, now: Date): string {
  if (action === LINKS_OPEN_TEST_ACTION) return `links-test-${crypto.randomUUID()}`;
  return `links-open-${Math.floor(now.getTime() / LINKS_OPEN_DEDUPE_MS)}`;
}
