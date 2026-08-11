# G sa Marikina — Project Handoff

Last updated: 2026-08-12

This document captures the full context of the project so anyone (or any future
session) can pick up where we left off without re-deriving decisions.

---

## What this is

**G sa Marikina** is a hyperlocal food discovery and review platform for
Marikina City, Philippines. Small food businesses (home bakers, milk tea shops,
karinderyas, street-food vendors) get a shareable page with photos, menu,
location, and reviews. Consumers browse, search, map, and review local spots.

**Why it exists:** small Marikina food sellers make good products but can't get
discovered. Their marketing is scattered across Facebook groups, campus pages,
and tarpaulin signs, with no single persistent home. This gives every spot one
link.

**Origin:** founder noticed the gap while scrolling their own feed. Validated
with one real user (a friend who sells cookies across FB groups).

---

## Planning artifacts (read these for the "why")

- `docs/design-doc.md` — the approved product + technical design (problem,
  demand evidence, phased approach, tech stack, data model, success criteria).
  Produced via a YC-office-hours-style session.
- `DESIGN.md` — the visual design system (source of truth for colors, type,
  spacing, components, icons, anti-slop rules).
- `docs/backend-setup.md` — step-by-step to wire up Clerk + Supabase and run.
- This file (`HANDOFF.md`) — current state, gaps, and next steps.

The project went through: `/office-hours` (validate idea) → `/plan-eng-review`
(lock architecture) → `/plan-design-review` (lock UI/UX) → implementation across
3 phases. UI/UX passes applied an anti-slop frontend skill.

---

## Tech stack (committed, do not re-litigate)

| Layer | Choice | Notes |
|-------|--------|-------|
| Framework | Next.js 16 (App Router) | pinned `^16.3.0` |
| Language | TypeScript 5 | pinned `^5` (do NOT let npm pull TS 7) |
| Styling | Tailwind CSS v4 | tokens live in `:root` in `globals.css`, NOT in `@theme` (see gotcha below) |
| UI components | shadcn/ui pattern (hand-rolled so far) | |
| Icons | `@phosphor-icons/react` v2 | one family, no emoji in UI |
| Maps | MapLibre GL JS v5 + `react-map-gl` v8 | OpenStreetMap tiles, no API key. Pinned maplibre `^5` (v6 breaks react-map-gl v8) |
| Auth | Clerk v6 | pinned `^6` (v7 moved `SignedIn`/`SignedOut` exports and breaks our imports) |
| Database | Supabase Postgres | |
| ORM | Drizzle ORM | |
| Validation | Zod | |
| Email | Resend | planned, not yet wired |
| Images | Cloudinary | demo URLs only so far |
| Hosting | Vercel | not yet deployed |

