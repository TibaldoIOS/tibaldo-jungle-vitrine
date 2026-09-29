import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ScrollReveal from "../../ScrollReveal";
import { SiteFooter, SiteHeader } from "../../SiteChrome";
import { eventFallbacks } from "@/lib/events/catalog";
import { getPublicEvent, listPublicEvents } from "@/lib/events/repository";
import { EventActions, EventCard, EventCountdown } from "../EventTools";
import GpsChooser from "../../GpsChooser";
import LocalPresence from "../../LocalPresence";
import { jungleLocalIdentity } from "@/lib/jungle-local-identity";

type Props = { params: Promise<{ slug: string }> };
export const dynamic = "force-dynamic";
export const generateStaticParams = () =>
  eventFallbacks.map(({ slug }) => ({ slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = await getPublicEvent(slug);
  if (!event) return {};
  const url = `/evenements/${event.slug}`;
  const isOpeningPage = event.slug === "ouverture-tibaldo-jungle-lille";
  const socialTitle = isOpeningPage
    ? "Inauguration du Studio Végétal à Lille — archive du 26 septembre 2026"
    : event.seoTitle;
  const socialDescription = isOpeningPage
    ? "Archive de l’inauguration du Studio Végétal TIBALDO Jungle, organisée le 26 septembre 2026 au 3 place de l’Arbonnoise à Lille."
    : event.seoDescription;
  return {
    title: isOpeningPage ? "Inauguration du Studio Végétal à Lille — archive" : event.seoTitle,
    description: socialDescription,
    keywords: event.seoKeywords,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      locale: "fr_FR",
      url,
      title: socialTitle,
      description: socialDescription,
      images: [{ url: event.coverImage, alt: event.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: socialDescription,
      images: [event.coverImage],
    },
  };
}

export default async function EventPage({ params }: Props) {
  const { slug } = await params;
  const event = await getPublicEvent(slug);
  if (!event) notFound();
  const allEvents = await listPublicEvents();
  const others = allEvents.filter((item) => item.id !== event.id).slice(0, 3);
  const start = new Date(event.startAt);
  const end = event.endAt ? new Date(event.endAt) : null;
  // The public status must follow real time; this server route is intentionally dynamic.
  // eslint-disable-next-line react-hooks/purity
  const isPast = (end ?? start).getTime() < Date.now();
  const fullAddress = `${event.address}, ${event.postalCode} ${event.city}`;
  const isOpening = event.slug === "ouverture-tibaldo-jungle-lille";
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Event",
        "@id": `https://jungle.tibaldo.fr/evenements/${event.slug}#event`,
        url: `https://jungle.tibaldo.fr/evenements/${event.slug}`,
        name: event.title,
        description: event.description,
        startDate: event.startAt,
        ...(event.endAt ? { endDate: event.endAt } : {}),
        eventStatus: isPast ? "https://schema.org/EventCompleted" : "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        isAccessibleForFree: true,
        keywords: event.seoKeywords.join(", "),
        image: [event.coverImage, ...event.gallery.map(({ src }) => src)].map(
          (src) => `https://jungle.tibaldo.fr${src}`,
        ),
        location: {
          "@type": "Place",
          name: event.venueName,
          address: {
            "@type": "PostalAddress",
            streetAddress: event.address,
            postalCode: event.postalCode,
            addressLocality: event.city,
            addressRegion: "Hauts-de-France",
            addressCountry: "FR",
          },
        },
        organizer: {
          "@type": "Organization",
          name: "Studio Végétal – Tibaldo Jungle",
          alternateName: "Tibaldo Jungle",
          url: "https://jungle.tibaldo.fr",
          telephone: "+33743727079",
          email: "jungle@tibaldo.fr",
          sameAs: [
            "https://www.instagram.com/tibaldojungle",
            "https://www.facebook.com/tibaldojungle",
          ],
        },
        ...(!isPast ? { offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "EUR",
          availability: "https://schema.org/InStock",
          validFrom: event.publishedAt,
          url: `https://jungle.tibaldo.fr/evenements/${event.slug}`,
        } } : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Accueil",
            item: "https://jungle.tibaldo.fr/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Événements",
            item: "https://jungle.tibaldo.fr/evenements",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: event.title,
            item: `https://jungle.tibaldo.fr/evenements/${event.slug}`,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: event.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  };
  return (
    <main className="editorial-page event-detail">
      <ScrollReveal />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <section
        className={`event-detail-hero${isOpening ? " event-detail-hero-opening" : ""}`}
      >
        {isOpening ? (
          <div className="event-opening-art" aria-hidden="true">
            <span>26</span>
            <strong>09</strong>
            <small>2026</small>
            <i />
            <i />
          </div>
        ) : (
          <Image unoptimized
            src={event.coverImage}
            alt={`Événement Tibaldo Jungle à ${event.city}`}
            width="1800"
            height="1200"
          />
        )}
        <div className="event-detail-shade" />
        <SiteHeader />
        <div className="shell event-detail-hero-copy">
          <Link href="/evenements">
            Événements <span>·</span> Agenda
          </Link>
          <p className="eyebrow">
            <span /> {isOpening ? "inauguration" : event.category} · {event.city}
          </p>
          {isOpening && (
            <p className="event-opening-quickfacts">
              Événement passé · samedi 26 septembre 2026 · 18 h<br />
              3 place de l’Arbonnoise, Lille · sans réservation
            </p>
          )}
          <h1>{event.title}</h1>
          <p>{event.excerpt}</p>
        </div>
      </section>
      <section className="event-essential">
        <div className="shell">
          <div>
            <span>Date</span>
            <strong>
              {new Intl.DateTimeFormat("fr-FR", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
                timeZone: "Europe/Paris",
              }).format(start)}
            </strong>
          </div>
          <div>
            <span>Horaires</span>
            <strong>
              {new Intl.DateTimeFormat("fr-FR", {
                hour: "2-digit",
                minute: "2-digit",
                timeZone: "Europe/Paris",
              }).format(start)}
              {end &&
                ` — ${new Intl.DateTimeFormat("fr-FR", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Paris" }).format(end)}`}
            </strong>
          </div>
          <div>
            <span>Adresse</span>
            <strong>{fullAddress}</strong>
          </div>
          {isOpening && (
            <div>
              <span>Entrée</span>
              <strong>Libre et gratuite · sans réservation</strong>
            </div>
          )}
        </div>
      </section>
      <section className="shell event-story">
        <div data-reveal>
          <p className="section-kicker">{isPast ? "Événement passé" : "Une date à retenir"}</p>
          <h2>
            {isPast && isOpening ? "L’ouverture du Studio" : "Une nouvelle histoire"}
            <br />
            <em>{isPast && isOpening ? "dans nos archives." : "végétale à Lille."}</em>
          </h2>
        </div>
        <div data-reveal>
          <p>{isPast && isOpening ? "Cette page conserve la date, l’adresse et le programme publiés pour l’inauguration du Studio Végétal. Elle ne constitue pas un reportage de l’événement." : event.description}</p>
          {event.facebookUrl && !isPast && (
            <aside className="event-rsvp">
              <span>Vous pensez venir ?</span>
              <h3>Indiquez votre présence sur Facebook.</h3>
              <p>
                Cliquez sur le bouton, puis choisissez « Participe » ou «
                Intéressé » pour recevoir les nouvelles de l’ouverture et nous
                aider à préparer cette journée.
              </p>
              <a href={event.facebookUrl} target="_blank" rel="noreferrer">
                Confirmer ma venue sur Facebook ↗
              </a>
            </aside>
          )}
          {isPast ? (
            <p className="event-ended-badge">
              Cet événement est terminé — découvrez ses souvenirs ci-dessous.
            </p>
          ) : (
            <EventCountdown startAt={event.startAt} />
          )}
          {!isPast && <EventActions event={event} />}
        </div>
      </section>
      {isOpening && (
        <section className="event-lille-guide">
          <div className="shell">
            <header data-reveal>
              <p className="section-kicker">Archive de l’ouverture</p>
              <h2>
                L’inauguration du Studio
                <br />
                <em>le 26 septembre 2026.</em>
              </h2>
            </header>
            <div data-reveal>
              <p>
                L’inauguration du Studio Végétal TIBALDO Jungle était annoncée
                le samedi 26 septembre 2026 à 18 h, au 3 place de l’Arbonnoise.
              </p>
              <p>
                Cette archive conserve les informations pratiques et le programme
                publiés avant l’événement, sans ajouter de récit ni de photographie
                non documentés après coup.
              </p>
              <p>
                Le Studio se trouve dans le quartier Vauban-Esquermes, à
                quelques pas du métro Cormontaigne sur la ligne 2. Les
                informations d’accès et de stationnement sont indiquées plus bas.
              </p>
            </div>
          </div>
        </section>
      )}
      <section className="event-program">
        <div className="shell">
          <header data-reveal>
            <p className="section-kicker">Le programme</p>
            <h2>
              Un rendez-vous pour
              <br />
              <em>découvrir et échanger.</em>
            </h2>
          </header>
          <div>
            {event.program.map((item, index) => (
              <article key={`${item.time}-${item.title}`} data-reveal>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <time>{item.time}</time>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      {event.videoUrl && (
        <section className="shell event-video" data-reveal>
          <iframe
            src={event.videoUrl}
            title={`Vidéo — ${event.title}`}
            loading="lazy"
            allowFullScreen
          />
        </section>
      )}
      <section className="shell event-gallery">
        <header data-reveal>
          <p className="section-kicker">Images & atmosphère</p>
          <h2>
            Entrez dans
            <br />
            <em>la Jungle.</em>
          </h2>
        </header>
        <div>
          {event.gallery.map((image, index) => (
            <figure key={`${image.src}-${index}`} data-reveal>
              <Image unoptimized
                src={image.src}
                alt={image.alt}
                loading="lazy"
                width="1200"
                height="900"
              />
              <figcaption>{image.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>
      <section className="event-location">
        <div className="shell">
          <div data-reveal>
            <p className="section-kicker">Nous trouver</p>
            <h2>{event.venueName}</h2>
            <p>
              {event.address}
              <br />
              {event.postalCode} {event.city}
            </p>
            {isOpening ? <><a className="button button-green" href={jungleLocalIdentity.mapsUrl} target="_blank" rel="noopener noreferrer">Itinéraire</a><LocalPresence /></> : <GpsChooser address={fullAddress} />}
            {event.facebookUrl && !isPast && (
              <a
                className="event-facebook-button"
                href={event.facebookUrl}
                target="_blank"
                rel="noreferrer"
              >
                👉 Indiquer ma présence sur Facebook
              </a>
            )}
          </div>
          <iframe
            title={`Plan pour ${event.venueName}`}
            src={`https://www.google.com/maps?q=${encodeURIComponent(fullAddress)}&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
      <section className="shell event-faq">
        <header data-reveal>
          <p className="section-kicker">Questions fréquentes</p>
          <h2>{isPast ? "Informations archivées." : "Préparer votre visite."}</h2>
        </header>
        {event.faq.map((item) => (
          <details key={item.question} data-reveal>
            <summary>
              {item.question}
              <span>+</span>
            </summary>
            <p>{item.answer}</p>
          </details>
        ))}
        {event.facebookUrl && !isPast && (
          <div className="event-faq-rsvp" data-reveal>
            <p>
              Vous avez trouvé toutes vos réponses ? Dites-nous si vous serez
              présent le 26 septembre.
            </p>
            <a href={event.facebookUrl} target="_blank" rel="noreferrer">
              Valider ma venue sur Facebook ↗
            </a>
          </div>
        )}
      </section>
      {others.length > 0 && (
        <section className="shell other-events">
          <header>
            <p className="section-kicker">Continuer l’agenda</p>
            <h2>Autres événements.</h2>
          </header>
          <div className="event-card-grid">
            {others.map((item) => (
              <EventCard event={item} key={item.id} />
            ))}
          </div>
        </section>
      )}
      <nav className="shell plant-back-link">
        <Link href="/evenements">← Tous les événements</Link>
      </nav>
      <SiteFooter />
    </main>
  );
}
