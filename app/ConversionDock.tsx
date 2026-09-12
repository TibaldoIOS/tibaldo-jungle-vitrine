"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { shopUrl } from "@/lib/environment";
import { jungleLocalIdentity } from "@/lib/jungle-local-identity";

export default function ConversionDock({
  inert = false,
}: {
  inert?: boolean;
}) {
  const dockRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const dock = dockRef.current;
    if (!dock) return;
    const root = document.documentElement;
    const measure = () => {
      // Measure only on resize, never on scroll. Include the computed safe-area gap.
      const bottom = parseFloat(getComputedStyle(dock).bottom) || 0;
      root.style.setProperty("--jungle-dock-clearance", `${Math.ceil(dock.getBoundingClientRect().height + bottom + 16)}px`);
    };
    const observer = new ResizeObserver(measure);
    observer.observe(dock);
    window.addEventListener("resize", measure);
    measure();
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
      root.style.removeProperty("--jungle-dock-clearance");
    };
  }, []);
  return (
    <nav
      ref={dockRef}
      className="conversion-dock"
      aria-label="Actions rapides"
      inert={inert || undefined}
      aria-hidden={inert || undefined}
    >
      <Link href="/sos-plantes" data-action="sos">
        SOS Plantes
      </Link>
      <a
        href={jungleLocalIdentity.mapsUrl}
        target="_blank"
        rel="noreferrer"
        data-action="route"
      >
        Itinéraire
      </a>
      <a href={shopUrl()} data-action="shop">
        Boutique
      </a>
    </nav>
  );
}
