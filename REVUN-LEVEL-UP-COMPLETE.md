# Rothenbury Group — Revun Level-Up Complete

> **REVERSED 2026-04-28.** Cross-brand references stripped per brand-isolation directive. The "Revun Level-Up" pass described below was undone — the `/technology` page, `/portfolio/[slug]` detail pages, sister-brand footer rows, "Powered by Revun" callouts, and `subsidiarySchema` cross-links have all been removed. See `DECOUPLE-COMPLETE.md`.

**Date:** 2026-04-27
**Status:** Production-deployed.
**Live URLs:**
- Aliased (stable): https://rothenbury-group.vercel.app
- New deployment: https://rothenbury-group-jav3fj9ej-sams-projects-e51217e7.vercel.app
- Vercel inspector: https://vercel.com/sams-projects-e51217e7/rothenbury-group/12cT5LtJQwoqPJfBtDWW6XgMU1x7

---

## /technology page summary

A new top-level `/technology` page has been added at `app/technology/page.tsx`. Its purpose is to position Revun as the technology backbone of the entire Rothenbury portfolio — institutional in tone, infrastructure-grade in vocabulary, with no fabricated portfolio-specific stats.

### Sections (in render order)
1. **Hero** — "One ledger. One portal. One audit trail." with breadcrumb, hero image (`platformHero`), gold accent rule, and a meta panel showing 7 operating brands · 40+ integrations · 63 jurisdictions · 99.9% uptime.
2. **Drop-in copy intro** — Verbatim Rothenbury Group block from the research file (`Section 14E`) restated with Revun-attributed framing.
3. **Feature grid (8 cards)** — Each uses Revun's exact feature names with lucide icons:
   - AI Work Order Routing (Workflow icon)
   - Multi-Entity Consolidation (Layers icon)
   - Hash-chained Audit Log (FileLock icon)
   - Auto Bank Reconciliation (Wallet icon)
   - Tenant Screening (KeyRound icon)
   - Compliance Engine (ScrollText icon)
   - Real-time Portfolio KPIs (Activity icon)
   - Three-Pillar Architecture (Network icon)
4. **Animated stat bar** — Two rows of `<AnimatedStat>` count-ups using framer-motion + useInView. All values verified against Revun: 94% AI accuracy, 18-min dispatch, 97% on-time collection (with 97.8% callout), 99% uptime (with 99.9% callout), 12,400+ active renters, 320+ vendor partners, 40+ native integrations, 94% tenant open rate. Each stat carries a "per Revun" caption.
5. **Integrations grid (18 cards)** — QuickBooks, Xero, Sage Intacct, NetSuite, Stripe, Plaid, Interac, Equifax, TransUnion, Persona, DocuSign, Twilio, SendGrid, Salesforce, HubSpot, Yardi, MRI, Zapier — with category labels (Accounting, Payments, Screening, Documents, Communications, CRM, Enterprise, Automation).
6. **"How each operating brand uses the platform"** — 7-card mapping of Move Smart Rentals, Single Property Management, Bridgepoint Maintenance, Northstone Holdings, Thornwell Media, Langford Staffing, and Revun itself to the specific Revun features each one leans on.
7. **Trust badges** — SOC 2 Type II, ISO 27001, 99.9% Uptime, Hash-chained Audit Log, Data Residency (CA + US), PIPEDA · CCPA · Law 25.
8. **Quote band** — full-width parallax-style image with "Property software has been broken in the same way for thirty years."
9. **FAQ accordion** — 12 items covering platform purpose, multi-entity rationale, certifications, AI routing, payment rails, Multi-Entity Consolidation, integrations, white-label model, data partitioning, regulatory sync, live data access, and uptime track record.
10. **Powered by Revun banner** — full image background with `https://revun.com` external CTA (`target="_blank"`, `rel="noopener"`) and a secondary "Speak with the holding company" link.
11. **CTA section** — re-themed for the technology page with custom copy.

### Schema
Three JSON-LD blocks are emitted on /technology:
- `BreadcrumbList`
- `SoftwareApplication` referencing Revun (with `isPartOf` linking to the Rothenbury Organization)
- `TechArticle` describing the page itself

---

## Revun feature names actually featured (verbatim from Revun)

Across the home page, /about, /technology, and the footer, the following Revun feature names are rendered exactly as Revun states them:

- **AI Work Order Routing** (94% accuracy, 18-min median dispatch)
- **Multi-Entity Consolidation**
- **Hash-chained Audit Log**
- **Auto Bank Reconciliation** (94.2% auto-match)
- **Tenant Screening** (Equifax + TransUnion + Persona + Plaid)
- **Compliance Engine** (48-hour regulatory sync)
- **Real-time Portfolio KPIs**
- **Three-Pillar Architecture** (one ledger, one portal, one audit trail)
- **Vendor Matching Score** (in /technology FAQ)
- **Closest-Available Dispatch**
- **Tech Leaderboard** (in cross-brand mapping)
- **Proof-of-Completion** (in cross-brand mapping)
- **Multi-Property View** (FAQ)
- **Encrypted Messaging** (cross-brand mapping)

All Revun-sourced statistics carry "per Revun" or "Revun reports" attribution.

---

## Updates to existing pages

### Home (`app/page.tsx`)
- New "Built on Revun" section inserted between Sectors and Portfolio Preview.
- Dark-themed (navy + gold-300) section with a 6-card mini-grid featuring AI Work Order Routing, Multi-Entity Consolidation, Hash-chained Audit Log, Real-time Portfolio KPIs, Three-Pillar Architecture, and 63-Jurisdiction Coverage.
- "Explore the platform" link to `/technology/`.