**Design direction:** "Warm Market" — warm orange (#F97316) + cream (#FFFBF5),
Plus Jakarta Sans (headings) + Inter (body). Food photos are the visual hero.

---

## Current state — what's built and working

Build is green: `npm run build` → 27 routes.

### Phase 1 — Static catalog (DONE)
- Homepage: photo hero, quick-explore chips (Near me / Collections), category
  pills, Featured spots, Recently added
- Listing detail page (`/[slug]`): hero photo, category, rating, photo gallery,
  menu, "Our take", reviews section, location mini-map + directions, share
- Map page (`/map`): full MapLibre map, category-icon pins, tap → popup → view
- Categories (`/categories`, `/category/[id]`) with warm empty states
- Search + filter (`/search`): by name/dish/barangay, category/area/rating filters
- SEO: JSON-LD LocalBusiness per listing, OG tags, `sitemap.ts`, `robots.ts`
- Responsive nav: desktop top bar (underline active), mobile floating dock +
  slim mobile top bar with auth
- Accessibility: focus-visible outline, prefers-reduced-motion, aria labels,
  44px touch targets
- Loading skeletons, 404 page

### Phase 2 — Backend / open platform (DONE, needs keys)
- Clerk auth: `ClerkProvider`, `middleware.ts` (protects `/dashboard`,
  `/for-businesses/new`), `/sign-in`, `/sign-up`
- Supabase + Drizzle: schema in `src/db/schema.ts` (`users`, `businesses`,
  `reviews` + enums), lazy client in `src/db/index.ts`
- Clerk → Supabase user sync webhook: `/api/webhooks/clerk` (svix-verified).
  Fallback upsert in `src/lib/current-user.ts` means auth works even before the
  webhook is configured.
- Reviews: `GET/POST /api/reviews` (auth-guarded, Zod-validated) + `Reviews`
  client component on listing pages
- Business submissions: `/for-businesses/new` (server action, stored as
  `pending`)
- DB scripts: `db:push`, `db:generate`, `db:migrate`, `db:studio`, `db:seed`

### Phase 3 — Growth features (PARTIAL)
- Owner dashboard (`/dashboard`): owner's spots + status + live review
  count/avg from DB
- Near Me (`/near-me`): geolocation sort by distance, graceful fallback to
  top-rated
- Collections (`/collections`): Top rated, Hidden gems, Just added (derived
  from data)

---

## What's NOT done (prioritized)

**1. Catalog is not unified with the DB (highest priority).**
Every browse surface (home, search, map, categories, near-me, collections, and
`/[slug]`) reads from the **static** `src/data/listings.ts`. The DB only powers
reviews, submissions, and the dashboard. Consequence: an approved owner
submission does NOT appear anywhere on the site and has no detail page. The
submit → approve → discover loop is currently a dead end. Fix: make the catalog
read published businesses from the DB (or merge static + DB) and make `/[slug]`
resolve DB businesses.

**2. No curator approval tool.** `pending` businesses can only be published by
hand via `db:studio`. Needs an admin page gated on the `admin` role (already in
schema).

**3. Review aggregates are fake.** Cards/listing headers show the seed
`rating`/`reviewCount`, not an average computed from DB reviews.

**4. Photo uploads not built.** `photos[]` columns exist; no Cloudinary upload
UI for reviews or submissions. Listings use Cloudinary demo URLs.

**5. Trending feed** (Phase 3 design item) — needs Vercel Analytics page-view
data + real traffic.

**6. Smaller gaps:** "claim existing business" flow, Resend review
notifications, one-review-per-user constraint, rate limiting on review POST,
warm-toned custom map tiles, no automated tests.

**7. Content (owner's task):** real food photos + 20-30 real Marikina listings.

**Recommended next chunk:** #1 → #2 → #3 (makes the platform actually function
end-to-end), then automated tests.

---

## Setup & run

```
cp .env.example .env.local        # then fill in real values
npm install
npm run db:push                   # create tables (needs DATABASE_URL)
npm run db:seed                   # load sample catalog
npm run dev                       # http://localhost:3000
```

### Environment status
- `.env.local` exists with the user's real Supabase + Clerk keys.
- **Remaining:** `CLERK_WEBHOOK_SECRET` (set up the Clerk webhook endpoint —
  see `docs/backend-setup.md` step 4). NOT required to test reviews/dashboard
  locally (fallback upsert covers it).
- The `.env.local` originally shipped a DUMMY Clerk publishable key so the build
  could complete without secrets. Confirm real keys are in place.

### How to test
See the manual test checklist in this repo's chat handoff / `docs/backend-setup.md`.
Quick version: browse everything logged out, then sign up → post a review →
submit a business → check `/dashboard`.

---

## Important gotchas (learned the hard way)

1. **Tailwind v4 token naming.** Do NOT put custom tokens named `--spacing-lg`,
   `--radius-md`, etc. inside `@theme` — they collide with Tailwind's built-in
   `max-w-lg` / `rounded-md` scales and silently shrink them (this collapsed the
   hero to one word per line). All custom tokens live in `:root` in
   `globals.css` and are used via arbitrary values like
   `bg-[var(--color-primary)]`.

2. **Dependency versions are pinned for a reason.** Clerk `^6` (v7 breaks
   imports), maplibre-gl `^5` (v6 breaks react-map-gl v8), TypeScript `^5`
   (v7 is the new Go compiler, untested here). If you run `npm install <pkg>`
   without a range, npm may pull a breaking major.

3. **Never rewrite `package.json` wholesale.** A full rewrite once dropped the
   `dependencies` block and a concurrent install pruned `node_modules`. Edit
   surgically. If deps ever vanish, reinstall by name (npm re-resolves).

4. **Don't run installs while `npm run dev` is running** — the dev server locks
   `.node` binaries (next-swc, lightningcss, tailwind-oxide) and installs fail
   with EPERM, corrupting `node_modules`.

5. **Phosphor icon types.** `IconProps` / `Icon` type exports differ by import
   path; we define minimal local prop types in `category-icon.tsx` instead of
   importing Phosphor's types. Icon component names (Cookie, Coffee, etc.) work
   fine; the SSR path is `@phosphor-icons/react/dist/ssr` (use in server
   components), the client path is `@phosphor-icons/react`.

6. **Build without a live DB is fine.** `src/db/index.ts` lazily connects, and
   DB-reading routes are dynamic (`force-dynamic`) or client-fetched, so
   `next build` succeeds without `DATABASE_URL`. The catalog stays SSG.

7. **`middleware.ts` deprecation warning** in Next 16 (wants `proxy.ts`). It
   still works; left as-is to avoid risking Clerk integration. Migrate later.

---

## Key files map

```
src/
  app/
    layout.tsx                     ClerkProvider + fonts + NavBar
    page.tsx                       homepage
    globals.css                    design tokens (:root) + a11y
    [slug]/page.tsx                listing detail (static + Reviews)
    map/page.tsx                   map page
    categories/, category/[id]/    category browse
    search/page.tsx                search + filters
    near-me/page.tsx               geolocation discovery
    collections/page.tsx           curated collections
    about/page.tsx
    dashboard/page.tsx             owner dashboard (DB, dynamic)
    for-businesses/new/            submit a spot (page + form + action)
    sign-in/, sign-up/             Clerk pages
    api/reviews/route.ts           reviews GET/POST
    api/webhooks/clerk/route.ts    user sync webhook
    sitemap.ts, robots.ts
  components/
    nav-bar, listing-card, category-pills, category-icon,
    photo-placeholder, photo-gallery, star-rating, share-button,
    food-map, listing-location, reviews, search-filters, near-me,
    listing-card-skeleton
  data/listings.ts                 static catalog (7 sample spots, source of truth for browse)
  db/schema.ts, db/index.ts        Drizzle schema + client
  lib/current-user.ts              Clerk→DB user resolver (with fallback upsert)
  lib/distance.ts                  haversine for Near Me
  lib/collections.ts               derived collections
  types/listing.ts                 Zod schema + Category enum + labels
  middleware.ts                    Clerk route protection
scripts/seed.ts                    static catalog → DB seed
drizzle.config.ts
```

---

## Data model (Phase 2)

- `users` (clerk_id unique join key, email, display_name, role: consumer/
  business_owner/admin)
- `businesses` (slug unique, category enum, barangay, lat/lng, photos[],
  status: pending/published/rejected, is_claimed, owner_id → users)
- `reviews` (business_id → businesses, business_slug denormalized, user_id →
  users, rating 1-5, body, photos[], is_reported)

Auth model: Clerk owns identity; our DB owns app data, joined by `clerk_id`.
Authorization is enforced in server code (route handlers + server actions check
Clerk auth). `DATABASE_URL` is server-only (no `NEXT_PUBLIC_`), bypasses RLS, so
keep it server-side.

---

## Deploy (when ready)

Not yet deployed. Target: Vercel (auto-deploy on git push). Before shipping:
set all env vars in Vercel, point the Clerk webhook at the production URL, and
secure the domain (gsamarikina.com). See the design doc's Distribution Plan.
