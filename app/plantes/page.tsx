import type { Metadata } from "next";
import ScrollReveal from "../ScrollReveal";
import { Arrow, SiteFooter, SiteHeader } from "../SiteChrome";
import { plantFamilies, plants, studioCollection } from "@/lib/plants/catalog";
import PlantExplorer from "./PlantExplorer";
import PlantUniverseCards from "./PlantUniverseCards";
import OpeningEventLink from "../OpeningEventLink";

export const metadata: Metadata = {
  title: "Plantes rares et d’intérieur à Lille | Tibaldo Jungle",
  description:
    "Explorez les genres et espèces de plantes rares et d’intérieur documentés par Studio Végétal Tibaldo Jungle à Lille.",
  alternates: { canonical: "/plantes" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "/plantes",
    siteName: "Studio Végétal — Tibaldo Jungle",
    title: "Encyclopédie des plantes rares et d’intérieur à Lille",
    description: "Recherchez une plante par son nom, sa famille botanique ou ses besoins et consultez les guides Tibaldo Jungle.",
    images: [{ url: "/alocasia-imperial-red.webp", width: 1024, height: 1536, alt: "Encyclopédie végétale Tibaldo Jungle à Lille" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Encyclopédie végétale Tibaldo Jungle",
    description: "Genres, espèces, cultivars et conseils de culture pour trouver une plante adaptée à votre intérieur.",
    images: ["/alocasia-imperial-red.webp"],
  },
};

export default function PlantsPage() {
  const pageUrl = "https://jungle.tibaldo.fr/plantes";
  const animatedFamilies = plantFamilies.map((family) => ({
    slug: family.slug,
    name: family.name,
    image: family.image,
    imageAlt: family.imageAlt,
    varieties: plants
      .filter((plant) => plant.genre === family.slug)
      .map((plant) => {
        const visual = plant.gallery?.[0];
        const image = visual?.src && !visual.src.includes("photo-reelle-a-venir") ? visual.src : family.image;
        return { name: plant.displayName, botanicalName: plant.botanicalName, image, alt: visual?.alt || family.imageAlt };
      }),
  }));
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "CollectionPage", "@id": `${pageUrl}#page`, name: "Encyclopédie des plantes rares et d’intérieur", url: pageUrl, description: metadata.description, isPartOf: { "@id": "https://jungle.tibaldo.fr/#website" }, about: { "@id": "https://jungle.tibaldo.fr/#store" }, mainEntity: { "@id": `${pageUrl}#plants` }, inLanguage: "fr-FR" },
      { "@type": "ItemList", "@id": `${pageUrl}#plants`, name: "Fiches botaniques Tibaldo Jungle", numberOfItems: plants.length, itemListElement: plants.map((plant, index) => ({ "@type": "ListItem", position: index + 1, name: plant.botanicalName, url: `${pageUrl}/${plant.genre}/${plant.slug}` })) },
      { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Accueil", item: "https://jungle.tibaldo.fr/" }, { "@type": "ListItem", position: 2, name: "Plantes", item: pageUrl }] },
    ],
  };
  return (
    <main className="editorial-page plants-library-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <ScrollReveal />
      <section className="inner-hero compact-inner-hero">
        <div className="inner-hero-texture" />
        <div className="inner-hero-shade" />
        <SiteHeader />
        <div className="shell inner-hero-content">
          <p className="eyebrow"><span /> Encyclopédie végétale · Lille</p>
          <h1>
            <span className="hero-line"><span>Comprendre</span></span>
            <span className="hero-line"><span><em>le vivant.</em></span></span>
          </h1>
          <p>Explorez les grands genres végétaux, puis découvrez chaque espèce et variété dans une fiche complète.</p>
        </div>
      </section>

      <nav className="plant-explorer plant-library-intro" aria-label="Explorer les plantes">
        <div className="shell plant-explorer-inner">
          <div className="plant-universe-panel">
            <span>01 · Univers botaniques</span>
            <PlantUniverseCards families={animatedFamilies} />
          </div>
          <div className="plant-species-panel">
            <span>02 · Espèces & cultivars</span>
            <strong>{plants.length}</strong>
            <h2>Fiches botaniques<br /><em>à explorer.</em></h2>
            <p>Recherchez une plante par son nom, sa famille ou ses besoins, puis ouvrez sa fiche détaillée.</p>
            <a href="#recherche-plantes">Accéder à la recherche <Arrow /></a>
          </div>
        </div>
      </nav>

      <PlantExplorer plants={plants} />
      <section className="shell plant-help-bridge" data-reveal><div><p className="section-kicker">Une plante vous inquiète ?</p><h2>Feuilles jaunes,<br/><em>parasites ou racines serrées.</em></h2></div><div><p>L’encyclopédie aide à comprendre une espèce. Le parcours SOS Plantes part de votre symptôme pour éviter les gestes inutiles.</p><a className="button button-green" href="/sos-plantes">Commencer le diagnostic <Arrow /></a></div></section>

      <section className="plant-family-index shell">
        <header data-reveal>
          <p className="section-kicker">L’encyclopédie Tibaldo</p>
          <h2>Choisir un genre.<br /><em>Entrer dans son univers.</em></h2>
          <p>Chaque univers rassemble les espèces et variétés observées, cultivées ou présentées au Studio. L’encyclopédie s’enrichira progressivement.</p>
        </header>
        <div className="plant-family-list">
          {plantFamilies.map((family, index) => (
            <a className="plant-family-card" href={`/plantes/${family.slug}`} key={family.slug} data-reveal>
              <div className="plant-family-visual">
                <img src={family.image} alt={family.imageAlt} width="900" height="1100" />
                <span>{String(index + 1).padStart(2, "0")}</span>
              </div>
              <div className="plant-family-copy">
                <p>{family.eyebrow}</p>
                <h2>{family.name}</h2>
                <span>{family.description}</span>
                <strong>Découvrir le genre <Arrow /></strong>
              </div>
            </a>
          ))}
        </div>
      </section>
      <section className="studio-collection shell" aria-labelledby="studio-collection-title">
        <header data-reveal><p className="section-kicker">Cultivées et observées à Wattignies</p><h2 id="studio-collection-title">La collection<br /><em>du Studio.</em></h2><p>Cette liste reflète les plantes actuellement cultivées ou suivies par Tibaldo Jungle. Elle nourrit progressivement l’encyclopédie ; elle ne constitue pas un état du stock en boutique.</p></header>
        <div className="studio-collection-list">{studioCollection.map((group, index) => <article key={group.genre} data-reveal><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{group.href ? <a href={group.href}>{group.genre} <Arrow /></a> : group.genre}</h3><ul>{group.plants.map((plant) => <li key={plant}>{plant}</li>)}</ul></div></article>)}</div>
        <p className="studio-collection-note">Les mentions « à confirmer » seront remplacées après vérification de l’étiquette horticole ou du fournisseur.</p>
      </section>
      <OpeningEventLink />
      <SiteFooter />
    </main>
  );
}
