import Link from "next/link";
import type { Metadata } from "next";
import ScrollReveal from "../ScrollReveal";
import { Arrow, SiteFooter, SiteHeader } from "../SiteChrome";
import { potEditorialCatalog } from "../../lib/pots/catalog";
import { shopUrl } from "../../lib/environment";
import PotCollection from "./PotCollection";

export const metadata: Metadata = {
  title: "Pots et cache-pots à Lille | Tibaldo Jungle",
  description: "Découvrez 16 pots et cache-pots photographiés par TIBALDO Jungle à Lille : formats, couleurs et finitions, avec conseil au Studio Végétal.",
  alternates: { canonical: "/pots-cache-pots-lille" },
  keywords: ["pots plantes Lille", "cache-pots Lille", "pot terre cuite Lille", "pot céramique plante Lille", "Studio Végétal Lille"],
};

const materials = [
  { id: "terre-cuite", number: "01", name: "Terre cuite", note: "Respirante & vivante", copy: "Une matière poreuse qui laisse une partie de l’humidité s’évacuer par les parois. Elle se patine avec le temps et convient particulièrement aux personnes qui préfèrent voir le pot évoluer." },
  { id: "ceramique", number: "02", name: "Céramique émaillée", note: "Couleurs & finitions", copy: "Mate, brillante, sobre ou colorée : la céramique habille la plante et protège le mobilier lorsqu’elle est utilisée comme cache-pot. Le pot de culture percé reste à l’intérieur." },
  { id: "mineral", number: "03", name: "Matières minérales", note: "Présence & stabilité", copy: "Grès, ciment et effets pierre apportent du poids aux plantes hautes ou généreuses. Leur étanchéité et leur trou d’évacuation doivent être vérifiés modèle par modèle." },
  { id: "leger", number: "04", name: "Contenants légers", note: "Pratiques & mobiles", copy: "Des matières légères, parfois recyclées, facilitent le déplacement des grands sujets. Elles sont utiles lorsque le poids final du pot, du substrat et de la plante devient important." },
];

const faq = [
  ["Comment vérifier la disponibilité d’un modèle ?", "Les disponibilités et les tarifs sont publiés par le Shop lorsqu’une offre est active. Contactez le Studio avant un déplacement pour un modèle précis."],
  ["Quelle différence entre un pot et un cache-pot ?", "Le pot de culture accueille directement les racines et doit normalement être percé. Le cache-pot est décoratif : il reçoit le pot percé et l’eau accumulée au fond doit être vidée."],
  ["Comment choisir le bon diamètre ?", "On évite généralement de surdimensionner. Le nouveau pot doit accompagner le volume réel des racines, sans créer une grande masse de substrat qui resterait humide trop longtemps."],
  ["Pourrez-vous rempoter directement dans un pot acheté au Studio ?", "Oui, selon le modèle et la plante. Le drainage, le diamètre, le poids et la faisabilité sont vérifiés avant l’intervention au bar à rempotage."],
] as const;

