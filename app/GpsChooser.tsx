"use client";

import { useEffect, useRef, useState } from "react";
import { Arrow } from "./SiteChrome";

type GpsApp = "apple" | "google" | "waze";

const apps: Array<{ id: GpsApp; name: string; label: string }> = [
  { id: "apple", name: "Plans", label: "Idéal sur iPhone" },
  { id: "google", name: "Google Maps", label: "Carte et trafic Google" },
  { id: "waze", name: "Waze", label: "Navigation et trafic en direct" },
];

export default function GpsChooser({ address, className = "" }: { address: string; className?: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [selected, setSelected] = useState<GpsApp>("apple");
  const destination = encodeURIComponent(address);
  const links: Record<GpsApp, string> = {
    apple: `https://maps.apple.com/?daddr=${destination}`,
    google: `https://www.google.com/maps/dir/?api=1&destination=${destination}`,
    waze: `https://www.waze.com/ul?q=${destination}&navigate=yes`,
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const closeOnBackdrop = (event: MouseEvent) => {
      if (event.target === dialog) dialog.close();
    };
    dialog.addEventListener("click", closeOnBackdrop);
    return () => dialog.removeEventListener("click", closeOnBackdrop);
  }, []);

  return <>
    <button className={`button gps-trigger ${className}`.trim()} type="button" onClick={() => dialogRef.current?.showModal()}>
      Choisir mon GPS <Arrow />
    </button>
    <dialog className="gps-dialog" ref={dialogRef} aria-labelledby="gps-dialog-title">
      <form method="dialog" className="gps-dialog-card">
        <button className="gps-dialog-close" value="cancel" aria-label="Fermer le choix de l’application GPS">×</button>
        <p className="section-kicker">Votre itinéraire</p>
        <h2 id="gps-dialog-title">Avec quelle application<br />souhaitez-vous partir&nbsp;?</h2>
        <p className="gps-dialog-address">{address}</p>
        <div className="gps-app-list" role="radiogroup" aria-label="Application GPS">
          {apps.map((app) => <label className={selected === app.id ? "is-selected" : ""} key={app.id}>
            <input type="radio" name="gps-app" value={app.id} checked={selected === app.id} onChange={() => setSelected(app.id)} />
            <span className={`gps-app-mark gps-app-mark-${app.id}`}>{app.id === "apple" ? "" : app.id === "google" ? "G" : "W"}</span>
            <span><strong>{app.name}</strong><small>{app.label}</small></span>
            <i aria-hidden="true" />
          </label>)}
        </div>
        <a className="button gps-dialog-confirm" href={links[selected]} target="_blank" rel="noreferrer" onClick={() => dialogRef.current?.close()}>
          Lancer l’itinéraire <Arrow />
        </a>
      </form>
    </dialog>
  </>;
}
