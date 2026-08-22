"use client";
import { useEffect, useState } from "react";
const sections = [["identite", "Identité"], ["entretien", "Entretien"], ["problemes", "Problèmes"], ["comparaison", "Comparer"], ["conseils", "Conseils"], ["faq", "FAQ"]];
export default function PlantSectionNav() {
  const [active, setActive] = useState("identite");
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => { const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]; if (visible?.target.id) setActive(visible.target.id); }, { rootMargin: "-20% 0px -65% 0px", threshold: [0.05, 0.3] });
    sections.forEach(([id]) => { const element = document.getElementById(id); if (element) observer.observe(element); });
    return () => observer.disconnect();
  }, []);
  return <div className="plant-section-nav-shell"><p>Dans cette fiche</p><nav className="plant-section-nav" aria-label="Sommaire de la fiche plante">{sections.map(([id, label], index) => <a className={active === id ? "is-active" : ""} href={`#${id}`} key={id}><span>0{index + 1}</span><strong>{label}</strong><svg viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="M5 5h10v10M15 5 5 15" /></svg></a>)}</nav></div>;
}
