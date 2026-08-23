import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LAB D — Jungle Scroll Story · Monstera deliciosa",
  description: "Prototype local non publié de narration botanique pilotée par le scroll.",
  alternates: { canonical: "/lab/deliciosa/d" },
  robots: { index: false, follow: false, nocache: true },
};

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
