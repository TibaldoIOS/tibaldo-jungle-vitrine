import type { Metadata } from "next";
import RefinedGoldenHubPilea from "../../_components/RefinedGoldenGroup";

export const metadata: Metadata = {
  title: "Corrected Golden Group V25.2 · Pilea",
  description: "Affinage Owner isolé du langage Golden Group Pilea.",
  robots: { index: false, follow: false, nocache: true },
};

export default function Page() {
  return <RefinedGoldenHubPilea />;
}
