import type { Metadata } from "next";
import ScrollReveal from "../ScrollReveal";
import { Arrow, SiteFooter, SiteHeader } from "../SiteChrome";
import { plantFamilies, plants } from "@/lib/plants/catalog";

export const metadata: Metadata = {
  title: "Plantes rares et d’intérieur à Lille | Tibaldo Jungle",
  description:
    "Explorez les genres et espèces de plantes rares et d’intérieur documentés par Tibaldo Jungle, Studio Végétal à Lille.",
  alternates: { canonical: "/plantes/" },
};

export default function PlantsPage() {
  return (
    <main className="editorial-page">
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

      <nav className="plant-explorer" aria-label="Explorer les plantes">
        <div className="shell plant-explorer-inner">
          <div>
            <span>01 · Genres</span>
            <div className="plant-explorer-links">
              {plantFamilies.map((family) => (
                <a href={`/plantes/${family.slug}`} key={family.slug}>{family.name}</a>
              ))}
            </div>
          </div>
          <div>
            <span>02 · Espèces & variétés</span>
            <div className="plant-explorer-links">
              {plants.map((plant) => (
                <a href={`/plantes/${plant.genre}/${plant.slug}`} key={`${plant.genre}-${plant.slug}`}>
                  {plant.botanicalName}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

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
      <SiteFooter />
    </main>
  );
}
