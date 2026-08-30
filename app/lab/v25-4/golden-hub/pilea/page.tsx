import type { Metadata } from "next";
import FinalMobileGoldenHubPilea from "../../_components/FinalMobileGoldenGroup";

export const metadata: Metadata = {
  title: "Golden Group V25.4 · Pilea",
  description: "Correction mobile finale isolée du Golden Group Pilea.",
  robots: { index: false, follow: false, nocache: true },
};

export default function GoldenGroupPileaV254Page() {
  return <FinalMobileGoldenHubPilea />;
}
