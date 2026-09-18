"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";
import { potComparativeScale, potEditorialCatalog, potEditorialGroups, type PotEditorialEntry } from "../../lib/pots/catalog";

function PotCard({ variants }: { variants: PotEditorialEntry[] }) {
  const [selectedRepere, setSelectedRepere] = useState(variants[0].repere);
  const pot = variants.find((entry) => entry.repere === selectedRepere) ?? variants[0];

  return <article data-reveal>
    <div className="pots-collection-image" style={{ "--pot-scale": potComparativeScale(pot) } as CSSProperties}>
      <a href={pot.image} aria-label={`Agrandir le visuel de ${pot.name}`}>
        <Image key={pot.cropImage} src={pot.cropImage} alt={pot.alt} width={1254} height={1254} sizes="(max-width: 600px) 74vw, (max-width: 1000px) 36vw, 24vw" unoptimized />
      </a>
    </div>
    <div className="pots-collection-copy">
      <span>{variants.length > 1 ? "Modèle décliné" : `Modèle ${String(pot.repere).padStart(2, "0")}`}</span>
      <h3>{pot.name}</h3>
      {variants.length > 1 && <div className="pot-size-selector" role="group" aria-label={`Choisir le format de ${pot.name}`}>
        {variants.map((variant) => <button key={variant.repere} type="button" aria-pressed={variant.repere === pot.repere} onClick={() => setSelectedRepere(variant.repere)}>{variant.dimensions}</button>)}
      </div>}
      <strong>{pot.dimensions}</strong>
      <p>{pot.description}</p>
      <small>Visuel TIBALDO · mise en scène assistée par IA</small>
    </div>
  </article>;
}

export default function PotCollection() {
  const grouped = new Set<number>(potEditorialGroups.flatMap((group) => [...group.reperes]));
  const cards: PotEditorialEntry[][] = [];

  for (const pot of potEditorialCatalog) {
    const group = potEditorialGroups.find((entry) => entry.reperes[0] === pot.repere);
    if (group) cards.push(group.reperes.map((repere) => potEditorialCatalog.find((entry) => entry.repere === repere)!));
    else if (!grouped.has(pot.repere)) cards.push([pot]);
  }

  return <div className="pots-collection-grid">{cards.map((variants) => <PotCard key={variants.map((entry) => entry.repere).join("-")} variants={variants} />)}</div>;
}
