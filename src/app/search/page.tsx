import { Metadata } from "next";
import { Suspense } from "react";
import { SearchFilters } from "@/components/search-filters";

export const metadata: Metadata = {
  title: "Search — G sa Marikina",
  description: "Search Marikina food spots by name, dish, barangay, or rating.",
};

export default function SearchPage() {
  return (
    <main className="px-5 md:px-10 pt-10 pb-20 max-w-[1400px] mx-auto">
      <h1 className="text-[32px] md:text-[42px] font-bold text-[var(--color-text-secondary)] tracking-[-0.03em]">
        Search
      </h1>
      <p className="mt-2 text-[15px] tracking-tight text-[var(--color-text-primary)] mb-8">
        Find a spot by name, dish, or area.
      </p>
      <Suspense fallback={
        <div className="animate-pulse space-y-3">
          <div className="h-10 bg-[var(--color-surface-subtle)] w-full" />
          <div className="h-8 bg-[var(--color-surface-subtle)] w-1/2" />
        </div>
      }>
        <SearchFilters />
      </Suspense>
    </main>
  );
}
