import { Metadata } from "next";
import { SearchFilters } from "@/components/search-filters";

export const metadata: Metadata = {
  title: "Search — G sa Marikina",
  description: "Search Marikina food spots by name, dish, barangay, or rating.",
};

export default function SearchPage() {
  return (
    <main className="min-h-screen px-6 pt-8 pb-16 max-w-[1200px] mx-auto">
      <h1 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-extrabold text-[var(--color-text-primary)]">
        Search
      </h1>
      <p className="mt-2 mb-6 text-[var(--color-text-secondary)]">
        Find a spot by name, dish, or area.
      </p>
      <SearchFilters />
    </main>
  );
}
