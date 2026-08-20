import ScrollReveal from "../../ScrollReveal";
import { SiteHeader } from "../../SiteChrome";
import { localizedPath, languageTags, type TranslatedLocale } from "@/lib/i18n/config";
import { getWave3Profile, getWave3Substrates, getWave3Ui } from "@/lib/i18n/wave3";

const origin = "https://jungle.tibaldo.fr";

function Footer({ locale }: { locale: TranslatedLocale }) {
  const ui = getWave3Ui(locale);
  return <footer className="pilot-locale-footer"><div className="shell"><strong>Studio Végétal — Tibaldo Jungle</strong><a href={localizedPath("/substrats", locale)}>{ui.all}</a></div></footer>;
}

export default function Wave3SubstratePage({ path, locale }: { path: string; locale: TranslatedLocale }) {
  const ui = getWave3Ui(locale);
  const items = getWave3Substrates(locale);
  const profile = getWave3Profile(path, locale);
  const canonical = `${origin}${localizedPath(path, locale)}`;

  if (!profile) {
    const schema = { "@context": "https://schema.org", "@graph": [
      { "@type": "CollectionPage", url: canonical, name: ui.hubTitle, description: ui.hubDescription, inLanguage: languageTags[locale] },
      { "@type": "ItemList", numberOfItems: items.length, itemListElement: items.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.name, url: `${origin}${localizedPath(`/substrats/${item.slug}`, locale)}` })) },
      { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: ui.breadcrumbHome, item: `${origin}${localizedPath("/", locale)}` }, { "@type": "ListItem", position: 2, name: ui.breadcrumbHub, item: canonical }] },
    ] };
    return <main className="editorial-page substrate-page localized-pilot-page wave3-substrate-hub" lang={locale}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}/><ScrollReveal/>
      <section className="pilot-localized-hero"><img src="/substrats-horticoles-vrac-tibaldo-jungle-lille.jpg" alt={ui.hubTitle}/><div className="pilot-localized-shade" aria-hidden="true"/><SiteHeader locale={locale} currentPath={path}/><div className="shell pilot-localized-hero-content"><p className="eyebrow"><span/>{ui.hubEyebrow}</p><h1>{ui.hubTitle}</h1><p>{ui.hubIntro}</p><a className="button button-light" href="#composants">{ui.explore} ↓</a></div></section>
      <nav className="pilot-breadcrumbs shell" aria-label="Breadcrumb"><ol><li><a href={localizedPath("/", locale)}>{ui.breadcrumbHome}</a></li><li><span aria-current="page">{ui.breadcrumbHub}</span></li></ol></nav>
      <section className="substrate-manifesto shell" data-reveal><div><h2>{ui.manifestoTitle}</h2></div><div className="manifesto-copy"><p>{ui.manifestoOne}</p><p>{ui.manifestoTwo}</p></div></section>
      <section className="substrate-collection" id="composants"><div className="shell collection-heading"><h2>{ui.collectionTitle}</h2><p>{ui.collectionIntro}</p></div><div className="shell material-list">{items.map((item) => <article className="material-card" key={item.slug} data-parity-section={item.slug}><div className={`material-visual material-${item.tone}`}><img src={item.image} alt={item.imageAlt} loading="lazy" width="900" height="700"/><span className="material-number">{item.number}</span></div><div className="material-content"><div className="material-title"><p>{ui.component}</p><h3>{item.name}</h3></div><p className="material-description">{item.description}</p><dl><div><dt>{ui.benefits}</dt><dd>{item.benefits.join(" · ")}</dd></div><div><dt>{ui.uses}</dt><dd>{item.uses}</dd></div><div><dt>{ui.plants}</dt><dd>{item.plants}</dd></div></dl><a className="material-discover" href={localizedPath(`/substrats/${item.slug}`, locale)}>{ui.discover} →</a></div></article>)}</div></section>
      <section className="mix-guide"><div className="shell mix-guide-grid"><div><h2>{ui.mixTitle}</h2></div><div><p>{ui.mixCopy}</p><a className="button button-light" href={localizedPath("/plantes", locale)}>{locale === "en" ? "Explore the plant encyclopedia" : "Explorar la enciclopedia botánica"} →</a></div></div></section>
      <Footer locale={locale}/>
    </main>;
  }

  const item = items.find((candidate) => candidate.slug === profile.slug)!;
  const breadcrumbs = [{ name: ui.breadcrumbHome, path: "/" }, { name: ui.breadcrumbHub, path: "/substrats" }, { name: profile.shortName, path }];
  const schema = { "@context": "https://schema.org", "@graph": [
    { "@type": "Article", url: canonical, headline: `${profile.title} ${profile.accent}`, description: profile.seoDescription, inLanguage: languageTags[locale], image: `${origin}${item.image}`, author: { "@type": "Organization", name: "Studio Végétal — Tibaldo Jungle" }, mainEntityOfPage: canonical, about: profile.name },
    { "@type": "FAQPage", mainEntity: profile.faq.map((entry) => ({ "@type": "Question", name: entry.question, acceptedAnswer: { "@type": "Answer", text: entry.answer } })) },
    { "@type": "BreadcrumbList", itemListElement: breadcrumbs.map((entry, index) => ({ "@type": "ListItem", position: index + 1, name: entry.name, item: `${origin}${localizedPath(entry.path, locale)}` })) },
  ] };
  return <main className={`editorial-page substrate-detail substrate-detail-${profile.slug} localized-pilot-page wave3-substrate-detail`} lang={locale}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}/><ScrollReveal/>
    <section className="pilot-localized-hero"><img src={item.image} alt={item.imageAlt}/><div className="pilot-localized-shade" aria-hidden="true"/><SiteHeader locale={locale} currentPath={path}/><div className="shell pilot-localized-hero-content"><a className="family-genre-breadcrumb" href={localizedPath("/substrats", locale)}>{ui.breadcrumbHub} → {profile.shortName}</a><p className="eyebrow"><span/>{profile.eyebrow}</p><h1>{profile.title} <em>{profile.accent}</em></h1><p>{profile.intro}</p><a className="button button-light" href="#guide">{ui.guide} ↓</a></div></section>
    <nav className="pilot-breadcrumbs shell" aria-label="Breadcrumb"><ol>{breadcrumbs.map((entry, index) => <li key={entry.path}>{index < 2 ? <a href={localizedPath(entry.path, locale)}>{entry.name}</a> : <span aria-current="page">{entry.name}</span>}</li>)}</ol></nav>
    <section className="shell substrate-detail-photo"><img src={item.image} alt={item.imageAlt} width="1400" height="850"/><p>{profile.intro}</p></section>
    <section className="shell substrate-detail-intro" id="guide" data-parity-section="role"><div><h2>{ui.role}</h2></div><p>{profile.role}</p></section>
    <section className="substrate-detail-strengths" data-parity-section="strengths"><div className="shell"><header><h2>{ui.strengths}</h2></header><div className="substrate-strength-grid">{profile.strengths.map((entry, index) => <article key={entry.title}><span>0{index + 1}</span><h3>{entry.title}</h3><p>{entry.copy}</p></article>)}</div></div></section>
    <section className="shell substrate-detail-methods" data-parity-section="methods"><header><h2>{ui.methods}</h2></header><div>{profile.methods.map((entry) => <article key={entry.title}><h3>{entry.title}</h3><p>{entry.copy}</p></article>)}</div></section>
    <section className="substrate-detail-guide" data-parity-section="suitable-cautions"><div className="shell substrate-detail-guide-grid"><div><h2>{ui.suitable}</h2><ul>{profile.suitableFor.map((plant) => <li key={plant}>{plant}</li>)}</ul></div><aside><span>{ui.cautions}</span>{profile.cautions.map((caution) => <p key={caution}>{caution}</p>)}</aside></div></section>
    <section className="shell local-seo-faq flowers-faq" data-parity-section="faq"><header><h2>{ui.faq}</h2></header>{profile.faq.map((entry) => <details key={entry.question}><summary>{entry.question}<span>+</span></summary><p>{entry.answer}</p></details>)}</section>
    <nav className="shell flower-service-link"><a href={localizedPath("/substrats", locale)}>{ui.all} ↗</a><a href={localizedPath("/plantes", locale)}>{locale === "en" ? "Plant encyclopedia" : "Enciclopedia botánica"} ↗</a></nav>
    <Footer locale={locale}/>
  </main>;
}
