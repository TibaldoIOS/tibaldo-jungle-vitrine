import Image from "next/image";
import Link from "next/link";
import type { BotanicalHubLeafPlateData } from "@/lib/plants/botanical-hub-leaf-plates";
import styles from "./BotanicalHubLeafPlate.module.css";

export default function BotanicalHubLeafPlate({ data, variant = "chapter" }: { data: BotanicalHubLeafPlateData; variant?: "chapter" | "hero-background" }) {
  if (variant === "hero-background") {
    return <div className={styles.heroBackground} data-botanical-hub-leaf-plate={data.genus} data-leaf-plate-variant={variant} aria-hidden="true">
      {data.heroLeafAssets?.map((asset, index) => <span className={styles.heroLeaf} data-hero-leaf={index + 1} key={asset}><Image unoptimized src={asset} alt="" width={720} height={720} priority={index < 4} /></span>)}
    </div>;
  }
  return <section className={styles.section} data-botanical-hub-leaf-plate={data.genus} data-leaf-plate-variant={variant} aria-labelledby={`leaf-plate-${data.genus}`}>
    <div className="shell">
      <header className={styles.heading} data-reveal>
        <div><p className={styles.eyebrow}>Quelques silhouettes du genre</p><h2 id={`leaf-plate-${data.genus}`}>{data.title}</h2></div>
        <p>{data.description}</p>
      </header>
      <figure className={styles.plate}>
        <Image className={styles.plateImage} unoptimized src={data.plateAsset} alt={data.altText} width={1536} height={1024} sizes="(max-width: 700px) calc(100vw - 32px), min(1180px, calc(100vw - 64px))" />
        <div className={styles.markers} aria-hidden="true">{data.leaves.map((leaf, index) => <span key={leaf.canonicalRoute}>{String(index + 1).padStart(2, "0")}</span>)}</div>
      </figure>
      <div className={styles.legend} aria-label="Feuilles représentées">
        {data.leaves.map((leaf, index) => <Link href={leaf.canonicalRoute} key={leaf.canonicalRoute}><span>{String(index + 1).padStart(2, "0")}</span><span><strong><i>{leaf.botanicalName.split(" ")[0]}</i> {leaf.botanicalName.split(" ").slice(1).join(" ")}</strong><small>{leaf.note}</small></span></Link>)}
      </div>
      <p className={styles.caption}>{data.caption}</p>
    </div>
  </section>;
}
