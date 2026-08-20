import ScrollReveal from "../../ScrollReveal";
import { SiteHeader } from "../../SiteChrome";
import { localizedPath, languageTags, type TranslatedLocale } from "@/lib/i18n/config";
import { getWave2Guide, getWave2Guides, wave2Ui } from "@/lib/i18n/wave2";

const origin = "https://jungle.tibaldo.fr";

function Footer({ locale }: { locale: TranslatedLocale }) {
  return <footer className="pilot-locale-footer"><div className="shell"><strong>Studio Végétal — Tibaldo Jungle</strong><a href={localizedPath("/conseils", locale)}>{wave2Ui[locale].related}</a></div></footer>;
}

export default function Wave2GuidePage({ path, locale }: { path: string; locale: TranslatedLocale }) {
  const ui = wave2Ui[locale];
  const guide = getWave2Guide(path, locale);
  const guides = getWave2Guides(locale);
  const canonical = `${origin}${localizedPath(path, locale)}`;

  if (!guide) {
    const schema = { "@context": "https://schema.org", "@type": "CollectionPage", url: canonical, name: ui.hubTitle, description: ui.hubDescription, inLanguage: languageTags[locale] };
    return <main className="editorial-page localized-pilot-page wave2-guide-hub" lang={locale}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <ScrollReveal />
      <section className="pilot-localized-hero"><img src="/monstera-deliciosa-feuilles.jpg" alt={ui.hubTitle} /><div className="pilot-localized-shade" aria-hidden="true"/><SiteHeader locale={locale} currentPath={path}/><div className="shell pilot-localized-hero-content"><p className="eyebrow"><span/>{ui.hubEyebrow}</p><h1>{ui.hubTitle}</h1><p>{ui.hubIntro}</p></div></section>
      <nav className="pilot-breadcrumbs shell" aria-label="Breadcrumb"><ol><li><a href={localizedPath("/", locale)}>{ui.breadcrumbs[0]}</a></li><li><span aria-current="page">{ui.breadcrumbs[1]}</span></li></ol></nav>
      <section className="shell advice-library"><header><p className="section-kicker">{ui.library}</p><h2>{guides.length} {locale === "en" ? "practical guides" : "guías prácticas"}</h2></header><div className="wave2-guide-grid">{guides.map((item) => <a href={localizedPath(`/conseils/${item.slug}`, locale)} key={item.slug}><img src={item.image} alt={item.title}/><div><span>{item.eyebrow} · {item.readingTime}</span><h3>{item.title}</h3><p>{item.intro}</p><strong>{ui.read} ↗</strong></div></a>)}</div></section>
      <Footer locale={locale}/>
    </main>;
  }

  const sections = guide.sections.map(([title, copy], index) => ({ id: `section-${index + 1}`, title, copy }));
  const breadcrumbItems = [{ name: ui.breadcrumbs[0], url: localizedPath("/", locale) }, { name: ui.breadcrumbs[1], url: localizedPath("/conseils", locale) }, { name: guide.title, url: localizedPath(path, locale) }];
  const schema = { "@context": "https://schema.org", "@graph": [
    { "@type": "Article", url: canonical, headline: guide.title, description: guide.intro, inLanguage: languageTags[locale], image: `${origin}${guide.image}`, author: { "@type": "Organization", name: "Studio Végétal — Tibaldo Jungle" }, mainEntityOfPage: canonical },
    { "@type": "BreadcrumbList", itemListElement: breadcrumbItems.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.name, item: `${origin}${item.url}` })) },
  ] };
  return <main className="editorial-page localized-pilot-page guide-detail wave2-guide-detail" lang={locale}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <ScrollReveal />
    <section className="pilot-localized-hero"><img src={guide.image} alt={guide.title}/><div className="pilot-localized-shade" aria-hidden="true"/><SiteHeader locale={locale} currentPath={path}/><div className="shell pilot-localized-hero-content"><p className="eyebrow"><span/>{guide.eyebrow} · {ui.guide}</p><h1>{guide.title}</h1><p>{guide.intro}</p></div></section>
    <nav className="pilot-breadcrumbs shell" aria-label="Breadcrumb"><ol>{breadcrumbItems.map((item, index) => <li key={item.url}>{index < 2 ? <a href={item.url}>{item.name}</a> : <span aria-current="page">{item.name}</span>}</li>)}</ol></nav>
    <article className="shell pilot-localized-article"><aside><span>{ui.contents}</span>{sections.map((section, index) => <a key={section.id} href={`#${section.id}`}>{String(index + 1).padStart(2, "0")} · {section.title}</a>)}</aside><div>{sections.map((section, index) => <section id={section.id} data-parity-section={section.id} key={section.id}><span>{String(index + 1).padStart(2, "0")}</span><h2>{section.title}</h2><p>{section.copy}</p></section>)}</div></article>
    <section className="pilot-localized-cta"><div className="shell"><span>{ui.library}</span><h2>{ui.related}</h2><a className="button button-light" href={localizedPath("/conseils", locale)}>{ui.related} ↗</a></div></section>
    <Footer locale={locale}/>
  </main>;
}
