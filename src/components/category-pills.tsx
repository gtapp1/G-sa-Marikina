import Link from "next/link";
import { CATEGORY_LABELS, Category } from "@/types/listing";
import { CategoryIcon } from "./category-icon";

export function CategoryPills() {
  const categories = Object.entries(CATEGORY_LABELS) as [
    Category,
    { label: string }
  ][];

  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
      {categories.map(([key, { label }]) => (
        <Link
          key={key}
          href={`/category/${key}`}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-[12px] font-bold tracking-tight rounded-[var(--radius-pill)] bg-[var(--color-accent-light)] text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white transition-all duration-[var(--motion-fast)] whitespace-nowrap"
        >
          <CategoryIcon category={key} size={14} />
          {label}
        </Link>
      ))}
    </div>
  );
}
