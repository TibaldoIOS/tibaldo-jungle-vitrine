"use client";

import Link from "next/link";

import { useId, useState } from "react";
import { Arrow } from "../SiteChrome";
import BotanicalMotif from "./BotanicalMotif";

export type BotanicalDirectoryItem = {
  slug: string;
  name: string;
  descriptor: string;
  description: string;
  count: number;
};

function Chevron({ open }: { open: boolean }) {
  return <svg className="directory-chevron" viewBox="0 0 20 20" aria-hidden="true" focusable="false" data-open={open}><path d="m5 8 5 5 5-5" /></svg>;
}

export default function BotanicalDirectoryV3({ items }: { items: BotanicalDirectoryItem[] }) {
  const baseId = useId();
  const [active, setActive] = useState(0);
  const current = items[active];

  return <div className="botanical-directory-v3">
    <div className="botanical-directory-list" role="list">
      {items.map((item, index) => {
        const open = active === index;
        const panelId = `${baseId}-panel-${index}`;
        return <article className={open ? "is-active" : undefined} key={item.slug} role="listitem">
          <div className="botanical-directory-row">
            <button type="button" aria-expanded={open} aria-controls={panelId} onClick={() => setActive(open ? -1 : index)}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{item.name}</strong>
              <small>{item.descriptor}</small>
              <em>{item.count} {item.count > 1 ? "fiches" : "fiche"}</em>
              <Chevron open={open} />
            </button>
            <Link href={`/plantes/${item.slug}`} aria-label={`Ouvrir le genre ${item.name}`}><Arrow /></Link>
          </div>
          <div className="botanical-directory-mobile-panel" id={panelId} aria-hidden={!open} data-open={open}>
            <div><BotanicalMotif genre={item.slug} /><p>{item.description}</p><Link tabIndex={open ? 0 : -1} href={`/plantes/${item.slug}`}>Découvrir {item.name} <Arrow /></Link></div>
          </div>
        </article>;
      })}
    </div>
    <aside className="botanical-directory-stage" aria-live="polite">
      {current ? <>
        <BotanicalMotif genre={current.slug} />
        <span>{String(active + 1).padStart(2, "0")} · Index botanique</span>
        <h3>{current.name}</h3>
        <p>{current.description}</p>
        <Link href={`/plantes/${current.slug}`}>Entrer dans le genre <Arrow /></Link>
      </> : <><span>31 · Index botanique</span><h3>Choisissez un genre.</h3><p>Chaque univers reste accessible directement dans la liste.</p></>}
    </aside>
  </div>;
}
