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
      {/* Hero — Resy-style complex photo layout + sidebar */}
      <section className="mx-auto max-w-[1200px] px-4 md:px-6 pt-5 md:pt-8">
        <div className="flex flex-col md:flex-row gap-0 md:gap-8">
          {/* Photo area — two overlapping images, no rounded corners */}
          <div className="relative flex-1">
            {/* Main large photo */}
            <div className="relative aspect-[4/3] md:aspect-[3/2] overflow-hidden bg-[var(--color-surface-subtle)]">
              {featured.photos[0] ? (
                <img src={featured.photos[0]} alt={featured.name} className="w-full h-full object-cover" />
              ) : (
                <PhotoPlaceholder category={featured.category} />
              )}
            </div>

            {/* Editorial overlay text — bottom left, outside the image on top of white bg */}
            <div className="mt-4 md:mt-0 md:absolute md:bottom-0 md:left-0 md:right-[40%] md:p-5 md:bg-white">
              <p className="text-[var(--color-accent-red)] text-[11px] font-bold uppercase tracking-[0.06em]">
                Featured
              </p>
              <h2 className="mt-1 text-[var(--color-text-secondary)] text-[20px] md:text-[24px] font-bold leading-[1.15] tracking-[-0.03em]">
                {featured.name}: {featured.description.slice(0, 80)}…
              </h2>
              <p className="mt-1.5 text-[var(--color-text-primary)] text-[12px] tracking-tight leading-relaxed line-clamp-2">
                {featured.foundersReview}
              </p>
            </div>
          </div>

          {/* Right sidebar — Resy discover section */}
          <aside className="hidden md:block w-[240px] flex-shrink-0 pt-2">
            <h3 className="text-[14px] font-bold text-[var(--color-text-secondary)] leading-snug tracking-[-0.02em]">
              Discover restaurants to love in Marikina.
            </h3>
            <p className="mt-2 text-[11px] text-[var(--color-text-primary)] leading-relaxed tracking-tight">
              Be the first to know with insider guides, deep dives on local staples, and info on the latest food spots.
            </p>
            <nav className="mt-4 space-y-1">
              {[
                { href: "/collections", label: "The Hit List" },
                { href: "/categories", label: "Browse by Category" },
                { href: "/near-me", label: "Near Me" },
                { href: "/map", label: "Explore Map" },
                { href: "/about", label: "Read more ›" },
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

            <p className="mt-6 text-[12px] font-bold text-[var(--color-text-secondary)] tracking-tight">
              About G! ›
            </p>
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
