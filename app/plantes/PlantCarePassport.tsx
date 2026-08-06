import type { Level } from "@/lib/plants/types";

type Indicator = { label: string; value: Level; tone: "sage" | "gold" | "blue" | "coral" };

export default function PlantCarePassport({ indicators, substrate, nutrition }: { indicators: Indicator[]; substrate: string; nutrition: string }) {
  return <aside className="plant-care-passport" aria-label="Synthèse des besoins de culture"><div className="shell plant-care-passport-inner"><div className="plant-care-levels">{indicators.map((item) => <div className={`plant-care-level tone-${item.tone}`} key={item.label}><span>{item.label}</span><div aria-label={`${item.label} : ${item.value} sur 5`}>{[1,2,3,4,5].map((level) => <i className={level <= item.value ? "is-on" : ""} key={level} />)}</div><strong>{item.value}/5</strong></div>)}</div><div className="plant-care-summary"><p><span>Substrat</span><strong>{substrate}</strong></p><p><span>Nutrition</span><strong>{nutrition}</strong></p></div></div></aside>;
}
