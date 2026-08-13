import ScrollReveal from "./ScrollReveal";
import { Arrow, SiteFooter, SiteHeader } from "./SiteChrome";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Florist", "Store", "LocalBusiness"],
      "@id": "https://jungle.tibaldo.fr/#store",
      name: "Studio Végétal — Tibaldo Jungle",
      alternateName: "Tibaldo Jungle",
      legalName: "Pruvost Romain EI",
      url: "https://jungle.tibaldo.fr/",
      logo: "https://jungle.tibaldo.fr/tibaldo-jungle-logo.webp",
      image: "https://jungle.tibaldo.fr/projet-boutique-tibaldo-jungle-lille.webp",
      email: "jungle@tibaldo.fr",
      telephone: "+33743727079",
      vatID: "FR94518102603",
      taxID: "51810260300074",
      description: "Boutique de plantes rares et exotiques, Studio Végétal, rempotage et substrats en vrac à Lille.",
      openingDate: "2026-09-26",
      address: { "@type": "PostalAddress", streetAddress: "3 place de l’Arbonnoise", postalCode: "59000", addressLocality: "Lille", addressRegion: "Hauts-de-France", addressCountry: "FR" },
      areaServed: [{ "@type": "City", name: "Lille" }, { "@type": "AdministrativeArea", name: "Nord" }],
      knowsAbout: ["Plantes rares", "Plantes d’intérieur", "Rempotage de plantes", "Substrats horticoles en vrac", "Studio végétal"],
      sameAs: ["https://www.instagram.com/tibaldojungle", "https://www.facebook.com/tibaldojungle"],
    },
    { "@type": "WebSite", "@id": "https://jungle.tibaldo.fr/#website", url: "https://jungle.tibaldo.fr/", name: "Studio Végétal — Tibaldo Jungle", publisher: { "@id": "https://jungle.tibaldo.fr/#store" }, inLanguage: "fr-FR" },
    { "@type": "WebPage", "@id": "https://jungle.tibaldo.fr/#webpage", url: "https://jungle.tibaldo.fr/", name: "Boutique de plantes rares à Lille | Tibaldo Jungle", isPartOf: { "@id": "https://jungle.tibaldo.fr/#website" }, about: { "@id": "https://jungle.tibaldo.fr/#store" }, inLanguage: "fr-FR" },
  ],
};

