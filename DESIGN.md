# G sa Marikina — Design System

## Brand Direction

**"Warm Market"** — The platform feels like a neighborhood food market at golden hour. Warm, inviting, human. Food photos are the hero. The design builds trust through warmth, not corporate polish.

**Voice:** A friend recommending local food spots. Casual, helpful, Taglish-friendly. Never corporate, never salesy.

---

## Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--primary` | `#F97316` | CTAs, buttons, active states, brand accent, map pins |
| `--primary-hover` | `#EA580C` | Hover/press state on primary elements |
| `--primary-text` | `#C2410C` | Accessible orange for small text (5.2:1 on white) |
| `--background` | `#FFFBF5` | Page background (warm cream, not sterile white) |
| `--surface` | `#FFFFFF` | Cards, modals, input fields |
| `--text-primary` | `#3D2C1E` | Headings, body text (dark brown) |
| `--text-secondary` | `#78716C` | Captions, metadata, timestamps (warm gray) |
| `--success` | `#4ADE80` | Ratings, verified badges, positive states |
| `--error` | `#EF4444` | Errors, report button, destructive actions |
| `--border` | `#F5E6D3` | Card borders, dividers, subtle separators |
| `--map-pin` | `#F97316` | Map markers (matches primary brand) |

### Contrast Notes
- Body text on cream: 10.5:1 ✓ (exceeds AAA)
- Caption on cream: 4.7:1 ✓ (passes AA)
- Primary orange on white: 3.0:1 (use only for large text 18px+, icons, buttons)
- For small orange text: use `--primary-text` (#C2410C, 5.2:1 on white)

---

## Typography

| Token | Value | Usage |
|-------|-------|-------|
| `--font-heading` | `"Plus Jakarta Sans", sans-serif` | Headings, business names, nav items |
| `--font-body` | `"Inter", sans-serif` | Body text, descriptions, reviews, UI chrome |

### Scale

| Token | Size | Usage |
|-------|------|-------|
| `--size-h1` | 2rem / 32px | Page titles |
| `--size-h2` | 1.5rem / 24px | Section titles |
| `--size-h3` | 1.25rem / 20px | Card titles, business names |
| `--size-body` | 1rem / 16px | Body text (NEVER smaller) |
| `--size-caption` | 0.875rem / 14px | Metadata, timestamps, badges |

### Weights
- Headings: 700 (bold)
- Body: 400 (regular)
- Emphasis: 600 (semibold)

### Line Height
- Body: 1.5
- Headings: 1.2

---

## Spacing

Base unit: **4px**

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | 4px | Tight inline gaps |
| `--space-sm` | 8px | Between related elements within a card |
| `--space-md` | 16px | Card internal padding, gap between cards |
| `--space-lg` | 24px | Between sections |
| `--space-xl` | 32px | Page margins desktop |
| `--space-2xl` | 48px | Hero padding, major section separators |

---

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | 6px | Buttons, badges, input fields |
| `--radius-md` | 12px | Cards, image containers |
| `--radius-lg` | 16px | Modals, map popups |
| `--radius-full` | 9999px | Pills, avatars, category tags |

---

## Shadows

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-card` | `0 2px 8px rgba(61, 44, 30, 0.08)` | Default card elevation |
| `--shadow-hover` | `0 4px 12px rgba(61, 44, 30, 0.12)` | Card hover lift |

Note: Shadows are warm-tinted (brown base, not black) to match the brand.

---

## Layout

| Property | Value |
|----------|-------|
| Max content width | 1200px |
| Mobile page margins | 16px |
| Tablet page margins | 32px |
| Desktop | max-width centered |

---

## Components

### Listing Card
- Photo on top (4:3 aspect ratio, `--radius-md` corners)
- Business name (`--font-heading`, `--size-h3`)
- Category pill (emoji + label)
- Star rating (inline, filled orange + gray empty)
- `--shadow-card` default, `--shadow-hover` on hover
- Entire card is clickable (navigates to listing page)
- No description on card (save for listing page)

### Category Pill
- Shape: `--radius-full` (fully rounded)
- Content: emoji icon + text label
- Border: 1px `--border`
- Padding: `--space-sm` horizontal, `--space-xs` vertical
- Active state: `--primary` background, white text

### Star Rating
- Full stars only (1-5, no halves)
- Filled star: `--primary` orange
- Empty star: `--border` beige
- Size: 16px inline, 20px on listing page header
- Accessibility: `aria-label="Rated [N] out of 5 stars"`

### Map Pin
- Orange circle (`--map-pin`) with white food emoji inside
- `--shadow-card` for depth
- Tap behavior: compact popup card (200px wide)
- Popup content: photo thumbnail + name + rating + "View →" link
- Dismiss: tap outside popup

### Contact Button
- Full-width on mobile (sticky bottom bar)
- Background: `--primary`, text: white
- Icons: phone, Facebook Messenger, external link
- Minimum height: 44px (touch target)

### Share / Copy Link
- Mobile: Web Share API (native share sheet)
- Desktop: copy URL to clipboard + "Link copied!" toast (2s auto-dismiss)

---

## Navigation

### Mobile (< 768px)
Bottom tab bar with 4 tabs:
- Home (feed icon)
- Map (map icon)
- Categories (grid icon)
- About (info icon)

### Desktop (> 768px)
Top horizontal bar:
- Logo left
- Category pills center
- Search (Phase 2) right

---

## Responsive Behavior

### Mobile (< 768px)
- Bottom tab navigation
- Listing grid: 1 column (full-width stacked cards)
- Listing page hero: full-bleed (edge-to-edge)
- Map: full-screen on Map tab
- Contact buttons: full-width, sticky bottom
- Category pills: horizontally scrollable row
- Page margins: 16px

### Tablet (768px - 1024px)
- Top horizontal navigation
- Listing grid: 2 columns
- Listing page: photo left (60%), info right (40%)
- Page margins: 32px

### Desktop (> 1024px)
- Top nav with category pills inline
- Listing grid: 3 columns
- Listing page: photo left (50%), info right (50%), reviews below
- Map: split view (map left, listing cards right)
- Max-width: 1200px centered

---

## Interaction States

Every feature must handle these states:

| State | Pattern |
|-------|---------|
| **Loading** | Skeleton shapes (pulsing gray) matching content layout. Never spinners. |
| **Empty** | Warm message + primary action CTA. Never "No items found." alone. |
| **Error** | Clear message + recovery action (retry/back). Never dead ends. |
| **Success** | Confirmation feedback (toast, checkmark, highlight). |

### Specific States

| Feature | Loading | Empty | Error |
|---------|---------|-------|-------|
| Homepage feed | Skeleton cards | "Be the first to discover!" + suggest CTA | "Can't load" + retry |
| Map | Tiles load progressively | (always has pins) | Text address list fallback |
| Listing page | Hero skeleton + text shimmer | (exists or 404) | "Can't load" + back button |
| Category filter | Skeleton grid | "No [X] spots yet. Know one?" + suggest | "Filter failed" + show all |
| Photo gallery | Blurred thumbnail placeholder | Warm placeholder food image | Placeholder image |

---

## Accessibility

- **Keyboard:** All interactive elements reachable via Tab
- **Focus:** 2px `--primary` orange outline on `:focus-visible`
- **Images:** Descriptive alt text: "[Business name] - [dish name]"
- **Map pins:** `aria-label="Location of [Business] in [barangay]"`
- **Ratings:** `aria-label="Rated [N] out of 5 stars"`
- **Category pills:** `role="tablist"` with `aria-selected` on active filter
- **Touch targets:** 44px minimum on all interactive elements
- **Reduced motion:** Respect `prefers-reduced-motion` (disable fly-to, map transitions)
- **Color:** Never convey information by color alone (always pair with icon/text)

---

## Anti-Patterns (DO NOT use)

These patterns make the platform look generic/AI-generated:

- ❌ 3-column feature grids with icons in colored circles
- ❌ Generic hero text ("Welcome to..." / "Your all-in-one...")
- ❌ Decorative blobs, floating circles, wavy SVG dividers
- ❌ Uniform border-radius on every element
- ❌ Centered-everything layout
- ❌ Cards with colored left borders
- ❌ Emoji as heading decorations (emoji only in category pills)
- ❌ Stock photos or illustrations (use real food photos only)
- ❌ Default gray OSM map tiles (use warm-toned custom style)
- ❌ system-ui or -apple-system as display font

---

## Design Principles (for implementation decisions)

1. **Food photos are the design.** Every layout decision serves the photography.
2. **Warmth over polish.** Cream backgrounds, soft shadows, rounded corners. Not sterile white.
3. **Mobile is primary.** Design for 375px first. Desktop is the enhancement.
4. **Subtract first.** If an element doesn't help the user find food, remove it.
5. **Trust through specificity.** Real business names, real barangays, real photos. No placeholders in production.
6. **Empty states are features.** Every empty state has warmth, context, and a next action.
7. **One action per screen.** The user should never wonder "what do I do here?"
