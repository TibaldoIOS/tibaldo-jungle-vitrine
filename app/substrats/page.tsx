import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "../ScrollReveal";
import { Arrow, SiteFooter, SiteHeader } from "../SiteChrome";
import { substrates, substrateProfiles } from "./data";
import OpeningEventLink from "../OpeningEventLink";

export const metadata: Metadata = {
  title: "Substrats en vrac à Lille | Guide Tibaldo Jungle",
  description: "Comprendre terreau, perlite, sphaigne, écorce et zéolite pour composer un substrat adapté à chaque plante d’intérieur.",
  alternates: { canonical: "/substrats" },
  keywords: ["substrats en vrac Lille", "terreau Lille", "perlite Lille", "sphaigne Lille", "écorce de pin Lille", "zéolite Lille"],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "/substrats",
    siteName: "Studio Végétal — Tibaldo Jungle",
    title: "Substrats en vrac à Lille | Guide Tibaldo Jungle",
    description: "Découvrez le rôle de dix composants et apprenez à composer un mélange adapté aux racines de vos plantes d’intérieur.",
    images: [{ url: "/advice-rempotage.jpg", width: 1200, height: 630, alt: "Substrats et rempotage pour plantes d’intérieur à Lille" }],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": "https://jungle.tibaldo.fr/substrats#page",
      name: "Substrats en vrac à Lille",
      url: "https://jungle.tibaldo.fr/substrats",
      description: "Composants horticoles en vrac et conseils de mélange pour plantes d’intérieur à Lille.",
      dateModified: "2026-08-21",
      isPartOf: { "@id": "https://jungle.tibaldo.fr/#website" },
      about: { "@id": "https://jungle.tibaldo.fr/#store" },
      mainEntity: { "@id": "https://jungle.tibaldo.fr/substrats#list" },
      inLanguage: "fr-FR",
    },
    {
      "@type": "ItemList",
      "@id": "https://jungle.tibaldo.fr/substrats#list",
      name: "Composants de substrat et amendements horticoles",
      numberOfItems: substrates.length,
      itemListElement: substrates.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.name })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: "https://jungle.tibaldo.fr/" },
        { "@type": "ListItem", position: 2, name: "Substrats", item: "https://jungle.tibaldo.fr/substrats" },
      ],
    },
  ],
};

