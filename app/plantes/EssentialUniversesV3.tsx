import { Arrow } from "../SiteChrome";
import BotanicalMotif from "./BotanicalMotif";

export type EssentialUniverse = {
  slug: string;
  name: string;
  descriptor: string;
  count: number;
};

export default function EssentialUniversesV3({ items }: { items: EssentialUniverse[] }) {
  return <div className="plants-v3-essential-grid">
    {items.map((item, index) => <a className={`is-card-${index + 1}`} href={`/plantes/${item.slug}`} key={item.slug} data-reveal>
      <span className="plants-v3-essential-number">{String(index + 1).padStart(2, "0")}</span>
      <BotanicalMotif genre={item.slug} />
      <span className="plants-v3-essential-copy">
        <small>{item.descriptor}</small>
        <strong>{item.name}</strong>
        <em>{item.count} {item.count > 1 ? "fiches" : "fiche"}</em>
      </span>
      <span className="plants-v3-essential-cta">Explorer <Arrow /></span>
    </a>)}
  </div>;
}
