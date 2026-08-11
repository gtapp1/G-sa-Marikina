"use client";

import { useState } from "react";
import { NavigationArrow, Warning } from "@phosphor-icons/react";
import { listings } from "@/data/listings";
import { distanceKm } from "@/lib/distance";
import { ListingCard } from "./listing-card";

type Status = "idle" | "loading" | "granted" | "denied" | "unsupported";

export function NearMe() {
  const [status, setStatus] = useState<Status>("idle");
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(
    null
  );

  const requestLocation = () => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setStatus("unsupported");
      return;
    }
    setStatus("loading");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setStatus("granted");
      },
      () => setStatus("denied"),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  // Sorted results. When we have coordinates, sort by distance; otherwise
  // fall back to rating (the graceful fallback the design doc calls for).
  const results =
    status === "granted" && coords
      ? [...listings]
          .map((l) => ({
            listing: l,
            km: distanceKm(coords.lat, coords.lng, l.latitude, l.longitude),
          }))
          .sort((a, b) => a.km - b.km)
      : [...listings]
          .sort((a, b) => b.rating - a.rating)
          .map((l) => ({ listing: l, km: undefined }));

  return (
    <div>
      {status === "idle" && (
        <button
          onClick={requestLocation}
          className="inline-flex items-center gap-2 rounded-[var(--radius-sm)] bg-[var(--color-primary)] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-primary-hover)]"
        >
          <NavigationArrow size={18} weight="fill" />
          Use my location
        </button>
      )}

      {status === "loading" && (
        <p className="text-sm text-[var(--color-text-secondary)]">
          Finding spots near you…
        </p>
      )}

      {(status === "denied" || status === "unsupported") && (
        <div className="flex items-start gap-2 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-sm text-[var(--color-text-secondary)]">
          <span className="mt-0.5 text-[var(--color-primary)]">
            <Warning size={18} weight="fill" />
          </span>
          <p>
            {status === "denied"
              ? "Location access is off, so we can't sort by distance."
              : "Your browser doesn't support location."}{" "}
            Showing top-rated spots instead.
          </p>
        </div>
      )}

      {(status === "granted" || status === "denied" || status === "unsupported") && (
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map(({ listing, km }) => (
            <ListingCard key={listing.slug} listing={listing} distanceKm={km} />
          ))}
        </div>
      )}
    </div>
  );
}
