import Link from "next/link";
import { CATEGORY_LABELS, Category } from "@/types/listing";
import { CategoryIcon } from "./category-icon";

export function CategoryPills() {
  const categories = Object.entries(CATEGORY_LABELS) as [
    Category,
    { label: string }
  ][];

  return (
    <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
      {categories.map(([key, { label }]) => (
        <Link
          key={key}
          href={`/category/${key}`}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-[14px] font-bold tracking-tight rounded-full bg-white text-[var(--color-accent)] border border-[var(--color-border)] hover:bg-[var(--color-accent)] hover:text-white hover:border-[var(--color-accent)] transition-all duration-[var(--motion-fast)] whitespace-nowrap"
        >
          <CategoryIcon category={key} size={16} />
          {label}
        </Link>
      ))}
    </div>
  );
}
