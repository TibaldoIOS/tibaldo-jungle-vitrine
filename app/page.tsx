import type { Metadata } from "next";

const address = "3 place de l’Arbonnoise, 59000 Lille";
const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;

export const metadata: Metadata = {
  title: "Quelque chose pousse par ici | Tibaldo Jungle Lille",
  description:
    "Le Studio Végétal Tibaldo Jungle se prépare à Lille. Ouverture le 26 septembre 2026. L’encyclopédie végétale reste accessible.",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "/",
    siteName: "Studio Végétal — Tibaldo Jungle",
    title: "Quelque chose pousse par ici | Tibaldo Jungle",
    description:
      "Le Studio Végétal Tibaldo Jungle se prépare à Lille. Ouverture le 26 septembre 2026.",
    images: [
      {
        url: "/projet-boutique-tibaldo-jungle-lille.webp",
        width: 1200,
        height: 630,
        alt: "Le Studio Végétal Tibaldo Jungle à Lille se prépare",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Quelque chose pousse par ici | Tibaldo Jungle",
    description:
      "Le Studio Végétal Tibaldo Jungle se prépare à Lille. Ouverture le 26 septembre 2026.",
    images: ["/projet-boutique-tibaldo-jungle-lille.webp"],
  },
};

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
      email: "contact@tibaldo.fr",
      telephone: "+33743727079",
      vatID: "FR94518102603",
      taxID: "51810260300074",
      description:
        "Studio végétal, encyclopédie botanique, plantes rares, rempotage et substrats horticoles à Lille.",
      openingDate: "2026-09-26",
      address: {
        "@type": "PostalAddress",
        streetAddress: "3 place de l’Arbonnoise",
        postalCode: "59000",
        addressLocality: "Lille",
        addressRegion: "Hauts-de-France",
        addressCountry: "FR",
      },
      areaServed: [{ "@type": "City", name: "Lille" }],
      sameAs: ["https://www.instagram.com/tibaldojungle"],
    },
    {
      "@type": "WebSite",
      "@id": "https://jungle.tibaldo.fr/#website",
      url: "https://jungle.tibaldo.fr/",
      name: "Studio Végétal — Tibaldo Jungle",
      publisher: { "@id": "https://jungle.tibaldo.fr/#store" },
      inLanguage: "fr-FR",
    },
    {
      "@type": "WebPage",
      "@id": "https://jungle.tibaldo.fr/#webpage",
      url: "https://jungle.tibaldo.fr/",
      name: "Quelque chose pousse par ici | Tibaldo Jungle Lille",
      description:
        "Le Studio Végétal Tibaldo Jungle se prépare à Lille. Ouverture le 26 septembre 2026.",
      isPartOf: { "@id": "https://jungle.tibaldo.fr/#website" },
      about: { "@id": "https://jungle.tibaldo.fr/#store" },
      inLanguage: "fr-FR",
    },
  ],
};

export default function Home() {
  return (
    <main className="homepage-pause-v1" id="pause-top">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <header className="pause-home__header" aria-label="Tibaldo Jungle">
        <a className="pause-home__brand" href="#pause-top" aria-label="Tibaldo Jungle, retour en haut">
          {/* Logo propriétaire local, servi directement sans transformation distante. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/tibaldo-jungle-logo.webp" alt="" width="72" height="72" />
          <span>
            <strong>TIBALDO JUNGLE</strong>
            <small>Studio végétal · Lille</small>
          </span>
        </a>
      </header>

      <section className="pause-home__hero" aria-labelledby="pause-title">
        <div className="pause-home__botanical" aria-hidden="true">
          <i className="pause-home__stem" />
          <i className="pause-home__leaf pause-home__leaf--one" />
          <i className="pause-home__leaf pause-home__leaf--two" />
          <i className="pause-home__leaf pause-home__leaf--three" />
          <i className="pause-home__leaf pause-home__leaf--four" />
        </div>

        <div className="pause-home__hero-copy">
          <p className="pause-home__eyebrow"><span /> Une nouvelle adresse végétale à Lille</p>
          <h1 id="pause-title" className="pause-home__title" aria-label="Quelque chose pousse par ici.">
            <span className="pause-home__title-mask">
              <span className="pause-home__title-line pause-home__title-line--one">QUELQUE CHOSE</span>
            </span>
            <span className="pause-home__title-mask">
              <em className="pause-home__title-line pause-home__title-line--grow">POUSSE PAR ICI.</em>
            </span>
          </h1>
          <p className="pause-home__intro">Le Studio Végétal Tibaldo Jungle se prépare.</p>

          <div className="pause-home__opening" aria-label="Ouverture le 26 septembre 2026">
            <span>OUVERTURE</span>
            <strong>26 SEPTEMBRE 2026</strong>
          </div>

          <div className="pause-home__actions">
            <a className="pause-home__button pause-home__button--quiet" href={mapsUrl} target="_blank" rel="noopener noreferrer">
              Nous trouver <ArrowIcon />
            </a>
          </div>
        </div>
      </section>

      <section className="pause-home__essentials" aria-label="Informations essentielles">
        <article>
          <p>ADRESSE</p>
          <address>3 place de l’Arbonnoise<br />59000 Lille</address>
        </article>
        <article>
          <p>CONTACT</p>
          <a href="mailto:contact@tibaldo.fr">contact@tibaldo.fr</a>
          <a className="pause-home__small-link" href="https://www.instagram.com/tibaldojungle" target="_blank" rel="noopener noreferrer">
            Instagram <ArrowIcon />
          </a>
        </article>
        <article>
          <p>BOUTIQUE EN LIGNE</p>
          <a href="https://shop.tibaldo.fr">Bientôt</a>
        </article>
      </section>

      <footer className="pause-home__footer">
        <span>TIBALDO JUNGLE · STUDIO VÉGÉTAL · LILLE</span>
        <span>© 2026</span>
      </footer>
    </main>
  );
}

function ArrowIcon() {
  return (
    <svg className="pause-home__arrow" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
      <path d="M3 13 13 3M6 3h7v7" />
    </svg>
  );
}
