"use server";

import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db, schema } from "@/db";
import { getCurrentDbUser } from "@/lib/current-user";

async function requireAdmin() {
  const user = await getCurrentDbUser();
  if (!user || user.role !== "admin") {
    redirect("/");
  }
}

export async function approveBusiness(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id") as string;
  if (!id) redirect("/admin");

  await db
    .update(schema.businesses)
    .set({ status: "published" })
    .where(eq(schema.businesses.id, id));

  redirect("/admin");
}

export async function rejectBusiness(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id") as string;
  if (!id) redirect("/admin");

  await db
    .update(schema.businesses)
    .set({ status: "rejected" })
    .where(eq(schema.businesses.id, id));

  redirect("/admin");
}

export async function keepReview(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id") as string;
  if (!id) redirect("/admin");

  // Clear the reported flag
  await db
    .update(schema.reviews)
    .set({ isReported: false })
    .where(eq(schema.reviews.id, id));

  redirect("/admin");
}

export async function removeReview(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id") as string;
  if (!id) redirect("/admin");

  await db.delete(schema.reviews).where(eq(schema.reviews.id, id));

  redirect("/admin");
}
