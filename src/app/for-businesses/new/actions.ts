"use server";

import { eq } from "drizzle-orm";
import { z } from "zod";
import { db, schema } from "@/db";
import { getCurrentDbUser } from "@/lib/current-user";
import { CategoryEnum } from "@/types/listing";

const submitSchema = z.object({
  name: z.string().trim().min(2, "Name is too short").max(120),
  category: CategoryEnum,
  barangay: z.string().trim().min(2, "Barangay is required").max(80),
  description: z.string().trim().max(2000).default(""),
  contactPhone: z.string().trim().max(40).optional(),
  contactFacebook: z.string().trim().max(200).optional(),
});

export type SubmitState = {
  ok: boolean;
  error?: string;
  slug?: string;
};

function slugify(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 60);
}

export async function submitBusiness(
  _prev: SubmitState,
  formData: FormData
): Promise<SubmitState> {
  const user = await getCurrentDbUser();
  if (!user) {
    return { ok: false, error: "You must be signed in to submit a spot." };
  }

  const parsed = submitSchema.safeParse({
    name: formData.get("name"),
    category: formData.get("category"),
    barangay: formData.get("barangay"),
    description: formData.get("description") ?? "",
    contactPhone: formData.get("contactPhone") || undefined,
    contactFacebook: formData.get("contactFacebook") || undefined,
  });

  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message ?? "Please check the form.";
    return { ok: false, error: first };
  }

  const data = parsed.data;
  let slug = slugify(data.name);

  try {
    // Ensure slug uniqueness.
    const clash = await db
      .select({ id: schema.businesses.id })
      .from(schema.businesses)
      .where(eq(schema.businesses.slug, slug))
      .limit(1);
    if (clash.length > 0) {
      slug = `${slug}-${Math.random().toString(36).slice(2, 6)}`;
    }

    await db.insert(schema.businesses).values({
      name: data.name,
      slug,
      description: data.description,
      category: data.category,
      barangay: data.barangay,
      contactPhone: data.contactPhone ?? null,
      contactFacebook: data.contactFacebook ?? null,
      status: "pending", // curator reviews before it goes live
      isClaimed: true,
      ownerId: user.id,
    });

    return { ok: true, slug };
  } catch (err) {
    console.error("submitBusiness error:", err);
    return { ok: false, error: "Could not submit. Please try again." };
  }
}
