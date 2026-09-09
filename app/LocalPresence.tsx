import { jungleLocalIdentity as studio } from "@/lib/jungle-local-identity";
import styles from "./LocalPresence.module.css";

/** Inline icons, plain links: no SDK, embed, reviews or third-party requests. */
export default function LocalPresence({ compact = false }: { compact?: boolean }) {
  return <nav className={`${styles.block} ${compact ? styles.compact : ""}`} aria-label="Nous retrouver">
    <p className={styles.heading}>Nous retrouver</p>
    <a href={studio.mapsUrl} target="_blank" rel="noopener noreferrer" aria-label="Voir sur Google Maps — TIBALDO Jungle (nouvel onglet)">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true" focusable="false"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
      <span>{compact ? "Google Maps" : "Voir sur Google Maps"}</span><b aria-hidden="true">↗</b>
    </a>
    <a href={studio.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram — TIBALDO Jungle (nouvel onglet)">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true" focusable="false"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.25"/><circle cx="17.4" cy="6.8" r="1" fill="currentColor" stroke="none"/></svg><span>Instagram</span><b aria-hidden="true">↗</b>
    </a>
    <a href={studio.facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Facebook — TIBALDO Jungle (nouvel onglet)">
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M13.7 21v-8h2.8l.42-3.2H13.7V7.75c0-.93.26-1.56 1.62-1.56H17V3.33c-.3-.04-1.3-.13-2.48-.13-2.46 0-4.15 1.5-4.15 4.27V9.8H7.6V13h2.77v8h3.33Z"/></svg><span>Facebook</span><b aria-hidden="true">↗</b>
    </a>
  </nav>;
}
