import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPlant } from "@/lib/plants/catalog";
import { GoldenPileaSpeciesPreview } from "../../_golden-pilea/GoldenPileaPreview";

export const metadata: Metadata = {
  title: "Golden Species V23 · Pilea peperomioides",
  description: "Prototype isolé du langage visuel des fiches espèces Jungle.",
  robots: { index: false, follow: false },
};

export default function Page() {
  const plant = getPlant("pilea", "peperomioides");
  if (!plant) notFound();
  return <GoldenPileaSpeciesPreview plant={plant} />;
}
