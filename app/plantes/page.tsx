import type { Metadata } from "next";
import ScrollReveal from "../ScrollReveal";
import { Arrow, SiteFooter, SiteHeader } from "../SiteChrome";
import { plantFamilies, plants, studioCollection } from "@/lib/plants/catalog";
import PlantExplorer from "./PlantExplorer";
import StudioAccessCompact from "./StudioAccessCompact";

export const metadata: Metadata = {
  title: "Encyclopédie des plantes d’intérieur et tropicales",
  description:
    "Explorez les genres, familles, espèces et cultivars de plantes d’intérieur et tropicales avec des fiches de culture détaillées.",
  alternates: { canonical: "/plantes" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "/plantes",
    siteName: "Studio Végétal — Tibaldo Jungle",
    title: "Encyclopédie des plantes d’intérieur et tropicales",
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
  const primaryPlantFamilies = plantFamilies.filter((family) => !["musa", "ensete"].includes(family.slug));
  const featuredSlugs = ["monstera", "anthurium", "alocasia", "philodendron", "strelitzia", "bananiers"];
  const featuredFamilies = featuredSlugs
    .map((slug) => primaryPlantFamilies.find((family) => family.slug === slug))
    .filter((family): family is (typeof primaryPlantFamilies)[number] => Boolean(family));
  const speciesCount = (slug: string) => {
    if (slug === "bananiers") return plants.filter((plant) => ["musa", "ensete"].includes(plant.genre)).length;
    return plants.filter((plant) => plant.genre === slug).length;
  };
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "CollectionPage", "@id": `${pageUrl}#page`, name: "Encyclopédie des plantes d’intérieur et tropicales", url: pageUrl, description: metadata.description, isPartOf: { "@id": "https://jungle.tibaldo.fr/#website" }, about: { "@type": "Thing", name: "Plantes d’intérieur et tropicales" }, mainEntity: { "@id": `${pageUrl}#plants` }, inLanguage: "fr-FR" },
      { "@type": "ItemList", "@id": `${pageUrl}#plants`, name: "Fiches botaniques Tibaldo Jungle", numberOfItems: plants.length, itemListElement: plants.map((plant, index) => ({ "@type": "ListItem", position: index + 1, name: plant.botanicalName, url: `${pageUrl}/${plant.genre}/${plant.slug}` })) },
      { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Accueil", item: "https://jungle.tibaldo.fr/" }, { "@type": "ListItem", position: 2, name: "Plantes", item: pageUrl }] },
    ],
  };
  return (
    <main className="editorial-page plants-library-page" id="haut-plantes">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <ScrollReveal />
      <section className="inner-hero compact-inner-hero plants-hub-hero">
        <div className="inner-hero-texture" />
        <div className="inner-hero-shade" />
        <SiteHeader />
        <div className="shell inner-hero-content">
          <div>
            <p className="eyebrow"><span /> Encyclopédie végétale</p>
            <h1>Les plantes.</h1>
            <p>Explorez les grands genres végétaux et ouvrez leurs fiches botaniques.</p>
          </div>
          <a className="plants-hub-search-jump" href="#recherche-plantes" aria-label="Aller à la recherche de plantes">
            <span aria-hidden="true">⌕</span>
            Rechercher par nom
          </a>
        </div>
      </section>

      <section className="shell plants-hub-manifesto" data-reveal>
        <p className="section-kicker">On prend le vivant au sérieux</p>
        <div><h2>Une encyclopédie<br /><em>faite pour explorer.</em></h2><p>Chaque plante est rattachée à son genre, sa famille et ses besoins réels. Entrez par un univers ou recherchez directement un nom.</p></div>
      </section>

      <section className="shell plants-quick-explore" aria-labelledby="quick-explore-title">
        <header data-reveal><p className="section-kicker">Explorer les plantes</p><h2 id="quick-explore-title">Les univers<br /><em>essentiels.</em></h2><p>Les grandes portes d’entrée de l’encyclopédie, accessibles en un geste.</p></header>
        <div className="plants-featured-grid">
          {featuredFamilies.map((family, index) => <a href={`/plantes/${family.slug}`} key={family.slug} data-reveal>
            <i aria-hidden="true">{String(index + 1).padStart(2, "0")}</i>
            <span><small>{family.eyebrow}</small><strong>{family.name}</strong><em>{speciesCount(family.slug)} {speciesCount(family.slug) > 1 ? "espèces" : "espèce"}</em></span>
            <b aria-hidden="true">↗</b>
          </a>)}
        </div>
      </section>

      <section className="shell plant-help-bridge plants-hub-sos" data-reveal>
        <div><p className="section-kicker">Une plante vous inquiète ?</p><h2>Observer.<br/><em>Puis agir.</em></h2></div>
        <div className="plants-sos-actions"><p>Partez du signe réellement observé pour éviter les gestes inutiles.</p><ul><li>Feuilles jaunes</li><li>Parasites</li><li>Racines · rempotage</li></ul><a className="button button-green" href="/sos-plantes">SOS Plantes <Arrow /></a></div>
      </section>

      <section className="shell plants-all-genera" aria-labelledby="all-genera-title">
        <header data-reveal><p className="section-kicker">Répertoire complet</p><h2 id="all-genera-title">Tous les genres.</h2><p>{primaryPlantFamilies.length} univers botaniques, sans aucune porte d’entrée masquée.</p></header>
        <div className="plants-genera-directory">
          {primaryPlantFamilies.map((family, index) => <a href={`/plantes/${family.slug}`} key={family.slug}>
            <i aria-hidden="true">{String(index + 1).padStart(2, "0")}</i>
            <span><strong>{family.name}</strong><small>{family.eyebrow} · {speciesCount(family.slug)} {speciesCount(family.slug) > 1 ? "fiches" : "fiche"}</small></span>
            <b aria-hidden="true">→</b>
          </a>)}
        </div>
      </section>

      <section className="studio-collection plants-hub-collection shell" aria-labelledby="studio-collection-title">
        <header data-reveal><p className="section-kicker">Cultivées et observées à Wattignies</p><h2 id="studio-collection-title">La collection<br /><em>du Studio.</em></h2><p>Les plantes suivies par Tibaldo Jungle nourrissent progressivement l’encyclopédie ; cette liste n’est pas un état du stock.</p></header>
        <details><summary>Voir la collection complète <span>{studioCollection.length} groupes</span></summary>
          <div className="studio-collection-list">{studioCollection.map((group, index) => <article key={group.genre}><span>{String(index + 1).padStart(2, "0")}</span><div><h3><a href={group.href}>{group.genre} <Arrow /></a></h3><ul>{group.plants.map((plant) => <li key={plant}>{plant}</li>)}</ul></div></article>)}</div>
          <p className="studio-collection-note">Les mentions « à confirmer » seront remplacées après vérification de l’étiquette horticole ou du fournisseur.</p>
        </details>
      </section>

      <PlantExplorer plants={plants} />
      <div className="shell plants-back-top"><a href="#haut-plantes">↑ Retour en haut</a></div>

      <StudioAccessCompact showOpeningEvent />
      <SiteFooter compactTransit />
    </main>
  );
}
