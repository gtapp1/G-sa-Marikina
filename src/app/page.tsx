import Link from "next/link";
import {
  MapTrifold,
  SquaresFour,
  NavigationArrow,
  Sparkle,
} from "@phosphor-icons/react/dist/ssr";
import { listings } from "@/data/listings";
import { ListingCard } from "@/components/listing-card";
import { CategoryPills } from "@/components/category-pills";

export default function HomePage() {
  const recentlyAdded = [...listings]
    .sort(
      (a, b) =>
        new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
    )
    .slice(0, 3);

  return (
    <main>
      {/* Hero — real food photo, warm overlay, balanced centered composition.
          On desktop, pull up under the floating nav for a full-bleed top. */}
      <section className="relative flex min-h-[66vh] md:min-h-[80vh] items-center justify-center overflow-hidden -mt-20 md:-mt-24">
        <div className="absolute inset-0">
          <img
            src="https://res.cloudinary.com/demo/image/upload/v1/samples/food/spices.jpg"
            alt="Marikina local food spread"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#3D2C1E]/75 via-[#3D2C1E]/55 to-[#3D2C1E]/85" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-2xl px-6 text-center">
          <h1 className="text-balance text-4xl md:text-6xl font-extrabold leading-[1.05] tracking-tight text-white">
            Find good food in{" "}
            <span className="relative whitespace-nowrap text-[var(--color-primary)]">
              Marikina
              <span className="absolute -bottom-1 left-0 h-1 w-full rounded-full bg-[var(--color-primary)]/60" />
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-md text-pretty text-base md:text-lg leading-relaxed text-white/85">
            A directory of local spots — home bakers, milk tea shops,
            karinderyas, and street eats.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/map"
              className="inline-flex items-center gap-2 rounded-[var(--radius-sm)] bg-[var(--color-primary)] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-primary-hover)]"
            >
              <MapTrifold size={18} weight="bold" />
              Explore the map
            </Link>
            <Link
              href="/categories"
              className="inline-flex items-center gap-2 rounded-[var(--radius-sm)] border border-white/40 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10"
            >
              <SquaresFour size={18} weight="bold" />
              Browse categories
            </Link>
          </div>
        </div>
      </section>

      {/* Quick explore */}
      <section className="mx-auto max-w-[1200px] px-6 pt-10">
        <div className="flex flex-wrap gap-3">
          <Link
            href="/near-me"
            className="inline-flex items-center gap-2 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2.5 text-sm font-semibold text-[var(--color-text-primary)] transition-colors hover:border-[var(--color-primary)]"
          >
            <span className="text-[var(--color-primary)]">
              <NavigationArrow size={18} weight="fill" />
            </span>
            Near me
          </Link>
          <Link
            href="/collections"
            className="inline-flex items-center gap-2 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2.5 text-sm font-semibold text-[var(--color-text-primary)] transition-colors hover:border-[var(--color-primary)]"
          >
            <span className="text-[var(--color-primary)]">
              <Sparkle size={18} weight="fill" />
            </span>
            Collections
          </Link>
        </div>
      </section>

      {/* Category pills */}
      <section className="mx-auto max-w-[1200px] px-6 pt-6">
        <CategoryPills />
      </section>

      {/* Featured spots */}
      <section className="mx-auto max-w-[1200px] px-6 pt-10 md:pt-14">
        <h2 className="heading-accent font-[family-name:var(--font-heading)] text-2xl font-bold tracking-tight text-[var(--color-text-primary)]">
          Featured spots
        </h2>
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((listing) => (
            <ListingCard key={listing.slug} listing={listing} />
          ))}
        </div>
      </section>

      {/* Recently added */}
      <section className="mx-auto max-w-[1200px] px-6 pt-14 md:pt-20 pb-4">
        <h2 className="heading-accent font-[family-name:var(--font-heading)] text-2xl font-bold tracking-tight text-[var(--color-text-primary)]">
          Recently added
        </h2>
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {recentlyAdded.map((listing) => (
            <ListingCard key={listing.slug} listing={listing} />
          ))}
        </div>
      </section>
    </main>
  );
}
