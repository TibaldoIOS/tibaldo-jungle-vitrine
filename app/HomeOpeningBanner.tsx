import Link from "next/link";
import { Arrow } from "./SiteChrome";
import styles from "./HomeOpeningBanner.module.css";

export default function HomeOpeningBanner() {
  return (
    <aside className={styles.banner} aria-labelledby="home-studio-title">
      <div className={`shell ${styles.inner}`}>
        <div className={styles.date}>
          <p className={styles.kicker}>TIBALDO Jungle · Lille</p>
          <strong>STUDIO OUVERT</strong>
          <p>Mardi–dimanche</p>
        </div>
        <div className={styles.copy}>
          <h2 id="home-studio-title">VENEZ DÉCOUVRIR LE STUDIO VÉGÉTAL</h2>
          <p>3 place de l’Arbonnoise · 59000 Lille</p>
          <Link className={styles.archive} href="/evenements/ouverture-tibaldo-jungle-lille">Revoir l’inauguration du 26 septembre 2026</Link>
        </div>
        <Link className={styles.cta} href="/contact#horaires">
          Horaires & itinéraire <Arrow />
        </Link>
      </div>
    </aside>
  );
}
