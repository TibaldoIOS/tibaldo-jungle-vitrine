import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { jungleLocalIdentity, jungleStoreStructuredData } from "@/lib/jungle-local-identity";
import ScrollReveal from "../ScrollReveal";
import { Arrow, SiteFooter, SiteHeader } from "../SiteChrome";
import styles from "./rempotage.module.css";

const canonicalPath = "/rempotage";
const canonical = `https://jungle.tibaldo.fr${canonicalPath}`;
const socialImage = "https://jungle.tibaldo.fr/service-rempotage-plantes-lille.jpg";

const faqs = [
  { question: "Le rempotage est-il vraiment gratuit à Lille ?", answer: "Oui. Pour une plante de format classique, le geste, le conseil et le Terreau Signature sont offerts toute l’année. Le contenant, les composants techniques supplémentaires et les sujets hors normes ne sont pas compris." },
  { question: "Puis-je apporter une plante achetée ailleurs ?", answer: "Oui. Le Bar à rempotage accueille les plantes achetées chez Tibaldo Jungle comme dans une autre boutique, dès lors qu’elles peuvent être transportées et manipulées sans risque." },
  { question: "Faut-il prendre rendez-vous ?", answer: "Une plante classique peut être apportée pendant les horaires d’ouverture, dans la limite d’un passage par semaine et par compte client. Pour plusieurs plantes, un sujet XXL, un pot très lourd ou une intervention complexe, contactez le Studio avant votre venue afin de confirmer la faisabilité et le devis éventuel." },
  { question: "Le Terreau Signature est-il offert ?", answer: "Oui, lorsqu’il constitue la base du rempotage d’une plante classique. Un mélange nécessitant des composants techniques particuliers peut entraîner un supplément annoncé avant l’intervention." },
  { question: "Comment savoir si ma plante a vraiment besoin d’être rempotée ?", answer: "Des racines qui occupent fortement le contenant, un substrat très tassé ou épuisé et un séchage devenu inhabituel justifient une observation. Une croissance lente ou une feuille jaune ne suffisent pas, à elles seules, à imposer un rempotage." },
  { question: "Quel substrat utilisez-vous ?", answer: "Il n’existe pas de recette unique. Le mélange est ajusté à la plante, au volume du pot, à la lumière et à votre manière d’arroser. La base peut être complétée par exemple avec de l’écorce de pin, de la perlite, de la sphaigne, du charbon actif, de la vermiculite ou de la zéolite lorsque leur fonction est utile." },
  { question: "Peut-on rempoter un Monstera, un Alocasia ou un Anthurium ?", answer: "Oui. Le service convient aux plantes d’intérieur courantes, aux aracées et à de nombreuses plantes de collection. L’observation préalable permet d’ajuster le contenant et l’aération du mélange." },
  { question: "Qu’est-ce qu’une plante hors normes ?", answer: "Un sujet XXL, un ensemble très lourd, une motte nécessitant plusieurs personnes ou une intervention longue et technique est considéré comme hors normes. Envoyez une photo et les dimensions au Studio avant de vous déplacer." },
  { question: "Où se trouve le Bar à rempotage ?", answer: `Au Studio Végétal — TIBALDO Jungle, ${jungleLocalIdentity.streetAddress}, ${jungleLocalIdentity.postalCode} ${jungleLocalIdentity.city}. Le service est accessible pendant les horaires d’ouverture de la boutique.` },
] as const;

const signs = [
  ["La motte", "Les racines tournent, sortent sous le pot ou occupent réellement le volume disponible."],
  ["La matière", "Le substrat s’est tassé, absorbe mal l’eau ou ne retrouve plus une structure aérée après l’arrosage."],
  ["Le contexte", "Le pot devient instable, sèche anormalement vite ou ne correspond plus au développement de la plante."],
] as const;

const substrateRoles = [
  ["Structure", "Maintenir la plante sans compacter la zone racinaire."],
  ["Air", "Conserver des espaces où les racines peuvent respirer."],
  ["Drainage", "Laisser l’excédent d’eau rejoindre le trou d’évacuation."],
  ["Réserve", "Garder l’humidité utile sans prolonger la saturation."],
] as const;

