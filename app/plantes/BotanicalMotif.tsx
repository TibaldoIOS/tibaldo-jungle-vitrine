import type { CSSProperties } from "react";
import { StrelitziaBotanicalIllustration } from "./BotanicalHeroIllustrations";

const approvedMasks: Record<string, string> = {
  alocasia: "/images/botanical-heroes/prototypes/alocasia-v32.svg",
  chlorophytum: "/images/botanical-heroes/prototypes/chlorophytum-v2.svg",
  dicksonia: "/images/botanical-heroes/prototypes/dicksonia-prototype.svg",
};

export default function BotanicalMotif({ genre, className = "" }: { genre: string; className?: string }) {
  if (genre === "strelitzia") return <span className={`botanical-motif botanical-motif-svg ${className}`} aria-hidden="true"><StrelitziaBotanicalIllustration /></span>;
  const asset = approvedMasks[genre];
  if (!asset) return <span className={`botanical-motif botanical-motif-abstract ${className}`} aria-hidden="true"><i /><i /><i /></span>;
  return <span className={`botanical-motif botanical-motif-mask ${className}`} style={{ "--botanical-motif-mask": `url("${asset}")` } as CSSProperties} aria-hidden="true" />;
}
