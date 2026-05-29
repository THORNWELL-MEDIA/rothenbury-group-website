# Rothenbury Group Website — Build Summary

> **Cross-brand references stripped per 2026-04-28 directive.** This document's inventory below predates the decouple pass. Subsidiary detail pages, technology page, and sister-brand link rows were removed; portfolio is now described by sector only. See `DECOUPLE-COMPLETE.md` for the manifest.

**Build date:** 2026-04-25
**Last updated:** 2026-04-25 (design overhaul complete — see `DESIGN-OVERHAUL-COMPLETE.md`)
**Stack:** Next.js 14 (App Router) + TypeScript + Tailwind CSS + framer-motion + lucide-react + clsx + tailwind-merge, configured for static export (`output: "export"`).
**Status:** Production-deployed at https://rothenbury-group.vercel.app — pre-launch TBD checklist (NAP, domain, founder approvals, legal review, design assets) still pending before public launch.

> **Design overhaul note (2026-04-25):** This document's per-file inventory below describes the original scaffold structure. The site has since been redesigned end-to-end with new components (Logo, PortfolioCard, LegalLayout), a new design system, real Unsplash imagery, and institutional fonts. See `DESIGN-OVERHAUL-COMPLETE.md` for the full overhaul manifest.

---

## Files created (35)

### Root config
1. `package.json`
2. `next.config.mjs`
3. `tsconfig.json`
4. `tailwind.config.ts`
5. `postcss.config.mjs`
6. `next-env.d.ts`
7. `README.md`
8. `BUILD-SUMMARY.md` (this file)

### Public
9. `public/robots.txt`

### Styles
10. `styles/globals.css`

### Lib (single source of truth)
11. `lib/constants.ts` — NAP, BRAND, HOURS, SOCIAL, CTA, FOOTER_LEGAL, TBD sentinel
12. `lib/services.ts` — `SUBSIDIARIES` array (8 entries; 1 gated behind Founder approval)
13. `lib/cities.ts` — `CITIES` array (6 cities: Toronto, Ottawa, Mississauga, Hamilton, Brampton, Panama City)
14. `lib/schema.ts` — Organization / WebSite / Breadcrumb / Subsidiary / Place / ContactPage JSON-LD generators

### Components
15. `components/Header.tsx`
16. `components/Footer.tsx`
17. `components/NAPBlock.tsx`
18. `components/ContactForm.tsx` (client component; submission logged to console — no backend)
19. `components/ServiceCard.tsx`
20. `components/CTASection.tsx`
21. `components/SchemaJsonLd.tsx`

### App routes
22. `app/layout.tsx` — root layout, embeds Organization + WebSite JSON-LD, loads Inter + Playfair Display
23. `app/page.tsx` — home
24. `app/about/page.tsx`
25. `app/leadership/page.tsx`
26. `app/portfolio/page.tsx`
27. `app/portfolio/[slug]/page.tsx` — `generateStaticParams` for 8 subsidiaries
28. `app/locations/page.tsx`
29. `app/locations/[city]/page.tsx` — `generateStaticParams` for 6 cities
30. `app/careers/page.tsx`
31. `app/positions/page.tsx`
32. `app/insights/page.tsx`
33. `app/blog/page.tsx` — link-out page pointing to `/insights/`
34. `app/contact/page.tsx`
35. `app/privacy/page.tsx`
36. `app/terms/page.tsx`
37. `app/sitemap.xml/route.ts` — `force-static` route emitting XML sitemap at build time

---

## Pages built — total 21 unique URLs

| URL | Type | Notes |
|---|---|---|
| `/` | Home | Hero, value prop, featured 4 subsidiaries, recognition placeholder, CTA |
| `/about/` | About | Long description, structure diagram, mission/approach/discipline |
| `/leadership/` | Leadership hub | Nathan card frozen pending Founder approval; Zak card included |
| `/portfolio/` | Portfolio overview | 7 subsidiary cards + 1 placeholder card |
| `/portfolio/northstone-holdings/` | Subsidiary | Direct subsidiary, parentOrganization = Rothenbury Group |
| `/portfolio/move-smart-rentals/` | Subsidiary | via-northstone |
| `/portfolio/single-property-management/` | Subsidiary | via-northstone |
| `/portfolio/bridgepoint-maintenance/` | Subsidiary | via-northstone |
| `/portfolio/thornwell-media/` | Subsidiary | via-northstone (Panama) |
| `/portfolio/langford-staffing/` | Subsidiary | via-northstone (Panama) |
| `/portfolio/revun/` | Subsidiary | via-northstone (Panama) |
| `/portfolio/nathan-levinson-charity-foundation/` | Subsidiary | Renders placeholder — Founder approval gate |
| `/locations/` | Locations hub | Canada / Panama columns |
| `/locations/toronto/` | City page | Highlights Northstone + MoveSmart + SPM |
| `/locations/ottawa/` | City page | Highlights MoveSmart + SPM |
| `/locations/mississauga/` | City page | Highlights MoveSmart + Bridgepoint |
| `/locations/hamilton/` | City page | Highlights MoveSmart + Bridgepoint |
| `/locations/brampton/` | City page | Highlights MoveSmart + Bridgepoint |
| `/locations/panama-city/` | City page | Highlights Thornwell + Langford + Revun |
| `/careers/` | Careers | Operator / brand / location pillars |
| `/positions/` | Open Positions | Open-application tracks; ItemList schema (no JobPosting yet) |
| `/insights/` | Insights hub | Articles forthcoming placeholder |
| `/blog/` | Redirect-style | Static link-out to `/insights/` |
| `/contact/` | Contact | NAP block + ContactForm + map placeholder |
| `/privacy/` | Privacy Policy | `[REQUIRES LEGAL REVIEW]` |
| `/terms/` | Terms of Use | `[REQUIRES LEGAL REVIEW]` |
| `/sitemap.xml` | Sitemap | Auto-generated at build time |