export default function Home() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <ScrollReveal />
      <section className="hero" id="accueil">
        <div className="hero-photo" aria-hidden="true" /><div className="hero-shade" aria-hidden="true" />
        <SiteHeader />
        <div className="hero-content shell">
          <p className="eyebrow"><span /> Nouvelle boutique · Lille</p>
          <h1 aria-label="Plantes rares et exotiques à Lille"><span className="hero-line" aria-hidden="true"><span>Plantes rares</span></span><span className="hero-line" aria-hidden="true"><span>&amp; exotiques <em>à Lille.</em></span></span></h1>
          <p className="hero-copy">Studio Végétal Tibaldo Jungle réunit à Lille plantes rares, culture locale et conseils sincères.</p>
          <div className="hero-actions"><a className="button button-light" href="/plantes">Découvrir les plantes <Arrow /></a><a className="hero-shop-link" data-action="shop" href="https://shop.tibaldo.fr">Voir la boutique en ligne <Arrow /></a></div>
        </div>
      </section>

      <aside className="opening-banner" aria-label="Annonce de la grande ouverture"><div className="opening-banner-glow" aria-hidden="true" /><a className="shell opening-banner-inner" href="/evenements/ouverture-tibaldo-jungle-lille"><span className="opening-badge"><strong>26</strong><small>SEP</small></span><p><span className="opening-live"><i aria-hidden="true" /> Événement à venir</span><strong>Grande ouverture Tibaldo Jungle · Lille</strong><span>Découvrez le Studio Végétal et indiquez votre présence.</span></p><span className="opening-banner-cta">Découvrir l’événement <b aria-hidden="true">↗</b></span><span className="opening-arrow" aria-hidden="true">↓</span></a></aside>

      <section className="home-intro shell" data-reveal>
        <div><p className="section-kicker">Une nouvelle adresse végétale</p><h2>Choisir moins.<br />Choisir <em>mieux.</em></h2></div>
        <div><p>Tibaldo Jungle réunit à Lille des plantes d’intérieur, des variétés rares et des conseils sincères. Chaque sujet est choisi pour sa qualité, son caractère et sa capacité à s’adapter durablement à votre intérieur. Le Studio Végétal vous aide à sélectionner une plante selon la lumière, l’espace disponible, votre expérience et le temps que vous souhaitez lui consacrer.</p><a className="text-link" href="/plantes">Découvrir la sélection <Arrow /></a></div>
      </section>

      <section className="home-editorial shell" aria-label="Découvrir Tibaldo Jungle">
        <article className="home-editorial-card home-plants reveal-left" data-reveal><div className="home-card-image"><img data-parallax="16" src="/feature-selection.jpg" alt="Collection de plantes rares et exotiques sélectionnées par Tibaldo Jungle à Lille" width={2000} height={1333} /></div><div className="home-card-copy"><span>01 · Plantes</span><h2>Rares, exotiques,<br />surprenantes.</h2><p>Des plantes d’intérieur faciles à vivre aux espèces tropicales de collection, la sélection évolue au rythme des arrivages et des cultures du Studio. Découvrez aussi notre encyclopédie végétale : lumière, arrosage, humidité, substrat et conseils d’entretien pour chaque plante.</p><a className="button button-green" href="/plantes">Découvrir <Arrow /></a></div></article>
        <article className="home-editorial-card home-substrates reveal-right" data-reveal><div className="home-card-image"><img data-parallax="16" src="/advice-rempotage.jpg" alt="Préparation d’un substrat et rempotage d’une plante au Studio Végétal Tibaldo Jungle à Lille" width={1200} height={1800} /></div><div className="home-card-copy"><span>02 · Substrats</span><h2>La matière juste,<br />au bon dosage.</h2><p>Perlite, vermiculite, sphaigne séchée, écorce de pin, billes d’argile et autres composants horticoles sont proposés en vrac à Lille. Nous vous aidons à construire un mélange drainant et adapté aux racines de vos plantes tropicales.</p><a className="button button-green" href="/substrats">Découvrir <Arrow /></a></div></article>
      </section>

      <section className="home-services">
        <div className="shell home-services-heading" data-reveal><div><p className="section-kicker">Nos services à Lille</p><h2>Faire grandir<br /><em>votre jungle.</em></h2></div><p>Rempotage, diagnostic, conseil et compositions végétales : le Studio vous accompagne au-delà de l’achat.</p></div>
        <div className="shell home-service-list">
          <a href="/rempotage" data-reveal><img className="home-service-image" src="/service-rempotage-plantes-lille.jpg" alt="Rempotage d’une plante tropicale au Studio Végétal Tibaldo Jungle à Lille" width={1536} height={1152} /><span className="home-service-shade" aria-hidden="true" /><span className="home-service-number">01</span><h3>SOS Rempotage</h3><p>Diagnostic, racines, pot et substrat : trouvez la bonne solution pour votre plante.</p><Arrow /></a>
          <a href="/services" className="reveal-delay-1" data-reveal><img className="home-service-image" src="/service-diagnostic-plantes-lille.jpg" alt="Diagnostic d’une feuille de plante tropicale au Studio Végétal Tibaldo Jungle à Lille" width={1536} height={1152} /><span className="home-service-shade" aria-hidden="true" /><span className="home-service-number">02</span><h3>Diagnostic</h3><p>Comprendre une plante qui jaunit, ralentit ou semble en difficulté.</p><Arrow /></a>
          <a href="/livraison-plantes-lille" className="reveal-delay-2" data-reveal><img className="home-service-image" src="/service-livraison-plantes-lille.jpg" alt="Plantes tropicales préparées pour une livraison à Lille par Tibaldo Jungle" width={1536} height={1152} /><span className="home-service-shade" aria-hidden="true" /><span className="home-service-number">03</span><h3>Livraison végétale</h3><p>Plantes d’intérieur, grands sujets et commandes florales livrés à Lille sur devis.</p><Arrow /></a>
        </div>
      </section>

      <section className="home-conversion-hub shell" aria-label="Préparer votre visite ou votre projet" data-reveal>
        <header><p className="section-kicker">Comment pouvons-nous vous aider ?</p><h2>Une visite, un diagnostic<br /><em>ou un projet floral.</em></h2></header>
        <div><a href="/contact" data-action="route"><span>01 · Venir au Studio</span><strong>Adresse, horaires et GPS</strong><Arrow /></a><a href="/diagnostic-plante-lille" data-action="sos"><span>02 · Sauver une plante</span><strong>Demander un diagnostic</strong><Arrow /></a><a href="/fleurs#demande-devis" data-action="quote"><span>03 · Préparer un événement</span><strong>Composer une demande de devis</strong><Arrow /></a><a href="https://shop.tibaldo.fr" data-action="shop"><span>04 · Acheter en ligne</span><strong>Voir la boutique</strong><Arrow /></a></div>
      </section>

      <section className="home-values shell" data-reveal>
        <p className="section-kicker">Le Studio Végétal</p><h2>Une passion cultivée<br />entre Lille et Wattignies.</h2>
        <div className="home-value-grid"><p><strong>Sélection passionnée</strong>Chaque plante est choisie individuellement pour sa qualité, sa singularité et son potentiel. Des variétés accessibles aux plantes de collection, la sélection évolue au fil des arrivages et des saisons.</p><p><strong>Culture locale</strong>Une partie de nos plantes est bouturée, multipliée et suivie à Wattignies. Une production locale, réalisée en petites quantités et au rythme naturel du vivant.</p><p><strong>Conseils sincères</strong>Nous vous aidons à choisir une plante adaptée à votre lumière, votre espace et votre quotidien. Des conseils simples et honnêtes, sans jargon ni achat inutile.</p></div>
        <a className="text-link" href="/services">Découvrir notre approche <Arrow /></a>
      </section>

      <section className="opening" id="contact"><div className="opening-photo" data-parallax="18" aria-hidden="true" /><div className="opening-overlay" aria-hidden="true" /><div className="shell opening-content" data-reveal><p className="section-kicker">Ouverture le 26 septembre 2026</p><h2>La nouvelle jungle<br />lilloise prend racine.</h2><p>Retrouvez la boutique de plantes rares et exotiques Tibaldo Jungle au 3, place de l’Arbonnoise à Lille.</p><div className="opening-meta"><p><span>Adresse</span><strong>3 place de l’Arbonnoise</strong><small>59000 Lille</small></p><p><span>Horaires</span><strong>Mardi–samedi · 10h–19h</strong><small>Dimanche · 10h–13h</small></p><p><span>Contact</span><a href="mailto:jungle@tibaldo.fr">jungle@tibaldo.fr</a><small><a href="tel:+33743727079">07 43 72 70 79</a></small></p></div><a className="button button-light" href="/contact">Carte & itinéraire GPS <Arrow /></a></div></section>
      <SiteFooter />
    </main>
  );
}
