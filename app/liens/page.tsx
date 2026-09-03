import type { Metadata } from "next";
import { betaOnlyRobots } from "../../lib/deployment-mode";
import { jungleLocalIdentity as identity } from "../../lib/jungle-local-identity";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Les liens du Studio | TIBALDO Jungle",
  description: "Découvrez TIBALDO Jungle et retrouvez le Studio Végétal sur Instagram et Facebook.",
  alternates: { canonical: "https://jungle.tibaldo.fr/liens" },
  robots: betaOnlyRobots ?? { index: false, follow: true },
};

const links = [
  { href: "https://jungle.tibaldo.fr", label: "DÉCOUVRIR LE SITE", detail: "Plantes, conseils & univers du Studio", style: styles.site },
  { href: "https://www.instagram.com/tibaldojungle", label: "INSTAGRAM", detail: "La Jungle au quotidien", style: styles.instagram },
  { href: "https://facebook.com/tibaldojungle", label: "FACEBOOK", detail: "Les nouvelles du Studio", style: styles.facebook },
];

export default function LinksPage() {
  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <header className={styles.identity}>
          {/* Official mark; its accessible name is supplied by the adjacent heading. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/favicon.svg" width={72} height={72} alt="" />
          <p className={styles.eyebrow}>STUDIO VÉGÉTAL · LILLE</p>
          <h1>TIBALDO <span>JUNGLE</span></h1>
          <p className={styles.intro}>Un peu plus de végétal dans votre quotidien.<br />Bienvenue dans la Jungle.</p>
        </header>
        <nav className={styles.links} aria-label="Découvrir et suivre TIBALDO Jungle">
          {links.map((link) => (
            <a key={link.href} href={link.href} className={`${styles.link} ${link.style}`}>
              <span><strong>{link.label}</strong><small>{link.detail}</small></span>
              <span className={styles.arrow} aria-hidden="true">↗</span>
            </a>
          ))}
        </nav>
        <footer className={styles.footer}>
          <div className={styles.contact}>
            <a href={`tel:${identity.phoneE164}`}>APPELER<span>{identity.phoneDisplay}</span></a>
            <a href={`mailto:${identity.email}`}>EMAIL<span>{identity.email}</span></a>
          </div>
          <p>{identity.storeName}<br />{identity.streetAddress}, {identity.postalCode} {identity.city}</p>
        </footer>
      </div>
    </main>
  );
}
