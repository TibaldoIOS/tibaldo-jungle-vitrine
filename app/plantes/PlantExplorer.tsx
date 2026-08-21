"use client";

import { useMemo, useState } from "react";
import type { PlantEntry } from "@/lib/plants/types";

const normalize = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

export default function PlantExplorer({ plants }: { plants: readonly PlantEntry[] }) {
  const [query, setQuery] = useState("");
  const [family, setFamily] = useState("");
  const [genus, setGenus] = useState("");
  const [light, setLight] = useState("");
  const [watering, setWatering] = useState("");
  const [difficulty, setDifficulty] = useState("5");
  const [temperature, setTemperature] = useState("");
  const [moreOpen, setMoreOpen] = useState(false);
  const [habit, setHabit] = useState("");
  const [petSafe, setPetSafe] = useState(false);

  const families = [...new Set(plants.map((plant) => plant.taxonomy.family))].sort();
  const genera = [...new Set(plants.filter((plant) => !family || plant.taxonomy.family === family).map((plant) => plant.taxonomy.genus))].sort();
  const habits = [...new Set(plants.flatMap((plant) => plant.filters.habits))].sort();
  const results = useMemo(() => plants.filter((plant) => {
    const haystack = normalize([plant.botanicalName, plant.displayName, plant.taxonomy.family, plant.taxonomy.genus, plant.taxonomy.species, plant.taxonomy.cultivar ?? "", ...plant.taxonomy.commonNames, ...plant.synonyms].join(" "));
    return (!query || haystack.includes(normalize(query)))
      && (!family || plant.taxonomy.family === family)
      && (!genus || plant.taxonomy.genus === genus)
      && (!light || plant.filters.light === light)
      && (!watering || plant.filters.watering === watering)
      && plant.care.difficulty <= Number(difficulty)
      && (!temperature || plant.filters.temperatureMin <= Number(temperature))
      && (!habit || plant.filters.habits.includes(habit as PlantEntry["filters"]["habits"][number]))
      && (!petSafe || !plant.filters.petToxic);
  }), [plants, query, family, genus, light, watering, difficulty, temperature, habit, petSafe]);
  const hasActiveFilters = Boolean(query || family || genus || light || watering || difficulty !== "5" || temperature || habit || petSafe);

  const reset = () => { setQuery(""); setFamily(""); setGenus(""); setLight(""); setWatering(""); setDifficulty("5"); setTemperature(""); setHabit(""); setPetSafe(false); };

  return <section className="plant-search shell" id="recherche-plantes" aria-labelledby="plant-search-title">
    <header data-reveal><p className="section-kicker">Trouver votre plante</p><h2 id="plant-search-title">Chercher par nom.<br /><em>Explorer par besoins.</em></h2><p>Combinez plusieurs critères pour découvrir les plantes adaptées à votre lumière, votre température et votre expérience.</p></header>
    <div className="plant-search-panel">
      <label className="plant-search-query"><span>Recherche intelligente</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Monstera, deliciosa, Thai…" /></label>
      <div className="plant-search-filters">
        <label><span>Famille</span><select value={family} onChange={(event) => { setFamily(event.target.value); setGenus(""); }}><option value="">Toutes</option>{families.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label><span>Genre</span><select value={genus} onChange={(event) => setGenus(event.target.value)}><option value="">Tous</option>{genera.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label><span>Luminosité</span><select value={light} onChange={(event) => setLight(event.target.value)}><option value="">Toutes</option><option value="faible">Faible</option><option value="moyenne">Moyenne</option><option value="vive">Indirecte vive</option><option value="soleil">Soleil</option></select></label>
        <label><span>Difficulté maximum</span><select value={difficulty} onChange={(event) => setDifficulty(event.target.value)}>{[1,2,3,4,5].map((level) => <option value={level} key={level}>{"★".repeat(level)}{level === 1 ? " Très facile" : level === 2 ? " Facile" : level === 3 ? " Intermédiaire" : level === 4 ? " Difficile" : " Expert"}</option>)}</select></label>
      </div>
      <button className="plant-more-filters" type="button" onClick={() => setMoreOpen((value) => !value)} aria-expanded={moreOpen}>{moreOpen ? "Moins de filtres" : "Plus de filtres"}<span>{moreOpen ? "−" : "+"}</span></button>
      {moreOpen && <div className="plant-search-filters is-more">
        <label><span>Arrosage</span><select value={watering} onChange={(event) => setWatering(event.target.value)}><option value="">Tous</option><option value="faible">Faible</option><option value="modéré">Modéré</option><option value="régulier">Régulier</option><option value="élevé">Élevé</option></select></label>
        <label><span>Température de la pièce</span><select value={temperature} onChange={(event) => setTemperature(event.target.value)}><option value="">Indifférente</option><option value="10">10 °C minimum</option><option value="15">15 °C minimum</option><option value="18">18 °C minimum</option></select></label>
        <label><span>Port</span><select value={habit} onChange={(event) => setHabit(event.target.value)}><option value="">Tous</option>{habits.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label className="plant-search-check"><input type="checkbox" checked={petSafe} onChange={(event) => setPetSafe(event.target.checked)} /><span>Compatible animaux</span></label>
      </div>}
      <div className="plant-search-status"><strong>{hasActiveFilters ? `${results.length} ${results.length > 1 ? "plantes trouvées" : "plante trouvée"}` : "Saisissez un nom ou choisissez un filtre"}</strong><button type="button" onClick={reset}>Effacer les filtres</button></div>
    </div>
    {hasActiveFilters && <div className="plant-search-results">{results.length ? results.map((plant) => <a href={`/plantes/${plant.genre}/${plant.slug}`} key={`${plant.genre}-${plant.slug}`}><img src={plant.gallery[0].src} alt={plant.gallery[0].alt} width={plant.gallery[0].width} height={plant.gallery[0].height} loading="lazy" /><div><span>{plant.taxonomy.family} · {plant.taxonomy.genus}</span><h3>{plant.listingName ?? plant.botanicalName}</h3><p>{plant.subtitle}</p><ul><li>{"★".repeat(plant.care.difficulty)} difficulté</li><li>{plant.filters.light}</li><li>{plant.filters.temperatureMin} °C min.</li></ul></div></a>) : <div className="plant-search-empty"><h3>Aucune plante ne correspond encore.</h3><p>Élargissez un critère : l’encyclopédie s’enrichit progressivement.</p><button type="button" onClick={reset}>Réinitialiser</button></div>}</div>}
  </section>;
}
