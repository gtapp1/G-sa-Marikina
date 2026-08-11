# G sa Marikina — Missing Work / Backlog

Last updated: 2026-08-12

Everything not yet built, prioritized. Each item has: what, why it matters, where
to start, and rough effort. See `HANDOFF.md` for full project context.

Legend: **P1** = blocks a working platform · **P2** = needed before real launch ·
**P3** = growth / nice-to-have.

---

## P1 — Blocks the platform from actually working

### 1. Unify the catalog with the database
- **What:** Every browse surface (home, `/search`, `/map`, `/categories`,
  `/near-me`, `/collections`) and the `/[slug]` detail page read from the static
  `src/data/listings.ts`. The DB only powers reviews, submissions, and the
  dashboard.
- **Why it matters:** An approved owner submission does NOT appear anywhere on
  the site and has no detail page. The submit → approve → discover loop is a dead
  end. This is the single most important gap.
- **Where to start:** Make the catalog read `businesses` where
  `status = 'published'` from the DB. Either fully migrate off the static file
  (seed already loads it into the DB) or merge static + DB. Update `/[slug]` to
  resolve DB businesses (switch to dynamic or ISR since `generateStaticParams`
  only knows static slugs today).
- **Effort:** M (touches ~7 pages + the detail route).
- **Watch out:** moving the catalog to the DB makes those pages dynamic/ISR
  instead of SSG — keep SEO working (server-render, keep JSON-LD).

### 2. Curator approval tool
- **What:** An admin page to review `pending` businesses and flip them to
  `published` / `rejected`.
- **Why it matters:** Right now submissions can only be approved by hand in
  `db:studio`. Without this, #1 has nothing to display.
- **Where to start:** New `/admin` route gated on the `admin` role (already in
  the `users` schema). List pending businesses, add approve/reject server
  actions. Set your own user's role to `admin` via `db:studio`.
- **Effort:** S–M.

---

## P2 — Needed before a real launch

### 3. Real review aggregates
- **What:** Cards and listing headers show the seed `rating`/`reviewCount`, not
  an average computed from actual DB reviews.
- **Why it matters:** Ratings are the core trust signal; fake numbers erode it.
- **Where to start:** Compute `avg(rating)` and `count` per business from
  `reviews`. If cards need it, they move off pure static data (ties into #1).
- **Effort:** S (once #1 is done).

### 4. Photo uploads (Cloudinary)
- **What:** No upload UI for review photos or business submissions. Listings use
  Cloudinary demo URLs.
- **Why it matters:** Food photos are the whole visual product. Real owners need
  to upload their own.
- **Where to start:** Cloudinary signed uploads (env keys already in
  `.env.example`). Add an upload widget/component; `photos[]` columns are ready.
- **Effort:** M.

### 5. Real content
- **What:** Replace demo image URLs and the 7 sample listings with real photos
  and 20–30 real Marikina businesses.
- **Why it matters:** Launch target in the design doc (20+ listings, avoids an
  empty-platform feel). This is the founder's content task, not code.
- **Effort:** M (legwork — visit spots, take photos, per the assignment).

### 6. Clerk webhook secret
- **What:** `CLERK_WEBHOOK_SECRET` still needs setting in `.env.local`.
- **Why it matters:** Keeps user profile updates/deletes in sync. (Creation is
  covered by the fallback upsert, so not blocking local testing.)
- **Where to start:** `docs/backend-setup.md` step 4.
- **Effort:** XS.

### 7. Abuse / integrity guards
- **What:** No one-review-per-user constraint, no rate limiting on
  `POST /api/reviews`, no real moderation beyond the `is_reported` flag.
- **Why it matters:** Fake reviews and competitor sabotage are open questions in
  the design doc.
- **Where to start:** Unique index on `(business_id, user_id)` in reviews; rate
  limit the POST; surface reported reviews in the admin tool (#2).
- **Effort:** S–M.

### 8. Automated tests
- **What:** No test suite exists.
- **Why it matters:** Regression coverage before shipping and iterating.
- **Where to start:** Vitest for units (distance, collections, slugify, Zod
  schemas), Playwright for E2E (browse → review → submit). Eng review flagged
  these flows.
- **Effort:** M.

---

## P3 — Growth / nice-to-have

### 9. Trending feed
- **What:** "Trending in Marikina" (design doc: recent reviews ×2 + page views
  ×1, daily decay).
- **Why it matters:** Discovery/engagement once there's traffic.
- **Where to start:** Needs page-view data (Vercel Analytics API) + review
  recency from the DB. Defer until there's real traffic.
- **Effort:** M.

### 10. "Claim your business" flow
- **What:** Let an owner claim a listing that already exists (vs. submitting a
  new one). Design doc Phase 2 item.
- **Where to start:** Email verification to the contact email on file; set
  `is_claimed` + `owner_id`.
- **Effort:** M.

### 11. Review notifications (Resend)
- **What:** Email business owners when they get a review.
- **Where to start:** Resend keys are in `.env.example`; trigger on review
  insert.
- **Effort:** S.

### 12. Warm-toned custom map tiles
- **What:** Map uses standard gray OpenStreetMap tiles; DESIGN.md prefers a
  warm-toned style.
- **Where to start:** MapTiler free tier or a self-hosted style JSON. Trade-off:
  adds an API key / dependency.
- **Effort:** S.

### 13. Deploy to production
- **What:** Not deployed yet.
- **Where to start:** Vercel + all env vars set + Clerk webhook pointed at prod
  URL + secure the domain (gsamarikina.com). See design doc Distribution Plan.
- **Effort:** S.

---

## Suggested order

1. #1 Unify catalog with DB
2. #2 Curator approval tool
3. #3 Real review aggregates
4. #4 Photo uploads + #5 real content
5. #7 integrity guards + #8 tests
6. #13 deploy
7. Then P3 growth items (#9–#12) as traffic justifies
