import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "./ScrollReveal";
import { Arrow, SiteFooter, SiteHeader } from "./SiteChrome";
import { plantFamilies } from "@/lib/plants/catalog";
import { substrates } from "./substrats/data";
import HomeExperience from "./HomeExperience";
import { shopUrl } from "@/lib/environment";
import { jungleLocalIdentity, jungleOrganizationStructuredData, jungleStoreStructuredData } from "@/lib/jungle-local-identity";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      ...jungleStoreStructuredData(),
      legalName: "Pruvost Romain EI",
      vatID: "FR94518102603",
      taxID: "51810260300074",
      description: "Boutique de plantes rares et exotiques, Studio Végétal, rempotage et substrats en vrac à Lille.",
      openingDate: "2026-09-26",
      areaServed: [{ "@type": "City", name: "Lille" }, { "@type": "AdministrativeArea", name: "Nord" }],
      knowsAbout: ["Plantes rares", "Plantes d’intérieur", "Rempotage de plantes", "Substrats horticoles en vrac", "Studio végétal"],
      sameAs: ["https://www.instagram.com/tibaldojungle", "https://www.facebook.com/tibaldojungle"],
    },
    jungleOrganizationStructuredData(),
    { "@type": "WebSite", "@id": "https://jungle.tibaldo.fr/#website", url: jungleLocalIdentity.canonicalStoreUrl, name: jungleLocalIdentity.brandName, alternateName: jungleLocalIdentity.storeName, publisher: { "@id": jungleLocalIdentity.organizationId }, inLanguage: "fr-FR" },
    { "@type": "WebPage", "@id": "https://jungle.tibaldo.fr/#webpage", url: jungleLocalIdentity.canonicalStoreUrl, name: "Boutique de plantes rares à Lille | TIBALDO Jungle", isPartOf: { "@id": "https://jungle.tibaldo.fr/#website" }, about: { "@id": jungleLocalIdentity.storeId }, inLanguage: "fr-FR" },
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
          <h1 aria-label="Plantes rares et tropicales à Lille"><span className="hero-line" aria-hidden="true"><span>Plantes rares</span></span><span className="hero-line" aria-hidden="true"><span>&amp; tropicales <em>à Lille.</em></span></span></h1>
          <p className="hero-copy">Plantes d’intérieur et d’extérieur, espèces exotiques, pépites rares et conseils passionnés.</p>
          <div className="hero-actions"><Link className="button button-light" href="/plantes">Découvrir les plantes <Arrow /></Link><a className="hero-shop-link" data-action="shop" href={shopUrl()}>Voir la boutique en ligne <Arrow /></a></div>
        </div>
      </section>

      <aside className="opening-banner" aria-label="Annonce de la grande ouverture"><div className="opening-banner-glow" aria-hidden="true" /><Link className="shell opening-banner-inner" href="/evenements/ouverture-tibaldo-jungle-lille"><span className="opening-badge"><strong>26</strong><small>SEP</small></span><p><span className="opening-live"><i aria-hidden="true" /> Événement à venir</span><strong>Grande ouverture · 26 septembre 2026 · Lille</strong><span>Rempotage gratuit toute l’année · découvrez le Studio et indiquez votre présence.</span></p><span className="opening-banner-cta">Découvrir l’événement <b aria-hidden="true">↗</b></span><span className="opening-arrow" aria-hidden="true">↓</span></Link></aside>

      {false ? <><section className="home-categories" aria-labelledby="home-categories-title">
        <div className="shell home-categories-heading" data-reveal><div><p className="section-kicker">L’encyclopédie végétale</p><h2 id="home-categories-title">Choisir une famille.<br /><em>Suivre sa curiosité.</em></h2></div><p>Parcourez les plantes par univers botanique avant de lancer une recherche précise.</p></div>
        <div className="home-category-rail" aria-label="Catégories de plantes">
          {plantFamilies.map((family, index) => <Link href={`/plantes/${family.slug}`} key={family.slug}><Image unoptimized src={family.image} alt="" width="720" height="900" loading="lazy" /><span>{String(index + 1).padStart(2, "0")}</span><strong>{family.name}</strong><small>Explorer ↗</small></Link>)}
        </div>
      </section>

      <section className="home-categories home-substrate-categories" aria-labelledby="home-substrate-categories-title">
        <div className="shell home-categories-heading" data-reveal><div><p className="section-kicker">La matériauthèque</p><h2 id="home-substrate-categories-title">Choisir un composant.<br /><em>Comprendre son rôle.</em></h2></div><p>Explorez chaque matière avant de composer un mélange adapté aux racines, à la plante et à votre manière d’arroser.</p></div>
        <div className="home-category-rail home-substrate-rail" aria-label="Sélection des substrats">
          {substrates.map((substrate, index) => <Link href={`/substrats/${substrate.slug}`} key={substrate.slug}><Image unoptimized src={substrate.image} alt={substrate.imageAlt} width="720" height="900" loading="lazy" /><span>{String(index + 1).padStart(2, "0")}</span><strong>{substrate.name}</strong><small>Voir la fiche ↗</small></Link>)}
        </div>
        <div className="shell home-substrate-all"><Link className="text-link" href="/substrats">Explorer tous les substrats <Arrow /></Link></div>
      </section>

      <section className="home-pots shell" data-reveal><div className="home-pots-copy"><p className="section-kicker">Nouvel univers · Arrivages en cours</p><h2>Pots & cache-pots.<br /><em>La forme au service des racines.</em></h2><p>Terre cuite, céramique émaillée, matières minérales et contenants légers : une sélection de pots percés et de cache-pots est en préparation pour accompagner les plantes du Studio.</p><Link className="button button-green" href="/pots-cache-pots-lille">Découvrir la future collection <Arrow /></Link></div><div className="home-pots-art" aria-hidden="true"><span /><span /><span /></div></section>

      <section className="home-intro shell" data-reveal>
        <div><p className="section-kicker">Une nouvelle adresse végétale</p><h2>Choisir moins.<br />Choisir <em>mieux.</em></h2></div>
        <div><p>Tibaldo Jungle réunit à Lille des plantes d’intérieur, des variétés rares et des conseils sincères. Chaque sujet est choisi pour sa qualité, son caractère et sa capacité à s’adapter durablement à votre intérieur. Le Studio Végétal vous aide à sélectionner une plante selon la lumière, l’espace disponible, votre expérience et le temps que vous souhaitez lui consacrer.</p><Link className="text-link" href="/plantes">Découvrir la sélection <Arrow /></Link></div>
      </section>

      <section className="home-editorial shell" aria-label="Découvrir Tibaldo Jungle">
        <article className="home-editorial-card home-plants reveal-left" data-reveal><div className="home-card-image"><Image unoptimized data-parallax="16" src="/collection-plantes-rares-tibaldo-jungle-lille.jpg" alt="Jungle intérieure composée de plantes rares et tropicales sélectionnées par Tibaldo Jungle à Lille" width={1536} height={1152} /></div><div className="home-card-copy"><span>01 · Plantes</span><h2>Rares, exotiques,<br />surprenantes.</h2><p>Des plantes d’intérieur faciles à vivre aux espèces tropicales de collection, la sélection évolue au rythme des arrivages et des cultures du Studio. Découvrez aussi notre encyclopédie végétale : lumière, arrosage, humidité, substrat et conseils d’entretien pour chaque plante.</p><Link className="button button-green" href="/plantes">Découvrir <Arrow /></Link></div></article>
        <article className="home-editorial-card home-substrates reveal-right" data-reveal><div className="home-card-image"><Image unoptimized data-parallax="16" src="/substrats-horticoles-vrac-tibaldo-jungle-lille.jpg" alt="Perlite, vermiculite, sphaigne, écorce de pin et composants de substrat en vrac à Lille" width={1536} height={1152} /></div><div className="home-card-copy"><span>02 · Substrats</span><h2>La matière juste,<br />au bon dosage.</h2><p>Perlite, vermiculite, sphaigne séchée, écorce de pin, billes d’argile et autres composants horticoles sont proposés en vrac à Lille. Nous vous aidons à construire un mélange drainant et adapté aux racines de vos plantes tropicales.</p><Link className="button button-green" href="/substrats">Découvrir <Arrow /></Link></div></article>
      </section>

      <section className="home-services">
        <div className="shell home-services-heading" data-reveal><div><p className="section-kicker">Nos services à Lille</p><h2>Faire grandir<br /><em>votre jungle.</em></h2></div><p>Rempotage, diagnostic, conseil et compositions végétales : le Studio vous accompagne au-delà de l’achat.</p></div>
        <div className="shell home-service-list">
          <Link href="/rempotage" data-reveal><Image unoptimized className="home-service-image" src="/service-rempotage-plantes-lille.jpg" alt="Rempotage d’une plante tropicale au Studio Végétal Tibaldo Jungle à Lille" width={1536} height={1152} /><span className="home-service-shade" aria-hidden="true" /><span className="home-service-number">01 · Geste technique</span><h3>Bar à rempotage</h3><p>Examiner les racines, choisir le bon volume de pot et composer un substrat réellement adapté.</p><Arrow /></Link>
          <Link href="/sos-plantes" className="reveal-delay-1" data-reveal><Image unoptimized className="home-service-image" src="/service-diagnostic-plantes-lille.jpg" alt="Diagnostic d’une feuille de plante tropicale au Studio Végétal Tibaldo Jungle à Lille" width={1536} height={1152} /><span className="home-service-shade" aria-hidden="true" /><span className="home-service-number">02 · Comprendre</span><h3>SOS Plantes</h3><p>Identifier les symptômes, les parasites et les déséquilibres avant d’agir ou de traiter.</p><Arrow /></Link>
          <Link href="/livraison-plantes-lille" className="reveal-delay-2" data-reveal><Image unoptimized className="home-service-image" src="/service-livraison-plantes-lille.jpg" alt="Plantes tropicales préparées pour une livraison à Lille par Tibaldo Jungle" width={1536} height={1152} /><span className="home-service-shade" aria-hidden="true" /><span className="home-service-number">03</span><h3>Livraison végétale</h3><p>Plantes d’intérieur, grands sujets et commandes florales livrés à Lille sur devis.</p><Arrow /></Link>
        </div>
      </section>

      <section className="home-conversion-hub shell" aria-label="Préparer votre visite ou votre projet" data-reveal>
        <header><p className="section-kicker">Comment pouvons-nous vous aider ?</p><h2>Une visite, un diagnostic<br /><em>ou un projet floral.</em></h2></header>
        <div><Link href="/contact" data-action="route"><span>01 · Venir au Studio</span><strong>Adresse, horaires et GPS</strong><Arrow /></Link><Link href="/sos-plantes" data-action="sos"><span>02 · Sauver une plante</span><strong>Demander un diagnostic</strong><Arrow /></Link><Link href="/fleurs#demande-devis" data-action="quote"><span>03 · Préparer un événement</span><strong>Composer une demande de devis</strong><Arrow /></Link><a href={shopUrl()} data-action="shop"><span>04 · Acheter en ligne</span><strong>Voir la boutique</strong><Arrow /></a></div>
      </section>

      <section className="home-values shell" data-reveal>
        <p className="section-kicker">Le Studio Végétal</p><h2>Une passion cultivée<br />entre Lille et Wattignies.</h2>
        <div className="home-value-grid"><p><strong>Sélection passionnée</strong>Chaque plante est choisie individuellement pour sa qualité, sa singularité et son potentiel. Des variétés accessibles aux plantes de collection, la sélection évolue au fil des arrivages et des saisons.</p><p><strong>Culture locale</strong>Une partie de nos plantes est bouturée, multipliée et suivie à Wattignies. Une production locale, réalisée en petites quantités et au rythme naturel du vivant.</p><p><strong>Conseils sincères</strong>Nous vous aidons à choisir une plante adaptée à votre lumière, votre espace et votre quotidien. Des conseils simples et honnêtes, sans jargon ni achat inutile.</p></div>
        <Link className="text-link" href="/services">Découvrir notre approche <Arrow /></Link>
      </section>

      <section className="home-journal shell" data-reveal><div className="home-journal-image"><Image unoptimized src="/projet-boutique-tibaldo-jungle-lille.webp" alt="Création du Studio Végétal Tibaldo Jungle à Lille" width="1200" height="800" loading="lazy" /></div><div><p className="section-kicker">Les coulisses de la Jungle</p><h2>De la première idée<br /><em>jusqu’au jour J.</em></h2><p>Travaux, choix des plantes, mobilier, arrivages et derniers préparatifs : suivez la naissance du Studio Végétal étape par étape.</p><Link className="button button-green" href="/coulisses">Voir le journal <Arrow /></Link></div></section></> : <HomeExperience />}

      <section className="opening" id="contact"><div className="opening-photo" data-parallax="18" aria-hidden="true" /><div className="opening-overlay" aria-hidden="true" /><div className="shell opening-content" data-reveal><p className="section-kicker">Ouverture le 26 septembre 2026</p><h2>La nouvelle jungle<br />lilloise prend racine.</h2><p>Retrouvez la boutique de plantes rares et exotiques {jungleLocalIdentity.brandName} au 3, place de l’Arbonnoise à Lille.</p><div className="opening-meta"><p><span>Adresse</span><strong>{jungleLocalIdentity.streetAddress}</strong><small>{jungleLocalIdentity.postalCode} {jungleLocalIdentity.city}</small></p><p><span>Horaires</span><strong>Mardi · 14h–19h</strong><small>Mercredi–samedi · 10h–19h<br />Dimanche · 10h–13h</small></p><p><span>Contact</span><a href={`mailto:${jungleLocalIdentity.email}`}>{jungleLocalIdentity.email}</a><small><a href={`tel:${jungleLocalIdentity.phoneE164}`}>{jungleLocalIdentity.phoneDisplay}</a></small></p></div><Link className="button button-light" href="/contact">Carte & itinéraire GPS <Arrow /></Link></div></section>
      <SiteFooter />
    </main>
  );
}