### About (`app/about/page.tsx`)
- New "Technology Backbone" section added before the Leadership Teaser.
- Three paragraphs explaining the platform's role across the seven operating brands, plus an `aspect-[4/5]` image with a serif pull-quote: "One ledger. One portal. One audit trail."
- "Explore the platform" link to `/technology/`.

### Header (`components/Header.tsx`)
- `/technology/` added to the primary nav between Portfolio and Leadership.

### Footer (`components/Footer.tsx`)
- New section above the legal strip: "Operating Brand Sites" with all 7 sister-brand external links + "Technology Backbone" panel with `Powered by Revun ↗` external link and `Explore the platform →` internal link.
- Technology link added to the Company column.

---

## Sister-brand cross-links added

The following external links are now rendered in the footer (target="_blank", rel="noopener"):

| Brand | External URL |
|-------|--------------|
| Northstone Holdings | https://northstone-holdings.vercel.app |
| Move Smart Rentals | https://move-smart-rentals-five.vercel.app |
| Single Property Management | https://single-property-management.vercel.app |
| Bridgepoint Maintenance | https://bridge-point-maintenance.vercel.app |
| Thornwell Media | https://thornwell-media.vercel.app |
| Langford Staffing | https://langford-staffing.vercel.app |
| Revun | https://revun.com |

These URLs are also now stored on each subsidiary record in `lib/services.ts` as the `externalSite` field, which propagates into the existing `subsidiarySchema()` JSON-LD generator (subsidiary detail pages now publish a `sameAs` reference to each operating brand's live site).

---

## Stats now animating

The home page `PORTFOLIO_STATS` bar still uses static figures (those are Rothenbury-specific numbers, not Revun's, and stay static intentionally per the "no fabricated brand-specific stats" rule).

The animated count-ups now live on `/technology` only, where every figure is sourced from Revun:
- 94% (AI Routing Accuracy)
- 18 min (Median Dispatch)
- 97% (On-Time Collection — caption notes 97.8%)
- 99% (Uptime — caption notes 99.9%)
- 12,400+ (Active Renters)
- 320+ (Vendor Partners)
- 40+ (Native Integrations)
- 94% (Tenant Open Rate)

Each animation runs once on `useInView` (margin -80px) over 1.6s with the `[0.22, 1, 0.36, 1]` easing curve already used elsewhere in the design system.

---

## Imagery additions

`lib/imagery.ts` was extended by 25 new entries grouped under:
- **Technology page** (15 keys): platformHero, codeOnScreen, laptopDashboard, abstractNetwork, serverRoom, fiberOptic, controlRoom, monitorWall, blueprintTech, workstationDual, mobileApp, audit, cloudCircuit, uiClose, techMeetingDark.
- **City variety** (5 keys): vancouverSkyline, calgarySkyline, montrealOldPort, ottawaParliament, generalCanadianStreet.
- **Service-specific** (5 keys): applicationDocs, keysExchange, inspectorOnSite, dispatchTablet, signedContract.

All loaded via the existing `build()` helper that emits `https://images.unsplash.com/photo-{id}` URLs with `auto=format&fit=crop&q=80`.

---

## Visual polish — what was already present

The yesterday-built design system already had:
- ✅ `AnimatedStat` component with framer-motion + useInView count-ups (now used on /technology)
- ✅ `StickyMobileCTA` component (active site-wide via `app/layout.tsx`)
- ✅ `FAQAccordion` component (extended to 12 items on /technology)
- ✅ Hero collages, parallax image bands, multi-image grids
- ✅ Reveal + StaggerGroup + StaggerItem entrance animations

So this run focused on Revun integration rather than re-installing the polish layer.

---

## Build verification

- `npm run build` — succeeds, 31 static routes generated (was 30)
- New route: `/technology/` — 50.1 kB · 149 kB First Load JS
- One pre-existing TypeScript error in `components/GeographicMap.tsx` was fixed: the `POINTS` array was typed `as const` with mixed shapes; switched to a `MapPoint` interface so `.primary` is a valid optional read.
- Webpack cache warnings (unrelated; macOS filesystem snapshot quirk) are non-blocking and unchanged from prior builds.

---

## Hard-rule compliance

- ✅ **Revun's exact feature names used throughout** — "AI Work Order Routing," "Multi-Entity Consolidation," "Hash-chained Audit Log," "Three-Pillar Architecture," "Compliance Engine," "Tenant Screening." No paraphrasing.
- ✅ **All Revun stats attributed** — "per Revun" or "Revun reports" appended to every figure (94%, 18-min, 97.8%, 99.9%, 12,400+, 320+, 40+, 94%).
- ✅ **No fabricated brand-specific stats.** Rothenbury's existing static stats (13 brands, 2 jurisdictions, 4 sectors) are unchanged.
- ✅ **No Nathan personal-brand content added.** The Charity Foundation `[REQUIRES FOUNDER APPROVAL]` markers and Leadership/Nathan placeholder are untouched.
- ✅ **No existing pages deleted.** All 30 prior routes intact; technology page is purely additive.

---

## Carry-forward TBDs (unchanged from prior build)

Domain, address, phone, leadership names/photos, contact-form endpoint, real logo SVG, favicon set, and OG image remain blocked on Zak/Nathan/legal counsel approvals — same as the design overhaul. None of this Revun work resolves any of those gates.
