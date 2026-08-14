# G sa Marikina | Project Handoff

Last updated: 2026-08-15

This document captures the full context of the project so any future session
can pick up without re-deriving decisions.

---

## What this is

**G sa Marikina** is a hyperlocal food discovery and review platform for
Marikina City, Philippines. Small food businesses (home bakers, milk tea shops,
karinderyas, street-food vendors) get a shareable page with photos, menu,
location, and reviews. Consumers browse, search, explore the map, and review
local spots. An admin dashboard lets the curator approve submissions and
moderate reviews.

**Origin:** the founder noticed the gap while scrolling their own feed. Validated
with one real user (a friend who sells cookies across FB groups).

**Current status:** Demo-complete. Deployed on Vercel (currently paused). Repo
is public on GitHub at `github.com/gtapp1/G-sa-Marikina`. Submitted to Devpost.

---

## Planning artifacts

| File | Purpose |
|------|---------|
| `docs/design-doc.md` | Product + technical design (problem, demand evidence, phased approach, tech stack, data model, success criteria) |
| `DESIGN.md` | Visual design system (Resy-inspired, Sora font, orange accents) |
| `docs/backend-setup.md` | Step-by-step to wire Clerk + Supabase and run |
| `docs/demo-script.md` | Step-by-step demo video recording guide (12 scenes, ~3 min) |
| `docs/devpost-submission.md` | Devpost submission draft |
| `TODO.md` | Prioritized backlog of remaining work |
| `README.md` | Public-facing repo documentation |
| This file (`HANDOFF.md`) | Current state, gaps, and context for future sessions |

---

## Tech stack

| Layer | Choice | Pin reason |
|-------|--------|-----------|
| Framework | Next.js 16 (App Router) | |
| Language | TypeScript 5 | Pin to `^5`; v7 untested |
| Styling | Tailwind CSS v4 | Tokens in `:root`, NOT `@theme` |
| Icons | Phosphor Icons v2 | SSR path: `@phosphor-icons/react/dist/ssr` |
| Maps | MapLibre GL JS v5 + react-map-gl v8 | Pin maplibre `^5`; v6 breaks react-map-gl v8 |
| Auth | Clerk v6 | Pin `^6`; v7 removes `SignedIn`/`SignedOut` exports |
| Database | Supabase (PostgreSQL) | Transaction pooler port 6543 for Vercel |
| ORM | Drizzle ORM | |
| Validation | Zod | |
| Email | Resend | Configured, not yet triggered |
| Images | Cloudinary | Demo URLs only |
| Hosting | Vercel | Auto-deploy on push to main |
| Font | Sora | Headings + body |

---

## Current state

Build is green. 31+ routes. Deployed on Vercel (paused for demo submission).

### Phase 1 (Static catalog): DONE
- Homepage with featured spot, category pills, enlarged listing grid
- Listing detail (photo, menu, editorial review, reviews, location map, share)
- Map with category pins, popups, sidebar
- Categories (enlarged cards)
- Search + filter (keyword, category, barangay, rating)
- Near Me (geolocation sort with fallback)
- Collections (Top Rated, Hidden Gems, Just Added)
- SEO (JSON-LD, OG, sitemap, robots)
- Legal pages (terms, privacy, guidelines)
- Barangay dropdown in nav (all 16 official barangays)

### Phase 2 (Backend): DONE
- Clerk auth (sign-in, sign-up, proxy middleware)
- Supabase + Drizzle schema (users, businesses, reviews)
- Clerk webhook user sync (svix-verified, fallback upsert)
- Reviews API (GET + POST, auth-gated, Zod-validated)
- Business submission form (stored as pending)
- Owner dashboard (live review count, average rating from DB)

### Phase 3 (Growth): PARTIAL
- Admin dashboard (stats, approve/reject submissions, moderate reviews)
- Near Me geolocation
- Curated collections
- Share button (Web Share API + clipboard)

---

## What's NOT done (prioritized)

**P1: Blocks the platform loop**
- Catalog not unified with DB. Browse surfaces read `src/data/listings.ts` only. Approved submissions don't appear on the site. The submit/approve/discover loop is broken.
- One-review-per-user constraint missing.

**P2: Pre-launch**
- Review aggregates on cards show seed values, not DB averages.
- No Cloudinary upload widget (photos[] columns exist).
- 7 sample listings with placeholder images. Need 20-30 real spots.
- No rate limiting on POST /api/reviews.
- No automated test suite.

**P3: Growth**
- Trending feed (needs real traffic data).
- Claim-your-business flow.
- Email notifications via Resend.
- Warm-toned custom map tiles.

---

## Environment variables

All required for the platform to function:

| Variable | Source |
|----------|--------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk API Keys |
| `CLERK_SECRET_KEY` | Clerk API Keys |
| `CLERK_WEBHOOK_SECRET` | Clerk Webhooks endpoint Signing Secret |
| `DATABASE_URL` | Supabase Project Settings, Database URI (pooler, port 6543) |
| `NEXT_PUBLIC_SITE_URL` | Your domain or `http://localhost:3000` |

