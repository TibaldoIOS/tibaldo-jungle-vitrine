import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "../../SiteChrome";
import ScrollReveal from "../../ScrollReveal";
import { isMultilingualPath, isPilotPath, isTranslatedLocale, languageTags, localizedPath, multilingualPaths, openGraphLocales, type PilotPath, type TranslatedLocale } from "@/lib/i18n/config";
import { pilotTranslations } from "@/lib/i18n/pilot-content";
import { getPlant, plants as plantEntries } from "@/lib/plants/catalog";
import { getWave1Family, getWave1Genre, getWave1Plant, wave1KindOf } from "@/lib/i18n/wave1";
import Wave1BotanicalPage from "./Wave1BotanicalPage";
import { isWave2Path, getWave2Guide, wave2Ui } from "@/lib/i18n/wave2";
import Wave2GuidePage from "./Wave2GuidePage";
import { isWave3Path, getWave3Profile, getWave3Ui } from "@/lib/i18n/wave3";
import Wave3SubstratePage from "./Wave3SubstratePage";

type Props = { params: Promise<{ locale: string; segments?: string[] }> };
const origin = "https://jungle.tibaldo.fr";

function resolve(params: { locale: string; segments?: string[] }) {
  if (!isTranslatedLocale(params.locale)) return null;
  const path = (`/${params.segments?.join("/") ?? ""}`.replace(/\/$/, "") || "/");
  if (!isMultilingualPath(path)) return null;
  const content = isPilotPath(path) ? pilotTranslations[params.locale][path] : undefined;
  return { locale: params.locale, path, content };
}

