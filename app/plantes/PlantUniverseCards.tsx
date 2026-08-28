"use client";

import Image from "next/image";
import Link from "next/link";

import { useEffect, useState } from "react";

type Variety = {
  name: string;
  botanicalName: string;
  image: string;
  alt: string;
};

type Universe = {
  slug: string;
  name: string;
  image: string;
  imageAlt: string;
  varieties: Variety[];
};

function UniverseCard({ family, index, active, openUniverse }: { family: Universe; index: number; active: boolean; openUniverse: (event: React.MouseEvent<HTMLAnchorElement>, slug: string) => void }) {
  const slides = family.varieties.length ? family.varieties : [{ name: family.name, botanicalName: family.name, image: family.image, alt: family.imageAlt }];
  const [current, setCurrent] = useState(index % slides.length);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (slides.length < 2 || paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setCurrent((value) => (value + 1) % slides.length), 3200 + (index % 4) * 430);
    return () => window.clearInterval(timer);
  }, [index, paused, slides.length]);

  return <Link
    className={`${active ? "is-opening " : ""}motion-${index % 3}`}
    href={`/plantes/${family.slug}`}
    onClick={(event) => openUniverse(event, family.slug)}
    onMouseEnter={() => setPaused(true)}
    onMouseLeave={() => setPaused(false)}
    onFocus={() => setPaused(true)}
    onBlur={() => setPaused(false)}
  >
    <span className="plant-universe-slides" aria-hidden="true">
      {slides.map((slide, slideIndex) => <Image unoptimized className={slideIndex === current ? "is-current" : ""} src={slide.image} alt="" width="240" height="300" key={`${slide.botanicalName}-${slideIndex}`} />)}
    </span>
    <small>{String(index + 1).padStart(2, "0")}</small>
    <span className="plant-universe-variety"><i>{String(current + 1).padStart(2, "0")}</i><b>{slides[current].name}</b><em>{slides.length} fiche{slides.length > 1 ? "s" : ""}</em></span>
    <strong>{family.name}</strong>
  </Link>;
}

export default function PlantUniverseCards({ families }: { families: readonly Universe[] }) {
  const [active, setActive] = useState<string | null>(null);

  const openUniverse = (event: React.MouseEvent<HTMLAnchorElement>, slug: string) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    event.preventDefault();
    if (active) return;
    setActive(slug);
    window.setTimeout(() => { window.location.href = `/plantes/${slug}`; }, 620);
  };

  return <div className="plant-universe-cards">
    {families.map((family, index) => <UniverseCard family={family} index={index} active={active === family.slug} openUniverse={openUniverse} key={family.slug} />)}
  </div>;
}
