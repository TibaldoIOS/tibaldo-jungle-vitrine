"use client";

import { useMemo, useState } from "react";

const symptoms = [
  { id: "yellow", label: "Feuilles jaunes", result: "Vérifiez d’abord l’humidité au cœur du pot. Un substrat constamment humide, des racines sombres ou une odeur inhabituelle peuvent signaler un excès d’eau ou un début de pourriture." },
  { id: "dry", label: "Bords secs", result: "Les bords secs peuvent venir d’un arrosage irrégulier, d’un air très sec, de sels accumulés ou d’une exposition trop directe. Le contexte compte davantage qu’un seul symptôme." },
  { id: "pests", label: "Petites bêtes", result: "Isolez la plante des autres. Photographiez le revers des feuilles, les pétioles et les éventuelles toiles ou traces argentées afin d’identifier thrips, cochenilles ou araignées rouges." },
  { id: "roots", label: "Racines hors du pot", result: "Des racines visibles ne rendent pas toujours le rempotage urgent. Nous regardons la densité de la motte, la vitesse de séchage et la stabilité avant de conseiller un pot supérieur." },
  { id: "growth", label: "Croissance bloquée", result: "La lumière, la saison, la température et l’état racinaire doivent être vérifiés avant d’ajouter de l’engrais. Une plante au repos ou fragilisée n’a pas besoin d’être davantage nourrie." },
];

export default function SosPlantDiagnostic() {
  const [selected, setSelected] = useState(symptoms[0].id);
  const [preview, setPreview] = useState<string | null>(null);
  const [imageName, setImageName] = useState("");
  const [context, setContext] = useState("Je ne sais pas");
  const [analyzed, setAnalyzed] = useState(false);
  const current = useMemo(() => symptoms.find((item) => item.id === selected) ?? symptoms[0], [selected]);
  const subject = encodeURIComponent(`SOS Plante — ${current.label}`);

  const loadImage = (file?: File) => {
    if (!file) return;
    setImageName(file.name);
    setAnalyzed(false);
    const reader = new FileReader();
    reader.onload = () => setPreview(typeof reader.result === "string" ? reader.result : null);
    reader.readAsDataURL(file);
  };

  return <div className="photo-diagnostic" data-reveal>
    <header className="photo-diagnostic-heading"><p className="section-kicker">Assistant photo · version bêta</p><h2>Montrez-nous<br/><em>ce qui vous inquiète.</em></h2><p>Ajoutez une photo nette, choisissez le signe principal et précisez le contexte. Le résultat reste une première orientation, jamais un diagnostic certain.</p></header>
    <div className="photo-diagnostic-grid">
      <div className="photo-diagnostic-form">
        <label className={`photo-dropzone${preview ? " has-image" : ""}`}>
          <input type="file" accept="image/jpeg,image/png,image/webp,image/heic" onChange={(event) => loadImage(event.target.files?.[0])}/>
          {preview ? <img src={preview} alt="Aperçu de la plante à diagnostiquer"/> : <span aria-hidden="true">＋</span>}
          <strong>{preview ? "Changer la photo" : "Ajouter une photo"}</strong>
          <small>{imageName || "JPG, PNG, WebP ou HEIC"}</small>
        </label>
        <fieldset><legend>Quel signe voyez-vous surtout ?</legend><div className="photo-symptoms">{symptoms.map((item) => <button className={selected === item.id ? "is-selected" : ""} key={item.id} type="button" onClick={() => { setSelected(item.id); setAnalyzed(false); }}>{item.label}</button>)}</div></fieldset>
        <label className="photo-context"><span>Depuis quand ?</span><select value={context} onChange={(event) => {setContext(event.target.value);setAnalyzed(false);}}><option>Je ne sais pas</option><option>Depuis quelques jours</option><option>Depuis plusieurs semaines</option><option>Après un rempotage</option><option>Après un changement de place</option></select></label>
        <button className="button button-green photo-analyze" type="button" disabled={!preview} onClick={() => setAnalyzed(true)}>{preview ? "Lancer le pré-diagnostic" : "Ajoutez d’abord une photo"}</button>
      </div>
      <div className={`sos-result${analyzed ? " is-ready" : ""}`} aria-live="polite">
        <p className="section-kicker">Première lecture</p>
        {analyzed ? <><h2>{current.label}</h2><p>{current.result}</p><dl><div><dt>Contexte indiqué</dt><dd>{context}</dd></div><div><dt>Niveau de confiance</dt><dd>Orientation prudente · à confirmer</dd></div></dl><strong>Une photo seule ne montre ni l’humidité au cœur du pot ni l’état complet des racines. Ne rempotez pas et ne traitez pas au hasard.</strong><a className="button button-green" href={`mailto:jungle@tibaldo.fr?subject=${subject}&body=Bonjour,%0A%0ASymptôme%20principal%20:%20${encodeURIComponent(current.label)}%0AContexte%20:%20${encodeURIComponent(context)}%0A%0AJe%20joins%20mes%20photos%20à%20ce%20message.%0A`}>Confirmer avec le Studio ↗</a></> : <div className="sos-result-placeholder"><span>01</span><h3>Votre pré-diagnostic apparaîtra ici.</h3><p>Choisissez une photo bien éclairée, sans filtre, avec une vue générale et si possible un détail du revers des feuilles.</p></div>}
      </div>
    </div>
  </div>;
}
