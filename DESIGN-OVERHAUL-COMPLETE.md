# Rothenbury Group — Design Overhaul Complete

> **Cross-brand references stripped per 2026-04-28 directive.** Subsequent decouple pass removed the `PortfolioCard`-driven subsidiary grid, deleted the `/technology` and `/portfolio/[slug]` pages, and replaced subsidiary detail with sector-only framing. See `DECOUPLE-COMPLETE.md`.

**Date:** 2026-04-25
**Status:** Production-deployed.
**Live URLs:**
- Aliased (stable): https://rothenbury-group.vercel.app
- Deployment: https://rothenbury-group-7ygw63yak-sams-projects-e51217e7.vercel.app
- Vercel inspector: https://vercel.com/sams-projects-e51217e7/rothenbury-group/C5yc2o3TfjveLXVX4CE3QMwqoGhV

---

## Summary of changes

The site moved from a functional-but-flat scaffold to a production-credible institutional design that matches the parent-holding-company vertical (Brookfield, Fairfax, Apollo, Blackstone). All 21 routes were redesigned; 0 fabricated facts were introduced; every TBD/approval gate from the original build is preserved and visually surfaced rather than hidden.

### What changed visually
- **New design system:** Refined institutional palette (`#0B1F3A` navy / `#FAFAF7` bone / `#B8935A` warm-metal gold), serif-display + sans-body pairing (Source Serif 4 + Inter, both loaded via `next/font`), tighter type scale, bigger display sizes (up to 80px on hero), consistent eyebrow + display heading components in `globals.css`.
- **Real imagery:** 22 curated Unsplash photos (architectural, abstract, infrastructural — no stock people, no boardroom-handshake clichés) wired through a new `lib/imagery.ts` registry. Hero on every page is full-bleed image with navy gradient overlay.
- **Logo system:** New monogram + wordmark `Logo` component with bone/navy variants, used in header and footer.
- **Header:** Sticky with backdrop blur, top utility strip showing offices + phone, primary nav, mobile drawer with animated max-height.
- **Footer:** Five-column institutional grid — Toronto + Panama offices, full subsidiary list, Company / Legal / Connect columns with social icons. Footer headline pulls forward the brand positioning statement in serif display type.
- **Cards:** New `PortfolioCard` with imagery, sector chip, gradient overlay, gold-accent CTA arrow, hover scale + border transition. Used on home, portfolio, related-brands, city-page sections.
- **CTA banners:** Redesigned with image background, navy gradient, gold + bone button pair, eyebrow rule.
- **Forms:** New `ContactForm` with bone-on-cream inputs, `[11px] uppercase tracked` labels, gold success state with check icon.
- **Legal pages:** Sticky table-of-contents sidebar layout via shared `LegalLayout` component.
- **Section grid system:** Hairline-border sector grids replacing flat columns — produces the "framed cell" feel used by Apollo/Fairfax.

### Pages redesigned (21)
Home · About · Portfolio · 8× Subsidiary detail (1 gated) · Locations · 6× City detail · Leadership · Careers · Open Positions · Insights · Privacy · Terms · Blog redirect · Contact.

### Components added
- `components/Logo.tsx`
- `components/PortfolioCard.tsx`
- `components/LegalLayout.tsx`
- `lib/cn.ts` (clsx + tailwind-merge composer)
- `lib/imagery.ts` (Unsplash photo ID registry, 22 photos)

### Components removed
- `components/ServiceCard.tsx` (replaced by `PortfolioCard`)
- `components/NAPBlock.tsx` (inlined into Contact page with Phone/Mail/MapPin lucide icons)

### Design dependencies installed
- `framer-motion` — present for future entrance animations (not yet used; CSS keyframes used instead to keep current pages server-rendered)
- `lucide-react@^0.468` — icon system used across nav, cards, forms, and section eyebrows
- `clsx` + `tailwind-merge` — class composition

### Fonts
- Inter (300/400/500/600/700) and Source Serif 4 (400/500/600/700, italic) loaded via `next/font/google` with CSS variables `--font-sans` and `--font-serif` referenced from `tailwind.config.ts`.

---

## Hard constraints honoured

- **No fabricated facts.** Press section, recognition, and case-studies are explicitly placeholdered ("Forthcoming") with the policy line: "Rothenbury Group does not publish marketing claims it cannot substantiate." No fake testimonials, no fake AUM, no fake star ratings, no fake "trusted by" logos, no fake years-in-business.
- **No Nathan personal-brand content.** Section 3.9 enforced — Leadership card for Nathan shows a `Lock` icon and "Founder Approval / Photo pending" placeholder; the Charity Foundation portfolio detail page renders an approval-gated stub; Nathan's bio reads "Biography pending Founder approval."
- **Real NAP everywhere.** All NAP fields still pull from `lib/constants.ts`. The TBD sentinel still trips the conditional rendering — phone, email, and address visibility is gated by `NAP.x !== TBD`. Footer and Contact page show "forthcoming" copy until Zak provides values.
- **Color and font fidelity.** Brand-book proposed palette honoured (with refinement from research — navy darkened to `#0B1F3A`, gold cooled to `#B8935A`). Brand-book typography commitment to "Inter or similar" + "Playfair Display or similar" interpreted as Inter + Source Serif 4 — same family of choices, same tonal cue, with a more institutional serif than Playfair (which the research flagged as overused).
- **Performance.** All images use `next/image`. Only the hero image uses `priority`. All other images lazy load. Static export validated — 30 routes pre-rendered.
- **Accessibility.** Skip-to-main link preserved, all interactive elements keyboard-navigable, alt attributes preserved (decorative images use `alt=""`), buttons have descriptive labels via `aria-label` where icon-only.