const steps = [
  ["Préparer", "Choisir un pot percé cohérent avec la motte et réunir les matières réellement nécessaires."],
  ["Observer", "Sortir la plante, regarder les racines et décider si l’intervention est utile avant de défaire la motte."],
  ["Replanter", "Installer à la même hauteur, répartir le mélange sans le tasser excessivement, puis laisser une marge d’arrosage."],
] as const;

export const metadata: Metadata = {
  title: "Bar à rempotage gratuit à Lille | Tibaldo Jungle",
  description: "Bar à rempotage à Lille : diagnostic des racines, conseil et Terreau Signature offerts pour les plantes classiques, même achetées ailleurs.",
  alternates: { canonical: canonicalPath },
  keywords: ["bar à rempotage Lille", "rempotage gratuit Lille", "rempoter plante Lille", "terreau offert Lille", "diagnostic racines plante Lille"],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: canonicalPath,
    title: "Bar à rempotage gratuit à Lille",
    description: "Observer les racines, choisir le bon contenant et composer un substrat adapté au Studio Végétal Tibaldo Jungle.",
    images: [{ url: socialImage, width: 1448, height: 1086, alt: "Rempotage d’une plante au Studio Végétal Tibaldo Jungle à Lille" }],
  },
  twitter: { card: "summary_large_image", title: "Bar à rempotage gratuit à Lille", description: "Diagnostic, conseil et Terreau Signature offerts pour les plantes classiques.", images: [socialImage] },
};

