import Link from "next/link";
import { Arrow } from "../SiteChrome";

type Props = {
  speciesName: string;
  genusName: string;
  genusSlug: string;
};

export default function SpeciesLocalStudio({
  speciesName,
  genusName,
  genusSlug,
}: Props) {
  return (
    <section
      className="species-local-studio shell"
      aria-labelledby="species-local-studio-title"
      data-reveal
    >
      <div className="species-local-studio-copy">
        <p className="section-kicker">Cette plante et le Studio · Lille</p>
        <h2 id="species-local-studio-title">
          {speciesName}
          <br />
          <em>chez TIBALDO Jungle.</em>
        </h2>
        <p>
          Cette fiche rassemble les repères botaniques et horticoles utiles pour
          comprendre l’espèce. Au Studio Végétal — TIBALDO Jungle, à Lille, ces
          repères servent à relier lumière, arrosage, racines et substrat avant
          tout conseil.
        </p>
        <p>
          La fiche encyclopédique ne constitue pas une annonce de disponibilité.
          Les arrivages, prix et stocks éventuels sont présentés uniquement sur
          une offre commerciale autoritaire.
        </p>
      </div>
      <aside className="species-local-studio-card" aria-label="Adresse et liens utiles">
        <span>Studio physique</span>
        <strong>Studio Végétal — TIBALDO Jungle</strong>
        <address>
          3 place de l’Arbonnoise
          <br />
          59000 Lille
        </address>
        <nav aria-label={`Continuer après la fiche ${speciesName}`}>
          <Link href={`/plantes/${genusSlug}`}>
            Comparer les {genusName} <Arrow />
          </Link>
          <Link href="/plantes">
            Explorer les plantes <Arrow />
          </Link>
          <Link href="/boutique-plantes-lille">
            Découvrir le Studio à Lille <Arrow />
          </Link>
        </nav>
      </aside>
    </section>
  );
}
