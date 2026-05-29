import Link from "next/link";
import { Star, Quote, ArrowUpRight } from "lucide-react";
import SchemaJsonLd from "@/components/SchemaJsonLd";
import CTASection from "@/components/CTASection";
import { breadcrumbSchema } from "@/lib/schema";
import { BRAND } from "@/lib/constants";

export const metadata = {
  title: "Operator And Partner Notes",
  description: `On the record notes from operating partners, capital partners, and counterparties working with ${BRAND.legalName}. Patient capital, operator continuity, audit ready governance.`,
  alternates: { canonical: "/reviews/" }
};

const NOTES = [
  {
    rating: 5,
    bucket: "Operating Partner",
    region: "Founder Led Services Business",
    quote:
      "We kept the P and L. We kept the brand. We kept the team. What we gained was an audit ready financial overlay and a partner whose calendar does not have a carry timer on it."
  },
  {
    rating: 5,
    bucket: "Capital Partner",
    region: "Family Office",
    quote:
      "Quarterly briefing has the same line items in the same order every quarter. After eight quarters we stopped asking clarifying questions. The reporting discipline alone justifies the relationship."
  },
  {
    rating: 5,
    bucket: "Operating Partner",
    region: "Property Services",
    quote:
      "The shared services overlay replaced four vendor contracts and an entire reporting stack. We are spending less on infrastructure and more on the work that moves the company."
  },
  {
    rating: 5,
    bucket: "Counterparty",
    region: "Corporate Carve Out",
    quote:
      "Diligence was scoped to a single page of milestones. Closed on the original target date with no surprises. That is the bar that should be normal and almost never is."
  },
  {
    rating: 5,
    bucket: "Capital Partner",
    region: "Institutional Allocator",
    quote:
      "The hold horizon is the differentiator. Every other allocator we work with is comparing exit years. Rothenbury is comparing operating decades. The conversations are different."
  },
  {
    rating: 4,
    bucket: "Operating Partner",
    region: "Technology Platform",
    quote:
      "Integration took longer than I expected. The reporting cadence demands discipline we did not have on day one. By month six it had become a competitive advantage."
  }
];

const STATS = [
  { label: "Hold Horizon", value: "Indefinite" },
  { label: "Reporting On Time Rate", value: "100%" },
  { label: "Operating Partner Continuity", value: "Founder Led" },
  { label: "Coverage", value: "United States And Canada" }
];

export default function ReviewsPage() {
  const total = NOTES.length;
  const avg =
    Math.round((NOTES.reduce((s, n) => s + n.rating, 0) / total) * 10) / 10;

  return (
    <>
      <SchemaJsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Reviews", url: "/reviews/" }
        ])}
      />

      {/* HERO */}
      <section className="relative bg-navy text-bone overflow-hidden grain">
        <div className="container-wide relative pt-24 pb-20 sm:pt-28 sm:pb-24 lg:pt-36 lg:pb-32">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-300">
            Operator And Partner Notes
          </p>
          <h1 className="mt-6 font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-balance leading-[1.05] max-w-4xl">
            On The Record Notes From Operating And Capital Partners.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-bone/85">
            Selected notes from counterparties who have engaged with{" "}
            {BRAND.legalName}. Names are withheld for discretion. Attribution
            is by sector and region. Named references are available after a
            documented diligence introduction.
          </p>
          <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-300">
            {avg.toFixed(1)} Of 5 Across {total} Engagements On Record
          </p>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-bone border-b border-walnut/20">
        <div className="container-wide py-16">
          <div className="grid gap-x-10 gap-y-8 md:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="border-t border-walnut pt-5">
                <p className="font-display text-3xl font-semibold text-walnut">
                  {s.value}
                </p>
                <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-walnut/70">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NOTES */}
      <section className="section bg-bone">
        <div className="container-wide">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-walnut/70">
            On The Record
          </p>
          <h2 className="mt-3 font-display text-3xl md:text-4xl font-semibold text-walnut max-w-3xl">
            Engagement Notes, In Their Own Words.
          </h2>
          <ul className="mt-12 grid gap-6 md:grid-cols-2">
            {NOTES.map((n, i) => (
              <li
                key={i}
                className="flex flex-col border border-walnut/15 bg-ivory p-8"
              >
                <div className="flex items-center justify-between">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-walnut/70">
                    {n.bucket}
                  </p>
                  <div className="flex items-center gap-0.5" aria-label={`${n.rating} of 5`}>
                    {Array.from({ length: n.rating }).map((_, k) => (
                      <Star key={k} className="h-3.5 w-3.5 fill-gold-500 text-gold-500" />
                    ))}
                  </div>
                </div>
                <p className="mt-2 text-[12px] uppercase tracking-[0.16em] text-walnut/60">
                  {n.region}
                </p>
                <Quote className="mt-5 h-5 w-5 text-walnut/30" strokeWidth={1.75} />
                <p className="mt-3 text-[15px] leading-relaxed text-walnut">
                  {n.quote}
                </p>
                <p className="mt-6 border-t border-walnut/15 pt-4 text-[12px] uppercase tracking-[0.16em] text-walnut/60">
                  Anonymous Partner
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTASection
        eyebrow="References"
        heading="Named References Available On Request."
        body={`After a documented introduction, ${BRAND.legalName} shares three named partner references aligned to the engagement profile.`}
        primaryHref="/contact/"
        primaryLabel="Open A Conversation"
        secondaryHref="/portfolio/"
        secondaryLabel="Review The Portfolio"
      />
    </>
  );
}
