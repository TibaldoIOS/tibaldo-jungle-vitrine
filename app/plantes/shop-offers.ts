"use client";

import { useEffect, useState } from "react";
import { shopUrl } from "@/lib/environment";

export type PlantShopProduct = {
  id: string;
  slug: string;
  encyclopediaId: string;
  name: string;
  sizeName: string | null;
  priceTtc: number;
  availableQuantity: number;
};

export type PlantShopLoadStatus = "loading" | "ready" | "error";

export type PlantShopPlantContext = {
  scope: "plant";
  encyclopediaId: string;
  plantName: string;
  products: PlantShopProduct[];
};

export type GenusShopPlantOffers = {
  encyclopediaId: string;
  plantName: string;
  products: PlantShopProduct[];
};

export type PlantShopGenusContext = {
  scope: "genus";
  genre: string;
  groupName: string;
  status: PlantShopLoadStatus;
  offers: GenusShopPlantOffers[];
};

export type PlantShopContext = PlantShopPlantContext | PlantShopGenusContext;

export const PLANT_SHOP_CONTEXT_EVENT = "jungle:plant-shop-context";

declare global {
  interface Window {
    __junglePlantShopContext?: PlantShopContext | null;
  }
}

export function publishPlantShopContext(context: PlantShopContext | null) {
  window.__junglePlantShopContext = context;
  window.dispatchEvent(new CustomEvent(PLANT_SHOP_CONTEXT_EVENT, { detail: context }));
}

export const currentPlantShopContext = () => window.__junglePlantShopContext ?? null;

const cache = new Map<string, Promise<PlantShopProduct[]>>();
const sizeOrder = ["XS", "S", "M", "L", "XL", "XXL"];

const sortProducts = (products: PlantShopProduct[]) => [...products].sort((left, right) => {
  const leftSize = left.sizeName?.toUpperCase() ?? "";
  const rightSize = right.sizeName?.toUpperCase() ?? "";
  const leftIndex = sizeOrder.indexOf(leftSize);
  const rightIndex = sizeOrder.indexOf(rightSize);
  if (leftIndex !== rightIndex) return (leftIndex < 0 ? sizeOrder.length : leftIndex) - (rightIndex < 0 ? sizeOrder.length : rightIndex);
  return left.name.localeCompare(right.name, "fr");
});

export const loadPlantShopProducts = (encyclopediaId: string) => {
  const existing = cache.get(encyclopediaId);
  if (existing) return existing;
  const request = (async () => {
    const endpoint = new URL("/api/catalogue", shopUrl("/"));
    endpoint.searchParams.set("encyclopedie", encyclopediaId);
    const response = await fetch(endpoint, { mode: "cors", credentials: "omit" });
    if (!response.ok) throw new Error("Shop catalogue unavailable");
    const body = await response.json() as { products?: PlantShopProduct[] };
    if (!Array.isArray(body.products)) return [];
    return sortProducts(body.products.filter((product) =>
      product.encyclopediaId === encyclopediaId &&
      typeof product.slug === "string" && product.slug.length > 0 &&
      typeof product.priceTtc === "number" && Number.isFinite(product.priceTtc) &&
      typeof product.availableQuantity === "number" && Number.isFinite(product.availableQuantity),
    ));
  })();
  cache.set(encyclopediaId, request);
  return request;
};

export function usePlantShopOffers(encyclopediaId: string) {
  const [result, setResult] = useState<{ encyclopediaId: string; products: PlantShopProduct[] } | null>(null);
  useEffect(() => {
    let live = true;
    void loadPlantShopProducts(encyclopediaId)
      .then((products) => {
        if (live) setResult({ encyclopediaId, products });
      })
      .catch(() => {
        if (live) setResult({ encyclopediaId, products: [] });
      });
    return () => { live = false; };
  }, [encyclopediaId]);
  return result?.encyclopediaId === encyclopediaId ? result.products : null;
}

export function useGenusShopOffers(plants: readonly { encyclopediaId: string; plantName: string }[]) {
  const key = plants.map((plant) => plant.encyclopediaId).join("|");
  const [result, setResult] = useState<{ key: string; status: PlantShopLoadStatus; offers: GenusShopPlantOffers[] }>({
    key,
    status: "loading",
    offers: [],
  });
  useEffect(() => {
    let live = true;
    void Promise.all(plants.map(async (plant) => ({
      ...plant,
      products: await loadPlantShopProducts(plant.encyclopediaId),
    })))
      .then((offers) => {
        if (live) setResult({ key, status: "ready", offers });
      })
      .catch(() => {
        if (live) setResult({ key, status: "error", offers: [] });
      });
    return () => { live = false; };
  }, [key, plants]);
  return result.key === key ? result : { key, status: "loading" as const, offers: [] };
}

export const plantShopHref = (product: PlantShopProduct) => shopUrl(`/produits/${encodeURIComponent(product.slug)}`);

export const formatShopPrice = (price: number) => new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
}).format(price);

export const formatShopAvailability = (quantity: number) => quantity > 0 ? "En stock" : "Indisponible";
