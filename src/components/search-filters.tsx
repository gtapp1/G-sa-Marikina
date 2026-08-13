"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { MagnifyingGlass, X } from "@phosphor-icons/react";
import { listings } from "@/data/listings";
import { MARIKINA_BARANGAYS } from "@/data/barangays";
import { CATEGORY_LABELS, CategoryEnum, Category } from "@/types/listing";
import { ListingCard } from "./listing-card";

export function SearchFilters() {
  const searchParams = useSearchParams();
  const urlQuery = searchParams.get("q") || "";
  const urlBarangay = searchParams.get("barangay") || "all";

  const [query, setQuery] = useState(urlQuery);
  const [category, setCategory] = useState<Category | "all">("all");
  const [barangay, setBarangay] = useState<string | "all">(urlBarangay);
  const [minRating, setMinRating] = useState(0);

  useEffect(() => {
    setQuery(urlQuery);
  }, [urlQuery]);

  useEffect(() => {
    setBarangay(urlBarangay);
  }, [urlBarangay]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return listings.filter((l) => {
      const matchesQuery =
        q === "" ||
        l.name.toLowerCase().includes(q) ||
        l.description.toLowerCase().includes(q) ||
        l.barangay.toLowerCase().includes(q) ||
        l.products.some((p) => p.name.toLowerCase().includes(q));
      const matchesCategory = category === "all" || l.category === category;
      const matchesBarangay = barangay === "all" || l.barangay === barangay;
      const matchesRating = l.rating >= minRating;
      return matchesQuery && matchesCategory && matchesBarangay && matchesRating;
    });
  }, [query, category, barangay, minRating]);

  const hasActiveFilters =
    query !== "" || category !== "all" || barangay !== "all" || minRating > 0;

  const clearAll = () => {
    setQuery("");
    setCategory("all");
    setBarangay("all");
    setMinRating(0);
  };

  return (
    <div>
      {/* Search input */}
      <div className="relative">
        <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-primary)]">
          <MagnifyingGlass size={16} weight="bold" />
        </span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, dish, or barangay"
          aria-label="Search food spots"
          className="w-full border border-[var(--color-border)] bg-white py-3 pl-10 pr-4 text-[13px] tracking-tight text-[var(--color-text-secondary)] placeholder:text-[var(--color-text-primary)] focus:border-[var(--color-accent)] focus:outline-none transition-colors"
        />
      </div>

      {/* Filters */}
      <div className="mt-3 flex flex-wrap gap-2">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as Category | "all")}
          aria-label="Category"
          className="border border-[var(--color-border)] bg-white px-3 py-2 text-[12px] tracking-tight font-medium text-[var(--color-text-secondary)] focus:border-[var(--color-accent)] focus:outline-none"
        >
          <option value="all">All categories</option>
          {CategoryEnum.options.map((c) => (
            <option key={c} value={c}>{CATEGORY_LABELS[c].label}</option>
          ))}
        </select>

        <select
          value={barangay}
          onChange={(e) => setBarangay(e.target.value)}
          aria-label="Barangay"
          className="border border-[var(--color-border)] bg-white px-3 py-2 text-[12px] tracking-tight font-medium text-[var(--color-text-secondary)] focus:border-[var(--color-accent)] focus:outline-none"
        >
          <option value="all">All areas</option>
          {MARIKINA_BARANGAYS.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>

        <select
          value={minRating}
          onChange={(e) => setMinRating(Number(e.target.value))}
          aria-label="Minimum rating"
          className="border border-[var(--color-border)] bg-white px-3 py-2 text-[12px] tracking-tight font-medium text-[var(--color-text-secondary)] focus:border-[var(--color-accent)] focus:outline-none"
        >
          <option value={0}>Any rating</option>
          <option value={3}>3+ stars</option>
          <option value={4}>4+ stars</option>
          <option value={5}>5 stars only</option>
        </select>

        {hasActiveFilters && (
          <button
            onClick={clearAll}
            className="inline-flex items-center gap-1 px-3 py-2 text-[12px] font-bold tracking-tight text-[var(--color-accent)] hover:underline"
          >
            <X size={13} weight="bold" /> Clear
          </button>
        )}
      </div>

      {/* Count */}
      <p className="mt-5 text-[11px] tracking-tight text-[var(--color-text-primary)]">
        {results.length} {results.length === 1 ? "spot" : "spots"} found
        {query && <span className="ml-1">for &ldquo;{query}&rdquo;</span>}
      </p>

      {/* Results */}
      {results.length > 0 ? (
        <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {results.map((listing) => (
            <ListingCard key={listing.slug} listing={listing} />
          ))}
        </div>
      ) : (
        <div className="mt-12 text-center">
          <p className="text-[15px] font-bold text-[var(--color-text-secondary)] tracking-tight">
            No spots found
          </p>
          <p className="mt-1 text-[13px] tracking-tight text-[var(--color-text-primary)]">
            Try a different keyword or clear the filters.
          </p>
        </div>
      )}
    </div>
  );
}
