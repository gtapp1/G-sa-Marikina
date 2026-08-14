# G sa Marikina — Hackathon Demo Slides

## Slide Deck Structure (Empathetic Arc)

---

## SLIDE 1: THE HOOK (Title)

**Visual:** App logo + warm food photography collage (soft blur)

> **G sa Marikina**
> Every food spot in your city. One tap away.

*Subtitle:* A hyperlocal food discovery platform for Marikina City

---

## SLIDE 2: THE PAIN (Make them feel it)

**Visual:** Facebook group screenshot (posts buried, repetitive spam-like posting)

> **"Selling Ube Crinkles, DM to order!"**
> — posted 47 times across 12 Facebook groups this week.

**Talking point:**
Small food businesses in Marikina have NO permanent home online. Home bakers, milk tea shops, karinderyas — they post the same photos to the same Facebook groups, every single day. Every post gets buried in hours. Every customer that searches "cookies near me" will never find them.

**Stat to say:** "There are 16 barangays in Marikina, hundreds of small food businesses, and ZERO have a permanent, discoverable URL."

---

## SLIDE 3: WHO SUFFERS (Two sides of the same coin)

**Visual:** Split screen — frustrated business owner reposting vs. hungry resident scrolling endlessly

| The Business Owner | The Hungry Resident |
|---|---|
| Reposts daily, gets buried | Scrolls 200 Facebook posts to find food nearby |
| No permanent link to share | Can't search by location or category |
| No reviews to build trust | Relies on word of mouth or luck |
| Invisible to new customers | Misses great spots two streets away |

**Talking point:**
"It's a two-sided problem. The business can't be found, and the customer can't find. Both are stuck in a broken loop."

---

## SLIDE 4: THE INSIGHT (What we realized)

**Visual:** Clean, minimal text on warm cream background

> What if every food spot — from a home baker to a karinderya — had **one URL** that shows their photos, menu, location, and reviews?
>
> And what if residents could explore all of them on a **real map of their city**?

**Talking point:**
"We don't need another food delivery app. We need a food DIRECTORY. A Google Maps for the invisible food economy of Marikina."

---

## SLIDE 5: THE SOLUTION (Product reveal)

**Visual:** Full-screen screenshot of the homepage

> **G sa Marikina** — a local food directory built for one city.

- Browse by category (cookies, milk tea, street food, home-cooked, resto, bakery)
- Explore an interactive map with pins by barangay
- Read real reviews from real residents
- Business owners submit their spot in 2 minutes

**Talking point:**
"Every listing gets a permanent URL. One link that a business owner can share forever. No more reposting."

---

## SLIDE 6: THE MAP (Geographic Intelligence)

**Visual:** Map screenshot → then live demo of barangay polygon selection

> **Barangay Polygon Map**
> Click a barangay. See its real boundaries light up. Only food spots inside appear.

**Demo moment:** Click "Sta. Elena" → polygon fills → camera flies → Tea Kayo and Aling Beb's appear.

**Talking point:**
"This isn't pins on a generic map. The platform knows the geography. It knows that Sta. Elena has 2 food spots, that Malanday has cookies, that Industrial Valley has home-cooked meals. One click, and the city unfolds."

---

## SLIDE 7: THE CONCIERGE (AI that actually knows something)

**Visual:** Chat widget screenshot with a Taglish conversation

> **"Saan may masarap na milk tea sa Marikina?"**
> → "Try Tea Kayo Milktea in Sta. Elena! Real tea leaves, student-friendly prices. Their Brown Sugar Fresh Milk (₱99) is a local favorite. [View →](/tea-kayo-milktea)"

**Key differentiator:**
- Speaks Taglish natively
- Only answers about REAL listings on the platform (no hallucination)
- Grounded in actual data — menus, prices, locations, reviews

**Talking point:**
"This isn't ChatGPT with a food skin. G! only knows what's real. If it's not on the platform, it won't pretend it exists."

---

## SLIDE 8: HOW IT WORKS (Tech — keep it brief)

**Visual:** Simple architecture diagram (3 boxes max)

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│  Next.js    │────▶│  Supabase    │────▶│  Gemini AI  │
│  (Frontend) │     │  (Database)  │     │  (Concierge)│
└─────────────┘     └──────────────┘     └─────────────┘
       │                    │
       ▼                    ▼
  MapLibre + OSM      Clerk Auth
  (Barangay Map)    (User/Owner)
