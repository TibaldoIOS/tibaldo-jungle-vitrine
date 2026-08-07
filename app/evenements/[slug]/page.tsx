import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ScrollReveal from "../../ScrollReveal";
import { Arrow, SiteFooter, SiteHeader } from "../../SiteChrome";
import { eventFallbacks } from "@/lib/events/catalog";
import { getPublicEvent, listPublicEvents } from "@/lib/events/repository";
import { EventActions, EventCard, EventCountdown } from "../EventTools";

type Props = { params: Promise<{ slug: string }> };
export const dynamic = "force-dynamic";
export const generateStaticParams = () => eventFallbacks.map(({ slug }) => ({ slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = await getPublicEvent(slug);
  if (!event) return {};
  const url = `/evenements/${event.slug}`;
  return { title: event.seoTitle, description: event.seoDescription, keywords: event.seoKeywords, alternates: { canonical: url }, openGraph: { type: "article", locale: "fr_FR", url, title: event.seoTitle, description: event.seoDescription, images: [{ url: event.coverImage, alt: event.title }] }, twitter: { card: "summary_large_image", title: event.seoTitle, description: event.seoDescription, images: [event.coverImage] } };
}

export default async function EventPage({ params }: Props) {
  const { slug } = await params;
  const event = await getPublicEvent(slug);
  if (!event) notFound();
  const allEvents = await listPublicEvents();
  const others = allEvents.filter((item) => item.id !== event.id).slice(0, 3);
  const start = new Date(event.startAt);
  const end = event.endAt ? new Date(event.endAt) : null;
  const isPast = (end ?? start).getTime() < Date.now();
  const fullAddress = `${event.address}, ${event.postalCode} ${event.city}`;
  const schema = { "@context": "https://schema.org", "@graph": [
    { "@type": "Event", name: event.title, description: event.description, startDate: event.startAt, endDate: event.endAt, eventStatus: "https://schema.org/EventScheduled", eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode", image: [event.coverImage, ...event.gallery.map(({ src }) => src)].map((src) => `https://jungle.tibaldo.fr${src}`), location: { "@type": "Place", name: event.venueName, address: { "@type": "PostalAddress", streetAddress: event.address, postalCode: event.postalCode, addressLocality: event.city, addressCountry: "FR" } }, organizer: { "@type": "Organization", name: "Tibaldo Jungle — Studio Végétal", url: "https://jungle.tibaldo.fr" }, offers: { "@type": "Offer", price: "0", priceCurrency: "EUR", availability: "https://schema.org/InStock", url: `https://jungle.tibaldo.fr/evenements/${event.slug}/` } },
    { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Accueil", item: "https://jungle.tibaldo.fr/" }, { "@type": "ListItem", position: 2, name: "Événements", item: "https://jungle.tibaldo.fr/evenements/" }, { "@type": "ListItem", position: 3, name: event.title, item: `https://jungle.tibaldo.fr/evenements/${event.slug}/` }] },
    { "@type": "FAQPage", mainEntity: event.faq.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) },
  ] };
  return <main className="editorial-page event-detail"><ScrollReveal /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /><section className="event-detail-hero"><img src={event.coverImage} alt={`Ouverture de Tibaldo Jungle à ${event.city}`} width="1800" height="1200" /><div className="event-detail-shade" /><SiteHeader /><div className="shell event-detail-hero-copy"><a href="/evenements">Événements <span>·</span> Agenda</a><p className="eyebrow"><span /> {event.category} · {event.city}</p><h1>{event.title}</h1><p>{event.excerpt}</p></div></section><section className="event-essential"><div className="shell"><div><span>Date</span><strong>{new Intl.DateTimeFormat("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(start)}</strong></div><div><span>Horaires</span><strong>{new Intl.DateTimeFormat("fr-FR", { hour: "2-digit", minute: "2-digit" }).format(start)}{end && ` — ${new Intl.DateTimeFormat("fr-FR", { hour: "2-digit", minute: "2-digit" }).format(end)}`}</strong></div><div><span>Adresse</span><strong>{fullAddress}</strong></div></div></section><section className="shell event-story"><div data-reveal><p className="section-kicker">Une date à retenir</p><h2>Une nouvelle histoire<br /><em>végétale à Lille.</em></h2></div><div data-reveal><p>{event.description}</p>{isPast ? <p className="event-ended-badge">Cet événement est terminé — découvrez ses souvenirs ci-dessous.</p> : <EventCountdown startAt={event.startAt} />}<EventActions event={event} /></div></section><section className="event-program"><div className="shell"><header data-reveal><p className="section-kicker">Le programme</p><h2>Une journée pour<br /><em>découvrir et échanger.</em></h2></header><div>{event.program.map((item, index) => <article key={`${item.time}-${item.title}`} data-reveal><span>{String(index + 1).padStart(2, "0")}</span><time>{item.time}</time><div><h3>{item.title}</h3><p>{item.description}</p></div></article>)}</div></div></section>{event.videoUrl && <section className="shell event-video" data-reveal><iframe src={event.videoUrl} title={`Vidéo — ${event.title}`} loading="lazy" allowFullScreen /></section>}<section className="shell event-gallery"><header data-reveal><p className="section-kicker">Images & atmosphère</p><h2>Entrez dans<br /><em>la Jungle.</em></h2></header><div>{event.gallery.map((image, index) => <figure key={`${image.src}-${index}`} data-reveal><img src={image.src} alt={image.alt} loading="lazy" width="1200" height="900" /><figcaption>{image.caption}</figcaption></figure>)}</div></section><section className="event-location"><div className="shell"><div data-reveal><p className="section-kicker">Nous trouver</p><h2>{event.venueName}</h2><p>{event.address}<br />{event.postalCode} {event.city}</p><a className="button" href={event.mapsUrl ?? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`} target="_blank" rel="noreferrer">Itinéraire Google Maps <Arrow /></a>{event.facebookUrl && <a className="event-facebook-button" href={event.facebookUrl} target="_blank" rel="noreferrer">👉 Voir l’événement Facebook</a>}</div><iframe title={`Plan pour ${event.venueName}`} src={`https://www.google.com/maps?q=${encodeURIComponent(fullAddress)}&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div></section><section className="shell event-faq"><header data-reveal><p className="section-kicker">Questions fréquentes</p><h2>Préparer votre visite.</h2></header>{event.faq.map((item) => <details key={item.question} data-reveal><summary>{item.question}<span>+</span></summary><p>{item.answer}</p></details>)}</section>{others.length > 0 && <section className="shell other-events"><header><p className="section-kicker">Continuer l’agenda</p><h2>Autres événements.</h2></header><div className="event-card-grid">{others.map((item) => <EventCard event={item} key={item.id} />)}</div></section>}<nav className="shell plant-back-link"><a href="/evenements">← Tous les événements</a></nav><SiteFooter /></main>;
}
