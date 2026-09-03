import Link from "next/link";
import type { PlantEntry } from "@/lib/plants/types";
import { Arrow } from "../SiteChrome";
import styles from "./SpeciesCareLinks.module.css";

const materials = [
  { token: "écorce", href: "/substrats/ecorce-de-pin", label: "Écorce de pin" },
  { token: "chips de coco", href: "/substrats/chips-coco", label: "Chips de coco" },
  { token: "perlite", href: "/substrats/perlite", label: "Perlite" },
  { token: "sphaigne", href: "/substrats/sphaigne-sechee", label: "Sphaigne séchée" },
  { token: "vermiculite", href: "/substrats/vermiculite", label: "Vermiculite" },
] as const;

const pilotSpecies = new Set([
  "alocasia/imperial-red",
  "anthurium/clarinervium",
  "anthurium/pallidiflorum",
  "anthurium/veitchii",
  "monstera/thai-constellation",
]);

export default function SpeciesCareLinks({ plant }: { plant: PlantEntry }) {
  if (!pilotSpecies.has(`${plant.genre}/${plant.slug}`)) return null;
  const substrate = plant.care.substrate.toLocaleLowerCase("fr-FR");
  const materialLinks = materials.filter((item) => substrate.includes(item.token)).slice(0, 2);

  return (
    <nav className={styles.links} aria-label={`Conseils et substrats liés à ${plant.displayName}`} data-seo-care-links>
      <p>Pour aller plus loin</p>
      <div>
        <Link href="/conseils/lumiere-plantes-interieur">Lire la lumière <Arrow /></Link>
        <Link href="/conseils/arroser-plantes-interieur">Ajuster l’arrosage <Arrow /></Link>
        <Link href="/conseils/choisir-substrat-plante-interieur">Comprendre le mélange <Arrow /></Link>
        {materialLinks.map((item) => <Link href={item.href} key={item.href}>Découvrir {item.label} <Arrow /></Link>)}
      </div>
    </nav>
  );
}
