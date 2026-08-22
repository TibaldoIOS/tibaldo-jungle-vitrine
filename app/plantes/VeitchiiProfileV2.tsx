import type { PlantEntry } from "@/lib/plants/types";
import { getPlantsByGenre } from "@/lib/plants/catalog";
import Link from "next/link";
import { Arrow } from "../SiteChrome";
import PlantSectionNav from "./PlantSectionNav";
import ScientificName from "./ScientificName";
import StudioAccessCompact from "./StudioAccessCompact";

function Need({ label, value, copy }: { label: string; value: number; copy: string }) {
  return <article className="veitchii-v2-need" data-reveal><header><span>{label}</span><strong>{value}<small>/5</small></strong></header><div aria-label={`${label} : ${value} sur 5`}>{[1,2,3,4,5].map((level) => <i className={level <= value ? "is-filled" : ""} key={level} />)}</div><p>{copy}</p></article>;
}

export default function VeitchiiProfileV2({ plant, gallery }: { plant: PlantEntry; gallery: PlantEntry["gallery"] }) {
  const neighbours = getPlantsByGenre("anthurium").filter((item) => item.slug !== plant.slug).slice(0, 3);
  return <>
    <div className="plant-profile-layout veitchii-v2-layout shell"><aside><PlantSectionNav /></aside><div className="plant-profile-content veitchii-v2-content">
      <section className="plant-profile-section veitchii-v2-identity" id="identite">
        <header><div><p className="section-kicker">Carte d’identité botanique</p><h2>Une espèce,<br /><em>sans ambiguïté.</em></h2></div><div>{plant.description.map((text) => <p key={text}>{text}</p>)}</div></header>
        <div className="veitchii-v2-id-grid">
          <article className="veitchii-v2-name"><span>Nom botanique</span><strong><ScientificName name={plant.botanicalName} /></strong><small>{plant.taxonomy.commonNames.join(" · ")}</small></article>
          <article className="veitchii-v2-origin"><span>Origine documentée</span><strong>Colombie</strong><p>Chocó · Antioquia</p><small>{plant.growth.habit}</small></article>
          <dl className="veitchii-v2-taxonomy">
            <div><dt>Famille</dt><dd><Link href={`/plantes/famille/${plant.taxonomy.family.toLowerCase()}`}>{plant.taxonomy.family}</Link></dd></div><div><dt>Genre</dt><dd><Link href="/plantes/anthurium">{plant.taxonomy.genus}</Link></dd></div><div><dt>Espèce</dt><dd><ScientificName name={plant.taxonomy.species} /></dd></div><div><dt>Ordre</dt><dd>{plant.taxonomy.order}</dd></div><div className="is-wide"><dt>Synonymes</dt><dd>{plant.synonyms.join(" · ")}</dd></div>
          </dl>
          <article className="veitchii-v2-habitat"><span>Habitat naturel</span><p>{plant.habitat}</p></article><article className="veitchii-v2-status"><span>Statut botanique</span><p>{plant.hybridization}</p></article>
          <article className="veitchii-v2-growth"><span>Croissance</span><strong>{plant.growth.speed}</strong></article><article className="veitchii-v2-growth"><span>Taille adulte</span><strong>{plant.growth.adultSize}</strong></article>
        </div>
        <aside className="specimen-note veitchii-v2-observation"><span>Observation Tibaldo Jungle</span><strong>{plant.specimen.observedHeight}</strong><p>{plant.specimen.note}</p></aside>
      </section>

      <section className="plant-profile-section veitchii-v2-needs" id="entretien"><header data-reveal><p className="section-kicker">Les bons équilibres</p><h2>Comprendre ses besoins.</h2><p>Quatre repères à lire ensemble : aucune jauge ne remplace l’observation du substrat, de la lumière et de la saison.</p></header><div className="veitchii-v2-needs-grid"><Need label="Lumière" value={plant.care.light} copy={plant.care.lightText} /><Need label="Arrosage" value={plant.care.water} copy={plant.care.watering} /><Need label="Humidité" value={plant.care.humidity} copy={plant.care.humidityText} /><Need label="Difficulté" value={plant.care.difficulty} copy={plant.care.difficultyText ?? "Une culture stable et attentive convient à cette espèce de collection."} /></div></section>

      <section className="plant-profile-section veitchii-v2-conditions"><header data-reveal><p className="section-kicker">Les conditions qui font la différence</p><h2>Prioriser plutôt<br /><em>que tout égaliser.</em></h2></header><div className="veitchii-v2-conditions-grid"><article className="is-temperature" data-reveal><span>Température</span><strong>18–27 °C</strong><p>{plant.care.temperature}</p></article><article className="is-substrate" data-reveal><span>Substrat épiphyte</span><h3>Air autour des racines.</h3><p>{plant.care.substrate}</p><nav><Link href="/substrats/ecorce-de-pin">Écorce</Link><Link href="/substrats/chips-coco">Coco</Link><Link href="/substrats/sphaigne-sechee">Sphaigne</Link><Link href="/substrats/perlite">Perlite</Link></nav></article><article data-reveal><span>Rempotage</span><p>{plant.care.repotting}</p><Link href="/rempotage-plantes-lille">Bar à rempotage <Arrow /></Link></article><article data-reveal><span>Fertilisation</span><p>{plant.care.fertilizing}</p></article><article data-reveal><span>Multiplication</span><p>{plant.care.propagation}</p></article></div><aside className="toxicity-card" data-reveal><div><span>Toxicité · {plant.toxicity.level}</span><strong>{plant.toxicity.summary}</strong></div><p>{plant.toxicity.details}</p></aside></section>

      {plant.localSpotlight && <aside className="plant-local-spotlight" data-reveal><p className="section-kicker">Culture locale</p><h2>{plant.localSpotlight.title}</h2><p>{plant.localSpotlight.text}</p></aside>}
      {plant.editorialSections?.map((section) => <section className="plant-profile-section plant-editorial-deep-dive" id={section.id} key={section.id} data-reveal><header><p className="section-kicker">{section.eyebrow}</p><h2>{section.title}</h2></header><div>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{section.points && <ul>{section.points.map((point) => <li key={point}>{point}</li>)}</ul>}</div></section>)}

      <section className="plant-profile-section veitchii-v2-problems" id="problemes"><header data-reveal><p className="section-kicker">Diagnostic prudent</p><h2>Un signe.<br /><em>Plusieurs pistes.</em></h2></header><div>{plant.problems.map((problem, index) => <details key={problem.title} data-reveal><summary><span>0{index + 1}</span><strong>{problem.title}</strong><i aria-hidden="true" /></summary><div><p><b>Causes possibles</b>{problem.cause}</p><p><b>Bon réflexe</b>{problem.advice}</p></div></details>)}</div><aside><div><span>Vous hésitez sur ce que vous observez ?</span><p>Envoyez-nous votre plante et quelques informations : la photo devient une pièce du dossier, pas un diagnostic automatique.</p></div><a className="button button-light" href="/sos-plantes">Demander un avis · SOS Plantes <Arrow /></a></aside></section>

      <section className="plant-profile-section" id="comparaison"><header className="plant-section-heading" data-reveal><p className="section-kicker">Plantes proches</p><h2>Ne plus les confondre.</h2></header><div className="plant-comparison-grid">{plant.comparisons.map((item) => <article key={item.name} data-reveal><span>À comparer</span><h3>{item.name}</h3><p>{item.difference}</p></article>)}</div></section>
      <section className="plant-gallery plant-profile-section" data-reveal><p className="section-kicker">Galerie végétale</p><div>{gallery.map((image) => <figure key={image.src}><img src={image.src} alt={image.alt} width={image.width} height={image.height} loading="lazy" /><figcaption>{image.caption}</figcaption></figure>)}</div></section>

      <section className="tibaldo-advice plant-profile-section veitchii-v2-advice" id="conseils" data-reveal><p className="section-kicker">Les réflexes du Studio</p><h2>Notre regard<br />au Studio.</h2><ol>{plant.tibaldoAdvice.map((advice,index) => <li key={advice}><span>0{index+1}</span><p>{advice}</p></li>)}</ol></section>

      <section className="plant-profile-section veitchii-v2-continue"><header data-reveal><p className="section-kicker">Continuer dans les Anthurium</p><h2>Trois autres<br /><em>caractères.</em></h2></header><div>{neighbours.map((item, index) => <Link href={`/plantes/anthurium/${item.slug}`} key={item.slug} data-reveal><span>0{index + 1}</span><strong>{item.displayName || item.botanicalName}</strong><small>{item.subtitle}</small><b aria-hidden="true">→</b></Link>)}</div><nav data-reveal><Link href="/plantes/anthurium">Voir tout le genre Anthurium</Link><Link href="/plantes">Retour à l’encyclopédie</Link></nav></section>

      <section className="plant-faq plant-profile-section" id="faq"><header className="plant-section-heading" data-reveal><p className="section-kicker">Questions fréquentes</p><h2>Tout savoir avant de l’accueillir.</h2></header><div>{plant.faq.map((item) => <details key={item.question} data-reveal><summary><strong>{item.question}</strong><span>+</span></summary><p>{item.answer}</p></details>)}</div></section>
      <section className="plant-sources" data-reveal><p className="section-kicker">Sources & prudence</p><p>Fiche croisée avec des références botaniques et horticoles identifiées. Les conditions de chaque intérieur peuvent modifier le comportement de la plante.</p><div>{plant.sources.map((source) => <a href={source.url} target="_blank" rel="noreferrer" key={source.url}>{source.label} <Arrow /></a>)}</div></section>
    </div></div>
    <StudioAccessCompact />
  </>;
}
