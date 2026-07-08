import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  Compass,
  Layers,
  Globe2,
  Hourglass,
  ScissorsLineDashed,
  Workflow,
  Scale,
} from "lucide-react";
import SchemaJsonLd from "@/components/SchemaJsonLd";
import CTASection from "@/components/CTASection";
import InsightsRow from "@/components/InsightsRow";
import TestimonialsRow from "@/components/TestimonialsRow";
import Flourish from "@/components/Flourish";
import HoldingHorizonChart from "@/components/HoldingHorizonChart";
import PanAmericanMap from "@/components/PanAmericanMap";
import SectorGrid from "@/components/SectorGrid";
import AnimatedStat, { StatRow, StatItem } from "@/components/AnimatedStat";
import OperatingSupportStack from "@/components/OperatingSupportStack";
import SectionMark from "@/components/SectionMark";
import { BRAND } from "@/lib/constants";
import { breadcrumbSchema } from "@/lib/schema";
import { IMAGES } from "@/lib/imagery";

export const metadata = {
  title: `${BRAND.publicName} | Long-Duration Holding Company`,
  description: BRAND.shortDescription,
  alternates: { canonical: "/" },
};


const REGIONS = [
  {
    label: "United States",
    accent: "bronze" as const,
    anchor: "Anchored in New York",
    cities: ["New York", "Boston", "Atlanta", "Miami", "Chicago", "Dallas", "Los Angeles", "Phoenix", "Austin", "Denver"],
    note: "Operating partners across staffing, media, real estate, and services.",
  },
  {
    label: "Canada",
    accent: "burgundy" as const,
    anchor: "Office of the Group, Toronto",
    cities: ["Toronto", "Vancouver", "Montreal", "Calgary"],
    note: "Operating partners across real estate, contracting, and services.",
  },
];

const PROBLEMS = [
  {
    Icon: Hourglass,
    problem: "Operating-grade brands hit a capital ceiling that is institutional, not strategic.",
    diagnosis:
      "Operator-led businesses can run at 30% margins, retain customers for a decade, and still get priced out of the next stage of growth. Banks underwrite to collateral. Funds underwrite to an exit. Neither is built for a brand that wants to compound through cycles. The constraint is the capital, not the company.",
    fix: "We provide patient equity sized to the operating thesis, not to the resale window. Capital is positioned as a balance-sheet line, not a five-year loan. Operators stop optimising for a transaction and start optimising for the customer.",
  },
  {
    Icon: ScissorsLineDashed,
    problem: "Brand drift compounds the moment a business outgrows the founder.",
    diagnosis:
      "The founder is the brand standard for the first decade. After that, every acquisition, every new market, every new hire chips at the original promise. Without governance, the brand softens. Pricing power follows. By the time it is visible in the numbers, it is already two years gone.",
    fix: "Brand governance is held at the parent. The operating partner keeps customers, identity, and execution. The Group writes the standard for naming, claims, and visual integrity, and reviews it like a balance-sheet item. The brand is treated as an asset, not a marketing line.",
  },
  {
    Icon: Workflow,
    problem: "Shared back-office is rebuilt every time a business doubles.",
    diagnosis:
      "Finance, technology, procurement, talent. Every fast-growing operator rebuilds the same stack at every revenue threshold. Each rebuild costs leadership focus, breaks reporting continuity, and quietly resets compliance posture. The cost is not the software. It is the year of operating attention spent on infrastructure that should already exist.",
    fix: "Shared services are consolidated at the Group. Operating partners inherit institutional-grade finance, technology, and reporting infrastructure on day one and never rebuild it. Operators get to spend the next year on customers instead of systems.",
  },
  {
    Icon: Scale,
    problem: "Operating discipline does not survive leadership transitions.",
    diagnosis:
      "Most operating businesses are one founder deep. Decision rights, customer relationships, and quality standards live in one person's head. When that founder steps back, sells, or simply burns out, the discipline that built the business goes with them. The next owner inherits a brand without the operating system underneath.",
    fix: "Operating standards are codified centrally. Reporting cadence, capital-allocation discipline, governance, and brand integrity are documented at the parent and applied identically across the portfolio. Leadership transitions become planned events, not crises.",
  },
];

