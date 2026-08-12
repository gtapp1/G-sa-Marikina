import Link from "next/link";
import { ArrowRight, Heart } from "@phosphor-icons/react/dist/ssr";
import { listings } from "@/data/listings";
import { ListingCard } from "@/components/listing-card";
import { CATEGORY_LABELS } from "@/types/listing";
import { PhotoPlaceholder } from "@/components/photo-placeholder";

export default function HomePage() {
  // Featured listing for hero
  const featured = listings[0];

  // "Book Tonight" equivalent — all listings as horizontal scroll
  const allSpots = [...listings].sort(
    (a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount
  );

  return (
    <main>
      {/* Hero — editorial feature + sidebar links (Resy-style) */}
      <section className="mx-auto max-w-[1200px] px-4 md:px-6 pt-6 md:pt-8">
        <div className="flex flex-col md:flex-row gap-6 md:gap-10">
          {/* Hero image + editorial overlay */}
          <div className="relative flex-1 rounded-[var(--radius-md)] overflow-hidden bg-[var(--color-surface-subtle)] aspect-[4/3] md:aspect-[3/2]">
            {featured.photos[0] ? (
              <img
                src={featured.photos[0]}
                alt={featured.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <PhotoPlaceholder category={featured.category} />
            )}
            {/* Bottom-left editorial text overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/70 via-black/40 to-transparent">
              <p className="text-[var(--color-surface-strong)] text-[11px] font-bold uppercase tracking-wider mb-1">
                Featured
              </p>
              <h2 className="text-white text-xl md:text-2xl font-bold leading-tight">
                {featured.name}: {featured.description.slice(0, 60)}…
              </h2>
              <p className="text-white/70 text-[13px] mt-1.5 line-clamp-2">
                {featured.foundersReview}
              </p>
            </div>
          </div>

          {/* Sidebar — discovery links (Resy-style) */}
          <aside className="hidden md:block w-[260px] flex-shrink-0">
            <h3 className="text-base font-bold text-[var(--color-text-secondary)] leading-snug">
              Discover restaurants to love in Marikina.
            </h3>
            <p className="mt-2 text-[13px] text-[var(--color-text-primary)] leading-relaxed">
              Local spots, honest reviews, and direct contact — all in one place.
            </p>
            <nav className="mt-5 space-y-2">
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
                  className="block text-sm font-bold text-[var(--color-text-secondary)] hover:text-[var(--color-surface-strong)] transition-colors duration-[var(--motion-fast)]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </aside>
        </div>
      </section>

      {/* Horizontal scroll section — "Book Tonight" equivalent */}
      <section className="mt-10 md:mt-14">
        <div className="mx-auto max-w-[1200px] px-4 md:px-6 flex items-baseline justify-between mb-4">
          <h2 className="text-2xl md:text-[28px] font-bold text-[var(--color-text-secondary)]">
            All Spots
          </h2>
          <Link
            href="/search"
            className="text-[13px] font-bold text-[var(--color-text-secondary)] hover:text-[var(--color-surface-strong)] transition-colors flex items-center gap-1"
          >
            See All <ArrowRight size={12} weight="bold" />
          </Link>
        </div>

        {/* Horizontal scroll on mobile, grid on desktop */}
        <div className="md:hidden px-4 flex gap-4 overflow-x-auto scrollbar-hide pb-4">
          {allSpots.map((listing) => (
            <div key={listing.slug} className="flex-shrink-0 w-[200px]">
              <ListingCard listing={listing} />
            </div>
          ))}
        </div>
        <div className="hidden md:grid mx-auto max-w-[1200px] px-6 grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {allSpots.map((listing) => (
            <ListingCard key={listing.slug} listing={listing} />
          ))}
        </div>
      </section>

      {/* Bottom spacer */}
      <div className="h-10" />
    </main>
  );
}
