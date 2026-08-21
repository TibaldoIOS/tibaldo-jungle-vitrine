import Link from "next/link";
import type { ReactNode } from "react";

const guideLinks: Record<string, Record<string, { href: string; label: string }>> = {
  "alocasia/imperial-red": {
    "Feuilles jaunes": { href: "/conseils/feuilles-jaunes-plantes-interieur", label: "Comprendre les feuilles jaunes" },
    Thrips: { href: "/conseils/thrips-plantes-interieur", label: "Reconnaître les thrips" },
    "Araignées rouges": { href: "/conseils/araignees-rouges-plantes", label: "Identifier les araignées rouges" },
    Pourriture: { href: "/rempotage", label: "Observer les racines avant de rempoter" },
  },
  "anthurium/clarinervium": {
    "Feuilles jaunes et molles": { href: "/conseils/feuilles-jaunes-plantes-interieur", label: "Interpréter des feuilles jaunes" },
    "Bords bruns et cassants": { href: "/conseils/humidite-plantes-tropicales", label: "Ajuster l’humidité sans saturer le pot" },
    "Thrips, cochenilles ou acariens": { href: "/conseils/thrips-plantes-interieur", label: "Commencer par identifier les thrips" },
  },
  "anthurium/warocqueanum": {
    "Pointes et marges sèches": { href: "/conseils/humidite-plantes-tropicales", label: "Stabiliser l’humidité sans supprimer l’aération" },
    "Racines brunes et molles": { href: "/rempotage", label: "Examiner les racines avant d’intervenir" },
    "Thrips, acariens ou cochenilles": { href: "/conseils/thrips-plantes-interieur", label: "Commencer par identifier les thrips" },
  },
  "anthurium/veitchii": {
    "Bords bruns": { href: "/conseils/humidite-plantes-tropicales", label: "Comprendre l’humidité intérieure" },
  },
  "monstera/deliciosa": {
    "Feuilles jaunes": { href: "/conseils/feuilles-jaunes-plantes-interieur", label: "Comprendre les feuilles jaunes" },
    Thrips: { href: "/conseils/thrips-plantes-interieur", label: "Reconnaître les thrips" },
    "Araignées rouges": { href: "/conseils/araignees-rouges-plantes", label: "Identifier les araignées rouges" },
  },
  "monstera/thai-constellation": {
    "Feuilles jaunes": { href: "/conseils/feuilles-jaunes-plantes-interieur", label: "Comprendre les feuilles jaunes" },
    "Thrips ou acariens": { href: "/conseils/araignees-rouges-plantes", label: "Distinguer acariens et autres parasites" },
  },
  "monstera/adansonii": {
    "Feuilles jaunes": { href: "/conseils/feuilles-jaunes-plantes-interieur", label: "Comprendre les feuilles jaunes" },
    "Thrips ou acariens": { href: "/conseils/thrips-plantes-interieur", label: "Commencer par identifier les thrips" },
  },
  "philodendron/billietiae": {
    "Feuilles jaunes": { href: "/conseils/feuilles-jaunes-plantes-interieur", label: "Comprendre les feuilles jaunes" },
    "Bords secs": { href: "/conseils/humidite-plantes-tropicales", label: "Équilibrer humidité et aération" },
    "Thrips ou acariens": { href: "/conseils/thrips-plantes-interieur", label: "Commencer par le guide des thrips" },
  },
};

const substrateLinks = [
  { pattern: /chips de coco/gi, href: "/substrats/chips-coco" },
  { pattern: /fibre de coco/gi, href: "/substrats/chips-coco" },
  { pattern: /écorce(?: de pin)?/gi, href: "/substrats/ecorce-de-pin" },
  { pattern: /sphaigne/gi, href: "/substrats/sphaigne-sechee" },
  { pattern: /vermiculite/gi, href: "/substrats/vermiculite" },
  { pattern: /perlite/gi, href: "/substrats/perlite" },
  { pattern: /charbon actif/gi, href: "/substrats/charbon-actif" },
  { pattern: /zéolite/gi, href: "/substrats/zeolite" },
];

const linkedSubstrateGenres = new Set(["alocasia", "anthurium", "monstera", "dicksonia"]);

export function ProblemGuideLink({ genre, slug, title }: { genre: string; slug: string; title: string }) {
  const link = guideLinks[`${genre}/${slug}`]?.[title];
  return link ? <Link className="plant-problem-guide-link" href={link.href}>{link.label} →</Link> : null;
}

export function LinkedSubstrateText({ genre, text }: { genre: string; text: string }) {
  if (!linkedSubstrateGenres.has(genre)) return <>{text}</>;
  const matches = substrateLinks.flatMap(({ pattern, href }) => {
    pattern.lastIndex = 0;
    const match = pattern.exec(text);
    return match ? [{ index: match.index, value: match[0], href }] : [];
  }).sort((a, b) => a.index - b.index);
  if (!matches.length) return <>{text}</>;

  const parts: ReactNode[] = [];
  let cursor = 0;
  for (const match of matches) {
    if (match.index < cursor) continue;
    parts.push(text.slice(cursor, match.index));
    parts.push(<Link href={match.href} key={`${match.href}-${match.index}`}>{match.value}</Link>);
    cursor = match.index + match.value.length;
  }
  parts.push(text.slice(cursor));
  return <>{parts}</>;
}

export const contextualProblemLinkCount = Object.values(guideLinks).reduce((total, links) => total + Object.keys(links).length, 0);
