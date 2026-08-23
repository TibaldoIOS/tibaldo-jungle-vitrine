import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Deliciosa — laboratoire visuel",
  robots: { index: false, follow: false, nocache: true },
};

export default function DeliciosaLabLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
