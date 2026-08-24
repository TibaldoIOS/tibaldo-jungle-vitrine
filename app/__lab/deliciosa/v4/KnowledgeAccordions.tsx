"use client";
import { useState } from "react";
import { v4Diagnostics, v4Faq } from "./knowledge-scenes";

export function DiagnosticInvestigations() {
  const [open, setOpen] = useState<string | null>(v4Diagnostics[0]?.diagnostic_id ?? null);
  return <div className="v4-diagnostic-list">{v4Diagnostics.map((item, index) => {
    const active = open === item.diagnostic_id; const panel = `${item.diagnostic_id}-panel`;
    return <article key={item.diagnostic_id} className={active ? "is-open" : ""}>
      <button type="button" aria-expanded={active} aria-controls={panel} onClick={() => setOpen(active ? null : item.diagnostic_id)}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item.symptom_label}</strong><i aria-hidden="true">{active ? "−" : "+"}</i></button>
      <div id={panel} hidden={!active} className="v4-investigation"><p className="v4-answer">{item.short_answer}</p><div><h3>Causes possibles</h3><ul>{item.possible_causes.map((x) => <li key={x}>{x}</li>)}</ul></div><div><h3>Comment vérifier</h3><ul>{item.what_to_check.map((x) => <li key={x}>{x}</li>)}</ul></div><div><h3>Action prudente</h3><ul>{item.prudent_action.map((x) => <li key={x}>{x}</li>)}</ul></div><p className="v4-limit">{item.escalation_or_limit}</p></div>
    </article>;
  })}</div>;
}

export function KnowledgeFaq() {
  const [open, setOpen] = useState<string | null>(null);
  return <div className="v4-faq-list">{v4Faq.map((item, index) => { const active = open === item.faq_id; const panel = `${item.faq_id}-panel`; return <article key={item.faq_id}><button type="button" aria-expanded={active} aria-controls={panel} onClick={() => setOpen(active ? null : item.faq_id)}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item.question}</strong><i aria-hidden="true">{active ? "−" : "+"}</i></button><div id={panel} hidden={!active}><b>{item.short_answer}</b><p>{item.long_answer}</p></div></article>; })}</div>;
}
