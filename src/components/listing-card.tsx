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

export function ListingCard({ listing, distanceKm }: ListingCardProps) {
  const category = CATEGORY_LABELS[listing.category];

  return (
    <Link
      href={`/${listing.slug}`}
      className="group block rounded-[var(--radius-md)] bg-[var(--bg-elevated)] overflow-hidden border border-[var(--border)] hover:border-[var(--border-strong)] transition-all duration-200"
    >
      {/* Photo */}
      <div className="aspect-[4/3] bg-[var(--bg-hover)] relative overflow-hidden">
        {listing.photos[0] ? (
          <img
            src={listing.photos[0]}
            alt={`${listing.name} - food photo`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <PhotoPlaceholder category={listing.category} />
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="text-base font-semibold text-[var(--text)] leading-tight group-hover:text-[var(--accent)] transition-colors duration-200">
          {listing.name}
        </h3>

        <div className="flex items-center gap-2 mt-2">
          <span className="text-xs text-[var(--text-muted)]">
            {category.label}
          </span>
          <span className="text-xs text-[var(--text-dim)]">·</span>
          <span className="text-xs text-[var(--text-muted)]">
            {listing.barangay}
          </span>
        </div>

        <div className="flex items-center gap-2 mt-2">
          <StarRating rating={listing.rating} size={13} />
          <span className="text-xs text-[var(--text-dim)]">
            ({listing.reviewCount})
          </span>
        </div>

        {typeof distanceKm === "number" && (
          <p className="mt-2 text-xs font-medium text-[var(--accent)]">
            {formatDistance(distanceKm)}
          </p>
        )}
      </div>
    </Link>
  );
}
