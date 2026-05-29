import { Quote } from "lucide-react";
import Reveal, { StaggerGroup, StaggerItem } from "./Reveal";
import { TESTIMONIALS } from "@/lib/insights";

/**
 * Editorial testimonials row.
 * Quotes sourced from lib/insights.ts. Attributions are role + market only,
 * to preserve confidentiality consistent with the Group's reporting standard.
 */
export default function TestimonialsRow() {
  return (
    <section className="section bg-bone border-y border-line">
      <div className="container-wide">
        <Reveal>
          <div className="max-w-2xl">
            <div className="eyebrow">In their own words</div>
            <h2 className="mt-5 display-2 text-balance">
              How operators and capital partners describe the Group.
            </h2>
          </div>
        </Reveal>

        <StaggerGroup className="mt-14 grid gap-7 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <StaggerItem key={t.attribution}>
              <figure className="surface h-full p-8 lg:p-10 flex flex-col">
                <Quote
                  className="w-7 h-7 text-bronze-700"
                  strokeWidth={1.2}
                  aria-hidden
                />
                <blockquote className="mt-6 font-serif text-[19px] lg:text-xl text-navy leading-snug italic flex-1">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-7 pt-5 border-t border-line text-[11px] uppercase tracking-[0.22em] text-ink-mute">
                  {t.attribution}
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <p className="mt-10 max-w-2xl text-xs text-ink-soft italic leading-relaxed">
          Attributions show role and market only. Operating partners and capital partners
          are not named publicly without written consent.
        </p>
      </div>
    </section>
  );
}
