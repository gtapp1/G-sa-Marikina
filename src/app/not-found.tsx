import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <p className="text-6xl mb-4">🍽️</p>
      <h1 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-[var(--color-text-primary)]">
        Spot not found
      </h1>
      <p className="mt-2 text-[var(--color-text-secondary)] max-w-sm">
        This food spot doesn&apos;t exist yet. Maybe it&apos;s a hidden gem
        we haven&apos;t discovered!
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)] text-white font-semibold rounded-[var(--radius-sm)] hover:bg-[var(--color-primary-hover)] transition-colors text-sm"
      >
        ← Back to all spots
      </Link>
    </main>
  );
}
