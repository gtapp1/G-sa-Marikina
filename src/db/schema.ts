import {
  pgTable,
  uuid,
  text,
  integer,
  boolean,
  timestamp,
  doublePrecision,
  pgEnum,
  index,
} from "drizzle-orm/pg-core";

/*
  Data model (Phase 2). Mirrors docs/design-doc.md.

  ┌─────────┐        ┌───────────┐        ┌─────────┐
  │  users  │◄──────┐│ businesses │◄──────┐│ reviews │
  └─────────┘  owner └───────────┘ business└─────────┘
       ▲ author ─────────────────────────────┘
  users.clerk_id is the join key to Clerk (see webhook sync).
*/

export const categoryEnum = pgEnum("category", [
  "cookies",
  "milk_tea",
  "street_food",
  "home_cooked",
  "resto",
  "bakery",
  "other",
]);

export const roleEnum = pgEnum("role", [
  "consumer",
  "business_owner",
  "admin",
]);

export const businessStatusEnum = pgEnum("business_status", [
  "pending", // owner-submitted, awaiting review
  "published", // live on the site
  "rejected",
]);

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  // Clerk user id — the join key set by the webhook sync.
  clerkId: text("clerk_id").notNull().unique(),
  email: text("email").notNull(),
  displayName: text("display_name").notNull().default(""),
  role: roleEnum("role").notNull().default("consumer"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const businesses = pgTable(
  "businesses",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    slug: text("slug").notNull().unique(),
    description: text("description").notNull().default(""),
    category: categoryEnum("category").notNull().default("other"),
    barangay: text("barangay").notNull().default(""),
    latitude: doublePrecision("latitude"),
    longitude: doublePrecision("longitude"),
    contactPhone: text("contact_phone"),
    contactFacebook: text("contact_facebook"),
    photos: text("photos").array().notNull().default([]),
    status: businessStatusEnum("status").notNull().default("pending"),
    isClaimed: boolean("is_claimed").notNull().default(false),
    ownerId: uuid("owner_id").references(() => users.id, {
      onDelete: "set null",
    }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => ({
    slugIdx: index("businesses_slug_idx").on(t.slug),
    statusIdx: index("businesses_status_idx").on(t.status),
  })
);

export const reviews = pgTable(
  "reviews",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    businessId: uuid("business_id")
      .notNull()
      .references(() => businesses.id, { onDelete: "cascade" }),
    // Denormalized slug so we can query reviews by slug without a join.
    businessSlug: text("business_slug").notNull(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    rating: integer("rating").notNull(),
    body: text("body").notNull().default(""),
    photos: text("photos").array().notNull().default([]),
    isReported: boolean("is_reported").notNull().default(false),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => ({
    bySlugIdx: index("reviews_business_slug_idx").on(t.businessSlug),
  })
);

export type UserRow = typeof users.$inferSelect;
export type BusinessRow = typeof businesses.$inferSelect;
export type ReviewRow = typeof reviews.$inferSelect;
