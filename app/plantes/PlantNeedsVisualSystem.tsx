import type { Level, PlantEntry } from "@/lib/plants/types";

type NeedIcon = "light" | "water" | "temperature" | "humidity" | "substrate" | "fertilizer" | "repotting" | "growth" | "support" | "toxicity" | "difficulty";

function Icon({ name }: { name: NeedIcon }) {
  const paths: Record<NeedIcon, React.ReactNode> = {
    light: <><circle cx="12" cy="12" r="3.5"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9 7 7M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1"/></>,
    water: <path d="M12 2s6 6.5 6 12a6 6 0 0 1-12 0c0-5.5 6-12 6-12Z"/>,
    temperature: <><path d="M10 14.8V5a2 2 0 1 1 4 0v9.8a4 4 0 1 1-4 0Z"/><path d="M12 9v7"/></>,
    humidity: <><path d="M8 3S3 8.2 3 12a5 5 0 0 0 10 0C13 8.2 8 3 8 3Z"/><path d="M16.5 7.5S14 10.3 14 12.2a2.5 2.5 0 0 0 5 0c0-1.9-2.5-4.7-2.5-4.7Z"/></>,
    substrate: <><path d="M3 9h18l-3 11H6L3 9Z"/><path d="M6 13h12M9 16h6M9 9c0-3 1.5-5 3-6 1.5 1 3 3 3 6"/></>,
    fertilizer: <><path d="M8 3h8v4l2 3v10H6V10l2-3V3Z"/><path d="M9 13h6M12 10v6"/></>,
    repotting: <><path d="M5 9h14l-2 11H7L5 9Z"/><path d="M12 9V3M12 6c-3 0-4-2-4-3 3 0 4 1 4 3ZM12 6c3 0 4-2 4-3-3 0-4 1-4 3Z"/></>,
    growth: <><path d="M12 21V4M12 9C8 9 6 7 5 4c4 0 6 1 7 5ZM12 14c4 0 6-2 7-5-4 0-6 1-7 5Z"/></>,
    support: <><path d="M8 22V2M16 22V2M5 7h14M5 14h14"/><path d="M8 18c6-1 3-8 8-10"/></>,
    toxicity: <><path d="M12 2 3 20h18L12 2Z"/><path d="M12 8v5M12 17h.01"/></>,
    difficulty: <><path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z"/></>,
  };
  return <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">{paths[name]}</svg>;
}

function Scale({ value, label }: { value: Level; label: string }) {
  return <div className="plant-need-scale" aria-label={`${label} : ${value} sur 5`}>{[1,2,3,4,5].map((step) => <i className={step <= value ? "is-on" : ""} key={step} />)}</div>;
}

export default function PlantNeedsVisualSystem({ plant }: { plant: PlantEntry }) {
  const items: { icon: NeedIcon; label: string; value: string; level?: Level; how: string; observe: string }[] = [
    { icon: "light", label: "Lumière", value: `${plant.care.light}/5`, level: plant.care.light, how: plant.care.lightText, observe: "Observez la distance entre les nouvelles feuilles et toute décoloration du limbe." },
    { icon: "water", label: "Arrosage", value: `${plant.care.water}/5`, level: plant.care.water, how: plant.care.watering, observe: "Contrôlez le mélange en profondeur et le poids du pot avant d’arroser de nouveau." },
    { icon: "humidity", label: "Humidité", value: `${plant.care.humidity}/5`, level: plant.care.humidity, how: plant.care.humidityText, observe: "Lisez les bords des nouvelles feuilles sans oublier la circulation de l’air." },
    { icon: "temperature", label: "Température", value: `${plant.filters.temperatureIdeal[0]}–${plant.filters.temperatureIdeal[1]} °C`, how: plant.care.temperature, observe: "Surveillez surtout les écarts brusques, les vitres froides et les courants d’air." },
    { icon: "substrate", label: "Substrat", value: plant.filters.substrateTags.slice(0, 2).join(" · "), how: plant.care.substrate, observe: "Le mélange doit reprendre de l’air après l’arrosage et laisser sortir tout excédent." },
    { icon: "fertilizer", label: "Fertilisation", value: "Croissance active", how: plant.care.fertilizing, observe: "Nourrissez la croissance visible, jamais une plante froide, sèche ou aux racines fragilisées." },
    { icon: "repotting", label: "Rempotage", value: "Selon les racines", how: plant.care.repotting, observe: "Décidez à partir de la motte et du drainage, pas seulement des racines visibles en surface." },
    { icon: "growth", label: "Croissance", value: plant.growth.speed, how: `${plant.growth.habit}. ${plant.growth.adultSize}.`, observe: "Comparez plusieurs feuilles successives pour distinguer croissance, acclimatation et repos." },
    { icon: "support", label: "Support", value: plant.filters.needsSupport ? "Recommandé" : "Selon le port", how: plant.filters.needsSupport ? "Un support vertical stable accompagne le port grimpant sans serrer les pétioles." : `Le port ${plant.growth.habit.toLowerCase()} n’impose pas automatiquement un tuteur.`, observe: "Suivez l’orientation des nouvelles pousses avant de contraindre la plante." },
    { icon: "toxicity", label: "Toxicité", value: plant.toxicity.level, how: plant.toxicity.summary, observe: plant.toxicity.details },
    { icon: "difficulty", label: "Difficulté", value: `${plant.care.difficulty}/5`, level: plant.care.difficulty, how: plant.care.difficultyText ?? "La stabilité du milieu compte davantage qu’une succession de corrections.", observe: "Commencez par stabiliser lumière, température et drainage avant d’ajouter un geste." },
  ];

  return <div className="plant-needs-visual-system">
    {items.map((item, index) => <article className={`plant-need plant-need-${item.icon}`} key={item.label} data-reveal>
      <header><span className="plant-need-icon"><Icon name={item.icon} /></span><small>{String(index + 1).padStart(2, "0")}</small><h3>{item.label}</h3><strong>{item.value}</strong></header>
      {item.level && <Scale value={item.level} label={item.label} />}
      <p><b>Comment.</b> {item.how}</p>
      <p><b>À observer.</b> {item.observe}</p>
    </article>)}
  </div>;
}
