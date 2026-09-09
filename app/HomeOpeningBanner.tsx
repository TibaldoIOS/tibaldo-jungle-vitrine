import Link from "next/link";
import { Arrow } from "./SiteChrome";
import styles from "./HomeOpeningBanner.module.css";

// Manual editorial switch for J-7 / J-2; no timer or automatic publishing.
const urgencyCopy = {
  announcement: "TIBALDO Jungle · Lille",
  week: "Dans une semaine · Lille",
  imminent: "Dans deux jours · Lille",
};

type Props = { urgency?: keyof typeof urgencyCopy };

export default function HomeOpeningBanner({ urgency = "announcement" }: Props) {
  return (
    <aside className={styles.banner} aria-labelledby="home-opening-title">
      <div className={`shell ${styles.inner}`}>
        <div className={styles.date}>
          <p className={styles.kicker}>{urgencyCopy[urgency]}</p>
          <time dateTime="2026-09-26">26 SEPTEMBRE 2026</time>
          <p>10 h–19 h · Entrée gratuite</p>
        </div>
        <div className={styles.copy}>
          <h2 id="home-opening-title">OUVERTURE DU STUDIO VÉGÉTAL</h2>
          <p>3 place de l’Arbonnoise, 59000 Lille</p>
        </div>
        <Link className={styles.cta} href="/evenements/ouverture-tibaldo-jungle-lille">
          Découvrir l’événement <Arrow />
        </Link>
      </div>
    </aside>
  );
}
