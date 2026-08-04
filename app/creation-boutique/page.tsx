import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "../ScrollReveal";

const Arrow = () => <span aria-hidden="true">↗</span>;

export const metadata: Metadata = {
  title: "Création de la boutique — Tibaldo Jungle",
  description: "Suivez la création de la boutique Tibaldo Jungle à Lille à travers ses visualisations IA, ses intentions d’aménagement et son mur végétal naturel.",
  alternates: { canonical: "/creation-boutique/" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "/creation-boutique/",
    title: "Création de la boutique Tibaldo Jungle à Lille",
    description:
      "Découvrez les visualisations et les choix d’aménagement du futur Studio Végétal Tibaldo Jungle à Lille.",
    images: ["/boutique-projet-ia.webp"],
  },
};

export default function CreationBoutique() {
  return (
    <main className="project-page">
      <ScrollReveal />

      <section className="project-hero">
        <div className="project-hero-photo" aria-hidden="true" />
        <div className="project-hero-shade" aria-hidden="true" />

        <header className="site-header project-header shell">
          <Link className="brand" href="/" aria-label="Tibaldo Jungle, retour à l’accueil">
            <img
              className="brand-logo"
              src="/tibaldo-jungle-logo.webp"
              alt=""
              width={72}
              height={72}
              style={{ borderRadius: "50%", objectFit: "cover" }}
            />
            <span className="brand-wordmark">
              <strong><span>TIBALDO</span><em>Jungle</em></strong>
              <small>Studio Végétal</small>
              <span className="brand-location">Lille · Nord · France</span>
            </span>
          </Link>

          <nav aria-label="Navigation du projet">
            <Link href="/">Accueil</Link>
            <a href="#vision">La vision</a>
            <a href="#amenagement">L’aménagement</a>
          </nav>

          <Link className="header-cta" href="/#contact">Nous contacter <Arrow /></Link>
        </header>

        <div className="shell project-hero-content">
          <p className="eyebrow"><span /> Projet IA · En cours</p>
          <h1>La boutique<br /><em>prend forme.</em></h1>
          <p>Une première vision de Tibaldo Jungle : un lieu vivant, lumineux et enveloppé de plantes, imaginé au cœur de Lille.</p>
          <a className="button button-light" href="#vision">Découvrir le projet <span aria-hidden="true">↓</span></a>
        </div>

        <div className="shell project-hero-bottom">
          <p><span className="pulse" /><strong>Projet en cours</strong> · Les visuels évolueront avec la création</p>
          <small>Visualisation IA non contractuelle</small>
        </div>
      </section>

      <section className="project-intro shell" id="vision" data-reveal>
        <p className="section-kicker">La vision</p>
        <h2>Créer une boutique<br />qui se vit autant qu’elle se visite.</h2>
        <p>Tibaldo Jungle est imaginée comme une respiration végétale en ville : un espace chaleureux où l’on vient découvrir des plantes singulières, demander conseil, faire rempoter une plante ou simplement trouver l’inspiration.</p>
      </section>

      <section className="project-gallery shell" aria-label="Visualisations de la future boutique">
        <figure className="project-main-visual reveal-scale" data-reveal>
          <img src="/boutique-projet-ia.webp" alt="Visualisation IA de la future boutique Tibaldo Jungle avec un grand mur végétal naturel" />
          <figcaption><span>Vue d’ensemble</span><small>Visualisation IA · version de travail</small></figcaption>
        </figure>

        <div className="project-detail-grid">
          <figure className="reveal-left" data-reveal>
            <div className="project-crop project-crop-wall" role="img" aria-label="Détail de la visualisation IA montrant le mur végétal naturel" />
            <figcaption><span>Le mur vivant</span><small>Une présence végétale forte dès l’entrée</small></figcaption>
          </figure>
          <figure className="reveal-right reveal-delay-1" data-reveal>
            <div className="project-crop project-crop-display" role="img" aria-label="Détail de la visualisation IA montrant le mobilier et la présentation des plantes" />
            <figcaption><span>La mise en scène</span><small>Bois clair, lumière douce et plantes à hauteur de regard</small></figcaption>
          </figure>
        </div>
      </section>

      <section className="project-axes" id="amenagement">
        <div className="shell">
          <div className="project-axes-heading" data-reveal>
            <p className="section-kicker">Les intentions d’aménagement</p>
            <h2>Une jungle pensée<br />dans chaque détail.</h2>
          </div>
          <div className="project-axes-grid">
            <article data-reveal><span>01</span><h3>Mur végétal naturel</h3><p>Un grand mur vivant pour installer immédiatement l’identité du lieu et créer une véritable immersion.</p></article>
            <article className="reveal-delay-1" data-reveal><span>02</span><h3>Circulation fluide</h3><p>Des perspectives dégagées, des îlots bas et suffisamment d’espace pour prendre le temps de regarder.</p></article>
            <article className="reveal-delay-2" data-reveal><span>03</span><h3>Matières chaleureuses</h3><p>Du bois clair, des teintes naturelles et un mobilier simple pour laisser toute la place au végétal.</p></article>
            <article className="reveal-delay-2" data-reveal><span>04</span><h3>Lumière vivante</h3><p>Un éclairage doux et précis pour mettre les feuillages en valeur et accompagner leur croissance.</p></article>
          </div>
        </div>
      </section>

      <section className="project-evolution">
        <div className="shell project-evolution-inner" data-reveal>
          <div>
            <p className="section-kicker">Un projet vivant</p>
            <h2>Cette page grandira<br />avec la boutique.</h2>
          </div>
          <div>
            <p>Nouvelles visualisations, choix des matériaux, avancée du chantier et premières installations végétales : le carnet de création sera enrichi au fil du projet.</p>
            <div className="project-actions">
              <Link className="button button-light" href="/">Retour à l’accueil <Arrow /></Link>
              <a className="project-mail" href="mailto:jungle@tibaldo.fr">jungle@tibaldo.fr</a>
            </div>
          </div>
        </div>
      </section>

      <footer className="project-footer">
        <div className="shell"><span>© 2026 Tibaldo Jungle</span><span>Création de la boutique · Lille</span></div>
      </footer>
    </main>
  );
}
