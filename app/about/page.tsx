import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  Anchor,
  Eye,
  ShieldCheck,
  Compass,
  Hourglass,
  ScissorsLineDashed,
  Scale,
  Banknote,
  Layers,
  Gavel,
  Sparkles,
} from "lucide-react";
import SchemaJsonLd from "@/components/SchemaJsonLd";
import CTASection from "@/components/CTASection";
import PullQuote from "@/components/PullQuote";
import Flourish from "@/components/Flourish";
import PermanenceVsCycleChart from "@/components/PermanenceVsCycleChart";
import OwnershipTimeline from "@/components/OwnershipTimeline";
import { breadcrumbSchema } from "@/lib/schema";
import { BRAND } from "@/lib/constants";
import { IMAGES } from "@/lib/imagery";

export const metadata = {
  title: "About Rothenbury Group | Our Story and Structure",
  description:
    "Rothenbury Group is an operator-led diversified holding group operating across the United States and Canada, deploying patient capital to operating partners.",
  alternates: { canonical: "/about/" },
};

const PROBLEMS = [
  {
    Icon: Hourglass,
    problem: "Capital with a fund clock attached.",
    fix: "We hold for indefinite duration. No carry timer drives our calendar.",
  },
  {
    Icon: ScissorsLineDashed,
    problem: "Holding companies that strip operators.",
    fix: "Operators keep their own P&L, brand, and decision rights. The parent owns equity, not the workflow.",
  },
  {
    Icon: Scale,
    problem: "Founders with no exit they want to take.",
    fix: "We are the permanent home: liquidity at fair value, continuity for the team, no five-year flip.",
  },
];

const VALUES = [
  {
    Icon: Anchor,
    title: "Long-duration",
    body: "We hold for compounding, not for resale. Our default time horizon is generational.",
  },
  {
    Icon: Eye,
    title: "Operator-first",
    body: "Day-to-day execution belongs to operators. The parent governs. It does not manage.",
  },
  {
    Icon: ShieldCheck,
    title: "Disciplined",
    body: "Capital allocation, governance, and reporting follow a single playbook.",
  },
  {
    Icon: Compass,
    title: "North American",
    body: "Multiple jurisdictions across the United States and Canada, one set of standards. Local execution within consistent oversight.",
  },
];

const SUPPORT = [
  {
    Icon: Banknote,
    title: "Patient capital",
    body: "Equity capital with no fund-life clock. Operating partners are funded through cycles, not optimized for an exit window.",
  },
  {
    Icon: Layers,
    title: "Shared services",
    body: "Finance, technology, procurement, and talent infrastructure consolidated at the Group level. Operators inherit scale they could not afford alone.",
  },
  {
    Icon: Gavel,
    title: "Governance",
    body: "Board-level oversight, reporting standards, and capital-allocation discipline applied consistently across every operating partner.",
  },
  {
    Icon: Sparkles,
    title: "Brand integrity",
    body: "Operating partners keep their own brand, customers, and identity. The Group invests behind the brand. It does not consolidate it.",
  },
];

