import { auth, currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { db, schema } from "@/db";
import type { UserRow } from "@/db/schema";

/*
  Resolve the DB user row for the signed-in Clerk user.

  The webhook normally creates the row on sign-up, but we also upsert here as
  a fallback (e.g. first action before the webhook lands, or local dev without
  a public webhook endpoint). Returns null when nobody is signed in.
*/
export async function getCurrentDbUser(): Promise<UserRow | null> {
  const { userId } = await auth();
  if (!userId) return null;

  const existing = await db
    .select()
    .from(schema.users)
    .where(eq(schema.users.clerkId, userId))
    .limit(1);

  if (existing.length > 0) return existing[0];

  // Fallback upsert using Clerk profile data.
  const clerkUser = await currentUser();
  const email =
    clerkUser?.primaryEmailAddress?.emailAddress ??
    clerkUser?.emailAddresses[0]?.emailAddress ??
    "";
  const displayName = [clerkUser?.firstName, clerkUser?.lastName]
    .filter(Boolean)
    .join(" ")
    .trim();

  const inserted = await db
    .insert(schema.users)
    .values({ clerkId: userId, email, displayName })
    .returning();

  return inserted[0];
}
