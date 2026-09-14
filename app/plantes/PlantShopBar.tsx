"use client";

import { useEffect, useState } from "react";
import { shopUrl } from "@/lib/environment";
import styles from "./PlantShopBar.module.css";

type Product = { id: string; name: string; sizeName: string | null; priceTtc: number; availableQuantity: number };

export default function PlantShopBar({ encyclopediaId, plantName }: { encyclopediaId: string; plantName: string }) {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [selected, setSelected] = useState(0);
  useEffect(() => {
    let live = true;
    const endpoint = new URL("/api/catalogue", shopUrl("/"));
    endpoint.searchParams.set("encyclopedie", encyclopediaId);
    void fetch(endpoint, { mode: "cors", credentials: "omit" }).then(async (response) => {
      if (!response.ok) throw new Error("unavailable");
      const body = await response.json() as { products?: Product[] };
      if (live) setProducts(Array.isArray(body.products) ? body.products : []);
    }).catch(() => { if (live) setProducts([]); });
    return () => { live = false; };
  }, [encyclopediaId]);
  if (!products?.length) return null;
  const product = products[Math.min(selected, products.length - 1)];
  return <aside className={styles.bar} aria-label={`Disponibilité commerciale exacte de ${plantName}`} data-exact-encyclopedia-id={encyclopediaId}>
    <div className={styles.identity}><span>Disponible au Studio</span><strong>{product.name}</strong><small>{product.availableQuantity > 0 ? "En stock" : "Indisponible"} · {new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(product.priceTtc)}</small></div>
    {products.length > 1 ? <label className={styles.variant}>Format<select aria-label="Choisir le format commercial" value={selected} onChange={(event) => setSelected(Number(event.target.value))}>{products.map((item, index) => <option value={index} key={item.id}>{item.sizeName || item.name}</option>)}</select></label> : product.sizeName ? <span className={styles.format}>{product.sizeName}</span> : null}
    <a href={shopUrl(`/produits/${encodeURIComponent(product.id)}`)}><span>Voir et ajouter sur la boutique</span><b>↗</b></a>
  </aside>;
}