export default function PotsPage() {
  const schema = [{ "@context": "https://schema.org", "@type": "CollectionPage", name: "Pots et cache-pots à Lille", description: metadata.description, url: "https://jungle.tibaldo.fr/pots-cache-pots-lille", mainEntity: { "@type": "ItemList", numberOfItems: potEditorialCatalog.length, itemListElement: potEditorialCatalog.map((pot, index) => ({ "@type": "ListItem", position: index + 1, name: `${pot.name} ${pot.dimensions}` })) } }, { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) }];
  return <main className="editorial-page pots-page">
    <ScrollReveal />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <section className="pots-hero"><div className="pots-hero-art" aria-hidden="true"><i /><i /><i /></div><SiteHeader /><div className="shell pots-hero-copy"><p className="eyebrow"><span /> Pots & cache-pots · Lille</p><h1>Le contenant<br /><em>fait partie du vivant.</em></h1><p>Dix-neuf formats photographiés, du petit pot coloré au grand format : une sélection à découvrir au Studio Végétal, avec des dimensions clairement documentées.</p><a className="button button-light" href="#collection">Voir la collection <Arrow /></a></div><div className="pots-arrival"><span>Nouvelle sélection</span><strong>19 formats documentés</strong><small>Disponibilités à vérifier auprès du Shop ou du Studio</small></div></section>

    <section className="shell pots-intro" data-reveal><div><p className="section-kicker">Plus qu’un objet décoratif</p><h2>Choisir avec les yeux.<br /><em>Décider avec les racines.</em></h2></div><div><p>La sélection rassemble des silhouettes arrondies, des cylindres, des reliefs et des finitions colorées. Les dimensions affichées sont les dimensions extérieures communiquées pour chaque modèle.</p><p>Un beau contenant n’indique pas à lui seul son matériau, son perçage ou son usage extérieur. Ces caractéristiques doivent être vérifiées modèle par modèle avant de choisir comment installer la plante.</p></div></section>

    <section className="pots-collection" id="collection"><div className="shell"><header data-reveal><p className="section-kicker">Collection photographiée · Lille</p><h2>Quinze modèles.<br /><em>Dix-neuf formats.</em></h2><div><p>Les pots sont présentés à une échelle comparative fondée sur leur diamètre documenté. Trois modèles proposés dans plusieurs formats sont regroupés avec un choix explicite. Les visuels ne constituent pas une preuve de disponibilité : offres actives, prix et stocks restent vérifiables auprès du Shop.</p><a className="button pots-shop-link" href={shopUrl("/produits?type=pot")}>Voir les pots publiés au Shop <Arrow /></a></div></header><PotCollection /></div></section>

    <section className="pots-materials" id="matieres"><div className="shell"><header data-reveal><p className="section-kicker">Comprendre avant de rempoter</p><h2>Quatre familles<br /><em>de matières.</em></h2></header><div className="pots-material-grid">{materials.map((item) => <article id={item.id} key={item.id} data-reveal><span>{item.number}</span><small>{item.note}</small><div className="pot-shape" aria-hidden="true" /><h3>{item.name}</h3><p>{item.copy}</p></article>)}</div></div></section>

    <section className="shell pots-choice" data-reveal><div><p className="section-kicker">Pot ou cache-pot ?</p><h2>Le beau ne doit pas<br /><em>bloquer l’eau.</em></h2></div><div className="pots-choice-grid"><article><span>01 · Plantation directe</span><h3>Un pot percé</h3><p>L’excédent d’arrosage peut sortir. Ajoutez une coupelle adaptée et videz-la après l’écoulement.</p></article><article><span>02 · Solution décorative</span><h3>Un pot dans un cache-pot</h3><p>Conservez la plante dans un contenant percé, laissez-la égoutter puis retirez toute eau restée au fond du cache-pot.</p></article><article className="is-warning"><span>03 · À éviter</span><h3>Un contenant fermé</h3><p>Sauf système de culture réellement maîtrisé, planter directement dans un pot non percé expose les racines à une zone constamment saturée.</p></article></div><Link className="text-link" href="/conseils/pot-perce-cache-pot-coupelle">Lire le guide complet <Arrow /></Link></section>

    <section className="pots-service"><div className="shell"><div data-reveal><p className="section-kicker">Au Studio Végétal</p><h2>Le bon pot,<br /><em>au bon moment.</em></h2><p>Apportez votre plante : nous pouvons regarder les racines, mesurer la motte et vérifier si un changement de diamètre est réellement nécessaire.</p></div><div data-reveal><Link href="/rempotage"><span>Service</span><strong>Bar à rempotage</strong><Arrow /></Link><Link href="/substrats"><span>Matières</span><strong>Choisir le substrat</strong><Arrow /></Link><Link href="/contact"><span>Adresse</span><strong>Venir au Studio</strong><Arrow /></Link></div></div></section>

    <section className="shell local-seo-faq pots-faq"><header data-reveal><p className="section-kicker">Questions fréquentes</p><h2>Pots et cache-pots<br />à Lille.</h2></header>{faq.map(([question, answer]) => <details key={question} data-reveal><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</section>
    <SiteFooter />
  </main>;
}
