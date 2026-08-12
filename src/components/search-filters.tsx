"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { MagnifyingGlass, X } from "@phosphor-icons/react";
import { listings } from "@/data/listings";
import { CATEGORY_LABELS, CategoryEnum, Category } from "@/types/listing";
import { ListingCard } from "./listing-card";

const BARANGAYS = Array.from(new Set(listings.map((l) => l.barangay))).sort();

export function SearchFilters() {
  const searchParams = useSearchParams();
  const urlQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(urlQuery);
  const [category, setCategory] = useState<Category | "all">("all");
  const [barangay, setBarangay] = useState<string | "all">("all");
  const [minRating, setMinRating] = useState(0);

  // Sync from URL param when it changes
  useEffect(() => {
    setQuery(urlQuery);
  }, [urlQuery]);

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
        <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-dim)]">
          <MagnifyingGlass size={18} />
        </span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, dish, or barangay"
          aria-label="Search food spots"
          className="w-full rounded-[var(--radius-md)] border border-[var(--border-strong)] bg-[var(--bg-elevated)] py-3 pl-10 pr-4 text-sm text-[var(--text)] placeholder:text-[var(--text-dim)] focus:border-[var(--accent)] focus:outline-none transition-colors"
        />
      </div>

      {/* Filters */}
      <div className="mt-4 flex flex-wrap gap-3">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as Category | "all")}
          aria-label="Category"
          className="rounded-[var(--radius-sm)] border border-[var(--border-strong)] bg-[var(--bg-elevated)] px-3 py-2 text-sm text-[var(--text)] focus:border-[var(--accent)] focus:outline-none"
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
          className="rounded-[var(--radius-sm)] border border-[var(--border-strong)] bg-[var(--bg-elevated)] px-3 py-2 text-sm text-[var(--text)] focus:border-[var(--accent)] focus:outline-none"
        >
          <option value="all">All areas</option>
          {BARANGAYS.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>

        <select
          value={minRating}
          onChange={(e) => setMinRating(Number(e.target.value))}
          aria-label="Minimum rating"
          className="rounded-[var(--radius-sm)] border border-[var(--border-strong)] bg-[var(--bg-elevated)] px-3 py-2 text-sm text-[var(--text)] focus:border-[var(--accent)] focus:outline-none"
        >
          <option value={0}>Any rating</option>
          <option value={3}>3+ stars</option>
          <option value={4}>4+ stars</option>
          <option value={5}>5 stars</option>
        </select>

        {hasActiveFilters && (
          <button
            onClick={clearAll}
            className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-[var(--accent)] hover:underline"
          >
            <X size={14} /> Clear
          </button>
        )}
      </div>

      {/* Results */}
      <p className="mt-6 text-xs text-[var(--text-dim)]">
        {results.length} {results.length === 1 ? "spot" : "spots"}
      </p>

      {results.length > 0 ? (
        <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((listing) => (
            <ListingCard key={listing.slug} listing={listing} />
          ))}
        </div>
      ) : (
        <div className="mt-12 text-center">
          <p className="text-base text-[var(--text)]">No spots found</p>
          <p className="mt-2 text-sm text-[var(--text-muted)]">
            Try a different keyword or clear the filters.
          </p>
        </div>
      )}
    </div>
  );
}
