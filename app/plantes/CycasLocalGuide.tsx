import Link from "next/link";
import type { PlantEntry } from "@/lib/plants/types";
import { Arrow } from "../SiteChrome";
import styles from "./CycasLocalGuide.module.css";

export default function CycasLocalGuide({ plant }: { plant: PlantEntry }) {
  return (
    <section className={styles.section} aria-labelledby="cycas-lille-title" data-reveal>
      <header className={styles.heading}>
        <p className="section-kicker">Culture locale · Lille et Nord</p>
        <h2 id="cycas-lille-title">Cultiver un <em>Cycas revoluta</em> à Lille et dans le Nord.</h2>
      </header>

      <div className={styles.answer}>
        <strong>Peut-on cultiver un Cycas revoluta à Lille&nbsp;?</strong>
        <p>Oui, surtout en pot : il peut passer la belle saison dehors après une acclimatation progressive. Dans le Nord, la solution la plus prudente consiste à le placer en lumière vive, à maintenir un drainage rapide et à protéger ses racines du gel durable comme de la pluie froide hivernale.</p>
      </div>

      <div className={styles.detail}>
        <article>
          <h3>Pot ou pleine terre&nbsp;?</h3>
          <p>Le pot permet de déplacer la plante avant une période froide prolongée. Une plantation en pleine terre demande un emplacement exceptionnellement abrité, un sol très drainant et ne permet jamais de garantir la survie lors d’un hiver défavorable.</p>
        </article>
        <article>
          <h3>Quand le mettre à l’abri&nbsp;?</h3>
          <p>Ne raisonnez pas sur une température isolée. Anticipez une séquence de gel, un substrat qui reste humide ou des vents froids, puis placez le sujet dans un espace lumineux, ventilé et hors gel. Réduisez l’arrosage sans laisser les racines se dessécher totalement.</p>
        </article>
        <article>
          <h3>Retour dehors au printemps</h3>
          <p>Réhabituez progressivement les frondes au soleil sur plusieurs semaines. Une sortie brutale peut brûler un feuillage formé sous abri ; attendez aussi que le mélange sèche à un rythme régulier avant de reprendre les arrosages de croissance.</p>
        </article>
      </div>

      <nav className={styles.links} aria-label="Conseils liés au Cycas revoluta">
        <Link href="/plantes/cycas">Comparer les Cycas <Arrow /></Link>
        <Link href="/substrats">Comprendre les substrats drainants <Arrow /></Link>
        <Link href="/rempotage">Préparer un rempotage <Arrow /></Link>
        <Link href="/boutique-plantes-lille">Découvrir le Studio à Lille <Arrow /></Link>
      </nav>

      <div className={styles.sources} aria-label="Sources de la section Cycas revoluta">
        <span>Sources botaniques et horticoles</span>
        {plant.sources.map((source) => (
          <a href={source.url} target="_blank" rel="noreferrer" key={source.url}>{source.label} <Arrow /></a>
        ))}
      </div>
    </section>
  );
}
