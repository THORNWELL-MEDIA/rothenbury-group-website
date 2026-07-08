import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import SchemaJsonLd from "@/components/SchemaJsonLd";
import CTASection from "@/components/CTASection";
import Flourish from "@/components/Flourish";
import PullQuote from "@/components/PullQuote";
import PermanenceVsCycleChart from "@/components/PermanenceVsCycleChart";
import OwnershipTimeline from "@/components/OwnershipTimeline";
import OperatingSupportStack from "@/components/OperatingSupportStack";
import SectionMark from "@/components/SectionMark";
import { breadcrumbSchema } from "@/lib/schema";
import { IMAGES } from "@/lib/imagery";

export const metadata = {
  title: "The Thesis | Rothenbury Group",
  description:
    "The investment thesis behind Rothenbury Group: permanent capital, operator-led portfolio companies, and multigenerational ownership of operating businesses across the United States and Canada.",
  alternates: { canonical: "/thesis/" },
};

export default function ThesisPage() {
  return (
    <>
      <SchemaJsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", url: "https://www.rothenbury.com/" },
            { name: "Thesis", url: "https://www.rothenbury.com/thesis/" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "The Rothenbury Thesis",
            description:
              "The investment thesis behind Rothenbury Group: permanent capital, operator-led portfolio companies, and multigenerational ownership.",
            author: { "@type": "Organization", name: "Rothenbury Group" },
            publisher: { "@type": "Organization", name: "Rothenbury Group" },
          },
        ]}
      />

      {/* HERO */}
      <section className="relative bg-navy text-bone overflow-hidden grain">
        <Image
          src={IMAGES.archiveLibrary}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/95 to-navy/65" />
        <div className="container-wide relative pt-24 pb-20 sm:pt-28 sm:pb-24 lg:pt-40 lg:pb-32">
          <nav
            aria-label="Breadcrumb"
            className="text-[11px] uppercase tracking-[0.22em] text-ivory/80"
          >
            <Link href="/" className="hover:text-bone no-underline">Home</Link>
            <span className="mx-2">/</span> Thesis
          </nav>
          <div className="mt-8 max-w-5xl">
            <div className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.24em] text-bronze-200 font-medium">
              <span className="h-px w-10 bg-bronze-300/80" />
              The Thesis
            </div>
            <h1 className="mt-7 font-serif text-bone text-[40px] sm:text-[64px] lg:text-[104px] leading-[1.02] sm:leading-[0.98] tracking-tightest text-balance">
              <span className="italic text-bronze-200">A holding company</span> built to outlast the people who founded it.
            </h1>
            <p className="mt-10 text-ivory/95 text-xl lg:text-2xl leading-relaxed max-w-3xl font-serif italic">
              The structural case for permanent capital, operator-led portfolio
              companies, and a single operating playbook that runs across every
              jurisdiction we hold in.
            </p>
          </div>
        </div>
      </section>

      {/* OPENING ESSAY */}
      <section className="section bg-bone">
        <div className="container-wide">
          <div className="grid gap-16 lg:grid-cols-[2.4fr_1fr]">
            <article className="max-w-3xl">
              <div className="text-[10px] uppercase tracking-[0.24em] text-bronze-700 font-mono">
                Letter from the Office of the Group
              </div>
              <h2 className="mt-5 display-3 text-balance">
                Why this exists, in three plain sentences.
              </h2>
              <div className="mt-10 prose prose-lg">
                <p className="dropcap first-letter:font-serif first-letter:text-burgundy text-[18px] leading-[1.78] text-ink-soft">
                  Most institutional capital arrives at an operating business with
                  a clock attached. The clock decides everything that follows. It
                  decides which managers get hired and how they are paid. It decides
                  which capex gets approved and which gets deferred. It decides
                  whether the brand is treated as an asset or as a marketing line.
                  By the time the clock runs out, the business has been quietly
                  reshaped to be sold, not to compound.
                </p>
                <p className="my-6 text-[18px] leading-[1.78] text-ink-soft">
                  Rothenbury Group exists for the businesses on the other side of
                  that decision. We hold operator-led companies indefinitely. We
                  pair patient equity with shared institutional infrastructure. We
                  govern from the parent and stay out of the operating decisions
                  that belong to the operator. The discipline is identical from
                  Toronto to New York, from one company to another, from the first
                  decade to the third.
                </p>
                <p className="my-6 text-[18px] leading-[1.78] text-ink-soft">
                  This page is the long-form version of why. It is written for
                  founders, operators, allocators, and counterparties who want to
                  understand the structure before the conversation. The shorter
                  version is on the home page. The one-line version is on the cover
                  letter. Everything below is the substance underneath.
                </p>
              </div>
            </article>
            <aside className="lg:sticky lg:top-32 self-start space-y-6">
              <div className="border border-line bg-cream/40 p-6">
                <div className="text-[10px] uppercase tracking-[0.24em] text-bronze-700 font-mono">
                  At a glance
                </div>
                <dl className="mt-5 space-y-4 text-sm">
                  <div className="flex items-baseline justify-between gap-4 pb-3 border-b border-line">
                    <dt className="text-ink-soft">Holding horizon</dt>
                    <dd className="font-serif text-2xl text-navy">Indefinite</dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4 pb-3 border-b border-line">
                    <dt className="text-ink-soft">Sectors</dt>
                    <dd className="font-serif text-2xl text-navy">Six</dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4 pb-3 border-b border-line">
                    <dt className="text-ink-soft">Jurisdictions</dt>
                    <dd className="font-serif text-2xl text-navy">US · CA</dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="text-ink-soft">Default thesis</dt>
                    <dd className="font-serif text-lg italic text-burgundy">Compounding</dd>
                  </div>
                </dl>
              </div>
              <div className="border border-bronze/30 bg-bone p-6">
                <div className="text-[10px] uppercase tracking-[0.24em] text-bronze-700 font-mono">
                  Read also
                </div>
                <ul className="mt-5 space-y-4 text-sm">
                  <li>
                    <Link
                      href="/insights/permanent-capital-against-flipping/"
                      className="block group no-underline"
                    >
                      <div className="font-serif text-base italic text-navy group-hover:text-bronze-700 transition-colors">
                        Permanent capital and the case against flipping
                      </div>
                      <div className="mt-1 text-[11px] uppercase tracking-[0.18em] text-ink-mute">
                        Investment Strategy
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/insights/fragmented-services-markets-reward-discipline/"
                      className="block group no-underline"
                    >
                      <div className="font-serif text-base italic text-navy group-hover:text-bronze-700 transition-colors">
                        Why fragmented services markets reward discipline
                      </div>
                      <div className="mt-1 text-[11px] uppercase tracking-[0.18em] text-ink-mute">
                        Investment Strategy
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/insights/operating-partners-vs-portfolio-companies/"
                      className="block group no-underline"
                    >
                      <div className="font-serif text-base italic text-navy group-hover:text-bronze-700 transition-colors">
                        Operating partners vs portfolio companies
                      </div>
                      <div className="mt-1 text-[11px] uppercase tracking-[0.18em] text-ink-mute">
                        Governance
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* CHAPTER 1 - PERMANENCE */}
      <section className="section bg-walnut text-ivory grain border-y border-walnut">
        <div className="container-wide">
          <div className="max-w-3xl">
            <SectionMark num={1} label="Permanence" tone="ivory" />
            <h2 className="mt-6 font-serif text-ivory text-[32px] sm:text-[48px] lg:text-[68px] leading-[1.06] sm:leading-[1.04] tracking-tightest text-balance">
              The orientation of the balance sheet decides the orientation of the company.
            </h2>
            <p className="mt-8 text-ivory/90 text-lg leading-relaxed">
              A balance sheet with a fund clock and a balance sheet without one are
              not minor variants of the same instrument. They produce different
              hiring, different capex, different brand decisions, and different
              relationships with customers. The differences are observable in the
              P&L by year three.
            </p>
          </div>
          <div className="mt-14">
            <PermanenceVsCycleChart />
          </div>
          <div className="mt-12 grid gap-12 lg:grid-cols-2 max-w-5xl">
            <div className="text-ivory/90 text-[17px] leading-[1.78]">
              <p>
                Bain&rsquo;s 2024 Global Private Equity Report showed median capex
                as a percentage of revenue declining 28 percent in years four
                through six of sponsor-owned holds, as the asset is prepared for
                sale. PitchBook&rsquo;s 2024 sponsor data showed median CEO tenure
                inside private-equity portfolio companies at 3.4 years. The
                Boston Consulting Group&rsquo;s 2024 industrial operations
                benchmark put process investment at 2.1 percent of revenue for
                sponsor-owned firms versus 3.4 percent for permanent-capital-owned
                firms in the same category.
              </p>
            </div>
            <div className="text-ivory/90 text-[17px] leading-[1.78]">
              <p>
                The pushback is usually that permanent capital lacks discipline.
                Without an exit clock, what forces operating improvement? The
                answer is the only thing that ever forced it: capital allocation
                choices made against alternatives. A permanent-capital owner who
                is bad at allocation underperforms public market beta. The
                discipline is real. It is just measured differently.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CHAPTER 2 - OPERATING PARTNERSHIP */}
      <section className="section bg-bone">
        <div className="container-wide">
          <div className="max-w-3xl">
            <SectionMark num={2} label="Operating partnership" />
            <h2 className="mt-6 display-2 text-balance">
              Operators run the work. The parent governs the structure.
            </h2>
            <p className="mt-8 body-lg max-w-2xl">
              Holding-company governance often blurs two distinct roles: the
              operator who runs a portfolio company, and the parent that holds
              the equity. We keep them separate by written design.
            </p>
          </div>

          <div className="mt-14 grid gap-12 lg:grid-cols-[1.4fr_1fr] items-start">
            <div className="prose prose-lg">
              <p className="dropcap first-letter:font-serif first-letter:text-burgundy text-[17.5px] leading-[1.78] text-ink-soft">
                The operator owns customer relationships, day-to-day decisions,
                hiring inside their company, and the timing and scope of capital
                projects. Their incentives, equity, bonus, tenure, are tied to
                the performance of one P&amp;L. They make the operating calls
                and live with the consequences. The parent&rsquo;s role with the
                operator is governance: capital allocation, board oversight,
                succession planning, and brand integrity. We do not stand in the
                building telling them how to run their week.
              </p>
              <p className="my-6 text-[17.5px] leading-[1.78] text-ink-soft">
                The operating partner is a different role. The operating partner
                is not a chief executive. They do not have a single P&amp;L.
                They have a remit, finance, talent, procurement, technology,
                integration, and they apply that remit across multiple
                operating companies. Their incentives are tied to portfolio-wide
                performance, not to any single business. When the lines are
                clear, the operating partner is force-multiplying. They install
                systems once and harvest leverage across every company we hold.
              </p>
              <p className="my-6 text-[17.5px] leading-[1.78] text-ink-soft">
                The two failure modes are well-documented. Bain&rsquo;s 2024
                holding-company governance survey found that 41 percent of
                chief-executive departures inside multi-company portfolios
                cited operating-partner overreach as the proximate cause. The
                NAREIM 2024 Operating Practices study found that holding
                companies with documented role separation outperformed peers on
                portfolio-wide EBITDA margin by 220 basis points over a
                five-year window. The discipline is structural. We write it
                down.
              </p>
            </div>
            <div className="lg:sticky lg:top-32">
              <OperatingSupportStack stacked />
            </div>
          </div>
        </div>
      </section>

      {/* PULL QUOTE INTERLUDE */}
      <section className="parchment-grain py-20 lg:py-28 border-y border-line relative">
        <div className="container-wide relative">
          <Flourish />
          <PullQuote attribution="From the Rothenbury thesis">
            A holding company that intends to be present in three generations
            makes different decisions than one underwriting to a five-year
            exit. The orientation is different. The hiring is different. The
            way we treat operators, customers, and a brand is different.
          </PullQuote>
          <Flourish />
        </div>
      </section>

      {/* CHAPTER 3 - MULTIGENERATIONAL */}
      <section className="section bg-bone">
        <div className="container-wide">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] items-end mb-14">
            <div>
              <SectionMark num={3} label="Multigenerational chronology" />
              <h2 className="mt-6 display-2 text-balance">
                A holding chronology measured in decades, not quarters.
              </h2>
            </div>
            <p className="body-lg max-w-xl">
              The default time horizon is multigenerational. Operators come into
              the Group expecting an ownership relationship that runs past every
              transaction event a private-equity clock would have triggered. The
              chronology below is how that relationship matures.
            </p>
          </div>
          <OwnershipTimeline />
          <div className="mt-12 grid gap-12 lg:grid-cols-2 max-w-5xl">
            <div className="text-[17px] leading-[1.78] text-ink-soft">
              <p>
                The 8-to-12 year operating learning curve in mid-market services,
                staffing, and property-services businesses cannot be reset every
                five years without leaving most of the value on the floor. The
                Bureau of Labor Statistics&rsquo; 2024 occupational data on
                services trades showed quit rates 28 percent lower at firms above
                50 employees than below. Talent attraction follows scale, and
                scale follows continuity. The owner who can offer continuity
                attracts a different labor market.
              </p>
            </div>
            <div className="text-[17px] leading-[1.78] text-ink-soft">
              <p>
                Operating standards are codified centrally. Reporting cadence,
                capital-allocation discipline, governance, and brand integrity are
                documented at the parent and applied identically across the
                portfolio. Leadership transitions become planned events, not
                crises. The next operator inherits a brand with the operating
                system underneath, not just the logo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CHAPTER 4 - SINGLE STANDARD */}
      <section className="section bg-walnut text-ivory grain border-y border-walnut">
        <div className="container-wide">
          <div className="max-w-3xl">
            <SectionMark num={4} label="Single standard" tone="ivory" />
            <h2 className="mt-6 font-serif text-ivory text-[32px] sm:text-[48px] lg:text-[64px] leading-[1.06] sm:leading-[1.04] tracking-tightest text-balance">
              One operating playbook. Two jurisdictions. <span className="italic text-bronze-200">No exceptions.</span>
            </h2>
            <p className="mt-8 text-ivory/90 text-lg leading-relaxed">
              The United States and Canada are run as a single operating
              footprint. Local execution, local hiring, local regulatory posture,
              all inside one set of group-level standards.
            </p>
          </div>

          <div className="mt-14 grid gap-12 lg:grid-cols-3">
            <div className="border-l border-bronze-200/30 pl-6">
              <div className="text-[10px] uppercase tracking-[0.24em] text-bronze-200 font-mono">
                Reporting
              </div>
              <h3 className="mt-4 font-serif text-2xl text-ivory">
                One chart of accounts, two jurisdictions.
              </h3>
              <p className="mt-4 text-[15px] text-ivory/85 leading-relaxed">
                Every operating company reports against a single chart of accounts
                normalized to United States dollars and Canadian dollars in
                parallel. Cross-border comparisons are not produced after the
                fact. They are the format.
              </p>
            </div>
            <div className="border-l border-bronze-200/30 pl-6">
              <div className="text-[10px] uppercase tracking-[0.24em] text-bronze-200 font-mono">
                Governance
              </div>
              <h3 className="mt-4 font-serif text-2xl text-ivory">
                One board cadence. Identical agendas.
              </h3>
              <p className="mt-4 text-[15px] text-ivory/85 leading-relaxed">
                Board meetings run on the same cadence and the same agenda
                template across jurisdictions. The local company files locally.
                The governance discipline is identical.
              </p>
            </div>
            <div className="border-l border-bronze-200/30 pl-6">
              <div className="text-[10px] uppercase tracking-[0.24em] text-bronze-200 font-mono">
                Brand
              </div>
              <h3 className="mt-4 font-serif text-2xl text-ivory">
                Operator brands stay independent.
              </h3>
              <p className="mt-4 text-[15px] text-ivory/85 leading-relaxed">
                Each operating company keeps its own brand, customers, and
                identity. The Group does not consolidate brands. The Group
                governs that they are kept intact.
              </p>
            </div>
          </div>

          <p className="mt-14 max-w-3xl text-ivory/80 text-[15px] italic leading-relaxed">
            Statistics Canada&rsquo;s 2023 small business financing survey and
            the United States Census Bureau&rsquo;s 2024 County Business Patterns
            data both show median services-firm scale below 20 employees, with
            working-capital reserves under 35 days. The fragmentation is
            structural. The operating advantage of a single, disciplined
            cross-border standard is also structural.
          </p>
        </div>
      </section>

      {/* CHAPTER 5 - CLOSING */}
      <section className="section bg-bone">
        <div className="container-wide">
          <div className="grid gap-14 lg:grid-cols-[1.2fr_1fr] items-start">
            <div>
              <SectionMark num={5} label="Closing" />
              <h2 className="mt-6 display-2 text-balance">
                The argument is not that permanent capital is universally superior.
              </h2>
              <div className="mt-10 prose prose-lg">
                <p className="text-[17.5px] leading-[1.78] text-ink-soft">
                  Some businesses, technology platforms, certain consumer brands,
                  particular financial-services categories, are well-suited to
                  a transactional ownership cycle. The model is real, the
                  returns are real, and the discipline is real. We do not
                  pretend otherwise.
                </p>
                <p className="my-6 text-[17.5px] leading-[1.78] text-ink-soft">
                  The argument is that property services, industrial services,
                  staffing, regulated operating companies, and
                  infrastructure-adjacent businesses are not. The decade-plus
                  operating learning curve in those categories cannot be reset
                  every five years without leaving most of the value on the
                  floor. We build to hold because the underlying assets reward
                  it. The capital structure follows.
                </p>
                <p className="my-6 text-[17.5px] leading-[1.78] text-ink-soft">
                  Everything on this site flows from that orientation. The way
                  we underwrite, the way we hire, the way we treat operators,
                  the way we hand businesses from one generation of operators
                  to the next. If the orientation is the right one for the kind
                  of business you run or the kind of capital you allocate, we
                  would welcome the conversation.
                </p>
              </div>
              <div className="mt-12 flex flex-col sm:flex-row gap-3">
                <Link href="/contact/" className="btn-primary group">
                  Request a private introduction
                  <ArrowUpRight
                    className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={2}
                  />
                </Link>
                <Link href="/insights/" className="btn-secondary group">
                  Read the insights
                  <ArrowUpRight
                    className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={2}
                  />
                </Link>
              </div>
            </div>
            <aside className="relative">
              <div className="aspect-[4/5] relative overflow-hidden border border-line">
                <Image
                  src={IMAGES.oakBoardTable}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="mt-6 border-l-2 border-bronze pl-5 py-2 max-w-sm">
                <p className="font-serif text-xl text-navy italic leading-snug text-balance">
                  &ldquo;We did not build a holding company to repackage what
                  private equity already does. We built one because the standard
                  model fails operators, fails founders, and fails the businesses
                  themselves.&rdquo;
                </p>
                <p className="mt-3 text-[11px] uppercase tracking-[0.2em] text-ink-soft">
                  Office of the Group · Rothenbury
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Speak with the principals"
        heading="Private introductions are arranged through the Office of the Group."
        body="We respond to qualified inquiries from operators, founders, allocators, and counterparties within two business days."
      />
    </>
  );
}