const PRINCIPLES = [
  {
    Icon: Compass,
    eyebrow: "Long-Duration Ownership",
    title: "Built to hold.",
    body: "We invest for indefinite duration. Holdings are positioned for compounding, not for resale.",
  },
  {
    Icon: Layers,
    eyebrow: "Operator Governance",
    title: "Operators run the work.",
    body: "Day-to-day execution belongs to operators. Governance from the parent is disciplined and deliberately minimal.",
  },
  {
    Icon: Globe2,
    eyebrow: "North American",
    title: "Across North America.",
    body: "Operating partners across the United States and Canada, governed under a single, consistent standard.",
  },
];

export default function HomePage() {
  return (
    <>
      <SchemaJsonLd
        data={breadcrumbSchema([{ name: "Home", url: "https://www.rothenbury.com/" }])}
      />

      {/* HERO */}
      <section className="relative bg-navy text-bone overflow-hidden grain flex items-center min-h-[calc(100svh-84px)] lg:min-h-[calc(100svh-116px)]">
        <Image
          src={IMAGES.brandHero}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy/90 to-navy/50" />
        {/* Marble texture overlay - very subtle warm veining */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none mix-blend-soft-light opacity-[0.18]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='600' viewBox='0 0 600 600'><defs><filter id='m'><feTurbulence type='fractalNoise' baseFrequency='0.012 0.04' numOctaves='2' seed='4'/><feColorMatrix values='0 0 0 0 0.55  0 0 0 0 0.42  0 0 0 0 0.25  0 0 0 0.6 0'/></filter></defs><rect width='100%25' height='100%25' fill='%231a0a10'/><rect width='100%25' height='100%25' filter='url(%23m)'/></svg>\")",
            backgroundSize: "cover",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-[0.08]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='800'><defs><filter id='v'><feTurbulence type='turbulence' baseFrequency='0.6 0.02' numOctaves='2' seed='2'/><feColorMatrix values='0 0 0 0 0.92  0 0 0 0 0.84  0 0 0 0 0.66  0 0 0 0.7 0'/></filter></defs><rect width='100%25' height='100%25' filter='url(%23v)'/></svg>\")",
            backgroundSize: "cover",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-bronze/50 to-transparent" />

        <div className="container-wide relative w-full py-7 sm:py-9">
          <div className="grid gap-8 lg:gap-10 lg:grid-cols-[1.7fr_1fr] items-end lg:items-center min-w-0">
            <div className="max-w-4xl min-w-0">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] sm:text-[11px] uppercase tracking-[0.14em] sm:tracking-[0.24em] text-bronze-200">
                  <span className="h-px w-8 sm:w-10 bg-bronze-300/80" />
                  Holding Group · Operating Across North America
                </div>
                <span className="inline-flex items-center gap-2 px-3 py-1 border border-bronze-200/35 bg-walnut/30 text-[10px] uppercase tracking-[0.22em] text-bronze-200 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-bronze-200" />
                  Office of the Group · Toronto · New York
                </span>
              </div>
              <h1 className="mt-4 font-serif text-ivory text-[34px] sm:text-[54px] lg:text-[68px] leading-[1.03] sm:leading-[0.98] tracking-tightest text-balance">
                Permanent capital. <span className="italic text-bronze-200">Operating partnership.</span> Multigenerational ownership.
              </h1>
              <p className="mt-4 text-[15px] sm:text-base lg:text-lg text-ivory/95 max-w-2xl leading-relaxed font-serif italic">
                A privately held diversified holding company. Patient equity and shared
                infrastructure for operator-led businesses across the United States and
                Canada. Held for compounding, not for resale.
              </p>
              <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row gap-3">
                <Link href="/contact/" className="btn-bronze group">
                  Request a private introduction
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2} />
                </Link>
                <Link
                  href="/thesis/"
                  className="inline-flex items-center justify-center gap-2 border border-ivory/40 text-ivory px-7 py-3.5 text-[12.5px] tracking-[0.18em] uppercase font-medium hover:bg-ivory hover:text-burgundy transition-colors no-underline"
                >
                  Read the thesis
                </Link>
              </div>
            </div>

            {/* Hero meta panel */}
            <aside className="hidden lg:block border border-bronze-200/20 bg-walnut/25 backdrop-blur-sm px-8 py-9">
              <div className="text-[10px] uppercase tracking-[0.28em] text-bronze-200">
                Operating Footprint
              </div>
              <dl className="mt-5 space-y-4 text-sm">
                <div className="flex items-baseline justify-between gap-4 pb-3 border-b border-bone/10">
                  <dt className="text-ivory/85">Sectors</dt>
                  <dd className="font-serif text-2xl text-bone">06</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 pb-3 border-b border-bone/10">
                  <dt className="text-ivory/85">Regions</dt>
                  <dd className="font-serif text-2xl text-bone">02</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-ivory/85">Holding horizon</dt>
                  <dd className="font-serif text-2xl text-bone">∞</dd>
                </div>
              </dl>
              <p className="mt-6 text-[11px] text-ivory/85 leading-relaxed border-t border-bone/10 pt-4">
                Operators run the day-to-day. The parent provides oversight, not management.
              </p>
            </aside>
          </div>
        </div>
      </section>

      {/* STAT BAR - animated count-up on scroll */}
      <section className="bg-bone border-b border-line">
        <div className="container-wide py-16 lg:py-20">
          <StatRow className="grid gap-10 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-line">
            <StatItem className="sm:px-8 first:sm:pl-0 last:sm:pr-0 pt-10 sm:pt-0 first:pt-0">
              <AnimatedStat
                value={6}
                padTo={2}
                label="Sectors of activity"
                unit="across the portfolio"
              />
            </StatItem>
            <StatItem className="sm:px-8 first:sm:pl-0 last:sm:pr-0 pt-10 sm:pt-0">
              <AnimatedStat
                value={2}
                padTo={2}
                label="Operating regions across North America"
                unit="United States · Canada"
              />
            </StatItem>
            <StatItem className="sm:px-8 first:sm:pl-0 last:sm:pr-0 pt-10 sm:pt-0">
              {/* Indefinite holding period - static glyph but rendered in same cadence */}
              <div className="relative">
                <div className="font-serif text-navy text-5xl sm:text-6xl lg:text-[68px] leading-none tracking-tightest tabular-nums">
                  <span className="text-bronze-600 italic">∞</span>
                </div>
                <div className="mt-3 text-[10px] uppercase tracking-[0.24em] font-medium text-bronze-700">
                  indefinite
                </div>
                <div className="mt-3 text-sm uppercase tracking-[0.16em] text-ink-soft">
                  Default holding horizon
                </div>
              </div>
            </StatItem>
          </StatRow>
        </div>
        <Flourish className="pb-10" />
      </section>

      {/* SECTORS */}
      <section className="section bg-bone">
        <div className="container-wide">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] items-end">
            <div>
              <div className="eyebrow">Sectors we hold in</div>
              <h2 className="mt-5 display-2 text-balance">
                Six sectors. One discipline of ownership.
              </h2>
            </div>
            <p className="body-lg max-w-xl">
              We invest across distinct sectors. Each line of business runs under its own
              brand, with its own customers and operators. The parent owns the equity,
              writes the governance standard, and stays out of the way.
            </p>
          </div>

          <SectorGrid />
        </div>
        <Flourish className="mt-10" />
      </section>

      {/* HOLDING HORIZON CHART */}
      <section className="section bg-walnut text-ivory grain border-y border-walnut">
        <div className="container-wide">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] items-end">
            <div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] sm:text-[11px] uppercase tracking-[0.14em] sm:tracking-[0.24em] text-bronze-200 font-medium">
                <span className="h-px w-8 bg-bronze-200/70" />
                Holding horizon
              </div>
              <h2 className="mt-5 font-serif text-ivory text-[36px] sm:text-[44px] lg:text-[52px] leading-[1.06] tracking-tight text-balance">
                Permanent capital, measured against the alternatives.
              </h2>
            </div>
            <p className="body-lg max-w-xl text-ivory/90">
              Most institutional capital arrives with a clock attached. Ours does not.
              The chart below illustrates a typical default holding horizon, in years,
              for the four most common ownership models.
            </p>
          </div>

          <div className="mt-8">
            <HoldingHorizonChart />
          </div>
        </div>
      </section>

      {/* NORTH AMERICAN FOOTPRINT */}
      <section className="py-14 sm:py-16 lg:py-14 bg-bone">
        <div className="container-wide">
          <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr] items-end">
            <div>
              <div className="eyebrow">North American footprint</div>
              <h2 className="mt-3 font-serif font-medium text-burgundy text-[32px] sm:text-[42px] lg:text-[50px] leading-[1.05] tracking-tight text-balance">
                One holding company. Two operating regions.
              </h2>
            </div>
            <p className="text-base lg:text-lg leading-relaxed text-charcoal-500 font-body max-w-xl">
              Operating partners are anchored across the United States and Canada,
              coordinated between Toronto and New York under a single parent-level
              governance standard.
            </p>
          </div>

          <div className="mt-7 grid gap-8 lg:grid-cols-[1.35fr_1fr] items-stretch">
            {/* Map graphic */}
            <div className="relative bg-bone border border-line aspect-[5/3] overflow-hidden">
              <PanAmericanMap />
              {/* Legend */}
              <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center gap-x-5 gap-y-2 bg-bone/90 backdrop-blur px-4 py-2.5 border border-line text-[10px] uppercase tracking-[0.18em] text-ink-soft">
                <span className="inline-flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-burgundy" /> Canada hub
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-bronze" /> US hub
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full border border-bronze bg-bone" /> Operating cities
                </span>
              </div>
            </div>

            {/* Region cards */}
            <div className="grid gap-px bg-line border border-line content-stretch">
              {REGIONS.map((r) => {
                const accentText = r.accent === "bronze" ? "text-bronze-700" : "text-burgundy";
                const accentBar = r.accent === "bronze" ? "bg-bronze" : "bg-burgundy";
                return (
                  <div key={r.label} className="relative bg-bone p-5 lg:p-6">
                    <span className={`absolute left-0 top-0 h-full w-[3px] ${accentBar}`} aria-hidden="true" />
                    <div className="flex items-center justify-between">
                      <div className={`text-[10px] uppercase tracking-[0.24em] font-mono ${accentText}`}>
                        Region
                      </div>
                      <div className="text-[11px] uppercase tracking-[0.18em] text-ink-mute">
                        {r.cities.length} cities
                      </div>
                    </div>
                    <div className="mt-2 flex items-baseline gap-3">
                      <h3 className="font-serif text-2xl lg:text-3xl text-navy">{r.label}</h3>
                    </div>
                    <p className={`mt-1 text-[11px] uppercase tracking-[0.16em] ${accentText}`}>{r.anchor}</p>
                    <div className="mt-3.5 flex flex-wrap gap-1.5">
                      {r.cities.map((c) => (
                        <span
                          key={c}
                          className="px-2.5 py-[3px] border border-line bg-cream/50 text-[12px] tracking-wide text-ink-soft"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                    <p className="mt-3.5 pt-3.5 border-t border-line text-[12.5px] text-ink-soft italic leading-relaxed">
                      {r.note}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEMS WE SOLVE */}
      <section className="section bg-burgundy text-ivory grain border-y border-walnut">
        <div className="container-wide">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] sm:text-[11px] uppercase tracking-[0.14em] sm:tracking-[0.24em] text-bronze-200 font-medium">
              <span className="h-px w-8 bg-bronze-200/70" />
              Why this exists
            </div>
            <h2 className="mt-5 font-serif text-ivory text-[36px] sm:text-[46px] lg:text-[56px] leading-[1.06] tracking-tight text-balance">
              Four things break in private ownership. Each has a holdco answer.
            </h2>
            <p className="mt-6 text-ivory/95 text-lg leading-relaxed max-w-2xl">
              We did not start a holding company to repackage what private equity already
              does. We started one because the standard model fails operators, fails
              founders, and fails the businesses themselves. Below is the diagnosis,
              and what the parent does about it.
            </p>
          </div>

          <div className="mt-10 grid gap-px bg-walnut/60 sm:grid-cols-2 border border-walnut/60">
            {PROBLEMS.map(({ Icon, problem, diagnosis, fix }, idx) => (
              <article key={problem} className="bg-burgundy p-7 lg:p-8">
                <div className="flex items-center justify-between gap-4">
                  <div className="grid place-items-center w-11 h-11 border border-bronze-300/40 text-bronze-200 shrink-0">
                    <Icon className="w-5 h-5" strokeWidth={1.4} />
                  </div>
                  <SectionMark num={idx + 1} label="Problem" tone="ivory" />
                </div>
                <h3 className="mt-6 font-serif text-2xl lg:text-3xl text-ivory leading-snug">
                  {problem}
                </h3>
                <p className="mt-4 text-[15px] text-ivory/95 leading-relaxed">
                  {diagnosis}
                </p>
                <div className="mt-6 pt-5 border-t border-bronze-300/30">
                  <div className="text-[10px] uppercase tracking-[0.24em] text-bronze-200 font-mono">
                    How we solve it
                  </div>
                  <p className="mt-3 text-[15px] text-ivory leading-relaxed">{fix}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* OPERATING SUPPORT STACK */}
      <section className="section bg-bone">
        <div className="container-wide">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] items-end">
            <div>
              <div className="eyebrow">Operating support stack</div>
              <h2 className="mt-5 display-2 text-balance">
                What the parent provides. <span className="font-serif italic text-bronze-600">Nothing more, nothing less.</span>
              </h2>
            </div>
            <p className="body-lg max-w-xl">
              The Group is a deliberately narrow function. Four pillars sit between
              the parent and the operator. Everything else is the operator's to run.
            </p>
          </div>

          <div className="mt-8">
            <OperatingSupportStack />
          </div>
        </div>
        <Flourish className="mt-10" />
      </section>

      {/* HERITAGE EDITORIAL BAND */}
      <section className="relative overflow-hidden bg-walnut text-ivory grain border-y border-walnut">
        <Image
          src={IMAGES.oakBoardTable}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-walnut via-walnut/85 to-walnut/55" />
        <div className="container-wide relative py-16 lg:py-20">
          <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr] items-center">
            <div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] sm:text-[11px] uppercase tracking-[0.14em] sm:tracking-[0.24em] text-bronze-200 font-medium">
                <span className="h-px w-8 bg-bronze-200/70" />
                Built for permanence
              </div>
              <h2 className="mt-5 font-serif text-ivory text-[40px] sm:text-[52px] lg:text-[64px] leading-[1.04] tracking-tightest text-balance">
                Built for permanence. <span className="italic text-bronze-200">Not for exits.</span>
              </h2>
              <p className="mt-7 text-ivory/90 text-lg leading-relaxed max-w-xl">
                A holding company that intends to be present in three generations
                makes different decisions than one underwriting to a five-year
                exit. The orientation is different. The hiring is different. The
                way we treat operators, customers, and a brand is different. The
                Group is built for the longer of the two.
              </p>
            </div>
            <div className="relative aspect-[4/5] lg:aspect-[5/6] overflow-hidden border border-bronze-200/25">
              <Image
                src={IMAGES.boardroomDark}
                alt=""
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-walnut/60 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-[11px] uppercase tracking-[0.22em] text-bronze-200/90 font-mono">
                The boardroom · Office of the Group
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRINCIPLES */}
      <section className="section bg-bone">
        <div className="container-wide">
          <div className="max-w-3xl">
            <div className="eyebrow">How we operate</div>
            <h2 className="mt-5 display-2 text-balance">
              Three commitments. <span className="font-serif italic text-bronze-600">Every decision routes through them.</span>
            </h2>
          </div>

          <div className="mt-16 grid gap-12 lg:gap-16 lg:grid-cols-3">
            {PRINCIPLES.map(({ Icon, eyebrow, title, body }, idx) => (
              <div key={title} className="relative">
                <SectionMark num={idx + 1} label={eyebrow} />
                <Icon className="mt-7 w-10 h-10 text-burgundy" strokeWidth={1.1} />
                <h3 className="mt-6 font-serif text-3xl text-burgundy leading-tight">{title}</h3>
                <p className="mt-4 body-md">{body}</p>
              </div>
            ))}
          </div>
          <Flourish className="mt-10" />
        </div>
      </section>

      {/* OPERATING DOCTRINE */}
      <section className="section parchment-grain border-y border-line">
        <div className="container-wide relative">
          <div className="max-w-2xl">
            <div className="eyebrow">Operating doctrine</div>
            <h2 className="mt-5 display-3 text-balance">
              Three commitments that govern every decision the parent makes.
            </h2>
          </div>
          <div className="mt-12 grid gap-px bg-line sm:grid-cols-3 border border-line">
            {[
              {
                disciplineLabel: "Underwriting",
                title: "Underwriting",
                note: "Every commitment is sized to a balance sheet that can survive its worst plausible decade, not its best forecast.",
              },
              {
                disciplineLabel: "Substantiation",
                title: "Substantiation",
                note: "Public claims are tied to original-source citation. Marketing follows from the work, not the other way around.",
              },
              {
                disciplineLabel: "Confidentiality",
                title: "Confidentiality",
                note: "Specific portfolio performance is shared privately with investors and counterparties under appropriate terms.",
              },
            ].map((item, idx) => (
              <div key={idx} className="bg-bone p-8 lg:p-10">
                <SectionMark num={idx + 1} label="Discipline" />
                <div className="mt-6 font-serif text-2xl text-burgundy">
                  {item.title}
                </div>
                <p className="mt-3 body-md text-[15px]">{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsRow />

      <InsightsRow />

      <CTASection />
    </>
  );
}
