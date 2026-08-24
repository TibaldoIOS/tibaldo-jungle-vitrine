import type { Metadata } from "next";
import "@/app/__lab/deliciosa/v4/v4.css";
export const metadata: Metadata = { title: "LAB V4 — Knowledge Scroll · Monstera deliciosa", description: "Prototype local non publié d’expérience botanique Knowledge Scroll.", alternates: { canonical: "/lab/deliciosa/v4" }, robots: { index: false, follow: false, nocache: true } };
export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) { return children; }
