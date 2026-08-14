type ScientificNameParts = {
  genus: string;
  epithet: string | null;
  suffix: string;
};

function capitaliseGenus(value: string) {
  const lower = value.toLocaleLowerCase("fr-FR");
  return lower.charAt(0).toLocaleUpperCase("fr-FR") + lower.slice(1);
}

export function normaliseScientificName(value: string): ScientificNameParts {
  const words = value.trim().split(/\s+/).filter(Boolean);
  const genus = capitaliseGenus(words.shift() ?? "");
  const candidate = words[0] ?? "";
  const hasSpecificEpithet = /^[\p{L}][\p{L}-]*$/u.test(candidate);
  const epithet = hasSpecificEpithet ? candidate.toLocaleLowerCase("fr-FR") : null;
  if (epithet) words.shift();

  return { genus, epithet, suffix: words.join(" ") };
}

export default function ScientificName({ name, className = "" }: { name: string; className?: string }) {
  const { genus, epithet, suffix } = normaliseScientificName(name);
  return <span className={`scientific-name ${className}`.trim()}>
    <span className="scientific-binomial">
      <i className="scientific-genus">{genus}</i>
      {epithet && <><span aria-hidden="true"> </span><i className="scientific-epithet">{epithet}</i></>}
    </span>
    {suffix && <><span aria-hidden="true"> </span><span className="scientific-suffix">{suffix}</span></>}
  </span>;
}
