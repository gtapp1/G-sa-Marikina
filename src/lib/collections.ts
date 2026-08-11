import { listings } from "@/data/listings";
import { Listing } from "@/types/listing";

export interface Collection {
  id: string;
  title: string;
  blurb: string;
  listings: Listing[];
}

/*
  Collections are derived from catalog data, not hand-curated, so they stay
  fresh as listings change. Editorial collections can be layered later.
*/
export function getCollections(): Collection[] {
  const topRated = [...listings]
    .filter((l) => l.rating >= 5)
    .sort((a, b) => b.reviewCount - a.reviewCount);

  const hiddenGems = [...listings]
    .filter((l) => l.rating >= 4 && l.reviewCount <= 12)
    .sort((a, b) => b.rating - a.rating);

  const justAdded = [...listings].sort(
    (a, b) =>
      new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
  );

  return [
    {
      id: "top-rated",
      title: "Top rated",
      blurb: "The spots Marikeños rate five stars.",
      listings: topRated,
    },
    {
      id: "hidden-gems",
      title: "Hidden gems",
      blurb: "Great food that not enough people know about yet.",
      listings: hiddenGems,
    },
    {
      id: "just-added",
      title: "Just added",
      blurb: "The newest spots on the directory.",
      listings: justAdded.slice(0, 6),
    },
  ].filter((c) => c.listings.length > 0);
}
