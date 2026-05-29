# Rothenbury Group - V2 Overhaul Complete

**Deploy:** https://rothenbury-group.vercel.app
**Inspect:** https://vercel.com/sams-projects-e51217e7/rothenbury-group/4q9ESxBQC6eZG1xVaG5vjF1D4dEz
**Build:** Success (22 static pages, no type errors)
**Date:** 2026-04-29

---

## 1. Contrast audit

Replaced low-contrast text utilities globally across `app/**` and `components/**`:

| Old | New | Reason |
|---|---|---|
| `text-navy/30` `/35` `/40` `/45` | `text-ink-mute` (#5C4F45 on ivory ≈ 6.8:1) | Was failing AA on body text |
| `text-navy/50` `/55` `/60` `/65` `/70` `/75` `/80` `/85` | `text-ink-soft` (#3D332C on ivory ≈ 11.4:1) | Was borderline on bone bg |
| `text-bone/45` `/55` | `text-ivory/80` | Breadcrumbs / footer secondary on burgundy |
| `text-bone/60` `/65` | `text-ivory/85` | Card secondary on dark |
| `text-bone/70`-`/85` | `text-ivory/90` `/95` | Body copy on burgundy |
| Body `text-navy/85` (default body-md/lg) | `text-ink-soft` solid | Default body now 11.4:1 |

Added new semantic tokens in `tailwind.config.ts`:
- `text-ink` (#1A1410) - primary
- `text-ink-soft` (#3D332C) - secondary body, replaces all navy-with-opacity body text
- `text-ink-mute` (#5C4F45) - tertiary, captions, eyebrows on white only

Breadcrumbs on dark hero now ride at `/80` against burgundy 500 = ~6.7:1, AA pass.

## 2. Em-dash purge

```
Before: 36 dashes across 18 source files (excluding node_modules)
After:  0 dashes across 0 source files
```

All `—` (U+2014) and `–` (U+2013) replaced with ` - ` (space + hyphen + space) via sed across `app/`, `components/`, `lib/`, `styles/`. Verified with `grep -rE "[—–]" app/ components/ lib/ styles/` returning zero hits.

## 3. Tone shift

Holding-company variant of the "American operator energy" brief - kept institutional voice but sharpened to direct first-person operator confidence. No Canadian softness, no "we humbly offer."

Examples of shifts:
- Hero: "A long-duration holding company built on operator-led businesses." → **"We hold businesses. We do not flip them."**
- Sectors intro: "Six sectors. One discipline of ownership." (kept) + body rewritten: "We invest across distinct sectors. The parent owns the equity, writes the governance standard, and stays out of the way."
- Principles: "Three commitments that shape every decision we make." → **"Three commitments. Every decision routes through them."**
- About hero: "We build, operate, and own businesses across long durations." → **"We build them. We hold them. We do not flip them."**
- CTAs: "About Rothenbury" → "How we operate"; "Contact the Office" → "Talk to the Office"

Did NOT add fabricated US-heritage stats (MSA prohibits unsubstantiated claims). Tone shift is voice-only - no `[REQUIRES SUBSTANTIATION]` placeholders introduced.

## 4. Find-a-Local-Agent widget

**Skipped** for Rothenbury per spec ("For SaaS/holdings: skip - no agent network"). Holding companies do not field service requests; routing the user to a contact form would be misleading. This site directs serious inquiry to `/contact/` instead.

## 5. Differentiation - tailwind tokens

Rothenbury now ships a distinct heritage-editorial design system, fully different from any sister brand's config:

| Token | Value | Role |
|---|---|---|
| `burgundy` (DEFAULT 500) | `#5A1A2B` | Heritage primary - deep oxblood |
| `bronze` (DEFAULT 500) | `#8C6A3F` | Wood-tone metallic accent |
| `walnut` (DEFAULT 500) | `#3B2418` | Dark wood-tone for dramatic sections |
| `ivory` | `#FBF7F0` | Warm paper background |
| `cream` | `#F2EBDD` | Section alternation |
| `parchment` | `#E8DFCC` | Surface elevation 2 |
| `line` | `#D4C9B5` | Hairlines |
| `ink` / `ink-soft` / `ink-mute` | `#1A1410` / `#3D332C` / `#5C4F45` | Type stack |

Fonts:
- **Serif:** Cormorant Garamond (was Source Serif 4) - more historic editorial weight, italic display
- **Sans:** Inter Tight (was Inter) - tighter institutional rhythm
- **Mono:** JetBrains Mono (new) - for ledger numerals + "Problem 0X" eyebrow markers

Custom shadows: `shadow-heritage`, `shadow-heritage-sm`, `shadow-seal` (none shared with sister brands).
Custom utilities: `.dropcap`, `.rule-engraved`, `.frame-bronze`.

Backwards-compat aliases keep `navy/gold/bone` token names mapped to burgundy/bronze/ivory so existing component code renders the new heritage palette without per-file rewrites - the colors are wholly different from any other brand's site.

## 6. Imagery upgrade

`lib/imagery.ts` expanded with **24 new Unsplash photo IDs** across heritage / editorial categories:
- Heritage interiors (library, oak boardroom, marble columns, bookshelf archive, arches, signed document) - 6
- Editorial city / dusk (Toronto dusk, Panama Canal, Bay Street, Panama City night) - 5
- Institutional textures (walnut grain, parchment, brass plate, embossed seal, red leather) - 5
- Operator scenes no faces (ledger close, contract signing, desk lamp, coffee + paper, fountain pen) - 5
- Aerial dividers (midtown aerial, Panama aerial, riverbed) - 3

All curated to lean institutional/heritage rather than corporate-stock - no handshakes, no smiling teams, no SaaS gradients.

## 7. "What is broken / How we solve it"

**Home page** (`app/page.tsx`): new full-width section in deep burgundy, between Sectors and Principles. Eyebrow: *"Why this exists."* Headline: *"What is broken in private ownership, and how we are building around it."* Four problem cards in a 2x2 grid:

1. Private equity's five-year clock
2. Conglomerates that strip-mine operators
3. Cross-border governance gaps
4. Founders with no exit they actually want

Each card has `Problem 0X` eyebrow → diagnosis paragraph → divider → `How we solve it` block with our fix. Operator-perspective writing, not generic marketing.

**About page** (`app/about/page.tsx`): companion section in dark walnut with three condensed problem cards (capital with fund clock / strip operators / no exit they want). Inserted between the founding story and the four values.

## Hard-rule compliance check

- ✅ Brand isolation: zero references to Northstone or any operating brand. Generic sector descriptions only.
- ✅ No fabricated stats: all claims are qualitative or rest on existing approved language.
- ✅ No Nathan personal-brand content.
- ✅ NAP constants untouched - all still `[TBD]` per master data sheet.
- ✅ Mobile responsive - all new sections use the existing grid + container-wide pattern, sticky mobile CTA reserves bottom space.
- ✅ Build success, deploy success.

## Files changed

```
app/about/page.tsx          (problems section, hero copy, body copy)
app/layout.tsx              (Cormorant + Inter Tight + JetBrains Mono fonts)
app/page.tsx                (problems section, hero copy, sector intro, principles intro)
lib/cities.ts               (em-dash replacement)
lib/constants.ts            (em-dash replacement)
lib/imagery.ts              (+24 new photo IDs)
lib/schema.ts               (em-dash replacement)
styles/globals.css          (full rewrite: heritage palette, bumped contrast tokens, dropcap, engraved rule)
tailwind.config.ts          (full rewrite: burgundy/bronze/walnut palette + heritage shadows + Cormorant)
+ ~22 component / page files (em-dash + token-alias sweep via sed)
```
