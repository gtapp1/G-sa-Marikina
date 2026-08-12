import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { listings } from "@/data/listings";
import { ListingCard } from "@/components/listing-card";
import { CategoryPills } from "@/components/category-pills";
import { CATEGORY_LABELS } from "@/types/listing";
import { CategoryIcon } from "@/components/category-icon";
import { StarRating } from "@/components/star-rating";
import { PhotoPlaceholder } from "@/components/photo-placeholder";

export default function HomePage() {
  const topPicks = [...listings]
    .filter((l) => l.rating >= 4)
    .sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount)
    .slice(0, 4);

  const recentlyAdded = [...listings]
    .sort(
      (a, b) =>
        new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
    )
    .slice(0, 6);

  return (
    <main>
      {/* Hero */}
      <section className="px-6 pt-12 md:pt-20 pb-12 max-w-[1200px] mx-auto animate-in">
        <p className="text-[var(--accent)] text-sm font-semibold tracking-wide uppercase">
          Marikina City
        </p>
        <h1 className="mt-3 text-4xl md:text-6xl text-[var(--text)] leading-[1.1]">
          Discover local food<br className="hidden md:block" /> worth finding.
        </h1>
        <p className="mt-5 text-base md:text-lg text-[var(--text-muted)] max-w-lg leading-relaxed">
          A curated directory of home bakers, milk tea shops, karinderyas, and
          street eats in Marikina.
        </p>
        <div className="mt-8">
          <Link
            href="/search"
            className="inline-flex items-center w-full max-w-md rounded-[var(--radius-md)] border border-[var(--border-strong)] bg-[var(--bg-elevated)] px-4 py-3.5 text-sm text-[var(--text-muted)] hover:border-[var(--accent)] transition-colors duration-200"
          >
            Search by name, dish, or barangay…
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="px-6 max-w-[1200px] mx-auto animate-in delay-1">
        <CategoryPills />
      </section>

      {/* Editor's Picks — editorial section */}
      <section className="px-6 pt-16 md:pt-24 max-w-[900px] mx-auto animate-in delay-2">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-[var(--accent)] text-xs font-semibold tracking-wider uppercase">
              Editor&apos;s Picks
            </p>
            <h2 className="mt-1 text-2xl md:text-3xl text-[var(--text)]">
              Where to eat right now
            </h2>
          </div>
          <Link
            href="/collections"
            className="hidden md:inline-flex items-center gap-1 text-sm font-medium text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
          >
            All guides <ArrowRight size={14} />
          </Link>
        </div>

        {/* Editorial entries */}
        <div className="space-y-10">
          {topPicks.map((listing, idx) => {
            const cat = CATEGORY_LABELS[listing.category];
            return (
              <article key={listing.slug} className="group">
                {/* Photo */}
                <Link href={`/${listing.slug}`} className="block">
                  <div className="aspect-[16/9] rounded-[var(--radius-lg)] overflow-hidden bg-[var(--bg-elevated)]">
                    {listing.photos[0] ? (
                      <img
                        src={listing.photos[0]}
                        alt={`${listing.name}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <PhotoPlaceholder category={listing.category} />
                    )}
                  </div>
                </Link>

                {/* Info */}
                <div className="mt-4 flex gap-4">
                  <span className="flex-shrink-0 text-2xl font-[family-name:var(--font-heading)] text-[var(--text-dim)]">
                    {idx + 1}
                  </span>
                  <div className="flex-1">
                    <Link
                      href={`/${listing.slug}`}
                      className="text-xl font-[family-name:var(--font-heading)] text-[var(--text)] hover:text-[var(--accent)] transition-colors duration-200"
                    >
                      {listing.name}
                    </Link>
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className="text-xs text-[var(--text-muted)]">
                        {cat.label}
                      </span>
                      <span className="text-xs text-[var(--text-dim)]">·</span>
                      <span className="text-xs text-[var(--text-muted)]">
                        {listing.barangay}
                      </span>
                      <StarRating rating={listing.rating} size={12} />
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">
                      {listing.foundersReview}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Mobile "All guides" link */}
        <div className="mt-8 md:hidden">
          <Link
            href="/collections"
            className="inline-flex items-center gap-1 text-sm font-medium text-[var(--accent)]"
          >
            All guides <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* All Spots — card grid */}
      <section className="px-6 pt-20 md:pt-28 max-w-[1200px] mx-auto animate-in delay-3">
        <h2 className="text-2xl md:text-3xl text-[var(--text)] mb-2">
          All spots
        </h2>
        <p className="text-sm text-[var(--text-muted)] mb-8">
          Every listing on the directory.
        </p>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recentlyAdded.map((listing) => (
            <ListingCard key={listing.slug} listing={listing} />
          ))}
        </div>
      </section>

      {/* Spacer */}
      <div className="h-16" />
    </main>
  );
}
