type FaqItem = { question: string; answer: string };

export default function BotanicalFaq({
  items,
  title,
  eyebrow = "Questions fréquentes",
  id = "faq",
}: {
  items: readonly FaqItem[];
  title: string;
  eyebrow?: string;
  id?: string;
}) {
  if (!items.length) return null;

  return (
    <section className="botanical-faq plant-profile-section" id={id}>
      <header className="plant-section-heading" data-reveal>
        <p className="section-kicker">{eyebrow}</p>
        <h2>{title}</h2>
      </header>
      <div className="botanical-faq-list">
        {items.map((item, index) => (
          <details key={item.question} data-reveal>
            <summary>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{item.question}</strong>
              <i aria-hidden="true" />
            </summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
