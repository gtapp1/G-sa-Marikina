import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { eq, sql, desc } from "drizzle-orm";
import { Plus } from "@phosphor-icons/react/dist/ssr";
import { db, schema } from "@/db";
import { getCurrentDbUser } from "@/lib/current-user";
import { CATEGORY_LABELS, Category } from "@/types/listing";
import { CategoryIcon } from "@/components/category-icon";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Your spots — G sa Marikina",
};

const STATUS_STYLE: Record<string, { label: string; className: string }> = {
  pending: {
    label: "Under review",
    className: "bg-[#FEF3C7] text-[#92400E]",
  },
  published: {
    label: "Live",
    className: "bg-[#DCFCE7] text-[#166534]",
  },
  rejected: {
    label: "Not approved",
    className: "bg-[#FEE2E2] text-[#991B1B]",
  },
};

export default async function DashboardPage() {
  const user = await getCurrentDbUser();
  if (!user) {
    redirect("/sign-in?redirect_url=/dashboard");
  }

  const rows = await db
    .select({
      id: schema.businesses.id,
      name: schema.businesses.name,
      slug: schema.businesses.slug,
      category: schema.businesses.category,
      barangay: schema.businesses.barangay,
      status: schema.businesses.status,
      reviewCount: sql<number>`count(${schema.reviews.id})`.mapWith(Number),
      avgRating:
        sql<number>`coalesce(avg(${schema.reviews.rating}), 0)`.mapWith(Number),
    })
    .from(schema.businesses)
    .leftJoin(
      schema.reviews,
      eq(schema.reviews.businessId, schema.businesses.id)
    )
    .where(eq(schema.businesses.ownerId, user.id))
    .groupBy(schema.businesses.id)
    .orderBy(desc(schema.businesses.createdAt));

  return (
    <main className="min-h-screen px-6 pt-8 pb-16 max-w-[900px] mx-auto">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-extrabold text-[var(--color-text-primary)]">
            Your spots
          </h1>
          <p className="mt-2 text-[var(--color-text-secondary)]">
            Listings you&apos;ve submitted and their status.
          </p>
        </div>
        <Link
          href="/for-businesses/new"
          className="inline-flex shrink-0 items-center gap-2 rounded-[var(--radius-sm)] bg-[var(--color-primary)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-primary-hover)]"
        >
          <Plus size={16} weight="bold" /> Add a spot
        </Link>
      </div>

      {rows.length === 0 ? (
        <div className="mt-10 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] p-8 text-center">
          <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold text-[var(--color-text-primary)]">
            No spots yet
          </h2>
          <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
            List your food business so people in Marikina can find it.
          </p>
          <Link
            href="/for-businesses/new"
            className="mt-4 inline-flex items-center gap-2 rounded-[var(--radius-sm)] bg-[var(--color-primary)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-primary-hover)]"
          >
            <Plus size={16} weight="bold" /> Add your first spot
          </Link>
        </div>
      ) : (
        <ul className="mt-8 space-y-3">
          {rows.map((b) => {
            const status = STATUS_STYLE[b.status] ?? STATUS_STYLE.pending;
            return (
              <li
                key={b.id}
                className="flex items-center gap-4 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--color-background)] text-[var(--color-primary)]">
                  <CategoryIcon
                    category={b.category as Category}
                    size={22}
                    weight="duotone"
                  />
                </span>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="truncate font-[family-name:var(--font-heading)] font-bold text-[var(--color-text-primary)]">
                      {b.name}
                    </h3>
                    <span
                      className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${status.className}`}
                    >
                      {status.label}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-[var(--color-text-secondary)]">
                    {CATEGORY_LABELS[b.category as Category].label} ·{" "}
                    {b.barangay} · {b.reviewCount}{" "}
                    {b.reviewCount === 1 ? "review" : "reviews"}
                    {b.reviewCount > 0 && ` · ${b.avgRating.toFixed(1)}★`}
                  </p>
                </div>

                {b.status === "published" && (
                  <Link
                    href={`/${b.slug}`}
                    className="shrink-0 text-sm font-semibold text-[var(--color-primary-text)] hover:underline"
                  >
                    View
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}
