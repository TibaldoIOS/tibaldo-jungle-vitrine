"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { homeUniverseMedia } from "@/lib/home-universe-media";
import { Arrow } from "./SiteChrome";

const universes = [
  { number: "01", title: "Plantes", copy: "Raretés végétales, plantes d’intérieur et encyclopédie pour choisir selon votre lumière et votre quotidien.", href: "/plantes", media: homeUniverseMedia.plants },
  { number: "02", title: "Substrats", copy: "Terreau, écorces, fibres et minéraux vendus en vrac, avec un mélange adapté aux besoins des racines.", href: "/substrats", media: homeUniverseMedia.substrates },
  { number: "03", title: "Le Studio", copy: "Découvrez la nouvelle adresse Tibaldo Jungle, ses plantes, ses matières et les conseils proposés sur place à Lille.", href: "/contact", media: homeUniverseMedia.studio },
] as const;

export default function HomeUniverseCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    const cards = cardRefs.current.filter(Boolean) as HTMLAnchorElement[];
    if (!track || !cards.length || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver((entries) => {
      const mostVisible = entries.filter((entry) => entry.isIntersecting).sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];
      if (!mostVisible) return;
      const index = cards.indexOf(mostVisible.target as HTMLAnchorElement);
      if (index >= 0) setActiveIndex(index);
    }, { root: track, threshold: [0.55, 0.72, 0.9] });
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  const focusCard = (index: number) => {
    const track = trackRef.current;
    const card = cardRefs.current[index];
    if (!track || !card) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: reducedMotion ? "auto" : "smooth" });
  };

  return <div className="home-hub-carousel" data-reveal role="region" aria-roledescription="carrousel" aria-label="Les trois univers Tibaldo Jungle">
    <div className="home-hub-grid" ref={trackRef} tabIndex={0}>
      {universes.map((item, index) => <a href={item.href} key={item.title} ref={(node) => { cardRefs.current[index] = node; }} aria-label={`${index + 1} sur ${universes.length} · ${item.title}`} data-owner-media-slot={item.media.slot}>
        <Image unoptimized src={item.media.src} alt={item.media.alt} width={item.media.width} height={item.media.height} loading="lazy" style={{ objectPosition: item.media.objectPosition }} />
        <span className="home-hub-shade" aria-hidden="true" />
        <small>{item.number}</small><div><h3>{item.title}</h3><p>{item.copy}</p><strong>Découvrir <Arrow /></strong></div>
      </a>)}
    </div>
    <div className="home-hub-indicators" aria-label="Choisir un univers">
      {universes.map((item, index) => <button type="button" key={item.title} onClick={() => focusCard(index)} aria-label={`Afficher ${item.title}`} aria-current={activeIndex === index ? "true" : undefined}><span /></button>)}
    </div>
  </div>;
}
