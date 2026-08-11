import Link from "next/link";
import { listings } from "@/data/listings";
import { CATEGORY_LABELS, Category } from "@/types/listing";
import { ListingCard } from "@/components/listing-card";
import { CategoryPills } from "@/components/category-pills";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="px-4 pt-12 pb-8 md:pt-20 md:pb-12 text-center">
        <h1 className="font-[family-name:var(--font-heading)] text-3xl md:text-5xl font-extrabold text-[var(--color-text-primary)] tracking-tight max-w-2xl mx-auto">
          Discover Marikina&apos;s Best Food
        </h1>
        <p className="mt-4 text-base md:text-lg text-[var(--color-text-secondary)] max-w-lg mx-auto leading-relaxed">
          From home-baked cookies to hidden street food gems. Find your next
          favorite spot.
        </p>
      </section>

      {/* Category Pills */}
      <section className="px-4 pb-6">
        <CategoryPills />
      </section>

      {/* Listings Feed */}
      <section className="px-4 pb-16 max-w-[1200px] mx-auto">
        <h2 className="font-[family-name:var(--font-heading)] text-xl md:text-2xl font-bold text-[var(--color-text-primary)] mb-4">
          Featured Spots
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {listings.map((listing) => (
            <ListingCard key={listing.slug} listing={listing} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--color-border)] px-4 py-8 text-center">
        <p className="text-sm text-[var(--color-text-secondary)]">
          G sa Marikina — Made with 💛 for the Marikina food community
        </p>
      </footer>
    </main>
  );
}
