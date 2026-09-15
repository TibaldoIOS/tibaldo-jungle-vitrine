"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Arrow } from "../SiteChrome";
import { formatShopAvailability, formatShopPrice, plantShopHref, usePlantShopOffers } from "./shop-offers";

export default function PlantCardShopAction({ encyclopediaId, plantName }: { encyclopediaId: string; plantName: string }) {
  const products = usePlantShopOffers(encyclopediaId);
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent | PointerEvent) => {
      if (event instanceof KeyboardEvent && event.key !== "Escape") return;
      if (event instanceof PointerEvent && rootRef.current?.contains(event.target as Node)) return;
      setOpen(false);
      if (event instanceof KeyboardEvent) buttonRef.current?.focus();
    };
    document.addEventListener("keydown", close);
    document.addEventListener("pointerdown", close);
    requestAnimationFrame(() => rootRef.current?.querySelector<HTMLAnchorElement>(".genus-carousel-offers a")?.focus());
    return () => {
      document.removeEventListener("keydown", close);
      document.removeEventListener("pointerdown", close);
    };
  }, [open]);

  if (!products?.length) return null;
  if (products.length === 1) {
    return <div className="genus-carousel-commerce"><a href={plantShopHref(products[0])}>Voir au Shop <Arrow /></a></div>;
  }

  return <div className="genus-carousel-commerce" ref={rootRef}>
    <button ref={buttonRef} type="button" aria-expanded={open} aria-controls={panelId} onClick={() => setOpen((value) => !value)}>Choisir ma taille <Arrow /></button>
    {open ? <div className="genus-carousel-offers" id={panelId} aria-label={`Formats Shop pour ${plantName}`}>
      {products.map((product) => <a href={plantShopHref(product)} key={product.id}>
        <strong>{product.sizeName || product.name}</strong>
        <span>{formatShopPrice(product.priceTtc)}</span>
        <small>{formatShopAvailability(product.availableQuantity)}</small>
      </a>)}
    </div> : null}
  </div>;
}
