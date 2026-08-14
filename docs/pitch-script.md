# G sa Marikina — Pitch Script
Presenter: Gerald
Target time: 3 minutes (slides) + 90 seconds (live demo) = ~4.5 minutes total
Format: word-for-word script, paired to each slide in the deck

---

## SLIDE 1 — TITLE

**[Walk up. Pause. Let the title sit on screen before you speak.]**

"Good [morning/afternoon]. My name is Gerald, and I built G sa Marikina.

Every food spot in your city. One tap away."

**[Pause for two seconds. Then move.]**

---

## SLIDE 2 — THE PAIN

"Here's a real post from a Marikina Facebook group this week.

'Selling Ube Crinkles, DM to order.'

That post got shared 47 times across 12 different Facebook groups this week. Same photo. Same caption. Every time, it got buried within hours.

This is what small food businesses in Marikina do every single day. Home bakers, milk tea shops, karinderyas, street food carts. They repost the same photos daily because there's no permanent place online that represents them.

Marikina has 16 barangays and hundreds of small food businesses. Right now, zero of them have a permanent, discoverable URL."

---

## SLIDE 3 — WHO SUFFERS

"This breaks two people at once.

The business owner reposts every day, has no website, can't collect reviews, and loses customers to competitors who show up higher in a Facebook feed by luck, not by quality.

The hungry resident scrolls through hundreds of posts trying to find food nearby, can't filter by barangay or category, and has no way to verify if a spot is actually good before showing up.

Both sides are stuck in the same broken loop."

---

## SLIDE 4 — THE INSIGHT

"So here's what I built the whole platform around.

What if every food spot had one URL?

Photos. Menu. Map location. Reviews. Contact info. All on one page that a business owner can share forever.

This is not another delivery app. Grab and FoodPanda already do delivery, and they take a cut most home-based sellers can't afford. This is a food directory, built for one city."

---

## SLIDE 5 — THE SOLUTION

"This is G sa Marikina.

Consumers browse listings by category, by barangay, or on a live map. They read real reviews from real residents. Business owners submit their spot in two minutes and get a permanent page — no more daily reposting.

Every listing gets one URL. One link that represents a business forever."

---

## SLIDE 6 — THE MAP

"Now I want to show you the first feature that makes this platform different.

This is the Barangay Polygon Map.

Click a barangay, and its real boundary lights up on the map. The camera flies in to fit that exact shape. Only the food spots inside that barangay stay visible.

I sourced these boundaries directly from OpenStreetMap — real administrative polygons for Marikina, not circles or approximations. When you click Sta. Elena, the map shows you Sta. Elena. Not a rough guess at where Sta. Elena might be.

This runs on MapLibre and OpenStreetMap. Free. No API key required."

---

## SLIDE 7 — THE AI CONCIERGE

"The second feature: G!, the AI food concierge.

Ask it in Taglish. 'Saan may masarap na milk tea sa Marikina?' It answers in the same language you asked, and it recommends a real business on the platform — with the price, the location, and a direct link.

Here's what matters most about this feature. G! only knows what's real. Every answer is grounded in the platform's actual data. If a business isn't listed on G sa Marikina, G! will never pretend it exists. This is not a chatbot with a food skin bolted on for the sake of using AI. It's built to be honest about what it doesn't know."

---

## SLIDE 8 — TECH STACK

"Quick look at what's running underneath.

Next.js 16 for the frontend. MapLibre for the map. Supabase for the database. Clerk for authentication. Gemini 2.5 Flash for the AI concierge. Deployed on Vercel.

I built this solo, and every piece of this stack is free tier or open source. The total cost to run this platform right now is zero dollars."

---

## SLIDE 9 — THE FLYWHEEL

"This isn't a one-time hack. It's designed to compound.

A business submits. A curator approves it. It goes live on the platform. Residents discover it. They leave reviews. The business grows. More businesses see that growth and want in. The platform gets richer.

Three roles keep this loop turning: the consumer, the business owner, and the curator. Every new listing makes the platform more valuable for everyone already on it."

---

## SLIDE 10 — LIVE DEMO TRANSITION

"Let me show you."

**[Switch to the live application now. Do not linger on this slide.]**

### Live demo flow — 60 to 90 seconds

1. **Homepage** — Scroll through the listing grid. Point out categories.
   > "Here's the homepage. Cookies, milk tea, street food, home-cooked meals — all with real photos and ratings."

