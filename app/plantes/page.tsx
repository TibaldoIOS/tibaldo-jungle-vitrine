import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import ScrollReveal from "../ScrollReveal";
import { Arrow, SiteFooter, SiteHeader } from "../SiteChrome";
import { plantFamilies, plants, studioCollection } from "@/lib/plants/catalog";
import PlantExplorer from "./PlantExplorer";
import StudioAccessCompact from "./StudioAccessCompact";
import BotanicalMotif from "./BotanicalMotif";
import CompactBotanicalIndex from "./CompactBotanicalIndex";
import PlantsHeroMedia from "./PlantsHeroMedia";
import { isInternalPhotoProductionCopy } from "@/lib/plants/types";

const SearchIcon = () => <svg className="plants-search-icon" viewBox="0 0 20 20" aria-hidden="true" focusable="false"><circle cx="8.5" cy="8.5" r="4.75"/><path d="m12 12 4 4"/></svg>;

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
    images: [{ url: "/media/alocasia-imperial-red.webp", width: 1024, height: 1536, alt: "Encyclopédie végétale Tibaldo Jungle à Lille" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Encyclopédie végétale Tibaldo Jungle",
    description: "Genres, espèces, cultivars et conseils de culture pour trouver une plante adaptée à votre intérieur.",
    images: ["/media/alocasia-imperial-red.webp"],
  },
};

