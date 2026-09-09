import type { Metadata } from "next";
import { jungleLocalIdentity as identity } from "../../lib/jungle-local-identity";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Les liens du Studio | TIBALDO Jungle",
  description: "Découvrez TIBALDO Jungle, suivez le Studio Végétal et contactez-nous à Lille.",
  alternates: { canonical: "https://jungle.tibaldo.fr/liens" },
  robots: { index: false, follow: true },
  openGraph: { title: "Les liens du Studio | TIBALDO Jungle", description: "La Jungle, ses nouvelles et le Studio Végétal à Lille.", url: "https://jungle.tibaldo.fr/liens", type: "website", images: [{ url: "/favicon.png", width: 192, height: 192, alt: "TIBALDO Jungle" }] },
  twitter: { card: "summary", title: "Les liens du Studio | TIBALDO Jungle", images: ["/favicon.png"] },
};

const links = [
  { href: "https://jungle.tibaldo.fr", label: "DÉCOUVRIR LE SITE", detail: "Plantes, conseils & univers du Studio", tone: styles.site },
  { href: "https://www.instagram.com/tibaldojungle", label: "INSTAGRAM", detail: "La Jungle au quotidien", tone: styles.instagram },
  { href: "https://facebook.com/tibaldojungle", label: "FACEBOOK", detail: "Les nouvelles du Studio", tone: styles.facebook },
];

export default function LinksPage() {
  return <main className={styles.page} data-jungle-links>
    <div className={styles.content}>
      <header className={styles.identity}>
        {/* The adjacent heading supplies the official mark's accessible name. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/favicon.svg" width={64} height={64} alt="" />
        <p className={styles.eyebrow}>STUDIO VÉGÉTAL · LILLE</p>
        <h1>TIBALDO <span>JUNGLE</span></h1>
        <p className={styles.intro}>Un peu plus de végétal dans votre quotidien.<br />Bienvenue dans la Jungle.</p>
      </header>
      <nav className={styles.links} aria-label="Découvrir et suivre TIBALDO Jungle">
        {links.map(link => <a key={link.href} href={link.href} className={`${styles.link} ${link.tone}`}>
          <span><strong>{link.label}</strong><small>{link.detail}</small></span>
          <span className={styles.arrow} aria-hidden="true">↗</span>
        </a>)}
      </nav>
      <footer className={styles.footer}>
        <nav className={styles.contact} aria-label="Contacter le Studio">
          <a href={`tel:${identity.phoneE164}`}>APPELER<span>{identity.phoneDisplay}</span></a>
          <a href={`mailto:${identity.email}`}>EMAIL<span>{identity.email}</span></a>
        </nav>
        <p>{identity.storeName}<br />{identity.streetAddress}<br />{identity.postalCode} {identity.city}<br /><span>Métro Cormontaigne</span></p>
      </footer>
    </div>
  </main>;
}
