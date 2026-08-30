import type { Metadata } from "next";
import FinalGoldenHubPilea from "../../_components/FinalGoldenGroup";

export const metadata: Metadata = {
  title: "Golden Group V25.3 · Pilea",
  description: "Art direction finale isolée du Golden Group Pilea.",
  robots: { index: false, follow: false, nocache: true },
};

export default function Page() {
  return <FinalGoldenHubPilea />;
}
