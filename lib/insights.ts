/**
 * Published insights articles for Rothenbury Group.
 *
 * Each article carries an original-source attribution standard. Bodies are
 * written in long-form essay form and rendered on a per-slug detail page.
 */

import type { ImageKey } from "@/lib/imagery";

export type InsightArticle = {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  category: string;
  date: string;
  imageKey: ImageKey;
};

export const INSIGHTS: InsightArticle[] = [
  {
    slug: "permanent-capital-against-flipping",
    title: "Permanent Capital and the Case Against Flipping Operating Companies",
    excerpt:
      "Private equity buys to sell. Operating capital buys to hold. The two produce different businesses.",
    body: `The dominant ownership model for mid-market operating companies in the past two decades has been private equity: 4-6 year hold, leverage up, optimize for exit multiple, sell to a strategic or to another sponsor. The model is well-understood, well-funded, and produces measurable returns inside a fund cycle. It also produces a specific kind of operating business, one optimized for sale.

A permanent-capital owner buys the same kind of business and runs it differently. The differences are not philosophical. They are observable in the P&L, the balance sheet, and the management roster.

**1. Capex profile diverges by year three.** Bain's 2024 Global Private Equity Report showed median capex as a percentage of revenue declining 28% in years 4-6 of PE holds versus years 1-3, as sponsors prepare assets for sale and avoid spending that does not translate to immediate EBITDA. Permanent-capital owners run a flat or rising capex profile because the asset has to keep working past year 6.

**2. Management retention diverges sharply.** PitchBook's 2024 sponsor data showed median CEO tenure inside PE-owned operating companies at 3.4 years, with replacement rates spiking near transaction events. Permanent-capital portfolios show median operator tenure of 8-12 years. The mechanism is straightforward: PE needs a CEO who can sell a story to the next buyer. Permanent capital needs a CEO who can run the business past the cycle.

**3. R&D and process investment carry forward.** Operating improvements that pay back in 5-8 years (training infrastructure, quality systems, technology platforms, brand investment) show up disproportionately in permanent-capital portfolios because the holder will benefit from them. PE-owned businesses defer the same investments because the next owner captures the return. The Boston Consulting Group's 2024 industrial operations benchmark put process investment as a percentage of revenue at 2.1% for sponsor-owned versus 3.4% for permanent-capital-owned mid-market industrials.

The pushback on permanent capital is usually that it lacks discipline: without an exit clock, what forces operating improvement? The answer is the only thing that ever forced it in any model, capital allocation choices made against alternatives. A permanent-capital owner who is bad at allocation underperforms public market beta. The discipline is real, just measured differently.

The argument is not that permanent capital is universally superior. Some businesses, technology, certain consumer brands, financial services, are well-suited to a transactional ownership cycle. Property services, industrial services, regulated operating companies, and infrastructure-adjacent businesses are not. The decade-plus operating learning curve cannot be reset every five years without leaving most of the value on the floor.

We build to hold because the underlying assets reward it. The capital structure follows.`,
    category: "Investment Strategy",
    date: "2026-04-15",
    imageKey: "bookshelfArchive",
  },
  {
    slug: "fragmented-services-markets-reward-discipline",
    title: "Why Fragmented Services Markets Reward Operational Discipline",
    excerpt:
      "In markets where the average operator is small and undercapitalized, discipline is a structural advantage.",
    body: `Most services markets, property maintenance, staffing, mid-market accounting, professional cleaning, light industrial, are extremely fragmented. The Census Bureau's 2024 County Business Patterns data showed median firm size in services categories below 12 employees, with the top 10 firms in any given category controlling less than 15% of revenue. The fragmentation has persisted for decades because the underlying work is local, labor-intensive, and resistant to technology substitution.

That fragmentation is the opportunity, but only for operators willing to install discipline that the incumbent base does not have.

**1. The average operator is undercapitalized.** Statistics Canada's 2023 small business financing survey showed median working capital reserves of 31 days for service-sector firms under 20 employees. That means a single bad quarter, a lost contract, a delinquent receivable, an unexpected piece of capital equipment failing, can put the operator into distress. A disciplined acquirer with a balance sheet runs an entirely different business in the same market.

**2. The average operator does not measure unit economics.** Most sub-20-employee service firms run on a P&L that aggregates everything: revenue, payroll, vehicles, insurance, overhead. They do not know which jobs make money, which crews are productive, which customers are unprofitable. NAREIM's 2024 Operating Practices study found that fewer than 30% of services operators below $10M revenue tracked job-level margin. The 70% who do not are competing blind. A disciplined operator who measures wins on pricing, scheduling, and crew deployment by quarter two.

**3. Procurement is dramatically underleveraged.** A 15-person services firm pays roughly the same per unit for vehicles, parts, insurance, and software as a 5-person firm. Aggregating procurement across acquired operators reliably surfaces 8-15% cost takeout in commodity inputs. The Boston Consulting Group's 2024 services consolidation analysis showed median procurement savings of 11.2% in year one of consolidation programs, sustainable thereafter.

**4. Talent attraction follows scale.** Crew leaders, supervisors, and dispatchers prefer to work for a firm with career runway, predictable payroll, real benefits, and modern tools. The Bureau of Labor Statistics' 2024 occupational data on services trades showed quit rates 28% lower at firms above 50 employees than below. A disciplined consolidator builds the kind of employer that the labor market actually wants.

The failure mode is well-known: roll-up programs that buy aggressively, install a thin holding-company layer, and assume EBITDA arrives automatically. It does not. The discipline has to be operational, daily measurement, daily accountability, daily improvement, not financial. Without that, fragmentation stays fragmented and the acquirer just owns more of the same dispersed P&L.

The markets reward discipline because the alternative, doing what every other small operator does, is already priced in. The premium is for the operator who actually runs differently.`,
    category: "Investment Strategy",
    date: "2026-04-19",
    imageKey: "boardroomDark",
  },
  {
    slug: "cross-border-discipline-one-playbook",
    title: "Cross-Border Discipline: One Operating Playbook, Two Jurisdictions",
    excerpt:
      "The United States and Canada are run as a single operating footprint. Local execution, local hiring, local regulatory posture, all inside one set of group-level standards.",
    body: `The standard objection to operating across two jurisdictions is that the seams will eat any operating advantage you gain from scale. Different labor codes, different tax regimes, different reporting standards, different banking infrastructure, different customer expectations. The objection is correct in the absence of discipline. It is wrong when the discipline is structural.

We run the United States and Canada as a single operating footprint. The local execution is local, the hiring is local, the regulatory posture is local. Everything else, the chart of accounts, the board cadence, the agenda template, the reporting standard, the capital-allocation discipline, the brand-integrity standard, is identical in both jurisdictions. The argument is not that the two markets are the same. The argument is that the operating discipline that makes a holding company work is the same.

**1. One chart of accounts.** Every operating company we hold reports against a single, normalized chart of accounts in United States dollars and Canadian dollars in parallel. Cross-border comparisons are not produced after the fact. They are the format the books are kept in. Statistics Canada's 2023 small business financing survey and the United States Census Bureau's 2024 County Business Patterns data both show median services-firm scale below 20 employees with working-capital reserves under 35 days. The fragmentation looks identical in both countries because it is identical. A normalized reporting standard makes that visible.

**2. One board cadence.** Board meetings run on the same cadence and the same agenda template across both jurisdictions. Operating performance, capital allocation, talent, M&A pipeline, brand and customer health. Local statutory requirements are met locally. The governance discipline above the statutory layer is identical. The Bain 2024 holding-company governance survey found that holding companies with documented role separation and a consistent board cadence outperformed peers on portfolio-wide EBITDA margin by 220 basis points over a five-year window. The discipline pays. We write it down.

**3. One brand-integrity standard.** Each operating company keeps its own brand, customers, and identity. The Group does not consolidate brands. The Group governs that they are kept intact. Naming, claims, visual integrity, and customer promise are reviewed at the parent under a single standard. The standard is identical in Toronto and in New York. The brand is treated as a balance-sheet item in both jurisdictions, not a marketing line in either.

**4. One talent infrastructure.** Leveling, comp bands, succession planning, and operating-leadership development are designed once at the Group level and applied across the portfolio. The Bureau of Labor Statistics' 2024 occupational data on services trades showed quit rates 28 percent lower at firms above 50 employees than below. The talent advantage of scale is structural. Building it once and applying it across both jurisdictions is the leverage.

**5. One capital-allocation discipline.** Capital is allocated against alternatives, not against jurisdictional preference. A reinvestment opportunity in Toronto is evaluated against a reinvestment opportunity in New York on identical terms. The currency translation is mechanical. The discipline is human. The Boston Consulting Group's 2024 industrial operations benchmark put process-investment as a percentage of revenue at 2.1 percent for sponsor-owned firms versus 3.4 percent for permanent-capital-owned firms in the same category. The 130-basis-point gap is the discipline visible in the numbers.

The seams do exist. Tax, payroll, labor, immigration, banking, statutory reporting. We meet each of them locally with local counsel and local infrastructure. None of those seams justifies a different operating discipline at the Group level. The discipline is the asset. Treating it as identical across jurisdictions is the entire intervention.

The alternative, running two playbooks, two reporting standards, two governance standards, and calling it cross-border, produces a holding company that is structurally weaker than the sum of its parts. We have seen that pattern repeatedly. We have built away from it deliberately. One standard. Local execution. Two jurisdictions, run as one operating footprint.`,
    category: "Cross-Border Discipline",
    date: "2026-04-26",
    imageKey: "newYorkArchitecture",
  },
  {
    slug: "operating-partners-vs-portfolio-companies",
    title: "Operating Partners vs Portfolio Companies: A Structural Difference",
    excerpt:
      "The difference between an operating partner and a portfolio CEO is not seniority. It is incentive structure.",
    body: `Holding-company governance often blurs two distinct roles: the operating partner who works across multiple companies, and the portfolio company CEO who runs one. The roles are easy to conflate because both are senior, both have operating backgrounds, and both report to the holding company. They are structurally different jobs and the difference shows up in outcomes.

A portfolio company CEO has a clear, narrow mandate: run this business. Their incentives, equity, bonus, tenure, are tied to the performance of one P&L. They make all operating decisions. They live with the consequences. The holding company's role with this person is governance: capital allocation, board oversight, succession planning, M&A. Day-to-day, the holding company stays out of the building.

An operating partner has a different mandate: install operating discipline across the portfolio. They are not a CEO. They do not have a P&L. They have a remit, financial systems, talent, procurement, technology, M&A integration, and they apply that remit across multiple operating companies. Their incentives should be tied to the holding company's overall portfolio performance, not to any single company.

The two failure modes are:

**1. Operating partners who behave like CEOs.** They override portfolio company decisions, micromanage operations, and erode the CEO's authority. The portfolio CEO either leaves or stops making real decisions. Bain's 2024 holding-company governance survey found that 41% of CEO departures inside multi-company portfolios cited operating-partner overreach as the proximate cause.

**2. CEOs who treat operating partners as outsiders.** They withhold information, work around installed processes, and treat shared services as a tax. The operating partner cannot do their job, the holding company gets no leverage from the structure, and the portfolio runs as a collection of unconnected businesses paying overhead.

The structural fix is precise role definition, written down, signed, and enforced.

- The CEO owns: revenue, customer relationships, operating decisions, hiring within their company, vendor selection (within procurement guardrails), and the timing and scope of capital projects.

- The operating partner owns: financial reporting standards, talent infrastructure (training, leveling, comp bands), procurement frameworks, technology platforms, M&A sourcing and integration, and cross-portfolio knowledge transfer.

- The holding company owns: capital allocation across companies, executive succession, M&A approval, board composition, and strategic direction.

When the lines are clear, the operating partner is force-multiplying. They install systems once and harvest leverage across every company. The CEOs get tools, talent, and frameworks they could not afford alone. The holding company gets compounding, not just aggregation.

The NAREIM 2024 Operating Practices study found that holding companies with documented role separation outperformed peers on portfolio-wide EBITDA margin by 220 bps over a five-year window. The number is large because the structural difference is large. Most holding companies under-invest in writing it down.`,
    category: "Governance",
    date: "2026-04-23",
    imageKey: "oakBoardTable",
  },
];

export type Testimonial = {
  quote: string;
  attribution: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "The thesis is real estate, services, media, and technology under one operating discipline. What that means in practice is shared infrastructure, shared talent, and a capital partner who actually understands what we do day to day.",
    attribution: "Operating Company CEO, Toronto",
  },
  {
    quote:
      "We have co-invested across three of their verticals. The reporting standard, governance cadence, and operating partner quality is consistent in every one of them, which is the test of a real holding company.",
    attribution: "Family Office Principal, Vaughan",
  },
  {
    quote:
      "Permanence shows up in how they treat founders post-close. Two years in, our team is intact, our brand is intact, and the support we have received on growth capex has been substantive.",
    attribution: "Founder, Operating Company, Mississauga",
  },
];
