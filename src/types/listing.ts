import { z } from "zod";

export const CategoryEnum = z.enum([
  "cookies",
  "milk_tea",
  "street_food",
  "home_cooked",
  "resto",
  "bakery",
  "other",
]);

export type Category = z.infer<typeof CategoryEnum>;

export const ListingSchema = z.object({
  slug: z.string(),
  name: z.string(),
  description: z.string(),
  category: CategoryEnum,
  barangay: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  contactPhone: z.string().nullable(),
  contactFacebook: z.string().nullable(),
  photos: z.array(z.string()),
  products: z.array(
    z.object({
      name: z.string(),
      price: z.string().optional(),
      description: z.string().optional(),
    })
  ),
  rating: z.number().min(1).max(5),
  reviewCount: z.number(),
  foundersReview: z.string(),
});

export type Listing = z.infer<typeof ListingSchema>;

export const CATEGORY_LABELS: Record<Category, { label: string; icon: string }> = {
  cookies: { label: "Cookies", icon: "🍪" },
  milk_tea: { label: "Milk Tea", icon: "🧋" },
  street_food: { label: "Street Food", icon: "🍢" },
  home_cooked: { label: "Home Cooked", icon: "🍲" },
  resto: { label: "Restaurants", icon: "🍜" },
  bakery: { label: "Bakery", icon: "🍰" },
  other: { label: "Other", icon: "🍽️" },
};
