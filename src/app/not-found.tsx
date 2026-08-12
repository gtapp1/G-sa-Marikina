import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <p className="text-[80px] font-extrabold text-[var(--color-accent-red)] tracking-[-0.04em] leading-none">
        404
      </p>
      <h1 className="mt-4 text-[22px] font-bold text-[var(--color-text-secondary)] tracking-[-0.02em]">
        Spot not found
      </h1>
      <p className="mt-2 text-[13px] tracking-tight text-[var(--color-text-primary)] max-w-xs">
        This food spot doesn&apos;t exist yet. Maybe it&apos;s a hidden gem we haven&apos;t discovered.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block bg-[var(--color-accent-red)] text-white text-[12px] font-bold tracking-tight px-5 py-2.5 hover:opacity-90 transition-opacity"
      >
        Back to all spots
      </Link>
    </main>
  );
}
