export default function Loading() {
  return (
    <main className="mx-auto max-w-[1200px] px-4 md:px-6 pt-6">
      <div className="animate-pulse rounded-[var(--radius-md)] bg-[var(--color-surface-subtle)] aspect-[3/2] md:aspect-[2/1]" />
      <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {Array.from({ length: 5 }, (_, i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-[4/3] rounded-[var(--radius-md)] bg-[var(--color-surface-subtle)]" />
            <div className="mt-2.5 h-3.5 w-3/4 rounded bg-[var(--color-surface-subtle)]" />
            <div className="mt-1.5 h-3 w-1/2 rounded bg-[var(--color-surface-subtle)]" />
          </div>
        ))}
      </div>
    </main>
  );
}
