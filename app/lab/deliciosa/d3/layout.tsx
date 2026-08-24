import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LAB D3 — Cinematic Botanical Morphology · Monstera deliciosa",
  description: "Prototype local non publié de narration botanique cinématique.",
  alternates: { canonical: "/lab/deliciosa/d3" },
  robots: { index: false, follow: false, nocache: true },
};

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) { return children; }
