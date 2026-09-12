import type { Metadata } from "next";
import Link from "next/link";
import LocalPresence from "../LocalPresence";
import ScrollReveal from "../ScrollReveal";
import { Arrow, SiteFooter, SiteHeader } from "../SiteChrome";
import { jungleLocalIdentity } from "@/lib/jungle-local-identity";

export const metadata: Metadata = {
  title: "Contact et boutique de plantes à Lille | TIBALDO Jungle",
  description: "TIBALDO Jungle, boutique de plantes et Studio Végétal : 3 place de l’Arbonnoise, 59000 Lille. Horaires, itinéraire GPS et contact.",
  alternates: { canonical: "/contact" },
};

const gpsLinks = {
  google: jungleLocalIdentity.mapsUrl,
  apple: "https://maps.apple.com/?daddr=3%20place%20de%20l%27Arbonnoise%2C%2059000%20Lille",
  waze: "https://www.waze.com/ul?q=3%20place%20de%20l%27Arbonnoise%2C%2059000%20Lille&navigate=yes",
};

export default function ContactPage() {
  return <main className="editorial-page contact-page">
    <ScrollReveal />
    <section className="inner-hero compact-inner-hero">
      <div className="inner-hero-texture" aria-hidden="true" /><div className="inner-hero-shade" aria-hidden="true" />
      <SiteHeader />
      <div className="shell inner-hero-content"><p className="eyebrow"><span /> Nous trouver · Lille</p><h1><span className="hero-line"><span>La jungle lilloise</span></span><span className="hero-line"><span><em>prend racine.</em></span></span></h1><p>Ouverture le 26 septembre 2026 au 3, place de l’Arbonnoise à Lille.</p><a className="button button-light" href="#itineraire">Choisir mon GPS <Arrow /></a></div>
    </section>

    <section className="contact-map-section shell">
      <div className="contact-map-copy" data-reveal>
        <p className="section-kicker">Votre itinéraire</p>
        <h2>Venez découvrir<br />le Studio Végétal.</h2>
        <p>Notre jardinerie urbaine ouvre à Lille le 26 septembre 2026 : un lieu pour choisir vos plantes, trouver un substrat adapté et demander conseil.</p>
        <p>Besoin d’une <Link href="/livraison-plantes-lille">livraison de plantes</Link> ou de <Link href="/fleurs-sur-commande-lille">fleurs sur commande</Link> ? Contactez le Studio pour préparer votre demande.</p>
        <p>Pour la location de matériel de soirée, retrouvez notre activité dédiée sur <a href="https://evenement.tibaldo.fr/">TIBALDO Événement</a>.</p>
        <div className="contact-details">
          <p><span>Adresse</span><strong>{jungleLocalIdentity.streetAddress}<br />{jungleLocalIdentity.postalCode} {jungleLocalIdentity.city}</strong></p>
          <p><span>Horaires</span><strong>Mardi · 14h–19h<br />Mercredi–samedi · 10h–19h<br />Dimanche · 10h–13h</strong></p>
          <p><span>Contact</span><strong><a href={`mailto:${jungleLocalIdentity.email}`}>{jungleLocalIdentity.email}</a><br /><a href={`tel:${jungleLocalIdentity.phoneE164}`}>{jungleLocalIdentity.phoneDisplay}</a></strong></p>
        </div>
        <div className="gps-chooser" id="itineraire">
          <p><span>Itinéraire GPS</span><strong>Ouvrir avec votre application préférée</strong></p>
          <div className="gps-options">
            <a data-action="route" href={gpsLinks.google} target="_blank" rel="noreferrer" aria-label="Ouvrir l’itinéraire vers Tibaldo Jungle dans Google Maps"><span>G</span>Google Maps <Arrow /></a>
            <a data-action="route" href={gpsLinks.apple} target="_blank" rel="noreferrer" aria-label="Ouvrir l’itinéraire vers Tibaldo Jungle dans Plans Apple"><span></span>Plans <Arrow /></a>
            <a data-action="route" href={gpsLinks.waze} target="_blank" rel="noreferrer" aria-label="Ouvrir l’itinéraire vers Tibaldo Jungle dans Waze"><span>W</span>Waze <Arrow /></a>
          </div>
        </div>
      </div>
      <LocalPresence />
    </section>
    <SiteFooter />
  </main>;
}
