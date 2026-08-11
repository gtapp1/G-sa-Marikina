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
  dateAdded: z.string(), // ISO date, used for "New" sorting
});

export type Listing = z.infer<typeof ListingSchema>;

export const CATEGORY_LABELS: Record<Category, { label: string }> = {
  cookies: { label: "Cookies" },
  milk_tea: { label: "Milk Tea" },
  street_food: { label: "Street Food" },
  home_cooked: { label: "Home Cooked" },
  resto: { label: "Restaurants" },
  bakery: { label: "Bakery" },
  other: { label: "Other" },
};