export default function SubstratesPage() {
  return (
    <main className="editorial-page substrate-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <ScrollReveal />
      <section className="inner-hero substrate-hero">
        <div className="inner-hero-texture" aria-hidden="true" />
        <div className="inner-hero-shade" aria-hidden="true" />
        <SiteHeader />
        <div className="shell inner-hero-content">
          <p className="eyebrow"><span /> Substrats en vrac · Lille</p>
          <h1><span className="hero-line"><span>La matière juste,</span></span><span className="hero-line"><span>pour des racines <em>vivantes.</em></span></span></h1>
          <p>Terreau, écorces, fibres et minéraux : composez un mélange adapté à votre plante, dans la quantité réellement nécessaire.</p>
          <a className="button button-light" href="#composants">Explorer les composants <Arrow /></a>
        </div>
        <div className="shell inner-hero-index" aria-hidden="true"><span>9 composants</span><span>Vente au détail</span><span>Conseils sur place</span></div>
      </section>

      <section className="substrate-manifesto shell" data-reveal>
        <div><p className="section-kicker">Le substrat n’est pas un détail</p><h2>Tout commence<br />sous la surface.</h2></div>
        <div className="manifesto-copy">
          <p>Une plante peut avoir la bonne lumière et le bon arrosage, mais peiner si ses racines manquent d’air. Chez Tibaldo Jungle, le substrat se pense comme un milieu vivant : il doit soutenir, respirer, drainer et garder juste ce qu’il faut d’humidité.</p>
          <p>Au Studio Végétal de Lille, chaque composant est disponible en vrac. Vous repartez avec le volume utile, une lecture simple de ses propriétés et, si vous le souhaitez, une recette ajustée à votre plante.</p>
        </div>
      </section>

      <section className="substrate-collection" id="composants">
        <div className="shell collection-heading" data-reveal>
          <p className="section-kicker">La matériauthèque végétale</p>
          <h2>Neuf composants.<br /><em>Une infinité d’équilibres.</em></h2>
          <p>Chaque matière joue un rôle précis. Découvrez son toucher, son comportement et les plantes auxquelles elle convient.</p>
        </div>
        <div className="shell material-list">
          {substrates.map((item) => (
            <article className="material-card" id={item.slug} key={item.slug} data-reveal>
              <div className={`material-visual material-${item.tone}`}>
                <img src={item.image} alt={item.imageAlt} loading="lazy" width="900" height="700" />
                <span className="material-number">{item.number}</span>
                <small>Photo matière · Guide Tibaldo</small>
              </div>
              <div className="material-content">
                <div className="material-title"><p>Composant · vente en vrac</p><h3>{item.name}</h3></div>
                <p className="material-description">{item.description}</p>
                <dl>
                  <div><dt>Avantages</dt><dd>{item.benefits.join(" · ")}</dd></div>
                  <div><dt>Usages</dt><dd>{item.uses}</dd></div>
                  <div><dt>Pour quelles plantes ?</dt><dd>{item.plants}</dd></div>
                </dl>
                <div className="material-price"><span>Disponibilité</span><strong>{substrateProfiles[item.slug].statusLabel}</strong><small>Conditionnement et tarif affichés prochainement</small></div><a className="material-discover" href={`/substrats/${item.slug}`}>Découvrir le guide complet <Arrow /></a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mix-guide">
        <div className="shell mix-guide-grid">
          <div data-reveal><p className="section-kicker">Le conseil du Studio</p><h2>Pas de recette universelle.</h2></div>
          <div data-reveal><p>Un Anthurium n’attend pas la même chose qu’une Calathea. La taille du pot, votre manière d’arroser et la lumière changent aussi l’équilibre. Apportez une photo, votre plante ou simplement vos questions : nous vous aiderons à composer un mélange cohérent.</p><a className="button button-light" href="/contact">Demander conseil <Arrow /></a></div>
        </div>
      </section>

      <section className="shell geo-answer substrate-comparison" data-reveal>
        <p className="section-kicker">Réponse directe · Comparatif</p>
        <h2>Perlite ou vermiculite :<br /><em>laquelle utiliser ?</em></h2>
        <p><strong>Choisissez surtout la perlite pour augmenter l’aération et limiter le tassement ; choisissez la vermiculite pour conserver davantage d’eau dans un mélange qui sèche trop vite.</strong> Elles peuvent être combinées en proportions mesurées lorsque les racines ont besoin à la fois d’air et d’une humidité plus régulière.</p>
        <div><article><h3>Perlite</h3><p>Minéral expansé très léger, utile pour créer de la porosité. Une dose excessive peut rendre un petit pot trop léger et accélérer le séchage.</p><Link href="/substrats/perlite">Guide de la perlite →</Link></article><article><h3>Vermiculite</h3><p>Minéral feuilleté rétenteur. Évitez d’en ajouter beaucoup à un terreau déjà compact ou à une plante sensible à l’excès d’eau.</p><Link href="/substrats/vermiculite">Guide de la vermiculite →</Link></article></div>
        <p className="geo-source-note">Conseil horticole : le bon dosage dépend de la plante, du contenant, de la lumière et de votre rythme d’arrosage. Révisé le <time dateTime="2026-08-21">21 août 2026</time>.</p>
      </section>

      <section className="shell geo-answer substrate-comparison" data-reveal>
        <p className="section-kicker">Réponse directe · Comparatif</p>
        <h2>Sphaigne ou coco :<br /><em>quel support choisir ?</em></h2>
        <p><strong>Choisissez la sphaigne pour entourer une bouture, une marcotte ou de jeunes racines avec une forte réserve d’humidité ; choisissez les chips de coco pour structurer durablement un mélange et conserver davantage de poches d’air.</strong> Aucune des deux ne remplace à elle seule un substrat complet ni une conduite d’arrosage adaptée.</p>
        <div><article><h3>Sphaigne séchée</h3><p>Réhydratée puis essorée, elle retient beaucoup d’eau tout en restant aérée si elle n’est pas tassée. Elle convient aux propagations surveillées, mais peut rester trop humide dans un contenant peu ventilé.</p><Link href="/substrats/sphaigne-sechee">Guide de la sphaigne →</Link></article><article><h3>Chips de coco</h3><p>Leur structure grossière ouvre les mélanges pour racines épaisses. Elles retiennent une part d’humidité, doivent être rincées si leur préparation est inconnue et demandent une nutrition adaptée.</p><Link href="/substrats/chips-coco">Guide des chips de coco →</Link></article></div>
        <p className="geo-source-note">Conseil horticole : pour une propagation, surveillez directement l’humidité ; dans un pot durable, raisonnez la structure du mélange entier. Révisé le <time dateTime="2026-08-21">21 août 2026</time>.</p>
      </section>

      <section className="cross-links shell" data-reveal>
        <p className="section-kicker">Continuer l’exploration</p>
        <div className="cross-link-grid">
          <Link href="/rempotage"><span>Service</span><strong>Faire rempoter<br />une plante</strong><Arrow /></Link>
          <Link href="/plantes"><span>La sélection</span><strong>Découvrir<br />nos plantes</strong><Arrow /></Link>
          <Link href="/contact"><span>À Lille</span><strong>Venir au<br />Studio Végétal</strong><Arrow /></Link>
        </div>
      </section>
      <nav className="shell flower-service-link" data-reveal>
        <a href="/substrats-en-vrac-lille">Acheter des substrats en vrac à Lille <span>↗</span></a>
        <a href="/pots-cache-pots-lille">Choisir un pot ou un cache-pot <span>↗</span></a>
      </nav>
      <OpeningEventLink />
      <SiteFooter />
    </main>
  );
}