export default function AboutPage() {
  return (
    <>
      <SchemaJsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", url: "https://www.rothenbury.com/" },
            { name: "About", url: "https://www.rothenbury.com/about/" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "AboutPage",
            name: "About Rothenbury Group",
            url: "https://www.rothenbury.com/about/",
            mainEntity: { "@id": "https://www.rothenbury.com/#organization" },
          },
        ]}
      />

      {/* HERO */}
      <section className="relative bg-navy text-bone overflow-hidden grain">
        <Image
          src={IMAGES.torontoFinancial}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/95 to-navy/70" />
        <div className="container-wide relative pt-24 pb-20 sm:pt-28 sm:pb-24 lg:pt-36 lg:pb-32">
          <nav aria-label="Breadcrumb" className="text-[11px] uppercase tracking-[0.22em] text-ivory/80">
            <Link href="/" className="hover:text-bone no-underline">
              Home
            </Link>{" "}
            <span className="mx-2">/</span> About
          </nav>
          <h1 className="mt-6 font-serif text-ivory text-[36px] sm:text-[52px] lg:text-[76px] leading-[1.06] sm:leading-[1.04] tracking-tightest text-balance max-w-5xl">
            We build them. We hold them. We do not flip them.
          </h1>
          <p className="mt-8 text-lg sm:text-xl text-ivory/95 max-w-3xl leading-relaxed">
            Rothenbury Group is an operator-led diversified holding group operating
            across the United States and Canada, deploying patient capital and shared
            infrastructure to operator-led businesses in fragmented markets. Built
            for permanence. Not for exits.
          </p>
        </div>
      </section>

      {/* STORY */}
      <section className="section bg-bone">
        <div className="container-wide grid gap-14 lg:gap-20 lg:grid-cols-[1.2fr_1fr] items-start">
          <div>
            <div className="eyebrow">Our Story</div>
            <h2 className="mt-5 display-2 text-balance">
              An operator-led holding group across the United States and Canada.
            </h2>
            <div className="mt-8 space-y-6 body-md max-w-prose">
              <p>
                Rothenbury Group is a privately-held diversified holding company
                operating across the United States and Canada. We deploy patient capital
                and shared infrastructure to operator-led businesses with durable
                customer relationships in fragmented markets.
              </p>
              <p>
                Rothenbury's operating partner network spans major US and Canadian
                markets. We deploy patient capital and centralized governance to
                operating partners building permanent businesses across both countries.
                The footprint is North American by design. The discipline is
                multigenerational by mandate.
              </p>
              <p>
                The Group sits above a portfolio of independently-run operating
                companies. Each operating partner runs its own business, with its own
                customers, brand, and leadership. The parent provides equity, governance,
                shared services, and the patience to compound past a fund cycle. The
                structure separates governance from operations. Decisions at the
                parent level concern capital allocation, governance standards, and
                long-duration strategy. Decisions at the operating level concern
                customers, employees, and day-to-day delivery.
              </p>
              <p>
                Rothenbury is built to outlast its founders. Ownership is structured for
                permanence, not for resale. The default holding horizon is measured in
                decades, not in fund vintages. That orientation changes everything
                downstream: how we underwrite, how we hire, how we treat customers, and
                how we hand businesses from one generation of operators to the next.
              </p>
            </div>
          </div>
          <aside className="relative">
            <div className="aspect-[4/5] relative overflow-hidden">
              <Image
                src={IMAGES.boardroomDark}
                alt=""
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="mt-6 border-l-2 border-gold pl-5 py-2 max-w-sm">
              <p className="font-serif text-xl text-navy italic leading-snug text-balance">
                "Institutional ownership. Operator governance. North American discipline."
              </p>
              <p className="mt-3 text-[11px] uppercase tracking-[0.2em] text-ink-soft">
                Positioning Statement · Rothenbury Group
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* INVESTMENT THESIS */}
      <section className="section bg-walnut text-ivory grain border-y border-walnut">
        <div className="container-wide grid gap-14 lg:grid-cols-[1.1fr_1fr] items-center">
          <div>
            <div className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.24em] text-bronze-200 font-medium">
              <span className="h-px w-8 bg-bronze-200/70" />
              Investment thesis
            </div>
            <h2 className="mt-5 font-serif text-ivory text-[36px] sm:text-[44px] lg:text-[52px] leading-[1.06] tracking-tight text-balance">
              Operating-led businesses with durable customer relationships in fragmented
              markets <span className="italic text-bronze-200">compound at rates institutional capital cannot otherwise access.</span>
            </h2>
            <p className="mt-6 text-ivory/90 text-lg leading-relaxed max-w-2xl">
              Most institutional capital is structurally barred from these businesses by
              fund-life mechanics, transaction-cost minimums, and exit dependency. We are
              built precisely for them: patient equity, light-touch governance, and a
              North American operating footprint.
            </p>
          </div>
          <div className="border border-bronze-200/25 bg-walnut/40 p-10">
            <div className="text-[10px] uppercase tracking-[0.24em] text-bronze-200 font-mono">
              Indicative target return
            </div>
            <div className="mt-5 font-serif text-7xl lg:text-8xl text-ivory leading-none tracking-tightest">
              14<span className="text-bronze-200">%</span>
            </div>
            <div className="mt-3 text-sm text-ivory/85 uppercase tracking-[0.18em]">
              IRR over 15-year holding periods
            </div>
            <p className="mt-6 pt-6 border-t border-bronze-200/20 text-[12px] text-ivory/70 leading-relaxed italic">
              Actual portfolio performance is reported privately to investors and
              counterparties under separate confidentiality.
            </p>
          </div>
        </div>
      </section>

      {/* PERMANENCE vs PE CYCLE CHART */}
      <section className="section bg-bone">
        <div className="container-wide">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] items-end mb-14">
            <div>
              <div className="eyebrow">Capital architecture</div>
              <h2 className="mt-5 display-2 text-balance">
                The orientation of the balance sheet decides the orientation of the company.
              </h2>
            </div>
            <p className="body-lg max-w-xl">
              Capital with a fund clock and capital without one are not minor
              variants of the same instrument. They produce different decisions
              from the day they arrive on the cap table.
            </p>
          </div>
          <PermanenceVsCycleChart />
        </div>
      </section>

      {/* DECADES-LONG OWNERSHIP TIMELINE */}
      <section className="section bg-cream/40 border-y border-line">
        <div className="container-wide">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] items-end mb-14">
            <div>
              <div className="eyebrow">Multigenerational</div>
              <h2 className="mt-5 display-2 text-balance">
                A holding chronology measured in decades.
              </h2>
            </div>
            <p className="body-lg max-w-xl">
              Operating partners come into the Group expecting an ownership
              relationship that runs past every transaction event a private-equity
              clock would have triggered. The stages below are how that
              relationship matures.
            </p>
          </div>
          <OwnershipTimeline />
        </div>
      </section>

      {/* PULL-QUOTE INTERLUDE */}
      <section className="bg-bone py-20 lg:py-28">
        <div className="container-wide">
          <Flourish />
          <PullQuote attribution="Office of the Group · Rothenbury">
            We did not build a holding company to repackage what private equity already does.
            We built one because the standard model fails operators, fails founders, and fails
            the businesses themselves.
          </PullQuote>
          <Flourish />
        </div>
      </section>

      {/* HOW WE SUPPORT OPERATING PARTNERS */}
      <section className="section bg-bone">
        <div className="container-wide">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] items-end">
            <div>
              <div className="eyebrow">How we support operating partners</div>
              <h2 className="mt-5 display-2 text-balance">
                Four things we provide. <span className="font-serif italic text-bronze-600">Everything else stays with the operator.</span>
              </h2>
            </div>
            <p className="body-lg max-w-xl">
              The Group is a deliberately narrow function. We provide capital, shared
              services, governance, and brand integrity. We do not provide management.
              That belongs to the operator.
            </p>
          </div>
          <div className="mt-14 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4 border border-line">
            {SUPPORT.map(({ Icon, title, body }) => (
              <div key={title} className="bg-bone p-8 lg:p-10">
                <Icon className="w-9 h-9 text-bronze-700" strokeWidth={1.2} />
                <h3 className="mt-7 font-serif text-2xl text-navy">{title}</h3>
                <p className="mt-3 text-sm text-ink-soft leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE SOLVE */}
      <section className="section bg-walnut text-ivory grain border-y border-walnut">
        <div className="container-wide">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.24em] text-bronze-200 font-medium">
              <span className="h-px w-8 bg-bronze-200/70" />
              The thesis, plainly stated
            </div>
            <h2 className="mt-5 font-serif text-ivory text-[36px] sm:text-[44px] lg:text-[52px] leading-[1.06] tracking-tight text-balance">
              Three failures of the standard model. Three reasons we exist.
            </h2>
          </div>
          <div className="mt-14 grid gap-px bg-bronze-200/15 sm:grid-cols-3 border border-bronze-200/15">
            {PROBLEMS.map(({ Icon, problem, fix }, idx) => (
              <div key={problem} className="bg-walnut p-8 lg:p-10">
                <div className="flex items-center justify-between">
                  <Icon className="w-8 h-8 text-bronze-200" strokeWidth={1.25} />
                  <span className="text-[10px] uppercase tracking-[0.22em] text-bronze-200/80 font-mono">
                    0{idx + 1}
                  </span>
                </div>
                <h3 className="mt-7 font-serif text-2xl text-ivory leading-snug">
                  {problem}
                </h3>
                <p className="mt-4 text-[15px] text-ivory/85 leading-relaxed">{fix}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="section bg-cream/40 border-y border-line">
        <div className="container-wide">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] items-end">
            <div>
              <div className="eyebrow">What We Stand For</div>
              <h2 className="mt-5 display-2 text-balance">Four principles.</h2>
            </div>
            <p className="body-lg max-w-xl">
              These principles govern how we evaluate businesses, how we hold them, and
              how we work with the operators who run them.
            </p>
          </div>
          <div className="mt-14 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4 border border-line">
            {VALUES.map(({ Icon, title, body }) => (
              <div key={title} className="bg-bone p-8 lg:p-10">
                <Icon className="w-9 h-9 text-bronze-700" strokeWidth={1.2} />
                <h3 className="mt-7 font-serif text-2xl text-navy">{title}</h3>
                <p className="mt-3 text-sm text-ink-soft leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LEADERSHIP TEASER */}
      <section className="section bg-cream/30 border-t border-line">
        <div className="container-wide grid gap-12 lg:grid-cols-[1fr_auto] items-end">
          <div>
            <div className="eyebrow">Leadership</div>
            <h2 className="mt-5 display-2 text-balance">
              Led by operators who have built and held businesses for decades.
            </h2>
            <p className="mt-6 body-lg max-w-2xl">
              Rothenbury is led by a leadership team responsible for parent-level
              governance. Named introductions for board and counterparty engagements are
              arranged through the Office of the Group.
            </p>
          </div>
          <Link href="/leadership/" className="btn-secondary group whitespace-nowrap">
            Meet the team
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2} />
          </Link>
        </div>
      </section>

      <CTASection />
    </>
  );
}
