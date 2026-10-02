import Link from "next/link";
import styles from "./HomeOpeningBanner.module.css";
export default function SybotanicaWeekendLink() {
  const ended = Date.now() >= Date.parse("2026-10-04T22:00:00Z");
  if (ended) return null;
  return <aside className={styles.banner} aria-label="Week-end Sybotanica"><div className={`shell ${styles.inner}`}><div className={styles.date}><p className={styles.kicker}>Lille + Shop</p><strong>3 & 4 octobre 2026</strong></div><div className={styles.copy}><h2>Sybotanica : 20 % crédités sur votre Passeport Jungle</h2><p>Prix normal payé · avoir pour un prochain achat · 2 articles par compte · code SYBOTANICA20</p></div><Link className={styles.cta} href="/evenements/week-end-sybotanica-octobre-2026">Voir l’offre →</Link></div></aside>;
}
