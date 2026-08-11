import { Metadata } from "next";
import { getCollections } from "@/lib/collections";
import { ListingCard } from "@/components/listing-card";

export const metadata: Metadata = {
  title: "Collections — G sa Marikina",
  description: "Curated collections of Marikina food spots.",
};

export default function CollectionsPage() {
  const collections = getCollections();

  return (
    <main className="min-h-screen px-6 pt-8 pb-16 max-w-[1200px] mx-auto">
      <h1 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-extrabold text-[var(--color-text-primary)]">
        Collections
      </h1>
      <p className="mt-2 text-[var(--color-text-secondary)]">
        Handpicked ways to explore Marikina&apos;s food.
      </p>

      <div className="mt-8 space-y-14">
        {collections.map((c) => (
          <section key={c.id}>
            <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold tracking-tight text-[var(--color-text-primary)]">
              {c.title}
            </h2>
            <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
              {c.blurb}
            </p>
            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {c.listings.map((listing) => (
                <ListingCard key={listing.slug} listing={listing} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
