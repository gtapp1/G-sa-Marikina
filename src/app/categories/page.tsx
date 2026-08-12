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
    <main className="px-4 md:px-6 pt-8 pb-16 max-w-[1200px] mx-auto">
      <h1 className="text-[26px] md:text-[32px] font-bold text-[var(--color-text-secondary)] tracking-[-0.03em]">
        Categories
      </h1>
      <p className="mt-1 text-[13px] tracking-tight text-[var(--color-text-primary)]">
        Browse by type.
      </p>

      <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-[var(--color-border)]">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/category/${cat.id}`}
            className="group flex flex-col items-center gap-3 p-6 bg-white hover:bg-[var(--color-accent-light)] transition-colors duration-[var(--motion-fast)]"
          >
            <span className="text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors">
              <CategoryIcon category={cat.id} size={28} weight="duotone" />
            </span>
            <span className="text-[13px] font-bold tracking-tight text-[var(--color-text-secondary)] text-center group-hover:text-[var(--color-accent)] transition-colors">
              {cat.label}
            </span>
            <span className="text-[11px] tracking-tight text-[var(--color-text-primary)]">
              {cat.count} {cat.count === 1 ? "spot" : "spots"}
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}
