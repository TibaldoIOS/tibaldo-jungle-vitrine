import ScrollReveal from "./ScrollReveal";

const Arrow = () => <span aria-hidden="true">↗</span>;

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Store", "LocalBusiness"],
      "@id": "https://jungle.tibaldo.fr/#store",
      name: "Tibaldo Jungle — Studio Végétal",
      alternateName: "Tibaldo Jungle",
      url: "https://jungle.tibaldo.fr/",
      logo: "https://jungle.tibaldo.fr/tibaldo-jungle-logo.webp",
      image: "https://jungle.tibaldo.fr/boutique-projet-ia.webp",
      email: "jungle@tibaldo.fr",
      telephone: "+33743727079",
      vatID: "FR94518102603",
      taxID: "51810260300074",
      description:
        "Nouveauté à Lille : Tibaldo Jungle, Studio Végétal et boutique de plantes rares et exotiques. Ouverture le 26 septembre 2026.",
      slogan: "Faites entrer le vivant chez vous.",
      foundingDate: "2026",
      address: {
        "@type": "PostalAddress",
        streetAddress: "3 place de l’Arbonnoise",
        postalCode: "59000",
        addressLocality: "Lille",
        addressRegion: "Hauts-de-France",
        addressCountry: "FR",
      },
      areaServed: [
        { "@type": "City", name: "Lille" },
        { "@type": "AdministrativeArea", name: "Nord" },
      ],
      knowsAbout: [
        "Plantes rares",
        "Plantes exotiques",
        "Plantes d’intérieur",
        "Rempotage",
        "Substrats horticoles",
        "Murs végétaux naturels",
      ],
      sameAs: [
        "https://www.instagram.com/tibaldojungle",
        "https://www.facebook.com/tibaldojungle",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://jungle.tibaldo.fr/#website",
      url: "https://jungle.tibaldo.fr/",
      name: "Tibaldo Jungle — Studio Végétal",
      publisher: { "@id": "https://jungle.tibaldo.fr/#store" },
      inLanguage: "fr-FR",
    },
    {
      "@type": "WebPage",
      "@id": "https://jungle.tibaldo.fr/#webpage",
      url: "https://jungle.tibaldo.fr/",
      name: "Boutique de plantes rares à Lille | Tibaldo Jungle",
      description:
        "Découvrez la nouvelle boutique de plantes rares et exotiques Tibaldo Jungle à Lille.",
      isPartOf: { "@id": "https://jungle.tibaldo.fr/#website" },
      about: { "@id": "https://jungle.tibaldo.fr/#store" },
      dateModified: "2026-08-04",
      inLanguage: "fr-FR",
    },
  ],
};

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ScrollReveal />
      <section className="hero" id="accueil">
        <div className="hero-photo" aria-hidden="true" />
        <div className="hero-shade" aria-hidden="true" />

        <header className="site-header shell">
          <a className="brand" href="#accueil" aria-label="Tibaldo Jungle, accueil">
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
              <span className="brand-location">Lille</span>
            </span>
          </a>

          <nav aria-label="Navigation principale">
            <a href="#boutique">La boutique</a>
            <a href="#studio">Le studio</a>
            <a href="#services">Services</a>
            <a href="#rempotage">Rempotage</a>
            <a href="#substrats">Substrats en vrac</a>
            <a href="/creation-boutique">Le projet</a>
            <a href="#contact">Contact</a>
          </nav>

          <div className="header-actions">
            <div className="header-socials" aria-label="Réseaux sociaux Tibaldo Jungle">
              <a href="https://www.instagram.com/tibaldojungle" target="_blank" rel="noreferrer" aria-label="Instagram Tibaldo Jungle">
                <img src="https://cdn.simpleicons.org/instagram/ffffff" alt="" aria-hidden="true" />
              </a>
              <a href="https://www.facebook.com/tibaldojungle" target="_blank" rel="noreferrer" aria-label="Facebook Tibaldo Jungle">
                <img src="https://cdn.simpleicons.org/facebook/ffffff" alt="" aria-hidden="true" />
              </a>
            </div>
            <a className="header-cta" href="#contact">
              Nous trouver <Arrow />
            </a>
          </div>
        </header>

        <div className="hero-content shell">
          <p className="eyebrow"><span /> Nouvelle boutique · Lille</p>
          <h1 aria-label="Plantes rares et exotiques à Lille">
            <span className="hero-line" aria-hidden="true"><span>Plantes rares</span></span>
            <span className="hero-line" aria-hidden="true"><span>&amp; exotiques <em>à Lille.</em></span></span>
          </h1>
          <p className="hero-copy">
            Tibaldo Jungle est un Studio Végétal né de la passion du vivant.<br />
            Une sélection singulière, des plantes cultivées et de vrais conseils.
          </p>
          <div className="hero-actions">
            <a className="button button-light" href="#boutique">
              Découvrir le studio <Arrow />
            </a>
          </div>
        </div>
      </section>

      <aside className="opening-banner" aria-label="Information inauguration">
        <div className="shell opening-banner-inner">
          <span className="pulse" aria-hidden="true" />
          <p><strong>Ouverture le 26 septembre 2026 à Lille</strong><span aria-hidden="true">—</span> Rempotage offert pour l’inauguration</p>
        </div>
      </aside>

      <section className="intro intro-editorial shell" id="boutique" data-reveal>
        <div className="intro-title">
          <p className="section-kicker">Nouvelle boutique de plantes à Lille</p>
          <h2>Une jungle singulière, née d’une vraie passion pour le vivant.</h2>
        </div>
        <div className="intro-copy">
          <p>
            Tibaldo Jungle ouvrira le 26 septembre 2026 au 3, place de l’Arbonnoise. Cette nouvelle boutique lilloise réunira des plantes d’intérieur, des variétés rares et des espèces exotiques choisies pour leur beauté, leur caractère et leur capacité à s’épanouir chez vous.
          </p>
          <p>
            Ici, pas de sélection impersonnelle : chaque plante est observée, comprise et proposée avec les conseils qui lui correspondent. Que vous cherchiez une première plante facile, un feuillage spectaculaire ou une variété de collection, le Studio Végétal vous aide à trouver le vivant adapté à votre lumière, à votre espace et à votre quotidien.
          </p>
        </div>
      </section>

      <section className="feature-grid shell" aria-label="L'univers Tibaldo Jungle">
        <article className="feature-card feature-card-large reveal-left" data-reveal>
          <div className="card-photo">
            <img data-parallax="18" src="/feature-selection.jpg" alt="Sélection de plantes rares et exotiques en intérieur" width={2000} height={1333} loading="lazy" decoding="async" />
          </div>
          <div className="card-caption">
            <span>01</span>
            <div>
              <h3>Rares, exotiques, surprenantes</h3>
              <p>Des plantes d’intérieur choisies pour leurs feuillages, leurs formes et leur personnalité.</p>
            </div>
          </div>
        </article>
        <article className="feature-card reveal-right reveal-delay-1" data-reveal>
          <div className="card-photo">
            <img data-parallax="14" src="/advice-rempotage.jpg" alt="Plantes d’intérieur accompagnées de conseils personnalisés" width={1200} height={1800} loading="lazy" decoding="async" />
          </div>
          <div className="card-caption">
            <span>02</span>
            <div>
              <h3>Le bon conseil, simplement</h3>
              <p>Lumière, arrosage, emplacement : repartez avec une plante faite pour vivre chez vous.</p>
            </div>
          </div>
        </article>
      </section>

      <section className="studio-story" id="studio">
        <div className="shell studio-story-grid">
          <div className="studio-story-heading" data-reveal>
            <p className="section-kicker">Pourquoi « Studio Végétal » ?</p>
            <h2>Une boutique vivante, portée par un passionné.</h2>
            <p className="studio-signature">Observer · Cultiver · Transmettre</p>
          </div>

          <div className="studio-story-copy" data-reveal>
            <p className="studio-story-lead">
              Derrière Tibaldo Jungle, il y a d’abord une passion personnelle devenue collection, puis culture, multiplication et envie de la partager.
            </p>
            <p>
              Le végétal n’est jamais un simple objet de décoration. Il évolue, réagit à son environnement et raconte une histoire différente dans chaque intérieur. C’est pour cela que Tibaldo Jungle se définit comme un <strong>Studio Végétal</strong> : un lieu où l’on ne se contente pas de vendre des plantes, mais où l’on observe le vivant, expérimente les bons mélanges, accompagne les racines et compose des univers végétaux durables.
            </p>
            <p>
              Cette passion se cultive aussi à Wattignies, où boutures, multiplications et sélections grandissent patiemment. Certaines plantes proposées à Lille seront issues de cette production locale, parfois en très petite quantité. D’autres seront choisies auprès de producteurs pour leurs formes inhabituelles, leurs couleurs ou leur histoire : Anthurium, Alocasia, Monstera, plantes tropicales et pépites de collection.
            </p>
            <p>
              Le Studio est enfin un espace de transmission. Comprendre l’arrosage, lire une feuille, choisir le bon emplacement, rempoter sans abîmer les racines ou créer un substrat adapté : les conseils font partie de l’expérience. L’objectif n’est pas de vous vendre la plante la plus impressionnante, mais celle qui pourra réellement vivre et grandir avec vous.
            </p>
          </div>
        </div>

        <div className="shell studio-values" aria-label="Les engagements du Studio Végétal">
          <article data-reveal><span>01</span><h3>Sélection passionnée</h3><p>Chaque plante est choisie individuellement pour sa qualité, sa singularité et son potentiel. Des variétés accessibles aux plantes de collection, la sélection évolue au fil des arrivages et des saisons.</p></article>
          <article className="reveal-delay-1" data-reveal><span>02</span><h3>Culture locale</h3><p>Une partie de nos plantes est bouturée, multipliée et suivie à Wattignies. Une production locale, réalisée en petites quantités et au rythme naturel du vivant.</p></article>
          <article className="reveal-delay-2" data-reveal><span>03</span><h3>Conseils sincères</h3><p>Nous vous aidons à choisir une plante adaptée à votre lumière, votre espace et votre quotidien. Des conseils simples et honnêtes, sans jargon ni achat inutile.</p></article>
        </div>
      </section>

      <section className="services" id="services">
        <div className="shell">
          <div className="section-heading" data-reveal>
            <div>
              <p className="section-kicker">Nos services</p>
              <h2>Faire grandir<br /><em>votre jungle.</em></h2>
            </div>
            <p>Que vous veniez avec une question, un pot vide ou une plante en détresse, on prend le temps de trouver la bonne solution.</p>
          </div>

          <div className="service-list">
            <article data-reveal>
              <span className="service-number">01</span>
              <div className="service-icon" aria-hidden="true">✦</div>
              <h3>Rempotage</h3>
              <p>Le rempotage est offert avec un terreau simple. Des options adaptées sont disponibles selon votre plante.</p>
              <a href="#rempotage" aria-label="Voir les conditions du rempotage offert">Voir les conditions <Arrow /></a>
            </article>
            <article className="reveal-delay-1" data-reveal>
              <span className="service-number">02</span>
              <div className="service-icon" aria-hidden="true">⌁</div>
              <h3>Diagnostic plante</h3>
              <p>Feuilles jaunes, parasites ou croissance à l’arrêt ? On cherche la cause avec vous.</p>
              <a href="#contact" aria-label="En savoir plus sur le diagnostic plante">En savoir plus <Arrow /></a>
            </article>
            <article className="reveal-delay-2" data-reveal>
              <span className="service-number">03</span>
              <div className="service-icon" aria-hidden="true">☼</div>
              <h3>Murs végétaux naturels</h3>
              <p>Des murs vivants, naturels et sur mesure pour votre maison, votre commerce ou votre espace de travail.</p>
              <a href="#contact" aria-label="Parler de votre projet de mur végétal naturel">Parler de mon projet <Arrow /></a>
            </article>
          </div>
        </div>
      </section>

      <section className="workshop shell" id="rempotage">
        <div className="workshop-photo reveal-left" data-reveal>
          <img data-parallax="18" src="/advice-rempotage.jpg" alt="Rempotage d’une plante au Studio Végétal" width={1200} height={1800} loading="lazy" decoding="async" />
          <span>Service gratuit</span>
        </div>
        <div className="workshop-copy reveal-right reveal-delay-1" data-reveal>
          <p className="section-kicker">Le service rempotage</p>
          <h2>Votre rempotage,<br /><em>c’est offert.</em></h2>
          <p>Apportez votre plante ou choisissez-la en boutique : nous nous occupons du rempotage avec vous.</p>
          <ul>
            <li><span>✓</span> Rempotage gratuit avec un terreau simple</li>
            <li><span>＋</span> Mélange de substrats adapté proposé à la vente</li>
            <li><span>＋</span> Pot plus grand disponible à l’achat si nécessaire</li>
            <li><span>♥</span> Cache-pot plastique offert avec le service</li>
          </ul>
          <a className="button button-green" href="#contact">Nous confier votre plante <Arrow /></a>
        </div>
      </section>

      <section className="substrates" id="substrats">
        <div className="shell">
          <div className="substrate-heading" data-reveal>
            <div>
              <p className="section-kicker">Substrats en vrac</p>
              <h2>Le bon mélange,<br />dans la bonne quantité.</h2>
            </div>
            <p>Achetez seulement ce dont vous avez besoin et composez un substrat adapté à votre plante, avec nos conseils sur place.</p>
          </div>

          <div className="substrate-grid">
            <article data-reveal>
              <span>01</span>
              <h3>Pour aérer</h3>
              <p>Perlite, écorces et composants légers pour laisser respirer les racines.</p>
            </article>
            <article className="reveal-delay-1" data-reveal>
              <span>02</span>
              <h3>Pour drainer</h3>
              <p>Pouzzolane et éléments minéraux pour limiter l’excès d’eau.</p>
            </article>
            <article className="reveal-delay-2" data-reveal>
              <span>03</span>
              <h3>Pour nourrir</h3>
              <p>Terreaux et matières organiques à doser selon les besoins de chaque plante.</p>
            </article>
          </div>

          <div className="substrate-note" data-reveal>
            <strong>Vente au détail et en vrac</strong>
            <span>Quantité au choix · conseils de dosage · mélange personnalisé possible</span>
          </div>
        </div>
      </section>

      <section className="rare-plants">
        <div className="shell rare-heading" data-reveal>
          <div>
            <p className="section-kicker">Plantes rares & exotiques à Lille</p>
            <h2>Des espèces qui racontent autre chose.</h2>
          </div>
          <p>Anthurium, Alocasia, Monstera et bien d’autres : une sélection évolutive de plantes tropicales et de variétés de collection, choisies pour leurs formes, leurs couleurs et leur singularité. Certaines pépites pourront aussi être recherchées sur commande.</p>
        </div>
        <div className="plant-strip" aria-label="Exemples de plantes proposées">
          <article className="reveal-scale" data-reveal>
            <div className="plant-photo"><img data-parallax="12" src="/plant-anthurium.jpg" alt="Anthurium aux feuilles nervurées" width={900} height={675} loading="lazy" decoding="async" /></div>
            <p><strong>Anthurium</strong><span>Collection · rare</span></p>
          </article>
          <article className="reveal-scale reveal-delay-1" data-reveal>
            <div className="plant-photo"><img data-parallax="12" src="/plant-monstera.jpg" alt="Monstera au feuillage graphique" width={900} height={1125} loading="lazy" decoding="async" /></div>
            <p><strong>Monstera</strong><span>Graphique · iconique</span></p>
          </article>
          <article className="reveal-scale reveal-delay-2" data-reveal>
            <div className="plant-photo"><img data-parallax="12" src="/plant-alocasia.jpg" alt="Alocasia tropicale sculpturale" width={900} height={1125} loading="lazy" decoding="async" /></div>
            <p><strong>Alocasia</strong><span>Sculpturale · tropicale</span></p>
          </article>
        </div>

        <div className="shell nursery-story">
          <div className="nursery-title reveal-left" data-reveal>
            <p className="section-kicker">Notre pépinière · Wattignies</p>
            <h3>Nous cultivons<br />aussi l’inattendu.</h3>
          </div>
          <div className="nursery-copy reveal-right reveal-delay-1" data-reveal>
            <p>À la pépinière de Wattignies, nous travaillons nos propres croisements et suivons actuellement plusieurs créations végétales en cours.</p>
            <p>Boutures, multiplications et sélections patientes nous permettent de proposer des plantes singulières, cultivées localement et parfois disponibles en très petite quantité.</p>
            <a href="mailto:jungle@tibaldo.fr?subject=Recherche%20d%E2%80%99une%20vari%C3%A9t%C3%A9">Rechercher une variété sur commande <Arrow /></a>
          </div>
        </div>
      </section>

      <section className="visit-guide">
        <div className="shell visit-guide-heading" data-reveal>
          <p className="section-kicker">Votre future adresse végétale</p>
          <h2>Une boutique de plantes pensée pour découvrir, apprendre et faire grandir.</h2>
          <p>
            Tibaldo Jungle s’adresse aux collectionneurs comme aux personnes qui pensent ne pas avoir la main verte. Chaque visite commence par votre envie, mais aussi par les conditions réelles de votre intérieur.
          </p>
        </div>
        <div className="shell visit-guide-grid">
          <article data-reveal>
            <span>Choisir</span>
            <h3>Trouver la plante qui vous correspond</h3>
            <p>
              Une belle plante doit aussi être une plante bien placée. Exposition, espace disponible, présence d’animaux, rythme d’arrosage : ces éléments permettent de vous orienter vers une espèce adaptée, des plantes robustes aux variétés tropicales plus exigeantes.
            </p>
          </article>
          <article className="reveal-delay-1" data-reveal>
            <span>Comprendre</span>
            <h3>Repartir avec des conseils utiles</h3>
            <p>
              Chaque plante possède son langage. Feuilles qui jaunissent, croissance ralentie, manque de lumière ou excès d’eau : le Studio vous apprend à reconnaître les signaux importants et à adopter des gestes simples pour entretenir votre jungle durablement.
            </p>
          </article>
          <article className="reveal-delay-2" data-reveal>
            <span>Accompagner</span>
            <h3>Rempotage et substrats sur mesure</h3>
            <p>
              Apportez votre plante ou choisissez-la sur place. Le rempotage avec terreau simple est offert et des mélanges plus techniques peuvent être composés selon les racines : drainage, aération et nutrition, avec des substrats disponibles dans la quantité réellement nécessaire.
            </p>
          </article>
        </div>
        <div className="shell visit-guide-cta" data-reveal>
          <p><strong>Ouverture le 26 septembre 2026</strong><span>3 place de l’Arbonnoise · Lille</span></p>
          <a className="button button-green" href="#contact">Suivre l’ouverture <Arrow /></a>
        </div>
      </section>

      <section className="project-teaser">
        <div className="project-teaser-photo" data-parallax="22" aria-hidden="true" />
        <div className="project-teaser-shade" aria-hidden="true" />
        <div className="shell project-teaser-content" data-reveal>
          <p className="section-kicker">Création de la boutique · Projet IA</p>
          <h2>Imaginez avec nous<br />la future jungle.</h2>
          <p>Mur végétal, circulation, mobilier et mise en scène des plantes : découvrez les premières visualisations du lieu en cours de création.</p>
          <a className="button button-light" href="/creation-boutique">Voir la création de la boutique <Arrow /></a>
        </div>
      </section>

      <section className="opening" id="contact">
        <div className="opening-photo" data-parallax="18" aria-hidden="true" />
        <div className="opening-overlay" aria-hidden="true" />
        <div className="shell opening-content" data-reveal>
          <p className="section-kicker">Ouverture le 26 septembre 2026</p>
          <h2>La nouvelle jungle<br />lilloise prend racine.</h2>
          <p>Tibaldo Jungle, nouvelle boutique de plantes rares et exotiques à Lille, ouvrira au 3, place de l’Arbonnoise. Le Studio Végétal a trouvé sa cachette… mais sa porte reste encore dissimulée sous les feuillages.</p>
          <div className="opening-meta">
            <p><span>Adresse</span><strong>3 place de l’Arbonnoise</strong><small>59000 Lille</small></p>
            <p><span>Horaires</span><strong>Mardi–samedi · 10h–19h</strong><small>Dimanche · 10h–13h</small></p>
            <p><span>Contact</span><a href="mailto:jungle@tibaldo.fr">jungle@tibaldo.fr</a><small><a href="tel:+33743727079">07 43 72 70 79</a></small></p>
          </div>
          <div className="opening-socials" aria-label="Réseaux sociaux Tibaldo Jungle">
            <a className="social-button social-button-light" href="https://www.instagram.com/tibaldojungle" target="_blank" rel="noreferrer">
              <img src="https://cdn.simpleicons.org/instagram/153b2c" alt="" aria-hidden="true" />
              Instagram <Arrow />
            </a>
            <a className="social-button social-button-outline" href="https://www.facebook.com/tibaldojungle" target="_blank" rel="noreferrer">
              <img src="https://cdn.simpleicons.org/facebook/ffffff" alt="" aria-hidden="true" />
              Facebook <Arrow />
            </a>
          </div>
        </div>
      </section>

      <footer>
        <div className="shell footer-main" data-reveal>
          <div className="footer-brand">
            <a className="brand footer-brand-mark" href="#accueil" aria-label="Tibaldo Jungle, retour en haut">
              <img
                className="brand-logo footer-logo"
                src="/tibaldo-jungle-logo.webp"
                alt=""
                width={120}
                height={120}
                style={{ borderRadius: "50%", objectFit: "cover" }}
              />
              <span className="brand-wordmark">
                <strong><span>TIBALDO</span><em>Jungle</em></strong>
                <small>Studio Végétal</small>
              </span>
            </a>
            <p>Plantes d’intérieur, plantes rares,<br />rempotage et substrats en vrac à Lille.</p>
          </div>
          <div className="footer-links">
            <div><span>Explorer</span><a href="#boutique">La boutique</a><a href="/creation-boutique">Création de la boutique</a><a href="#rempotage">Rempotage offert</a><a href="#substrats">Substrats en vrac</a></div>
            <div className="social-links"><span>Nous suivre</span><a href="https://www.instagram.com/tibaldojungle" target="_blank" rel="noreferrer"><img src="https://cdn.simpleicons.org/instagram/b9c9a7" alt="" aria-hidden="true" />Instagram</a><a href="https://www.facebook.com/tibaldojungle" target="_blank" rel="noreferrer"><img src="https://cdn.simpleicons.org/facebook/b9c9a7" alt="" aria-hidden="true" />Facebook</a></div>
            <div><span>Horaires</span><p>Mardi–samedi<br />10h–19h<br />Dimanche · 10h–13h</p></div>
            <div><span>Venir & écrire</span><p>3 place de l’Arbonnoise<br />59000 Lille<br /><a href="tel:+33743727079">07 43 72 70 79</a></p><a className="footer-email" href="mailto:jungle@tibaldo.fr">jungle@tibaldo.fr</a></div>
          </div>
        </div>
        <div className="shell footer-bottom" data-reveal>
          <span>© 2026 Tibaldo Jungle · Studio Végétal · Lille</span>
          <span>Entrepreneur individuel · SIRET 518 102 603 00074 · TVA FR94 518 102 603 · RNE 518 102 603</span>
        </div>
      </footer>
    </main>
  );
}
