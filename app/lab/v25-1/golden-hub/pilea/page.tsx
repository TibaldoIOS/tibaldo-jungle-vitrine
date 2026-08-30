import type { Metadata } from "next";
import { CorrectedGoldenHubPilea } from "../../_components/CorrectedGoldenReferences";

export const metadata: Metadata = {
  title: "Corrected Golden Group V25.1 · Pilea",
  description: "Référence Owner isolée du langage Golden Group corrigé.",
  robots: { index: false, follow: false, nocache: true },
};

export default function Page() {
  return <CorrectedGoldenHubPilea />;
}
