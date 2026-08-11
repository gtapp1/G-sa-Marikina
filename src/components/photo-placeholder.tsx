import { Category } from "@/types/listing";
import { CategoryIcon } from "./category-icon";

interface PhotoPlaceholderProps {
  category: Category;
  className?: string;
}

/*
  Warm branded placeholder for listings without a photo yet.
  A soft cream-to-beige gradient with a single muted category icon —
  intentionally quiet, not a giant emoji. Real photos replace this.
*/
export function PhotoPlaceholder({ category, className }: PhotoPlaceholderProps) {
  return (
    <div
      className={`w-full h-full flex items-center justify-center bg-gradient-to-br from-[#FFF6EA] to-[#F5E6D3] ${className ?? ""}`}
    >
      <CategoryIcon
        category={category}
        size={40}
        weight="light"
        className="text-[var(--color-primary)]/40"
      />
    </div>
  );
}
