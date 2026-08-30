import type { PlantEntry } from "@/lib/plants/types";
import Link from "next/link";
import { Arrow } from "../SiteChrome";
import {
  CompositionFeature,
  EditorialFeature,
  MetricFeature,
  ProcessFeature,
  ServiceBridge,
} from "./GenusContentPrimitives";
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
  const [light, temperature, watering, substrate, nutrition, repotting] = guide.sections;
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
        <div className="anth-v21-compositions">
          <EditorialFeature className="anth-v21-light" label="Exposition" title="Lumière vive · indirecte" copy={light.text} />
          <MetricFeature className="anth-v21-temperature" label="Température" value={guide.facts[1].value} title="Chaleur stable." copy={temperature.text} />
          <MetricFeature className="anth-v21-humidity" label="Humidité" value="Élevée" title="mais ventilée." tone="sage" />
          <ProcessFeature
            className="anth-v21-watering"
            label="Arrosage"
            title="Observer avant d’arroser."
            copy={watering.text}
            steps={[
              { title: "Observer", text: "La surface commence à sécher." },
              { title: "Arroser", text: "Maintenir une humidité régulière." },
              { title: "Égoutter", text: "Laisser l’excédent quitter le contenant." },
              { title: "Laisser respirer", text: "Éviter l’asphyxie racinaire." },
            ]}
          />
          <CompositionFeature
            className="anth-v21-substrate"
            label="Substrat"
            title="De l’air autour des racines."
            copy={substrate.text}
            items={[
              { label: "Écorce", href: "/substrats/ecorce-de-pin" },
              { label: "Coco", href: "/substrats/chips-coco" },
              { label: "Sphaigne", href: "/substrats/sphaigne-sechee" },
              { label: "Minéral", href: "/substrats/perlite" },
            ]}
            result="Mélange aéré"
          />
          <EditorialFeature className="anth-v21-nutrition" label="Nutrition" title="Nourrir, sans forcer." copy={nutrition.text} tone="cream" />
          <ServiceBridge
            className="anth-v21-repotting"
            label="Conseil botanique"
            title="Besoin d’un coup de main ?"
            advice={repotting.text}
            serviceTitle="Bar à rempotage · Tibaldo Jungle"
            serviceCopy="Confiez votre plante au Bar à rempotage du Studio."
            href="/rempotage"
            cta="Découvrir le Bar à rempotage"
          />
        </div>
      </div></section>

      <section className="anth-v2-diagnostic"><div className="shell"><header data-reveal><p className="section-kicker">Diagnostic rapide</p><h2>Observer avant d’agir.</h2></header><div>{guide.problems.map((problem) => <article key={problem.title} data-reveal><span>Signe observé</span><h3>{problem.title}</h3><p>{problem.text}</p></article>)}</div><Link href="/sos-plantes">Vous hésitez ? Ouvrir SOS Plantes <Arrow /></Link></div></section>

      <section className="family-guide-local shell anth-v2-local-bridge" data-reveal>
        <p className="section-kicker">TIBALDO Jungle · Lille</p>
        <h2>Comprendre et choisir son Anthurium.</h2>
        <p>Découvrez et comparez les Anthurium, leurs particularités et leurs besoins. Pour connaître les plantes disponibles au Studio Végétal — TIBALDO Jungle à Lille, consultez la sélection du moment ou contactez-nous avant votre visite.</p>
        <div className="family-guide-local-actions">
          <Link className="button" href="/boutique-plantes-lille">Découvrir le Studio <Arrow /></Link>
          <Link className="text-link" href="/plantes/anthurium/veitchii">Lire la fiche Anthurium veitchii <Arrow /></Link>
        </div>
      </section>

      <section className="family-guide-faq shell anth-v2-faq"><header data-reveal><p className="section-kicker">Questions fréquentes</p><h2>Anthurium : les réponses essentielles.</h2></header>{guide.faq.map((item) => <details key={item.question} data-reveal><summary>{item.question}</summary><p>{item.answer}</p></details>)}<p className="family-guide-sources">Sources botaniques : {guide.sources.map((source, index) => <span key={source.url}>{index > 0 && " · "}<a href={source.url} target="_blank" rel="noreferrer">{source.label}</a></span>)}</p></section>
    </article>
    <StudioAccessCompact />
    <nav className="shell plant-back-link"><Link href="/plantes">← Tous les genres</Link></nav>
  </>;
}
