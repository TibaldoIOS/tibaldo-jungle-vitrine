import type { Metadata } from "next";
import { getPlant } from "@/lib/plants/catalog";
import VeitchiiGoldenV23 from "./VeitchiiGoldenV23";

export const metadata: Metadata = {
  title: "Golden Species V23 · Anthurium veitchii",
  description: "Prototype éditorial isolé de la fiche Golden Species Anthurium veitchii.",
  robots: { index: false, follow: false, nocache: true },
  alternates: { canonical: "/lab/v23/anthurium/veitchii" },
};

export default function Page() {
  const plant = getPlant("anthurium", "veitchii");
  if (!plant) return null;
  return <VeitchiiGoldenV23 plant={plant} />;
}

