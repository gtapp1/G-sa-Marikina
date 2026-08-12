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
    <main className="px-6 pt-10 pb-16 max-w-[1200px] mx-auto">
      <h1 className="text-3xl md:text-4xl text-[var(--text)]">Categories</h1>
      <p className="mt-2 text-sm text-[var(--text-muted)]">
        Browse by type.
      </p>

      <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/category/${cat.id}`}
            className="group flex flex-col items-center gap-3 p-6 rounded-[var(--radius-md)] bg-[var(--bg-elevated)] border border-[var(--border)] hover:border-[var(--accent)] transition-all duration-200"
          >
            <span className="text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors">
              <CategoryIcon category={cat.id} size={28} weight="duotone" />
            </span>
            <span className="text-sm font-medium text-[var(--text)] text-center">
              {cat.label}
            </span>
            <span className="text-xs text-[var(--text-dim)]">
              {cat.count} {cat.count === 1 ? "spot" : "spots"}
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}
