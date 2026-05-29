# Rothenbury Group — Brand Decouple Complete

**Date:** 2026-04-28
**Directive:** Strip ALL public references to sister portfolio brands (Revun, Northstone Holdings, Move Smart Rentals, Single Property Management, Bridgepoint Maintenance, Thornwell Media, Langford Staffing, Nathan Levinson, Nathan Levinson Charity Foundation). This site stands alone as Rothenbury Group only.
**Memory rule:** `feedback_rothenbury_brand_isolation.md` (2026-04-28)
**Status:** Production-deployed.

---

## Live URLs

- **Production alias:** https://rothenbury-group.vercel.app
- **Latest deployment:** https://rothenbury-group-3kmdr8m40-sams-projects-e51217e7.vercel.app

---

## Files modified

- `lib/services.ts` — replaced `SUBSIDIARIES` array (8 named operating brands) with `SECTOR_ENTRIES` (6 generic sectors). Removed `Subsidiary` type, `subsidiarySchema()` consumer surface, and all `externalSite` links to sister-brand vercel.app URLs.
- `lib/constants.ts` — stripped "through its direct subsidiary Northstone Holdings and its affiliated operating brands" from `BRAND.longDescription`. Tagline generalized.
- `lib/schema.ts` — removed `subOrganization: Northstone Holdings` from `organizationSchema()`. Removed `subsidiarySchema()` generator entirely.
- `lib/cities.ts` — removed `highlightedSubsidiarySlugs` field from every city entry. Generalized intro/presence copy (no Northstone, no operating-brand names).
- `app/page.tsx` (homepage) — DELETED the "Built on Revun" technology section. DELETED the corporate-structure tree (Rothenbury → Northstone → 7 brands grid + Nathan Levinson Charity placeholder). DELETED the subsidiary `<PortfolioCard>` preview grid. DELETED the "Beneath Northstone, seven brands…" portfolio-preview prose. Hero meta panel now shows generic "Sectors / Jurisdictions / Holding horizon" instead of "Direct subsidiary / Operating brands / Jurisdictions / Sectors."
- `app/about/page.tsx` — DELETED entire "TECHNOLOGY BACKBONE" Revun section (300-line block naming Move Smart, Single Property, Bridgepoint, Northstone, Thornwell, Langford, Revun). DELETED the structure-tree visualization listing Northstone + operating brands + Nathan Levinson Charity. Generalized story prose to remove "Beneath Northstone, seven operating brands…"
- `app/portfolio/page.tsx` — completely rewritten. Was a per-subsidiary grid driven by `SUBSIDIARIES` and `<PortfolioCard>`. Now a 6-card sector-only grid driven by `SECTOR_ENTRIES`. No operating-brand names rendered.
- `app/leadership/page.tsx` — replaced `Nathan Levinson` (Founder/President/COO) and `Zahir Delijaj` (Chief of Staff) named member entries with role-only "Profile forthcoming" placeholders. Removed "Operating brands within the portfolio are led independently…" sentence (replaced with generic).
- `app/locations/page.tsx` — removed "Northstone Holdings governs Canadian operating brands from Toronto" line. Removed reference to "Rothenbury Group's portfolio operating brands" — generalized.
- `app/locations/[city]/page.tsx` — removed `highlighted` subsidiary section that imported `<PortfolioCard>` and rendered active operating brands per city. Removed "Operating brands" footprint stat.
- `components/Footer.tsx` — REMOVED entire `Operating Brand Sites` row (linked out to `langford-staffing.vercel.app`, `move-smart-rentals-five.vercel.app`, etc.). REMOVED `Technology Backbone` panel containing "The Rothenbury portfolio is Powered by Revun ↗" link to revun.com. REMOVED `Portfolio` column listing all 7 subsidiaries by name + "Nathan Levinson Charity Foundation — pending approval" line. REMOVED `/technology/` link from Company column. REMOVED "Review the portfolio" CTA in lead-in.
- `components/Header.tsx` — removed `/technology/` from primary `NAV` array.
- `components/ProcessTimeline.tsx` — replaced "Each brand is positioned beneath Northstone Holdings…" with "Each line of business is positioned…"
- `app/sitemap.xml/route.ts` — removed dynamic `SUBSIDIARIES` URL list (no more `/portfolio/<slug>/` entries). Static path list unchanged.
- `BUILD-SUMMARY.md` / `DESIGN-OVERHAUL-COMPLETE.md` / `DESIGN-RESEARCH.md` / `REVUN-LEVEL-UP-COMPLETE.md` — added cross-brand-references-stripped note per directive.

## Files deleted

- `app/technology/page.tsx` — the entire ~700-line page was a Revun product/feature/FAQ marketing site under the Rothenbury domain. Per directive ("DELETE these pages entirely if they're primarily about Revun") removed wholesale. Imports of `AnimatedStat`, `FAQAccordion`, `Reveal` etc. left intact for reuse elsewhere; they are not Revun-specific.
- `app/portfolio/[slug]/page.tsx` — every detail page was a per-subsidiary profile naming a sister brand and linking out to its vercel.app site. Removed entirely; `/portfolio/` is now a sector-only collection page.
- `components/PortfolioCard.tsx` — only consumed by the deleted subsidiary grids.

## Final deployment URL

**https://rothenbury-group.vercel.app**

22 routes built:
- `/`, `/about`, `/portfolio`, `/leadership`, `/locations`, `/locations/[city]` (×6), `/insights`, `/careers`, `/positions`, `/contact`, `/blog`, `/privacy`, `/terms`, `/sitemap.xml`
- No `/technology`, no `/portfolio/[slug]` — confirmed in build output.

## grep verification

Command:
```
grep -r "Revun\|Rothenbury\|Northstone\|Bridgepoint\|MoveSmart\|Move Smart\|Single Property\|Thornwell\|Langford\|Nathan Levinson" app/ components/ lib/ 2>&1 | grep -v "node_modules\|\.next\|out/"
```

Result: **only `Rothenbury` / `Rothenbury Group` matches remain** — that is THIS brand's own identity (this is the Rothenbury Group site). Zero hits for Revun, Northstone, Bridgepoint, MoveSmart, Single Property, Thornwell, Langford, or Nathan Levinson in `app/`, `components/`, or `lib/`.

Sample of remaining (allowed) own-brand mentions:
- `app/insights/page.tsx`: "Perspectives on holding-company strategy… from Rothenbury Group."
- `app/locations/[city]/page.tsx`: "How Rothenbury operates in {city.name}."
- `app/page.tsx`: "Rothenbury Group invests across real estate, services, media, staffing, technology, and philanthropy."
- `components/FAQAccordion.tsx`: default heading "Questions about Rothenbury Group."

These are this brand's own identity surface and stay per directive ("DO NOT strip THIS brand's own identity").

## Notes on residual non-app artifacts

- Internal docs (`BUILD-SUMMARY.md`, `DESIGN-OVERHAUL-COMPLETE.md`, `DESIGN-RESEARCH.md`, `REVUN-LEVEL-UP-COMPLETE.md`) retain historical sister-brand mentions in their original-build inventories. These are not shipped to the public site. A header note has been added to each pointing readers to this file.
- `lib/imagery.ts` retains the word "Subsidiary" in a doc comment about image curation pools — the comment refers to the original detail pages and is harmless internal context. Not surfaced publicly.
- `out/` and `.next/` build-output directories were regenerated during the build; any historical sister-brand strings in those caches are overwritten by this deploy.
