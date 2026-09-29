# GREEDYCART — MASTER REMEDIATION PROMPT FOR AUTONOMOUS CODING AGENTS

> Audience: an autonomous coding LLM/agent (Antigravity, Cursor, Claude Code, Devin, Copilot Agent, etc.)
> Target: the Next.js app deployed at https://greedycart.vercel.app
> Probable source repo: https://github.com/sumanjha8078-max/E-Commerce (branch `main`) — see "Provenance" below.
> Audit date: 30 September 2026.

---

## 0. YOUR ROLE AND OPERATING RULES

You are a senior full-stack engineer (Next.js App Router, TypeScript, Tailwind CSS v4, Zustand,
Framer Motion, Prisma) with strong SEO, accessibility, performance and product-integrity instincts.
You have been handed an audit of a live price-comparison ("price aggregator") website for the Indian
market called **GreedyCart**. Your job is to fix every issue in this document, in the priority order
given in Section 5, and to prove each fix.

Operating rules (read carefully, they are binding):

1. **Read before you write.** Open the repo, read `AGENTS.md`, `CLAUDE.md`, `README.md`,
   `GREEDYCART_ROADMAP.md`, `package.json`, `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`,
   `components.json`, everything under `src/`, `prisma/`, `public/`, and `scratch/` BEFORE editing.
   Note: `AGENTS.md`/`CLAUDE.md` may say the installed Next.js version has breaking changes versus
   your training data. Consult the docs bundled in `node_modules/next/dist/docs/` (if present) or the
   official Next.js docs for the INSTALLED version before using any API.
2. **Verify every claim in this audit against the code.** The audit was produced by crawling the live
   site's rendered output (text/markdown extraction) — NOT by running a browser, DevTools, Lighthouse
   or reading the source. Items are tagged with a confidence level (Section 1.3). For anything tagged
   `LIKELY` or `VERIFY`, confirm in code first. If the audit is wrong, say so in your final report
   and skip the change. Do not "fix" things that are not broken.
3. **Do not fabricate data or capabilities.** GreedyCart currently uses a deterministic MOCK engine
   (per README) but the UI claims real-time scanning. Never invent "real" prices, store logos you do
   not have rights to, reviews, or claims. Where data is simulated, the UI must say so (Issue A1).
4. **Small, reviewable commits.** One logical fix per commit, Conventional Commits style
   (`fix(seo): ...`, `feat(a11y): ...`, `chore(repo): ...`). Reference the issue ID (e.g. `[C1]`).
5. **Never break the build.** After each group of changes run: `npm run lint`, `npx tsc --noEmit`,
   `npm run build`. Fix all errors and warnings you introduce. If a script does not exist, add it.
6. **Do not add heavy dependencies without justification.** Prefer built-in Next.js features
   (`metadata`, `next/image`, `next/font`, `not-found.tsx`, `sitemap.ts`, `robots.ts`, `opengraph-image`).
7. **Do not commit secrets.** Use environment variables and `.env.example`. Never print secrets.
8. **Preserve the brand feel** (bold, deal-hunting, red accent for "cheapest") while fixing quality.
9. **Ask nothing, decide and document.** If a decision is ambiguous, choose the most conservative
   option, record it in `docs/DECISIONS.md`, and continue.
10. **Finish with the report format in Section 8.**

---

## 1. PROVENANCE, SCOPE AND CONFIDENCE LEGEND

### 1.1 What was actually crawled

| URL | Result |
|---|---|
| `https://greedycart.vercel.app/` | 200 OK. Full homepage content extracted. |
| `https://greedycart.vercel.app/about` | 200 OK. Renders a header and ONE sentence of content. |
| `https://greedycart.vercel.app/contact` | **404** (linked from the footer). |
| `https://greedycart.vercel.app/blog` | **404** (linked from the footer). |
| `/robots.txt`, `/sitemap.xml`, `/api/search`, `/favicon.ico` | NOT checked (tooling could only open URLs already discovered). Treat as `VERIFY`. |
| GitHub repo `sumanjha8078-max/E-Commerce` README + roadmap | Read. Describes the same product and stack. |

### 1.2 Provenance caveat (important)

The repo README links to a DIFFERENT deployment: `https://e-commerce-lac-sigma-69.vercel.app`.
The audited site is `https://greedycart.vercel.app`. The repo describes the same product (Next.js
price aggregator, "GreedyScore", mock engine) so it is very probably the source, but this was not
proven. Step 0 of your work is to confirm which repo/branch/Vercel project feeds
`greedycart.vercel.app` (check `package.json` name, `vercel.json`, `.vercel/`, and the homepage
strings "Fine Smile", "The Coding Journey", "Air Solo Bass" in `src/`). If two Vercel deployments
serve the same code, decide which is canonical and add the redirect/canonical rules in Issue H6.

### 1.3 Confidence legend used on every issue

- `CONFIRMED` — directly observed in the live rendered output.
- `LIKELY` — strongly implied by the rendered output or README, but source not inspected.
- `VERIFY` — a standard best-practice check the crawl could not perform; inspect the code/config.

### 1.4 Severity legend

- `P0` — Misleading/legally risky content, broken core function, or data-integrity problem. Fix first.
- `P1` — Major UX, SEO, accessibility or reliability defect.
- `P2` — Moderate quality issue.
- `P3` — Polish / hygiene.

### 1.5 Product understanding (so your fixes stay on-concept)

GreedyCart is NOT a storefront. It is a price aggregator: users search a product, see offers from
Amazon India, Flipkart, Myntra, JioMart, Tata CLiQ side-by-side, see the lowest price and the size
of the drop, get a "GreedyScore" (out of 10), save items to a Watchlist (replacing a cart), and click
out to the vendor to buy. The intended tech stack: Next.js (App Router), Tailwind v4, Framer Motion,
Zustand with localStorage persistence, React Icons + Lucide, a `/api/search` mock engine that hashes
the query to produce deterministic fake prices, Prisma + PostgreSQL planned for price history.

---

## 2. EXECUTIVE SUMMARY OF FINDINGS

The site looks like a polished template whose homepage is filled with duplicated, mock and
placeholder content. The five most damaging problems are:

1. **Trust/integrity:** The site advertises "We scan prices every minute", "Real-Time Tracking",
   "Our AI rates the quality of the deal" while the README says prices come from a hash-based mock.
   There is no disclosure that prices are simulated (A1, A2, A3).
2. **The same 14 products are rendered four times** under four different headings, including
   "Fashion & Apparel" and "Home & Kitchen Appliances" sections that show iPhones and headphones (C1).
3. **Most call-to-action elements are not links.** "Track Price", "Compare Prices", "View Offers",
   "Find Deals", "Help Center", "Track Alerts" either lead nowhere or back to `/` (B1–B4).
4. **Placeholder/template content is live:** Lorem ipsum (twice), "Fine Smile", "10 Jan to 28 Jan",
   "Winter Sale", "Made with 💖 by The Coding Journey" (E1–E5).
5. **Footer links 404** (`/contact`, `/blog`) and `/about` is a one-line stub (B5, B6).

Secondary clusters: SEO (single global metadata, missing OG image, wrong `og:url` on subpages,
title mismatch, no structured data), accessibility (multiple `<h1>`, heading-level skips, weak alt
text, concatenated price strings), performance (56 product cards for 14 products, raw hotlinked
Unsplash images), legal/compliance (no affiliate disclosure, no privacy policy/terms, US Amazon
domain for an India product), and repo hygiene (agent skill folders, `scratch/`, unused `prisma/`).

---

## 3. GLOBAL ENGINEERING REQUIREMENTS

### 3.1 Definition of done for EVERY issue
- The defect is reproducible before the fix and no longer reproducible after (write down both).
- Types are strict: no new `any`, no `// @ts-ignore` without a comment justifying it.
- ESLint passes with zero errors; introduce no new warnings.
- The change works at 360px, 768px, 1280px and 1920px widths.
- The change works with JavaScript disabled where it concerns content (SSR/SSG output must contain
  the meaningful content — this is a Next.js app, use Server Components by default).
- A test or a documented manual check exists (Section 7).

### 3.2 Coding conventions to follow
- App Router, Server Components by default. Add `"use client"` only for interactive leaves
  (carousel, watchlist heart, modal, newsletter form).
- All data shapes live in `src/types/index.ts` (`Product`, `VendorOffer`). Extend, do not fork.
- All money is stored as integer paise or integer rupees (never floats) and formatted through ONE
  helper `formatINR()` using `Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 })`.
- Category names come from ONE enum/const (`src/lib/categories.ts`). No free-text category strings.
- Vendor names/logos/colours come from ONE registry (`src/lib/vendors.ts`).
- No inline magic numbers for score thresholds; put them in `src/lib/score.ts`.
- Use `next/image` for every raster image; use `next/font` for fonts.
- Use semantic HTML first (`<header>`, `<nav>`, `<main>`, `<section aria-labelledby>`, `<footer>`,
  `<ul>/<li>`, `<a>`, `<button>`), ARIA only where semantics are insufficient.

### 3.3 Suggested new/changed files (create if missing; adapt names to the repo)
```
src/lib/categories.ts        // Category enum + labels + slugs + icons
src/lib/vendors.ts           // Vendor registry: id, label, brand colour, domain, affiliate builder
src/lib/format.ts            // formatINR, formatPercent, formatDate (en-IN)
src/lib/score.ts             // GreedyScore calculation + labels + colour bands
src/lib/site.ts              // SITE_URL, SITE_NAME, DEFAULT_OG, social handles
src/lib/deals.ts             // data access for homepage sections (server-side)
src/lib/seo.ts               // helpers: buildMetadata(), productJsonLd(), breadcrumbJsonLd()
src/components/PriceTag.tsx  // accessible price + strikethrough + % off
src/components/ProductCard.tsx
src/components/ProductGrid.tsx
src/components/Section.tsx   // <section aria-labelledby> wrapper
src/components/Carousel.tsx  // accessible hero carousel
src/components/NewsletterForm.tsx
src/components/DemoDataBadge.tsx
src/app/not-found.tsx
src/app/error.tsx
src/app/loading.tsx
src/app/sitemap.ts
src/app/robots.ts
src/app/opengraph-image.tsx
src/app/(pages)/about/page.tsx
src/app/(pages)/contact/page.tsx
src/app/(pages)/blog/page.tsx
src/app/(pages)/privacy/page.tsx
src/app/(pages)/terms/page.tsx
src/app/(pages)/affiliate-disclosure/page.tsx
src/app/category/[slug]/page.tsx
src/app/search/page.tsx
src/app/product/[id]/page.tsx
docs/DECISIONS.md
.env.example
```

---

## 4. THE ISSUE CATALOGUE

Format of each issue:
`ID — Title` / Severity / Confidence / Evidence / Required fix / Acceptance criteria.

=====================================================================
### GROUP A — TRUST, CLAIMS AND CONTENT INTEGRITY
=====================================================================

#### A1 — Site presents simulated prices as real, live prices
- **Severity:** P0 · **Confidence:** CONFIRMED (claims) + LIKELY (mock, per README)
- **Evidence:** Homepage tells visitors "We scan Amazon, Flipkart, Myntra, and more to find the deepest
  live discounts" (meta description), "Real-Time Tracking — We scan prices every minute.",
  "Lowest price found on: Amazon". The README states prices come from a "Deterministic Mock Engine"
  that hashes the query and fabricates prices; Phase 4 (real scraping/API) is unchecked.
- **Why it matters:** Showing invented prices as "lowest price found" is misleading to consumers and
  can damage the brand and create legal exposure under consumer-protection and advertising rules.
