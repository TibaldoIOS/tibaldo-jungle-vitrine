import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { SiteHeader, SiteFooter } from '../../SiteChrome';
import { getPlant } from '@/lib/plants/catalog';
import { jungleLocalIdentity as studio, jungleStoreStructuredData, jungleOrganizationStructuredData } from '@/lib/jungle-local-identity';
import { alocasiaContestEnd, alocasiaContestFacebookUrl, alocasiaContestInstagramUrl, alocasiaContestUrl } from '@/lib/events/alocasia-red-imperial-contest';
import styles from './contest.module.css';
import { ContestLifecycleCopy } from './ContestLifecycleCopy';

export const dynamic = 'force-dynamic';
const title = 'Concours plante à Lille — Gagnez un Alocasia Red Imperial de 1,60 m';
const description = 'Participez au concours TIBALDO Jungle à Lille pour tenter de gagner un Alocasia Red Imperial XXL d’environ 1,60 m, d’une valeur de 100 €.';
const plant = getPlant('alocasia', 'imperial-red')!;
const cover = plant.gallery.find((media) => media.license?.status === 'verified')!;
const absolute = (src: string) => src.startsWith('http') ? src : `https://jungle.tibaldo.fr${src}`;

export const metadata: Metadata = {
  title, description, alternates: { canonical: alocasiaContestUrl },
  openGraph: { title, description, type: 'article', url: alocasiaContestUrl, images: [{ url: absolute(cover.src), alt: cover.alt, width: cover.width, height: cover.height }] },
  twitter: { card: 'summary_large_image', title, description, images: [absolute(cover.src)] },
};

export default function AlocasiaContestPage() {
  const schema = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'Article', '@id': `${alocasiaContestUrl}#article`, headline: title, description, datePublished: '2026-10-09', dateModified: '2026-10-09', mainEntityOfPage: alocasiaContestUrl, image: [absolute(cover.src)], author: { '@id': studio.organizationId }, publisher: { '@id': studio.organizationId } },
    jungleStoreStructuredData(), jungleOrganizationStructuredData(),
    { '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: studio.canonicalStoreUrl },
      { '@type': 'ListItem', position: 2, name: 'Événements', item: 'https://jungle.tibaldo.fr/evenements' },
      { '@type': 'ListItem', position: 3, name: 'Concours Alocasia Red Imperial', item: alocasiaContestUrl },
    ] },
  ] };
  return <><div className={styles.navigation}><SiteHeader /></div><main className={styles.page}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <header className={`shell ${styles.hero}`}><div><p className={styles.kicker}><ContestLifecycleCopy slot="hero-kicker" /></p><h1>Concours TIBALDO Jungle — Gagnez un <em>Alocasia Red Imperial XXL</em></h1><p className={styles.lead}>Un spécimen d’environ 1,60 m, avec quatre feuilles et une nouvelle feuille en cours, d’une valeur de 100 €.</p><p><ContestLifecycleCopy slot="hero-copy" /></p><a className={styles.button} href="#participer"><ContestLifecycleCopy slot="hero-action" /></a></div><figure><Image unoptimized priority src={absolute(cover.src)} alt={cover.alt} width={cover.width} height={cover.height} /><figcaption>{cover.caption} · Photographie documentaire de la plante, non présentée comme une image du lot du concours.</figcaption></figure></header>
    <section className={`shell ${styles.prize}`}><div><p className={styles.kicker}>Le végétal à gagner</p><h2>Une présence architecturale.</h2><p>Commercialisé sous l’appellation Alocasia « Red Imperial », ce grand hybride horticole est documenté dans notre encyclopédie sous le nom Alocasia ‘Imperial Red’. Son identité ne doit pas être confondue avec une espèce botanique.</p><Link href="/plantes/alocasia/imperial-red">Découvrir sa fiche botanique →</Link></div><dl><div><dt>Hauteur annoncée</dt><dd>Environ 160 cm</dd></div><div><dt>Feuillage annoncé</dt><dd>4 feuilles + 1 nouvelle feuille en cours</dd></div><div><dt>Valeur du lot</dt><dd>100 €</dd></div></dl></section>
    <section id="participer" className={`shell ${styles.participate}`}><p className={styles.kicker}><ContestLifecycleCopy slot="participation-kicker" /></p><h2>Choisissez votre plateforme.</h2><p>Instagram et Facebook proposent chacun une participation autonome. Participer sur les deux plateformes ne crée pas, à lui seul, de chance supplémentaire.</p><ol><li>Aimer la publication du concours sur la plateforme choisie.</li><li>Suivre le compte TIBALDO Jungle.</li><li>Identifier trois amis passionnés de plantes dans un commentaire.</li><li>Partager la publication en story pour doubler ses chances sur cette participation.</li></ol><div className={styles.actions}><a href={alocasiaContestInstagramUrl}>Participer sur Instagram ↗</a><a href={alocasiaContestFacebookUrl}>Participer sur Facebook ↗</a></div><aside><strong>Clôture</strong><p>Dimanche 11 octobre 2026 à 13 h — Europe/Paris.</p><time dateTime={alocasiaContestEnd}>11 octobre 2026, 13 h</time></aside></section>
    <section className={`shell ${styles.links}`}><h2>Préparer votre visite au Studio</h2><p>{studio.storeName}<br />{studio.streetAddress}<br />{studio.postalCode} {studio.city}</p><Link href="/contact">Horaires et itinéraire →</Link><Link href="/evenements">Tous les événements →</Link><Link href="/plantes/alocasia">Explorer les Alocasia →</Link></section>
  </main><SiteFooter compactTransit /></>;
}
