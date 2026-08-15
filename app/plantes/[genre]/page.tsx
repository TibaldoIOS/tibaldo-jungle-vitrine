import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPlantsByGenre } from "@/lib/plants/catalog";
import { familyGuides } from "@/lib/plants/family-guides";
import { familyEditorials } from "@/lib/plants/family-editorials";
import { genreHerbiers } from "@/lib/plants/genre-herbiers";
import ScrollReveal from "../../ScrollReveal";
import { Arrow, SiteFooter, SiteHeader } from "../../SiteChrome";
import PlantCarePassport from "../PlantCarePassport";

type Props = { params: Promise<{ genre: string }> };
type GuideKey = keyof typeof familyGuides;

export const generateStaticParams = () => Object.keys(familyGuides).map((genre) => ({ genre }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { genre } = await params;
  const guide = familyGuides[genre as GuideKey];
  if (!guide) return {};
  return {
    title: `${guide.name} à Lille : entretien, lumière et variétés`,
    description: `Guide complet des ${guide.name} à Lille : exposition, arrosage, température, substrat, rempotage et variétés proposées par Tibaldo Jungle.`,
    keywords: [`${guide.name} Lille`, `${guide.name} entretien`, `${guide.name} lumière`, `${guide.name} arrosage`, `acheter ${guide.name} Lille`, `rempotage ${guide.name} Lille`],
    alternates: { canonical: `/plantes/${genre}` },
    openGraph: { title: `${guide.name} à Lille — Guide Tibaldo Jungle`, description: guide.lead, url: `/plantes/${genre}`, type: "article", images: [{ url: guide.image, alt: guide.imageAlt }] },
  };
}

export default async function Page({ params }: Props) {
  const { genre } = await params;
  const guide = familyGuides[genre as GuideKey];
  if (!guide) notFound();
  const isFamily = "rank" in guide && guide.rank === "family";
  const botanicalName = "botanicalName" in guide ? guide.botanicalName : guide.name;
  const editorials = familyEditorials[genre as keyof typeof familyEditorials] ?? [];
  const herbier = genreHerbiers[genre as keyof typeof genreHerbiers];
  const list = getPlantsByGenre(genre);
  const genrePortraits = list
    .map((plant) => ({ src: plant.gallery[0].src, alt: plant.gallery[0].alt, name: plant.listingName ?? plant.botanicalName, href: `/plantes/${genre}/${plant.slug}` }))
    .filter((portrait, index, portraits) => portraits.findIndex((item) => item.src === portrait.src) === index)
    .slice(0, 4);
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Article", headline: `${guide.name} : guide de culture et variétés à Lille`, description: guide.lead, image: guide.image, author: { "@type": "Organization", name: "Studio Végétal — Tibaldo Jungle" }, publisher: { "@type": "LocalBusiness", name: "Studio Végétal — Tibaldo Jungle", alternateName: "Tibaldo Jungle", address: { "@type": "PostalAddress", streetAddress: "3 place de l’Arbonnoise", postalCode: "59000", addressLocality: "Lille", addressCountry: "FR" } } },
      { "@type": "FAQPage", mainEntity: guide.faq.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) },
    ],
  };
  return <main className="editorial-page"><ScrollReveal />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <section className="inner-hero compact-inner-hero family-genre-hero">{herbier && <div className="family-genre-image is-herbier" role="img" aria-label={herbier.alt} style={{ backgroundImage: `url(${herbier.image})`, backgroundPosition: herbier.position }} />}<div className="inner-hero-shade" /><SiteHeader /><div className="shell inner-hero-content"><a className="family-genre-breadcrumb" href="/plantes">Encyclopédie <span>·</span> Tous les univers</a><p className="eyebrow"><span /> {isFamily ? "Famille botanique" : "Genre végétal"}</p><h1><span className="hero-line"><span>Les</span></span><span className="hero-line"><span><em>{isFamily ? botanicalName : guide.name}.</em></span></span></h1><p>{guide.heroSubtitle}</p></div></section>
    <PlantCarePassport indicators={[{ label: "Difficulté", value: guide.care.difficulty, tone: "coral" }, { label: "Lumière", value: guide.care.light, tone: "gold" }, { label: "Arrosage", value: guide.care.water, tone: "blue" }, { label: "Humidité", value: guide.care.humidity, tone: "sage" }]} substrate={guide.care.substrate} nutrition={guide.care.nutrition} />
    <section className="genre-portrait shell" aria-labelledby="genre-portrait-title" data-reveal>
      <header><p className="section-kicker">Reconnaître le genre</p><h2 id="genre-portrait-title">Plusieurs silhouettes,<br /><em>un même univers.</em></h2><p>Feuilles, ports et textures varient d’une espèce à l’autre. Parcourez les spécimens déjà présents dans l’encyclopédie.</p></header>
      <div className={`genre-portrait-grid count-${genrePortraits.length}`}>{genrePortraits.map((portrait, index) => {
        const visual = <><img src={portrait.src} alt={portrait.alt} width="900" height="1100" /><span>0{index + 1}</span><strong>{portrait.name}</strong>{portrait.href && <small>Voir la fiche ↗</small>}</>;
        return portrait.href ? <a href={portrait.href} key={portrait.src}>{visual}</a> : <figure key={portrait.src}>{visual}</figure>;
      })}</div>
    </section>
    <nav className="plant-explorer is-compact" aria-label={`Espèces et cultivars de ${guide.name}`}><div className="shell plant-explorer-inner"><div><span>Explorer les espèces & cultivars</span><div className="plant-explorer-links">{list.length ? list.map((plant) => <a href={`/plantes/${genre}/${plant.slug}`} key={plant.slug}>{plant.listingName ?? plant.botanicalName}</a>) : <span className="is-disabled">Premières fiches à venir</span>}</div></div></div></nav>
    <article className="family-guide"><section className="shell family-guide-intro" data-reveal><div><p className="section-kicker">Guide de culture · Lille</p><h2>Comprendre<br /><em>les {guide.name}.</em></h2></div><div><p>{guide.lead}</p><p>{guide.origin}</p></div></section><section className="family-editorial shell">{editorials.map((section, index) => <article key={section.title} data-reveal><span>{String(index + 1).padStart(2, "0")}</span><h2>{section.title}</h2><p>{section.text}</p></article>)}</section><section className="family-guide-facts shell">{guide.facts.map((fact) => <div key={fact.label} data-reveal><span>{fact.label}</span><strong>{fact.value}</strong></div>)}</section><section className="family-guide-sections shell">{guide.sections.map((section, index) => <article key={section.title} data-reveal><span>{String(index + 1).padStart(2, "0")}</span><div><h2>{section.title}</h2><p>{section.text}</p></div></article>)}</section><section className="family-guide-problems"><div className="shell"><header data-reveal><p className="section-kicker">Diagnostic rapide</p><h2>Observer avant d’agir.</h2></header><div>{guide.problems.map((problem) => <article key={problem.title} data-reveal><h3>{problem.title}</h3><p>{problem.text}</p></article>)}</div></div></section><section className="family-guide-local shell" data-reveal><p className="section-kicker">Tibaldo Jungle · Lille</p><h2>Voir, choisir et rempoter votre {guide.name} au Studio.</h2><p>Retrouvez nos conseils personnalisés au 3 place de l’Arbonnoise. Nous adaptons le choix de la plante à votre lumière et proposons le rempotage gratuit toute l’année.</p><a className="button" href="/contact">Nous trouver <Arrow /></a></section><section className="family-guide-faq shell"><header data-reveal><p className="section-kicker">Questions fréquentes</p><h2>{guide.name} : les réponses essentielles.</h2></header>{guide.faq.map((item) => <details key={item.question} data-reveal><summary>{item.question}</summary><p>{item.answer}</p></details>)}<p className="family-guide-sources">Sources botaniques : {guide.sources.map((source, index) => <span key={source.url}>{index > 0 && " · "}<a href={source.url} target="_blank" rel="noreferrer">{source.label}</a></span>)}</p></section></article>
    <section className="plant-index shell"><div data-reveal><p className="section-kicker">Espèces et variétés documentées</p><h2>{list.length ? <>Une famille.<br />Des caractères singuliers.</> : <>La collection<br />se prépare.</>}</h2><p>{list.length ? "Chaque fiche repose sur l’observation, la culture et des sources botaniques identifiées." : `Les premières fiches ${guide.name} seront ajoutées au fil des plantes observées et proposées au Studio.`}</p></div>{list.length > 0 && <div className="plant-index-grid">{list.map((plant) => <a href={`/plantes/${genre}/${plant.slug}`} key={plant.slug} data-reveal><img src={plant.gallery[0].src} alt={plant.gallery[0].alt} width={plant.gallery[0].width} height={plant.gallery[0].height} /><span>{plant.family} · {plant.specimen.observedHeight}</span><h2>{plant.listingName ?? plant.botanicalName}</h2><p>{plant.subtitle}</p><strong>Lire la fiche <Arrow /></strong></a>)}</div>}</section>
    <nav className="shell plant-back-link"><a href="/plantes">← Tous les genres</a></nav><SiteFooter />
  </main>;
}
