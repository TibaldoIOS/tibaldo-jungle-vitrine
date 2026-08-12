"use client";
import { useMemo, useState } from "react";

const symptoms = [
  { id: "yellow", label: "Feuilles jaunes", result: "Vérifiez d’abord l’humidité au cœur du pot. Un substrat constamment humide, des racines sombres ou une odeur inhabituelle peuvent signaler un excès d’eau ou un début de pourriture." },
  { id: "dry", label: "Bords secs", result: "Les bords secs peuvent venir d’un arrosage irrégulier, d’un air très sec, de sels accumulés ou d’une exposition trop directe. Le contexte compte davantage qu’un seul symptôme." },
  { id: "pests", label: "Petites bêtes", result: "Isolez la plante des autres. Photographiez le revers des feuilles, les pétioles et les éventuelles toiles ou traces argentées afin d’identifier thrips, cochenilles ou araignées rouges." },
  { id: "roots", label: "Racines hors du pot", result: "Des racines visibles ne rendent pas toujours le rempotage urgent. Nous regardons la densité de la motte, la vitesse de séchage et la stabilité avant de conseiller un pot supérieur." },
  { id: "growth", label: "Croissance bloquée", result: "La lumière, la saison, la température et l’état racinaire doivent être vérifiés avant d’ajouter de l’engrais. Une plante au repos ou fragilisée n’a pas besoin d’être davantage nourrie." },
];

export default function SosPlantDiagnostic() {
  const [selected, setSelected] = useState(symptoms[0].id);
  const current = useMemo(() => symptoms.find((item) => item.id === selected) ?? symptoms[0], [selected]);
  const subject = encodeURIComponent(`SOS Plante — ${current.label}`);
  return <div className="sos-diagnostic" data-reveal>
    <div className="sos-symptom-list" role="tablist" aria-label="Choisir un symptôme">{symptoms.map((item, index) => <button key={item.id} type="button" role="tab" aria-selected={selected === item.id} onClick={() => setSelected(item.id)}><span>0{index + 1}</span>{item.label}</button>)}</div>
    <div className="sos-result" role="tabpanel"><p className="section-kicker">Première lecture</p><h2>{current.label}</h2><p>{current.result}</p><strong>Un diagnostic à distance reste indicatif : ne rempotez pas et ne traitez pas au hasard.</strong><a className="button button-green" href={`mailto:jungle@tibaldo.fr?subject=${subject}&body=Bonjour,%0A%0AVoici%20ma%20plante%20et%20son%20problème%20:%0A%0A`}>Envoyer mes photos ↗</a></div>
  </div>;
}
