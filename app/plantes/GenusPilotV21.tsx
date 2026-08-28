import Image from "next/image";
import type { PlantEntry } from "@/lib/plants/types";
import {
  isInternalPhotoProductionCopy,
  publicPlantImageAlt,
} from "@/lib/plants/types";
import Link from "next/link";
import { Arrow } from "../SiteChrome";
import {
  CompositionFeature,
  EditorialFeature,
  MetricFeature,
  ProcessFeature,
  ServiceBridge,
} from "./GenusContentPrimitives";
import { CompactFaq, SymptomIndex, type SymptomItem } from "./GenusRhythmInteractions";

type PilotGenre = "alocasia" | "chlorophytum" | "dicksonia";

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

function BotanicalFragment({ genre }: { genre: PilotGenre }) {
  return <span className={`pilot-botanical-fragment pilot-botanical-fragment-${genre}`} aria-hidden="true" data-motion="fragment" data-reveal />;
}

function SecondaryRhythm({ genre, guide, editorials }: {
  genre: PilotGenre;
  guide: Guide;
  editorials: readonly { title: string; text: string }[];
}) {
  if (genre === "alocasia") {
    const [portrait, local, roots] = editorials;
    if (!portrait || !local || !roots) return null;
    return (
      <section className="pilot-rhythm-secondary pilot-rhythm-alocasia" aria-label="Repères éditoriaux Alocasia">
        <div className="shell pilot-rhythm-grid">
          <article className="rhythm-lead" data-reveal data-motion="section">
            <span>01 · Architecture</span>
            <h2>{portrait.title}</h2>
            <p>{portrait.text}</p>
          </article>
          <article className="rhythm-local" data-reveal data-motion="composition">
            <BotanicalFragment genre={genre} />
            <span>02 · Lille</span>
            <h2>{local.title}</h2>
            <p>{local.text}</p>
            <ul aria-label="Trois facteurs à surveiller">
              <li><strong>Lumière</strong><small>Près d’une fenêtre</small></li>
              <li><strong>Hiver</strong><small>Arrosages réduits</small></li>
              <li><strong>Racines</strong><small>Sans eau stagnante</small></li>
            </ul>
          </article>
          <article className="rhythm-roots" data-reveal data-motion="process">
            <span>03 · Sous la surface</span>
            <h2>{roots.title}</h2>
            <p>{roots.text}</p>
            <ol>
              <li><b>01</b><strong>Pot percé</strong></li>
              <li><b>02</b><strong>Mélange aéré</strong></li>
              <li><b>03</b><strong>Nutrition mesurée</strong></li>
            </ol>
          </article>
        </div>
      </section>
    );
  }

  if (genre === "chlorophytum") {
    const [identity, , watering, substrate] = guide.sections;
    return (
      <section className="pilot-rhythm-secondary pilot-rhythm-chlorophytum" aria-label="Repères éditoriaux Chlorophytum">
        <div className="shell pilot-rhythm-strip">
          <BotanicalFragment genre={genre} />
          {[identity, watering, substrate].map((item, index) => item && (
            <article key={item.title} data-reveal data-motion="section">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h2>{item.title}</h2>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>
    );
  }

  const [identity, moisture, winter] = editorials;
  if (!identity || !moisture || !winter) return null;
  return (
    <section className="pilot-rhythm-secondary pilot-rhythm-dicksonia" aria-label="Repères éditoriaux Dicksonia">
      <div className="shell pilot-rhythm-grid">
        <article className="rhythm-identity" data-reveal data-motion="section">
          <span>01 · Identité</span>
          <h2>{identity.title}</h2>
          <p>{identity.text}</p>
        </article>
        <article className="rhythm-moisture" data-reveal data-motion="composition">
          <BotanicalFragment genre={genre} />
          <span>02 · Tissu vivant</span>
          <h2>{moisture.title}</h2>
          <p>{moisture.text}</p>
        </article>
        <article className="rhythm-winter" data-reveal data-motion="metric">
          <span>03 · Hiver</span>
          <strong>Le lieu<br /><em>avant le chiffre.</em></strong>
          <h2>{winter.title}</h2>
          <p>{winter.text}</p>
        </article>
      </div>
    </section>
  );
}

function symptomItemsFor(genre: PilotGenre, guide: Guide, plants: PlantEntry[]): SymptomItem[] {
  if (genre !== "alocasia" && plants[0]?.problems.length) {
    return plants[0].problems.slice(0, 4).map((problem) => ({
      title: problem.title,
      causes: problem.cause,
      reflex: problem.advice,
    }));
  }

  const reflexes = [
    "Contrôlez d’abord les racines et les conditions réelles avant de fertiliser.",
    "Stabilisez la culture et observez l’évolution des nouvelles feuilles.",
    "Isolez la plante et inspectez les jeunes pousses ainsi que le revers des feuilles.",
    "Retirez les parties atteintes et rempotez dans un mélange plus aéré.",
  ];
  return guide.problems.map((problem, index) => ({
    title: problem.title,
    causes: problem.text,
    reflex: reflexes[index] ?? "Observez les conditions réelles avant de modifier la culture.",
  }));
}

function AlocasiaCulture({ guide }: { guide: Guide }) {
  const [light, temperature, watering, humidity, substrate, nutrition] = guide.sections;
  return <div className="pilot-compositions pilot-compositions-alocasia">
    <EditorialFeature motion="editorial" className="pilot-alocasia-light" label="Exposition" title="Vive · filtrée." copy={light.text} tone="cream" />
    <MetricFeature motion="metric" className="pilot-alocasia-temperature" label="Température" value={guide.facts[1].value} title="La stabilité d’abord." copy={temperature.text} tone="forest" />
    <MetricFeature motion="metric" className="pilot-alocasia-humidity" label="Humidité" value="Moyenne" title="à élevée." copy={humidity.text} tone="sage" />
    <ProcessFeature
      motion="process"
      className="pilot-alocasia-watering"
      label="Arrosage"
      title="Humide ne veut pas dire détrempé."
      copy={watering.text}
      steps={[
        { title: "Observer", text: "Contrôler les premiers centimètres du mélange." },
        { title: "Arroser", text: "Humidifier toute la motte quand elle le demande." },
        { title: "Égoutter", text: "Laisser l’excédent quitter le pot percé." },
        { title: "Ajuster", text: "Espacer avec la baisse de lumière hivernale." },
      ]}
      tone="cream"
    />
    <CompositionFeature
      motion="composition"
      className="pilot-alocasia-substrate"
      label="Substrat"
      title="Riche, mais respirant."
      copy={substrate.text}
      items={[
        { label: "Terreau" },
        { label: "Écorce", href: "/substrats/ecorce-de-pin" },
        { label: "Coco", href: "/substrats/chips-coco" },
        { label: "Perlite", href: "/substrats/perlite" },
      ]}
      result="Racines aérées"
      tone="sage"
    />
    <EditorialFeature motion="editorial" className="pilot-alocasia-season" label="Nutrition" title="Accompagner la saison." copy={nutrition.text} tone="rose" />
    <ServiceBridge
      motion="service"
      className="pilot-alocasia-service"
      label="Conseil botanique"
      title="Rempoter selon les racines."
      advice={substrate.text}
      serviceTitle="Bar à rempotage · Tibaldo Jungle"
      serviceCopy="Le Studio ajuste le contenant et le mélange à la motte réelle."
      href="/rempotage-plantes-lille"
      cta="Découvrir le Bar à rempotage"
    />
  </div>;
}

function ChlorophytumCulture({ plant }: { plant: PlantEntry }) {
  return <div className="pilot-compositions pilot-compositions-chlorophytum">
    <EditorialFeature motion="editorial" className="pilot-chlorophytum-form" label="Silhouette" title="Une rosette qui se partage." copy={plant.description[0]} tone="cream" />
    <EditorialFeature motion="editorial" className="pilot-chlorophytum-light" label="Lumière" title="Vive, sans brûler." copy={`${plant.description[1]} ${plant.care.lightText}`} tone="sage" />
    <ProcessFeature
      motion="process"
      className="pilot-chlorophytum-stolons"
      label="Multiplication"
      title="Des stolons aux jeunes plants."
      copy={plant.care.propagation}
      steps={[
        { title: "Observer", text: "Les jeunes plantes apparaissent au bout des stolons." },
        { title: "Enraciner", text: "Elles s’enracinent facilement quand elles sont prêtes." },
      ]}
      tone="forest"
    />
    <EditorialFeature motion="editorial" className="pilot-chlorophytum-watering" label="Arrosage" title="Laisser le mélange respirer." copy={plant.care.watering} tone="cream" />
    <EditorialFeature motion="editorial" className="pilot-chlorophytum-substrate" label="Substrat" title="Simple · aéré · drainant." copy={plant.care.substrate} tone="sage" />
    <ServiceBridge
      motion="service"
      className="pilot-chlorophytum-service"
      label="Conseil botanique"
      title="Un pot à sa mesure."
      advice={plant.care.repotting}
      serviceTitle="Bar à rempotage · Tibaldo Jungle"
      serviceCopy="Un accompagnement simple pour conserver une touffe équilibrée."
      href="/rempotage-plantes-lille"
      cta="Découvrir le Bar à rempotage"
    />
  </div>;
}

function DicksoniaCulture({ plant }: { plant: PlantEntry }) {
  const idealTemperature = `${plant.filters.temperatureIdeal[0]}–${plant.filters.temperatureIdeal[1]} °C`;
  const idealHumidity = `${plant.filters.humidityIdeal[0]}–${plant.filters.humidityIdeal[1]} %`;
  return <div className="pilot-compositions pilot-compositions-dicksonia">
    <EditorialFeature motion="editorial" className="pilot-dicksonia-light" label="Exposition" title="L’ombre lumineuse." copy={plant.care.lightText} tone="forest" />
    <MetricFeature motion="metric" className="pilot-dicksonia-temperature" label="Ambiance idéale" value={idealTemperature} title="Fraîche à tempérée." copy={plant.care.temperature} tone="cream" />
    <MetricFeature motion="metric" className="pilot-dicksonia-humidity" label="Humidité idéale" value={idealHumidity} title="avec de l’air." copy={plant.care.humidityText} tone="sage" />
    <ProcessFeature
      motion="process"
      className="pilot-dicksonia-watering"
      label="Eau"
      title="Humidifier sans enfermer."
      copy={plant.care.watering}
      steps={[
        { title: "Motte", text: "La maintenir fraîche sans la saturer." },
        { title: "Stipe", text: "L’humidifier doucement pendant la croissance." },
        { title: "Couronne", text: "Ne jamais y laisser d’eau froide stagnante." },
      ]}
      tone="cream"
    />
    <CompositionFeature
      motion="composition"
      className="pilot-dicksonia-substrate"
      label="Substrat"
      title="Un sol de sous-bois, maîtrisé."
      copy={plant.care.substrate}
      items={[
        { label: "Humifère" },
        { label: "Organique" },
        { label: "Frais" },
        { label: "Drainant" },
      ]}
      result="Motte vivante"
      tone="sage"
    />
    <EditorialFeature motion="editorial" className="pilot-dicksonia-winter" label="Hiver à Lille" title="Protéger le lieu, pas un chiffre." copy={plant.care.temperature} tone="rose" />
    <ServiceBridge
      motion="service"
      className="pilot-dicksonia-service"
      label="Conseil botanique"
      title="Préserver le stipe et la couronne."
      advice={plant.care.repotting}
      serviceTitle="Bar à rempotage · Tibaldo Jungle"
      serviceCopy="Le Studio vérifie stabilité, drainage et volume avant toute intervention."
      href="/rempotage-plantes-lille"
      cta="Découvrir le Bar à rempotage"
    />
  </div>;
}

function CultureSystem({ genre, guide, plants }: { genre: PilotGenre; guide: Guide; plants: PlantEntry[] }) {
  if (genre === "alocasia") return <AlocasiaCulture guide={guide} />;
  const plant = plants[0];
  if (!plant) return null;
  return genre === "chlorophytum" ? <ChlorophytumCulture plant={plant} /> : <DicksoniaCulture plant={plant} />;
}

export default function GenusPilotV21({ genre, guide, editorials, plants }: {
  genre: PilotGenre;
  guide: Guide;
  editorials: readonly { title: string; text: string }[];
  plants: PlantEntry[];
}) {
  const symptoms = symptomItemsFor(genre, guide, plants);
  return <>
    <article className={`genus-pilot-v21 genus-motion-v1 genus-pilot-${genre}`}>
      <section className="shell pilot-v21-intro" data-reveal data-motion="section">
        <div><p className="section-kicker">Guide de culture · Lille</p><h2>Comprendre<br /><em>les {guide.name}.</em></h2></div>
        <div className="pilot-v21-intro-copy"><p>{guide.lead}</p><p>{guide.origin}</p><strong>{plants.length}</strong><small>{plants.length > 1 ? "fiches documentées" : "fiche documentée"}</small></div>
      </section>

      <SecondaryRhythm genre={genre} guide={guide} editorials={editorials} />

      <section className="pilot-v21-culture"><div className="shell">
        <header data-reveal data-motion="section"><p className="section-kicker">Les équilibres du genre</p><h2>Observer le milieu.<br /><em>Adapter le geste.</em></h2></header>
        <div className="pilot-v21-facts">{guide.facts.map((fact) => <article key={fact.label} data-reveal data-motion="metric"><span>{fact.label}</span><strong>{fact.value}</strong></article>)}</div>
        <CultureSystem genre={genre} guide={guide} plants={plants} />
      </div></section>

      <section className="pilot-v21-diagnostic"><div className="shell">
        <header data-reveal data-motion="section"><p className="section-kicker">Diagnostic rapide</p><h2>Observer avant d’agir.</h2></header>
        <SymptomIndex items={symptoms} />
        <Link href="/sos-plantes">Vous hésitez ? Ouvrir SOS Plantes <Arrow /></Link>
      </div></section>

      <section className="family-guide-faq shell pilot-v21-faq">
        <header data-reveal data-motion="section"><p className="section-kicker">Questions fréquentes</p><h2>{guide.name} : les réponses essentielles.</h2></header>
        <CompactFaq items={guide.faq} name={guide.name} />
        <p className="family-guide-sources">Sources botaniques : {guide.sources.map((source, index) => <span key={source.url}>{index > 0 && " · "}<a href={source.url} target="_blank" rel="noreferrer">{source.label}</a></span>)}</p>
      </section>
    </article>

    <section className="plant-index shell pilot-v21-index">
      <div data-reveal data-motion="section"><p className="section-kicker">Espèces et variétés documentées</p><h2>{plants.length ? <>Une famille.<br />Des caractères singuliers.</> : <>La collection<br />se prépare.</>}</h2><p>{plants.length ? "Chaque fiche repose sur l’observation, la culture et des sources botaniques identifiées." : `Les premières fiches ${guide.name} seront ajoutées au fil des plantes observées et proposées au Studio.`}</p></div>
      {plants.length > 0 && <div className="plant-index-grid">{plants.map((plant) => <Link href={`/plantes/${genre}/${plant.slug}`} key={plant.slug} data-reveal><Image unoptimized src={plant.gallery[0].src} alt={publicPlantImageAlt(plant.gallery[0].src, plant.botanicalName, plant.gallery[0].alt)} width={plant.gallery[0].width} height={plant.gallery[0].height} /><span>{plant.family} · {isInternalPhotoProductionCopy(plant.specimen.observedHeight) ? plant.growth.habit : plant.specimen.observedHeight}</span><h2>{plant.listingName ?? plant.botanicalName}</h2><p>{plant.subtitle}</p><strong>Lire la fiche <Arrow /></strong></Link>)}</div>}
    </section>
    <nav className="shell plant-back-link"><Link href="/plantes">← Tous les genres</Link></nav>
  </>;
}
