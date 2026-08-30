import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPlant } from "@/lib/plants/catalog";
import { CorrectedGoldenSpeciesVeitchii } from "../../_components/CorrectedGoldenReferences";

export const metadata: Metadata = {
  title: "Corrected Golden Species V25.1 · Anthurium veitchii",
  description: "Référence Owner isolée du langage Golden Species corrigé.",
  robots: { index: false, follow: false, nocache: true },
};

export default function Page() {
  const plant = getPlant("anthurium", "veitchii");
  if (!plant) notFound();
  return <CorrectedGoldenSpeciesVeitchii plant={plant} />;
}
