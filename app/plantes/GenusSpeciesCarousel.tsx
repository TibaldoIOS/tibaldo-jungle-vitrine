import Image from "next/image";
import Link from "next/link";
import type { PlantEntry } from "@/lib/plants/types";
import { publicPlantImageAlt } from "@/lib/plants/types";
import { documentaryGallery } from "@/lib/plants/documentary-media";
import { Arrow } from "../SiteChrome";

export default function GenusSpeciesCarousel({ genre, genusName, plants }: {
  genre: string;
  genusName: string;
  plants: readonly PlantEntry[];
}) {
  return (
    <section className="genus-species-carousel shell" aria-labelledby={`genus-carousel-${genre}`} data-long-grid-visible>
      <header data-reveal>
        <p className="section-kicker">Toutes les fiches du genre</p>
        <h2 id={`genus-carousel-${genre}`}>Explorer les <em>{genusName}.</em></h2>
        <p>{plants.length ? `${plants.length} ${plants.length > 1 ? "espèces et cultivars documentés" : "fiche documentée"}, sans confondre encyclopédie et disponibilité en boutique.` : "Les premières fiches documentées rejoindront ici l’encyclopédie."}</p>
      </header>
      {plants.length ? (
        <div className="genus-carousel-track" aria-label={`Toutes les fiches ${genusName}`}>
          {plants.map((plant) => {
            const image = documentaryGallery(plant)[0];
            const hasPhoto = Boolean(image);
            return (
              <Link className={`genus-carousel-card${hasPhoto ? " has-photo" : " has-media-gap"}`} href={`/plantes/${plant.genre}/${plant.slug}`} key={`${plant.genre}/${plant.slug}`}>
                <div className="genus-carousel-media">
                  {hasPhoto ? (
                    <Image unoptimized src={image.src} alt={publicPlantImageAlt(image.src, plant.botanicalName, image.alt)} width={image.width} height={image.height} loading="lazy" />
                  ) : (
                    <div className="genus-carousel-media-gap" aria-label={`Photographie réelle de ${plant.botanicalName} à documenter`}><span aria-hidden="true">{plant.taxonomy.genus.slice(0, 1)}</span><small>Photographie réelle<br />à documenter</small></div>
                  )}
                </div>
                <div className="genus-carousel-copy">
                  <span>{plant.taxonomy.cultivar ? "Cultivar / sélection" : "Espèce / taxon"}</span>
                  <h3>{plant.listingName ?? plant.botanicalName}</h3>
                  <p>{plant.subtitle}</p>
                  <strong>Lire la fiche <Arrow /></strong>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <p className="genus-carousel-empty">Aucune fiche spécifique n’est encore publiée pour ce genre. Le guide de culture reste consultable sans inventer de plante ni de photographie.</p>
      )}
    </section>
  );
}
