import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { Phone, FacebookLogo, ArrowLeft, MapPin } from "@phosphor-icons/react/dist/ssr";
import { listings } from "@/data/listings";
import { CATEGORY_LABELS } from "@/types/listing";
import { StarRating } from "@/components/star-rating";
import { PhotoGallery } from "@/components/photo-gallery";
import { ListingLocation } from "@/components/listing-location";
import { ShareButton } from "@/components/share-button";
import { CategoryIcon } from "@/components/category-icon";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { Reviews } from "@/components/reviews";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return listings.map((listing) => ({ slug: listing.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const listing = listings.find((l) => l.slug === slug);
  if (!listing) return { title: "Not Found" };
  return {
    title: `${listing.name} — G sa Marikina`,
    description: listing.description,
  };
}

export default async function ListingPage({ params }: PageProps) {
  const { slug } = await params;
  const listing = listings.find((l) => l.slug === slug);
  if (!listing) notFound();

  const category = CATEGORY_LABELS[listing.category];

  return (
    <main className="pb-24">
      {/* Back */}
      <div className="px-6 pt-6 max-w-[800px] mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
        >
          <ArrowLeft size={14} /> Back
        </Link>
      </div>

      {/* Hero photo */}
      <div className="mt-4 aspect-[16/9] md:aspect-[2.2/1] bg-[var(--bg-elevated)] overflow-hidden md:rounded-[var(--radius-lg)] md:max-w-[1000px] md:mx-auto">
        {listing.photos[0] ? (
          <img
            src={listing.photos[0]}
            alt={`${listing.name}`}
            className="w-full h-full object-cover"
          />
        ) : (
          <PhotoPlaceholder category={listing.category} />
        )}
      </div>

      {/* Content */}
      <div className="px-6 mt-8 max-w-[680px] mx-auto">
        {/* Header */}
        <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
          <CategoryIcon category={listing.category} size={13} />
          <span>{category.label}</span>
          <span className="text-[var(--text-dim)]">·</span>
          <MapPin size={12} />
          <span>{listing.barangay}</span>
        </div>

        <h1 className="mt-3 text-3xl md:text-4xl text-[var(--text)] leading-tight">
          {listing.name}
        </h1>

        <div className="flex items-center gap-3 mt-3">
          <StarRating rating={listing.rating} size={16} />
          <span className="text-sm text-[var(--text-muted)]">
            {listing.reviewCount} reviews
          </span>
        </div>

        {/* Editorial review */}
        <blockquote className="mt-8 pl-4 border-l-2 border-[var(--accent)] text-base md:text-lg leading-relaxed text-[var(--text-muted)] italic">
          &ldquo;{listing.foundersReview}&rdquo;
        </blockquote>

        {/* Description */}
        <p className="mt-8 text-sm leading-relaxed text-[var(--text-muted)]">
          {listing.description}
        </p>

        {/* Contact block */}
        <div className="mt-8 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--bg-elevated)] overflow-hidden">
          {listing.contactPhone && (
            <a
              href={`tel:${listing.contactPhone}`}
              className="flex items-center gap-3 px-4 py-3 text-sm text-[var(--text)] hover:bg-[var(--bg-hover)] transition-colors border-b border-[var(--border)]"
            >
              <Phone size={16} className="text-[var(--accent)]" />
              {listing.contactPhone}
            </a>
          )}
          {listing.contactFacebook && (
            <a
              href={listing.contactFacebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 text-sm text-[var(--text)] hover:bg-[var(--bg-hover)] transition-colors border-b border-[var(--border)]"
            >
              <FacebookLogo size={16} className="text-[var(--accent)]" />
              Facebook
            </a>
          )}
          <div className="flex items-center gap-3 px-4 py-3 text-sm text-[var(--text-muted)]">
            <MapPin size={16} className="text-[var(--accent)]" />
            {listing.barangay}, Marikina City
          </div>
        </div>

        {/* Photo Gallery */}
        <PhotoGallery photos={listing.photos} name={listing.name} />

        {/* Menu */}
        <div className="mt-10">
          <h2 className="text-xl text-[var(--text)] mb-4">Menu</h2>
          <div className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--bg-elevated)] overflow-hidden divide-y divide-[var(--border)]">
            {listing.products.map((product, i) => (
              <div key={i} className="flex items-center justify-between px-4 py-3 hover:bg-[var(--bg-hover)] transition-colors">
                <span className="text-sm text-[var(--text)]">{product.name}</span>
                {product.price && (
                  <span className="text-sm font-semibold text-[var(--accent)]">{product.price}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <Reviews slug={listing.slug} />

        {/* Location */}
        <ListingLocation
          latitude={listing.latitude}
          longitude={listing.longitude}
          barangay={listing.barangay}
          category={listing.category}
        />

        {/* Share */}
        <div className="mt-10">
          <ShareButton title={listing.name} slug={listing.slug} />
        </div>
      </div>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: listing.name,
            description: listing.description,
            address: { "@type": "PostalAddress", addressLocality: "Marikina City", addressRegion: "Metro Manila", addressCountry: "PH" },
            geo: { "@type": "GeoCoordinates", latitude: listing.latitude, longitude: listing.longitude },
            aggregateRating: { "@type": "AggregateRating", ratingValue: listing.rating, reviewCount: listing.reviewCount },
          }),
        }}
      />
    </main>
  );
}
