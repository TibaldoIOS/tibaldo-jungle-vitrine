import Link from "next/link";

export default function PublicPreopeningSignal() {
  return (
    <aside className="public-preopening-signal" aria-label="Pré-ouverture du Studio Végétal à Lille">
      <div className="shell public-preopening-signal-inner">
        <p><strong>La Jungle est ouverte en ligne.</strong> Le Studio Végétal ouvre à Lille le 26 septembre.</p>
        <Link href="/evenements/ouverture-tibaldo-jungle-lille">Préparer l’ouverture <span aria-hidden="true">↗</span></Link>
      </div>
    </aside>
  );
}
