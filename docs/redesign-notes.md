# G sa Marikina — UI/UX Redesign Notes

## Status: Redesigning — Resy-inspired direction

The previous design pass (branch `design/ui-overhaul`) is discarded. The new direction is inspired by **Resy.com** — dark, editorial, premium food discovery with confident typography and restrained elegance.

---

## Design Reference: Resy.com

### What Resy does well (to adapt)

1. **Dark, cinematic background** — Deep charcoal/near-black base that makes food photography pop. Not pure black (#000), but a warm dark (#1A1A1A to #242424 range).
2. **Red as the single accent color** — Resy uses their signature red sparingly for CTAs, active states, and brand marks. Everything else is neutral.
3. **Serif typography for editorial warmth** — Headlines use a refined serif (gives it a magazine/editorial feel), body in a clean sans-serif. This creates a "curated, not generated" impression.
4. **Photography-first cards** — Large, moody food/restaurant imagery. The dark background makes photos feel like they float.
5. **Minimal chrome** — Very few borders, shadows used sparingly. Elevation comes from brightness differences, not drop shadows.
6. **Clean navigation** — Simple top bar with wordmark left, search center, auth right. No floating capsules or complex docks.
7. **Editorial content blocks** — "The Hit List", curated guides, editorial blurbs. Content reads like a food magazine, not a database.
8. **Restrained UI density** — Generous whitespace (or "darkspace"), few elements per viewport, each section has one clear purpose.
9. **City-as-context** — The city/location is always visible, grounding the user. For G sa Marikina, this is always "Marikina City".
10. **Bottom navigation on mobile** — Discover / Search / Account pattern. Simple 3-tab structure.

### Resy's design tokens (inferred)

| Token | Value | Notes |
|-------|-------|-------|
| Background | #1A1A1A – #242424 | Warm dark, not pure black |
| Surface (cards) | #2A2A2A – #333333 | Slightly lighter than bg |
| Text primary | #FFFFFF / #F5F5F5 | Off-white for less glare |
| Text secondary | #999999 / #A0A0A0 | Muted gray |
| Accent | #DA291C (Resy red) | For us: keep orange #F97316 as brand |
| Borders | rgba(255,255,255,0.08) | Barely visible, just separation |
| Typography heading | Serif (editorial feel) | Consider: Playfair Display, Libre Baskerville, or DM Serif |
| Typography body | Sans-serif (clean) | Keep Inter or switch to something like DM Sans |
| Radius | Small (4–8px) | Not bubbly — refined |
| Shadows | Minimal | Dark mode = elevation via brightness, not shadow |

---

## Adaptation Plan: Resy → G sa Marikina

| Resy Pattern | G sa Marikina Adaptation |
|--------------|--------------------------|
| Dark charcoal background | Dark warm background (#1C1917 or #1A1814 — warm-tinted, not cold gray) |
| Resy Red accent | Keep brand orange #F97316 as the accent — works great on dark |
| Serif headlines | Switch heading font to a display serif for editorial warmth |
| Photography-first cards | Larger photos, rounded corners, glow/luminance on hover |
| Minimal navigation | Clean top bar desktop, 3-tab bottom bar mobile |
| Editorial "Hit List" | Collections as editorial guides (already started) |
| City context always visible | "Marikina City" always in the nav/header |
| Search-forward UX | Search bar prominent on homepage, not buried |
| Dark mode elevation | Cards slightly lighter than bg, no heavy shadows |
| Restrained spacing | Generous padding, fewer elements per viewport |

---

## Design System (new direction)

### Colors (dark theme)

| Token | Value | Usage |
|-------|-------|-------|
| `--bg` | `#1C1917` | Page background (warm dark) |
| `--bg-elevated` | `#292524` | Cards, surfaces, nav |
| `--bg-hover` | `#44403C` | Hover states on surfaces |
| `--text` | `#FAFAF9` | Primary text (off-white) |
| `--text-muted` | `#A8A29E` | Secondary text, captions |
| `--accent` | `#F97316` | CTAs, active states, brand |
| `--accent-hover` | `#EA580C` | Hover on accent elements |
| `--accent-subtle` | `rgba(249, 115, 22, 0.15)` | Accent backgrounds |
| `--border` | `rgba(255, 255, 255, 0.08)` | Subtle dividers |
| `--border-strong` | `rgba(255, 255, 255, 0.15)` | Visible borders |

### Typography

| Element | Font | Weight | Size |
|---------|------|--------|------|
| Display/Hero | DM Serif Display or Playfair Display | 400 | 48–64px |
| H1 | Same serif | 400 | 32–40px |
| H2 | Same serif | 400 | 24–28px |
| H3 | Inter or DM Sans | 600 | 18–20px |
| Body | Inter or DM Sans | 400 | 16px |
| Caption | Inter or DM Sans | 500 | 13–14px |
| Nav | Inter or DM Sans | 600 | 14px |

### Spacing

| Token | Value |
|-------|-------|
| `--space-xs` | 4px |
| `--space-sm` | 8px |
| `--space-md` | 16px |
| `--space-lg` | 24px |
| `--space-xl` | 40px |
| `--space-2xl` | 64px |
| `--space-3xl` | 96px |

### Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | 4px | Buttons, pills |
| `--radius-md` | 8px | Cards, inputs |
| `--radius-lg` | 12px | Modals, large cards |

### Shadows & Elevation

Dark mode uses brightness for elevation, not shadows:
- Level 0: `--bg` (deepest)
- Level 1: `--bg-elevated` (cards, nav)
- Level 2: `--bg-hover` (hover, active)
- Glow on interactive: `0 0 20px rgba(249, 115, 22, 0.1)` on hover

---

## Page structure (proposed)

### Homepage
- Clean top nav (logo left, search center, sign in right)
- Hero: Large editorial headline (serif) + subtitle + search bar
- "Where to eat right now" — editorial picks (large photo cards)
- Category quick links (horizontal scroll, pill-style)
- Footer (minimal)

### Map page
- Split view: sidebar list + map (like current, but dark themed)
- Mobile: toggle between map and list

### Listing detail
- Full-width hero photo
- Title (serif) + category + location
- Editorial review (prominent)
- Menu/products
- Contact actions
- Map + reviews

### Collections
- Eater-style numbered editorial entries (keep this direction)
- Dark background makes photos pop

---

## What was tried before (and failed)

### Approach 1: Warm cream palette + animations + Eater editorial
- Warm cream (#FFFBF5) background felt generic
- Halftone dot texture added noise
- Quick nav pills floating without structure
- Mixing editorial scroll + card grid created confusion
- Animations couldn't fix bad spatial relationships

---

## Changes log

| Date | Change | Decision |
|------|--------|----------|
| 2026-08-12 | Discarded `design/ui-overhaul` branch | Starting fresh |
| 2026-08-12 | New direction: Resy-inspired dark editorial | Dark warm bg, serif headlines, photography-first, restrained UI |

---

## Open questions

- [ ] Serif font choice: DM Serif Display vs Playfair Display vs Libre Baskerville?
- [ ] Should we keep Plus Jakarta Sans for anything or go full new type system?
- [ ] Photo treatment: rounded corners? Or full-bleed edge-to-edge?
- [ ] Mobile bottom nav: 3 tabs (Discover/Search/Account) or keep current 5?
- [ ] Search bar placement: hero section or sticky in nav?

---

## Next steps

1. Choose final typography pairing (serif + sans)
2. Build new globals.css with dark theme tokens
3. Redesign layout.tsx (new nav structure)
4. Redesign homepage (hero + editorial picks)
5. Retheme all components for dark mode
6. Redesign listing detail page
7. Redesign map page (dark tiles)
8. Redesign collections (dark editorial)

