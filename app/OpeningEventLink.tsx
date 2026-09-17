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
        <p>Inauguration · Boutique de plantes à Lille</p>
        <h2 id="opening-event-link-title">Découvrez Tibaldo Jungle<br /><em>lors de son inauguration.</em></h2>
        <span>Samedi 26 septembre 2026 · 18 h · 3 place de l’Arbonnoise, Lille</span>
      </div>
      <Link href="/evenements/ouverture-tibaldo-jungle-lille">
        Voir l’événement <Arrow />
      </Link>
    </aside>
  );
}
