import type { Metadata } from "next";
import "@/app/__lab/deliciosa/art-direction-v1/art-direction-v1.css";

export const metadata: Metadata = {
  title: "LAB — Monstera deliciosa · Art Direction V1",
  description: "Prototype local non publié de direction artistique et motion botanique.",
  robots: { index: false, follow: false, nocache: true },
};

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) { return children; }
