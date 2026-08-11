import {
  Cookie,
  Coffee,
  Hamburger,
  CookingPot,
  ForkKnife,
  Cake,
} from "@phosphor-icons/react/dist/ssr";
import type { ComponentType } from "react";
import { Category } from "@/types/listing";

type PhosphorWeight =
  | "thin"
  | "light"
  | "regular"
  | "bold"
  | "fill"
  | "duotone";

type PhosphorIcon = ComponentType<{
  size?: number;
  weight?: PhosphorWeight;
  className?: string;
  "aria-hidden"?: boolean;
}>;

const ICON_MAP: Record<Category, PhosphorIcon> = {
  cookies: Cookie,
  milk_tea: Coffee,
  street_food: Hamburger,
  home_cooked: CookingPot,
  resto: ForkKnife,
  bakery: Cake,
  other: ForkKnife,
};

interface CategoryIconProps {
  category: Category;
  size?: number;
  weight?: PhosphorWeight;
  className?: string;
}

export function CategoryIcon({
  category,
  size = 20,
  weight = "regular",
  className,
}: CategoryIconProps) {
  const IconComponent = ICON_MAP[category];
  return (
    <IconComponent size={size} weight={weight} className={className} aria-hidden />
  );
}
