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
    <main className="px-6 pt-10 pb-16 max-w-[800px] mx-auto">
      <p className="text-[var(--accent)] text-xs font-semibold tracking-wider uppercase">
        Curated
      </p>
      <h1 className="mt-2 text-3xl md:text-4xl text-[var(--text)]">Guides</h1>
      <p className="mt-3 text-sm text-[var(--text-muted)] leading-relaxed">
        Handpicked guides to eating well in Marikina City.
      </p>

      <div className="mt-12 space-y-16">
        {collections.map((collection) => (
          <section key={collection.id}>
            <h2 className="text-xl md:text-2xl text-[var(--text)]">
              {collection.title}
            </h2>
            <p className="mt-1 text-sm text-[var(--text-muted)]">
              {collection.blurb}
            </p>

            <div className="mt-6 space-y-8">
              {collection.listings.map((listing, idx) => {
                const cat = CATEGORY_LABELS[listing.category];
                return (
                  <article key={listing.slug} className="group flex gap-4">
                    <span className="flex-shrink-0 text-lg font-[family-name:var(--font-heading)] text-[var(--text-dim)] w-6 text-right">
                      {idx + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="aspect-[16/9] rounded-[var(--radius-md)] overflow-hidden bg-[var(--bg-elevated)] mb-3">
                        {listing.photos[0] ? (
                          <img
                            src={listing.photos[0]}
                            alt={listing.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                          />
                        ) : (
                          <PhotoPlaceholder category={listing.category} />
                        )}
                      </div>
                      <Link
                        href={`/${listing.slug}`}
                        className="text-base font-semibold text-[var(--text)] hover:text-[var(--accent)] transition-colors"
                      >
                        {listing.name}
                      </Link>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-[var(--text-muted)]">{cat.label}</span>
                        <span className="text-xs text-[var(--text-dim)]">·</span>
                        <span className="text-xs text-[var(--text-muted)]">{listing.barangay}</span>
                        <StarRating rating={listing.rating} size={11} />
                      </div>
                      <p className="mt-2 text-sm text-[var(--text-muted)] leading-relaxed">
                        {listing.foundersReview}
                      </p>
                      <Link
                        href={`/${listing.slug}`}
                        className="inline-flex items-center gap-1 mt-2 text-xs font-medium text-[var(--accent)]"
                      >
                        View <ArrowRight size={12} />
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
