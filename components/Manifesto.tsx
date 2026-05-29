import Reveal, { StaggerGroup, StaggerItem } from "./Reveal";

/**
 * Restrained institutional manifesto.
 * Three short statements. Generous whitespace. Serif display. Tonal weight.
 */
const STATEMENTS = [
  {
    label: "I",
    body: "We exist to compound capital alongside operators, across decades, in markets where the rule of law is durable.",
  },
  {
    label: "II",
    body: "We do not chase fashion. We do not over-engineer governance. We do not confuse activity with progress.",
  },
  {
    label: "III",
    body: "We hold what we own. We trust who we hire. We measure against horizons most owners will not commit to.",
  },
];

export default function Manifesto() {
  return (
    <section className="relative bg-cream/50 border-y border-line">
      <div className="container-wide section">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto">
            <div className="eyebrow-plain">Manifesto · Rothenbury Group</div>
            <h2 className="mt-5 display-2 text-balance">
              Three commitments. Held without exception.
            </h2>
          </div>
        </Reveal>

        <StaggerGroup className="mt-20 grid gap-12 lg:gap-16 lg:grid-cols-3 max-w-6xl mx-auto">
          {STATEMENTS.map((s) => (
            <StaggerItem key={s.label}>
              <div className="border-l border-gold/60 pl-7 lg:pl-9 py-2">
                <div className="font-serif italic text-bronze-700 text-2xl leading-none">
                  {s.label}
                </div>
                <p className="mt-6 font-serif text-2xl lg:text-[28px] text-navy leading-snug text-balance">
                  {s.body}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <Reveal>
          <p className="mt-16 text-center text-[11px] uppercase tracking-[0.28em] text-ink-mute">
            Drafted at the parent · Held by every operator
          </p>
        </Reveal>
      </div>
    </section>
  );
}
