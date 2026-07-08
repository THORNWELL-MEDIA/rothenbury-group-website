# Rothenbury Group — Corporate Website

Static-export Next.js 14 (App Router) + Tailwind CSS site for Rothenbury Group, the top-level parent holding company under the April 20, 2026 Master Marketing Services Agreement.

## Status

**This is a launch-ready scaffold, not a launch-ready site.** Every TBD field listed below must be filled in before the site is published.

Source-of-truth files:

- `lib/constants.ts` — NAP, brand strings, social handles, footer legal copy
- `lib/services.ts` — portfolio (subsidiaries) data
- `lib/cities.ts` — location pages
- `lib/schema.ts` — JSON-LD generators

## Pre-launch TBD checklist

These fields render as visible placeholders today and must be confirmed before launch:

- [ ] **Domain** (Zak) — currently hardcoded as `rothenburygroup.com` in canonical URLs / schema; replace if final domain differs
- [ ] **Corporate address** (Zak) — `lib/constants.ts` → `NAP.street`, `NAP.city`, `NAP.region`, `NAP.postalCode`, `NAP.country`
- [ ] **Phone number** (Zak + IT specialist per MSA Section 2.8(d)) — `NAP.phoneE164`, `NAP.phoneDisplay`
- [ ] **Corporate email** — `NAP.email`
- [ ] **Time zone / hours confirmation** — `lib/constants.ts` → `HOURS`
- [ ] **Jurisdiction** (Canada vs. Panama) — affects `<html lang>`, schema `addressCountry`, locale strings, hreflang
- [ ] **Leadership roster + photos** (Zak/Nathan) — `app/leadership/page.tsx`
- [ ] **Nathan Levinson biography + Person schema** (Founder approval per MSA Section 3.9) — `app/leadership/page.tsx`
- [ ] **Nathan Levinson Charity Foundation portfolio page** (Founder approval) — currently rendered as placeholder via `requiresFounderApproval` flag in `lib/services.ts`
- [ ] **Operating brand external sites** — `lib/services.ts` → `externalSite` field on each subsidiary (used for `rel="me"` cross-links)
- [ ] **Privacy Policy + Terms of Use** (legal counsel) — `app/privacy/page.tsx`, `app/terms/page.tsx` carry `[REQUIRES LEGAL REVIEW]` markers
- [ ] **Favicon set** — replace placeholder; need monogram-R favicon at 16/32/48 .ico, 180×180 apple-touch-icon, 192/512 android-chrome, 512 maskable
- [ ] **Open Graph image** — 1200×630 OG card not yet provisioned
- [ ] **Contact form backend** — `components/ContactForm.tsx` currently logs submissions to the console; wire to client-approved email/CRM endpoint before launch
- [ ] **Map embed** on `/contact/` — placeholder div until address is confirmed
- [ ] **Insights/blog content** — `/insights/` is a placeholder
- [ ] **Live JobPosting structured data** — `/positions/` lists open application tracks; switch to per-role JobPosting schema as roles are confirmed

## Local development

```bash
cd website
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build / static export

```bash
npm run build
```

This produces a static export in `./out/` (next.config.mjs sets `output: "export"`).

## Deployment

### Vercel

```bash
cd website
vercel deploy
```

Vercel auto-detects Next.js. Static export works out of the box.

### Netlify

```bash
cd website
npm run build
# Then upload ./out/ via the Netlify UI, or:
netlify deploy --dir=out --prod
```

### Any static host (Cloudflare Pages, S3 + CloudFront, GitHub Pages, etc.)

Run `npm run build` and deploy the `./out/` directory.

## Site map

```
/
/about/
/leadership/
/portfolio/
/portfolio/[slug]/        (8 subsidiary pages — 7 visible, 1 placeholder pending Founder approval)
/locations/
/locations/[city]/        (6 city pages: Toronto, Ottawa, Mississauga, Hamilton, Brampton, Panama City)
/careers/
/positions/
/insights/
/blog/                    (redirect-style page → /insights/)
/contact/
/privacy/
/terms/
/sitemap.xml
/robots.txt
```

## Brand-book notes

- **"Services" framing is prohibited** at the parent level per the brand book. The route is `/portfolio/`, not `/services/`. This is a deliberate deviation from the generic build template, mandated by `brand-book-skeleton.md` element (xv).
- **Tone:** institutional, minimal, authoritative — Onex / Brookfield adjacent, never consumer-retail.
- **CTAs:** "Contact Rothenbury Group", "Request Information", "Review Our Portfolio". Prohibited: "Buy now", "Sign up free", "Get a quote".

## MSA compliance posture

- No fabricated claims (Section 11.2(f)). The site contains no fake testimonials, no fabricated case studies, no unverified statistics.
- All Founder-adjacent assets are gated behind a `requiresFounderApproval` flag and render as placeholders until written approval is on file (Section 3.9 / Section 11.8).
- Privacy and Terms carry `[REQUIRES LEGAL REVIEW]` markers; do not publish without client legal counsel sign-off.
- Site self-identifies as a holding-company corporate site; legal disclaimer in footer makes the no-offer / no-solicitation status explicit.
