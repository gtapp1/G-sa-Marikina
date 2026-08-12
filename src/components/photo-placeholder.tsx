import { Category } from "@/types/listing";
import { CategoryIcon } from "./category-icon";

interface PhotoPlaceholderProps {
  category: Category;
  className?: string;
}

export function PhotoPlaceholder({ category, className }: PhotoPlaceholderProps) {
  return (
    <div
      className={`w-full h-full flex items-center justify-center bg-[var(--bg-hover)] ${className ?? ""}`}
    >
      <CategoryIcon
        category={category}
        size={36}
        weight="light"
        className="text-[var(--text-dim)] opacity-40"
      />
    </div>
  );
}
