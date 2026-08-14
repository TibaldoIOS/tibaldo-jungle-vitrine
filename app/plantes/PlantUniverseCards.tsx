"use client";

import { useState } from "react";

type Universe = {
  slug: string;
  name: string;
  image: string;
};

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
    {families.map((family, index) => <a className={active === family.slug ? "is-opening" : ""} href={`/plantes/${family.slug}`} key={family.slug} onClick={(event) => openUniverse(event, family.slug)}>
      <img src={family.image} alt="" width="240" height="300" />
      <small>{String(index + 1).padStart(2, "0")}</small>
      <strong>{family.name}</strong>
    </a>)}
  </div>;
}
