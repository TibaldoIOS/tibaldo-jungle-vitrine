"use client";

import Image from "next/image";
import Link from "next/link";

import { useEffect, useMemo, useState } from "react";
import type { JungleEvent } from "@/lib/events/types";

const formatUnit = (value: number) => String(Math.max(0, value)).padStart(2, "0");

export function EventCountdown({ startAt }: { startAt: string }) {
  const target = useMemo(() => new Date(startAt).getTime(), [startAt]);
  const [remaining, setRemaining] = useState(() => target - Date.now());
  useEffect(() => {
    const timer = window.setInterval(() => setRemaining(target - Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, [target]);
  if (remaining <= 0) return <p className="event-ended-badge">Événement terminé</p>;
  const days = Math.floor(remaining / 86_400_000);
  const hours = Math.floor((remaining / 3_600_000) % 24);
  const minutes = Math.floor((remaining / 60_000) % 60);
  const seconds = Math.floor((remaining / 1000) % 60);
  return <div className="event-countdown" aria-label={`Dans ${days} jours`}><p>La Jungle ouvre dans</p><div>{[[days, "jours"], [hours, "heures"], [minutes, "minutes"], [seconds, "secondes"]].map(([value, label]) => <span key={label}><strong>{formatUnit(Number(value))}</strong><small>{label}</small></span>)}</div></div>;
}

const compactDate = (value: string) => new Date(value).toISOString().replace(/[-:]|\.\d{3}/g, "");

export function EventActions({ event }: { event: JungleEvent }) {
  const [weather, setWeather] = useState<string | null>(null);
  const url = typeof window === "undefined" ? `https://jungle.tibaldo.fr/evenements/${event.slug}/` : window.location.href;
  const text = `${event.title} — ${new Intl.DateTimeFormat("fr-FR", { dateStyle: "long" }).format(new Date(event.startAt))}`;
  const googleCalendar = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${compactDate(event.startAt)}/${compactDate(event.endAt ?? event.startAt)}&details=${encodeURIComponent(event.excerpt)}&location=${encodeURIComponent(`${event.address}, ${event.postalCode} ${event.city}`)}`;
  const downloadIcs = () => {
    const content = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Tibaldo Jungle//Evenements//FR", "BEGIN:VEVENT", `UID:${event.id}@jungle.tibaldo.fr`, `DTSTART:${compactDate(event.startAt)}`, `DTEND:${compactDate(event.endAt ?? event.startAt)}`, `SUMMARY:${event.title}`, `DESCRIPTION:${event.excerpt.replace(/\n/g, " ")}`, `LOCATION:${event.address}, ${event.postalCode} ${event.city}`, `URL:https://jungle.tibaldo.fr/evenements/${event.slug}/`, "END:VEVENT", "END:VCALENDAR"].join("\r\n");
    const anchor = document.createElement("a");
    anchor.href = URL.createObjectURL(new Blob([content], { type: "text/calendar;charset=utf-8" }));
    anchor.download = `${event.slug}.ics`;
    anchor.click();
    URL.revokeObjectURL(anchor.href);
  };
  useEffect(() => {
    const days = (new Date(event.startAt).getTime() - Date.now()) / 86_400_000;
    if (days < 0 || days > 15) return;
    fetch("https://api.open-meteo.com/v1/forecast?latitude=50.6292&longitude=3.0573&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=Europe%2FParis")
      .then((response) => response.json())
      .then((data) => {
        const date = event.startAt.slice(0, 10);
        const index = data.daily?.time?.indexOf(date) ?? -1;
        if (index >= 0) setWeather(`${Math.round(data.daily.temperature_2m_min[index])}–${Math.round(data.daily.temperature_2m_max[index])} °C prévus à Lille`);
      }).catch(() => undefined);
  }, [event.startAt]);
  return <div className="event-action-cluster">
    <div className="event-calendar"><span>Ajouter au calendrier</span><a href={googleCalendar} target="_blank" rel="noreferrer">Google</a><button type="button" onClick={downloadIcs}>Apple / Outlook</button></div>
    <div className="event-share"><span>Partager</span><a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`} target="_blank" rel="noreferrer">Facebook</a><a href={`https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`} target="_blank" rel="noreferrer">WhatsApp</a><a href={`https://www.facebook.com/dialog/send?link=${encodeURIComponent(url)}&app_id=291494419107518`} target="_blank" rel="noreferrer">Messenger</a>{event.instagramUrl && <a href={event.instagramUrl} target="_blank" rel="noreferrer">Instagram</a>}</div>
    {weather && <p className="event-weather">Météo prévisionnelle · <strong>{weather}</strong></p>}
  </div>;
}

export function EventFilters({ events }: { events: JungleEvent[] }) {
  const [filter, setFilter] = useState("upcoming");
  // Freeze the classification reference time for this mounted view. A filter
  // interaction must not make an event jump categories because render timing
  // changed; remounting the page naturally refreshes the reference time.
  const [now] = useState(() => Date.now());
  const visible = events.filter((event) => filter === "all" || filter === "upcoming" ? (filter === "all" || new Date(event.endAt ?? event.startAt).getTime() >= now) : filter === "past" ? new Date(event.endAt ?? event.startAt).getTime() < now : event.category === filter);
  const labels = [["upcoming", "À venir"], ["past", "Passés"], ["atelier", "Ateliers"], ["ouverture", "Ouvertures"], ["promotion", "Promotions"], ["special", "Événements spéciaux"], ["all", "Tous"]];
  return <><div className="event-filters" aria-label="Filtrer les événements">{labels.map(([value, label]) => <button type="button" className={filter === value ? "is-active" : ""} onClick={() => setFilter(value)} key={value}>{label}</button>)}</div><div className="event-card-grid">{visible.map((event) => <EventCard event={event} key={event.id} />)}{visible.length === 0 && <p className="event-empty">Aucun événement dans cette catégorie pour le moment.</p>}</div></>;
}

export function EventCard({ event }: { event: JungleEvent }) {
  const date = new Date(event.startAt);
  return <Link className="event-card" href={`/evenements/${event.slug}`}><div><Image unoptimized className={event.slug === "ouverture-tibaldo-jungle-lille" ? "event-cover-storefront" : undefined} src={event.coverImage} alt={`Illustration de ${event.title}`} loading="lazy" width="1200" height="800" /><span>{event.category}</span></div><section><time dateTime={event.startAt}>{new Intl.DateTimeFormat("fr-FR", { day: "2-digit", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" }).format(date)}</time><h2>{event.title}</h2><p>{event.excerpt}</p><small>{event.venueName} · {event.city}</small><strong>Découvrir <b>↗</b></strong></section></Link>;
}
