"use client";

import { useMemo, useState } from "react";
import { MagnifyingGlass, X } from "@phosphor-icons/react";
import { listings } from "@/data/listings";
import {
  CATEGORY_LABELS,
  CategoryEnum,
  Category,
} from "@/types/listing";
import { ListingCard } from "./listing-card";

const BARANGAYS = Array.from(
  new Set(listings.map((l) => l.barangay))
).sort();

export function SearchFilters() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category | "all">("all");
  const [barangay, setBarangay] = useState<string | "all">("all");
  const [minRating, setMinRating] = useState(0);

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
      return (
        matchesQuery && matchesCategory && matchesBarangay && matchesRating
      );
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
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)]">
          <MagnifyingGlass size={18} />
        </span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, dish, or barangay"
          aria-label="Search food spots"
          className="w-full rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface)] py-3 pl-10 pr-4 text-base text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)] focus:border-[var(--color-primary)] focus:outline-none"
        />
      </div>

      {/* Filters */}
      <div className="mt-4 flex flex-wrap gap-3">
        <label className="flex flex-col gap-1 text-xs font-semibold text-[var(--color-text-secondary)]">
          Category
          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value as Category | "all")
            }
            className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm font-normal text-[var(--color-text-primary)] focus:border-[var(--color-primary)] focus:outline-none"
          >
            <option value="all">All categories</option>
            {CategoryEnum.options.map((c) => (
              <option key={c} value={c}>
                {CATEGORY_LABELS[c].label}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1 text-xs font-semibold text-[var(--color-text-secondary)]">
          Barangay
          <select
            value={barangay}
            onChange={(e) => setBarangay(e.target.value)}
            className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm font-normal text-[var(--color-text-primary)] focus:border-[var(--color-primary)] focus:outline-none"
          >
            <option value="all">All areas</option>
            {BARANGAYS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1 text-xs font-semibold text-[var(--color-text-secondary)]">
          Min rating
          <select
            value={minRating}
            onChange={(e) => setMinRating(Number(e.target.value))}
            className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm font-normal text-[var(--color-text-primary)] focus:border-[var(--color-primary)] focus:outline-none"
          >
            <option value={0}>Any rating</option>
            <option value={3}>3+ stars</option>
            <option value={4}>4+ stars</option>
            <option value={5}>5 stars</option>
          </select>
        </label>

        {hasActiveFilters && (
          <button
            onClick={clearAll}
            className="mt-auto inline-flex items-center gap-1 rounded-[var(--radius-sm)] px-3 py-2 text-sm font-semibold text-[var(--color-primary-text)] hover:underline"
          >
            <X size={14} weight="bold" /> Clear
          </button>
        )}
      </div>

      {/* Result count */}
      <p className="mt-6 text-sm text-[var(--color-text-secondary)]">
        {results.length} {results.length === 1 ? "spot" : "spots"} found
      </p>

      {/* Results */}
      {results.length > 0 ? (
        <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((listing) => (
            <ListingCard key={listing.slug} listing={listing} />
          ))}
        </div>
      ) : (
        <div className="mt-10 text-center">
          <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold text-[var(--color-text-primary)]">
            No spots match your search
          </h2>
          <p className="mt-2 text-[var(--color-text-secondary)]">
            Try a different keyword or clear the filters.
          </p>
        </div>
      )}
    </div>
  );
}
