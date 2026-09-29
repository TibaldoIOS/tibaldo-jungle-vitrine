import Link from "next/link";
import { Arrow } from "./SiteChrome";

export default function OpeningEventLink() {
  return (
    <aside className="opening-event-link shell" aria-labelledby="opening-event-link-title" data-reveal>
      <div className="opening-event-link-date" aria-hidden="true">
        <strong>26</strong>
        <span>SEP<br />2026</span>
      </div>
      <div>
        <p>Archive · Inauguration de la boutique à Lille</p>
        <h2 id="opening-event-link-title">L’ouverture du Studio<br /><em>dans nos archives.</em></h2>
        <span>Événement passé · samedi 26 septembre 2026 · 3 place de l’Arbonnoise, Lille</span>
      </div>
      <Link href="/evenements/ouverture-tibaldo-jungle-lille">
        Revoir l’événement <Arrow />
      </Link>
    </aside>
  );
}
