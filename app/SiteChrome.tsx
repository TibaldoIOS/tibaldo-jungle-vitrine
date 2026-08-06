const Arrow = () => <span aria-hidden="true">↗</span>;
const InstagramIcon = () => <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4.25" /><circle className="social-icon-dot" cx="17.4" cy="6.8" r="1" /></svg>;
const FacebookIcon = () => <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.7 21v-8h2.8l.42-3.2H13.7V7.75c0-.93.26-1.56 1.62-1.56H17V3.33c-.3-.04-1.3-.13-2.48-.13-2.46 0-4.15 1.5-4.15 4.27V9.8H7.6V13h2.77v8h3.33Z" /></svg>;

export function SiteHeader({ light = false }: { light?: boolean }) {
  return (
    <header className={`site-header shell${light ? " site-header-light" : ""}`}>
      <a className="brand" href="/" aria-label="Tibaldo Jungle, accueil">
        <img className="brand-logo" src="/tibaldo-jungle-logo.webp" alt="Tibaldo Jungle, Studio Végétal à Lille" width={72} height={72} />
        <span className="brand-wordmark">
          <strong><span>TIBALDO</span><em>Jungle</em></strong>
          <small>Studio Végétal</small>
          <span className="brand-location">Lille</span>
        </span>
      </a>

      <nav aria-label="Navigation principale">
        <a href="/">Accueil</a>
        <a href="/plantes">Plantes</a>
        <a href="/substrats">Substrats</a>
        <a href="/rempotage">Rempotage</a>
        <a href="/services">Nos services</a>
        <a href="/contact">Contact</a>
      </nav>

      <details className="mobile-menu">
        <summary aria-label="Ouvrir le menu principal"><span aria-hidden="true">☰</span><b>Menu</b></summary>
        <div className="mobile-menu-panel" aria-label="Navigation mobile">
          <a href="/"><span>01</span>Accueil</a>
          <a href="/plantes"><span>02</span>Plantes</a>
          <a href="/substrats"><span>03</span>Substrats</a>
          <a href="/rempotage"><span>04</span>Rempotage</a>
          <a href="/services"><span>05</span>Nos services</a>
          <a href="/contact"><span>06</span>Contact</a>
        </div>
      </details>

      <div className="header-actions">
        <div className="header-socials" aria-label="Réseaux sociaux Tibaldo Jungle">
          <a href="https://www.instagram.com/tibaldojungle" target="_blank" rel="noreferrer" aria-label="Instagram Tibaldo Jungle"><InstagramIcon /></a>
          <a href="https://www.facebook.com/tibaldojungle" target="_blank" rel="noreferrer" aria-label="Facebook Tibaldo Jungle"><FacebookIcon /></a>
        </div>
        <a className="header-cta" href="/contact">Nous trouver <Arrow /></a>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer>
      <div className="shell footer-main" data-reveal>
        <div className="footer-brand">
          <a className="brand footer-brand-mark" href="/" aria-label="Tibaldo Jungle, accueil">
            <img className="brand-logo footer-logo" src="/tibaldo-jungle-logo.webp" alt="Tibaldo Jungle" width={120} height={120} />
            <span className="brand-wordmark"><strong><span>TIBALDO</span><em>Jungle</em></strong><small>Studio Végétal</small></span>
          </a>
          <p>Plantes d’intérieur, plantes rares,<br />rempotage et substrats en vrac à Lille.</p>
        </div>
        <div className="footer-links">
          <div><span>Explorer</span><a href="/plantes">Plantes</a><a href="/substrats">Substrats en vrac</a><a href="/rempotage">Rempotage</a><a href="/services">Nos services</a></div>
          <div className="social-links"><span>Nous suivre</span><a href="https://www.instagram.com/tibaldojungle" target="_blank" rel="noreferrer">Instagram</a><a href="https://www.facebook.com/tibaldojungle" target="_blank" rel="noreferrer">Facebook</a></div>
          <div><span>Horaires</span><p>Mardi–samedi<br />10h–19h<br />Dimanche · 10h–13h</p></div>
          <div><span>Venir & écrire</span><p>3 place de l’Arbonnoise<br />59000 Lille<br /><a href="tel:+33743727079">07 43 72 70 79</a></p><a className="footer-email" href="mailto:jungle@tibaldo.fr">jungle@tibaldo.fr</a></div>
        </div>
      </div>
      <div className="shell footer-bottom" data-reveal>
        <span>© 2026 Tibaldo Jungle · Studio Végétal · Lille</span>
        <span>Pruvost Romain EI · SIRET 518 102 603 00074 · TVA FR94 518 102 603 · RNE 518 102 603</span>
      </div>
    </footer>
  );
}

export { Arrow };
