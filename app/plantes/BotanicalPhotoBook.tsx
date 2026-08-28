import Image from "next/image";
import type { PlantEntry } from "@/lib/plants/types";

export default function BotanicalPhotoBook({ plant, images }: { plant: PlantEntry; images: PlantEntry["gallery"] }) {
  if (!images.length) return null;
  const sequence = images.length > 1
    ? images.map((image) => ({ image, detail: false }))
    : [
        { image: images[0], detail: false },
        { image: { ...images[0], alt: `${images[0].alt}, détail du feuillage`, caption: `Détail recadré dans la même photographie réelle : ${images[0].caption}` }, detail: true },
      ];
  return <section className="botanical-photo-book plant-profile-section" aria-labelledby="botanical-photo-book-title" data-reveal>
    <header><p className="section-kicker">Carnet photographique</p><h2 id="botanical-photo-book-title">Une plante.<br /><em>Plusieurs lectures.</em></h2><p>Le port, la feuille et le détail se découvrent comme des pages superposées, sans interrompre le défilement.</p></header>
    <div className={`botanical-photo-book-stack${sequence.length > 3 ? " has-many-pages" : ""}`} role="list" aria-label={`Séquence photographique de ${plant.botanicalName}`}>
      {sequence.map(({ image, detail }, index) => <figure className={`is-page-${index + 1}${detail ? " is-detail" : ""}`} key={`${image.src}-${index}`} role="listitem">
        <Image unoptimized src={image.src} alt={image.alt} width={image.width} height={image.height} loading="lazy" />
        <figcaption><span>0{index + 1}</span>{image.caption}</figcaption>
      </figure>)}
    </div>
  </section>;
}
