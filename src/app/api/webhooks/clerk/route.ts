import { Webhook } from "svix";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db, schema } from "@/db";

/*
  Clerk → Supabase user sync (eng-review decision D2, option A).

  Clerk fires this webhook on user.created / user.updated / user.deleted.
  We verify the svix signature, then upsert the matching row in our users
  table keyed by clerk_id. This keeps Clerk as the auth source of truth while
  our DB owns app data (reviews, businesses) linked by a stable user id.
*/

type ClerkEmail = { id: string; email_address: string };
type ClerkUserData = {
  id: string;
  email_addresses?: ClerkEmail[];
  primary_email_address_id?: string | null;
  first_name?: string | null;
  last_name?: string | null;
};
type ClerkEvent = {
  type: string;
  data: ClerkUserData;
};

function primaryEmail(data: ClerkUserData): string {
  const list = data.email_addresses ?? [];
  const primary = list.find((e) => e.id === data.primary_email_address_id);
  return primary?.email_address ?? list[0]?.email_address ?? "";
}

function displayName(data: ClerkUserData): string {
  return [data.first_name, data.last_name].filter(Boolean).join(" ").trim();
}

export async function POST(req: Request) {
  const secret = process.env.CLERK_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: "CLERK_WEBHOOK_SECRET not configured" },
      { status: 500 }
    );
  }

  // Verify the svix signature against the raw body.
  const h = await headers();
  const svixId = h.get("svix-id");
  const svixTimestamp = h.get("svix-timestamp");
  const svixSignature = h.get("svix-signature");
  if (!svixId || !svixTimestamp || !svixSignature) {
    return NextResponse.json({ error: "Missing svix headers" }, { status: 400 });
  }

  const payload = await req.text();
  let event: ClerkEvent;
  try {
    const wh = new Webhook(secret);
    event = wh.verify(payload, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as ClerkEvent;
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const { type, data } = event;

  try {
    if (type === "user.created" || type === "user.updated") {
      const email = primaryEmail(data);
      const name = displayName(data);

      const existing = await db
        .select({ id: schema.users.id })
        .from(schema.users)
        .where(eq(schema.users.clerkId, data.id))
        .limit(1);

      if (existing.length === 0) {
        await db.insert(schema.users).values({
          clerkId: data.id,
          email,
          displayName: name,
        });
      } else {
        await db
          .update(schema.users)
          .set({ email, displayName: name })
          .where(eq(schema.users.clerkId, data.id));
      }
    } else if (type === "user.deleted") {
      await db
        .delete(schema.users)
        .where(eq(schema.users.clerkId, data.id));
    }
  } catch (err) {
    console.error("Clerk webhook DB error:", err);
    return NextResponse.json({ error: "DB write failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
