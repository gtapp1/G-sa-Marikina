import { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { eq, sql, desc, count } from "drizzle-orm";
import { db, schema } from "@/db";
import { getCurrentDbUser } from "@/lib/current-user";
import { CATEGORY_LABELS, Category } from "@/types/listing";
import { CategoryIcon } from "@/components/category-icon";
import { approveBusiness, rejectBusiness, keepReview, removeReview } from "./actions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin | G sa Marikina",
};

export default async function AdminPage() {
  const user = await getCurrentDbUser();
  if (!user || user.role !== "admin") {
    redirect("/");
  }

  // Stats
  const [bizStats] = await db
    .select({
      total: count(),
      published: sql<number>`count(*) filter (where ${schema.businesses.status} = 'published')`.mapWith(Number),
      pending: sql<number>`count(*) filter (where ${schema.businesses.status} = 'pending')`.mapWith(Number),
      rejected: sql<number>`count(*) filter (where ${schema.businesses.status} = 'rejected')`.mapWith(Number),
    })
    .from(schema.businesses);

  const [reviewStats] = await db
    .select({
      total: count(),
      reported: sql<number>`count(*) filter (where ${schema.reviews.isReported} = true)`.mapWith(Number),
    })
    .from(schema.reviews);

  const [userStats] = await db
    .select({ total: count() })
    .from(schema.users);

  // Pending submissions
  const pending = await db
    .select({
      id: schema.businesses.id,
      name: schema.businesses.name,
      slug: schema.businesses.slug,
      category: schema.businesses.category,
      barangay: schema.businesses.barangay,
      createdAt: schema.businesses.createdAt,
    })
    .from(schema.businesses)
    .where(eq(schema.businesses.status, "pending"))
    .orderBy(desc(schema.businesses.createdAt))
    .limit(20);

  // Reported reviews
  const reported = await db
    .select({
      id: schema.reviews.id,
      businessSlug: schema.reviews.businessSlug,
      rating: schema.reviews.rating,
      body: schema.reviews.body,
      createdAt: schema.reviews.createdAt,
      authorName: schema.users.displayName,
    })
    .from(schema.reviews)
    .leftJoin(schema.users, eq(schema.reviews.userId, schema.users.id))
    .where(eq(schema.reviews.isReported, true))
    .orderBy(desc(schema.reviews.createdAt))
    .limit(20);

  return (
    <main className="min-h-screen px-5 md:px-10 pt-8 pb-16 max-w-[1200px] mx-auto">
      <h1 className="text-[28px] font-bold text-[var(--color-text-secondary)] tracking-[-0.03em]">
        Admin
      </h1>
      <p className="mt-1 text-[14px] tracking-tight text-[var(--color-text-primary)]">
        Platform overview and moderation tools.
      </p>

      {/* Stats grid */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Published", value: bizStats.published },
          { label: "Pending", value: bizStats.pending },
          { label: "Reviews", value: reviewStats.total },
          { label: "Users", value: userStats.total },
        ].map((stat) => (
          <div
            key={stat.label}
            className="border border-[var(--color-border)] bg-white p-4"
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.06em] text-[var(--color-text-primary)]">
              {stat.label}
            </p>
            <p className="mt-1 text-[28px] font-bold text-[var(--color-text-secondary)] tracking-tight">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Pending submissions */}
      <section className="mt-12">
        <h2 className="text-[20px] font-bold text-[var(--color-text-secondary)] tracking-[-0.02em]">
          Pending submissions ({bizStats.pending})
        </h2>
        {pending.length === 0 ? (
          <p className="mt-4 text-[14px] text-[var(--color-text-primary)]">
            No pending submissions.
          </p>
        ) : (
          <div className="mt-4 border border-[var(--color-border)] bg-white divide-y divide-[var(--color-border)]">
            {pending.map((biz) => (
              <div
                key={biz.id}
                className="flex items-center gap-4 px-5 py-4"
              >
                <span className="text-[var(--color-accent)]">
                  <CategoryIcon
                    category={biz.category as Category}
                    size={18}
                    weight="duotone"
                  />
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-bold tracking-tight text-[var(--color-text-secondary)] truncate">
                    {biz.name}
                  </p>
                  <p className="text-[12px] tracking-tight text-[var(--color-text-primary)]">
                    {CATEGORY_LABELS[biz.category as Category].label} · {biz.barangay}
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <form action={approveBusiness}>
                    <input type="hidden" name="id" value={biz.id} />
                    <button
                      type="submit"
                      className="px-3 py-1.5 text-[12px] font-bold tracking-tight bg-[var(--color-success)] text-white hover:opacity-90 transition-opacity"
                    >
                      Approve
                    </button>
                  </form>
                  <form action={rejectBusiness}>
                    <input type="hidden" name="id" value={biz.id} />
                    <button
                      type="submit"
                      className="px-3 py-1.5 text-[12px] font-bold tracking-tight bg-[var(--color-error)] text-white hover:opacity-90 transition-opacity"
                    >
                      Reject
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Reported reviews */}
      <section className="mt-12">
        <h2 className="text-[20px] font-bold text-[var(--color-text-secondary)] tracking-[-0.02em]">
          Reported reviews ({reviewStats.reported})
        </h2>
        {reported.length === 0 ? (
          <p className="mt-4 text-[14px] text-[var(--color-text-primary)]">
            No reported reviews.
          </p>
        ) : (
          <div className="mt-4 border border-[var(--color-border)] bg-white divide-y divide-[var(--color-border)]">
            {reported.map((rev) => (
              <div key={rev.id} className="px-5 py-4">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-bold tracking-tight text-[var(--color-text-secondary)]">
                    {rev.authorName || "Anonymous"}
                  </span>
                  <Link
                    href={`/${rev.businessSlug}`}
                    className="text-[12px] font-bold tracking-tight text-[var(--color-accent)]"
                  >
                    View listing
                  </Link>
                </div>
                <p className="mt-1 text-[13px] tracking-tight text-[var(--color-text-primary)] line-clamp-2">
                  {rev.body || `(${rev.rating}-star rating, no text)`}
                </p>
                <div className="mt-2 flex gap-2">
                  <form action={keepReview}>
                    <input type="hidden" name="id" value={rev.id} />
                    <button
                      type="submit"
                      className="px-3 py-1 text-[11px] font-bold tracking-tight border border-[var(--color-border)] text-[var(--color-text-primary)] hover:bg-[var(--color-surface-subtle)] transition-colors"
                    >
                      Keep
                    </button>
                  </form>
                  <form action={removeReview}>
                    <input type="hidden" name="id" value={rev.id} />
                    <button
                      type="submit"
                      className="px-3 py-1 text-[11px] font-bold tracking-tight bg-[var(--color-error)] text-white hover:opacity-90 transition-opacity"
                    >
                      Remove
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
