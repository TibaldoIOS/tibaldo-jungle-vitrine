import Image from "next/image";
import type { CSSProperties } from "react";
import type { PlantEntry } from "@/lib/plants/types";
import { getPlantsByGenre } from "@/lib/plants/catalog";
import Link from "next/link";
import { Arrow } from "../SiteChrome";
import PlantSectionNav from "./PlantSectionNav";
import ScientificName from "./ScientificName";
import StudioAccessCompact from "./StudioAccessCompact";
import { CompactFaq } from "./GenusRhythmInteractions";

type ScoreStyle = CSSProperties & { "--species-score": number };

function ScoreLine({ label, value, copy }: { label: string; value: number; copy: string }) {
  return <article className="thai-v3-score" style={{ "--species-score": value } as ScoreStyle} data-reveal>
    <header><span>{label}</span><strong>{value}<small>/5</small></strong></header>
    <div className="thai-v3-score-track" aria-label={`${label} : ${value} sur 5`}><i /></div>
    <p>{copy}</p>
  </article>;
}

export default function ThaiConstellationProfileV3({ plant, gallery }: { plant: PlantEntry; gallery: PlantEntry["gallery"] }) {
  const neighbours = getPlantsByGenre("monstera").filter((item) => item.slug !== plant.slug).slice(0, 3);
  const cultivarComparison = plant.comparisons.find((item) => item.name.includes("Albo"));
  return <>
    <div className="plant-profile-layout thai-v3-layout shell"><aside><PlantSectionNav /></aside><div className="plant-profile-content thai-v3-content">
      <section className="plant-profile-section thai-v3-identity" id="identite">
        <header data-reveal><p className="section-kicker">Identité botanique</p><h2>Une constellation,<br/><em>pas une espèce.</em></h2><div>{plant.description.map((text) => <p key={text}>{text}</p>)}</div></header>
        <div className="thai-v3-identity-sheet" data-reveal>
          <div className="thai-v3-name"><span>Nom botanique et cultivar</span><strong><ScientificName name={plant.botanicalName} /></strong><small>{plant.taxonomy.commonNames.join(" · ")}</small></div>
          <dl>
            <div><dt>Famille · Genre</dt><dd><Link href={`/plantes/famille/${plant.taxonomy.family.toLowerCase()}`}>{plant.taxonomy.family}</Link> · <Link href="/plantes/monstera">{plant.taxonomy.genus}</Link></dd></div>
            <div><dt>Ordre</dt><dd>{plant.taxonomy.order}</dd></div>
            <div><dt>Statut</dt><dd>{plant.hybridization}</dd></div>
            <div><dt>Port</dt><dd>{plant.growth.habit}</dd></div>
            <div><dt>Synonymes</dt><dd>{plant.synonyms.join(" · ")}</dd></div>
          </dl>
          <aside><span>Cultivar horticole</span><p>‘{plant.taxonomy.cultivar}’</p><small>{plant.origin}</small></aside>
        </div>
        <div className="thai-v3-habitat" data-reveal><span>Habitat et culture</span><p>{plant.habitat}</p><strong>{plant.growth.adultSize}</strong><small>{plant.growth.speed}</small></div>
        <aside className="specimen-note thai-v3-observation" data-reveal><span>Observation Tibaldo Jungle</span><strong>{plant.specimen.observedHeight}</strong><p>{plant.specimen.note}</p></aside>
      </section>

      <section className="plant-profile-section thai-v3-care" id="entretien">
        <header data-reveal><p className="section-kicker">Entretien · lire avant d’agir</p><h2>Quatre besoins.<br/><em>Quatre rythmes.</em></h2></header>
        <div className="thai-v3-care-grid">
          <ScoreLine label="Lumière" value={plant.care.light} copy={plant.care.lightText} />
          <article className="thai-v3-water" data-reveal><span>Arrosage · réflexe</span><ol><li><b>01</b> Observer le séchage</li><li><b>02</b> Arroser complètement</li><li><b>03</b> Laisser égoutter</li></ol><p>{plant.care.watering}</p></article>
          <ScoreLine label="Humidité" value={plant.care.humidity} copy={plant.care.humidityText} />
          <article className="thai-v3-difficulty" data-reveal><span>Difficulté</span><strong>{plant.care.difficulty}<small>/5</small></strong><p>{plant.care.difficultyText ?? "Une culture stable, lumineuse et attentive convient à ce cultivar panaché."}</p></article>
        </div>
      </section>

      <section className="plant-profile-section thai-v3-conditions">
        <header data-reveal><p className="section-kicker">Les conditions qui font la différence</p><h2>De l’air, de la lumière,<br/><em>un pot ajusté.</em></h2></header>
        <div className="thai-v3-temperature" data-reveal><span>Plage de culture</span><strong>{plant.care.temperature}</strong></div>
        <article className="thai-v3-substrate" data-reveal><div><span>Substrat · composition matière</span><h3>Respirant avant tout.</h3><p>{plant.care.substrate}</p></div><div>{plant.filters.substrateTags.map((tag) => <span key={tag}>{tag}</span>)}</div><nav><Link href="/substrats">Comprendre les substrats <Arrow /></Link></nav></article>
        <div className="thai-v3-culture-rhythm">
          <article data-reveal><span>Rempotage</span><h3>Quand</h3><p>Lorsque les racines occupent réellement le contenant.</p><h3>Comment</h3><p>{plant.care.repotting}</p><Link href="/rempotage-plantes-lille">Bar à rempotage <Arrow /></Link></article>
          <article data-reveal><span>Fertilisation</span><h3>En période lumineuse.</h3><p>{plant.care.fertilizing}</p></article>
          <article data-reveal><span>Multiplication</span><ol><li><b>01</b> Choisir un nœud actif</li><li><b>02</b> Bouturer ou diviser</li><li><b>03</b> Laisser la reprise s’établir</li></ol><p>{plant.care.propagation}</p></article>
        </div>
        <aside className="toxicity-card" data-reveal><div><span>Toxicité · {plant.toxicity.level}</span><strong>{plant.toxicity.summary}</strong></div><p>{plant.toxicity.details}</p></aside>
      </section>

      <section className="plant-profile-section thai-v3-problems" id="problemes"><header data-reveal><p className="section-kicker">Diagnostic prudent</p><h2>Un signe observé.<br/><em>Plusieurs causes possibles.</em></h2></header><div>{plant.problems.map((problem, index) => <details key={problem.title} data-reveal><summary><span>{String(index + 1).padStart(2, "0")}</span><strong>{problem.title}</strong><svg viewBox="0 0 20 20" aria-hidden="true"><path d="m5 8 5 5 5-5"/></svg></summary><div><p><b>Causes possibles</b>{problem.cause}</p><p><b>Bon réflexe</b>{problem.advice}</p></div></details>)}</div></section>

      <section className="plant-profile-section thai-v3-comparison" id="comparaison"><header data-reveal><p className="section-kicker">Ne plus les confondre</p><h2>Thai Constellation<br/><em>ou Albo ?</em></h2></header><div data-reveal><article><span>Thai Constellation</span><strong>Ponctuation crème.</strong><p>{plant.description[0]}</p></article><i aria-hidden="true">vs</i><article><span>Albo Variegata</span><strong>Contraste plus sectoriel.</strong><p>{cultivarComparison?.difference}</p></article></div><p>Comparaison textuelle : aucune photographie propriétaire d’Albo suffisamment documentée n’est affectée à ce module.</p></section>

      <section className="plant-profile-section thai-v3-neighbours"><header data-reveal><p className="section-kicker">Poursuivre l’exploration</p><h2>D’autres Monstera,<br/><em>d’autres silhouettes.</em></h2></header><div>{neighbours.map((item, index) => <Link href={`/plantes/monstera/${item.slug}`} key={item.slug} data-reveal><Image unoptimized src={item.gallery[0].src} alt={item.gallery[0].alt} width={item.gallery[0].width} height={item.gallery[0].height} loading="lazy"/><span>0{index + 1}</span><strong>{item.displayName}</strong><small>{item.subtitle}</small><Arrow /></Link>)}</div><Link className="thai-v3-back-genus" href="/plantes/monstera">Voir tout le genre Monstera <Arrow /></Link></section>

      <section className="plant-gallery plant-profile-section thai-v3-gallery" data-reveal><p className="section-kicker">Galerie végétale</p><div>{gallery.map((image) => <figure key={image.src}><Image unoptimized src={image.src} alt={image.alt} width={image.width} height={image.height} loading="lazy"/><figcaption>{image.caption}</figcaption></figure>)}</div></section>

      <section className="tibaldo-advice plant-profile-section thai-v3-advice" id="conseils" data-reveal><p className="section-kicker">Les réflexes du Studio</p><h2>Observer la plante,<br/><em>pas le calendrier.</em></h2><ol>{plant.tibaldoAdvice.map((advice,index) => <li key={advice}><span>0{index+1}</span><p>{advice}</p></li>)}</ol></section>

      <section className="plant-profile-section thai-v3-faq" id="faq"><header data-reveal><p className="section-kicker">Questions fréquentes</p><h2>Des réponses courtes,<br/><em>puis la nuance.</em></h2></header><CompactFaq items={plant.faq} name="Monstera Thai Constellation" /></section>
      <section className="plant-sources" data-reveal><p className="section-kicker">Sources & prudence</p><p>Fiche croisée avec des références botaniques et horticoles identifiées. Les conditions de chaque intérieur peuvent modifier le comportement de la plante.</p><div>{plant.sources.map((source) => <a href={source.url} target="_blank" rel="noreferrer" key={source.url}>{source.label} <Arrow /></a>)}</div></section>
    </div></div>
    <StudioAccessCompact />
  </>;
}
