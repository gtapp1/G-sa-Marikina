import { ListingCardSkeleton } from "@/components/listing-card-skeleton";

export default function Loading() {
  return (
    <main>
      {/* Hero placeholder */}
      <section className="flex min-h-[66vh] md:min-h-[76vh] items-center justify-center bg-[var(--color-border)]">
        <div className="w-full max-w-2xl px-6 text-center">
          <div className="mx-auto h-12 w-4/5 animate-pulse rounded bg-[var(--color-surface)]/60" />
          <div className="mx-auto mt-6 h-5 w-2/3 animate-pulse rounded bg-[var(--color-surface)]/60" />
        </div>
      </section>

      {/* Feed placeholder */}
      <section className="mx-auto max-w-[1200px] px-6 pt-14">
        <div className="h-7 w-40 animate-pulse rounded bg-[var(--color-border)]" />
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, i) => (
            <ListingCardSkeleton key={i} />
          ))}
        </div>
      </section>
    </main>
  );
}
