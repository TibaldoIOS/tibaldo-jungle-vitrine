import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LAB D2 — Jungle Cinematic Botanical · Monstera deliciosa",
  description: "Prototype local non publié de narration botanique cinématique.",
  alternates: { canonical: "/lab/deliciosa/d2" },
  robots: { index: false, follow: false, nocache: true },
};

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) { return children; }
