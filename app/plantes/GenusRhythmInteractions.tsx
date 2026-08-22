"use client";

import { useId, useState } from "react";

export type SymptomItem = {
  title: string;
  causes: string;
  reflex: string;
};

export function SymptomIndex({ items }: { items: readonly SymptomItem[] }) {
  const groupId = useId();
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="rhythm-symptoms">
      <div className="rhythm-symptom-index" aria-label="Signes observés">
        {items.map((item, index) => {
          const active = activeIndex === index;
          return (
            <button
              aria-controls={`${groupId}-symptom-${index}`}
              aria-expanded={active}
              className={active ? "is-active" : undefined}
              key={item.title}
              onClick={() => setActiveIndex(index)}
              type="button"
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{item.title}</strong>
              <i aria-hidden="true">{active ? "−" : "+"}</i>
            </button>
          );
        })}
      </div>

      <div className="rhythm-symptom-panels">
        {items.map((item, index) => {
          const active = activeIndex === index;
          return (
            <article
              aria-hidden={!active}
              className={active ? "is-active" : undefined}
              id={`${groupId}-symptom-${index}`}
              key={item.title}
            >
              <div>
                <span>Signe observé</span>
                <h3>{item.title}</h3>
              </div>
              <div>
                <span>Causes possibles</span>
                <p>{item.causes}</p>
              </div>
              <div>
                <span>Bon réflexe</span>
                <p>{item.reflex}</p>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export function CompactFaq({ items, name }: {
  items: readonly { question: string; answer: string }[];
  name: string;
}) {
  const groupId = useId();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="rhythm-faq-list">
      {items.map((item, index) => {
        const active = activeIndex === index;
        const panelId = `${groupId}-faq-${index}`;
        return (
          <article className={active ? "is-active" : undefined} key={item.question}>
            <h3>
              <button
                aria-controls={panelId}
                aria-expanded={active}
                onClick={() => setActiveIndex(active ? null : index)}
                type="button"
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{item.question}</strong>
                <i aria-hidden="true">{active ? "−" : "+"}</i>
              </button>
            </h3>
            <div aria-hidden={!active} className="rhythm-faq-panel" data-open={active} id={panelId}>
              <div><p>{item.answer}</p></div>
            </div>
          </article>
        );
      })}
      <p className="sr-only">Questions fréquentes sur les {name}.</p>
    </div>
  );
}
