"use client";

import Image from "next/image";

import { useState } from "react";

const symptoms = [
  { id: "yellow", label: "Feuilles jaunes" },
  { id: "dry", label: "Bords secs" },
  { id: "pests", label: "Petites bêtes" },
  { id: "roots", label: "Racines hors du pot" },
  { id: "growth", label: "Croissance bloquée" },
];

export default function SosPlantDiagnostic() {
  const [selected, setSelected] = useState(symptoms[0].id);
  const [preview, setPreview] = useState<string | null>(null);
  const [imageName, setImageName] = useState("");
  const [context, setContext] = useState("Je ne sais pas");
  const current = symptoms.find((item) => item.id === selected) ?? symptoms[0];
  const subject = encodeURIComponent(`SOS Plante — ${current.label}`);

  const loadImage = (file?: File) => {
    if (!file) return;
    setImageName(file.name);
    const reader = new FileReader();
    reader.onload = () => setPreview(typeof reader.result === "string" ? reader.result : null);
    reader.readAsDataURL(file);
  };

  return <div className="photo-diagnostic" data-reveal>
    <header className="photo-diagnostic-heading"><p className="section-kicker">Dossier photo · préparation locale</p><h2>Montrez-nous<br/><em>ce qui vous inquiète.</em></h2><p>Ajoutez une photo nette, choisissez le signe principal et précisez le contexte. L’aperçu reste sur cet appareil : Tibaldo ne reçoit rien tant que vous n’envoyez pas vous-même votre message.</p></header>
    <div className="photo-diagnostic-grid">
      <div className="photo-diagnostic-form">
        <label className={`photo-dropzone${preview ? " has-image" : ""}`}>
          <input type="file" accept="image/jpeg,image/png,image/webp,image/heic" onChange={(event) => loadImage(event.target.files?.[0])}/>
          {preview ? <Image unoptimized src={preview} alt="Aperçu de la plante à diagnostiquer"/> : <span aria-hidden="true">＋</span>}
          <strong>{preview ? "Changer la photo" : "Ajouter une photo"}</strong>
          <small>{imageName || "JPG, PNG, WebP ou HEIC"}</small>
        </label>
        <fieldset><legend>Quel signe voyez-vous surtout ?</legend><div className="photo-symptoms">{symptoms.map((item) => <button className={selected === item.id ? "is-selected" : ""} key={item.id} type="button" onClick={() => setSelected(item.id)}>{item.label}</button>)}</div></fieldset>
        <label className="photo-context"><span>Depuis quand ?</span><select value={context} onChange={(event) => setContext(event.target.value)}><option>Je ne sais pas</option><option>Depuis quelques jours</option><option>Depuis plusieurs semaines</option><option>Après un rempotage</option><option>Après un changement de place</option></select></label>
      </div>
      <div className="sos-result is-ready" aria-live="polite">
        <p className="section-kicker">Prêt pour la relecture humaine</p>
        <h2>{current.label}</h2><p>Ajoutez au message une vue entière, le symptôme de près, le revers des feuilles et la surface du pot. Une photographie seule ne permet pas d’affirmer une cause.</p><dl><div><dt>Contexte indiqué</dt><dd>{context}</dd></div><div><dt>Validation</dt><dd>Tibaldo relit avant réponse</dd></div></dl><strong>Le bouton prépare un email. Votre photographie n’est pas jointe automatiquement : ajoutez-la dans votre messagerie avant l’envoi.</strong><a className="button button-green" href={`mailto:jungle@tibaldo.fr?subject=${subject}&body=Bonjour,%0A%0ASymptôme%20principal%20:%20${encodeURIComponent(current.label)}%0AContexte%20:%20${encodeURIComponent(context)}%0A%0AJe%20joins%20mes%20photos%20à%20ce%20message.%0A`}>Préparer mon email au Studio ↗</a><a className="sos-studio-link" href="/contact">Les photos ne suffisent pas ? Venir au Studio</a>
      </div>
    </div>
  </div>;
}
