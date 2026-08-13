# Devpost Submission — G sa Marikina

Copy each section directly into the matching Devpost field.

---

## Project Name

G sa Marikina

## Tagline / Elevator Pitch
*(Devpost limit: ~200 characters)*

Every food spot in Marikina City gets one permanent URL — with an AI concierge and a real barangay map to help you find it.

---

## Inspiration

Small food businesses in Marikina — home bakers, milk tea shops, karinderyas, street food carts — have no permanent home online. They post the same product photos to the same Facebook groups every single day, and every post gets buried within hours. Meanwhile, residents scroll hundreds of posts trying to find food nearby, with no way to search by location, category, or trust signal like reviews.

The idea started from watching a friend who sells cookies repost across five different Facebook groups daily, just to stay visible. There's no self-service directory built specifically for Marikina — Google Maps doesn't have menus or founder reviews, and food delivery apps take a cut that many home-based sellers can't afford or don't need, since they're not doing delivery in the first place.

We wanted to build the missing piece: a hyperlocal food directory where every business gets one shareable link that accumulates trust over time, and every resident can actually discover what's around them.

## What it does

G sa Marikina is a food discovery platform built for one city. Consumers browse listings by category, barangay, or an interactive map, read reviews, and get personalized recommendations from an AI concierge. Business owners submit their spot once and get a permanent page with photos, menu, location, and contact info — no more daily reposting.

Two features made specifically for this demo push it further:

**Barangay Polygon Map** — Select any of Marikina's barangays and its real geographic boundary (sourced from OpenStreetMap) highlights on the map. The camera flies to fit the boundary, and the listings filter to show only spots inside that barangay. This isn't generic pins on a map — it's real geographic intelligence tied to how Filipino cities are actually organized into barangays.

**G! — AI Food Concierge** — A floating chat widget powered by Gemini 2.5 Flash that understands Taglish. Ask "Saan may masarap na milk tea sa Marikina?" and get a real answer grounded entirely in the platform's actual listings — never hallucinated. It only knows what's really on the platform, and it links directly to the listing page it recommends.

## How we built it

- **Frontend:** Next.js 16 (App Router) with TypeScript and Tailwind CSS v4
- **Maps:** MapLibre GL JS + OpenStreetMap raster tiles (free, no API key). Barangay boundaries were pulled from the OpenStreetMap Overpass API as real administrative polygons, converted to GeoJSON, and rendered as MapLibre fill/line layers with `fitBounds()` camera animation on selection.
- **AI:** Google's Gemini 2.5 Flash via the official `@google/genai` SDK. The chat API route serializes all platform listings into a system prompt so the model is grounded in real data, and streams the response back using the Web Streams API for a responsive feel.
- **Database:** Supabase (PostgreSQL) with Drizzle ORM for reviews, users, and business submissions.
- **Auth:** Clerk for sign-in/sign-up and role-based access (consumer, business owner, admin).
- **Deployment:** Vercel.

The barangay boundary data required stitching together dozens of individual OSM "way" segments per barangay relation into closed polygon rings — Overpass returns boundaries as unordered line fragments, not ready-to-use shapes, so a custom script assembles them into valid GeoJSON.

## Challenges we ran into

The biggest one: after building the polygon map, the demo listing coordinates (written earlier as placeholder data) didn't actually fall inside their assigned barangay's real boundary once we swapped in accurate OpenStreetMap polygons. Selecting a barangay would correctly highlight its shape, but the pin for a business supposedly located there would sit outside the boundary. We wrote a point-in-polygon check, found every single listing was affected, computed a real interior point for each barangay's centroid (falling back to a grid search for concave polygon shapes), and snapped every listing's coordinates to a verified point inside its correct barangay.

Sourcing the OSM boundary data itself was also inconsistent — the primary Overpass API endpoint kept timing out under load, requiring a fallback to a mirror server and careful validation that we'd matched Marikina's barangays and not a same-named barangay in a neighboring city (several barangay names, like "San Roque," repeat across different Metro Manila cities).

## Accomplishments we're proud of

- Real, verified geographic data — not a demo approximation. Every barangay boundary is sourced from actual OpenStreetMap administrative polygons, and every listing pin is mathematically confirmed to sit inside its correct barangay.
- An AI concierge that's honest about what it doesn't know, scoped tightly to the platform's real data instead of a generic chatbot bolted onto the product for the sake of using AI.
- Shipped both features end-to-end (data pipeline, backend, UI) in a tight hackathon timeframe, on top of an already-functional platform with auth, reviews, and business submissions.

## What we learned

Real-world geographic data is messy by default — administrative boundaries from OpenStreetMap come as fragmented line segments that need careful reassembly, and "close enough" coordinates for a demo will visibly break the moment you add real boundary polygons on top. Grounding an LLM in a small, well-structured dataset (rather than reaching for a vector database or a large SDK) was the right call for building an honest, hallucination-resistant chatbot on a tight budget and timeline.

## What's next for G sa Marikina

- Migrate the full catalog from static demo data to the Supabase database so approved business submissions actually appear on the site (currently the biggest gap between demo and real launch)
- Build a curator/admin approval tool for reviewing new business submissions
- Onboard 20-30 real Marikina food businesses with real photos
- Extend barangay boundary coverage to all 16 official barangays (currently 6, matching the demo's listings)
- Explore forking the same architecture for neighboring cities — the boundary + listings data model is city-agnostic by design

---

## Built With
*(Devpost tag list — comma separated)*

nextjs, typescript, tailwindcss, maplibre-gl, openstreetmap, supabase, postgresql, drizzle-orm, clerk, google-gemini, vercel, react

---

## Try it out links

- **Live demo:** [add your Vercel deployment URL]
- **GitHub repo:** [add your repo URL]

---

## Submission Checklist

- [ ] Set `GOOGLE_GEMINI_API_KEY` in Vercel environment variables (get one free at https://aistudio.google.com/apikey)
- [ ] Commit and push all uncommitted changes (map fix, chatbot, listings coordinates)
- [ ] Deploy to Vercel and confirm the live URL works
- [ ] Record a 2-3 minute demo video showing: homepage → map barangay selection → chatbot query → listing page
- [ ] Take 3-5 screenshots for the Devpost gallery (homepage, map with polygon active, chat widget open, listing detail page)
- [ ] Fill in the live demo + repo links above before submitting
