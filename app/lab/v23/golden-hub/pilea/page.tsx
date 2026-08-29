import type { Metadata } from "next";
import { GoldenPileaHubPreview } from "../../_golden-pilea/GoldenPileaPreview";

export const metadata: Metadata = {
  title: "Golden Group V23 · Pilea",
  description: "Prototype isolé du langage visuel des hubs de genres Jungle.",
  robots: { index: false, follow: false },
};

export default function Page() { return <GoldenPileaHubPreview />; }
