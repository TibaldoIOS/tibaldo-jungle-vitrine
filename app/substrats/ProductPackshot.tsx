import media from "./product-media.json";
import styles from "./selection.module.css";

/** Exact registry lookup: never borrow another product's packaging. */
export default function ProductPackshot({ id }: { id: string }) {
  const product = media.find(item => item.id === id);
  if (!product) throw new Error(`Missing verified Sybotanica packshot: ${id}`);
  const small = product.variants[0];
  const large = product.variants[1];
  return <figure className={styles.packshot} data-product-media={id}>
    {/* Native responsive delivery keeps our environment-correct media endpoint. */}
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src={small.src} srcSet={`${small.src} ${small.width}w, ${large.src} ${large.width}w`}
      sizes="(max-width: 600px) 85vw, (max-width: 1000px) 38vw, 430px"
      width={large.width} height={large.height}
      alt={`Conditionnement Sybotanica — ${product.manufacturerTitle}`}
      loading="lazy" decoding="async" />
    <figcaption>SYBOTANICA · {product.family === "nutrition" ? "SYBASUPPORT" : "COLLECTION"}</figcaption>
  </figure>;
}
