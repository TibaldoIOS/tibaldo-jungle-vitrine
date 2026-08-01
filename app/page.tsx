const Arrow = () => <span aria-hidden="true">↗</span>;

const LeafMark = () => (
  <svg aria-hidden="true" viewBox="0 0 64 64" className="leaf-mark">
    <path d="M51 7C31 8 15 17 10 31 5 45 16 55 29 51 45 46 51 29 51 7Z" />
    <path d="M14 47C22 36 31 27 45 16M25 36c-1-6-1-10 1-15m8 7c5 0 9 1 12 3" />
  </svg>
);

export default function Home() {
  return (
    <main>
      <section className="hero" id="accueil">
        <div className="hero-photo" aria-hidden="true" />
        <div className="hero-shade" aria-hidden="true" />

        <header className="site-header shell">
          <a className="brand" href="#accueil" aria-label="Tibaldo Jungle, accueil">
            <LeafMark />
            <span>
              <strong>TIBALDO</strong>
              <small>JUNGLE · STUDIO VÉGÉTAL</small>
            </span>
          </a>

          <nav aria-label="Navigation principale">
            <a href="#boutique">La boutique</a>
            <a href="#services">Services</a>
            <a href="#ateliers">Ateliers</a>
            <a href="#contact">Contact</a>
          </nav>

          <a className="header-cta" href="#contact">
            Nous trouver <Arrow />
          </a>
        </header>

        <div className="hero-content shell">
          <p className="eyebrow"><span /> Boutique de plantes · Lille</p>
          <h1>Faites entrer<br />le vivant <em>chez vous.</em></h1>
          <p className="hero-copy">
            Plantes d’intérieur, pépites rares et conseils passionnés.<br />
            Une jungle urbaine pensée pour tous, même sans la main verte.
          </p>
          <div className="hero-actions">
            <a className="button button-light" href="#boutique">
              Découvrir la boutique <Arrow />
            </a>
            <a className="text-link" href="#ateliers">Voir les ateliers <span aria-hidden="true">↓</span></a>
          </div>
        </div>

        <div className="hero-bottom shell">
          <div className="opening-note">
            <span className="pulse" />
            <p><strong>Ouverture rentrée 2026</strong><br />Lille · quartier Vauban</p>
          </div>
          <p className="scroll-note">Explorez la jungle <span aria-hidden="true">↓</span></p>
        </div>
      </section>

      <section className="intro shell" id="boutique">
        <p className="section-kicker">Bienvenue dans la jungle</p>
        <h2>Bien plus qu’une boutique de plantes.</h2>
        <p>Un lieu vivant pour choisir, comprendre et prendre soin de vos plantes, au cœur de Lille.</p>
      </section>

      <section className="feature-grid shell" aria-label="L'univers Tibaldo Jungle">
        <article className="feature-card feature-card-large">
          <div className="card-photo photo-selection" aria-hidden="true" />
          <div className="card-caption">
            <span>01</span>
            <div>
              <h3>Une sélection qui a du caractère</h3>
              <p>Des essentiels faciles à vivre aux plantes rares qu’on ne croise pas partout.</p>
            </div>
          </div>
        </article>
        <article className="feature-card">
          <div className="card-photo photo-advice" aria-hidden="true" />
          <div className="card-caption">
            <span>02</span>
            <div>
              <h3>Le bon conseil, simplement</h3>
              <p>Lumière, arrosage, emplacement : repartez avec une plante faite pour votre intérieur.</p>
            </div>
          </div>
        </article>
      </section>

      <section className="services" id="services">
        <div className="shell">
          <div className="section-heading">
            <div>
              <p className="section-kicker">Nos services</p>
              <h2>Faire grandir<br /><em>votre jungle.</em></h2>
            </div>
            <p>Que vous veniez avec une question, un pot vide ou une plante en détresse, on prend le temps de trouver la bonne solution.</p>
          </div>

          <div className="service-list">
            <article>
              <span className="service-number">01</span>
              <div className="service-icon" aria-hidden="true">✦</div>
              <h3>Rempotage</h3>
              <p>Substrat adapté, pot bien choisi et geste propre. Sur place, avec ou sans rendez-vous.</p>
              <a href="#contact" aria-label="En savoir plus sur le rempotage">En savoir plus <Arrow /></a>
            </article>
            <article>
              <span className="service-number">02</span>
              <div className="service-icon" aria-hidden="true">⌁</div>
              <h3>Diagnostic plante</h3>
              <p>Feuilles jaunes, parasites ou croissance à l’arrêt ? On cherche la cause avec vous.</p>
              <a href="#contact" aria-label="En savoir plus sur le diagnostic plante">En savoir plus <Arrow /></a>
            </article>
            <article>
              <span className="service-number">03</span>
              <div className="service-icon" aria-hidden="true">☼</div>
              <h3>Projet végétal</h3>
              <p>Une composition pensée pour votre maison, votre commerce ou votre espace de travail.</p>
              <a href="#contact" aria-label="En savoir plus sur les projets végétaux">En savoir plus <Arrow /></a>
            </article>
          </div>
        </div>
      </section>

      <section className="workshop shell" id="ateliers">
        <div className="workshop-photo" aria-hidden="true">
          <span>Places limitées</span>
        </div>
        <div className="workshop-copy">
          <p className="section-kicker">Les ateliers</p>
          <h2>Les mains dans<br /><em>la terre.</em></h2>
          <p>Des moments conviviaux pour apprendre vraiment : rempotage, bouturage, terrarium et entretien des plantes d’intérieur.</p>
          <ul>
            <li><span>✓</span> Petit groupe et accompagnement personnalisé</li>
            <li><span>✓</span> Matériel et plantes inclus selon l’atelier</li>
            <li><span>✓</span> Accessible aux débutants</li>
          </ul>
          <a className="button button-green" href="#contact">Découvrir le programme <Arrow /></a>
        </div>
      </section>

      <section className="rare-plants">
        <div className="shell rare-heading">
          <div>
            <p className="section-kicker">Nos pépites</p>
            <h2>Un peu rares.<br />Toujours remarquables.</h2>
          </div>
          <p>Des arrivages en petite quantité, sélectionnés pour leurs formes, leurs couleurs et leur singularité.</p>
        </div>
        <div className="plant-strip" aria-label="Exemples de plantes proposées">
          <article>
            <div className="plant-photo photo-anthurium" aria-hidden="true" />
            <p><strong>Anthurium</strong><span>Collection · rare</span></p>
          </article>
          <article>
            <div className="plant-photo photo-monstera" aria-hidden="true" />
            <p><strong>Monstera</strong><span>Graphique · iconique</span></p>
          </article>
          <article>
            <div className="plant-photo photo-alocasia" aria-hidden="true" />
            <p><strong>Alocasia</strong><span>Sculpturale · tropicale</span></p>
          </article>
        </div>
      </section>

      <section className="opening" id="contact">
        <div className="opening-photo" aria-hidden="true" />
        <div className="opening-overlay" aria-hidden="true" />
        <div className="shell opening-content">
          <p className="section-kicker">Bientôt à Lille</p>
          <h2>La jungle<br />prend racine.</h2>
          <p>La boutique Tibaldo Jungle ouvrira ses portes à la rentrée 2026 dans le quartier Vauban.</p>
          <div className="opening-meta">
            <p><span>Adresse</span><strong>Lille · Vauban</strong><small>Localisation précise à venir</small></p>
            <p><span>Ouverture</span><strong>Rentrée 2026</strong><small>Horaires annoncés prochainement</small></p>
          </div>
          <a className="button button-light" href="https://www.instagram.com/" target="_blank" rel="noreferrer">Suivre l’ouverture <Arrow /></a>
        </div>
      </section>

      <footer>
        <div className="shell footer-main">
          <div className="footer-brand">
            <a className="brand" href="#accueil">
              <LeafMark />
              <span><strong>TIBALDO</strong><small>JUNGLE · STUDIO VÉGÉTAL</small></span>
            </a>
            <p>Plantes d’intérieur, plantes rares,<br />ateliers et conseils à Lille.</p>
          </div>
          <div className="footer-links">
            <div><span>Explorer</span><a href="#boutique">La boutique</a><a href="#services">Services</a><a href="#ateliers">Ateliers</a></div>
            <div><span>Nous suivre</span><a href="https://www.instagram.com/" target="_blank" rel="noreferrer">Instagram</a><a href="https://www.facebook.com/" target="_blank" rel="noreferrer">Facebook</a></div>
            <div><span>Venir</span><p>Lille · Vauban<br />Ouverture rentrée 2026</p></div>
          </div>
        </div>
        <div className="shell footer-bottom"><span>© 2026 Tibaldo Jungle</span><span>Studio végétal · Lille</span></div>
      </footer>
    </main>
  );
}
