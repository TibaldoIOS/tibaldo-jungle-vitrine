"use client";

import { useSyncExternalStore } from "react";
import { canonicalPath, isPilotPath, languageFlags, languageNames, localeFromPath, locales, localizedPath, type Locale } from "@/lib/i18n/config";

const subscribe = () => () => {};

export default function LanguageSwitcher({ initialPath = "/" }: { initialPath?: string }) {
  const pathname = useSyncExternalStore(subscribe, () => window.location.pathname, () => initialPath);
  const locale = localeFromPath(pathname);
  const canonical = canonicalPath(pathname);
  const available = isPilotPath(canonical);
  const options = locales.map((target) => ({ target, href: available ? localizedPath(canonical, target) : null }));
  const remember = (target: Locale, link: HTMLAnchorElement) => {
    window.localStorage.setItem("tibaldo_locale", target);
    void fetch("/api/locale", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ locale: target }), keepalive: true });
    link.href = `${link.getAttribute("href")}${window.location.search}${window.location.hash}`;
  };
  const navLabel = locale === "es" ? "Elegir idioma" : locale === "en" ? "Choose language" : "Choisir la langue";
  return <nav className="language-switcher" aria-label={navLabel}>
    {options.map(({ target, href }) => href ? <a key={target} href={href} hrefLang={target} lang={target} aria-current={locale === target ? "page" : undefined} aria-label={languageNames[target]} onClick={(event) => remember(target, event.currentTarget)}><span aria-hidden="true">{languageFlags[target]}</span><b>{target.toUpperCase()}</b><span className="sr-only">{languageNames[target]}</span></a> : <span key={target} aria-disabled="true" title="Translation not available"><span aria-hidden="true">{languageFlags[target]}</span><b>{target.toUpperCase()}</b><span className="sr-only">{languageNames[target]}</span></span>)}
  </nav>;
}
