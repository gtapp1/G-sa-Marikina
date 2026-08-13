<div align="center">

# G sa Marikina

A food directory for Marikina City, Philippines.

[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Clerk](https://img.shields.io/badge/Auth-Clerk-6C47FF?style=flat-square&logo=clerk&logoColor=white)](https://clerk.com)
[![Supabase](https://img.shields.io/badge/Database-Supabase-3ECF8E?style=flat-square&logo=supabase&logoColor=white)](https://supabase.com)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)](https://vercel.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-F97316?style=flat-square)](./LICENSE)

<br/>

<!-- Replace these placeholders with real screenshots.
     Save images to docs/screenshots/ and update the src paths.
     Recommended sizes: homepage 1440×900, map 1440×900, listing 1440×900 -->

| Homepage | Map | Listing |
|:---:|:---:|:---:|
| ![Homepage](docs/screenshots/homepage.png) | ![Map](docs/screenshots/map.png) | ![Listing](docs/screenshots/listing.png) |

</div>

---

## Problem

Small food businesses in Marikina City cannot get found online. Home bakers, milk tea shops, karinderyas, and street vendors post the same photos to multiple Facebook groups every day. Each post gets buried within hours. There is no single place where a business owner can send a customer.

This platform gives each business one URL. The URL shows photos, a menu, a location map, contact buttons, and customer reviews. Consumers use the platform to browse, search by barangay, and explore the map.

---

## Features

**Browse**

- Homepage with a featured spot, category filters, and a full listing grid
- Map view with category pins, popup previews, and a sidebar list
- Search by keyword, category, barangay, or minimum star rating
- Barangay dropdown: all 16 official Marikina barangays link to filtered results
- Near Me: sorts results by distance; falls back to top-rated when location is denied
- Collections: Top Rated, Hidden Gems, Just Added

**Listing page**

- Hero photo and photo gallery
- Prices menu and founder review
- Star rating summary
- Mini location map with Google Maps directions link
- Phone and Facebook contact buttons
- Share button (Web Share API on mobile; clipboard fallback on desktop)

**Reviews**

- Signed-in users leave a star rating (1–5) and a written review
- Guests see a sign-in prompt inline

**Business owners**

- Submit a listing at `/for-businesses/new`
- The platform stores submissions as `pending` until a curator approves them
- Owner dashboard at `/dashboard` shows listing status, review count, and average rating

---

## Tech Stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| Framework | Next.js 16 (App Router) | SSG for the catalog; dynamic for auth and reviews |
| Language | TypeScript 5 | |
| Styling | Tailwind CSS v4 | Tokens go in `:root`, not `@theme` |
| Icons | Phosphor Icons v2 | Use SSR import path in server components |
| Maps | MapLibre GL JS v5 + react-map-gl v8 | OpenStreetMap tiles; no API key required |
| Auth | Clerk v6 | Pin to v6; v7 removes `SignedIn` and `SignedOut` exports |
| Database | Supabase (PostgreSQL) | Use the Transaction pooler on port 6543 for Vercel |
| ORM | Drizzle ORM | |
| Validation | Zod | |
| Images | Cloudinary | |
| Email | Resend | Keys configured; trigger not yet implemented |
| Hosting | Vercel | |
| Font | Sora | |

---

## Setup

### Requirements

- Node.js 18 or later
- A [Clerk](https://clerk.com) account (free tier)
- A [Supabase](https://supabase.com) project (free tier)

### Install dependencies

```bash
git clone https://github.com/gtapp1/G-sa-Marikina.git
cd G-sa-Marikina
npm install
```

### Set environment variables

```bash
cp .env.example .env.local
```

Open `.env.local` and set these values:

| Variable | Where to find it |
|----------|-----------------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk → API Keys |
| `CLERK_SECRET_KEY` | Clerk → API Keys |
| `CLERK_WEBHOOK_SECRET` | Clerk → Webhooks → your endpoint → Signing Secret |
| `DATABASE_URL` | Supabase → Project Settings → Database → URI (Transaction pooler, port **6543**) |
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000` for local dev; your domain on Vercel |

### Create tables and load data

```bash
npm run db:push   # create tables in Supabase
npm run db:seed   # load 7 sample listings
```

### Start the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Database Scripts

| Command | Action |
|---------|--------|
| `npm run db:push` | Push schema to Supabase without a migration file |
| `npm run db:generate` | Generate SQL migration files from schema changes |
| `npm run db:migrate` | Apply pending migration files |
| `npm run db:studio` | Open Drizzle Studio in the browser |
| `npm run db:seed` | Load the sample catalog into the `businesses` table |

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx                      Homepage
│   ├── [slug]/page.tsx               Listing detail
│   ├── map/                          Map view
│   ├── search/                       Search and filters
│   ├── categories/, category/[id]/   Category pages
│   ├── collections/                  Curated collections
│   ├── near-me/                      Geolocation sort
│   ├── dashboard/                    Owner dashboard (auth required)
│   ├── for-businesses/new/           Submit a spot (auth required)
│   ├── sign-in/, sign-up/            Clerk auth pages
│   ├── terms/, privacy/, guidelines/ Legal pages
│   └── api/
│       ├── reviews/route.ts          GET and POST reviews
│       └── webhooks/clerk/route.ts   Sync Clerk users to Supabase
├── components/
├── data/
│   ├── listings.ts                   Static catalog (7 sample spots)
│   └── barangays.ts                  All 16 official Marikina barangays
├── db/
│   ├── schema.ts                     Drizzle schema
│   └── index.ts                      Lazy DB client
├── lib/
│   ├── current-user.ts               Resolve Clerk user to DB row
│   ├── distance.ts                   Haversine distance
│   └── collections.ts                Derive collections from catalog
└── types/
    └── listing.ts                    Zod schema and Category enum
```

---

## Data Model

```
users       — clerk_id (join key), email, display_name, role
businesses  — slug (unique), name, category, barangay, lat/lng, photos[], status
reviews     — business_id, user_id, rating (1–5), body, is_reported
```

`DATABASE_URL` is a server-only variable. Do not prefix it with `NEXT_PUBLIC_`.

---

## Deploy to Vercel

Add these variables in Vercel → Settings → Environment Variables for all environments. Then redeploy.

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
CLERK_SECRET_KEY
CLERK_WEBHOOK_SECRET
DATABASE_URL
NEXT_PUBLIC_SITE_URL
```

### Set up the Clerk webhook

1. Go to Clerk → Webhooks → Add Endpoint.
2. Set the URL to `https://your-domain.vercel.app/api/webhooks/clerk`.
3. Subscribe to `user.created`, `user.updated`, and `user.deleted`.
4. Copy the Signing Secret and set it as `CLERK_WEBHOOK_SECRET`.

The webhook is not required for local development. The platform creates a DB user row on the first authenticated action.

---

## Known Gaps

These items are not yet built. See [`TODO.md`](./TODO.md) for full detail.

**Blocks the platform loop**
- Browse surfaces read `src/data/listings.ts` only. Approved submissions do not appear on the site yet.
- No admin page exists to approve or reject pending submissions.
- The reviews table has no one-per-user constraint.

**Required before launch**
- Review aggregates on listing cards still show seed values, not DB averages.
- No Cloudinary upload widget (the `photos[]` columns exist).
- 20–30 real Marikina listings with real photos are still needed.
- No rate limiting on `POST /api/reviews`.
- No automated tests.

**Growth**
- Trending feed (requires real traffic data).
- Claim-your-business flow for existing listings.
- Email notifications via Resend.

---

## Contributing

1. Create a branch: `git checkout -b feature/your-feature`
2. Make changes and verify the build passes: `npm run build`
3. Open a pull request with a description of the change.

---

## License

MIT. See [LICENSE](./LICENSE)
