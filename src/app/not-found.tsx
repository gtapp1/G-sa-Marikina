import Link from "next/link";
import { ForkKnife, ArrowLeft } from "@phosphor-icons/react/dist/ssr";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <span className="text-[var(--color-primary)]/40 mb-4">
        <ForkKnife size={64} weight="light" />
      </span>
      <h1 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-[var(--color-text-primary)]">
        Spot not found
      </h1>
      <p className="mt-2 text-[var(--color-text-secondary)] max-w-sm">
        This food spot doesn&apos;t exist yet. Maybe it&apos;s a hidden gem we
        haven&apos;t discovered!
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)] text-white font-semibold rounded-[var(--radius-sm)] hover:bg-[var(--color-primary-hover)] transition-colors text-sm"
      >
        <ArrowLeft size={16} weight="bold" /> Back to all spots
      </Link>
    </main>
  );
}
