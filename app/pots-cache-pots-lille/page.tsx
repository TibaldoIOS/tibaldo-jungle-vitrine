import Link from "next/link";
import type { Metadata } from "next";
import ScrollReveal from "../ScrollReveal";
import { Arrow, SiteFooter, SiteHeader } from "../SiteChrome";

export const metadata: Metadata = {
  title: "Pots et cache-pots à Lille | Tibaldo Jungle",
  description: "Pots percés et cache-pots à Lille : terre cuite, céramique, matières minérales et contenants légers. Arrivages en préparation au Studio Végétal Tibaldo Jungle.",
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
  ["Quand les pots et cache-pots seront-ils disponibles ?", "Les premiers arrivages sont en cours de sélection. Les modèles, diamètres, couleurs et tarifs seront publiés après réception et contrôle au Studio."],
  ["Quelle différence entre un pot et un cache-pot ?", "Le pot de culture accueille directement les racines et doit normalement être percé. Le cache-pot est décoratif : il reçoit le pot percé et l’eau accumulée au fond doit être vidée."],
  ["Comment choisir le bon diamètre ?", "On évite généralement de surdimensionner. Le nouveau pot doit accompagner le volume réel des racines, sans créer une grande masse de substrat qui resterait humide trop longtemps."],
  ["Pourrez-vous rempoter directement dans un pot acheté au Studio ?", "Oui, selon le modèle et la plante. Le drainage, le diamètre, le poids et la faisabilité sont vérifiés avant l’intervention au bar à rempotage."],
] as const;

export default function PotsPage() {
  const schema = [{ "@context": "https://schema.org", "@type": "CollectionPage", name: "Pots et cache-pots à Lille", description: metadata.description, url: "https://jungle.tibaldo.fr/pots-cache-pots-lille" }, { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) }];
  return <main className="editorial-page pots-page">
    <ScrollReveal />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <section className="pots-hero"><div className="pots-hero-art" aria-hidden="true"><i /><i /><i /></div><SiteHeader /><div className="shell pots-hero-copy"><p className="eyebrow"><span /> Pots & cache-pots · Lille</p><h1>Le contenant<br /><em>fait partie du vivant.</em></h1><p>Une sélection de pots percés et de cache-pots arrive au Studio : différentes matières, différents formats et le même objectif — laisser les racines vivre dans un volume cohérent.</p><a className="button button-light" href="#matieres">Découvrir les matières <Arrow /></a></div><div className="pots-arrival"><span>Arrivages</span><strong>Sélection en cours</strong><small>Formats, coloris et tarifs prochainement</small></div></section>

    <section className="shell pots-intro" data-reveal><div><p className="section-kicker">Plus qu’un objet décoratif</p><h2>Choisir avec les yeux.<br /><em>Décider avec les racines.</em></h2></div><div><p>Le pot influence le séchage du substrat, la stabilité de la plante et la place disponible pour les racines. Sa matière, son diamètre et la présence d’un trou d’évacuation comptent autant que sa couleur.</p><p>La future sélection Tibaldo Jungle réunira des contenants décoratifs et techniques pour les petites plantes, les collections tropicales et les grands sujets. Les disponibilités évolueront selon les arrivages.</p></div></section>

    <section className="pots-materials" id="matieres"><div className="shell"><header data-reveal><p className="section-kicker">La collection en préparation</p><h2>Quatre familles<br /><em>de matières.</em></h2></header><div className="pots-material-grid">{materials.map((item) => <article id={item.id} key={item.id} data-reveal><span>{item.number}</span><small>{item.note}</small><div className="pot-shape" aria-hidden="true" /><h3>{item.name}</h3><p>{item.copy}</p></article>)}</div></div></section>

    <section className="shell pots-choice" data-reveal><div><p className="section-kicker">Pot ou cache-pot ?</p><h2>Le beau ne doit pas<br /><em>bloquer l’eau.</em></h2></div><div className="pots-choice-grid"><article><span>01 · Plantation directe</span><h3>Un pot percé</h3><p>L’excédent d’arrosage peut sortir. Ajoutez une coupelle adaptée et videz-la après l’écoulement.</p></article><article><span>02 · Solution décorative</span><h3>Un pot dans un cache-pot</h3><p>Conservez la plante dans un contenant percé, laissez-la égoutter puis retirez toute eau restée au fond du cache-pot.</p></article><article className="is-warning"><span>03 · À éviter</span><h3>Un contenant fermé</h3><p>Sauf système de culture réellement maîtrisé, planter directement dans un pot non percé expose les racines à une zone constamment saturée.</p></article></div><Link className="text-link" href="/conseils/pot-perce-cache-pot-coupelle">Lire le guide complet <Arrow /></Link></section>

    <section className="pots-service"><div className="shell"><div data-reveal><p className="section-kicker">Au Studio Végétal</p><h2>Le bon pot,<br /><em>au bon moment.</em></h2><p>Apportez votre plante : nous pouvons regarder les racines, mesurer la motte et vérifier si un changement de diamètre est réellement nécessaire.</p></div><div data-reveal><Link href="/rempotage"><span>Service</span><strong>Bar à rempotage</strong><Arrow /></Link><Link href="/substrats"><span>Matières</span><strong>Choisir le substrat</strong><Arrow /></Link><Link href="/contact"><span>Adresse</span><strong>Venir au Studio</strong><Arrow /></Link></div></div></section>

    <section className="shell local-seo-faq pots-faq"><header data-reveal><p className="section-kicker">Questions fréquentes</p><h2>Pots et cache-pots<br />à Lille.</h2></header>{faq.map(([question, answer]) => <details key={question} data-reveal><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</section>
    <SiteFooter />
  </main>;
}
