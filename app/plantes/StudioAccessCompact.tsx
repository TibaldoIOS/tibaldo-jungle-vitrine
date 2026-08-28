import Image from "next/image";
import { Arrow } from "../SiteChrome";
import Link from "next/link";

export default function StudioAccessCompact({ showOpeningEvent = false }: { showOpeningEvent?: boolean }) {
  return <section className="studio-access-compact shell" aria-labelledby="studio-access-compact-title" data-reveal>
    <figure><Image unoptimized src="/transports/cormontaigne-1.jpg" alt="Place et station de métro Cormontaigne à Lille" width="1280" height="960" loading="lazy" /></figure>
    <div className="studio-access-compact-copy">
      <p className="section-kicker">Studio Végétal · Lille</p>
      <h2 id="studio-access-compact-title">À quelques pas<br />de <em>Cormontaigne.</em></h2>
      <p>3 place de l’Arbonnoise · 59000 Lille</p>
      <dl><div><dt>Métro</dt><dd>M2 · Cormontaigne</dd></div><div><dt>Bus</dt><dd>L5 · Cormontaigne</dd></div><div><dt>À pied</dt><dd>Quelques minutes depuis la place</dd></div></dl>
      <Link className="button button-green" href="/contact">Préparer mon itinéraire <Arrow /></Link>
      {showOpeningEvent && <Link className="studio-access-event" href="/evenements/ouverture-tibaldo-jungle-lille">Nouvelle boutique de plantes à Lille · 26 septembre 2026 <Arrow /></Link>}
    </div>
  </section>;
}
