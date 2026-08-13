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
      <div className="px-5 md:px-10 pt-8 max-w-[1000px] mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-[14px] font-semibold tracking-tight text-[var(--color-text-primary)] hover:text-[var(--color-accent)] transition-colors"
        >
          <ArrowLeft size={15} /> Back
        </Link>
      </div>

      {/* Hero photo */}
      <div className="mt-5 aspect-video md:aspect-[2.4/1] bg-[var(--color-surface-subtle)] overflow-hidden rounded-[var(--radius-xs)] md:max-w-[1200px] md:mx-auto">
        {listing.photos[0] ? (
          <img
            src={listing.photos[0]}
            alt={listing.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <PhotoPlaceholder category={listing.category} />
        )}
      </div>

      {/* Content */}
      <div className="px-5 md:px-10 mt-10 max-w-[860px] mx-auto">
        {/* Category + barangay */}
        <div className="flex items-center gap-2 text-[13px] tracking-tight text-[var(--color-text-primary)]">
          <CategoryIcon category={listing.category} size={14} />
          <span>{category.label}</span>
          <span className="opacity-40">·</span>
          <MapPin size={13} />
          <span>{listing.barangay}</span>
        </div>

        {/* Name */}
        <h1 className="mt-3 text-[32px] md:text-[44px] font-bold text-[var(--color-text-secondary)] leading-tight tracking-[-0.03em]">
          {listing.name}
        </h1>

        {/* Rating */}
        <div className="flex items-center gap-3 mt-3">
          <StarRating rating={listing.rating} size={18} />
          <span className="text-[14px] tracking-tight text-[var(--color-text-primary)]">
            {listing.reviewCount} reviews
          </span>
        </div>

        {/* Editorial review */}
        <blockquote className="mt-8 pl-5 border-l-[3px] border-[var(--color-accent)] text-[16px] md:text-[18px] leading-relaxed text-[var(--color-text-primary)] italic">
          &ldquo;{listing.foundersReview}&rdquo;
        </blockquote>

        {/* Description */}
        <p className="mt-8 text-[15px] leading-relaxed tracking-tight text-[var(--color-text-primary)]">
          {listing.description}
        </p>

        {/* Contact block */}
        <div className="mt-10 border border-[var(--color-border)] bg-white overflow-hidden divide-y divide-[var(--color-border)]">
          {listing.contactPhone && (
            <a
              href={`tel:${listing.contactPhone}`}
              className="flex items-center gap-4 px-5 py-4 text-[14px] tracking-tight text-[var(--color-text-secondary)] hover:bg-[var(--color-accent-light)] transition-colors"
            >
              <Phone size={18} className="text-[var(--color-accent)] shrink-0" />
              {listing.contactPhone}
            </a>
          )}
          {listing.contactFacebook && (
            <a
              href={listing.contactFacebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 px-5 py-4 text-[14px] tracking-tight text-[var(--color-text-secondary)] hover:bg-[var(--color-accent-light)] transition-colors"
            >
              <FacebookLogo size={18} className="text-[var(--color-accent)] shrink-0" />
              Facebook page
            </a>
          )}
          <div className="flex items-center gap-4 px-5 py-4 text-[14px] tracking-tight text-[var(--color-text-primary)]">
            <MapPin size={18} className="text-[var(--color-accent)] shrink-0" />
            {listing.barangay}, Marikina City
          </div>
        </div>

        {/* Photo Gallery */}
        <PhotoGallery photos={listing.photos} name={listing.name} />

        {/* Menu */}
        <div className="mt-12">
          <h2 className="text-[22px] md:text-[26px] font-bold text-[var(--color-text-secondary)] tracking-[-0.02em] mb-5">
            Menu
          </h2>
          <div className="border border-[var(--color-border)] bg-white overflow-hidden divide-y divide-[var(--color-border)]">
            {listing.products.map((product, i) => (
              <div
                key={i}
                className="flex items-center justify-between px-5 py-4 hover:bg-[var(--color-accent-light)] transition-colors"
              >
                <span className="text-[15px] tracking-tight text-[var(--color-text-secondary)]">
                  {product.name}
                </span>
                {product.price && (
                  <span className="text-[15px] font-bold tracking-tight text-[var(--color-accent)]">
                    {product.price}
                  </span>
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

        {/* CTAs */}
        <div className="mt-12 flex flex-col sm:flex-row gap-3">
          {listing.contactPhone && (
            <a
              href={`tel:${listing.contactPhone}`}
              className="flex-1 flex items-center justify-center gap-2 bg-[var(--color-accent-red)] text-white text-[15px] font-bold tracking-tight px-6 py-4 hover:opacity-90 transition-opacity"
            >
              <Phone size={18} weight="bold" /> Call now
            </a>
          )}
          {listing.contactFacebook && (
            <a
              href={listing.contactFacebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-[var(--color-accent)] text-white text-[15px] font-bold tracking-tight px-6 py-4 hover:opacity-90 transition-opacity"
            >
              <FacebookLogo size={18} weight="bold" /> Facebook
            </a>
          )}
          <ShareButton title={listing.name} slug={listing.slug} />
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: listing.name,
            description: listing.description,
            address: {
              "@type": "PostalAddress",
              addressLocality: "Marikina City",
              addressRegion: "Metro Manila",
              addressCountry: "PH",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: listing.latitude,
              longitude: listing.longitude,
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: listing.rating,
              reviewCount: listing.reviewCount,
            },
          }),
        }}
      />
    </main>
  );
}