Set in `.env.local` for local dev (gitignored). Set in Vercel Settings for production.

The layout includes a build-safe Clerk key fallback so `next build` succeeds
without env vars. Auth only works when the real key is present at runtime.

---

## Setup and run

```bash
git clone https://github.com/gtapp1/G-sa-Marikina.git
cd G-sa-Marikina
npm install
cp .env.example .env.local   # fill in real values
npm run db:push              # create tables
npm run db:seed              # load 7 sample listings
npm run dev                  # http://localhost:3000
```

---

## Admin access

1. Sign in to the app (creates your user row via fallback upsert).
2. Set your role to admin:
   ```sql
   UPDATE users SET role = 'admin' WHERE email = 'your-email@example.com';
   ```
   Or use `npm run db:studio` and edit the row directly.
3. Visit `/admin`. The nav shows an "Admin" link when signed in.

---

## Key files

```
src/
  app/
    layout.tsx                 ClerkProvider + Sora fonts + NavBar + Footer
    page.tsx                   Homepage (hero, categories, all spots grid)
    [slug]/page.tsx            Listing detail (static SSG)
    map/page.tsx               Map view
    search/page.tsx            Search + filters
    categories/, category/[id] Category pages
    collections/               Curated collections
    near-me/                   Geolocation discovery
    dashboard/page.tsx         Owner dashboard (auth, DB)
    for-businesses/new/        Submit a spot (auth, server action)
    admin/page.tsx             Admin dashboard (admin role, DB)
    admin/actions.ts           Approve/reject/keep/remove server actions
    sign-in/, sign-up/         Clerk auth pages
    terms/, privacy/, guidelines/ Legal pages
    api/reviews/route.ts       Reviews GET + POST
    api/webhooks/clerk/route.ts Clerk user sync
    sitemap.ts, robots.ts
  components/                  Shared UI
  data/
    listings.ts                Static catalog (7 spots)
    barangays.ts               All 16 official Marikina barangays
  db/
    schema.ts                  Drizzle schema
    index.ts                   Lazy DB client
  lib/
    current-user.ts            Clerk to DB user resolver
    distance.ts                Haversine for Near Me
    collections.ts             Derived collections
  types/listing.ts             Zod schema + Category enum
  middleware.ts                Clerk route protection (/dashboard, /for-businesses/new, /admin)
scripts/seed.ts                DB seed script
docs/
  design-doc.md, backend-setup.md, demo-script.md, devpost-submission.md
```

---

## Data model

```
users       | clerk_id (unique), email, display_name, role (consumer/business_owner/admin)
businesses  | slug (unique), name, category, barangay, lat/lng, photos[], status (pending/published/rejected), owner_id
reviews     | business_id, business_slug, user_id, rating (1-5), body, photos[], is_reported
```

Auth model: Clerk owns identity. DB owns app data joined by `clerk_id`.
`DATABASE_URL` is server-only. Never expose to client.

---

## Gotchas (learned the hard way)

1. **Tailwind v4 token naming:** custom tokens named `--spacing-lg` or `--radius-md` inside `@theme` silently override Tailwind's `max-w-lg` / `rounded-md` scales. Keep tokens in `:root` only.

2. **Dependency versions pinned for a reason:** Clerk `^6` (v7 breaks imports), maplibre-gl `^5` (v6 breaks react-map-gl v8), TypeScript `^5` (v7 untested). Always specify a range when installing.

3. **Never rewrite package.json wholesale.** A full rewrite once dropped the dependencies block. Edit surgically.

4. **Don't install packages while dev server is running.** The server locks `.node` binaries and npm corrupts node_modules with EPERM errors.

5. **Phosphor icon types:** `Icon`/`IconProps` types differ by import path. Use locally-defined prop types in `category-icon.tsx`. SSR: `@phosphor-icons/react/dist/ssr`. Client: `@phosphor-icons/react`.

6. **Build without DB is fine.** `src/db/index.ts` lazily connects. Static pages compile without `DATABASE_URL`. DB routes are `force-dynamic` or client-fetched.

7. **Clerk build-safe fallback:** `layout.tsx` passes an explicit `publishableKey` to `ClerkProvider` with a dummy fallback so prerendering `/_not-found` never crashes. Real key wins at runtime.

8. **middleware.ts vs proxy.ts:** Next.js 16 deprecated `middleware.ts` in favor of `proxy.ts`. The rename fixes `MIDDLEWARE_INVOCATION_FAILED` on Vercel. Currently using `middleware.ts` (still works, shows a deprecation warning in build logs).

9. **Design system divergence:** The codebase went through multiple design passes (original DESIGN.md warm-market tokens, then a Resy-inspired redesign). The current source of truth is `globals.css`. Some components reference both naming conventions. Missing tokens are bridged via CSS aliases in `globals.css`.

---

## Deploy

Target: Vercel (auto-deploy on push to `main`).

1. Set all 5 env vars in Vercel Settings (all environments).
2. Set up the Clerk webhook (see `docs/backend-setup.md` step 4).
3. Unpause the project when ready to go live.

Current state: deployed but paused (demo mode).
