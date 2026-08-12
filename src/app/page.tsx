import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { listings } from "@/data/listings";
import { ListingCard } from "@/components/listing-card";
import { CATEGORY_LABELS } from "@/types/listing";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { StarRating } from "@/components/star-rating";

export default function HomePage() {
  const featured = listings[0];

  const allSpots = [...listings].sort(
    (a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount
  );

  return (
    <main>
      {/* Hero — large photo + sidebar (Resy layout) */}
      <section className="mx-auto max-w-[1200px] px-4 md:px-6 pt-5 md:pt-8">
        <div className="flex flex-col md:flex-row gap-5 md:gap-8">
          {/* Photo with overlay */}
          <div className="relative flex-1 rounded-[var(--radius-md)] overflow-hidden bg-[var(--color-surface-subtle)] aspect-[4/3] md:aspect-[3/2]">
            {featured.photos[0] ? (
              <img src={featured.photos[0]} alt={featured.name} className="w-full h-full object-cover" />
            ) : (
              <PhotoPlaceholder category={featured.category} />
            )}
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 bg-gradient-to-t from-black/75 via-black/40 to-transparent">
              <p className="text-[var(--color-accent)] text-[10px] font-bold uppercase tracking-[0.1em] mb-1">
                Featured
              </p>
              <h2 className="text-white text-lg md:text-[22px] font-bold leading-[1.15] tracking-[-0.03em]">
                {featured.name}
              </h2>
              <p className="text-white/70 text-[12px] mt-1 tracking-tight line-clamp-2 leading-relaxed">
                {featured.foundersReview}
              </p>
            </div>
          </div>

          {/* Right sidebar — Resy discover section */}
          <aside className="hidden md:block w-[240px] flex-shrink-0">
            <h3 className="text-[15px] font-bold text-[var(--color-text-secondary)] leading-snug tracking-[-0.02em]">
              Discover restaurants to love in Marikina.
            </h3>
            <p className="mt-2 text-[12px] text-[var(--color-text-primary)] leading-relaxed tracking-tight">
              Local spots, honest reviews, and direct contact — all in one directory.
            </p>
            <nav className="mt-4 space-y-1.5">
              {[
                { href: "/collections", label: "Guides" },
                { href: "/categories", label: "Browse by Category" },
                { href: "/near-me", label: "Near Me" },
                { href: "/map", label: "Explore Map" },
                { href: "/about", label: "About" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-[13px] font-bold text-[var(--color-text-secondary)] tracking-tight hover:text-[var(--color-accent)] transition-colors duration-[var(--motion-fast)]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </aside>
        </div>
      </section>

      {/* All Spots — horizontal scroll cards */}
      <section className="mt-8 md:mt-12">
        <div className="mx-auto max-w-[1200px] px-4 md:px-6 flex items-baseline justify-between mb-4">
          <h2 className="text-[22px] md:text-[26px] font-bold text-[var(--color-text-secondary)] tracking-[-0.03em]">
            All Spots
          </h2>
          <Link
            href="/search"
            className="text-[12px] font-bold text-[var(--color-accent)] tracking-tight hover:text-[var(--color-accent-hover)] transition-colors flex items-center gap-1"
          >
            See All <ArrowRight size={11} weight="bold" />
          </Link>
        </div>

        {/* Mobile: horizontal scroll */}
        <div className="md:hidden px-4 flex gap-3.5 overflow-x-auto scrollbar-hide pb-3">
          {allSpots.map((listing) => (
            <div key={listing.slug} className="flex-shrink-0 w-[180px]">
              <ListingCard listing={listing} />
            </div>
          ))}
        </div>

        {/* Desktop: grid */}
        <div className="hidden md:grid mx-auto max-w-[1200px] px-6 grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {allSpots.map((listing) => (
            <ListingCard key={listing.slug} listing={listing} />
          ))}
        </div>
      </section>

      {/* Red banner CTA — full-width, Resy exact style */}
      <section className="mt-12 md:mt-16 bg-[#EB1700] px-4 md:px-6 py-12 md:py-16">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="text-white text-[28px] md:text-[40px] font-bold leading-[1.1] tracking-[-0.03em] max-w-[500px]">
            Your next favorite food spot is a few taps away.
          </h2>
        </div>
      </section>
    </main>
  );
}
