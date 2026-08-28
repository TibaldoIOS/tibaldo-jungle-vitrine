"use client";

import Link from "next/link";
import { shopUrl } from "@/lib/environment";
const destination="3 place de l'Arbonnoise, 59000 Lille";
export default function ConversionDock(){return <nav className="conversion-dock" aria-label="Actions rapides"><Link href="/sos-plantes" data-action="sos">SOS Plantes</Link><a href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`} target="_blank" rel="noreferrer" data-action="route">Itinéraire</a><a href={shopUrl()} data-action="shop">Boutique</a></nav>}
