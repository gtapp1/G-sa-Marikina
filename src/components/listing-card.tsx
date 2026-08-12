import Link from "next/link";
import { MapPin, Star } from "@phosphor-icons/react/dist/ssr";
import { Listing, CATEGORY_LABELS } from "@/types/listing";
import { PhotoPlaceholder } from "./photo-placeholder";
import { formatDistance } from "@/lib/distance";

interface ListingCardProps {
  listing: Listing;
  distanceKm?: number;
}

export function ListingCard({ listing, distanceKm }: ListingCardProps) {
  const category = CATEGORY_LABELS[listing.category];

  return (
    <Link href={`/${listing.slug}`} className="group block">
      {/* Photo — no border, just rounded image */}
      <div className="relative aspect-[4/3] rounded-[var(--radius-md)] overflow-hidden bg-[var(--color-surface-subtle)]">
        {listing.photos[0] ? (
          <img
            src={listing.photos[0]}
            alt={`${listing.name}`}
            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-[var(--motion-normal)]"
          />
        ) : (
          <PhotoPlaceholder category={listing.category} />
        )}
      </div>

      {/* Info — minimal, Resy style */}
      <div className="mt-2.5">
        <h3 className="text-sm font-bold text-[var(--color-text-secondary)] leading-tight truncate group-hover:text-[var(--color-surface-strong)] transition-colors duration-[var(--motion-fast)]">
          {listing.name}
        </h3>
        <div className="flex items-center gap-1 mt-1 text-xs text-[var(--color-text-primary)]">
          <Star size={11} weight="fill" className="text-[var(--color-surface-strong)]" />
          <span className="font-medium">{listing.rating}.0</span>
          <span>·</span>
          <span>{category.label}</span>
        </div>
        <div className="flex items-center gap-1 mt-0.5 text-xs text-[var(--color-text-primary)]">
          <MapPin size={11} />
          <span>{listing.barangay}</span>
        </div>
        {typeof distanceKm === "number" && (
          <p className="mt-0.5 text-xs font-medium text-[var(--color-surface-strong)]">
            {formatDistance(distanceKm)}
          </p>
        )}
      </div>
    </Link>
  );
}
