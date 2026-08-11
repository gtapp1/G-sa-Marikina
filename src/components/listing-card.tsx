import Link from "next/link";
import { Listing, CATEGORY_LABELS } from "@/types/listing";
import { StarRating } from "./star-rating";
import { CategoryIcon } from "./category-icon";
import { PhotoPlaceholder } from "./photo-placeholder";
import { formatDistance } from "@/lib/distance";

interface ListingCardProps {
  listing: Listing;
  distanceKm?: number;
}

function isNew(dateAdded: string): boolean {
  const added = new Date(dateAdded).getTime();
  const fourteenDays = 14 * 24 * 60 * 60 * 1000;
  return Date.now() - added <= fourteenDays;
}

export function ListingCard({ listing, distanceKm }: ListingCardProps) {
  const category = CATEGORY_LABELS[listing.category];
  const badge =
    listing.rating >= 5
      ? { label: "Top rated", className: "bg-[var(--color-primary)] text-white" }
      : isNew(listing.dateAdded)
        ? {
            label: "New",
            className:
              "bg-[var(--color-surface)] text-[var(--color-primary-text)] border border-[var(--color-border)]",
          }
        : null;

  return (
    <Link
      href={`/${listing.slug}`}
      className="group block rounded-[var(--radius-md)] bg-[var(--color-surface)] shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-hover)] hover:-translate-y-0.5 transition-all duration-200 overflow-hidden border border-[var(--color-border)]"
    >
      {/* Photo */}
      <div className="aspect-[4/3] bg-[var(--color-border)] relative overflow-hidden">
        {badge && (
          <span
            className={`absolute left-3 top-3 z-20 rounded-full px-2.5 py-1 text-[11px] font-bold shadow-sm ${badge.className}`}
          >
            {badge.label}
          </span>
        )}
        {listing.photos[0] ? (
          <>
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent z-10" />
            <img
              src={listing.photos[0]}
              alt={`${listing.name} - food photo`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </>
        ) : (
          <PhotoPlaceholder category={listing.category} />
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-[var(--color-text-primary)] leading-tight">
          {listing.name}
        </h3>

        <div className="flex items-center gap-2 mt-2">
          {/* Category pill */}
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-xs rounded-full border border-[var(--color-border)] text-[var(--color-text-secondary)]">
            <CategoryIcon category={listing.category} size={14} />
            {category.label}
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

        {typeof distanceKm === "number" && (
          <p className="mt-1.5 text-xs font-medium text-[var(--color-primary-text)]">
            {formatDistance(distanceKm)}
          </p>
        )}
      </div>
    </Link>
  );
}