```

| Layer | Tech |
|-------|------|
| Frontend | Next.js 16 + Tailwind CSS v4 |
| Maps | MapLibre GL + OpenStreetMap (free, no API key) |
| Database | Supabase (PostgreSQL) + Drizzle ORM |
| Auth | Clerk |
| AI | Gemini 1.5 Flash |
| Deploy | Vercel |

**Talking point:**
"Built solo in under 2 weeks. All free-tier or open-source tools. The entire platform costs $0 to run at demo scale."

---

## SLIDE 9: THE BUSINESS LOOP (Why it sustains)

**Visual:** Circular flow diagram

```
Business submits → Curator approves → Listed on platform → 
Residents discover → Leave reviews → Business grows → 
More businesses submit → Platform gets richer
```

**Three roles, one loop:**
1. **Consumer** — Browse, search, review
2. **Business Owner** — Submit listing, track reviews
3. **Curator** — Approve listings, maintain quality

**Talking point:**
"This isn't a one-time hack. It's a flywheel. More businesses → more discovery → more reviews → more trust → more businesses."

---

## SLIDE 10: LIVE DEMO (Transition slide)

**Visual:** Minimal. Just the URL and a hand-pointing icon.

> **Let me show you.**

*Demo flow (2–3 minutes):*
1. Homepage → scroll through listings → show categories
2. Open map → select a barangay → watch boundary + filter
3. Open chat → type "Saan may masarap na cookies?" → get answer → click through
4. Show listing page → menu, reviews, map, contact buttons
5. (Optional) Show business submission form

---

## SLIDE 11: IMPACT & VISION (After demo)

**Visual:** Marikina skyline or street photo + forward-looking text

> **Today:** 7 listings across 6 barangays — a proof of concept.
>
> **Next:** 30 real Marikina food spots. Real photos. Real owners.
>
> **Vision:** A platform template that any city can fork.
> *Imagine: G sa Antipolo. G sa Pasig. G sa Cainta.*

**Talking point:**
"This started with one city because hyperlocal means knowing your streets. But the architecture is city-agnostic. Fork it, seed it, launch it anywhere."

---

## SLIDE 12: WHY THIS MATTERS (The emotional close)

**Visual:** A single food photo — real, warm, human

> Nanay Lita has been cooking sinigang in Industrial Valley for 15 years.
> She has no website. No Instagram. No Grab listing.
>
> She has a karinderya, a loyal neighborhood, and food that tastes like your lola made it.
>
> **Now she has a URL.**

**Talking point:**
"That's the problem we're solving. Visibility for the invisible. A permanent home for businesses that live on reputation, not marketing budgets."

---

## SLIDE 13: CLOSING / Q&A

**Visual:** Logo + URL + team info

> **G sa Marikina**
> [gsamarikina.com] (or demo URL)
>
> Built by: [Your Name]
> Stack: Next.js · Supabase · MapLibre · Gemini
>
> *Questions?*

---

## PRESENTER NOTES

### Timing Guide (3-minute demo)
- Slides 1-4 (The Problem): 45 seconds
- Slides 5-7 (The Solution): 45 seconds  
- Slide 10 (Live Demo): 60-90 seconds
- Slides 11-12 (Impact + Close): 30 seconds

### Tips
- **Open with a story, not a feature list.** Judges remember stories.
- **Demo the map polygon first** — it's the visual wow moment.
- **Let the chatbot speak Taglish** — it shows cultural intelligence.
- **End on Nanay Lita** — bring it back to the human. The last thing they feel should be empathy, not tech.
- **If something breaks during demo:** Have screenshots ready as backup slides. Never apologize for long — pivot to "let me show you what it does" with the screenshots.

### Possible Judge Questions (prep these)
1. "How do you ensure listing quality?" → Curator approval flow, review system
2. "What's the business model?" → Free for listings (community tool), premium features later (featured placement, analytics)
3. "How is this different from Google Maps?" → Google doesn't have menus, prices, founder reviews, or Taglish AI. It's too generic for street food and home bakers.
4. "Can this scale?" → City-agnostic architecture, just seed new data + GeoJSON boundaries
5. "What about food delivery?" → Intentionally NOT a delivery platform. Discovery + directory. Delivery is Grab/FoodPanda's job. We connect people to places.
