import Link from "next/link";
import { CATEGORY_LABELS, Category } from "@/types/listing";
import { CategoryIcon } from "./category-icon";

export function CategoryPills() {
  const categories = Object.entries(CATEGORY_LABELS) as [
    Category,
    { label: string }
  ][];

  return (
    <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-hide">
      {categories.map(([key, { label }]) => (
        <Link
          key={key}
          href={`/category/${key}`}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-[var(--radius-sm)] border border-[var(--border-strong)] bg-[var(--bg-elevated)] text-[var(--text-muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all duration-150 whitespace-nowrap"
        >
          <CategoryIcon category={key} size={15} />
          {label}
        </Link>
      ))}
    </div>
  );
}
