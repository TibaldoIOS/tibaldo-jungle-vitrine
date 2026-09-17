import Link from "next/link";
import { Arrow } from "./SiteChrome";

export default function PublicPreopeningSignal() {
  return (
    <aside className="public-preopening-signal" aria-label="Premières ventes et inauguration du Studio Végétal à Lille">
      <div className="shell public-preopening-signal-inner">
        <p><strong>Premières ventes le 25 septembre à 10 h.</strong> Inauguration le 26 à 18 h.</p>
        <Link href="/evenements/ouverture-tibaldo-jungle-lille">Voir l’inauguration <Arrow /></Link>
      </div>
    </aside>
  );
}
