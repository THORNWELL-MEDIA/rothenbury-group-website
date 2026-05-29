import { LucideIcon, Compass, FileSignature, Layers, Scale, BarChart3, RefreshCw } from "lucide-react";
import Reveal, { StaggerGroup, StaggerItem } from "./Reveal";

type Step = {
  Icon: LucideIcon;
  step: string;
  title: string;
  body: string;
};

/**
 * Six-step governance cycle Rothenbury Group applies to its operating brands.
 * No fabricated metrics - all language is qualitative and traceable to the
 * brand book / positioning.
 */
const STEPS: Step[] = [
  {
    Icon: Compass,
    step: "01",
    title: "Identify",
    body: "We pursue businesses with operator alignment, durable cash flow, and structural reasons to compound across decades - not quarters.",
  },
  {
    Icon: FileSignature,
    step: "02",
    title: "Underwrite",
    body: "Our diligence is conducted under jurisdictional rule-of-law standards. Every transaction is documented to a level institutional counterparties can rely on.",
  },
  {
    Icon: Layers,
    step: "03",
    title: "Structure",
    body: "Each line of business is positioned with its own governance, leadership, and operational autonomy. The parent does not appear in customer-facing operations.",
  },
  {
    Icon: Scale,
    step: "04",
    title: "Govern",
    body: "Capital allocation, risk discipline, and reporting follow a single playbook. Operating decisions belong to the operators; governance belongs to the parent.",
  },
  {
    Icon: BarChart3,
    step: "05",
    title: "Measure",
    body: "Performance is read against long-duration benchmarks. We do not optimize against short-term targets that compromise compounding.",
  },
  {
    Icon: RefreshCw,
    step: "06",
    title: "Hold",
    body: "Default disposition is to hold. Capital that is patient produces outcomes that capital under pressure cannot.",
  },
];

export default function ProcessTimeline() {
  return (
    <section className="section bg-bone border-t border-line">
      <div className="container-wide">
        <Reveal>
          <div className="max-w-3xl">
            <div className="eyebrow">Our Operating Cycle</div>
            <h2 className="mt-5 display-2 text-balance">
              A six-step governance discipline applied to every operating brand.
            </h2>
            <p className="mt-7 body-lg max-w-2xl">
              Identical language, identical rigor, across every entity in the portfolio.
              The cycle is the work - not a slide for prospect decks.
            </p>
          </div>
        </Reveal>

        <StaggerGroup className="mt-16 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3 border border-line">
          {STEPS.map(({ Icon, step, title, body }) => (
            <StaggerItem key={step}>
              <div className="bg-bone p-8 lg:p-10 h-full group hover:bg-cream/50 transition-colors">
                <div className="flex items-start justify-between">
                  <span className="font-serif text-3xl text-bronze-700 leading-none">{step}</span>
                  <Icon className="w-7 h-7 text-ink-soft group-hover:text-bronze-700 transition-colors" strokeWidth={1.2} />
                </div>
                <h3 className="mt-7 font-serif text-2xl text-navy">{title}</h3>
                <p className="mt-3 text-sm text-ink-soft leading-relaxed">{body}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
