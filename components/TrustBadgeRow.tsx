import { Shield, Scale, Landmark, FileSignature, BookOpen, Globe2 } from "lucide-react";

/**
 * Institutional credentials row.
 * Every claim here is either jurisdictional (factual) or marked as forthcoming.
 * No fake awards, no fabricated badges.
 */
const BADGES = [
  {
    Icon: Landmark,
    title: "Multi-Jurisdiction",
    note: "United States · Canada",
  },
  {
    Icon: Scale,
    title: "PIPEDA / CASL",
    note: "Canadian compliance posture",
  },
  {
    Icon: Shield,
    title: "AODA-Aligned",
    note: "Accessibility commitment",
  },
  {
    Icon: FileSignature,
    title: "Master Marketing",
    note: "Services Agreement on file",
  },
  {
    Icon: BookOpen,
    title: "Operator Governance",
    note: "Brand-level autonomy",
  },
  {
    Icon: Globe2,
    title: "Long-Duration",
    note: "Generational horizon",
  },
] as const;

export default function TrustBadgeRow() {
  return (
    <section className="bg-bone border-y border-line">
      <div className="container-wide py-10 lg:py-12">
        <div className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-6 border border-line">
          {BADGES.map(({ Icon, title, note }) => (
            <div key={title} className="bg-bone p-5 lg:p-6 text-center">
              <Icon className="mx-auto w-6 h-6 text-bronze-700" strokeWidth={1.25} />
              <div className="mt-3 text-[11px] uppercase tracking-[0.2em] text-navy font-medium">
                {title}
              </div>
              <div className="mt-1 text-[11px] text-ink-soft leading-snug">{note}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