export default function RepottingGoldenPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      jungleStoreStructuredData(),
      {
        "@type": "Service", "@id": `${canonical}#service`, name: "Bar à rempotage gratuit à Lille", serviceType: "Rempotage de plantes d’intérieur", url: canonical,
        description: "Service de rempotage à Lille avec observation des racines, conseil et Terreau Signature offert pour les plantes de format classique. Pots, composants techniques supplémentaires et sujets hors normes exclus.",
        provider: { "@id": jungleLocalIdentity.storeId },
        areaServed: [{ "@type": "City", name: "Lille" }, { "@type": "AdministrativeArea", name: "Métropole Européenne de Lille" }],
        offers: { "@type": "Offer", price: "0", priceCurrency: "EUR", url: canonical, description: "Geste, conseil et Terreau Signature offerts pour une plante classique. Hors contenant, composants techniques supplémentaires et sujets hors normes." },
      },
      { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Accueil", item: "https://jungle.tibaldo.fr/" }, { "@type": "ListItem", position: 2, name: "Bar à rempotage", item: canonical }] },
      { "@type": "FAQPage", mainEntity: faqs.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) },
    ],
  };

  return <main className={styles.page}>
    <ScrollReveal />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

    <section className={styles.hero} aria-labelledby="repotting-title">
      <Image unoptimized className={styles.heroImage} src="/service-rempotage-plantes-lille.jpg" alt="Une plante sortie de son pot pour observer sa motte avant le rempotage" fill priority sizes="100vw" />
      <div className={styles.heroShade} aria-hidden="true" />
      <SiteHeader />
      <div className={`shell ${styles.heroContent}`}>
        <p className={styles.eyebrow}><span /> Bar à rempotage · Lille</p>
        <h1 id="repotting-title">Sous la surface,<br /><em>tout commence.</em></h1>
        <p className={styles.heroLead}>Apportez votre plante, même achetée ailleurs. Nous observons les racines avant de choisir le pot, le drainage et le mélange.</p>
        <div className={styles.heroActions}>
          <a className={styles.primaryAction} href="#service">Découvrir le service <Arrow /></a>
          <a className={styles.secondaryAction} href="#venir">Préparer ma venue</a>
        </div>
      </div>
      <div className={`shell ${styles.heroFacts}`} aria-label="Le service en bref">
        <p><span>Geste + conseil</span><strong>Offerts</strong></p>
        <p><span>Base du mélange</span><strong>Terreau Signature offert</strong></p>
        <p><span>Plantes accueillies</span><strong>Même achetées ailleurs</strong></p>
        <p><span>Adresse</span><strong>3 place de l’Arbonnoise</strong></p>
      </div>
    </section>

    <nav className={styles.chapterNav} aria-label="Chapitres du Bar à rempotage"><div className="shell">
      <a href="#service"><span>01</span> Le service</a><a href="#diagnostic"><span>02</span> Observer</a><a href="#substrat"><span>03</span> Le mélange</a><a href="#geste"><span>04</span> Le geste</a><a href="#venir"><span>05</span> Venir</a>
    </div></nav>

    <section className={`shell ${styles.intro}`} id="service">
      <header data-reveal><p className={styles.kicker}>01 · Le service</p><h2>Rempoter moins vite.<br /><em>Rempoter plus juste.</em></h2></header>
      <div className={styles.introCopy} data-reveal>
        <p className={styles.standfirst}>Un bon rempotage ne commence pas par un pot plus grand. Il commence par une observation.</p>
        <p>Au Studio Végétal, nous regardons la densité de la motte, l’état des racines, l’humidité, le drainage et la cohérence entre la plante et son contenant. Si elle n’a pas besoin d’être rempotée, nous vous le disons.</p>
        <p>Pour une plante de format classique, le geste, le conseil et la base de Terreau Signature sont offerts toute l’année. Le pot, les composants techniques complémentaires et les demandes hors normes restent exclus de cette gratuité.</p>
      </div>
    </section>

    <section className={styles.offer} aria-labelledby="offer-title"><div className="shell">
      <header data-reveal><p className={styles.kicker}>L’offre en clair</p><h2 id="offer-title"><strong>0 €</strong> pour une plante classique.</h2></header>
      <div className={styles.offerRows}>
        <article data-reveal><span>Inclus</span><h3>Le geste</h3><p>Dépotage, observation, installation et indications de reprise.</p></article>
        <article data-reveal><span>Inclus</span><h3>Le conseil</h3><p>Volume du contenant, drainage, lumière et premier arrosage.</p></article>
        <article data-reveal><span>Inclus</span><h3>La base Signature</h3><p>Le Terreau Signature pour le rempotage d’une plante classique.</p></article>
        <article data-reveal><span>Non inclus</span><h3>Les besoins particuliers</h3><p>Pot, composants techniques supplémentaires, sujets XXL ou interventions complexes.</p></article>
      </div>
    </div></section>

    <section className={`shell ${styles.diagnostic}`} id="diagnostic">
      <header data-reveal><p className={styles.kicker}>02 · Observer</p><h2>Avant le geste,<br /><em>lire les racines.</em></h2><p>Une feuille jaune ou une croissance ralentie n’impose pas automatiquement un nouveau pot.</p></header>
      <div className={styles.diagnosticRows}>{signs.map(([title, copy], index) => <article key={title} data-reveal><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
    </section>

    <section className={styles.material} id="substrat"><div className={`shell ${styles.materialGrid}`}>
      <header data-reveal><p className={styles.kicker}>03 · Le mélange</p><h2>Un substrat n’est pas<br /><em>une recette universelle.</em></h2><p>Sa fonction est de créer un milieu racinaire cohérent avec la plante, la pièce, le contenant et votre façon d’arroser.</p></header>
      <div className={styles.materialRoles}>{substrateRoles.map(([title, copy], index) => <article key={title} data-reveal><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
      <aside className={styles.materialNote} data-reveal><span>Matières possibles</span><p>Terreau Signature, écorce de pin, perlite, sphaigne, charbon actif, vermiculite ou zéolite peuvent participer au mélange lorsque leur fonction est justifiée. Nous n’appliquons pas les mêmes composants à toutes les plantes.</p><Link href="/substrats">Comprendre les substrats <Arrow /></Link></aside>
    </div></section>

    <section className={`shell ${styles.container}`} aria-labelledby="container-title">
      <header data-reveal><p className={styles.kicker}>Le contenant</p><h2 id="container-title">Le bon pot laisse<br /><em>l’eau sortir.</em></h2></header>
      <div data-reveal><p className={styles.standfirst}>Le drainage commence par un trou d’évacuation.</p><p>Un pot percé légèrement plus large que la motte suffit souvent. Une couche de billes d’argile au fond d’un contenant fermé ne remplace pas ce trou : l’eau reste enfermée.</p><p>Un cache-pot peut recevoir un pot de culture percé, à condition de vider l’eau après l’arrosage.</p><Link href="/conseils/pot-perce-cache-pot-coupelle">Pot percé, cache-pot ou coupelle ? <Arrow /></Link></div>
    </section>

    <section className={styles.process} id="geste"><div className="shell">
      <header data-reveal><p className={styles.kicker}>04 · Le geste</p><h2>Préparer. Observer.<br /><em>Replanter.</em></h2></header>
      <div className={styles.processSteps}>{steps.map(([title, copy], index) => <article key={title} data-reveal><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
      <aside className={styles.aftercare} data-reveal><p className={styles.kicker}>Après le rempotage</p><div><h3>Laisser les racines reprendre.</h3><p>Arrosez selon les besoins de l’espèce et la texture du mélange, laissez toute l’eau s’écouler et évitez un changement brutal de lumière. Après une taille importante des racines, attendez avant de fertiliser.</p></div></aside>
    </div></section>

    <section className={`shell ${styles.boundaries}`} aria-labelledby="boundaries-title">
      <header data-reveal><p className={styles.kicker}>Une offre délimitée</p><h2 id="boundaries-title">Les grands sujets<br /><em>se préparent.</em></h2></header>
      <div data-reveal><p>Les plantes XXL, pots très lourds, ensembles difficiles à déplacer, mottes nécessitant plusieurs personnes et interventions en série ne relèvent pas du passage classique.</p><p>Envoyez une photo, la hauteur de la plante et le diamètre du pot avant votre venue. Le Studio confirme la faisabilité et vous indique si un devis est nécessaire.</p><Link className={styles.textAction} href="/contact">Contacter le Studio <Arrow /></Link></div>
    </section>

    <section className={styles.visit} id="venir" aria-labelledby="visit-title"><div className="shell">
      <header data-reveal><p className={styles.kicker}>05 · Venir</p><h2 id="visit-title">Votre plante.<br /><em>Notre table de travail.</em></h2></header>
      <div className={styles.visitDetails}>
        <article data-reveal><span>Adresse</span><h3>{jungleLocalIdentity.streetAddress}<br />{jungleLocalIdentity.postalCode} {jungleLocalIdentity.city}</h3><p>Studio Végétal — TIBALDO Jungle</p></article>
        <article data-reveal><span>Horaires</span><h3>Mardi · 14 h–19 h<br />Mercredi–samedi · 10 h–19 h<br />Dimanche · 10 h–13 h</h3><p>Lundi fermé.</p></article>
        <article data-reveal><span>Avant de venir</span><h3>Une plante classique peut venir sans rendez-vous.</h3><p>Un passage par semaine et par compte client. Pour plusieurs plantes ou un sujet hors normes, contactez-nous.</p></article>
      </div>
      <div className={styles.visitActions} data-reveal>
        <a href={`tel:${jungleLocalIdentity.phoneE164}`}>Appeler le Studio <Arrow /></a><a href={`mailto:${jungleLocalIdentity.email}`}>Écrire au Studio <Arrow /></a><a href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${jungleLocalIdentity.streetAddress}, ${jungleLocalIdentity.postalCode} ${jungleLocalIdentity.city}`)}`} target="_blank" rel="noreferrer">Itinéraire <Arrow /></a>
      </div>
    </div></section>

    <section className={`shell ${styles.faq}`} aria-labelledby="faq-title">
      <header data-reveal><p className={styles.kicker}>Questions fréquentes</p><h2 id="faq-title">Avant d’apporter<br /><em>votre plante.</em></h2></header>
      <div className={styles.faqList}>{faqs.map((item, index) => <details key={item.question} data-reveal><summary><span>{String(index + 1).padStart(2, "0")}</span><strong>{item.question}</strong><i aria-hidden="true" /></summary><p>{item.answer}</p></details>)}</div>
    </section>

    <nav className={`shell ${styles.related}`} aria-label="Ressources liées au rempotage" data-reveal>
      <Link href="/substrats-en-vrac-lille"><span>Matières</span><strong>Substrats en vrac à Lille</strong><Arrow /></Link><Link href="/pots-cache-pots-lille"><span>Contenants</span><strong>Pots et cache-pots</strong><Arrow /></Link><Link href="/sos-plantes"><span>Diagnostic</span><strong>SOS Plantes</strong><Arrow /></Link>
    </nav>

    <SiteFooter />
  </main>;
}
