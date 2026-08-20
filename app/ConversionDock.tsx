"use client";
import { useSyncExternalStore } from "react";
import { localeFromPath, localizedPath, type Locale } from "@/lib/i18n/config";
const destination="3 place de l'Arbonnoise, 59000 Lille";
const subscribe=()=>()=>{};const getClientLocale=():Locale=>localeFromPath(window.location.pathname);const getServerLocale=():Locale=>"fr";
export default function ConversionDock(){const locale=useSyncExternalStore(subscribe,getClientLocale,getServerLocale);const copy=locale==="en"?{label:"Quick actions",first:"Plants",route:"Directions",shop:"Shop"}:locale==="es"?{label:"Acciones rápidas",first:"Plantas",route:"Cómo llegar",shop:"Tienda"}:{label:"Actions rapides",first:"SOS Plantes",route:"Itinéraire",shop:"Boutique"};return <nav className="conversion-dock" aria-label={copy.label}><a href={locale==="fr"?"/sos-plantes":localizedPath("/plantes",locale)} data-action="sos">{copy.first}</a><a href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`} target="_blank" rel="noreferrer" data-action="route">{copy.route}</a><a href="https://shop.tibaldo.fr" data-action="shop">{copy.shop}</a></nav>}