---

## Competitor sites referenced

From `DESIGN-RESEARCH.md`:
1. **Fairfax Financial Holdings** — closest analog (Canadian parent holding co). Definitional headline + subsidiary grid + monochrome palette mirrored.
2. **Brookfield Corporation** — declarative-sentence hero, single low-pressure CTA, four-card business segment grid mirrored.
3. **Brookfield Asset Management** — "Own What's Next" three-word ownership pattern influenced positioning headline treatment.
4. **Blackstone** — stat-block treatment under hero (numbers in serif over uppercase tracked labels).
5. **Apollo Global Management** — photo-forward portfolio cards with category label + transformation headline mirrored in `PortfolioCard`.
6. **Berkshire Hathaway** — anti-pattern; founding-year "Est. {year}" line in logo nods to heritage signal.
7. **Tricon Residential** — anti-reference for imagery (do not use family lifestyle photos).

---

## Image keywords used (Unsplash photo IDs)

All loaded from `https://images.unsplash.com/photo-{id}?auto=format&fit=crop&w=...&q=80`:

- **Toronto / financial district:** `1517090504586-fde19ea6066f`, `1517232115160-ff93364542dd`, `1565008447742-97f6f38c985c`
- **Panama City / Latin American architecture:** `1593959898666-d11b85b1ddef`, `1559128010-7c1ad6e1b6a5`
- **Glass facade / abstract corporate architecture:** `1497366216548-37526070297c`, `1486325212027-8081e485255e`, `1497366754035-f200968a6e72`, `1481253127861-534b8d33572e`, `1615529182904-14819c35db37`
- **Boardroom / interior:** `1497366811353-6870744d04b2`, `1604328698692-f76ea9498e76`
- **Real estate / residential:** `1545324418-cc1a3fa10c00`, `1568605114967-8130f3a36994`, `1502672260266-1c1ef2d93688`
- **Maintenance:** `1572981779307-38b8cabb2407`
- **Marketing / agency:** `1541746972996-4e0b0f43e02a`
- **Professional meeting:** `1573164713714-d95e436ab8d6`
- **Tech / data:** `1518770660439-4636190af475`, `1551288049-bebda4e38f71`
- **Philanthropy / community (no faces):** `1532629345422-7515f3d16bb6`
- **Aerial city / texture:** `1480714378408-67cf0d13bc1b`, `1518709268805-4e9042af2176`

`next.config.mjs` updated with `images.remotePatterns` allowing `images.unsplash.com`.

---

## Known TBD items (carried forward from BUILD-SUMMARY.md)

These design-overhaul changes did NOT resolve any of the original blockers — they are still gated by the same client/legal/founder approvals:

### Client-dependency blockers
- [ ] Domain confirmed by Zak
- [ ] Corporate address (street, city, region, postal, country)
- [ ] Phone number + IT specialist contact
- [ ] Corporate email
- [ ] Jurisdiction resolution (Canada vs. Panama — affects `<html lang>`, locale, postal format, hreflang)
- [ ] Leadership roster + photos
- [ ] Operating brand external sites for `rel="me"` outbound links from each subsidiary page

### Founder-approval gates (Section 3.9)
- [ ] Nathan Levinson biography + photo + Person schema
- [ ] Nathan Levinson Charity Foundation portfolio detail page

### Legal-counsel gates
- [ ] Privacy Policy, Terms of Use, footer disclaimer language sign-off

### Design assets pending designer pass
- [ ] Real Logo SVG (currently a CSS-built monogram + wordmark)
- [ ] Favicon set (16/32/48 .ico + 180 apple-touch + 192/512 android + 512 maskable)
- [ ] Open Graph image 1200×630
- [ ] Real photography to commission — Unsplash imagery is high-quality placeholder only and should be replaced with brand-shot photography over time (especially for hero on Home, About, Contact)
- [ ] Real testimonials, case studies, press citations (homepage Press section is currently "Forthcoming" placeholders)

### Backend gates
- [ ] Contact form submission endpoint (still `console.log` only)
- [ ] Map embed on Contact page (currently shows aerial-city Unsplash with overlay text "Map embed pending address")
- [ ] GA4 / GTM / Search Console / Bing Webmaster verification (centralized to tech@revun.com)

---

## Build verification

- `npm run build` — succeeds, 30 static routes generated
- `out/` directory — 116 KB index.html (was ~5 KB before)
- All routes present in `out/`: about, blog, careers, contact, insights, leadership, locations (+ 6 cities), portfolio (+ 8 subsidiaries), positions, privacy, terms, sitemap.xml
- No TypeScript errors. Webpack cache warnings (unrelated; macOS filesystem snapshot quirk during `npm install`) are non-blocking.

---

## Deployment

```bash
vercel deploy --prod --yes
```

- Production URL: https://rothenbury-group.vercel.app
- Deployment ID: `dpl_C5yc2o3TfjveLXVX4CE3QMwqoGhV`
- Build time: 24s on Vercel
- Total deploy time including upload + alias: 45s
