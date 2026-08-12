import { Category } from "@/types/listing";
import { CategoryIcon } from "./category-icon";

interface PhotoPlaceholderProps {
  category: Category;
  className?: string;
}

export function PhotoPlaceholder({ category, className }: PhotoPlaceholderProps) {
  return (
    <div
      className={`w-full h-full flex items-center justify-center bg-[var(--color-surface-subtle)] ${className ?? ""}`}
    >
      <CategoryIcon
        category={category}
        size={32}
        weight="light"
        className="text-[var(--color-text-primary)] opacity-30"
      />
    </div>
  );
}
