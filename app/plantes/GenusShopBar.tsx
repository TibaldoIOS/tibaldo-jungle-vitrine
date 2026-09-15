"use client";

import { useEffect } from "react";
import { publishPlantShopContext, useGenusShopOffers } from "./shop-offers";

type GenusShopPlant = {
  encyclopediaId: string;
  plantName: string;
};

export default function GenusShopBar({
  genre,
  groupName,
  plants,
}: {
  genre: string;
  groupName: string;
  plants: readonly GenusShopPlant[];
}) {
  const result = useGenusShopOffers(plants);
  useEffect(() => {
    publishPlantShopContext({
      scope: "genus",
      genre,
      groupName,
      status: result.status,
      offers: result.offers,
    });
  }, [genre, groupName, result]);
  useEffect(() => () => {
    if (window.__junglePlantShopContext?.scope === "genus" && window.__junglePlantShopContext.genre === genre) {
      publishPlantShopContext(null);
    }
  }, [genre]);
  return null;
}
