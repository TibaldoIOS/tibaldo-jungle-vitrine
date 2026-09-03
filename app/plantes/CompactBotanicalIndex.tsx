import Link from "next/link";

import { Arrow } from "../SiteChrome";
import VarietyCount from "./VarietyCount";

export type CompactBotanicalIndexItem = {
  slug: string;
  name: string;
  descriptor: string;
  count: number;
};

export default function CompactBotanicalIndex({ items }: { items: CompactBotanicalIndexItem[] }) {
  return (
    <>
    <p className="plants-index-scroll-hint" id="botanical-index-scroll-hint">{items.length} genres · Faites défiler pour explorer</p>
    <nav className="plants-compact-index" aria-label="Index complet des genres botaniques" aria-describedby="botanical-index-scroll-hint" tabIndex={0}>
      {items.map((item) => (
        <Link href={`/plantes/${item.slug}`} key={item.slug}>
          <span>
            <strong>{item.name}</strong>
          </span>
          <em><VarietyCount count={item.count} /></em>
          <Arrow />
        </Link>
      ))}
    </nav>
    </>
  );
}
