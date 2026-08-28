import type { Metadata } from "next";
import SpeciesVisualNarrativeV2 from "@/app/plantes/SpeciesVisualNarrativeV2";
import { getPlant } from "@/lib/plants/catalog";

export const metadata: Metadata = { title: "Prototype V19 · Anthurium veitchii", robots: { index: false, follow: false } };

export default function Page() {
  const plant = getPlant("anthurium", "veitchii");
  if (!plant) return null;
  return <SpeciesVisualNarrativeV2 plant={plant} />;
}
