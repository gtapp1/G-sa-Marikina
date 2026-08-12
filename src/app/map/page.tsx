import { Metadata } from "next";
import { listings } from "@/data/listings";
import { FoodMap } from "@/components/food-map";

export const metadata: Metadata = {
  title: "Map — G sa Marikina",
  description: "Explore Marikina's food spots on the map.",
};

export default function MapPage() {
  return <FoodMap listings={listings} showSidebar />;
}
