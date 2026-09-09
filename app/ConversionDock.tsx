"use client";

import Link from "next/link";
import { shopUrl } from "@/lib/environment";
import { jungleLocalIdentity } from "@/lib/jungle-local-identity";

export default function ConversionDock({
  inert = false,
}: {
  inert?: boolean;
}) {
  return (
    <nav
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
