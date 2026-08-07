import type { Metadata } from "next";
import ScrollReveal from "../ScrollReveal";
import { SiteFooter, SiteHeader } from "../SiteChrome";
import { listPublicEvents } from "@/lib/events/repository";
import { EventFilters } from "./EventTools";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Événements végétaux à Lille | Tibaldo Jungle", description: "Ateliers plantes, ouvertures, rempotage, portes ouvertes et événements végétaux organisés par Tibaldo Jungle au 3 place de l’Arbonnoise à Lille.", alternates: { canonical: "/evenements" }, openGraph: { title: "Événements Tibaldo Jungle à Lille", description: "Découvrez les prochains événements, ateliers et journées végétales de Tibaldo Jungle à Lille.", url: "/evenements", images: [{ url: "/opening-jungle.jpg", alt: "Événements Tibaldo Jungle à Lille" }] } };

export default async function EventsPage() {
  const events = await listPublicEvents();
  return <main className="editorial-page events-page"><ScrollReveal /><section className="events-index-hero"><div className="events-index-hero-image" /><div className="inner-hero-shade" /><SiteHeader /><div className="shell events-index-copy"><p className="eyebrow"><span /> Rencontres végétales · Lille</p><h1>La Jungle<br /><em>en mouvement.</em></h1><p>Ateliers, ouvertures, arrivages exceptionnels et moments de partage autour du vivant.</p></div></section><section className="shell events-index"><header data-reveal><p className="section-kicker">L’agenda Tibaldo Jungle</p><h2>Les prochains rendez-vous<br /><em>et leur histoire.</em></h2><p>Les événements passés restent accessibles : inspirations, galeries et conseils continuent de vivre après chaque rencontre.</p></header><EventFilters events={events} /></section><SiteFooter /></main>;
}
