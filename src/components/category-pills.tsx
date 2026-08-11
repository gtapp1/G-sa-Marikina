import Link from "next/link";
import { CATEGORY_LABELS, Category } from "@/types/listing";

export function CategoryPills() {
  const categories = Object.entries(CATEGORY_LABELS) as [
    Category,
    { label: string; icon: string }
  ][];

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide max-w-[1200px] mx-auto">
      {categories.map(([key, { label, icon }]) => (
        <Link
          key={key}
          href={`/category/${key}`}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-full border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors whitespace-nowrap"
        >
          {icon} {label}
        </Link>
      ))}
    </div>
  );
}
