import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { Phone, FacebookLogo, ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { listings } from "@/data/listings";
import { CATEGORY_LABELS } from "@/types/listing";
import { StarRating } from "@/components/star-rating";
import { PhotoGallery } from "@/components/photo-gallery";
import { ListingLocation } from "@/components/listing-location";
import { ShareButton } from "@/components/share-button";
import { CategoryIcon } from "@/components/category-icon";
import { PhotoPlaceholder } from "@/components/photo-placeholder";

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
    openGraph: {
      title: `${listing.name} — G sa Marikina`,
      description: listing.description,
      type: "website",
    },
  };
}

export default async function ListingPage({ params }: PageProps) {
  const { slug } = await params;
  const listing = listings.find((l) => l.slug === slug);

  if (!listing) {
    notFound();
  }

  const category = CATEGORY_LABELS[listing.category];

  return (
    <main className="min-h-screen pb-24">
      {/* Back link */}
      <div className="px-6 pt-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary-text)] transition-colors"
        >
          <ArrowLeft size={16} /> Back to all spots
        </Link>
      </div>

      {/* Hero photo */}
      <div className="mt-4 aspect-[16/9] md:aspect-[21/9] bg-[var(--color-border)] relative overflow-hidden md:rounded-[var(--radius-md)] md:max-w-[1200px] md:mx-auto">
        {listing.photos[0] ? (
          <img
            src={listing.photos[0]}
            alt={`${listing.name} - hero photo`}
            className="w-full h-full object-cover"
          />
        ) : (
          <PhotoPlaceholder category={listing.category} />
        )}
      </div>

      {/* Content */}
      <div className="px-6 mt-8 max-w-[760px] mx-auto">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-extrabold text-[var(--color-text-primary)]">
              {listing.name}
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-xs rounded-full border border-[var(--color-border)] text-[var(--color-text-secondary)]">
                <CategoryIcon category={listing.category} size={14} />
                {category.label}
              </span>
              <span className="text-sm text-[var(--color-text-secondary)]">
                {listing.barangay}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <StarRating rating={listing.rating} size={20} />
            <span className="text-xs text-[var(--color-text-secondary)]">
              {listing.reviewCount} reviews
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="mt-6 text-base text-[var(--color-text-primary)] leading-relaxed">
          {listing.description}
        </p>

        {/* Photo Gallery */}
        <PhotoGallery photos={listing.photos} name={listing.name} />

        {/* Products / Menu */}
        <div className="mt-8">
          <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold text-[var(--color-text-primary)] mb-3">
            Menu
          </h2>
          <ul className="space-y-2">
            {listing.products.map((product, i) => (
              <li
                key={i}
                className="flex items-center justify-between py-2 border-b border-[var(--color-border)] last:border-0"
              >
                <span className="text-sm text-[var(--color-text-primary)]">
                  {product.name}
                </span>
                {product.price && (
                  <span className="text-sm font-semibold text-[var(--color-primary-text)]">
                    {product.price}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Founder's Review */}
        <div className="mt-8 p-4 bg-[var(--color-surface)] rounded-[var(--radius-md)] border border-[var(--color-border)]">
          <p className="text-xs font-semibold text-[var(--color-primary-text)] uppercase tracking-wide mb-2">
            Our take
          </p>
          <p className="text-sm text-[var(--color-text-primary)] leading-relaxed italic">
            &ldquo;{listing.foundersReview}&rdquo;
          </p>
        </div>

        {/* Location map */}
        <ListingLocation
          latitude={listing.latitude}
          longitude={listing.longitude}
          barangay={listing.barangay}
          category={listing.category}
        />

        {/* Contact buttons */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          {listing.contactPhone && (
            <a
              href={`tel:${listing.contactPhone}`}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-[var(--color-primary)] text-white font-semibold rounded-[var(--radius-sm)] hover:bg-[var(--color-primary-hover)] transition-colors text-sm"
            >
              <Phone size={18} weight="bold" /> Call
            </a>
          )}
          {listing.contactFacebook && (
            <a
              href={listing.contactFacebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-[var(--color-primary)] text-white font-semibold rounded-[var(--radius-sm)] hover:bg-[var(--color-primary-hover)] transition-colors text-sm"
            >
              <FacebookLogo size={18} weight="bold" /> Facebook
            </a>
          )}
          <ShareButton title={listing.name} slug={listing.slug} />
        </div>
      </div>

      {/* JSON-LD Structured Data */}
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
