import Image from 'next/image';
import Link from 'next/link';
import { editorialMedia, getEditorialArticle, type EditorialArticle, type EditorialCallout } from '@/lib/editorial/catalog';
import { publicMediaCredit } from '@/lib/plants/public-media-credit';
import { halfMoonPhoto } from '@/lib/editorial/half-moon-photo';

export function EditorialFigure({ article, detail = false }: { article: EditorialArticle; detail?: boolean }) {
  if (detail && article.slug === 'monstera-half-moon') return <figure className="oeil-figure oeil-reader-photo">
    <Image unoptimized src={halfMoonPhoto.src} width={halfMoonPhoto.width} height={halfMoonPhoto.height} alt={halfMoonPhoto.alt} loading="lazy" sizes="(max-width: 700px) 100vw, 700px"/>
    <figcaption>{halfMoonPhoto.caption}</figcaption>
  </figure>;
  const image = editorialMedia(article);
  return <figure className={`oeil-figure${detail ? ' oeil-detail' : ''}`}>
    {image ? <Image unoptimized src={image.src} width={image.width} height={image.height} alt={detail ? `Détail du feuillage moucheté de crème de Monstera deliciosa ‘Thai Constellation’` : image.alt} priority={!detail} loading={detail ? 'lazy' : undefined} sizes={detail ? '(max-width: 700px) 100vw, 800px' : '(max-width: 700px) 100vw, 50vw'}/> : <div className="oeil-media-gap">Observer sans inventer une image.</div>}
    <figcaption>{detail ? 'Détail de la même photographie : plages claires et mouchetures, sans séparation régulière en deux moitiés. ' : `${article.heroMedia.context} `}{image && <><span>{publicMediaCredit(image)}.</span> <Link href="/credits-images">Crédits photographiques</Link></>}</figcaption>
  </figure>;
}

export function EditorialCalloutBox({ callout }: { callout: EditorialCallout }) {
  return <aside className={`oeil-callout oeil-callout-${callout.kind}`}>
    <p className="oeil-kicker">{callout.kind === 'myth' ? 'Mythe / réalité' : callout.kind === 'summary' ? 'À retenir' : 'À observer'}</p>
    <h3>{callout.title}</h3>
    {callout.kind === 'myth' ? <div className="oeil-myth-grid"><div><strong>Mythe</strong><p>{callout.text}</p></div><div><strong>Réalité</strong><p>{callout.contrast}</p></div></div> : <p>{callout.text}</p>}
  </aside>;
}

export function EditorialSources({ article }: { article: EditorialArticle }) {
  return <section className="oeil-sources" id="sources" aria-labelledby="oeil-sources-title">
    <p className="oeil-kicker">Les repères derrière ce décryptage</p><h2 id="oeil-sources-title">Ce que les sources<br/><em>nous permettent de dire.</em></h2>
    <p>Les repères botaniques ci-dessus renvoient à ces références. Les questions d’achat et préférences de culture sont notre lecture éditoriale, pas des garanties scientifiques. Sources consultées le 10 septembre 2026.</p>
    <ol>{article.sources.map((source, i) => <li key={source.id} id={`source-${source.id}`}><span className="oeil-source-number">{String(i + 1).padStart(2, '0')}</span><div><p className="oeil-source-publisher">{source.publisher}</p><h3><a href={source.url} target="_blank" rel="noreferrer">{source.title} <span aria-hidden="true">↗</span><span className="sr-only"> (nouvel onglet)</span></a></h3><p>{source.supports}</p><p className="oeil-source-limit">Limite : {source.limitation}</p><a className="oeil-source-back" href={`#${article.chapters.find(c => c.sources.includes(source.id))?.id ?? 'oeil-intro'}`}>Revenir au passage concerné</a></div></li>)}</ol>
  </section>;
}

export function EditorialRelated({ article }: { article: EditorialArticle }) {
  const related = article.relatedArticles.map(getEditorialArticle).filter((a): a is EditorialArticle => Boolean(a));
  return <section className="oeil-related" aria-labelledby="oeil-related-title"><p className="oeil-kicker">Continuer à observer</p><h2 id="oeil-related-title">Du phénomène<br/><em>à la plante.</em></h2><p>Poursuivre dans l’Encyclopédie</p><div className="oeil-related-grid">{article.relatedPlants.map((plant, i) => <Link key={plant.slug} href={`/plantes/${plant.genre}/${plant.slug}`}><span>0{i + 1} · Monstera</span><h3>{plant.label}</h3><span>Découvrir la fiche ↗</span></Link>)}</div>{related.map(a => <Link key={a.slug} className="oeil-link" href={`/oeil-vegetal/${a.slug}`}>{a.title} ↗</Link>)}<div className="oeil-more"><Link className="oeil-link" href="/conseils">Les conseils de culture ↗</Link><Link className="oeil-link" href="/substrats">Comprendre les substrats ↗</Link><Link className="oeil-link" href="/oeil-vegetal">Revenir à L’Œil végétal ↗</Link></div></section>;
}
