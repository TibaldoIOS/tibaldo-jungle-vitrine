import type { Metadata } from 'next';
import Link from 'next/link';
import { Arrow, SiteFooter, SiteHeader } from '../SiteChrome';
import ScrollReveal from '../ScrollReveal';
import LocalPresence from '../LocalPresence';
import { jungleLocalIdentity as studio, jungleStoreStructuredData } from '@/lib/jungle-local-identity';
import { jungleOrigin, betaOnlyRobots } from '@/lib/deployment-mode';
import styles from './boutique.module.css';
import NarrativeMotion from './NarrativeMotion';

const title = 'Boutique de plantes tropicales et vertes à Lille | TIBALDO Jungle';
const description = 'Trouvez des plantes tropicales, vertes et de collection à Lille, avec conseils, substrats en vrac et rempotage au Studio Végétal — TIBALDO Jungle.';
export const metadata: Metadata = {
  title, description, alternates: { canonical: '/boutique-plantes-lille' }, robots: betaOnlyRobots,
  openGraph: { siteName: 'TIBALDO Jungle', title, description, url: '/boutique-plantes-lille', images: [{ url: '/media/tibaldo-jungle-logo.webp', width: 700, height: 700, alt: 'Logo officiel Studio Végétal — TIBALDO Jungle à Lille' }] },
  twitter: { card: 'summary', title, description, images: ['/media/tibaldo-jungle-logo.webp'] },
};
const services = [
  ['Conseils & choix', 'Choisir selon votre lumière, votre espace et vos habitudes.', '/conseils'],
  ['Rempotage', 'Observer les racines et choisir un contenant et un mélange cohérents avec la plante.', '/rempotage'],
  ['Substrats en vrac', 'Composer un mélange adapté aux besoins de votre plante.', '/substrats-en-vrac-lille'],
  ['Pots & cache-pots', 'Associer drainage, dimensions et esthétique. Les modèles suivent les arrivages.', '/pots-cache-pots-lille'],
  ['SOS plantes', 'Observer les symptômes et trouver le bon geste.', '/sos-plantes'],
  ['Livraison locale', 'À Lille, selon faisabilité : contactez le Studio pour les modalités.', '/livraison-plantes-lille'],
];
const questions = [
  ['Où trouver des plantes tropicales, vertes ou exotiques à Lille ?', 'Au Studio Végétal — TIBALDO Jungle, boutique physique à Lille ouverte dès le 26 septembre 2026. La sélection, jusqu’aux plantes de collection, évolue selon les arrivages : appelez pour une recherche précise.'],
  ['Puis-je venir avec une plante à rempoter ?', 'Oui, le Studio vous accompagne dans le choix du pot et du substrat. Pour plusieurs plantes ou un sujet lourd, contactez-nous avant de venir.'],
];
export default function BoutiquePlantesLille() {
  const schema = { '@context': 'https://schema.org', '@graph': [jungleStoreStructuredData(), {
    '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${jungleOrigin}/` },
      { '@type': 'ListItem', position: 2, name: 'Boutique de plantes à Lille', item: `${jungleOrigin}/boutique-plantes-lille` },
    ],
  }] };
  return <main className={`${styles.page} editorial-page`}>
    <ScrollReveal/>
    <NarrativeMotion/>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }}/>
    <section className={styles.hero}><SiteHeader/>
      <div className={`shell ${styles.heroCopy}`}>
        <p className={styles.kicker}>Studio Végétal — TIBALDO Jungle · Lille</p>
        <h1><span>Une boutique de plantes </span><em>tropicales, vertes et rares</em><span> à Lille.</span></h1>
        <p className={styles.lead}>TIBALDO Jungle est une boutique physique de plantes d’intérieur à Lille, dont le Studio ouvre le 26 septembre 2026. Plantes vertes, tropicales, exotiques et de collection y sont sélectionnées selon les arrivages, avec conseils, rempotage et substrats pour les accompagner.</p>
        <div className={styles.actions}><a className="button button-light" href="#informations">Préparer ma visite <Arrow/></a><a href="#selection">Découvrir la sélection ↓</a></div>
        <p className={styles.opening}>3 place de l’Arbonnoise · Métro Cormontaigne<br/>Ouverture le 26 septembre · 10 h–19 h</p>
      </div>
    </section>
    <section className={`shell ${styles.section} ${styles.selectionScene}`} id="selection">
      <header><p className={styles.kicker}>01 · La sélection</p><h2>Du premier feuillage<br/><em>à la plante de collection.</em></h2></header>
      <div className={styles.selection}>
        <article tabIndex={0} aria-label="Le quotidien" data-narrative><div className={styles.panelIdentity} aria-hidden="true"><small>01</small><b>Vivre</b></div><span>Le quotidien</span><h3>Des plantes vertes à vivre.</h3><p>Une première plante, un feuillage généreux ou un grand sujet pour structurer une pièce : le choix commence par votre intérieur. Des plantes accessibles côtoient des formats plus imposants, selon les arrivages.</p></article>
        <article tabIndex={0} aria-label="L’envie d’explorer" data-narrative><div className={styles.panelIdentity} aria-hidden="true"><small>02</small><b>Explorer</b></div><span>L’envie d’explorer</span><h3>Une sensibilité tropicale.</h3><p>Monstera, Anthurium, Alocasia et Philodendron : des formes et des besoins variés, à découvrir sans confondre l’attrait d’une plante exotique avec sa facilité de culture.</p></article>
        <article tabIndex={0} aria-label="Le regard du collectionneur" data-narrative><div className={styles.panelIdentity} aria-hidden="true"><small>03</small><b>Collectionner</b></div><span>Le regard du collectionneur</span><h3>Des plantes singulières.</h3><p>Port, enracinement, feuillage et qualité du sujet guident la sélection. Les plantes rares ou de collection ne sont pas promises en permanence : renseignez-vous pour une recherche précise.</p></article>
      </div>
    </section>
    <section className={styles.choose} id="chez-vous"><div className={`shell ${styles.chooseInner}`}>
      <header data-narrative><p className={styles.kicker}>02 · Chez vous</p><h2><span>La bonne plante.</span><em>Au bon endroit.</em></h2></header>
      <div className={styles.chooseBottom}><ul className={styles.factors} aria-label="Les quatre repères pour choisir">{['Lumière','Espace','Humidité','Expérience'].map((factor,i)=><li key={factor} tabIndex={0}><span aria-hidden="true">0{i+1}</span>{factor}</li>)}</ul><div><p>Lumière, espace, humidité, expérience : apportez une photo de votre pièce pour choisir une plante à l’aise chez vous.</p><Link href="/plantes" className={styles.textLink}>Comprendre ses besoins dans l’Encyclopédie <Arrow/></Link></div></div>
    </div></section>
    <section className={`shell ${styles.section} ${styles.serviceScene}`} id="services-studio">
      <header><p className={styles.kicker}>03 · Au Studio</p><h2>Le conseil ne s’arrête pas<br/><em>au choix de la plante.</em></h2><div className={styles.actionStage} aria-hidden="true">{['Choisir','Rempoter','Composer','Habiller','Soigner','Livrer'].map(verb=><span key={verb}>{verb}<i>↗</i></span>)}</div></header>
      <div className={styles.services}>{services.map(([name,copy,href],i)=><article key={href} data-narrative><span className={styles.serviceNumber} aria-hidden="true">0{i+1}</span><div><span className={styles.mobileVerb} aria-hidden="true">{['Choisir','Rempoter','Composer','Habiller','Soigner','Livrer'][i]}</span><h3><Link href={href}>{name} <Arrow/></Link></h3><p>{copy}</p></div></article>)}</div>
    </section>
    <section className={styles.visit} id="informations"><div className={`shell ${styles.split}`}>
      <div><p className={styles.kicker}>04 · Préparer votre visite</p><h2>Une adresse.<br/><em>Une rencontre.</em></h2><address data-narrative><strong>{studio.storeName}</strong><br/>{studio.streetAddress}<br/>{studio.postalCode} {studio.city}</address><p>À quelques pas du métro Cormontaigne.<br/>Métro, bus, vélo ou voiture :<br/><Link href="/contact" className={styles.textLink}>Préparer mon itinéraire <Arrow/></Link></p><p data-narrative><strong>Ouverture : samedi 26 septembre 2026, 10 h–19 h.</strong><br/>Entrée libre, sans réservation.</p><Link href="/evenements/ouverture-tibaldo-jungle-lille" className={styles.textLink}>Le programme de l’ouverture <Arrow/></Link></div>
      <div><div data-narrative><h3>Les horaires du Studio</h3><p>À partir de l’ouverture<br/>Mardi · 14 h–19 h<br/>Mercredi–samedi · 10 h–19 h<br/>Dimanche · 10 h–13 h<br/>Lundi · fermé</p><p>Une recherche précise ou un sujet difficile à transporter ? Appelez-nous avant de venir.</p><a className={styles.textLink} href={`tel:${studio.phoneE164}`}>{studio.phoneDisplay} <Arrow/></a></div><div data-narrative><LocalPresence/></div></div>
    </div></section>
    <section className={`shell ${styles.section} ${styles.questionScene}`} id="questions-locales"><header><p className={styles.kicker}>05 · Vos questions</p><h2>Avant de pousser<br/><em>la porte.</em></h2></header><div className={styles.questions}>{questions.map(([question,answer],i)=><details key={question}><summary><span aria-hidden="true">0{i+1}</span><h3>{question}</h3><b aria-hidden="true">+</b></summary><div className={styles.answer}><p>{answer}</p>{i===1&&<Link href="/rempotage" className={styles.textLink}>Le service de rempotage <Arrow/></Link>}</div></details>)}</div></section>
    <aside className={`shell ${styles.related}`} aria-label="Encyclopédie"><Link href="/plantes">Approfondir dans l’Encyclopédie <Arrow/></Link><p>Des repères de culture, pas un catalogue de stock.</p></aside>
    <SiteFooter compactTransit/>
  </main>;
}
