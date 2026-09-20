"use client";

import { useEffect, useState } from "react";
import { shopUrl } from "@/lib/environment";
import { Arrow } from "../SiteChrome";

type PublicProduct = {
  id: string;
  slug: string;
  name: string;
  sizeName: string | null;
  priceTtc: number;
  availableQuantity: number;
};

// Exact reviewed bridges only. A nearby name or similar material must never
// create a commercial link (notably chips de coco versus coco coir).
export const exactSubstrateProductIds: Readonly<Record<string, string>> = {
  perlite: "ac73a24f-8ccd-4dc9-abb9-3696a6814246",
  "sphaigne-sechee": "213a2aa4-23a3-4e30-bc08-b5c576768759",
  "charbon-actif": "90d23443-4224-4172-8b5f-6e70867df5b6",
  zeolite: "72e14d1a-7df3-44eb-b96a-2e2aaba6ce52",
};

const money = (value: number) => new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
}).format(value);

export default function SubstrateCommerce({ slug }: { slug: string }) {
  const productId = exactSubstrateProductIds[slug];
  const [product, setProduct] = useState<PublicProduct | null | undefined>(undefined);

  useEffect(() => {
    if (!productId) {
      return;
    }
    let live = true;
    void fetch(shopUrl("/api/catalogue"), { mode: "cors", credentials: "omit" })
      .then(async (response) => {
        if (!response.ok) throw new Error("catalogue unavailable");
        const body = await response.json() as { products?: PublicProduct[] };
        const exact = Array.isArray(body.products)
          ? body.products.find((item) => item.id === productId) ?? null
          : null;
        if (live) setProduct(exact);
      })
      .catch(() => { if (live) setProduct(null); });
    return () => { live = false; };
  }, [productId]);

  if (!productId || !product) {
    return <div className="material-commerce material-commerce-soon">
      <span>Disponibilité</span>
      <strong>Disponible prochainement en ligne</strong>
    </div>;
  }

  const path = product.slug || product.id;
  return <div className="material-commerce" data-exact-product-id={product.id}>
    <div>
      <span>{product.availableQuantity > 0 ? "Disponible au Studio" : "Actuellement indisponible"}</span>
      <strong>{product.sizeName || "Conditionnement à consulter"}</strong>
    </div>
    <b>{money(product.priceTtc)}</b>
    <a href={shopUrl(`/produits/${encodeURIComponent(path)}`)}>Voir sur le Shop <Arrow /></a>
  </div>;
}
