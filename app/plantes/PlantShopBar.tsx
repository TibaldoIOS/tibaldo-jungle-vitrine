"use client";

import { useEffect } from "react";
import { publishPlantShopContext, usePlantShopOffers } from "./shop-offers";

export default function PlantShopBar({ encyclopediaId, plantName }: { encyclopediaId: string; plantName: string }) {
  const products = usePlantShopOffers(encyclopediaId);
  useEffect(() => {
    publishPlantShopContext({ scope: "plant", encyclopediaId, plantName, products: [] });
  }, [encyclopediaId, plantName]);
  useEffect(() => {
    if (products === null) return;
    publishPlantShopContext({ scope: "plant", encyclopediaId, plantName, products });
  }, [encyclopediaId, plantName, products]);
  useEffect(() => () => {
    if (window.__junglePlantShopContext?.scope === "plant" && window.__junglePlantShopContext.encyclopediaId === encyclopediaId) {
      publishPlantShopContext(null);
    }
  }, [encyclopediaId]);
  return null;
}
