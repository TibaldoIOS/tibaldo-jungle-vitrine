import { localizedPath, pilotPaths, type Locale } from "@/lib/i18n/config";

const origin = "https://jungle.tibaldo.fr";
const locales: Locale[] = ["fr", "en", "es"];
const escape = (value: string) => value.replace(/[<>&'\"]/g, (character) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" }[character] ?? character));

export function GET() {
  const urls = pilotPaths.flatMap((path) => locales.map((locale) => {
    const loc = `${origin}${localizedPath(path, locale)}`;
    const links = locales.map((alternate) => `<xhtml:link rel="alternate" hreflang="${alternate}" href="${escape(`${origin}${localizedPath(path, alternate)}`)}"/>`).join("");
    return `<url><loc>${escape(loc)}</loc>${links}<xhtml:link rel="alternate" hreflang="x-default" href="${escape(`${origin}${path}`)}"/></url>`;
  })).join("");
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls}</urlset>`, { headers: { "Content-Type": "application/xml; charset=utf-8", "X-Robots-Tag": "noindex" } });
}

