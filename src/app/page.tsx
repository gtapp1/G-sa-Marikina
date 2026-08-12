import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { listings } from "@/data/listings";
import { ListingCard } from "@/components/listing-card";
import { CATEGORY_LABELS } from "@/types/listing";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { CategoryPills } from "@/components/category-pills";

export default function HomePage() {
  const featured = listings[0];

  const allSpots = [...listings].sort(
    (a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount
  );

  return (
    <main>
      {/* Hero */}
      <section className="mx-auto max-w-[1400px] px-5 md:px-10 pt-8 md:pt-12">
        <div className="flex flex-col md:flex-row gap-0 md:gap-10">
          {/* Main photo */}
          <div className="relative flex-1">
            <div className="relative aspect-[4/3] md:aspect-[16/10] overflow-hidden bg-[var(--color-surface-subtle)]">
              {featured.photos[0] ? (
                <img
                  src={featured.photos[0]}
                  alt={featured.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <PhotoPlaceholder category={featured.category} />
              )}
            </div>

            {/* Editorial text — white box overlaid on bottom-left */}
            <div className="mt-5 md:mt-0 md:absolute md:bottom-0 md:left-0 md:right-[35%] md:p-7 md:bg-white">
              <p className="text-[var(--color-accent-red)] text-[12px] font-bold uppercase tracking-[0.07em]">
                Featured
              </p>
              <h2 className="mt-2 text-[var(--color-text-secondary)] text-[22px] md:text-[28px] font-bold leading-[1.15] tracking-[-0.03em]">
                {featured.name}
              </h2>
              <p className="mt-2 text-[var(--color-text-primary)] text-[14px] tracking-tight leading-relaxed line-clamp-2">
                {featured.foundersReview}
              </p>
              <Link
                href={`/${featured.slug}`}
                className="inline-flex items-center gap-1.5 mt-4 text-[13px] font-bold tracking-tight text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors"
              >
                View spot <ArrowRight size={13} weight="bold" />
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="hidden md:block w-[260px] flex-shrink-0 pt-1">
            <h3 className="text-[18px] font-bold text-[var(--color-text-secondary)] leading-snug tracking-[-0.02em]">
              Discover food to love in Marikina.
            </h3>
            <p className="mt-3 text-[13px] text-[var(--color-text-primary)] leading-relaxed tracking-tight">
              Insider guides, local staples, and the newest spots — all in one place.
            </p>
            <nav className="mt-5 space-y-2">
              {[
                { href: "/collections", label: "The Hit List" },
                { href: "/categories", label: "Browse by Category" },
                { href: "/near-me", label: "Near Me" },
                { href: "/map", label: "Explore the Map" },
                { href: "/about", label: "About G! ›" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-[15px] font-bold text-[var(--color-text-secondary)] tracking-tight hover:text-[var(--color-accent)] transition-colors duration-[var(--motion-fast)]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </aside>
        </div>
      </section>

      {/* Category pills */}
      <section className="mx-auto max-w-[1400px] px-5 md:px-10 mt-10 md:mt-14">
        <CategoryPills />
      </section>

      {/* All Spots */}
      <section className="mt-12 md:mt-16">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 flex items-baseline justify-between mb-6">
          <h2 className="text-[28px] md:text-[34px] font-bold text-[var(--color-text-secondary)] tracking-[-0.03em]">
            All Spots
          </h2>
          <Link
            href="/search"
            className="text-[14px] font-bold text-[var(--color-accent)] tracking-tight hover:text-[var(--color-accent-hover)] transition-colors flex items-center gap-1.5"
          >
            See All <ArrowRight size={13} weight="bold" />
          </Link>
        </div>

        {/* Mobile: horizontal scroll */}
        <div className="md:hidden px-5 flex gap-4 overflow-x-auto scrollbar-hide pb-4">
          {allSpots.map((listing) => (
            <div key={listing.slug} className="shrink-0 w-[220px]">
              <ListingCard listing={listing} />
            </div>
          ))}
        </div>

        {/* Desktop: grid */}
        <div className="hidden md:grid mx-auto max-w-[1400px] px-10 grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {allSpots.map((listing) => (
            <ListingCard key={listing.slug} listing={listing} />
          ))}
        </div>
      </section>

      {/* Red CTA banner */}
      <section className="mt-16 md:mt-24 bg-[#EB1700] px-5 md:px-10 py-16 md:py-20">
        <div className="mx-auto max-w-[1400px]">
          <h2 className="text-white text-[32px] md:text-[48px] font-bold leading-[1.1] tracking-[-0.03em] max-w-[600px]">
            Your next favorite food spot is a few taps away.
          </h2>
        </div>
      </section>
    </main>
  );
}
