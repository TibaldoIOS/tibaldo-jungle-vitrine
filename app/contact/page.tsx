import type { Metadata } from "next";
import ScrollReveal from "../ScrollReveal";
import { Arrow, SiteFooter, SiteHeader } from "../SiteChrome";
import { jungleLocalIdentity } from "@/lib/jungle-local-identity";

export const metadata: Metadata = {
  title: "Contact et boutique de plantes à Lille | TIBALDO Jungle",
  description: "TIBALDO Jungle, boutique de plantes et Studio Végétal : 3 place de l’Arbonnoise, 59000 Lille. Horaires, itinéraire GPS et contact.",
  alternates: { canonical: "/contact" },
};

const gpsLinks = {
  google: "https://www.google.com/maps/dir/?api=1&destination=3%20place%20de%20l%27Arbonnoise%2C%2059000%20Lille",
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
      <div className="contact-map reveal-right" data-reveal>
        <iframe title="Carte de Tibaldo Jungle, 3 place de l’Arbonnoise à Lille" src="https://www.google.com/maps?q=3%20place%20de%20l%27Arbonnoise%2C%2059000%20Lille&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        <div className="contact-map-label"><span>TIBALDO Jungle · Studio Végétal</span><strong>{jungleLocalIdentity.streetAddress} · {jungleLocalIdentity.city}</strong></div>
      </div>
    </section>
    <SiteFooter />
  </main>;
}
