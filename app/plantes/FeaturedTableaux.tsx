import Link from 'next/link';
import Image from 'next/image';
import { resolveFeaturedTableaux } from '@/lib/plants/featured-tableaux';

export default function FeaturedTableaux() {
  return <section className="shell botanical-tableaux" aria-labelledby="tableaux-title">
    <header className="tableaux-heading"><div><p className="section-kicker">Douze regards botaniques</p><h2 id="tableaux-title">La feuille.<br /><em>Le début d’une histoire.</em></h2></div><p>Entrez par une texture, une nervure, une silhouette. Retrouvez ensuite les repères de culture propres à chaque genre.</p></header>
    <div className="tableaux-grid">{resolveFeaturedTableaux().map((item, index) => <Link href={`/plantes/${item.slug}`} className={`botanical-tableau${item.image ? '' : ' tableau-neutral'}`} key={item.slug} aria-labelledby={`tableau-${item.slug}`} aria-describedby={`signature-${item.slug}`}>
      {item.image && <Image unoptimized className="tableau-photo" src={item.image.src} alt={item.image.alt} width={item.image.width} height={item.image.height} sizes="(max-width: 639px) 90vw, (max-width: 1099px) 45vw, 23vw" loading="lazy" />}
      <span className="tableau-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
      {!item.image && <span className="tableau-neutral-note">Un genre à découvrir</span>}
      <div className="tableau-copy"><span className="tableau-count">{item.count} {item.count === 1 ? 'variété documentée' : 'variétés documentées'}</span><h3 id={`tableau-${item.slug}`}>{item.name}</h3><p className="tableau-signature" id={`signature-${item.slug}`}>{item.signature}</p><span className="tableau-explore">Explorer <span aria-hidden="true">↗</span></span></div>
    </Link>)}</div>
  </section>;
}
