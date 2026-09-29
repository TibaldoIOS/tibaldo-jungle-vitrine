"use client";

import { useEffect, useState } from "react";
import { shopUrl } from "@/lib/environment";
import type { ExactShopProduct } from "./selection";
import styles from "./selection.module.css";

type PublicProduct = {
  id: string;
  slug: string;
  name: string;
  sizeName: string | null;
};

let catalogueRequest: Promise<PublicProduct[]> | null = null;

function loadPublishedCatalogue() {
  if (catalogueRequest) return catalogueRequest;
  catalogueRequest = fetch(shopUrl("/api/catalogue"), { mode: "cors", credentials: "omit" })
    .then(async (response) => {
      if (!response.ok) throw new Error("Shop catalogue unavailable");
      const body = await response.json() as { products?: PublicProduct[] };
      return Array.isArray(body.products) ? body.products : [];
    })
    .catch(() => []);
  return catalogueRequest;
}

export default function ReadyMixCommerce({
  mixName,
  manufacturerUrl,
  shop,
}: {
  mixName: string;
  manufacturerUrl: string;
  shop: ExactShopProduct | null;
}) {
  const [published, setPublished] = useState<PublicProduct | null | undefined>(shop ? undefined : null);

  useEffect(() => {
    if (!shop) return;
    let live = true;
    void loadPublishedCatalogue().then((products) => {
      const exact = products.find((product) =>
        product.id === shop.id &&
        product.slug === shop.slug &&
        product.sizeName === shop.format,
      ) ?? null;
      if (live) setPublished(exact);
    });
    return () => { live = false; };
  }, [shop]);

  return <div className={styles.productActions} data-shop-state={published ? "published" : shop ? "unpublished" : "unmapped"}>
    {published ? (
      <a className={styles.productLink} href={shopUrl(`/produits/${encodeURIComponent(published.slug)}`)} data-exact-shop-product={published.id}>
        Voir {mixName} au Shop ↗
      </a>
    ) : null}
    {!shop ? <span className={styles.productUnavailable}>Non proposé au Shop</span> : null}
    <a className={styles.productSourceLink} href={manufacturerUrl}>Fiche fabricant ↗</a>
  </div>;
}
