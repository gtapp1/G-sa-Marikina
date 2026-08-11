import Link from "next/link";
import { Listing, CATEGORY_LABELS } from "@/types/listing";
import { StarRating } from "./star-rating";

interface ListingCardProps {
  listing: Listing;
}

export function ListingCard({ listing }: ListingCardProps) {
  const category = CATEGORY_LABELS[listing.category];

  return (
    <Link
      href={`/${listing.slug}`}
      className="group block rounded-[var(--radius-md)] bg-[var(--color-surface)] shadow-[0_2px_8px_rgba(61,44,30,0.08)] hover:shadow-[0_4px_12px_rgba(61,44,30,0.12)] transition-shadow duration-200 overflow-hidden"
    >
      {/* Photo */}
      <div className="aspect-[4/3] bg-[var(--color-border)] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
        {listing.photos[0] ? (
          <img
            src={listing.photos[0]}
            alt={`${listing.name} - food photo`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl">
            {category.icon}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-[var(--color-text-primary)] leading-tight">
          {listing.name}
        </h3>

        <div className="flex items-center gap-2 mt-2">
          {/* Category pill */}
          <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full border border-[var(--color-border)] text-[var(--color-text-secondary)]">
            {category.icon} {category.label}
          </span>

          {/* Barangay */}
          <span className="text-xs text-[var(--color-text-secondary)]">
            {listing.barangay}
          </span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mt-2">
          <StarRating rating={listing.rating} size={16} />
          <span className="text-xs text-[var(--color-text-secondary)]">
            ({listing.reviewCount})
          </span>
        </div>
      </div>
    </Link>
  );
}