export default function PlantsPage() {
  const pageUrl = "https://jungle.tibaldo.fr/plantes";
  const primaryPlantFamilies = plantFamilies;
  const featuredSlugs = ["monstera", "anthurium", "alocasia", "philodendron"];
  const featuredFamilies = featuredSlugs
    .map((slug) => primaryPlantFamilies.find((family) => family.slug === slug))
    .filter((family): family is (typeof primaryPlantFamilies)[number] => Boolean(family));
  const speciesCount = (slug: string) => {
    if (slug === "bananiers") return plants.filter((plant) => ["musa", "ensete"].includes(plant.genre)).length;
    return plants.filter((plant) => plant.genre === slug).length;
  };
  const featuredImages: Record<string, { src: string; alt: string; note: string }> = {
    monstera: { src: "/media/monstera-deliciosa-feuilles.jpg", alt: "Feuillage découpé d’un Monstera deliciosa", note: "Silhouettes graphiques et croissance grimpante" },
    anthurium: { src: "/media/anthurium-veitchii-king.jpg", alt: "Longue feuille nervurée d’un Anthurium veitchii", note: "Textures, nervures et feuillages de collection" },
    alocasia: { src: "/media/alocasia-cuprea-feuillage.jpg", alt: "Feuillage métallique d’un Alocasia cuprea", note: "Contrastes métalliques et besoins précis" },
    philodendron: { src: "/media/philodendron-hastatum-feuillage.jpg", alt: "Feuillage argenté d’un Philodendron hastatum", note: "Lianes tropicales et ports très variés" },
  };
  const directoryItems = primaryPlantFamilies.map((family) => ({ slug: family.slug, name: family.name, descriptor: family.eyebrow, count: speciesCount(family.slug) }));
  const publicStudioCollection = studioCollection.map((group) => ({
    ...group,
    plants: group.plants.filter(
      (plant) => !isInternalPhotoProductionCopy(plant),
    ),
  }));
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
        <PlantsHeroMedia />
        <div className="inner-hero-shade" />
        <SiteHeader />
        <div className="shell inner-hero-content">
          <div>
            <p className="eyebrow"><span /> Encyclopédie végétale</p>
            <h1>Les plantes.</h1>
            <p>Explorez les grands genres végétaux et ouvrez leurs fiches botaniques.</p>
          </div>
          <div className="plants-hub-hero-actions">
            <a className="plants-hub-search-jump" href="#recherche-plantes" aria-label="Aller à la recherche de plantes"><SearchIcon />Rechercher par nom</a>
            <a className="plants-hub-index-jump" href="#index-botanique">31 genres · index botanique <Arrow /></a>
          </div>
        </div>
      </section>

      <section className="shell plants-hub-manifesto" data-reveal>
        <p className="section-kicker">Comprendre avant de cultiver</p>
        <div>
          <h2>Lire la plante.<br /><em>Suivre son milieu.</em></h2>
          <div className="plants-hub-editorial-copy">
            <p>Une plante tropicale ne se résume pas à une silhouette. Sa feuille, son port, ses racines et son rythme racontent un milieu : sous-bois humide, lisière lumineuse, tronc d’arbre ou sol drainant. Cette encyclopédie relie ces indices visibles aux gestes de culture, sans transformer le vivant en recette universelle.</p>
            <p>Chaque genre ouvre une manière différente d’observer. Les Monstera grimpent et se transforment avec la lumière ; les Anthurium révèlent une diversité de textures et d’exigences ; les Alocasia réagissent vite aux écarts d’arrosage ; les Philodendron explorent des ports rampants, dressés ou lianescents. Les fiches rassemblent identité botanique, conditions, entretien, diagnostic et comparaisons utiles.</p>
            <p>Commencez par un grand univers, parcourez l’index complet ou recherchez directement un nom. L’objectif reste le même : reconnaître la plante que vous avez devant vous, comprendre ses signaux et lui offrir un environnement cohérent.</p>
          </div>
        </div>
      </section>

      <section className="shell plants-editorial-genera" aria-labelledby="featured-genera-title">
        <header data-reveal><p className="section-kicker">Quatre portes d’entrée</p><h2 id="featured-genera-title">Des formes.<br /><em>Des milieux.</em></h2><p>Quatre genres pour entrer dans l’encyclopédie par la feuille, le port et la manière d’habiter l’espace.</p></header>
        <div className="plants-editorial-genera-list">
          {featuredFamilies.map((family, index) => {
            const image = featuredImages[family.slug];
            return <Link href={`/plantes/${family.slug}`} className="plants-editorial-genus" key={family.slug} data-reveal>
              <div className="plants-editorial-genus-media">
                <Image unoptimized src={image.src} alt={image.alt} width={1200} height={900} sizes="(max-width: 700px) 100vw, 55vw" />
              </div>
              <div className="plants-editorial-genus-copy">
                <span>{String(index + 1).padStart(2, "0")} · {family.eyebrow}</span>
                <h3>{family.name}</h3>
                <p>{family.description}</p>
                <small>{image.note}</small>
                <strong>{speciesCount(family.slug)} {speciesCount(family.slug) > 1 ? "fiches" : "fiche"} <Arrow /></strong>
              </div>
            </Link>;
          })}
        </div>
      </section>

      <section className="plants-all-genera-v3" id="index-botanique" aria-labelledby="all-genera-title">
        <div className="shell"><header data-reveal><p className="section-kicker">Index botanique complet</p><h2 id="all-genera-title">Trente et un genres.<br/><em>Un seul index.</em></h2><p>Une lecture compacte pour rejoindre chaque genre sans répéter une seconde galerie de grandes cartes.</p></header><CompactBotanicalIndex items={directoryItems} /></div>
      </section>

      <PlantExplorer plants={plants} />

      <section className="plants-hub-sos-v3" data-reveal>
        <BotanicalMotif genre="chlorophytum" />
        <div className="shell plants-hub-sos-v3-inner"><div><p className="section-kicker">Une plante vous inquiète ?</p><h2>Observer.<br/><em>Puis agir.</em></h2><p>Partez du signe réellement observé pour éviter les gestes inutiles.</p></div><div className="plants-sos-signs"><span>01 · Feuilles jaunes</span><span>02 · Parasites</span><span>03 · Racines</span></div><Link className="button button-light" href="/sos-plantes">Ouvrir SOS Plantes <Arrow /></Link></div>
      </section>

      <section className="studio-collection plants-hub-collection shell" aria-labelledby="studio-collection-title">
        <header data-reveal><p className="section-kicker">Cultivées et observées par TIBALDO Jungle</p><h2 id="studio-collection-title">La collection<br /><em>du Studio.</em></h2><p>Les plantes suivies par TIBALDO Jungle nourrissent progressivement l’encyclopédie ; cette liste n’est pas un état du stock.</p></header>
        <details><summary>Voir la collection complète <span>{studioCollection.length} groupes</span></summary>
          <div className="studio-collection-list">{publicStudioCollection.map((group, index) => <article key={group.genre}><span>{String(index + 1).padStart(2, "0")}</span><div><h3><a href={group.href}>{group.genre} <Arrow /></a></h3>{group.plants.length > 0 && <ul>{group.plants.map((plant) => <li key={plant}>{plant}</li>)}</ul>}</div></article>)}</div>
        </details>
      </section>

      <div className="shell plants-back-top"><a href="#haut-plantes">↑ Retour en haut</a></div>

      <StudioAccessCompact showOpeningEvent />
      <SiteFooter compactTransit />
    </main>
  );
}
