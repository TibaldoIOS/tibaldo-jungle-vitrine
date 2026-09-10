import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SiteHeader, SiteFooter } from '../../SiteChrome';
import ScrollReveal from '../../ScrollReveal';
import { editorialArticles, editorialDate, editorialMedia, getEditorialArticle } from '@/lib/editorial/catalog';
import { editorialStructuredData } from '@/lib/editorial/seo';
import { betaOnlyRobots, jungleOrigin } from '@/lib/deployment-mode';
import { EditorialCalloutBox, EditorialFigure, EditorialRelated, EditorialSources } from '../EditorialComponents';

export function generateStaticParams() { return editorialArticles.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const article = getEditorialArticle((await params).slug); if (!article) return {};
  const media = editorialMedia(article); const url = `${jungleOrigin}/oeil-vegetal/${article.slug}`;
  const images = media ? [{ url: `${jungleOrigin}${media.src}`, width: media.width, height: media.height, alt: media.alt }] : [];
  return { title: article.seo.title, description: article.seo.description, alternates: { canonical: url }, robots: betaOnlyRobots,
    openGraph: { type: 'article', title: article.title, description: article.seo.description, url, siteName: 'L’Œil végétal · TIBALDO Jungle', locale: 'fr_FR', publishedTime: article.publishedAt, modifiedTime: article.updatedAt, authors: [article.author], images },
    twitter: { card: 'summary_large_image', title: article.title, description: article.seo.description, images },
  };
}
export default async function EditorialArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const article = getEditorialArticle((await params).slug); if (!article) notFound();
  const [shortTitle, ...question] = article.title.replace(/ \?/g, '\u00a0?').split(' : ');
  return <div className="oeil-page"><ScrollReveal/><div className="oeil-chrome"><SiteHeader/></div>
    <main className="oeil-shell oeil-article">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(editorialStructuredData(article, jungleOrigin)).replace(/</g, '\\u003c') }}/>
      <nav className="oeil-breadcrumb" aria-label="Fil d’Ariane"><Link href="/">Jungle</Link><span>/</span><Link href="/oeil-vegetal">L’Œil végétal</Link><span>/</span><span aria-current="page">Half Moon</span></nav>
      <article><header className="oeil-article-hero"><div className="oeil-article-heading"><Link className="oeil-journal-mark" href="/oeil-vegetal">L’Œil végétal</Link><p className="oeil-kicker">Monstera · {article.category}</p><h1><span>{shortTitle}.</span><em>{question.join(' : ')}</em></h1><p className="oeil-standfirst">{article.subtitle}</p><div className="oeil-meta"><span>{article.eyebrow}</span><time dateTime={article.publishedAt}>{editorialDate(article.publishedAt)}</time><span>{article.readingTime} min de lecture</span></div><p className="oeil-byline">Écrit et documenté par {article.author}</p><a className="oeil-link" href="#oeil-intro">Prendre le temps de regarder <span aria-hidden="true">↓</span></a></div><EditorialFigure article={article}/></header>
      <div className="oeil-reading-layout"><nav className="oeil-toc" aria-label="Dans cet article"><p className="oeil-kicker">Dans cet article</p><ol>{article.chapters.map((chapter, i) => <li key={chapter.id}><a href={`#${chapter.id}`}><span>{String(i + 1).padStart(2, '0')}</span>{chapter.title}</a></li>)}</ol><a href="#sources">Les sources ↗</a></nav>
      <div className="oeil-reading"><p className="oeil-intro" id="oeil-intro">{article.intro}</p>
        {article.chapters.map((chapter, i) => <div key={chapter.id}><section className="oeil-chapter" id={chapter.id}><div className="oeil-chapter-top"><span>{String(i + 1).padStart(2, '0')}</span><p>{chapter.kind}</p></div><h2>{chapter.title}</h2>{chapter.paragraphs.map(p => <p key={p}>{p}</p>)}{chapter.sources.length > 0 && <div className="oeil-references"><span>Repères pour ce passage</span>{chapter.sources.map(id => { const s = article.sources.find(source => source.id === id)!; return <a key={id} href={`#source-${id}`}>{s.publisher.split(' · ')[0]} [{article.sources.indexOf(s) + 1}]</a>; })}</div>}</section>{article.callouts.filter(c => c.after === chapter.id).map(callout => <EditorialCalloutBox key={callout.kind} callout={callout}/>)}{i === 1 && <><blockquote className="oeil-pullquote">« Une feuille raconte<br/>un instant.<br/><em>Pas toute la suite.</em> »<cite>Le regard de TIBALDO</cite></blockquote><EditorialFigure article={article} detail/></>}</div>)}
      </div></div><EditorialSources article={article}/><EditorialRelated article={article}/></article>
    </main><SiteFooter compactTransit/></div>;
}