- **Required fix:**
  1. Add a global `IS_DEMO_DATA` flag driven by env `NEXT_PUBLIC_DATA_MODE=demo|live` (default `demo`
     until a real provider is wired).
  2. When `demo`: render a persistent, visible `<DemoDataBadge />` in the header/hero ("Demo data —
     prices are illustrative, not live") and on every product card/modal ("Sample price"). Add
     `aria-label`s. Add an FAQ entry explaining this.
  3. When `demo`: rewrite all "live/real-time/every minute/AI" copy to truthful wording (see A2, A3).
  4. When `live`: show a per-offer "Last checked: <relative time>" using a real timestamp, and hide
     the demo badge.
  5. Add `<meta name="robots" content="noindex">` for product/search pages while in `demo` mode so
     fabricated prices are not indexed by search engines (see H10).
- **Acceptance:** With default env, a first-time visitor sees a demo notice above the fold on `/`;
  no copy claims real-time scanning; product cards show a "Sample price" indicator; toggling the env
  to `live` removes them and shows a real "last checked" time (stub acceptable if provider absent).

#### A2 — "We scan prices every minute" / "Real-Time Tracking" is unsubstantiated
- **Severity:** P0 · **Confidence:** CONFIRMED (copy), LIKELY (false)
- **Evidence:** Feature strip: "Real-Time Tracking — We scan prices every minute."
- **Required fix:** Replace with truthful copy driven by `DATA_MODE`. Demo: "Track prices you care
  about (demo mode)". Live: state the REAL refresh interval read from config `PRICE_REFRESH_MINUTES`.
- **Acceptance:** No hard-coded time-interval claim exists in JSX; grep for `every minute` returns 0.

#### A3 — "GreedyScore — Our AI rates the quality of the deal" is unexplained and probably hash-based
- **Severity:** P0 · **Confidence:** CONFIRMED (claim), LIKELY (mock)
- **Evidence:** Scores such as 9.8, 9.5, 8.7, 9.1, 9.9, 8.5, "9" are shown. README says the score
  should derive from "size of the price drop, vendor reliability, and historical pricing data",
  but no price history exists yet (Prisma/DB not integrated).
- **Required fix:**
  1. Implement `computeGreedyScore(product)` in `src/lib/score.ts` as a documented, deterministic
     formula: e.g. `0.6 * discountPctScore + 0.25 * vendorReliabilityScore + 0.15 * priceHistoryScore`,
     each normalised 0–10, clamped, rounded to ONE decimal. If no history, omit that term and
     re-normalise weights.
  2. Remove the words "AI" unless a model is actually used.
  3. Add an info popover/tooltip ("How is this calculated?") linking to a `/methodology` section
     or FAQ describing the formula.
  4. Display the score with one decimal always (`9.0`, not `9`) — see C6.
- **Acceptance:** A unit test proves the score is deterministic, in [0,10], one decimal, and
  monotonic in discount percentage. Copy no longer claims "AI" unless implemented.

#### A4 — Discount / "Price Drop" claims are not shown or verifiable
- **Severity:** P1 · **Confidence:** CONFIRMED
- **Evidence:** Cards show two prices back-to-back ("₹1,48,900₹1,59,900") with no percentage, no
  savings amount, no "was/now" labels, no date of the higher price. Some "Trending Price Drops" are
  tiny (Samsung Galaxy S24 Ultra ₹1,29,999 vs ₹1,34,999 ≈ 3.7% off; Nike Air Jordan 1 Mid
  ₹11,495 vs ₹12,995 ≈ 11.5%).
- **Required fix:** Compute and show `% off` and `You save ₹X`. Only include a product in a
  "Price Drops" list if `discountPct >= MIN_DROP_PCT` (config, default 10). Label the higher price
  "MRP" or "Was" and say what it is (MRP vs previous price). Sort "Trending Price Drops" by
  `discountPct` desc.
- **Acceptance:** Every card renders `-NN%` badge; the Trending list contains only items ≥ threshold,
  sorted by discount; unit tests cover the rounding (e.g. 148900 vs 159900 → 6.9% → "7% off").

#### A5 — Hero and card claims like "Massive Price Drop", "Deal of the Day", "Top Selling" have no backing data
- **Severity:** P2 · **Confidence:** CONFIRMED
- **Evidence:** Hero slide eyebrows: "Top Selling" (MacBook Air M2), "Massive Price Drop" (Sony
  WH-1000XM5), "Deal of the Day" (Virtual Reality — no product named, no price).
- **Required fix:** Drive hero slides from data (`featuredDeals`) with a computed reason
  (`bestDiscount`, `topScore`, `dealOfTheDay`). A slide must reference a real product record with a
  price and link to its product page. Remove the generic "Virtual Reality" slide or bind it to a real
  product.
- **Acceptance:** Every hero slide has: product name, price, % off, working link to `/product/[id]`.

#### A6 — Category tiles labelled "Shop by Top Platforms" are not platforms
- **Severity:** P1 · **Confidence:** CONFIRMED
- **Evidence:** Section heading "Shop by Top Platforms — We index deals from India's biggest giants"
  but the six tiles are: Earphones (Audio Accessories), Smartwatches (Wearables), "Imported via
  Amazon" (Global Gadgets), "Luxury on TataCliq" (Premium Gear), VR Headsets (Next Gen),
  "Lowest Prices / Aggregated" (Home Audio). A mix of product categories and two stores; "Aggregated"
  is meaningless; Flipkart, Myntra, JioMart are absent.
- **Required fix:** Split into two clear sections: (1) "Shop by Category" (Mobiles, Laptops, Audio,
  Wearables, Gaming, Fashion, Home Appliances, Beauty) and (2) "Compare across stores" with the five
  vendor logos from the vendor registry. Each tile is a real link (`/category/[slug]` or
  `/store/[vendor]`). Remove the "Aggregated" tile.
- **Acceptance:** Headings match content; every tile is an `<a>` with a valid href; five vendors shown.

#### A7 — Category taxonomy is inconsistent
- **Severity:** P2 · **Confidence:** CONFIRMED
- **Evidence:** Product categories seen: Mobiles, Audio, Fashion, Electronics, Gaming, Beauty,
  Home Appliances, Laptops. "Samsung Odyssey G9 49\" Curved" (a monitor) is "Electronics" while other
  electronics have their own categories; "Dyson Airwrap Multi-styler" is under "Beauty" while section
  headings say "Top Gadgets & Tech". Section headings use different names than card categories.
- **Required fix:** Central `Category` enum with parent/child (e.g. Electronics > Mobiles, Laptops,
  Audio, Gaming, Monitors, Wearables; Fashion > Footwear, Clothing; Home & Kitchen > Appliances;
  Beauty & Personal Care). Migrate mock data; validate at build time (Zod).
- **Acceptance:** `grep` finds no free-text category strings; a Zod schema rejects unknown categories.

=====================================================================
### GROUP B — BROKEN LINKS, DEAD CTAs AND ROUTING
=====================================================================

#### B1 — Header "Help Center" and "Track Alerts" both link to `/`
- **Severity:** P1 · **Confidence:** CONFIRMED (both hrefs are `https://greedycart.vercel.app/`)
- **Required fix:** Create `/help` (FAQ + contact CTA) and `/alerts` (Watchlist / price alert manager).
  If not ready, REMOVE the links rather than pointing them at the homepage. "Track Alerts" should
  open the Watchlist and show real state (count badge from Zustand).
- **Acceptance:** No header link resolves to `/` unless it is the logo/Home. Both routes render
  meaningful content, have unique `<title>`s and appear in the sitemap.

#### B2 — Hero CTAs ("Track Price", "Compare Prices", "View Offers") are not anchors
- **Severity:** P0 · **Confidence:** CONFIRMED (no href in extracted markup, unlike "Shop Now")
- **Required fix:** Render each as `<Link href="/product/[id]">` styled as a button (or a `<button>`
  wired to the Watchlist for "Track Price", with a visible success state). Do not use `div onClick`.
- **Acceptance:** Keyboard focus + Enter works; middle-click opens a new tab for link CTAs; each
  CTA has an accessible name that includes the product ("Compare prices for Sony WH-1000XM5").

#### B3 — Every product card's "Compare Prices" is not a link
- **Severity:** P0 · **Confidence:** CONFIRMED (no href), README says a Quick View Modal should open
- **Required fix:** Make the whole card a link to `/product/[id]` (stretched-link pattern) AND keep a
  secondary "Quick view" button that opens the modal (intercepting route or client modal). Ensure the
  modal is a proper dialog (focus trap, ESC, return focus, `aria-modal`).
- **Acceptance:** Clicking the image, title or CTA navigates/opens comparison; Lighthouse "links have
  discernible names" passes; the URL is shareable for the product view.

#### B4 — Category tile "Find Deals" buttons are not links
- **Severity:** P1 · **Confidence:** CONFIRMED
- **Required fix:** Convert to `<Link href="/category/earphones">` etc., building the destination
  pages (Issue G1). Pass `?sort=discount` as default.
- **Acceptance:** Each tile navigates to a category listing populated with matching products.

#### B5 — Footer links to `/contact` and `/blog` return 404
- **Severity:** P0 · **Confidence:** CONFIRMED (HTTP 404 on both)
- **Required fix:** Either build the pages or remove the links. Recommended:
  - `/contact`: accessible form (name, email, message, honeypot, server action or API route,
    rate-limited, validated with Zod, success/failure states) + support email + response-time note.
  - `/blog`: an index page. If no content exists, do NOT ship an empty blog; remove the link.
- **Acceptance:** A crawler (e.g. `npx linkinator https://<preview> --recurse`) reports 0 broken
  internal links (Section 7.3).

#### B6 — `/about` is a one-sentence stub with no structure
- **Severity:** P1 · **Confidence:** CONFIRMED
- **Evidence:** The page contains only the H1 "GreedyCart" and one quoted sentence: "To provide great
  user experience and UI to support the customers in choosing anything they like."
- **Required fix:** Write real content: what GreedyCart is, how comparison works, which stores are
  covered, how GreedyScore is computed, data freshness, how the site earns money (affiliate
  disclosure), team/contact. Use H1 → H2 hierarchy. Add breadcrumb. Unique `<title>`/description.
- **Acceptance:** ≥ 300 words of truthful copy; unique metadata; links to methodology and disclosure.

#### B7 — No custom 404 / error / loading states
- **Severity:** P2 · **Confidence:** VERIFY (404s exist; design unknown)
- **Required fix:** Add `not-found.tsx` (search box + popular categories + home link), `error.tsx`
  (client boundary with retry), `loading.tsx` skeletons for listing/product routes, `global-error.tsx`.
- **Acceptance:** Visiting `/does-not-exist` shows the branded page with HTTP 404 status; throwing in
  a server component shows the error boundary, not a blank screen.

#### B8 — "Compare" nav item has unknown/undefined destination
- **Severity:** P2 · **Confidence:** LIKELY (rendered as plain text next to logo; no href extracted)
- **Required fix:** Implement `/compare` (choose up to 4 products, side-by-side table) or remove it.
  Persist the compare list in Zustand with a cap and clear feedback ("You can compare up to 4").
- **Acceptance:** Nav item is a real link or is gone.

#### B9 — Duplicate link lists in the footer ("Important Links" and "Quick Links" are identical)
- **Severity:** P3 · **Confidence:** CONFIRMED
- **Required fix:** Merge into a single, organised link set: Company (About, Contact, Blog),
  Legal (Privacy, Terms, Affiliate Disclosure), Explore (Categories, Stores, Watchlist), Help.
- **Acceptance:** No two footer columns contain the same link set.

#### B10 — Homepage `Shop Now` opens a raw external Amazon search on the US domain
- **Severity:** P1 · **Confidence:** CONFIRMED
- **Evidence:** `https://www.amazon.com/s?k=headphones` — amazon.com (US), not amazon.in, for an
  India-focused site quoting ₹ prices. No affiliate tag. No `rel`/`target` known.
- **Required fix:** Route ALL outbound clicks through one helper `buildOutboundUrl(vendor, product)`
  in `src/lib/vendors.ts` using the correct India domains (amazon.in, flipkart.com, myntra.com,
  jiomart.com, tatacliq.com), an affiliate parameter from env (`AMAZON_TAG`, etc.) when configured,
  and render with `rel="sponsored nofollow noopener noreferrer"` and `target="_blank"`. Consider an
  internal `/out/[vendor]/[id]` redirect route for click analytics (log, then 302).
- **Acceptance:** No `amazon.com` URLs remain (`grep -R "amazon.com" src` = 0); outbound anchors
  carry the right `rel`; the affiliate disclosure is visible near outbound CTAs.

=====================================================================
### GROUP C — HOMEPAGE PRODUCT DATA AND SECTIONS
=====================================================================

#### C1 — The SAME 14 products are rendered in four different sections
- **Severity:** P0 · **Confidence:** CONFIRMED
- **Evidence:** The homepage contains four product grids — "Trending Price Drops 🔥", "Top Gadgets &
  Tech 💻", "Fashion & Apparel 👕", "Home & Kitchen Appliances 🏠" — each with the identical ordered
  list: iPhone 15 Pro Max, Sony WH-1000XM5, Nike Air Jordan 1 Mid, Samsung Odyssey G9, PlayStation 5,
  Dyson Airwrap, LG 1.5 Ton AC, Puma Running Shoes, MacBook Air M2, Galaxy S24 Ultra, Himalaya Neem
  Face Wash, Levi's 511 Jeans, Philips Air Fryer, ASUS ROG Strix G15. So "Fashion & Apparel" shows an
  iPhone and a PlayStation; "Home & Kitchen" shows sneakers. 56 cards total for 14 products.
- **Root cause (probable):** Each section maps the whole `products` array without filtering by
  category (or a copy-pasted section component ignoring its `category` prop).
- **Required fix:**
  1. Implement `getSectionProducts(section)` in `src/lib/deals.ts` that FILTERS by category tree and
     limits to N (8–12). Sections: Trending Price Drops (by discount desc, all categories),
     Top Gadgets & Tech (Electronics subtree), Fashion & Apparel (Fashion subtree), Home & Kitchen
     (Home subtree), optionally Beauty.
  2. Ensure a product can appear in at most ONE category section on the page (the "Trending" row may
     overlap by design, but then the other rows must exclude those IDs — add `excludeIds`).
  3. Expand the mock catalogue so every category section has ≥ 8 distinct items (see C9), or hide
     a section when it has < 4 items.
  4. Add a unit test: for each category section, every product's category belongs to that section.
- **Acceptance:** No product `id` renders twice on the homepage; "Fashion & Apparel" only contains
  fashion; DOM product card count drops from 56 to ≤ 40; test passes.

#### C2 — Section headings contain emoji as the only visual/semantic marker
- **Severity:** P3 · **Confidence:** CONFIRMED (🔥 💻 👕 🏠 in H2 text)
- **Required fix:** Replace emoji in headings with decorative SVG icons (`aria-hidden="true"`) so
  screen readers do not read "fire emoji". Keep headings plain text.
- **Acceptance:** Heading accessible names contain no emoji.

#### C3 — Price strings are concatenated with no separator or semantics
- **Severity:** P1 · **Confidence:** CONFIRMED ("₹1,48,900₹1,59,900")
- **Required fix:** Create `<PriceTag current original />`:
  ```tsx
  <div className="flex items-baseline gap-2">
    <span className="text-xl font-bold"><span className="sr-only">Current price </span>{formatINR(current)}</span>
    <s className="text-sm text-neutral-500"><span className="sr-only">Original price </span>{formatINR(original)}</s>
    <span className="rounded bg-emerald-100 px-1.5 text-xs font-semibold text-emerald-800">{pct}% off</span>
  </div>
  ```
  Use it on cards, hero, modal, product page.
- **Acceptance:** Screen reader announces "Current price ₹1,48,900, Original price ₹1,59,900, 7% off".

#### C4 — Product cards do not show WHICH stores and WHICH prices; "3 Stores" is a dead label
- **Severity:** P1 · **Confidence:** CONFIRMED
- **Evidence:** Card says "Mobiles • 3 Stores" and "Lowest price found on: Amazon" — only one store is
  visible; no vendor logos; no other prices.
- **Required fix:** Show up to three vendor chips (logo + price) sorted ascending, cheapest
  highlighted (red per README). "3 Stores" becomes a link/button opening the comparison. Vendor logos
  come from the registry (SVG, licensed/permitted usage or neutral text chips if unsure).
- **Acceptance:** Every card shows ≥ 2 vendor prices when `offers.length >= 2` and highlights the min.

#### C5 — Product images are unrelated stock photos hot-linked from Unsplash
- **Severity:** P1 · **Confidence:** CONFIRMED (URLs `images.unsplash.com/photo-...?q=80&w=800`)
- **Evidence:** Real product listings (e.g. "Himalaya Purifying Neem Face Wash", "LG 1.5 Ton 5 Star AI
  Dual Inverter AC", "Samsung Odyssey G9") use generic Unsplash photos that almost certainly do not
  depict the exact product. This misleads users on a comparison site and hot-links a third party.
- **Required fix:**
  1. Download/self-host product images under `public/products/` (or a storage bucket) with
     licence-clean sources, or use neutral category placeholders + brand text if exact images are
     unavailable. Never present a stock photo as the specific SKU without a "Representative image" label.
  2. Serve with `next/image` (`sizes`, `width/height`, blur placeholder). If remote images remain,
     whitelist them in `next.config.ts` `images.remotePatterns` and still route through `next/image`.
  3. Add a fallback image on error (`onError` → placeholder) so broken remote URLs never leave empty boxes.
- **Acceptance:** No card uses a raw `<img src="https://images.unsplash.com...">`; each image has
  intrinsic dimensions (no CLS); a broken URL shows the placeholder.

#### C6 — GreedyScore formatting is inconsistent ("Score: 9" vs "Score: 9.8")
- **Severity:** P3 · **Confidence:** CONFIRMED (Dyson Airwrap shows "Score: 9")
- **Required fix:** `score.toFixed(1)` everywhere; render as a badge with a colour band
  (≥9 emerald, 8–8.9 lime, 7–7.9 amber, <7 red) AND a text label ("Excellent deal") so colour is not
  the only signal.
- **Acceptance:** All scores show one decimal; badge has accessible text "GreedyScore 9.0 out of 10".

#### C7 — Score text is not associated with the product (reads before the image)
- **Severity:** P2 · **Confidence:** CONFIRMED (DOM order: Score → image → CTA → category → title)
- **Required fix:** Reorder DOM: image → title (H3 link) → category/stores → price → score → CTA.
  Use CSS (absolute positioning) to keep the visual overlay badge if desired.
- **Acceptance:** Reading order matches visual order for screen readers.

#### C8 — Price "Lowest price found on: <store>" shows a single store with no timestamp or stock/delivery
- **Severity:** P2 · **Confidence:** CONFIRMED (README promises stock status and delivery estimates)
- **Required fix:** In the modal/product page show per-offer: price, stock (`In stock` / `Out of
  stock`), delivery estimate, seller, last checked. Cards need only price + store. Add `Cheapest`
  badge. Out-of-stock offers must not be the "lowest price".
- **Acceptance:** Product page lists all offers sorted by price with those fields; min-price logic
  excludes out-of-stock offers (unit test).

#### C9 — Catalogue is tiny and static; the mock engine only serves searches
- **Severity:** P1 · **Confidence:** LIKELY
- **Required fix:** Create `src/data/products.ts` (or JSON + Zod-validated loader) with ≥ 60 distinct
  products across 8 categories × 5 vendors, realistic Indian pricing, deterministic. Keep the
  hash-based `/api/search` for arbitrary queries but make it reuse the catalogue first and only
  fabricate when nothing matches — and flag fabricated results with `isSynthetic: true` so the UI can
  say "Estimated prices".
- **Acceptance:** Category pages each show ≥ 8 products; synthetic results are visibly labelled.

#### C10 — Some mock prices look unrealistic for the Indian market
- **Severity:** P3 · **Confidence:** LIKELY (sanity check)
- **Evidence:** PS5 ₹44,990/₹54,990; LG 1.5T 5★ AC ₹46,990/₹75,990; Puma shoes ₹2,199/₹4,999; iPhone
  15 Pro Max 256GB ₹1,48,900. Several are plausible but the strikethrough values look arbitrarily
  inflated (e.g. AC MRP ₹75,990 = 38% off).
- **Required fix:** Re-baseline mock MRPs to plausible ranges, cap synthetic discounts to 5–35%, and
  document the generation rules in `docs/MOCK_ENGINE.md`.
- **Acceptance:** No synthetic discount > 40%; docs exist.

#### C11 — The duplicated product H3s create hundreds of duplicate heading names
- **Severity:** P2 · **Confidence:** CONFIRMED (each product name appears 4×)
- **Required fix:** Resolved by C1; additionally ensure card headings are unique per page.
- **Acceptance:** Axe/Lighthouse reports no duplicate-landmark/heading confusion; screen-reader
  heading list is not repetitive.

=====================================================================
### GROUP D — HERO CAROUSEL
=====================================================================

#### D1 — Hero renders five slides where two are duplicates (MacBook ×2, Sony ×2)
- **Severity:** P1 · **Confidence:** CONFIRMED
- **Evidence:** Slide order in the DOM: MacBook Air M2, Sony WH-1000XM5, Virtual Reality, MacBook Air
  M2, Sony WH-1000XM5. Likely clones added for an infinite-loop effect, but they are real,
  focusable, screen-reader-visible content.
- **Required fix:** Use a carousel that handles looping internally (Embla/Swiper) or mark clones
  `aria-hidden="true"` + `inert`/`tabindex="-1"`. Prefer 3 unique slides + real loop logic.
- **Acceptance:** Screen reader lists exactly N unique slides; no duplicate H1/CTA in the a11y tree.

#### D2 — Multiple `<h1>` elements (one per slide) and heading levels start at H3
- **Severity:** P1 · **Confidence:** CONFIRMED (each slide has "# Product" and "### Top Selling")
- **Required fix:** The page has ONE `<h1>` (e.g. "Compare prices across India's top stores").
  Slide product names become `<h2>`/`<p>` with appropriate roles; the eyebrow ("Top Selling") is a
  `<p>`, not an `<h3>`.
- **Acceptance:** Exactly one H1 per route; headings never skip levels (validate with axe rule
  `heading-order` and `page-has-heading-one`).

#### D3 — Hero images use the category as alt text ("LAPTOPS", "HEADPHONES", "VIRTUAL")
- **Severity:** P2 · **Confidence:** CONFIRMED
- **Required fix:** Descriptive alt (`"Apple MacBook Air M2 in silver, open on a desk"`) or empty
  alt when purely decorative next to identical text.
- **Acceptance:** No alt equals an ALL-CAPS category word.

#### D4 — Hero slide "Virtual Reality / VIRTUAL / Deal of the Day / View Offers" names no product or price
- **Severity:** P2 · **Confidence:** CONFIRMED
- **Required fix:** See A5. Bind to a real headset product (e.g. Meta Quest 3 / PS VR2) with price,
  or remove.
- **Acceptance:** Slide shows product name, price, discount, link.

#### D5 — Carousel accessibility and controls are unverified
- **Severity:** P1 · **Confidence:** VERIFY
- **Required fix:** Implement WAI-ARIA carousel pattern: `role="region" aria-roledescription="carousel"`,
  slides `role="group" aria-roledescription="slide" aria-label="1 of 3"`, visible Prev/Next buttons
  with labels, pagination dots as buttons, autoplay OFF by default or with a visible Pause button and
  paused on hover/focus, honour `prefers-reduced-motion`, keyboard arrow support.
- **Acceptance:** Axe clean; autoplay never runs when reduced-motion is set; controls reachable by Tab.

#### D6 — Hero images likely un-prioritised (LCP)
- **Severity:** P1 · **Confidence:** VERIFY
- **Evidence:** Hero images use `/_next/image?url=/macbook.png&w=1080&q=75`, i.e. `next/image` is in
  use but `priority`/`fetchPriority` may be missing on the first slide.
- **Required fix:** `priority` (and `sizes="100vw"`) ONLY on the first visible slide's image; all
  other slides lazy. Convert PNG assets to AVIF/WebP at source; compress.
- **Acceptance:** Lighthouse mobile LCP < 2.5 s on a throttled 4G profile; only one image has priority.

#### D7 — Same asset files reused for unrelated meanings
- **Severity:** P2 · **Confidence:** CONFIRMED
- **Evidence:** `macbook.png` is the hero image AND the "Imported via Amazon" tile image;
  `vrmen.png` is used for both the "Virtual Reality" hero and the "VR Headsets" tile; `headphone.png`
  is used in the hero AND the promo banner; `gaming.png` illustrates "Luxury on TataCliq".
- **Required fix:** Use purpose-appropriate imagery; vendor tiles show vendor branding, not product
  photos of another category.
- **Acceptance:** Each tile's image is semantically relevant to its label.

=====================================================================
### GROUP E — PLACEHOLDER / TEMPLATE CONTENT STILL LIVE
=====================================================================

#### E1 — Lorem ipsum in the promo banner
- **Severity:** P0 · **Confidence:** CONFIRMED
- **Evidence:** "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque reiciendis"
- **Required fix:** Replace with real copy or remove the banner. Add a CI guard (Section 7.5) that
  fails the build if `lorem ipsum` appears in `src/`.
- **Acceptance:** `grep -Ri "lorem\|ipsum\|adipisicing" src public` returns nothing.

#### E2 — Lorem ipsum in the footer brand blurb
- **Severity:** P0 · **Confidence:** CONFIRMED
- **Evidence:** "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores alias cum"
- **Required fix:** One-sentence truthful description (e.g. "GreedyCart compares prices across major
  Indian stores so you can buy at the lowest price.").
- **Acceptance:** As E1.

#### E3 — Promo banner content is nonsense and stale: "30% OFF / Fine Smile / 10 Jan to 28 Jan / Air Solo Bass / Winter Sale"
- **Severity:** P0 · **Confidence:** CONFIRMED
- **Evidence:** Today is 30 September 2026. The banner advertises a "Winter Sale" for 10–28 Jan with no
  year. "Fine Smile" and "Air Solo Bass" are unexplained (appear to be template text from a
  headphone-store starter). "30% OFF" is not tied to any product.
- **Required fix:** Make promos data-driven (`promos` table/JSON with `startsAt`, `endsAt`,
  `title`, `productId|categorySlug`, `href`). Render only currently active promos (server-side date
  check in `Asia/Kolkata`). If none active, render nothing. Never hard-code seasonal copy.
- **Acceptance:** With the current date (Sept 2026) the winter banner does not render; adding an
  active promo makes it appear; unit test for date-window logic incl. timezone edge cases.

#### E4 — Footer credit "Made with 💖 by The Coding Journey" is template attribution
- **Severity:** P2 · **Confidence:** CONFIRMED
- **Required fix:** Replace with the site's own copyright: `© 2026 GreedyCart. All rights reserved.`
  (compute the year at render time). If attribution to the template is required by its licence, put it
  in `/about` or a `/credits` page. Replace the emoji.
- **Acceptance:** Footer shows correct legal entity and the current year.

#### E5 — Newsletter block has copy but no verifiable form/handler
- **Severity:** P1 · **Confidence:** LIKELY (text-only in extraction; input/button not extracted)
- **Evidence:** "Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals."
  No input, consent text or confirmation was extracted.
- **Required fix:** Build `<NewsletterForm />`: labelled email input, submit button, client + server
  validation (Zod), double opt-in via provider (Resend/Buttondown/Mailchimp) or store in DB, honeypot
  + rate limit, consent text ("By subscribing you agree to our Privacy Policy"), success and error
  states announced via `aria-live="polite"`. Remove "free giveaways" and "once-in-a-lifetime" unless
  true (misleading marketing).
- **Acceptance:** Submitting a valid email returns success; invalid shows an inline error; the
  endpoint rejects >5 requests/min/IP with 429; no PII is logged.

#### E6 — Promo "Shop Now" CTA and headphone hero art are unrelated to the deal
- **Severity:** P2 · **Confidence:** CONFIRMED (see B10)
- **Required fix:** Bind to a product/category route inside GreedyCart, not a generic Amazon search.
- **Acceptance:** CTA goes to `/category/audio` or the promoted `/product/[id]`.

#### E7 — Placeholder-quality About/Mission copy
- **Severity:** P2 · **Confidence:** CONFIRMED
- **Required fix:** See B6.
- **Acceptance:** See B6.

=====================================================================
### GROUP F — HEADER, NAVIGATION AND GLOBAL LAYOUT
=====================================================================

#### F1 — No visible search on the homepage of a search-driven aggregator
- **Severity:** P0 · **Confidence:** LIKELY (no search input extracted; README/roadmap promise a
  "massive, prominent search bar" — roadmap Phase 2 item unchecked)
- **Required fix:** Add a prominent search input in the header and hero: `role="search"`, label,
  autosuggest (debounced 250 ms, `aria-autocomplete="list"`, arrow-key nav), submit to
  `/search?q=…`, recent searches from Zustand, min length 2, trims whitespace, max 100 chars.
  Support `/` keyboard shortcut to focus.
- **Acceptance:** Typing "iphone" + Enter shows `/search?q=iphone` with results from `/api/search`;
  empty query shows guidance; Lighthouse "form elements have labels" passes.

#### F2 — Header lacks watchlist counter, account entry, mobile menu (unverified)
- **Severity:** P1 · **Confidence:** VERIFY
- **Required fix:** Heart icon with badge count (Zustand `persist`), opens the Watchlist Drawer;
  responsive hamburger menu with focus trap; skip link "Skip to content" as first focusable element.
- **Acceptance:** Keyboard-only user can open the menu, reach search, and close with ESC.

#### F3 — No landmark structure confirmed (`<main>`, `<nav>` labels)
- **Severity:** P2 · **Confidence:** VERIFY
- **Required fix:** Wrap page content in `<main id="content">`; label multiple navs
  (`aria-label="Primary"`, `aria-label="Footer"`); one `<header>` and one `<footer>` per page.
- **Acceptance:** Axe `landmark-one-main`, `region` rules pass.

#### F4 — Global layout shared by all pages including error/404 states (verify consistency)
- **Severity:** P3 · **Confidence:** VERIFY
- **Required fix:** Ensure `/about` etc. reuse the layout, sticky header does not overlap content
  (`scroll-padding-top`), and footer sticks to bottom on short pages (`min-h-dvh flex flex-col`).
- **Acceptance:** `/about` at 1920×1080 shows the footer at the viewport bottom, not mid-screen.

#### F5 — Theme, favicon and app icons not verified
- **Severity:** P3 · **Confidence:** VERIFY
- **Required fix:** Provide `app/icon.png` (or `icon.svg`), `apple-icon.png`, `manifest.webmanifest`,
  `themeColor` via `viewport` export. Consider `color-scheme` support and dark mode.
- **Acceptance:** Browser tab shows the GreedyCart icon; Lighthouse PWA-lite checks (manifest) pass.

=====================================================================
### GROUP G — CORE AGGREGATOR FEATURES (SEARCH, COMPARE, WATCHLIST, ALERTS)
=====================================================================

#### G1 — No category, search, product-detail or store routes exist (as far as the crawl can tell)
- **Severity:** P0 · **Confidence:** LIKELY (all CTAs are non-links; only /about exists)
- **Required fix:** Implement these routes with Server Components and `generateMetadata`:
  - `/search?q=&category=&store=&min=&max=&sort=` (SSR results, pagination or infinite scroll with
    "Load more" fallback, filter sidebar/drawer, sort: relevance, discount, price asc/desc, score).
  - `/category/[slug]` (same listing component, `generateStaticParams` from the category enum).
  - `/product/[id]` (gallery, title, offers table, price-history chart, GreedyScore breakdown,
    Watchlist button, specs, similar products, JSON-LD).
  - `/store/[vendor]` (top deals per store).
  - `/compare?ids=a,b,c` (side-by-side attributes + offers).
  - `/alerts` (Watchlist + alert settings), `/help`, `/methodology`.
- **Acceptance:** Every homepage CTA resolves to one of these; all render with mock data; each has
  unique metadata; all are included in `sitemap.ts` (except while `noindex` in demo mode — see H10).

#### G2 — Quick View Modal (README) is not reachable from the live page
- **Severity:** P1 · **Confidence:** LIKELY
- **Required fix:** Use a Next.js intercepting route (`@modal/(.)product/[id]`) so the modal has a
  real URL and full page fallback. Modal: `role="dialog"`, `aria-modal`, labelled, focus trap, ESC
  and backdrop close, scroll lock, return focus to trigger, Framer Motion animation respecting
  `useReducedMotion()`.
- **Acceptance:** Opening a card shows the modal at `/product/[id]`; refreshing shows the full page;
  browser Back closes the modal.

#### G3 — Watchlist ("heart") not visible on cards; state persistence risks hydration errors
- **Severity:** P1 · **Confidence:** LIKELY (no heart in extraction; README says Zustand persist to
  localStorage — a classic source of SSR hydration mismatches)
- **Required fix:**
  1. Add a heart toggle button on each card (`aria-pressed`, label "Add X to watchlist").
  2. Use Zustand `persist` with `skipHydration: true` and rehydrate in a client effect, or gate
     counts/icons behind a `useHasHydrated()` hook, to avoid "Text content does not match" warnings.
  3. Version the persisted schema (`version: 1`, `migrate`) so future shape changes don't crash.
  4. Guard localStorage access (try/catch; private mode / quota errors).
- **Acceptance:** No hydration warnings in the console; state survives reload; toggling is announced
  ("Added to watchlist") via a polite live region/toast.

#### G4 — "Track Alerts" / "Deal Alerts — Get notified when prices drop" has no implementation
- **Severity:** P0 · **Confidence:** CONFIRMED (claim) + LIKELY (not built; README lists as future)
- **Required fix:** Either build a minimal, honest version or remove the claim:
  - Minimal: alert form on product page (email + target price or "any drop ≥ 5%"), stored via
    Prisma `PriceAlert` model, double opt-in, unsubscribe link, a cron (Vercel Cron) that evaluates
    alerts against latest prices and sends email via Resend. Rate-limit and validate.
  - Until built: change copy to "Price alerts — coming soon" and disable the CTA visibly.
- **Acceptance:** The site never promises functionality it does not have.

#### G5 — `/api/search` mock engine: input validation, caching, abuse protection (VERIFY)
- **Severity:** P1 · **Confidence:** VERIFY
- **Required fix:**
  1. Validate `q` with Zod: string, trimmed, 2–100 chars, strip control chars; return 400 with a
     JSON error body otherwise.
  2. Rate limit per IP (e.g. Upstash Ratelimit or in-memory LRU for dev): 30 req/min.
  3. Set `Cache-Control: s-maxage=300, stale-while-revalidate=600` for deterministic responses; or
     use `unstable_cache`/`fetch` cache tags.
  4. Return typed payload `{ query, products: Product[], isSynthetic: boolean, generatedAt }`.
  5. Make the hash deterministic across Node versions (use a fixed algorithm such as FNV-1a/xmur3,
     not `Math.random` or JS engine-specific behaviour).
  6. Handle non-Latin/Hindi queries (normalise with `normalize("NFKC")`, lowercase) and
     misspellings (basic fuzzy match against the catalogue before synthesising).
  7. Write tests: same query → identical output; different queries → different outputs; extremely
     long input → 400; SQL/HTML in `q` is inert.
- **Acceptance:** `curl "/api/search?q="` → 400; repeated identical calls → identical JSON; headers
  include cache directives; tests pass.

#### G6 — Price history chart promised by roadmap is missing; no data model
- **Severity:** P2 · **Confidence:** LIKELY
- **Required fix:** Add Prisma models `Product`, `Vendor`, `Offer`, `PricePoint(offerId, price,
  observedAt)`, `WatchlistItem`, `PriceAlert`, `Subscriber`. Seed script generating 90 days of
  deterministic mock history. Render a lightweight chart (SVG/`recharts` lazy-loaded) with accessible
  data table alternative and a summary sentence ("Lowest in 90 days").
- **Acceptance:** Product page shows history for 30/90 days; chart has a text alternative.

#### G7 — Database layer exists (`prisma/`) but is not used by the deployed app (VERIFY)
- **Severity:** P2 · **Confidence:** LIKELY (roadmap Phase 4 unchecked, `prisma` folder committed)
- **Required fix:** Decide: (a) wire Prisma + Postgres (Neon/Supabase/Vercel Postgres) with
  `DATABASE_URL` in env, migrations committed, `prisma generate` in `postinstall`, singleton client
  for serverless; or (b) delete the folder until Phase 4 to avoid confusion.
- **Acceptance:** `npm run build` on Vercel succeeds with/without DB when in demo mode; no unused
  dependencies remain.

#### G8 — Compare feature lacks limits and mobile design
- **Severity:** P3 · **Confidence:** VERIFY
- **Required fix:** Max 4 products, table becomes stacked cards below 640px, sticky first column on
  desktop, highlight best value per row (lowest price, highest score) with text + icon, not colour alone.
- **Acceptance:** Usable at 360px without horizontal page scroll (only the table container scrolls).

=====================================================================
### GROUP H — SEO AND METADATA
=====================================================================

#### H1 — All pages share ONE global metadata block (About has the homepage's title/description)
- **Severity:** P1 · **Confidence:** CONFIRMED
- **Evidence:** `/about` returns the same description and the same `og:url: https://greedycart.vercel.app`
  as the homepage; title is the homepage title.
- **Required fix:** Use `metadata`/`generateMetadata` per route with a `title.template`
  (`"%s | GreedyCart"`), unique descriptions (120–160 chars), and per-route `alternates.canonical`,
  `openGraph.url`. Set `metadataBase: new URL(SITE_URL)` in the root layout.
- **Acceptance:** Every route has a unique `<title>` and canonical; a script that fetches all
  sitemap URLs asserts uniqueness (Section 7.4).

#### H2 — `<title>` and Open Graph/Twitter titles disagree
- **Severity:** P2 · **Confidence:** CONFIRMED
- **Evidence:** `<title>`: "Greedy Cart | Discover Massive Price Drops" vs `og:title`/`twitter:title`:
  "Greedy Cart | Live Price Drops". Also the brand is written "Greedy Cart" (metadata) and "GreedyCart"
  (logo, About). Note "Live" is a claim that conflicts with A1.
- **Required fix:** Pick one brand spelling ("GreedyCart") and one title. Suggested homepage title:
  "GreedyCart — Compare Prices Across Amazon, Flipkart, Myntra & More".
- **Acceptance:** Title, OG and Twitter titles are consistent; brand spelled identically everywhere.

#### H3 — `og:image` and `twitter:image` are missing though `twitter:card=summary_large_image`
- **Severity:** P1 · **Confidence:** CONFIRMED (no image meta in extracted head)
- **Required fix:** Add `src/app/opengraph-image.tsx` (1200×630, `ImageResponse`) and
  `twitter-image`, plus per-product dynamic OG images (name, price, % off, score). Provide `alt`.
- **Acceptance:** Sharing the URL in WhatsApp/Twitter/LinkedIn shows a card; validators show no
  missing-image warnings.

#### H4 — No structured data (JSON-LD)
- **Severity:** P1 · **Confidence:** LIKELY
- **Required fix:** Add JSON-LD: `WebSite` + `SearchAction` (homepage), `Organization`, `BreadcrumbList`
  (category/product), `Product` with `AggregateOffer` (lowPrice, highPrice, offerCount, priceCurrency
  `INR`) — ONLY when data mode is `live` or clearly not misleading; never mark synthetic data as real
  offers (policy risk). Inject safely: `<script type="application/ld+json" dangerouslySetInnerHTML={{
  __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />`.
- **Acceptance:** Rich Results Test passes for a product page in live mode; homepage passes
  WebSite validation.

#### H5 — No `sitemap.xml` / `robots.txt` verified
- **Severity:** P1 · **Confidence:** VERIFY
- **Required fix:** `src/app/sitemap.ts` (static routes + categories + products) and
  `src/app/robots.ts` (allow `/`, disallow `/api/`, `/out/`, `/alerts`, `/search?*`; reference the
  sitemap). Faceted/filter URLs are `noindex,follow` or canonicalised to the base listing.
- **Acceptance:** `/sitemap.xml` and `/robots.txt` return 200 with correct content.

#### H6 — Two deployments may exist (greedycart.vercel.app and e-commerce-lac-sigma-69.vercel.app)
- **Severity:** P2 · **Confidence:** LIKELY
- **Required fix:** Choose one canonical origin. Add `alternates.canonical` to the canonical host,
  and either delete the other Vercel project or add a permanent redirect (`308`) via `vercel.json`/
  `next.config.ts` `redirects()`. Attach a custom domain when available.
- **Acceptance:** The non-canonical host redirects or is `noindex`; canonical tags point to one host.

#### H7 — Heading/keyword strategy: homepage has no descriptive H1 and no crawlable text about the service
- **Severity:** P2 · **Confidence:** CONFIRMED
- **Required fix:** One descriptive H1; a short intro paragraph; FAQ section (with `FAQPage`
  schema only if truthful) covering how it works, data freshness, affiliate disclosure, supported stores.
- **Acceptance:** Homepage has H1 + ≥ 150 words of unique, useful copy outside cards.

#### H8 — Internal linking is almost non-existent (cards and CTAs are not anchors)
- **Severity:** P1 · **Confidence:** CONFIRMED
- **Required fix:** Resolved by B2–B4, G1; add breadcrumbs and "Related products/categories".
- **Acceptance:** Crawl depth ≤ 3 for every product; no orphan pages.

#### H9 — `lang`, locale and hreflang consistency
- **Severity:** P3 · **Confidence:** VERIFY (og:locale is `en_IN`)
- **Required fix:** `<html lang="en-IN">`; dates/numbers formatted with `en-IN`.
- **Acceptance:** `document.documentElement.lang === "en-IN"`.

#### H10 — Fabricated/demo pages must not be indexed
- **Severity:** P0 (while in demo mode) · **Confidence:** LIKELY
- **Required fix:** In `demo` mode set `robots: { index: false, follow: true }` on `/product/*`,
  `/search`, `/category/*`; keep `/`, `/about`, `/methodology` indexable. Remove `noindex` when live.
- **Acceptance:** `curl -s /product/1 | grep -i robots` shows noindex in demo mode.

=====================================================================
### GROUP I — ACCESSIBILITY (WCAG 2.2 AA TARGET)
=====================================================================

#### I1 — Non-anchor interactive elements
- **Severity:** P0 · **Confidence:** CONFIRMED (see B2–B4)
- **Required fix:** Actions → `<button type="button">`, navigation → `<a>`. No `div/span onClick`.
- **Acceptance:** Axe rules `button-name`, `link-name`, `nested-interactive` all pass.

#### I2 — Heading order and multiple H1s
- **Severity:** P1 · **Confidence:** CONFIRMED (see D2)
- **Acceptance:** Axe `heading-order`, `page-has-heading-one` pass.

#### I3 — Alt text quality
- **Severity:** P2 · **Confidence:** CONFIRMED (hero alt = category; card alt = product name;
  footer/feature icons unknown)
- **Required fix:** Card image alt = product name only when the image adds info; if the title is
  adjacent, use `alt=""`. Decorative icons `aria-hidden`.
- **Acceptance:** No redundant or ALL-CAPS alt text.

#### I4 — Colour contrast and colour-only signalling
- **Severity:** P1 · **Confidence:** VERIFY
- **Required fix:** Ensure ≥ 4.5:1 for text, ≥ 3:1 for UI components/large text; "cheapest" red
  highlight and score colours must also use text/icon. Check strikethrough grey text and badges on
  image overlays (add a scrim).
- **Acceptance:** Axe `color-contrast` reports 0 violations in light (and dark, if supported) modes.

#### I5 — Focus visibility and order
- **Severity:** P1 · **Confidence:** VERIFY
- **Required fix:** Global `:focus-visible` outline (2px, offset 2px, high contrast); never
  `outline: none` without replacement; logical tab order; no keyboard traps except the modal (which
  must trap and release correctly).
- **Acceptance:** Full keyboard walkthrough of home → product → watchlist is possible and visible.

#### I6 — Motion
- **Severity:** P2 · **Confidence:** VERIFY (Framer Motion "used heavily")
- **Required fix:** Respect `prefers-reduced-motion` via `useReducedMotion()` and a global CSS media
  query; no parallax or auto-moving content > 5 s without pause control.
- **Acceptance:** With reduced-motion enabled no autoplay/large transforms occur.

#### I7 — Emoji, icon-only buttons and live regions
- **Severity:** P2 · **Confidence:** CONFIRMED (emoji in headings) / VERIFY (icon buttons)
- **Required fix:** Every icon-only button has `aria-label`; toasts/status messages use
  `role="status"`; form errors linked with `aria-describedby`.
- **Acceptance:** Axe passes; screen-reader test with NVDA/VoiceOver notes recorded in `docs/A11Y.md`.

#### I8 — Touch target size and responsive text
- **Severity:** P2 · **Confidence:** VERIFY
- **Required fix:** Interactive targets ≥ 24×24 CSS px (WCAG 2.2 AA), ≥ 44×44 for primary actions on
  mobile; text zoom to 200% without loss; no horizontal scroll at 320px (reflow).
- **Acceptance:** Manual test at 320px & 200% zoom passes.

#### I9 — Skip link and document language
- **Severity:** P2 · **Confidence:** VERIFY
- **Required fix:** First focusable = "Skip to main content" targeting `#content`; `lang="en-IN"`.
- **Acceptance:** Tab once on load reveals the skip link.

=====================================================================
### GROUP J — PERFORMANCE
=====================================================================

#### J1 — Excess DOM/render cost from 56 duplicate cards
- **Severity:** P1 · **Confidence:** CONFIRMED
- **Required fix:** C1 removes duplicates. Additionally virtualise/paginate lists > 24 items, defer
  below-the-fold sections with `content-visibility: auto` or dynamic import for client widgets.
- **Acceptance:** Homepage DOM nodes < 1,500; Total Blocking Time < 200 ms in Lighthouse mobile.

#### J2 — Un-optimised third-party images
- **Severity:** P1 · **Confidence:** CONFIRMED (Unsplash query params, raw `<img>`)
- **Required fix:** See C5. Use `sizes="(min-width:1280px) 25vw, (min-width:768px) 33vw, 50vw"`, lazy
  loading below the fold, `placeholder="blur"` with generated `blurDataURL`.
- **Acceptance:** Lighthouse "Properly size images" and "Serve images in next-gen formats" pass.

#### J3 — Large PNG hero assets
- **Severity:** P2 · **Confidence:** LIKELY (`macbook.png`, `headphone.png`, `vrmen.png`,
  `earphone.png`, `time.png`, `gaming.png`, `speaker.png` in `/public` are PNG)
- **Required fix:** Convert to AVIF/WebP (source PNG ≤ 200 KB after optimisation), remove
  unused assets, and set explicit `width/height`.
- **Acceptance:** Each public image ≤ 200 KB; `du -sh public` documented in the PR.

#### J4 — Fonts and CSS
- **Severity:** P3 · **Confidence:** VERIFY
- **Required fix:** `next/font` with `display: swap`, subset `latin`, at most 2 families/4 weights;
  remove unused Tailwind safelist entries; verify Tailwind v4 content detection is not scanning
  `node_modules`/`scratch`.
- **Acceptance:** Total CSS < 60 KB gz; no FOIT; CLS < 0.1.

#### J5 — JavaScript payload and client boundaries
- **Severity:** P1 · **Confidence:** VERIFY
- **Required fix:** Audit `"use client"` usage; convert static sections to Server Components; lazy-load
  Framer Motion features with `LazyMotion` + `domAnimation`; dynamic import the modal/chart/
  carousel; run `@next/bundle-analyzer` and record results.
- **Acceptance:** First-load JS for `/` < 170 KB gz (target; document actuals if not met).

#### J6 — Caching and rendering strategy
- **Severity:** P2 · **Confidence:** VERIFY
- **Required fix:** Homepage as static/ISR (`revalidate = 300`); product pages ISR; API responses
  cacheable (G5). Avoid `force-dynamic` unless needed. Add `Cache-Control` for `/public` assets
  (Vercel default is fine; verify).
- **Acceptance:** `x-vercel-cache: HIT/STALE` observed on repeat visits of `/`.

#### J7 — Core Web Vitals monitoring
- **Severity:** P3 · **Confidence:** VERIFY
- **Required fix:** Add `@vercel/speed-insights` and `@vercel/analytics` (respect consent/DNT) and a
  Lighthouse CI budget (Section 7.6).
- **Acceptance:** CI fails when LCP > 3 s, CLS > 0.1 or perf score < 85 on the homepage preview.

=====================================================================
### GROUP K — SECURITY, PRIVACY AND LEGAL COMPLIANCE
=====================================================================

#### K1 — No affiliate/advertising disclosure
- **Severity:** P0 · **Confidence:** LIKELY (none found in crawled text)
- **Required fix:** Add a concise disclosure in the footer and near outbound CTAs ("GreedyCart may
  earn a commission when you buy through links. It never changes the price you pay.") and a full
  `/affiliate-disclosure` page. Mark outbound links `rel="sponsored"`.
- **Acceptance:** Disclosure is visible on home, product and category pages; page exists.

#### K2 — No Privacy Policy, Terms of Use, Cookie information
- **Severity:** P0 · **Confidence:** CONFIRMED (no such links in header/footer)
- **Required fix:** Create `/privacy` and `/terms` (drafted plainly; flag for legal review — you are
  not a lawyer and must state that in `docs/DECISIONS.md`), describing data collected (newsletter
  email, localStorage watchlist, analytics), retention, third parties, contact for data requests
  (India's DPDP Act, 2023 considerations). Add a cookie/consent banner only if non-essential
  cookies/analytics are used; it must be non-blocking, accessible, with equal-prominence Accept/Reject.
- **Acceptance:** Footer links to both; forms link to the Privacy Policy.

#### K3 — Security headers not verified
- **Severity:** P1 · **Confidence:** VERIFY
- **Required fix:** In `next.config.ts` `headers()`: `Strict-Transport-Security`,
  `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`,
  `Permissions-Policy` (camera=(), microphone=(), geolocation=()), `X-Frame-Options: DENY` (or CSP
  `frame-ancestors 'none'`), and a Content-Security-Policy (nonce-based via middleware) allowing only
  required origins (self, image hosts, analytics). Test with securityheaders.com / Mozilla Observatory.
- **Acceptance:** Grade A or better; site still functions (no CSP violations in console).

#### K4 — External links without `rel` protection
- **Severity:** P2 · **Confidence:** LIKELY
- **Required fix:** All `target="_blank"` links include `rel="noopener noreferrer"` (+ `sponsored
  nofollow` for affiliate). Lint rule `react/jsx-no-target-blank` enabled.
- **Acceptance:** ESLint rule passes; DOM check finds no `_blank` without `noopener`.

#### K5 — API and form abuse protection
- **Severity:** P1 · **Confidence:** VERIFY
- **Required fix:** Rate limiting, Zod validation, body-size limits, CSRF-safe design (same-site
  cookies / origin check for mutating routes), honeypot/Turnstile for public forms, generic error
  messages, no stack traces to clients, structured server logs without PII.
- **Acceptance:** Automated tests assert 400/429 behaviours.

#### K6 — Secrets and environment hygiene
- **Severity:** P1 · **Confidence:** VERIFY
- **Required fix:** Ensure `.env*` is git-ignored (except `.env.example`), no keys in the repo history
  (scan with `gitleaks`), rotate anything found; validate env at boot with Zod
  (`src/env.ts`) so missing vars fail fast; only expose `NEXT_PUBLIC_*` intentionally.
- **Acceptance:** `gitleaks detect` clean; app refuses to start with missing required vars in `live`.

#### K7 — Trademark/logo usage and comparative-advertising claims
- **Severity:** P2 · **Confidence:** LIKELY
- **Required fix:** Use vendor names in text; only use logos in ways permitted by each vendor's
  brand/affiliate guidelines; avoid implying endorsement ("India's biggest giants" is fine as a
  description, but do not claim official partnerships). Add "Trademarks belong to their owners."
- **Acceptance:** Footer contains the trademark notice; logo usage is documented.

#### K8 — Dependency and supply-chain hygiene
- **Severity:** P2 · **Confidence:** VERIFY
- **Required fix:** `npm audit --omit=dev`, update vulnerable packages, enable Dependabot/Renovate,
  pin Node version (`engines`, `.nvmrc`), commit lockfile only for one package manager.
- **Acceptance:** `npm audit --omit=dev` reports no high/critical vulnerabilities (or documented waivers).

=====================================================================
### GROUP L — REPOSITORY, CODE QUALITY AND HYGIENE
=====================================================================

#### L1 — Multiple AI-agent config folders and instruction files committed
- **Severity:** P3 · **Confidence:** CONFIRMED (repo root lists `.agents/skills`, `.claude/skills`,
  `.cursor/skills`, `.devin/skills`, `AGENTS.md`, `CLAUDE.md`)
- **Required fix:** Keep ONE canonical instruction file (`AGENTS.md`) and make `CLAUDE.md` a short
  pointer if tooling needs it. Verify the skill folders contain no secrets, huge files or stale
  instructions that contradict this document; delete unused ones or move to a documented dev-only
  location. Do not delete anything that is required by the project's own tooling without checking.
- **Acceptance:** `AGENTS.md` describes: stack, commands, conventions, data mode, how to run tests.

#### L2 — `scratch/` directory committed
- **Severity:** P3 · **Confidence:** CONFIRMED
- **Required fix:** Inspect; delete throwaway files or add to `.gitignore`. Ensure `scratch/` is
  excluded from `tsconfig.json`, ESLint and Tailwind content scanning.
- **Acceptance:** `scratch/` gone or ignored; type-check unaffected.

#### L3 — Repo description/README do not match the product
- **Severity:** P3 · **Confidence:** CONFIRMED
- **Evidence:** GitHub description: "This is the Front-end Starter for building any E-commerce website
  from scratch." README title says GreedyCart price aggregator. The repo name is "E-Commerce". The
  README's deployment link points to a different Vercel host. README mentions a "Watchlist Drawer",
  "Quick View Modal", "View Deal" that the live homepage does not show; roadmap items for Phase 2
  (landing revamp, comparison page) are unchecked yet a landing page is live.
- **Required fix:** Rewrite README (overview, screenshots, data-mode explanation, env vars, scripts,
  architecture diagram, deployment, contributing). Update the GitHub description/topics/homepage URL.
  Update the roadmap checkboxes to match reality.
- **Acceptance:** A new developer can clone, configure `.env`, run and deploy following README only.

#### L4 — Component/state organisation (VERIFY)
- **Severity:** P2 · **Confidence:** VERIFY
- **Required fix:** Enforce the folder structure in README; extract repeated JSX (section headers,
  product grids) into shared components; collocate types; one Zustand store per concern
  (`watchlist`, `ui`, `compare`) with selectors to prevent unnecessary re-renders; no business logic in
  components.
- **Acceptance:** No component > 250 lines; no duplicated section markup.

#### L5 — TypeScript strictness and lint rules
- **Severity:** P2 · **Confidence:** VERIFY
- **Required fix:** `tsconfig`: `"strict": true`, `"noUncheckedIndexedAccess": true`,
  `"exactOptionalPropertyTypes": true` (if feasible). ESLint: next/core-web-vitals, typescript-eslint
  recommended-type-checked, `jsx-a11y`, `react/jsx-no-target-blank`, `no-console` (warn),
  import ordering. Prettier + `prettier-plugin-tailwindcss`.
- **Acceptance:** `npm run lint` and `npx tsc --noEmit` both exit 0.

#### L6 — Magic strings and hard-coded content in JSX
- **Severity:** P2 · **Confidence:** LIKELY (Seen: repeated hard-coded copy)
- **Required fix:** Move copy to `src/content/*.ts` (or i18n-ready dictionary), promos/sections to
  data files; strongly type them.
- **Acceptance:** JSX contains layout only; copy edits require no component changes.

#### L7 — Error handling and logging
- **Severity:** P2 · **Confidence:** VERIFY
- **Required fix:** Centralised `logger` (pino/console wrapper) with levels; API routes return
  consistent `{ error: { code, message } }`; wrap external calls with timeouts/retries; add
  Sentry (or Vercel observability) with PII scrubbing.
- **Acceptance:** Forced errors are captured and visible; no unhandled promise rejections.

#### L8 — Package and script hygiene
- **Severity:** P3 · **Confidence:** VERIFY
- **Required fix:** Scripts: `dev`, `build`, `start`, `lint`, `typecheck`, `test`, `test:e2e`,
  `format`, `analyze`, `db:migrate`, `db:seed`. Remove unused deps (`depcheck`/`knip`). Both
  `react-icons` and `lucide-react` are used — standardise on ONE icon library to cut bundle size.
- **Acceptance:** `npx knip` shows no unused exports/deps (or waivers documented).

=====================================================================
### GROUP M — DESIGN AND UX POLISH
=====================================================================

#### M1 — Visual hierarchy: four identical grids create a monotonous, endless page
- **Severity:** P2 · **Confidence:** CONFIRMED
- **Required fix:** After C1, vary sections: horizontal scroller for Trending, 4-col grid for
  categories, a "Biggest drops this week" ranked list, a "Compare across stores" feature band.
  Add "View all" links per section to the category page.
- **Acceptance:** Every section has a purpose, heading, "View all" link and distinct layout.

#### M2 — Missing empty, loading, and error states in lists
- **Severity:** P2 · **Confidence:** VERIFY
- **Required fix:** Skeleton cards, "No results" panel with suggestions, retry on failure,
  optimistic UI for watchlist.
- **Acceptance:** Throttled network shows skeletons; empty search shows helpful guidance.

#### M3 — Mobile layout unverified
- **Severity:** P1 · **Confidence:** VERIFY
- **Required fix:** Test at 320/360/390/768/1024/1440. Hero text must not overlap imagery; card grid
  1–2 columns on mobile; header collapses; tap targets sized (I8); no horizontal overflow.
- **Acceptance:** Playwright screenshots at 3 widths committed to `docs/screens/`.

#### M4 — Feature strip ("Real-Time Tracking", "Multi-Vendor Comparison", "Deal Alerts", "GreedyScore Rating") has no icons/links
- **Severity:** P3 · **Confidence:** CONFIRMED (text only in extraction)
- **Required fix:** Add icons (decorative), make each tile link to the relevant explainer
  (`/methodology`, `/alerts`, `/compare`). Align copy with reality (A2, A3, G4).
- **Acceptance:** Each tile is a link or is clearly informational; copy is accurate.

#### M5 — Brand consistency
- **Severity:** P3 · **Confidence:** CONFIRMED
- **Evidence:** "Greedy Cart" (metadata) vs "GreedyCart" (logo/About) and "The Coding Journey"
  (footer credit).
- **Required fix:** Single spelling and a tagline. Update everywhere including README.
- **Acceptance:** `grep -R "Greedy Cart" src` returns nothing (or only intentional prose).

#### M6 — Copywriting quality
- **Severity:** P3 · **Confidence:** CONFIRMED
- **Evidence:** "Lowest Prices / Aggregated", "Imported via Amazon", "Luxury on TataCliq", "once-in-a-
  lifetime deals", "Air Solo Bass".
- **Required fix:** Rewrite microcopy to be clear, concrete and honest; sentence case; Indian English.
- **Acceptance:** Copy review checklist in `docs/COPY.md` completed.

#### M7 — Currency/number formatting and dates
- **Severity:** P3 · **Confidence:** CONFIRMED (Indian grouping used) / VERIFY (elsewhere)
- **Required fix:** All formatting via `format.ts`; dates as "12 Oct 2026" in `Asia/Kolkata`; relative
  times via `Intl.RelativeTimeFormat`.
- **Acceptance:** Unit tests for `formatINR(148900) === "₹1,48,900"`.

=====================================================================
### GROUP N — TESTING, CI/CD AND OBSERVABILITY
=====================================================================

#### N1 — No evidence of automated tests
- **Severity:** P1 · **Confidence:** VERIFY
- **Required fix:** Vitest + React Testing Library for units/components; Playwright for e2e; see
  Section 7. Minimum coverage targets: `lib/*` 90%, components 60%.
- **Acceptance:** `npm test` and `npm run test:e2e` pass locally and in CI.

#### N2 — No CI pipeline verified
- **Severity:** P2 · **Confidence:** VERIFY
- **Required fix:** `.github/workflows/ci.yml`: install (cached), lint, typecheck, unit tests, build,
  Playwright against the Vercel preview or `next start`, axe checks, Lighthouse CI, link check.
- **Acceptance:** PRs are blocked on failing checks.

#### N3 — Preview/production environment parity
- **Severity:** P3 · **Confidence:** VERIFY
- **Required fix:** Document env vars per environment in `docs/ENVIRONMENTS.md`; `DATA_MODE=demo` in
  Preview and Production until real data exists.
- **Acceptance:** Preview deployments show the demo badge.

#### N4 — Uptime and error monitoring
- **Severity:** P3 · **Confidence:** VERIFY
- **Required fix:** Health endpoint `/api/health` (no secrets), uptime check, error tracking.
- **Acceptance:** `/api/health` returns `{status:"ok", mode:"demo"}`.

---

## 5. RECOMMENDED EXECUTION ORDER

Follow this order. Do not start a later phase until the earlier phase's acceptance checks pass.

### Phase 0 — Recon (no code changes) — target: 1 commit of docs only
1. Confirm repo ↔ deployment mapping (Section 1.2). Record in `docs/DECISIONS.md`.
2. Install, run `npm run build`, capture baseline: bundle sizes, Lighthouse (mobile+desktop), axe
   report, link check, `npm audit`. Save under `docs/baseline/`.
3. Read all existing components and note actual behaviour for each `VERIFY` item.

### Phase 1 — Stop the bleeding (P0, trust and broken things)
Order: A1, A2, A3 (copy + badge) → E1, E2, E3, E4 (placeholders) → B5 (404 footer links) → B1
(dead header links) → B10 (amazon.com) → K1/K2 (disclosure/policies stubs) → H10 (noindex in demo).

### Phase 2 — Real navigation and data correctness
C1 (section filtering) → C9 (catalogue) → A7/categories → G1 (routes) → B2/B3/B4 (real links) → C3/C4
(price + vendor chips) → A4 (discount logic) → A5/D4 (hero data) → A6 (platform tiles).

### Phase 3 — Core features
F1 (search) → G5 (API hardening) → G2 (modal) → G3 (watchlist) → G4 (alerts minimal) → G6/G7 (DB,
history) → B8/G8 (compare).

### Phase 4 — SEO, accessibility, performance
H1–H9 → I1–I9 → D1–D7 → J1–J7 → K3–K8.

### Phase 5 — Hygiene, tests, CI
L1–L8 → N1–N4 → M1–M7.

---

## 6. REFERENCE SNIPPETS (adapt to the installed Next.js version; verify APIs in its docs first)

### 6.1 Root layout metadata (`src/app/layout.tsx`)
```tsx
import type { Metadata, Viewport } from "next";
import { SITE_URL, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "GreedyCart — Compare Prices Across Amazon, Flipkart, Myntra & More",
    template: "%s | GreedyCart",
  },
  description:
    "Compare prices for electronics, fashion and home products across India's biggest stores and track price drops with GreedyCart.",
  applicationName: SITE_NAME,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_IN",
    url: "/",
    title: "GreedyCart — Compare Prices Across India's Top Stores",
    description: "Find the lowest price and track drops across Amazon, Flipkart, Myntra, JioMart and Tata CLiQ.",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#e11d48",
};
```

### 6.2 Per-route metadata (`src/app/(pages)/about/page.tsx`)
```tsx
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "About",
  description: "How GreedyCart compares prices, calculates the GreedyScore and earns revenue.",
  alternates: { canonical: "/about" },
  openGraph: { url: "/about" },
};
```

### 6.3 Money helper (`src/lib/format.ts`)
```ts
const inr = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });
export const formatINR = (rupees: number) => inr.format(rupees);
export const discountPct = (current: number, original: number) =>
  original > 0 && current < original ? Math.round(((original - current) / original) * 100) : 0;
```

### 6.4 Score helper (`src/lib/score.ts`)
```ts
export type ScoreInput = { current: number; original: number; vendorReliability: number; historyPercentile?: number };
const clamp = (n: number, lo = 0, hi = 10) => Math.min(hi, Math.max(lo, n));
export function computeGreedyScore({ current, original, vendorReliability, historyPercentile }: ScoreInput): number {
  const pct = original > 0 ? ((original - current) / original) * 100 : 0;
  const discount = clamp(pct / 4);              // 40% off => 10
  const vendor = clamp(vendorReliability);       // 0..10 from registry
  const hasHist = typeof historyPercentile === "number";
  const hist = hasHist ? clamp((1 - historyPercentile!) * 10) : 0; // lower price percentile => better
  const w = hasHist ? { d: 0.6, v: 0.25, h: 0.15 } : { d: 0.7, v: 0.3, h: 0 };
  return Math.round(clamp(discount * w.d + vendor * w.v + hist * w.h) * 10) / 10;
}
```

### 6.5 Accessible price tag (`src/components/PriceTag.tsx`)
```tsx
import { formatINR, discountPct } from "@/lib/format";
export function PriceTag({ current, original }: { current: number; original: number }) {
  const pct = discountPct(current, original);
  return (
    <p className="flex flex-wrap items-baseline gap-x-2">
      <span className="text-xl font-bold"><span className="sr-only">Current price </span>{formatINR(current)}</span>
      {pct > 0 && (
        <>
          <s className="text-sm text-neutral-500"><span className="sr-only">Original price </span>{formatINR(original)}</s>
          <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-xs font-semibold text-emerald-900">{pct}% off</span>
        </>
      )}
    </p>
  );
}
```

### 6.6 Outbound link helper (`src/lib/vendors.ts`)
```ts
export type VendorId = "amazon" | "flipkart" | "myntra" | "jiomart" | "tatacliq";
export const VENDORS: Record<VendorId, { label: string; host: string; reliability: number; tagEnv?: string }> = {
  amazon:   { label: "Amazon.in",  host: "https://www.amazon.in",    reliability: 9.0, tagEnv: "AMAZON_TAG" },
  flipkart: { label: "Flipkart",   host: "https://www.flipkart.com", reliability: 8.8 },
  myntra:   { label: "Myntra",     host: "https://www.myntra.com",   reliability: 8.6 },
  jiomart:  { label: "JioMart",    host: "https://www.jiomart.com",  reliability: 8.0 },
  tatacliq: { label: "Tata CLiQ",  host: "https://www.tatacliq.com", reliability: 8.4 },
};
export function outboundUrl(vendor: VendorId, query: string): string {
  const v = VENDORS[vendor];
  const q = encodeURIComponent(query);
  const base = vendor === "amazon" ? `${v.host}/s?k=${q}` : `${v.host}/search?q=${q}`;
  const tag = v.tagEnv ? process.env[v.tagEnv] : undefined;
  return tag ? `${base}&tag=${encodeURIComponent(tag)}` : base;
}
export const OUTBOUND_REL = "sponsored nofollow noopener noreferrer";
```

### 6.7 Not-found page (`src/app/not-found.tsx`)
```tsx
import Link from "next/link";
export default function NotFound() {
  return (
    <main id="content" className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="text-3xl font-bold">We couldn't find that page</h1>
      <p className="mt-3 text-neutral-600">The link may be broken or the page may have moved.</p>
      <div className="mt-8 flex justify-center gap-3">
        <Link href="/" className="rounded bg-rose-600 px-4 py-2 font-semibold text-white">Go home</Link>
        <Link href="/search" className="rounded border px-4 py-2 font-semibold">Search products</Link>
      </div>
    </main>
  );
}
```

### 6.8 Sitemap and robots
```ts
// src/app/sitemap.ts
import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = ["", "/about", "/contact", "/help", "/methodology", "/privacy", "/terms", "/affiliate-disclosure"];
  return routes.map((r) => ({ url: `${SITE_URL}${r}`, lastModified: now }));
}
// src/app/robots.ts
import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/out/", "/alerts"] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
```

### 6.9 Zod-validated search API (`src/app/api/search/route.ts`)
```ts
import { NextResponse } from "next/server";
import { z } from "zod";
const Query = z.object({ q: z.string().trim().min(2).max(100) });
export async function GET(req: Request) {
  const parsed = Query.safeParse(Object.fromEntries(new URL(req.url).searchParams));
  if (!parsed.success) {
    return NextResponse.json({ error: { code: "BAD_QUERY", message: "Query must be 2–100 characters." } }, { status: 400 });
  }
  const result = await searchProducts(parsed.data.q.normalize("NFKC").toLowerCase());
  return NextResponse.json(result, {
    headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" },
  });
}
```

### 6.10 Zustand watchlist with safe persistence
```ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
type State = { ids: string[]; toggle: (id: string) => void; has: (id: string) => boolean };
export const useWatchlist = create<State>()(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (id) => set((s) => ({ ids: s.ids.includes(id) ? s.ids.filter((x) => x !== id) : [...s.ids, id] })),
      has: (id) => get().ids.includes(id),
    }),
    {
      name: "greedycart-watchlist",
      version: 1,
      skipHydration: true, // call useWatchlist.persist.rehydrate() in a client effect
      storage: createJSONStorage(() => { try { return localStorage; } catch { return sessionStorage; } }),
    },
  ),
);
```

### 6.11 Security headers (`next.config.ts` excerpt)
```ts
const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];
// export default { async headers() { return [{ source: "/:path*", headers: securityHeaders }]; } };
```

---

## 7. TESTING AND VERIFICATION PLAN

### 7.1 Unit tests (Vitest)
- `format.test.ts`: `formatINR`, `discountPct` (0 discount, negative, equal prices, big numbers).
- `score.test.ts`: range, monotonicity, one-decimal, with/without history.
- `deals.test.ts`: section filtering, no duplicate IDs across sections, min discount threshold.
- `promos.test.ts`: active window logic incl. Asia/Kolkata boundaries and year rollover.
- `search-route.test.ts`: 400 on short/long/empty `q`; deterministic output; cache header present.
- `env.test.ts`: env validation fails fast in live mode with missing keys.

### 7.2 Component tests (React Testing Library + jest-axe)
- `ProductCard`: renders one heading, link with accessible name, PriceTag semantics, watchlist toggle
  has `aria-pressed`, no `<img>` without alt semantics.
- `Carousel`: keyboard nav, pause control, reduced-motion behaviour, aria roles.
- `NewsletterForm`: validation, success, error, honeypot.

### 7.3 Link and crawl checks
```
npx linkinator http://localhost:3000 --recurse --skip "amazon|flipkart|myntra|jiomart|tatacliq"
```
Expect 0 broken internal links. Add to CI.

### 7.4 Metadata uniqueness script
Write `scripts/check-meta.mjs` that reads the sitemap, fetches each URL from a running server, and
asserts: one `<h1>`, unique `<title>`, unique description, canonical present and equals the URL,
`og:image` present, `lang="en-IN"`. Exit non-zero on failure.

### 7.5 Placeholder guard
`scripts/check-placeholders.mjs`: fail if `src/`, `public/` or `content/` contains
`lorem ipsum|adipisicing|Coding Journey|Fine Smile|Air Solo Bass|TODO: replace|amazon\.com`.

### 7.6 Lighthouse CI budgets (`lighthouserc.json`)
- Performance ≥ 0.85, Accessibility ≥ 0.95, Best Practices ≥ 0.95, SEO ≥ 0.95 on `/`, `/about`,
  a category page and a product page (mobile emulation, simulated 4G).
- LCP ≤ 2.5 s, CLS ≤ 0.1, TBT ≤ 200 ms.

### 7.7 End-to-end (Playwright) scenarios
1. Home loads; exactly one H1; demo badge visible in demo mode; no console errors.
2. Click a hero CTA → product page loads with offers table sorted ascending; cheapest highlighted.
3. Search "iphone" via header and via `/` shortcut → results; empty query shows guidance.
4. Toggle watchlist heart → count updates → reload → persists; no hydration warnings.
5. Open Quick View from a card → focus trapped → ESC closes → focus returns.
6. Footer links: About, Contact, Privacy, Terms, Disclosure all 200; `/blog` either 200 or absent.
7. `/does-not-exist` → branded 404 with status 404.
8. Newsletter: invalid email error; valid email success; 6th request in a minute → 429 message.
9. Viewports 360/768/1280: no horizontal scroll (`document.scrollingElement.scrollWidth <= innerWidth`).
10. Keyboard-only run through header, search, first card, modal.

### 7.8 Accessibility checks
`@axe-core/playwright` on `/`, `/about`, `/search?q=iphone`, `/category/laptops`, `/product/<id>`, the
modal, `/contact`, `/privacy`. Zero `serious`/`critical` violations. Record manual screen-reader
notes (NVDA + Firefox, VoiceOver + Safari) in `docs/A11Y.md`.

### 7.9 Manual regression checklist (run before declaring done)
- [ ] No text says "live", "real-time", "every minute", "AI" without being true.
- [ ] Demo badge visible (demo mode) on home, category, product, search.
- [ ] No lorem ipsum, template credits or stale seasonal promos anywhere.
- [ ] All header/footer/hero/card/tile CTAs navigate somewhere real.
- [ ] Each product appears once per page; sections match their headings.
- [ ] Prices formatted `₹1,48,900`, with % off, accessible strikethrough.
- [ ] Outbound links use Indian domains, `rel="sponsored nofollow noopener noreferrer"`.
- [ ] Unique title/description/canonical/OG per route; OG image renders.
- [ ] `sitemap.xml`, `robots.txt` present; demo pages noindex.
- [ ] Lighthouse scores meet budgets; axe clean.
- [ ] Privacy, Terms, Affiliate Disclosure pages live and linked.

---

## 8. FINAL REPORT FORMAT (you must output this when finished)

Produce `docs/REMEDIATION_REPORT.md` and also print it. Structure:

1. **Summary** — 5–10 lines: what changed, what remains.
2. **Provenance result** — which repo/branch/Vercel project maps to greedycart.vercel.app.
3. **Issue table** — one row per issue ID: `ID | Status (Fixed / Partially / Not applicable / Deferred
   / Audit was wrong) | Files changed | Evidence (test name, screenshot, command output) | Notes`.
4. **Audit corrections** — every `LIKELY`/`VERIFY` item that turned out wrong or different.
5. **Before/after metrics** — Lighthouse (perf/a11y/SEO/BP), LCP/CLS/TBT, first-load JS, DOM node
   count on `/`, number of axe violations, broken internal links.
6. **New environment variables** — name, purpose, default, required-in-live.
7. **Decisions and assumptions** — mirrored from `docs/DECISIONS.md`.
8. **Follow-ups** — items needing human input: legal review of policies, real data provider choice
   (SerpApi / Rainforest / Keepa / custom scraping with ToS review), affiliate programme sign-ups,
   custom domain, logo licensing, real product photography.

---

## 9. THINGS YOU MUST NOT DO

- Do not scrape Amazon/Flipkart/Myntra/etc. in ways that violate their Terms of Service or robots
  rules. Real data must come from permitted APIs/affiliate feeds or licensed providers; document the
  choice.
- Do not present fabricated prices, discounts, reviews or scores as real.
- Do not remove content to "pass" a check without replacing it with something truthful.
- Do not disable lint/type rules or add `// eslint-disable` to make errors vanish.
- Do not add tracking/analytics that fire before consent where consent is required.
- Do not leave TODOs without an issue ID and an owner in `docs/DECISIONS.md`.
- Do not squash the whole effort into one giant commit.
- Do not assume this audit is perfect: when the code disagrees with the audit, trust the code and report it.

---

## 10. APPENDIX A — QUICK CROSS-REFERENCE OF OBSERVED LIVE STRINGS TO FIX

| Observed live string / element | Issue IDs |
|---|---|
| "Help Center" → `/`, "Track Alerts" → `/` | B1 |
| "Compare" (nav) | B8 |
| Hero: "Top Selling / Massive Price Drop / Deal of the Day" | A5, D1–D4 |
| Hero CTAs "Track Price / Compare Prices / View Offers" | B2 |
| Alt text "LAPTOPS", "HEADPHONES", "VIRTUAL" | D3, I3 |
| "Shop by Top Platforms" + 6 mixed tiles + "Find Deals" | A6, B4, D7 |
| "Lowest Prices — Aggregated" | A6, M6 |
| "Trending Price Drops 🔥" grid | A4, C1–C8 |
| "Top Gadgets & Tech 💻" grid (same 14 products) | C1 |
| "Fashion & Apparel 👕" grid (same 14 products) | C1 |
| "Home & Kitchen Appliances 🏠" grid (same 14 products) | C1 |
| "Score: 9" vs "Score: 9.8" | C6 |
| "₹1,48,900₹1,59,900" | C3 |
| "3 Stores" with one store shown | C4 |
| Unsplash product photos | C5, J2 |
| "Real-Time Tracking — We scan prices every minute." | A1, A2 |
| "GreedyScore Rating — Our AI rates the quality of the deal." | A3 |
| "Deal Alerts — Get notified when prices drop." | G4 |
| "30% OFF / Fine Smile / 10 Jan to 28 Jan / Air Solo Bass / Winter Sale" | E3 |
| "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque reiciendis" | E1 |
| "Shop Now" → `amazon.com/s?k=headphones` | B10, E6 |
| Footer blurb "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores alias cum" | E2 |
| "Made with 💖 by The Coding Journey" | E4 |
| Footer "Important Links" = "Quick Links" | B9 |
| `/contact` 404, `/blog` 404 | B5 |
| `/about` single sentence | B6, E7 |
| Title vs OG title mismatch; "Greedy Cart" vs "GreedyCart" | H2, M5 |
| Same metadata and `og:url` on `/about` | H1 |
| No `og:image` | H3 |
| Newsletter copy "free giveaways, once-in-a-lifetime deals" | E5 |
| Repo description "Front-end Starter for building any E-commerce website" | L3 |
| README deployment URL differs from audited URL | H6, Section 1.2 |
| `.agents/.claude/.cursor/.devin` skill folders, `scratch/` | L1, L2 |

---

## 11. APPENDIX B — SUGGESTED `AGENTS.md` CONTENT AFTER THE WORK

```
# GreedyCart — Agent Guide
- Stack: Next.js (App Router) + TypeScript + Tailwind v4 + Zustand + Framer Motion + Prisma.
- Always read the docs for the INSTALLED Next.js version before using an API.
- Data mode: NEXT_PUBLIC_DATA_MODE=demo|live. In demo mode never present prices as real.
- Commands: npm run dev | lint | typecheck | test | test:e2e | build | analyze.
- Rules: one <h1> per page; all CTAs are real <a>/<button>; money via formatINR; categories via enum;
  outbound links via outboundUrl() with rel="sponsored nofollow noopener noreferrer".
- Never commit secrets. Never add lorem ipsum. Never hard-code seasonal promos.
- Before finishing any task: lint + typecheck + unit tests + build must pass.
```

## 12. APPENDIX C — QUESTIONS TO ANSWER BY READING THE CODE (record answers in the report)

1. Which Vercel project/branch deploys `greedycart.vercel.app`? Is it the same repo as
   `e-commerce-lac-sigma-69.vercel.app`?
2. Is there a search input anywhere in the DOM? Where is it hidden/disabled?
3. Are the hero CTAs and card CTAs `<button>` with handlers? What do the handlers do?
4. Where does the homepage get its 14 products, and why do four sections render the same list?
5. Is the carousel a custom implementation or a library? Are clones rendered as real DOM?
6. Which components are `"use client"`? Which could be Server Components?
7. Is Zustand persisted? Any hydration warnings in the dev console?
8. Does `/api/search` exist, what does it return, and is it used by the UI at all?
9. Is `prisma/` wired to a database? Which env vars are expected?
10. What lives in `scratch/`, `.agents/skills`, `.claude/skills`, `.cursor/skills`, `.devin/skills`?
11. Do `robots.txt`, `sitemap.xml`, `favicon`, `manifest` exist?
12. What are the exact response headers on `/` (CSP, HSTS, etc.)?
13. Which images are in `public/` and what are their sizes?
14. Is there any analytics, tracking or cookie usage?
15. Are there any TODO/FIXME/console.log statements in `src/`?

END OF PROMPT
