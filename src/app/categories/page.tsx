import { Metadata } from "next";
import Link from "next/link";
import { listings } from "@/data/listings";
import { CATEGORY_LABELS, CategoryEnum } from "@/types/listing";
import { CategoryIcon } from "@/components/category-icon";

export const metadata: Metadata = {
  title: "Categories — G sa Marikina",
  description: "Browse Marikina food spots by category.",
};

export default function CategoriesPage() {
  const categories = CategoryEnum.options.map((id) => {
    const count = listings.filter((l) => l.category === id).length;
    return { id, count, ...CATEGORY_LABELS[id] };
  });

  return (
    <main className="min-h-screen px-6 pt-8 pb-16 max-w-[1200px] mx-auto">
      <h1 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-extrabold text-[var(--color-text-primary)]">
        Categories
      </h1>
      <p className="mt-2 text-[var(--color-text-secondary)]">
        Browse Marikina food spots by type.
      </p>

      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/category/${cat.id}`}
            className="group flex flex-col items-center justify-center gap-3 p-6 rounded-[var(--radius-md)] bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:shadow-[0_4px_12px_rgba(61,44,30,0.12)] transition-all"
          >
            <span className="text-[var(--color-primary)] group-hover:scale-110 transition-transform">
              <CategoryIcon category={cat.id} size={32} weight="duotone" />
            </span>
            <span className="font-[family-name:var(--font-heading)] text-sm font-bold text-[var(--color-text-primary)] text-center">
              {cat.label}
            </span>
            <span className="text-xs text-[var(--color-text-secondary)]">
              {cat.count} {cat.count === 1 ? "spot" : "spots"}
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}
