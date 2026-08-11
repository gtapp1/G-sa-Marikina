import { NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";
import { z } from "zod";
import { db, schema } from "@/db";
import { getCurrentDbUser } from "@/lib/current-user";
import { listings } from "@/data/listings";

export const dynamic = "force-dynamic";

// GET /api/reviews?slug=sweet-bites-cookies → list reviews for a business
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");
  if (!slug) {
    return NextResponse.json({ error: "Missing slug" }, { status: 400 });
  }

  try {
    const rows = await db
      .select({
        id: schema.reviews.id,
        rating: schema.reviews.rating,
        body: schema.reviews.body,
        createdAt: schema.reviews.createdAt,
        authorName: schema.users.displayName,
      })
      .from(schema.reviews)
      .leftJoin(schema.users, eq(schema.reviews.userId, schema.users.id))
      .where(eq(schema.reviews.businessSlug, slug))
      .orderBy(desc(schema.reviews.createdAt));

    return NextResponse.json({ reviews: rows });
  } catch (err) {
    console.error("GET /api/reviews error:", err);
    return NextResponse.json({ reviews: [] });
  }
}

const createReviewSchema = z.object({
  slug: z.string().min(1),
  rating: z.number().int().min(1).max(5),
  body: z.string().trim().max(2000).default(""),
});

// POST /api/reviews → create a review (auth required)
export async function POST(req: Request) {
  const user = await getCurrentDbUser();
  if (!user) {
    return NextResponse.json({ error: "Sign in required" }, { status: 401 });
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = createReviewSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid review", issues: parsed.error.flatten() },
      { status: 422 }
    );
  }

  const { slug, rating, body } = parsed.data;

  try {
    // Resolve the business id. Prefer a DB row; fall back to the static
    // catalog (Phase 1 listings that haven't been migrated yet).
    const dbBiz = await db
      .select({ id: schema.businesses.id })
      .from(schema.businesses)
      .where(eq(schema.businesses.slug, slug))
      .limit(1);

    let businessId = dbBiz[0]?.id;

    if (!businessId) {
      const seed = listings.find((l) => l.slug === slug);
      if (!seed) {
        return NextResponse.json(
          { error: "Business not found" },
          { status: 404 }
        );
      }
      // Insert the seed business so the review has a valid FK target.
      const insertedBiz = await db
        .insert(schema.businesses)
        .values({
          name: seed.name,
          slug: seed.slug,
          description: seed.description,
          category: seed.category,
          barangay: seed.barangay,
          latitude: seed.latitude,
          longitude: seed.longitude,
          contactPhone: seed.contactPhone,
          contactFacebook: seed.contactFacebook,
          photos: seed.photos,
          status: "published",
        })
        .onConflictDoNothing({ target: schema.businesses.slug })
        .returning({ id: schema.businesses.id });

      businessId =
        insertedBiz[0]?.id ??
        (
          await db
            .select({ id: schema.businesses.id })
            .from(schema.businesses)
            .where(eq(schema.businesses.slug, slug))
            .limit(1)
        )[0]?.id;
    }

    if (!businessId) {
      return NextResponse.json(
        { error: "Business not found" },
        { status: 404 }
      );
    }

    const inserted = await db
      .insert(schema.reviews)
      .values({
        businessId,
        businessSlug: slug,
        userId: user.id,
        rating,
        body,
      })
      .returning();

    return NextResponse.json({ review: inserted[0] }, { status: 201 });
  } catch (err) {
    console.error("POST /api/reviews error:", err);
    return NextResponse.json({ error: "Could not save review" }, { status: 500 });
  }
}
