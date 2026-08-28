"use client";

import Link from "next/link";

import { useMemo, useState } from "react";
import type { FlowerEntry } from "@/lib/flowers/catalog";
import FlowerQuoteForm from "./FlowerQuoteForm";

const normalize = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

export default function FlowerExplorer({
  flowers,
}: {
  flowers: FlowerEntry[];
}) {
  const [query, setQuery] = useState("");
  const [color, setColor] = useState("");
  const [season, setSeason] = useState("");
  const [style, setStyle] = useState("");
  const [use, setUse] = useState("");
  const [selection, setSelection] = useState<string[]>([]);
  const values = (key: "colors" | "seasons" | "styles" | "uses") =>
    [...new Set(flowers.flatMap((flower) => flower[key]))].sort();
  const results = useMemo(
    () =>
      flowers.filter((flower) => {
        const haystack = normalize(
          [
            flower.name,
            flower.botanicalName,
            flower.family,
            flower.description,
          ].join(" "),
        );
        return (
          (!query || haystack.includes(normalize(query))) &&
          (!color || flower.colors.includes(color)) &&
          (!season || flower.seasons.includes(season)) &&
          (!style || flower.styles.includes(style)) &&
          (!use || flower.uses.includes(use))
        );
      }),
    [flowers, query, color, season, style, use],
  );
  const toggle = (slug: string) =>
    setSelection((current) =>
      current.includes(slug)
        ? current.filter((item) => item !== slug)
        : [...current, slug],
    );
  const selectedFlowers = flowers.filter((flower) =>
    selection.includes(flower.slug),
  );

  return (
    <section
      className="flower-explorer shell"
      aria-labelledby="flower-explorer-title"
    >
      <header data-reveal>
        <p className="section-kicker">L’herbier des possibles</p>
        <h2 id="flower-explorer-title">
          Chercher une fleur.
          <br />
          <em>Composer une intention.</em>
        </h2>
        <p>
          Explorez une sélection indicative. Les couleurs, longueurs et variétés
          exactes sont confirmées selon la saison et les arrivages
          professionnels.
        </p>
      </header>
      <div className="flower-filter-panel" data-reveal>
        <label className="flower-query">
          <span>Nom courant ou botanique</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Gypsophile, Rosa, hortensia…"
          />
        </label>
        <div className="flower-filters">
          <label>
            <span>Couleur</span>
            <select
              value={color}
              onChange={(event) => setColor(event.target.value)}
            >
              <option value="">Toutes</option>
              {values("colors").map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label>
            <span>Saison</span>
            <select
              value={season}
              onChange={(event) => setSeason(event.target.value)}
            >
              <option value="">Toutes</option>
              {values("seasons").map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label>
            <span>Style</span>
            <select
              value={style}
              onChange={(event) => setStyle(event.target.value)}
            >
              <option value="">Tous</option>
              {values("styles").map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label>
            <span>Utilisation</span>
            <select
              value={use}
              onChange={(event) => setUse(event.target.value)}
            >
              <option value="">Toutes</option>
              {values("uses").map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="flower-filter-status">
          <strong>{results.length} possibilités</strong>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setColor("");
              setSeason("");
              setStyle("");
              setUse("");
            }}
          >
            Effacer les filtres
          </button>
        </div>
      </div>
      <div className="flower-grid">
        {results.map((flower, index) => (
          <article
            key={flower.slug}
            className={`${index === 0 ? "is-featured " : ""}${selection.includes(flower.slug) ? "is-selected" : ""}`}
            data-reveal
          >
            <div
              className={`flower-art flower-art-${index % 6}`}
              aria-hidden="true"
            >
              <span>{flower.name.slice(0, 1)}</span>
            </div>
            <div className="flower-card-copy">
              <span>
                {flower.family} · {flower.category}
              </span>
              <h3>{flower.name}</h3>
              <i>{flower.botanicalName}</i>
              <p>{flower.description}</p>
              <ul>
                <li>{flower.seasons.join(" · ")}</li>
                <li>Tenue indicative : {flower.vaseLife}</li>
              </ul>
              {flower.faq && (
                <Link
                  className="flower-card-detail"
                  href={`/fleurs/${flower.slug}`}
                >
                  Découvrir la fiche{" "}
                  <svg viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M5 15 15 5M7 5h8v8" />
                  </svg>
                </Link>
              )}
              <button type="button" onClick={() => toggle(flower.slug)}>
                {selection.includes(flower.slug)
                  ? "Retirer de mon projet"
                  : "Ajouter à mon projet"}
                <span aria-hidden="true">
                  {selection.includes(flower.slug) ? "−" : "+"}
                </span>
              </button>
            </div>
          </article>
        ))}
      </div>
      <aside
        className={`flower-selection${selection.length ? " is-visible" : ""}`}
        aria-live="polite"
      >
        <div>
          <span>Votre sélection d’inspiration</span>
          <strong>
            {selection.length} {selection.length > 1 ? "fleurs" : "fleur"}
          </strong>
        </div>
        <a href="#demande-devis" data-action="quote">
          Préparer mon devis <span>↓</span>
        </a>
      </aside>
      <section className="flower-explorer-quote" id="demande-devis">
        <header>
          <p className="section-kicker">Projet floral</p>
          <h2>
            Transformer l’inspiration
            <br />
            <em>en demande concrète.</em>
          </h2>
          <p>
            Votre sélection sera jointe à la demande. Aucun achat n’est
            déclenché avant votre validation du devis.
          </p>
          <ol className="flower-order-steps">
            <li>
              <span>01</span>Vous décrivez le projet
            </li>
            <li>
              <span>02</span>Nous vérifions les arrivages
            </li>
            <li>
              <span>03</span>Vous validez le devis
            </li>
            <li>
              <span>04</span>L’acompte confirme la commande
            </li>
          </ol>
          {selectedFlowers.length > 0 && (
            <div className="flower-selected-summary">
              <strong>Votre sélection</strong>
              <div>
                {selectedFlowers.map((flower) => (
                  <button
                    type="button"
                    key={flower.slug}
                    onClick={() => toggle(flower.slug)}
                  >
                    {flower.name}
                    <span>×</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </header>
        <FlowerQuoteForm initialFlowers={selection} />
      </section>
    </section>
  );
}
