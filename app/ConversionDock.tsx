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
      const currentKey = shopContextRef.current?.scope === "genus"
        ? `genus:${shopContextRef.current.genre}`
        : shopContextRef.current ? `plant:${shopContextRef.current.encyclopediaId}` : null;
      const nextKey = detail?.scope === "genus"
        ? `genus:${detail.genre}`
        : detail ? `plant:${detail.encyclopediaId}` : null;
      const contextChanged = currentKey !== nextKey;
      shopContextRef.current = detail ?? null;
      setShopContext(detail ?? null);
      if (contextChanged) setChooserOpen(false);
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
  const isGenus = shopContext?.scope === "genus";
  const genusOffers = isGenus
    ? shopContext.offers.flatMap((plant) => plant.products.map((product) => ({ ...plant, product })))
    : [];
  const exactProducts = shopContext?.scope === "plant" ? shopContext.products : [];
  const hasOffers = isGenus ? genusOffers.length > 0 : exactProducts.length > 0;
  const isLoading = isGenus && shopContext.status === "loading";
  const hasError = isGenus && shopContext.status === "error";
  const shopActionLabel = isGenus
    ? hasOffers || isLoading ? "Choisir ma plante" : "Voir le Shop"
    : hasOffers ? "Adopte-moi" : "Voir le Shop";
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
            data-action={isGenus ? hasOffers ? "genus-shop-offers" : isLoading ? "genus-shop-loading" : "genus-shop-catalogue" : hasOffers ? "plant-shop-offers" : "plant-shop-catalogue"}
            aria-expanded={chooserOpen}
            aria-controls={chooserId}
            aria-label={shopActionLabel}
            onClick={() => setChooserOpen((value) => !value)}
          >
            <span className="conversion-dock-shop-sprout" aria-hidden="true">🌱</span>
            <span>{shopActionLabel}</span>
          </button>
          {chooserOpen ? (
            <section className={`conversion-dock-shop-panel${isGenus ? " is-genus" : ""}`} id={chooserId} aria-label={isGenus ? `Choisir une plante parmi les ${shopContext.groupName}` : hasOffers ? `Offres Shop pour ${shopContext.plantName}` : `Catalogue Shop pour ${shopContext.plantName}`}>
              <header>
                <span>{isGenus ? "Offres publiées du groupe" : hasOffers ? "Disponible au Shop" : "Catalogue Jungle"}</span>
                <strong>{isGenus ? shopContext.groupName : shopContext.plantName}</strong>
                <button
                  type="button"
                  aria-label="Fermer le panneau Shop"
                  onClick={() => {
                    setChooserOpen(false);
                    requestAnimationFrame(() => chooserButtonRef.current?.focus());
                  }}
                >×</button>
              </header>
              {isGenus && genusOffers.length ? (
                <div className="conversion-dock-genus-offers">
                  {genusOffers.map(({ plantName, product }) => (
                    <a href={plantShopHref(product)} key={product.id}>
                      <strong>{plantName}</strong>
                      <span>{formatShopPrice(product.priceTtc)}</span>
                      <small>{product.sizeName ? `Format ${product.sizeName} · ` : ""}{formatShopAvailability(product.availableQuantity)}</small>
                    </a>
                  ))}
                </div>
              ) : !isGenus && exactProducts.length ? (
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
              ) : isLoading ? (
                <div className="conversion-dock-shop-state" aria-live="polite">
                  <p>Recherche des offres publiées pour ce groupe…</p>
                </div>
              ) : (
                <div className="conversion-dock-shop-empty">
                  <p>{hasError ? "Les offres du Shop ne peuvent pas être vérifiées pour le moment." : isGenus ? "Aucune offre n’est actuellement publiée pour ce groupe." : "Aucune offre n’est actuellement publiée pour cette fiche."}</p>
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
