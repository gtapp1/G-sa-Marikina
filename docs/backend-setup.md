# Backend Setup (Phase 2)

The app now has auth (Clerk), a database (Supabase Postgres via Drizzle), reviews,
and business submissions. To run it for real, wire in your own keys.

## 1. Environment variables

Copy the template and fill in real values:

```
cp .env.example .env.local
```

`.env.local` is gitignored. It currently holds PLACEHOLDER values (including a
dummy Clerk key that only exists so `next build` completes). Replace them:

- `DATABASE_URL` — Supabase → Project Settings → Database → Connection string →
  URI. Use the **pooler** URI (port 6543) for Vercel/serverless.
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` — Clerk → API Keys.
- `CLERK_WEBHOOK_SECRET` — set after step 4.

## 2. Push the schema to Supabase

```
npm run db:push
```

This creates the `users`, `businesses`, `reviews` tables and enums from
`src/db/schema.ts`. (Use `npm run db:generate` + `npm run db:migrate` instead if
you prefer versioned SQL migrations.)

## 3. Seed the catalog

```
npm run db:seed
```

Loads the Phase 1 static listings into the `businesses` table as `published`.
Idempotent — safe to re-run.

## 4. Clerk → Supabase user sync webhook

The webhook keeps a `users` row in sync with each Clerk account (eng-review
decision D2).

1. Clerk dashboard → Webhooks → Add Endpoint.
2. URL: `https://YOUR_DOMAIN/api/webhooks/clerk` (use an ngrok/tunnel URL for
   local testing).
3. Subscribe to events: `user.created`, `user.updated`, `user.deleted`.
4. Copy the endpoint's **Signing Secret** into `CLERK_WEBHOOK_SECRET` in
   `.env.local`.

The route verifies the svix signature before writing to the DB. If a user acts
before the webhook lands, `getCurrentDbUser()` upserts them as a fallback.

## 5. Run

```
npm run dev
```

## Architecture notes

- **Catalog stays static (SSG).** Listing/category/search pages render from
  `src/data/listings.ts` for speed and SEO. The DB powers the dynamic layer:
  users, reviews, and owner submissions.
- **Reviews** load client-side via `GET /api/reviews?slug=…` and post via
  `POST /api/reviews` (auth-guarded, Zod-validated). Posting a review for a
  seed listing lazily inserts that business into the DB.
- **Business submissions** (`/for-businesses/new`) are stored with
  `status: "pending"` — they don't appear on the site until a curator flips them
  to `published` (protects the directory from spam).
- **Authorization** is enforced in server code (route handlers + server
  actions check Clerk auth). `DATABASE_URL` is server-only (no `NEXT_PUBLIC_`
  prefix) and must never be exposed to the client.

## Known follow-ups (Phase 2.1)

- Card/listing star ratings still show the seed values, not an average computed
  from real DB reviews. Recomputing per-card requires dynamic data (would move
  cards off SSG). Wire this up once review volume justifies it.
- Photo uploads on reviews/submissions (Cloudinary signed upload) are scoped but
  not yet built — the schema's `photos[]` columns are ready.
- A curator dashboard to approve `pending` businesses (currently done via
  `db:studio` or SQL).
