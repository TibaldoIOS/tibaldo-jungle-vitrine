import type { PlantEntry } from "@/lib/plants/types";
import GoldenSpeciesProfile from "./GoldenSpeciesProfile";

export default function PlantProfile({ plant }: { plant: PlantEntry }) {
  return <GoldenSpeciesProfile plant={plant} />;
}
