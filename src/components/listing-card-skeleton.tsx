export function ListingCardSkeleton() {
  return (
    <div className="rounded-[var(--radius-md)] bg-[var(--color-surface)] shadow-[0_2px_8px_rgba(61,44,30,0.08)] overflow-hidden">
      <div className="aspect-[4/3] bg-[var(--color-border)] animate-pulse" />
      <div className="p-4 space-y-2">
        <div className="h-5 w-3/4 bg-[var(--color-border)] rounded animate-pulse" />
        <div className="h-4 w-1/2 bg-[var(--color-border)] rounded animate-pulse" />
        <div className="h-4 w-1/3 bg-[var(--color-border)] rounded animate-pulse" />
      </div>
    </div>
  );
}

export function ListingGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {Array.from({ length: count }, (_, i) => (
        <ListingCardSkeleton key={i} />
      ))}
    </div>
  );
}