export function generateStaticParams() {
  return (["en", "es"] as const).flatMap((locale) => multilingualPaths.map((path) => ({ locale, segments: path === "/" ? [] : path.slice(1).split("/") })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = resolve(await params);
  if (!page) return {};
  const canonical = localizedPath(page.path, page.locale);
  const plant = getWave1Plant(page.path, page.locale);
  const genre = getWave1Genre(page.path, page.locale);
  const family = getWave1Family(page.path, page.locale);
  if (isWave3Path(page.path)) {
    const profile = getWave3Profile(page.path, page.locale);
    const ui = getWave3Ui(page.locale);
    const title = profile ? `${profile.title} ${profile.accent} | Tibaldo Jungle` : ui.hubTitle;
    const description = profile?.seoDescription ?? ui.hubDescription;
    const sourceImage = profile ? "/advice-rempotage.jpg" : "/substrats-horticoles-vrac-tibaldo-jungle-lille.jpg";
    return { title, description, alternates: { canonical, languages: { fr: page.path, en: localizedPath(page.path, "en"), es: localizedPath(page.path, "es"), "x-default": page.path } }, openGraph: { type: profile ? "article" : "website", locale: openGraphLocales[page.locale], alternateLocale: page.locale === "en" ? ["fr_FR", "es_ES"] : ["fr_FR", "en_GB"], url: canonical, siteName: "Studio Végétal — Tibaldo Jungle", title, description, images: [{ url: sourceImage, alt: profile?.shortName ?? ui.hubTitle }] }, twitter: { card: "summary_large_image", title, description, images: [sourceImage] } };
  }
  if (isWave2Path(page.path) && !isPilotPath(page.path)) {
    const guide = getWave2Guide(page.path, page.locale);
    const ui = wave2Ui[page.locale];
    const title = guide ? `${guide.title} | Tibaldo Jungle` : ui.hubTitle;
    const description = guide?.intro ?? ui.hubDescription;
    const image = guide?.image ?? "/monstera-deliciosa-feuilles.jpg";
    return { title, description, alternates: { canonical, languages: { fr: page.path, en: localizedPath(page.path, "en"), es: localizedPath(page.path, "es"), "x-default": page.path } }, openGraph: { type: guide ? "article" : "website", locale: openGraphLocales[page.locale], alternateLocale: page.locale === "en" ? ["fr_FR", "es_ES"] : ["fr_FR", "en_GB"], url: canonical, siteName: "Studio Végétal — Tibaldo Jungle", title, description, images: [{ url: image, alt: guide?.title ?? ui.hubTitle }] }, twitter: { card: "summary_large_image", title, description, images: [image] } };
  }
  if (plant || genre || family) {
    const title = plant?.seo.title ?? (genre ? `${genre.guide.name}: ${page.locale === "en" ? "care, species and varieties" : "cuidados, especies y variedades"}` : `${family?.family}: ${page.locale === "en" ? "plants, genera and growing advice" : "plantas, géneros y consejos de cultivo"}`);
    const description = plant?.seo.description ?? genre?.guide.lead ?? (page.locale === "en" ? `Botanical profiles in the ${family?.family} family documented by Tibaldo Jungle.` : `Fichas botánicas de la familia ${family?.family} documentadas por Tibaldo Jungle.`);
    const image = plant?.gallery[0] ?? (genre ? { src: genre.guide.image, alt: genre.guide.imageAlt } : family?.plants[0]?.gallery[0]);
    return { title, description, alternates: { canonical, languages: { fr: page.path, en: localizedPath(page.path, "en"), es: localizedPath(page.path, "es"), "x-default": page.path } }, openGraph: { type: plant ? "article" : "website", locale: openGraphLocales[page.locale], alternateLocale: page.locale === "en" ? ["fr_FR", "es_ES"] : ["fr_FR", "en_GB"], url: canonical, siteName: "Studio Végétal — Tibaldo Jungle", title, description, images: image ? [{ url: image.src, alt: image.alt }] : undefined }, twitter: { card: "summary_large_image", title, description, images: image ? [image.src] : undefined } };
  }
  if (!page.content) return {};
  return {
    title: page.content.seoTitle,
    description: page.content.description,
    alternates: { canonical, languages: { fr: page.path, en: localizedPath(page.path, "en"), es: localizedPath(page.path, "es"), "x-default": page.path } },
    openGraph: { type: page.content.kind === "plant" || page.content.kind === "guide" ? "article" : "website", locale: openGraphLocales[page.locale], alternateLocale: page.locale === "en" ? ["fr_FR", "es_ES"] : ["fr_FR", "en_GB"], url: canonical, siteName: "Studio Végétal — Tibaldo Jungle", title: page.content.seoTitle, description: page.content.description, images: [{ url: page.content.image, alt: page.content.imageAlt }] },
    twitter: { card: "summary_large_image", title: page.content.seoTitle, description: page.content.description, images: [page.content.image] },
  };
}

function LocalizedFooter({ locale }: { locale: TranslatedLocale }) {
  const copy = locale === "en" ? { text: "Rare plants, botanical guidance, repotting and horticultural substrates in Lille.", visit: "Visit the Studio", legal: "French legal and commercial pages remain available in French during this beta." } : { text: "Plantas raras, consejos botánicos, trasplante y sustratos hortícolas en Lille.", visit: "Visitar el estudio", legal: "Las páginas legales y comerciales permanecen disponibles en francés durante esta beta." };
  return <footer className="pilot-locale-footer"><div className="shell"><div><strong>Studio Végétal — Tibaldo Jungle</strong><p>{copy.text}</p></div><div><span>{copy.visit}</span><p>3 place de l’Arbonnoise · 59000 Lille</p><a href="mailto:jungle@tibaldo.fr">jungle@tibaldo.fr</a></div></div><p className="shell pilot-locale-legal">{copy.legal}</p></footer>;
}

function PlantFacts({ path, locale }: { path: PilotPath; locale: TranslatedLocale }) {
  const match = path.match(/^\/plantes\/([^/]+)\/([^/]+)$/);
  if (!match || path === "/plantes/bananiers") return null;
  const plant = getPlant(match[1], match[2]);
  if (!plant) return null;
  const labels = locale === "en" ? ["Family", "Genus", "Species", "Cultivar"] : ["Familia", "Género", "Especie", "Cultivar"];
  const facts = [[labels[0], plant.taxonomy.family], [labels[1], plant.taxonomy.genus], [labels[2], plant.taxonomy.species], [labels[3], plant.taxonomy.cultivar]].filter((entry) => entry[1]);
  return <dl className="pilot-facts shell">{facts.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>;
}

export default async function LocalizedPilotPage({ params }: Props) {
  const page = resolve(await params);
  if (!page) notFound();
  const { locale, path } = page;
  if (isWave3Path(path)) return <Wave3SubstratePage path={path} locale={locale}/>;
  if (isWave2Path(path) && !isPilotPath(path)) return <Wave2GuidePage path={path} locale={locale}/>;
  if (wave1KindOf(path) && path !== "/plantes" && path !== "/plantes/bananiers") return <Wave1BotanicalPage path={path} locale={locale} />;
  const content = page.content;
  if (!content) notFound();
  const url = `${origin}${localizedPath(path, locale)}`;
  const plantMatch = path.match(/^\/plantes\/([^/]+)\/([^/]+)$/);
  const plant = plantMatch && path !== "/plantes/bananiers" ? getPlant(plantMatch[1], plantMatch[2]) : null;
  const visual = plant?.gallery[0];
  const image = visual?.src && !visual.src.includes("photo-reelle-a-venir") ? visual.src : content.image;
  const breadcrumbItems = content.breadcrumbs.map((name, index) => ({ "@type": "ListItem", position: index + 1, name, item: index === content.breadcrumbs.length - 1 ? url : `${origin}${localizedPath(index === 0 ? "/" : "/plantes", locale)}` }));
  const structuredData = { "@context": "https://schema.org", "@graph": [
    { "@type": content.kind === "plant" || content.kind === "guide" ? "Article" : "CollectionPage", "@id": `${url}#page`, url, headline: content.title, name: content.title, description: content.description, inLanguage: languageTags[locale], image: `${origin}${image}`, mainEntityOfPage: url, about: plant ? { "@type": "Thing", name: plant.botanicalName, alternateName: plant.synonyms } : undefined, author: { "@id": `${origin}/#organization` }, publisher: { "@id": `${origin}/#organization` } },
    ...(content.faq.length ? [{ "@type": "FAQPage", "@id": `${url}#faq`, inLanguage: languageTags[locale], mainEntity: content.faq.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) }] : []),
    { "@type": "BreadcrumbList", "@id": `${url}#breadcrumbs`, itemListElement: breadcrumbItems },
  ] };
  const home = localizedPath("/", locale);
  const plants = localizedPath("/plantes", locale);
  const guide = localizedPath("/conseils/arroser-plantes-interieur", locale);
  const labels = locale === "en" ? { menu: "Pilot navigation", home: "Home", plants: "Plants", guide: "Watering guide", sections: "In this page", faq: "Frequently asked questions", pilot: "Multilingual beta pilot", published: "Published pilot pages" } : { menu: "Navegación piloto", home: "Inicio", plants: "Plantas", guide: "Guía de riego", sections: "En esta página", faq: "Preguntas frecuentes", pilot: "Piloto beta multilingüe", published: "Páginas piloto publicadas" };

  return <main className="editorial-page localized-pilot-page" lang={locale}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    <ScrollReveal />
    <section className="pilot-localized-hero"><img src={image} alt={content.imageAlt} width={visual?.width ?? 1200} height={visual?.height ?? 800} /><div className="pilot-localized-shade" aria-hidden="true" /><SiteHeader locale={locale} currentPath={path} /><div className="shell pilot-localized-hero-content"><p className="eyebrow"><span /> {content.eyebrow}</p><h1>{content.title}</h1><p>{content.intro}</p></div></section>
    <nav className="pilot-breadcrumbs shell" aria-label="Breadcrumb"><ol>{content.breadcrumbs.map((item, index) => <li key={`${item}-${index}`}>{index < content.breadcrumbs.length - 1 ? <a href={index === 0 ? home : plants}>{item}</a> : <span aria-current="page">{item}</span>}</li>)}</ol></nav>
    <nav className="pilot-localized-nav shell" aria-label={labels.menu}><span>{labels.pilot}</span><a href={home}>{labels.home}</a><a href={plants}>{labels.plants}</a><a href={guide}>{labels.guide}</a></nav>
    <PlantFacts path={path as PilotPath} locale={locale} />
    {path === "/plantes" && <section className="shell pilot-published-identities" aria-labelledby="pilot-identities-title"><p className="section-kicker">{locale === "en" ? "Published botanical identities" : "Identidades botánicas publicadas"}</p><h2 id="pilot-identities-title">{plantEntries.length} {locale === "en" ? "profiles in the French source catalog" : "fichas en el catálogo fuente francés"}</h2><ul>{plantEntries.map((entry) => <li key={`${entry.genre}-${entry.slug}`}>{entry.botanicalName}</li>)}</ul></section>}
    <article className="shell pilot-localized-article"><aside><span>{labels.sections}</span>{content.sections.map((section, index) => { const id = "id" in section ? section.id : `section-${index + 1}`; return <a key={section.title} href={`#${id}`}>{String(index + 1).padStart(2, "0")} · {section.title}</a>; })}</aside><div>{content.sections.map((section, index) => { const id = "id" in section ? section.id : `section-${index + 1}`; return <section id={id} data-parity-section={id} key={section.title} data-reveal><span>{String(index + 1).padStart(2, "0")}</span><h2>{section.title}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>; })}</div></article>
    {content.faq.length > 0 && <section className="shell pilot-localized-faq"><header><p className="section-kicker">FAQ</p><h2>{labels.faq}</h2></header><div>{content.faq.map((item) => <details key={item.question}><summary>{item.question}<span aria-hidden="true">+</span></summary><p>{item.answer}</p></details>)}</div></section>}
    <section className="pilot-localized-cta"><div className="shell"><span>{labels.published}</span><h2>{content.cta}</h2><a className="button button-light" href={path === "/plantes" ? localizedPath("/plantes/cycas/revoluta", locale) : plants}>{content.cta} ↗</a></div></section>
    <LocalizedFooter locale={locale} />
  </main>;
}
