import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { SiteHeader, SiteFooter } from '../SiteChrome';
import ScrollReveal from '../ScrollReveal';
import { editorialArticles, editorialDate, editorialMedia } from '@/lib/editorial/catalog';
import { betaOnlyRobots, jungleOrigin } from '@/lib/deployment-mode';

export const metadata: Metadata = {
  title: 'L’Œil végétal — Observer & comprendre | TIBALDO Jungle',
  description: 'Le carnet de TIBALDO Jungle : observer les plantes, comprendre leurs particularités et démêler les idées reçues, sources à l’appui.',
  alternates: { canonical: `${jungleOrigin}/oeil-vegetal` }, robots: betaOnlyRobots,
  openGraph: { type: 'website', url: `${jungleOrigin}/oeil-vegetal`, title: 'L’Œil végétal — TIBALDO Jungle', description: 'Observer, comprendre, nuancer : le carnet végétal de TIBALDO Jungle.', images: [] },
  twitter: { card: 'summary', title: 'L’Œil végétal — TIBALDO Jungle', description: 'Observer, comprendre, nuancer.', images: [] },
};
export default function EditorialHome() {
  const article = editorialArticles[0]; const media = editorialMedia(article);
  return <div className="oeil-page"><ScrollReveal/><div className="oeil-chrome"><SiteHeader/></div>
    <main id="oeil-main" className="oeil-shell">
      <nav className="oeil-breadcrumb" aria-label="Fil d’Ariane"><Link href="/">Jungle</Link><span>/</span><span aria-current="page">L’Œil végétal</span></nav>
      <header className="oeil-masthead"><p className="oeil-kicker">Le carnet de TIBALDO Jungle</p><h1>L’Œil <em>végétal.</em></h1><div className="oeil-masthead-bottom"><p>Regarder autrement.<br/>Comprendre ce que la plante raconte.</p><span>Observer. Comprendre. Nuancer.</span></div></header>
      <section className="oeil-feature" aria-labelledby="oeil-feature-title"><div className="oeil-feature-photo">{media && <Image unoptimized src={media.src} alt={media.alt} width={media.width} height={media.height} priority sizes="(max-width: 700px) 100vw, 50vw"/>}<p>Panachure de ‘Thai Constellation’ · Photo : TIBALDO<br/>Illustration de contexte, pas un motif Half Moon.</p></div>
        <div className="oeil-feature-copy"><p className="oeil-kicker">À la une · {article.category}</p><span className="oeil-edition">{article.eyebrow}</span><h2 id="oeil-feature-title">Half Moon.<br/><em>Variété rare<br/>ou simple motif ?</em></h2><p>{article.subtitle}</p><div className="oeil-meta"><time dateTime={article.publishedAt}>{editorialDate(article.publishedAt)}</time><span>{article.readingTime} min de lecture</span></div><Link className="oeil-link" href={`/oeil-vegetal/${article.slug}`}>Lire le décryptage <span aria-hidden="true">↗</span></Link></div>
      </section>
      <section className="oeil-note"><p className="oeil-kicker">Un autre regard sur le vivant</p><h2>Une plante à identifier ?<br/><em>Une question à explorer ?</em></h2><p>L’Encyclopédie vous aide à connaître une plante et sa culture. Ici, nous prenons le temps d’un phénomène : ce qu’on observe, ce qu’on sait et ce qui mérite encore une nuance.</p><Link className="oeil-link" href="/plantes">Poursuivre dans l’Encyclopédie <span aria-hidden="true">↗</span></Link></section>
    </main><SiteFooter compactTransit/></div>;
}
