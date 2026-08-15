"use client";

import { useMemo, useState } from "react";
import styles from "./PlantShopBar.module.css";

export default function PlantShopBar({ shopUrl, plantName }: { shopUrl: string; plantName: string }) {
  const [quantity, setQuantity] = useState(1);
  const addUrl = useMemo(() => {
    const original = new URL(shopUrl);
    const productSlug = original.pathname.split("/").filter(Boolean).at(-1) || "";
    original.pathname = "/";
    original.search = "";
    original.searchParams.set("ajouter", productSlug);
    original.searchParams.set("plante", plantName);
    original.searchParams.set("quantite", String(quantity));
    return original.toString();
  }, [plantName, quantity, shopUrl]);

  return <aside className={styles.bar} aria-label="Acheter cette plante">
    <div className={styles.identity}><span>Disponible au Shop</span><strong>{plantName}</strong></div>
    <div className={styles.quantity} aria-label="Quantité">
      <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))} disabled={quantity === 1} aria-label="Retirer une unité">−</button>
      <output aria-live="polite">{quantity}</output>
      <button type="button" onClick={() => setQuantity((value) => Math.min(9, value + 1))} aria-label="Ajouter une unité">＋</button>
    </div>
    <a href={addUrl}><span>Ajouter au panier</span><b>＋</b></a>
  </aside>;
}
