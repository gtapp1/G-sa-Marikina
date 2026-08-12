import { Metadata } from "next";
import { SearchFilters } from "@/components/search-filters";

export const metadata: Metadata = {
  title: "Search — G sa Marikina",
  description: "Search Marikina food spots by name, dish, barangay, or rating.",
};

export default function SearchPage() {
  return (
    <main className="px-6 pt-10 pb-16 max-w-[1200px] mx-auto">
      <h1 className="text-3xl md:text-4xl text-[var(--text)]">Search</h1>
      <p className="mt-2 text-sm text-[var(--text-muted)] mb-8">
        Find a spot by name, dish, or area.
      </p>
      <SearchFilters />
    </main>
  );
}
