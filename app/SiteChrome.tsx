const Arrow = () => <span aria-hidden="true">↗</span>;
const InstagramIcon = () => <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4.25" /><circle className="social-icon-dot" cx="17.4" cy="6.8" r="1" /></svg>;
const FacebookIcon = () => <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.7 21v-8h2.8l.42-3.2H13.7V7.75c0-.93.26-1.56 1.62-1.56H17V3.33c-.3-.04-1.3-.13-2.48-.13-2.46 0-4.15 1.5-4.15 4.27V9.8H7.6V13h2.77v8h3.33Z" /></svg>;

export function SiteHeader({ light = false }: { light?: boolean }) {
  return (
    <header className={`site-header shell${light ? " site-header-light" : ""}`}>
      <a className="brand" href="/" aria-label="Studio Végétal Tibaldo Jungle, accueil">
        <img className="brand-logo" src="/tibaldo-jungle-logo.webp" alt="Studio Végétal Tibaldo Jungle à Lille" width={72} height={72} />
        <span className="brand-wordmark">
          <strong><span>STUDIO VÉGÉTAL</span></strong>
          <small>Tibaldo Jungle</small>
          <span className="brand-location">Lille</span>
        </span>
      </a>

      <nav className="desktop-nav" aria-label="Navigation principale">
        <a href="/plantes">Plantes</a>
        <a href="/substrats">Substrats</a>
        <a href="/pots-cache-pots-lille">Pots</a>
        <a href="/sos-plantes">SOS Plantes</a>
        <a href="/rempotage">Rempotage</a>
        <a href="/conseils">Conseils</a>
        <a href="/services">Services</a>
        <a className="nav-shop" href="https://shop.tibaldo.fr">Boutique ↗</a>
      </nav>

      <details className="mobile-menu">
        <summary aria-label="Ouvrir le menu principal"><span className="menu-glyph" aria-hidden="true"><i /><i /></span><b>Menu</b></summary>
        <div className="mobile-menu-panel" aria-label="Navigation mobile">
          <a href="/"><span>01</span>Accueil</a>
          <a href="/plantes"><span>02</span>Plantes</a>
          <a href="/conseils"><span>03</span>Conseils</a>
          <a href="/sos-plantes"><span>04</span>SOS Plantes</a>
          <a href="/fleurs"><span>05</span>Fleurs sur commande</a>
          <a href="/substrats"><span>06</span>Substrats</a>
          <a href="/pots-cache-pots-lille"><span>07</span>Pots & cache-pots</a>
          <a href="/rempotage"><span>08</span>Bar à rempotage</a>
          <a href="/evenements"><span>09</span>Événements</a>
          <a href="https://shop.tibaldo.fr"><span>10</span>Boutique en ligne</a>
          <a href="/services"><span>11</span>Nos services</a>
          <a href="/coulisses"><span>12</span>Les coulisses</a>
          <a href="/contact"><span>13</span>Contact</a>
          <div className="mobile-menu-socials">
            <span>Suivre la Jungle</span>
            <a href="https://www.instagram.com/tibaldojungle" target="_blank" rel="noreferrer" aria-label="Instagram Tibaldo Jungle"><InstagramIcon /><strong>Instagram</strong></a>
            <a href="https://www.facebook.com/tibaldojungle" target="_blank" rel="noreferrer" aria-label="Facebook Tibaldo Jungle"><FacebookIcon /><strong>Facebook</strong></a>
          </div>
        </div>
      </details>

      <div className="header-actions">
        <div className="header-socials" aria-label="Réseaux sociaux Tibaldo Jungle">
          <a href="https://www.instagram.com/tibaldojungle" target="_blank" rel="noreferrer" aria-label="Instagram Tibaldo Jungle"><InstagramIcon /></a>
          <a href="https://www.facebook.com/tibaldojungle" target="_blank" rel="noreferrer" aria-label="Facebook Tibaldo Jungle"><FacebookIcon /></a>
        </div>
        <a className="header-cta" data-action="route" href="/contact">Nous trouver <Arrow /></a>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer>
      <section className="shell footer-transit" aria-labelledby="footer-transit-title" data-reveal>
        <header><span>Venir sans voiture</span><h2 id="footer-transit-title">Le Studio est à quelques pas<br />de <em>Cormontaigne.</em></h2><p>3 place de l’Arbonnoise · 59000 Lille</p></header>
        <div className="footer-transit-visual">
          <figure><img src="/transports/cormontaigne-1.jpg" alt="Place et accès de la station de métro Cormontaigne à Lille" width="1280" height="960" loading="lazy" /><figcaption><span>Repère photographique réel</span><strong>Place Cormontaigne</strong><small>Accès au métro M2, dans le quartier Vauban-Esquermes.</small></figcaption></figure>
          <div className="footer-transit-routes">
            <article><span>01</span><strong>M2</strong><div><small>Métro · ligne 2</small><h3>Cormontaigne</h3><p>Station située entre Port de Lille et Montebello.</p></div></article>
            <article><span>02</span><strong>L5</strong><div><small>Liane · bus</small><h3>Cormontaigne</h3><p>Arrêt desservi par la Liane 5.</p></div></article>
            <article><span>03</span><strong>CIT</strong><div><small>Citadine de Lille</small><h3>Cormontaigne</h3><p>Desserte de proximité autour du quartier.</p></div></article>
            <article><span>04</span><strong>36 · 37</strong><div><small>V’Lille</small><h3>Cormontaigne · Fulton</h3><p>Stations 36 place Cormontaigne et 37 rue du Bazinghien.</p></div></article>
          </div>
        </div>
        <div className="footer-transit-note"><p>Le réseau bus évolue le 31 août 2026. Vérifiez les horaires avant votre venue.</p><a href="https://www.ilevia.fr/" target="_blank" rel="noreferrer">Calculer mon itinéraire sur Ilévia <Arrow /></a></div>
        <section className="footer-parking" aria-labelledby="footer-parking-title">
          <header>
            <span>Venir en voiture</span>
            <h3 id="footer-parking-title">Stationner autour<br />du <em>Studio.</em></h3>
            <p>Le secteur de la place de l’Arbonnoise apparaît en zone verte sur le plan actuellement publié par la Ville de Lille.</p>
          </header>
          <div className="footer-parking-grid">
            <article><strong>Zone verte</strong><span>En semaine</span><p>Stationnement payant du lundi au vendredi, de 9 h à 19 h.</p></article>
            <article><strong>Gratuit</strong><span>Samedi</span><p>La zone verte est gratuite toute la journée du samedi.</p></article>
            <article><strong>Gratuit</strong><span>Soir & dimanche</span><p>Gratuit de 19 h à 9 h, le dimanche et les jours fériés.</p></article>
            <article><strong>À vérifier</strong><span>Sur place</span><p>Le plan n’indique pas de zone à disque ici. La signalisation présente dans la rue reste toujours prioritaire.</p></article>
          </div>
          <div className="footer-parking-action">
            <p>Plan municipal du stationnement payant et des zones tarifaires.</p>
            <a href="https://www.lille.fr/content/download/335492/3624784/file/Stationnement%2Bpayant%2BLille%2B2025.pdf" target="_blank" rel="noreferrer">Voir le plan officiel de Lille <Arrow /></a>
          </div>
        </section>
      </section>
      <div className="shell footer-main" data-reveal>
        <div className="footer-brand">
          <a className="brand footer-brand-mark" href="/" aria-label="Studio Végétal Tibaldo Jungle, accueil">
            <img className="brand-logo footer-logo" src="/tibaldo-jungle-logo.webp" alt="Studio Végétal Tibaldo Jungle" width={120} height={120} />
            <span className="brand-wordmark"><strong><span>STUDIO VÉGÉTAL</span></strong><small>Tibaldo Jungle</small></span>
          </a>
          <p>Plantes d’intérieur, plantes rares,<br />rempotage et substrats en vrac à Lille.</p>
        </div>
        <div className="footer-links">
          <div><span>Explorer</span><a href="/boutique-plantes-lille">Boutique plantes Lille</a><a href="/plantes">Plantes</a><a href="/conseils">Conseils plantes</a><a href="/sos-plantes">SOS Plantes</a><a href="/rempotage-plantes-lille">Bar à rempotage</a><a href="/fleurs">Catalogue de fleurs</a><a href="/substrats-en-vrac-lille">Substrats en vrac Lille</a><a href="/pots-cache-pots-lille">Pots et cache-pots à Lille</a><a href="/coulisses">Les coulisses</a><a href="/livraison-plantes-lille">Livraison de plantes</a><a href="/fleurs-sur-commande-lille">Fleurs sur commande</a><a href="/bouquets-fleurs-livraison-lille">Bouquets fournisseurs</a><a href="/evenements">Événements</a><a href="/services">Nos services</a></div>
          <div className="social-links"><span>Nous suivre</span><a href="https://www.instagram.com/tibaldojungle" target="_blank" rel="noreferrer">Instagram</a><a href="https://www.facebook.com/tibaldojungle" target="_blank" rel="noreferrer">Facebook</a></div>
          <div><span>Horaires</span><p>Mardi–samedi<br />10h–19h<br />Dimanche · 10h–13h</p></div>
          <div><span>Venir & écrire</span><p>3 place de l’Arbonnoise<br />59000 Lille<br /><a href="tel:+33743727079">07 43 72 70 79</a></p><a className="footer-email" href="mailto:jungle@tibaldo.fr">jungle@tibaldo.fr</a></div>
        </div>
      </div>
      <div className="shell footer-bottom" data-reveal>
        <span>© 2026 Studio Végétal · Tibaldo Jungle · Lille</span>
        <span>Pruvost Romain EI · SIRET 518 102 603 00074 · TVA FR94 518 102 603 · RNE 518 102 603</span>
        <nav className="footer-legal" aria-label="Informations légales"><a className="footer-legal-primary" href="/conditions-generales-de-vente">Consulter les CGV</a><a href="/programme-fidelite">Fidélité</a><a href="/cartes-cadeaux">Cartes cadeaux</a><a href="/politique-confidentialite">Confidentialité</a><a href="/mentions-legales">Mentions légales</a><a href="/credits-images">Crédits photos</a></nav>
      </div>
    </footer>
  );
}

export { Arrow };
