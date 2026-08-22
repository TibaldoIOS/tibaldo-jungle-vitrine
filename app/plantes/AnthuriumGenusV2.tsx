import type { PlantEntry } from "@/lib/plants/types";
import Link from "next/link";
import { Arrow } from "../SiteChrome";
import StudioAccessCompact from "./StudioAccessCompact";

type Guide = {
  name: string;
  lead: string;
  origin: string;
  facts: readonly { label: string; value: string }[];
  sections: readonly { title: string; text: string }[];
  problems: readonly { title: string; text: string }[];
  faq: readonly { question: string; answer: string }[];
  sources: readonly { label: string; url: string }[];
};

export default function AnthuriumGenusV2({ guide, editorials, plants }: { guide: Guide; editorials: readonly { title: string; text: string }[]; plants: PlantEntry[] }) {
  const gallery = plants.slice(0, 3);
  return <>
    <article className="anthurium-genus-v2">
      <section className="shell anth-v2-intro" data-reveal>
        <div><p className="section-kicker">Guide de culture · Lille</p><h2>Comprendre<br /><em>les Anthurium.</em></h2><p className="anth-v2-lead">{guide.lead}</p></div>
        <div className="anth-v2-origin"><span>Origine & diversité</span><p>{guide.origin}</p><strong>{plants.length}</strong><small>espèces documentées</small></div>
      </section>

      <section className="shell anth-v2-principles" aria-label="Principes de culture des Anthurium">
        {editorials.map((item, index) => <article key={item.title} data-reveal><span>0{index + 1}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}
      </section>

      <section className="anth-v2-culture"><div className="shell">
        <header data-reveal><p className="section-kicker">Les équilibres essentiels</p><h2>Lire la plante.<br /><em>Ajuster le geste.</em></h2></header>
        <div className="anth-v2-facts">{guide.facts.map((fact) => <article key={fact.label} data-reveal><span>{fact.label}</span><strong>{fact.value}</strong></article>)}</div>
        <div className="anth-v2-care-grid">
          {guide.sections.map((section, index) => <article className={`anth-v2-care-${index + 1}`} key={section.title} data-reveal><span>{String(index + 1).padStart(2, "0")}</span><h3>{section.title}</h3><p>{section.text}</p>{section.title.toLowerCase().includes("substrat") && <nav aria-label="Composants de substrat"><Link href="/substrats/ecorce-de-pin">Écorce</Link><Link href="/substrats/chips-coco">Coco</Link><Link href="/substrats/sphaigne-sechee">Sphaigne</Link><Link href="/substrats/perlite">Perlite</Link></nav>}</article>)}
        </div>
        <aside className="anth-v2-repotting" data-reveal><div><span>Service distinct du guide</span><h3>Besoin d’un coup de main ?</h3><p>Confiez votre plante au Bar à rempotage du Studio.</p></div><a className="button button-light" href="/rempotage-plantes-lille">Découvrir le Bar à rempotage <Arrow /></a></aside>
      </div></section>

      <section className="shell anth-v2-species" aria-labelledby="anth-v2-species-title">
        <header data-reveal><div><p className="section-kicker">Espèces & variétés documentées</p><h2 id="anth-v2-species-title">Des espèces,<br /><em>des caractères.</em></h2></div><p><strong>{plants.length}</strong><span>espèces documentées</span>Chaque fiche relie morphologie, culture et sources identifiées.</p></header>
        <div className="anth-v2-gallery">{gallery.map((plant, index) => <a href={`/plantes/anthurium/${plant.slug}`} key={plant.slug} data-reveal><figure><img src={plant.gallery[0].src} alt={plant.gallery[0].alt} width={plant.gallery[0].width} height={plant.gallery[0].height} loading="lazy" /><figcaption><small>0{index + 1} · {plant.taxonomy.family}</small><strong>{plant.botanicalName}</strong><span>{plant.subtitle}</span><b>Lire la fiche <Arrow /></b></figcaption></figure></a>)}</div>
        <div className="anth-v2-index" data-reveal><h3>Toutes les espèces</h3><div>{plants.map((plant, index) => <a href={`/plantes/anthurium/${plant.slug}`} key={plant.slug}><span>{String(index + 1).padStart(2, "0")}</span><strong>{plant.listingName ?? plant.botanicalName}</strong><small>{plant.taxonomy.species}</small><b aria-hidden="true">→</b></a>)}</div></div>
      </section>

      <section className="anth-v2-diagnostic"><div className="shell"><header data-reveal><p className="section-kicker">Diagnostic rapide</p><h2>Observer avant d’agir.</h2></header><div>{guide.problems.map((problem) => <article key={problem.title} data-reveal><span>Signe observé</span><h3>{problem.title}</h3><p>{problem.text}</p></article>)}</div><a href="/sos-plantes">Vous hésitez ? Ouvrir SOS Plantes <Arrow /></a></div></section>

      <section className="family-guide-faq shell anth-v2-faq"><header data-reveal><p className="section-kicker">Questions fréquentes</p><h2>Anthurium : les réponses essentielles.</h2></header>{guide.faq.map((item) => <details key={item.question} data-reveal><summary>{item.question}</summary><p>{item.answer}</p></details>)}<p className="family-guide-sources">Sources botaniques : {guide.sources.map((source, index) => <span key={source.url}>{index > 0 && " · "}<a href={source.url} target="_blank" rel="noreferrer">{source.label}</a></span>)}</p></section>
    </article>
    <StudioAccessCompact />
    <nav className="shell plant-back-link"><Link href="/plantes">← Tous les genres</Link></nav>
  </>;
}
