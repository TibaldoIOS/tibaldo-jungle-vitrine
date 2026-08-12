"use client";

import { useMemo, useState } from "react";
import type { FlowerEntry } from "@/lib/flowers/catalog";

const normalize = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

export default function FlowerExplorer({ flowers }: { flowers: FlowerEntry[] }) {
  const [query, setQuery] = useState("");
  const [color, setColor] = useState("");
  const [season, setSeason] = useState("");
  const [style, setStyle] = useState("");
  const [use, setUse] = useState("");
  const [selection, setSelection] = useState<string[]>([]);
  const values = (key: "colors" | "seasons" | "styles" | "uses") => [...new Set(flowers.flatMap((flower) => flower[key]))].sort();
  const results = useMemo(() => flowers.filter((flower) => {
    const haystack = normalize([flower.name, flower.botanicalName, flower.family, flower.description].join(" "));
    return (!query || haystack.includes(normalize(query))) && (!color || flower.colors.includes(color)) && (!season || flower.seasons.includes(season)) && (!style || flower.styles.includes(style)) && (!use || flower.uses.includes(use));
  }), [flowers, query, color, season, style, use]);
  const toggle = (slug: string) => setSelection((current) => current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug]);
  const selectedNames = flowers.filter((flower) => selection.includes(flower.slug)).map((flower) => `${flower.name} (${flower.botanicalName})`);
  const mailto = `mailto:jungle@tibaldo.fr?subject=${encodeURIComponent("Projet de fleurs sur commande")}&body=${encodeURIComponent(`Bonjour Tibaldo Jungle,\n\nJe souhaite recevoir un devis pour un projet de fleurs coupées.\n\nMa sélection d’inspiration :\n${selectedNames.map((name) => `- ${name}`).join("\n") || "- À définir avec vous"}\n\nDate de l’événement :\nLieu :\nCouleurs / ambiance :\nQuantités estimées :\nRetrait au Studio ou livraison :\nBudget indicatif :\n\nMerci.`)}`;

  return <section className="flower-explorer shell" aria-labelledby="flower-explorer-title">
    <header data-reveal><p className="section-kicker">L’herbier des possibles</p><h2 id="flower-explorer-title">Chercher une fleur.<br /><em>Composer une intention.</em></h2><p>Explorez une sélection indicative. Les couleurs, longueurs et variétés exactes sont confirmées selon la saison et les arrivages professionnels.</p></header>
    <div className="flower-filter-panel" data-reveal>
      <label className="flower-query"><span>Nom courant ou botanique</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Gypsophile, Rosa, hortensia…" /></label>
      <div className="flower-filters"><label><span>Couleur</span><select value={color} onChange={(event) => setColor(event.target.value)}><option value="">Toutes</option>{values("colors").map((item) => <option key={item}>{item}</option>)}</select></label><label><span>Saison</span><select value={season} onChange={(event) => setSeason(event.target.value)}><option value="">Toutes</option>{values("seasons").map((item) => <option key={item}>{item}</option>)}</select></label><label><span>Style</span><select value={style} onChange={(event) => setStyle(event.target.value)}><option value="">Tous</option>{values("styles").map((item) => <option key={item}>{item}</option>)}</select></label><label><span>Utilisation</span><select value={use} onChange={(event) => setUse(event.target.value)}><option value="">Toutes</option>{values("uses").map((item) => <option key={item}>{item}</option>)}</select></label></div>
      <div className="flower-filter-status"><strong>{results.length} possibilités</strong><button type="button" onClick={() => { setQuery(""); setColor(""); setSeason(""); setStyle(""); setUse(""); }}>Effacer les filtres</button></div>
    </div>
    <div className="flower-grid">{results.map((flower, index) => <article key={flower.slug} className={selection.includes(flower.slug) ? "is-selected" : ""} data-reveal><div className={`flower-art flower-art-${index % 6}`} aria-hidden="true"><span>{flower.name.slice(0, 1)}</span></div><div className="flower-card-copy"><span>{flower.family} · {flower.category}</span><h3>{flower.name}</h3><i>{flower.botanicalName}</i><p>{flower.description}</p><ul><li>{flower.seasons.join(" · ")}</li><li>Tenue indicative : {flower.vaseLife}</li></ul><button type="button" onClick={() => toggle(flower.slug)}>{selection.includes(flower.slug) ? "Retirer de mon projet ✓" : "Ajouter à mon projet +"}</button></div></article>)}</div>
    <aside className={`flower-selection${selection.length ? " is-visible" : ""}`} aria-live="polite"><div><span>Votre sélection d’inspiration</span><strong>{selection.length} {selection.length > 1 ? "fleurs" : "fleur"}</strong></div><a href={mailto}>{selection.length ? "Demander un devis avec cette sélection" : "Commencer une demande"} <span>↗</span></a></aside>
  </section>;
}
