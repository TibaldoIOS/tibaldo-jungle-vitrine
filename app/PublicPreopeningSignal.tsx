import Link from "next/link";
import { Arrow } from "./SiteChrome";
import { jungleLocalIdentity } from "@/lib/jungle-local-identity";

export default function PublicPreopeningSignal() {
  return (
    <aside className="public-preopening-signal" aria-label="Informations pratiques du Studio Végétal à Lille">
      <div className="shell public-preopening-signal-inner">
        <p><strong>Le Studio Végétal est ouvert à Lille.</strong> Mardi 14 h–19 h · mercredi–samedi 10 h–13 h / 14 h–19 h · dimanche 10 h–13 h.</p>
        <nav className="public-preopening-signal-actions" aria-label="Accès rapides au Studio">
          <Link href="/contact#horaires">Horaires <Arrow /></Link>
          <a href={jungleLocalIdentity.mapsUrl}>Itinéraire <Arrow /></a>
          <Link href="/plantes">Encyclopédie <Arrow /></Link>
        </nav>
      </div>
    </aside>
  );
}