2. **Map page** — Click into `/map`. Select a barangay pill (e.g. "Sta. Elena").
   > "Watch this. I click Sta. Elena — the real boundary lights up, the map flies in, and only the spots actually inside that barangay stay on screen."

3. **Open the chat widget.** Type a Taglish question live.
   > "Now let's ask G!. 'Saan may masarap na milk tea?'"
   [Wait for streamed response, click the link it returns.]
   > "It answered in Taglish, recommended a real listing, and linked me straight to it."

4. **Listing detail page** — Show the menu, map pin, contact buttons, reviews section.
   > "Every business gets this — photos, menu with prices, a map pin, and direct contact buttons. This is the URL they can share forever instead of reposting daily."

**[Return to slides.]**

---

## SLIDE 11 — IMPACT & VISION

"Today, this platform has 7 listings across 6 barangays. That's a proof of concept.

Next month, the goal is 30 or more real Marikina food spots, with real photos from real owners.

But here's the bigger picture. The architecture underneath this is city-agnostic. Swap the boundary data, seed new listings, and this exact platform launches anywhere.

G sa Antipolo. G sa Pasig. G sa Cainta. Same code, different city."

---

## SLIDE 12 — EMOTIONAL CLOSE

**[Slow down here. This is the moment judges remember.]**

"Nanay Lita has been cooking sinigang in Industrial Valley for 15 years.

She has no website. No Instagram. No Grab listing.

What she has is a karinderya, a loyal neighborhood, and food that tastes like your lola made it.

**[Pause.]**

Now she has a URL."

---

## SLIDE 13 — CLOSING

"G sa Marikina. Visibility for the invisible food economy.

Built with Next.js, Supabase, MapLibre, and Gemini AI.

My name is Gerald. Thank you. I'm ready for your questions."

**[Stop talking. Wait for questions. Do not fill silence.]**

---

## Q&A PREP — Likely Judge Questions

**"How do you ensure listing quality?"**
"Every submission goes through a curator approval step before it goes live. Right now that's manual, but the schema already supports an admin role, so building a full approval dashboard is the next thing on my list."

**"What's the business model?"**
"Listings stay free — this is a community tool first. Down the line, monetization comes from optional features like featured placement or analytics for business owners, but only after there's real usage to justify it."

**"How is this different from Google Maps?"**
"Google Maps doesn't have menus with prices, founder reviews, or an AI that speaks Taglish and only recommends what's actually real on a hyperlocal platform. It's built for every business on Earth, so it's too generic for a home baker or a karinderya that lives on word of mouth, not marketing budget."

**"Can this scale to other cities?"**
"Yes, by design. The barangay boundary data and the listings are decoupled from the core platform code. Fork the repo, swap the GeoJSON for a new city's boundaries, seed new listings, and it launches."

**"What about food delivery?"**
"Intentionally not building that. Grab and FoodPanda already solved delivery, and they take a cut that a lot of these sellers can't afford or don't need since many operate pickup-only. This platform solves discovery and trust. Delivery is somebody else's job."

**"Why Gemini instead of OpenAI?"**
"Free tier that's generous enough for a demo, strong multilingual support out of the box for Tagalog and Taglish, and a straightforward SDK. For a project running at zero budget, that combination made the decision easy."

**"What happens if the AI gives a wrong answer?"**
"It's grounded entirely in the platform's real listings data through the system prompt — it has no ability to invent a business that doesn't exist. If nothing matches a question, it says so honestly and points the user to the search page instead of guessing."

---

## DELIVERY NOTES

- **Total speaking time target:** 3 minutes for slides, 60-90 seconds for the live demo. Practice with a timer — hackathon judges cut you off at the buzzer.
- **The two moments that matter most:** the barangay map animation (slide 6 / live demo) and Nanay Lita (slide 12). Everything else supports those two beats.
- **If the live demo breaks:** don't apologize more than once. Say "let me show you what it does" and pivot to the chat mockup screenshot already in the deck (slide 7). Keep moving.
- **Pace:** slow down on slide 12. Speed up on slide 8 (tech stack) — judges care about the product, not your dependency list.
- **Eye contact:** look at judges during slides 2, 4, and 12. Look at the screen during the live demo so you're narrating what they're watching.
