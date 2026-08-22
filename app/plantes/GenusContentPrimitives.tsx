import type { ReactNode } from "react";
import Link from "next/link";
import { Arrow } from "../SiteChrome";

type FeatureTone = "cream" | "forest" | "sage" | "rose";

type FeatureBase = {
  label: string;
  className?: string;
  tone?: FeatureTone;
};

function featureClass(kind: string, tone: FeatureTone, className?: string) {
  return ["genus-feature", `genus-${kind}`, `genus-tone-${tone}`, className]
    .filter(Boolean)
    .join(" ");
}

export function MetricFeature({
  label,
  value,
  title,
  copy,
  tone = "forest",
  className,
}: FeatureBase & { value: string; title: string; copy?: string }) {
  return (
    <article className={featureClass("metric-feature", tone, className)} data-reveal>
      <span className="genus-feature-label">{label}</span>
      <strong className="genus-metric-value">{value}</strong>
      <h3>{title}</h3>
      {copy && <p>{copy}</p>}
    </article>
  );
}

export function EditorialFeature({
  label,
  title,
  copy,
  children,
  tone = "cream",
  className,
}: FeatureBase & { title: string; copy: string; children?: ReactNode }) {
  return (
    <article className={featureClass("editorial-feature", tone, className)} data-reveal>
      <span className="genus-feature-label">{label}</span>
      <div className="genus-editorial-copy">
        <h3>{title}</h3>
        <p>{copy}</p>
        {children}
      </div>
    </article>
  );
}

export function ProcessFeature({
  label,
  title,
  copy,
  steps,
  tone = "cream",
  className,
}: FeatureBase & {
  title: string;
  copy: string;
  steps: readonly { title: string; text: string }[];
}) {
  return (
    <article className={featureClass("process-feature", tone, className)} data-reveal>
      <header>
        <span className="genus-feature-label">{label}</span>
        <h3>{title}</h3>
        <p>{copy}</p>
      </header>
      <ol>
        {steps.map((step, index) => (
          <li key={step.title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{step.title}</strong>
            <small>{step.text}</small>
          </li>
        ))}
      </ol>
    </article>
  );
}

export function CompositionFeature({
  label,
  title,
  copy,
  items,
  result,
  tone = "sage",
  className,
}: FeatureBase & {
  title: string;
  copy: string;
  items: readonly { label: string; href?: string }[];
  result: string;
}) {
  return (
    <article className={featureClass("composition-feature", tone, className)} data-reveal>
      <header>
        <span className="genus-feature-label">{label}</span>
        <h3>{title}</h3>
        <p>{copy}</p>
      </header>
      <div className="genus-composition-equation" aria-label={`${items.map((item) => item.label).join(", ")} : ${result}`}>
        <div>
          {items.map((item, index) => (
            <span key={item.label}>
              {index > 0 && <i aria-hidden="true">+</i>}
              {item.href ? <Link href={item.href}>{item.label}</Link> : <b>{item.label}</b>}
            </span>
          ))}
        </div>
        <strong><i aria-hidden="true">→</i>{result}</strong>
      </div>
    </article>
  );
}

export function ServiceBridge({
  label,
  title,
  advice,
  serviceTitle,
  serviceCopy,
  href,
  cta,
  tone = "rose",
  className,
}: FeatureBase & {
  title: string;
  advice: string;
  serviceTitle: string;
  serviceCopy: string;
  href: string;
  cta: string;
}) {
  return (
    <aside className={featureClass("service-bridge", tone, className)} data-reveal>
      <div className="genus-service-advice">
        <span className="genus-feature-label">{label}</span>
        <p>{advice}</p>
      </div>
      <div className="genus-service-action">
        <small>Service Tibaldo Jungle</small>
        <h3>{title}</h3>
        <strong>{serviceTitle}</strong>
        <p>{serviceCopy}</p>
        <Link className="button button-light" href={href}>{cta} <Arrow /></Link>
      </div>
    </aside>
  );
}
