export default function Loading() {
  return (
    <main className="px-6 pt-12 max-w-[1200px] mx-auto">
      <div className="animate-pulse space-y-4">
        <div className="h-4 w-24 rounded bg-[var(--bg-elevated)]" />
        <div className="h-12 w-3/4 rounded bg-[var(--bg-elevated)]" />
        <div className="h-5 w-1/2 rounded bg-[var(--bg-elevated)]" />
      </div>
      <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="animate-pulse rounded-[var(--radius-md)] bg-[var(--bg-elevated)] overflow-hidden">
            <div className="aspect-[4/3] bg-[var(--bg-hover)]" />
            <div className="p-4 space-y-3">
              <div className="h-4 w-3/4 rounded bg-[var(--bg-hover)]" />
              <div className="h-3 w-1/2 rounded bg-[var(--bg-hover)]" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