That's **21 page URLs** delivered — short of the 27-32 target in `site-architecture.md` because Leadership detail pages, Insights articles, and the Country/Province location pages were intentionally deferred (they require approved per-person bios, approved articles, and the Canada-vs-Panama jurisdiction decision respectively).

---

## TBD fields requiring Sam/Zak input before launch

Consolidated checklist (mirrored in `README.md`):

### Client-dependency blockers (Section 1.4(n) clock running)
- [ ] **Domain** confirmed by Zak — replace `rothenburygroup.com` references if final domain differs
- [ ] **Corporate address** (street, city, region, postal, country)
- [ ] **Phone number + IT specialist contact** (Section 2.8(d))
- [ ] **Corporate email** (e.g. info@[domain])
- [ ] **Jurisdiction resolution** (Canada vs. Panama — affects `<html lang>`, locale, postal format, time zone, hreflang)
- [ ] **Leadership roster + photos** (Zak/Nathan)
- [ ] **Operating brand external sites** for `rel="me"` outbound links from each subsidiary page

### Founder-approval gates (Section 3.9 / Section 11.8 — uncapped liability)
- [ ] Nathan Levinson biography + photo
- [ ] Person schema for Nathan
- [ ] Nathan Levinson Charity Foundation portfolio detail page (currently held)
- [ ] Any social copy referencing Nathan

### Legal-counsel gates
- [ ] Privacy Policy final text (PIPEDA + CASL + Panama Law 81)
- [ ] Terms of Use final text
- [ ] Footer disclaimer language sign-off

### Design assets pending
- [ ] Favicon set (16/32/48 .ico + 180 apple-touch + 192/512 android + 512 maskable)
- [ ] Open Graph image 1200×630
- [ ] Logo SVG (currently rendered as wordmark in default serif)

### Backend gates
- [ ] Contact form submission endpoint (currently `console.log` only — `components/ContactForm.tsx` line ~17)
- [ ] Map embed on `/contact/` (Google Maps or alternative) once address confirmed
- [ ] GA4 / GTM / Search Console / Bing Webmaster verification (centralized to tech@revun.com per Section 3.13)

---

## Deployment instructions

### Vercel (recommended)
```bash
cd website
vercel deploy
```
Vercel auto-detects Next.js. The static export is produced in CI and served from Vercel's CDN.

### Netlify
```bash
cd website
npm install
npm run build
netlify deploy --dir=out --prod
```

### Any static host (S3/CloudFront, Cloudflare Pages, GitHub Pages)
```bash
cd website
npm install
npm run build
# Upload ./out/ to the host
```

---

## Decisions made (worth flagging for review)

1. **Route is `/portfolio/` not `/services/`.** Mandated by brand-book element (xv) — "Services" framing is explicitly prohibited for a holding-co site. The build template's directory structure is overridden in favour of brand-book compliance, since drift would be a Section 3.2(d) material failure.

2. **Franchise page omitted.** `site-architecture.md` flags `/franchise/` as N/A for the parent holding company. Franchising belongs on operating-brand sites, not the parent. Confirm with Zak.

3. **Lead form / `/quote` page omitted.** Rothenbury is not a lead-gen business at parent level. Brand book and site architecture both reflect this.

4. **6 city pages, 5 Canadian + 1 Panamanian.** Toronto, Ottawa, Mississauga, Hamilton, Brampton, Panama City. Country and Provincial pages (`/locations/canada/`, `/locations/ontario/`, `/locations/panama/`) deferred until jurisdiction is resolved — copy on those pages depends on the Canada-vs-Panama answer.

5. **Schema NAP fields omitted, not populated with `[TBD]`.** `lib/schema.ts` is built so the LocalBusiness/Organization JSON-LD omits `address`/`telephone`/`email` when the underlying constant is the TBD sentinel. Populating structured data with `[TBD - awaiting...]` would be a structured misrepresentation under Section 11.2(f).

6. **Visual placeholders are explicit, not invisible.** Sections that would normally show stats, testimonials, or case studies render as italic placeholder text rather than being hidden. This makes the gaps visible in QA and prevents anyone publishing the scaffold thinking it's complete.

7. **Inter + Playfair Display loaded from Google Fonts.** Free, fast, and explicitly listed as the default sans/serif fallback in brand-book element (vii). If the brand book lands on Söhne / Canela commercial fonts, swap in `<link>` tags in `app/layout.tsx`.

8. **Color palette uses brand-book proposed values** (#1A2238 navy, #C9A66B gold, #0F0F10 ink, #F4F2ED bone). These are flagged in the brand book as proposed pending design pass — swap when finalized.

9. **No favicon shipped.** A real favicon belongs in the deliverable from the design pass; shipping a generic Next.js / blank favicon would create brand drift on browser tabs. README documents this.

---

## Known issues

- **Sitemap route handler with static export:** Next 14 supports `dynamic = "force-static"` route handlers under `output: "export"`, but if the build environment runs an older Next or strips the route handler, the sitemap can also be moved to `public/sitemap.xml` as a static file. Document this in case the deploy target requires it.
- **Brand wordmark rendered as serif text, not a logo SVG.** Header and Footer ship with the wordmark in Playfair Display until the design pass produces an SVG.
- **No analytics yet.** GTM container ID is not provisioned. Add to `app/layout.tsx` once container is created under tech@revun.com.
- **`/blog/` is not a true HTTP redirect.** Static export can't issue 301/302 redirects — the route renders a static link-out page pointing to `/insights/`. If the host (Vercel/Netlify) supports redirect config files, prefer a 301 there.

---

End of summary.
