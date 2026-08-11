import { MetadataRoute } from "next";
import { listings } from "@/data/listings";
import { CategoryEnum } from "@/types/listing";

const BASE_URL = "https://gsamarikina.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/map", "/categories", "/about"].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
  }));

  const listingRoutes = listings.map((listing) => ({
    url: `${BASE_URL}/${listing.slug}`,
    lastModified: new Date(),
  }));

  const categoryRoutes = CategoryEnum.options.map((id) => ({
    url: `${BASE_URL}/category/${id}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...listingRoutes, ...categoryRoutes];
}
