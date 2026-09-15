"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { shopUrl } from "@/lib/environment";
import { jungleLocalIdentity } from "@/lib/jungle-local-identity";
import {
  currentPlantShopContext,
  formatShopAvailability,
  formatShopPrice,
  plantShopHref,
  PLANT_SHOP_CONTEXT_EVENT,
  type PlantShopContext,
} from "./plantes/shop-offers";

export default function ConversionDock({
  inert = false,
}: {
  inert?: boolean;
}) {
  const dockRef = useRef<HTMLElement>(null);
  const chooserRef = useRef<HTMLDivElement>(null);
  const chooserButtonRef = useRef<HTMLButtonElement>(null);
  const shopContextRef = useRef<PlantShopContext | null>(null);
  const [shopContext, setShopContext] = useState<PlantShopContext | null>(null);
  const [chooserOpen, setChooserOpen] = useState(false);
  const chooserId = useId();
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
  useEffect(() => {
    const update = (event: Event) => {
      const detail = (event as CustomEvent<PlantShopContext | null>).detail;
      const plantChanged = shopContextRef.current?.encyclopediaId !== detail?.encyclopediaId;
      shopContextRef.current = detail ?? null;
      setShopContext(detail ?? null);
      if (plantChanged) setChooserOpen(false);
    };
    let live = true;
    queueMicrotask(() => {
      if (!live) return;
      const current = currentPlantShopContext();
      shopContextRef.current = current;
      setShopContext(current);
    });
    window.addEventListener(PLANT_SHOP_CONTEXT_EVENT, update);
    return () => {
      live = false;
      window.removeEventListener(PLANT_SHOP_CONTEXT_EVENT, update);
    };
  }, []);
  useEffect(() => {
    if (!chooserOpen) return;
    const close = (event: KeyboardEvent | PointerEvent) => {
      if (event instanceof KeyboardEvent && event.key !== "Escape") return;
      if (event instanceof PointerEvent && chooserRef.current?.contains(event.target as Node)) return;
      setChooserOpen(false);
      if (event instanceof KeyboardEvent) chooserButtonRef.current?.focus();
    };
    document.addEventListener("keydown", close);
    document.addEventListener("pointerdown", close);
    requestAnimationFrame(() => chooserRef.current?.querySelector<HTMLAnchorElement>("a")?.focus());
    return () => {
      document.removeEventListener("keydown", close);
      document.removeEventListener("pointerdown", close);
    };
  }, [chooserOpen]);
  const exactProducts = shopContext?.products ?? [];
  const plantActionLabel = exactProducts.length ? "Adopte-moi" : "Voir le Shop";
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
      {shopContext ? (
        <div className="conversion-dock-shop" ref={chooserRef}>
          <button
            ref={chooserButtonRef}
            type="button"
            className="conversion-dock-shop-trigger"
            data-action={exactProducts.length ? "plant-shop-offers" : "plant-shop-catalogue"}
            aria-expanded={chooserOpen}
            aria-controls={chooserId}
            aria-label={plantActionLabel}
            onClick={() => setChooserOpen((value) => !value)}
          >
            <span className="conversion-dock-shop-sprout" aria-hidden="true">🌱</span>
            <span>{plantActionLabel}</span>
          </button>
          {chooserOpen ? (
            <section className="conversion-dock-shop-panel" id={chooserId} aria-label={exactProducts.length ? `Offres Shop pour ${shopContext.plantName}` : `Catalogue Shop pour ${shopContext.plantName}`}>
              <header>
                <span>{exactProducts.length ? "Disponible au Shop" : "Catalogue Jungle"}</span>
                <strong>{shopContext.plantName}</strong>
                <button
                  type="button"
                  aria-label="Fermer le panneau Shop"
                  onClick={() => {
                    setChooserOpen(false);
                    requestAnimationFrame(() => chooserButtonRef.current?.focus());
                  }}
                >×</button>
              </header>
              {exactProducts.length ? (
                <div>
                  {exactProducts.map((product) => (
                    <a href={plantShopHref(product)} key={product.id}>
                      <strong>{exactProducts.length === 1 ? "Voir cette plante au Shop" : product.sizeName || product.name}</strong>
                      <span>{formatShopPrice(product.priceTtc)}</span>
                      <small>
                        {exactProducts.length === 1 && product.sizeName ? `Format ${product.sizeName} · ` : ""}
                        {formatShopAvailability(product.availableQuantity)}
                      </small>
                    </a>
                  ))}
                </div>
              ) : (
                <div className="conversion-dock-shop-empty">
                  <p>Aucune offre n’est actuellement publiée pour cette fiche.</p>
                  <a href={shopUrl()}>Voir le catalogue général</a>
                </div>
              )}
            </section>
          ) : null}
        </div>
      ) : (
        <a href={shopUrl()} data-action="shop">Boutique</a>
      )}
    </nav>
  );
}
