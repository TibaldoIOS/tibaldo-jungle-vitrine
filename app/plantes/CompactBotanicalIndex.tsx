import Link from "next/link";

import { Arrow } from "../SiteChrome";

export type CompactBotanicalIndexItem = {
  slug: string;
  name: string;
  descriptor: string;
  count: number;
};

export default function CompactBotanicalIndex({ items }: { items: CompactBotanicalIndexItem[] }) {
  return (
    <nav className="plants-compact-index" aria-label="Index complet des genres botaniques">
      {items.map((item, index) => (
        <Link href={`/plantes/${item.slug}`} key={item.slug}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <span>
            <strong>{item.name}</strong>
            <small>{item.descriptor}</small>
          </span>
          <em>{item.count} {item.count > 1 ? "fiches" : "fiche"}</em>
          <Arrow />
        </Link>
      ))}
    </nav>
  );
}
