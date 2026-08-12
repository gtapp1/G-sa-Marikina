import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { getCollections } from "@/lib/collections";
import { StarRating } from "@/components/star-rating";
import { CATEGORY_LABELS } from "@/types/listing";
import { PhotoPlaceholder } from "@/components/photo-placeholder";

export const metadata: Metadata = {
  title: "Guides — G sa Marikina",
  description: "Curated guides to Marikina food spots.",
};

export default function CollectionsPage() {
  const collections = getCollections();

  return (
    <main className="px-5 md:px-10 pt-12 pb-20 max-w-[960px] mx-auto">
      <p className="text-[var(--color-accent-red)] text-[13px] font-bold uppercase tracking-[0.07em]">
        Curated
      </p>
      <h1 className="mt-2 text-[36px] md:text-[48px] font-bold text-[var(--color-text-secondary)] tracking-[-0.03em]">
        Guides
      </h1>
      <p className="mt-3 text-[15px] tracking-tight text-[var(--color-text-primary)] leading-relaxed">
        Handpicked guides to eating well in Marikina City.
      </p>

      <div className="mt-14 space-y-20">
        {collections.map((collection) => (
          <section key={collection.id}>
            <h2 className="text-[24px] md:text-[30px] font-bold text-[var(--color-text-secondary)] tracking-[-0.02em]">
              {collection.title}
            </h2>
            <p className="mt-2 text-[14px] tracking-tight text-[var(--color-text-primary)]">
              {collection.blurb}
            </p>

            <div className="mt-8 space-y-10">
              {collection.listings.map((listing, idx) => {
                const cat = CATEGORY_LABELS[listing.category];
                return (
                  <article key={listing.slug} className="group flex gap-6">
                    <span className="shrink-0 text-[22px] font-bold text-[var(--color-text-primary)] opacity-25 w-8 text-right leading-none pt-1">
                      {idx + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="aspect-video overflow-hidden bg-[var(--color-surface-subtle)] mb-4">
                        {listing.photos[0] ? (
                          <img
                            src={listing.photos[0]}
                            alt={listing.name}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                          />
                        ) : (
                          <PhotoPlaceholder category={listing.category} />
                        )}
                      </div>
                      <Link
                        href={`/${listing.slug}`}
                        className="text-[18px] font-bold tracking-tight text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors"
                      >
                        {listing.name}
                      </Link>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="text-[13px] tracking-tight text-[var(--color-text-primary)]">{cat.label}</span>
                        <span className="text-[13px] text-[var(--color-text-primary)] opacity-40">·</span>
                        <span className="text-[13px] tracking-tight text-[var(--color-text-primary)]">{listing.barangay}</span>
                        <StarRating rating={listing.rating} size={13} />
                      </div>
                      <p className="mt-3 text-[14px] tracking-tight text-[var(--color-text-primary)] leading-relaxed">
                        {listing.foundersReview}
                      </p>
                      <Link
                        href={`/${listing.slug}`}
                        className="inline-flex items-center gap-1.5 mt-3 text-[13px] font-bold tracking-tight text-[var(--color-accent)]"
                      >
                        View <ArrowRight size={13} />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
