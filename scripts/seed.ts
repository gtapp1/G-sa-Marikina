import { config } from "dotenv";
config({ path: ".env.local" });
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "../src/db/schema";
import { listings } from "../src/data/listings";

/*
  Seeds the static Phase 1 catalog into the DB as published businesses.
  Idempotent: onConflictDoNothing on slug means re-running is safe.

  Usage: npm run db:seed   (requires DATABASE_URL in .env.local / .env)
*/
async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL is not set. Add it to .env.local");
  }

  const client = postgres(url, { prepare: false });
  const db = drizzle(client, { schema });

  console.log(`Seeding ${listings.length} businesses...`);

  for (const l of listings) {
    await db
      .insert(schema.businesses)
      .values({
        name: l.name,
        slug: l.slug,
        description: l.description,
        category: l.category,
        barangay: l.barangay,
        latitude: l.latitude,
        longitude: l.longitude,
        contactPhone: l.contactPhone,
        contactFacebook: l.contactFacebook,
        photos: l.photos,
        status: "published",
      })
      .onConflictDoNothing({ target: schema.businesses.slug });
    console.log(`  ✓ ${l.name}`);
  }

  await client.end();
  console.log("Done.");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
