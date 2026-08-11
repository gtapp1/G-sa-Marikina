"use client";

import { useState } from "react";
import Link from "next/link";
import Map, { Marker, Popup, NavigationControl } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { Listing } from "@/types/listing";
import { StarRating } from "./star-rating";
import { CategoryIcon } from "./category-icon";
import { PhotoPlaceholder } from "./photo-placeholder";

interface FoodMapProps {
  listings: Listing[];
}

// Marikina City center
const MARIKINA_CENTER = { longitude: 121.1029, latitude: 14.6407, zoom: 13 };

// Free OpenStreetMap raster style (no API key needed)
const MAP_STYLE = {
  version: 8 as const,
  sources: {
    osm: {
      type: "raster" as const,
      tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
      tileSize: 256,
      attribution: "© OpenStreetMap contributors",
    },
  },
  layers: [
    {
      id: "osm",
      type: "raster" as const,
      source: "osm",
    },
  ],
};

export function FoodMap({ listings }: FoodMapProps) {
  const [selected, setSelected] = useState<Listing | null>(null);

  return (
    <div className="w-full h-[calc(100vh-56px)] md:h-[calc(100vh-64px)]">
      <Map
        initialViewState={MARIKINA_CENTER}
        mapStyle={MAP_STYLE}
        style={{ width: "100%", height: "100%" }}
      >
        <NavigationControl position="top-right" />

        {listings.map((listing) => (
          <Marker
            key={listing.slug}
            longitude={listing.longitude}
            latitude={listing.latitude}
            anchor="bottom"
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              setSelected(listing);
            }}
          >
            <button
              aria-label={`Location of ${listing.name} in ${listing.barangay}`}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-[var(--color-primary)] text-white shadow-[0_2px_8px_rgba(61,44,30,0.3)] hover:scale-110 transition-transform"
            >
              <CategoryIcon category={listing.category} size={16} weight="fill" />
            </button>
          </Marker>
        ))}

        {selected && (
          <Popup
            longitude={selected.longitude}
            latitude={selected.latitude}
            anchor="bottom"
            offset={36}
            onClose={() => setSelected(null)}
            closeButton={false}
            maxWidth="220px"
          >
            <div className="w-[200px]">
              <div className="aspect-[4/3] bg-[var(--color-border)] rounded-[var(--radius-sm)] overflow-hidden mb-2">
                {selected.photos[0] ? (
                  <img
                    src={selected.photos[0]}
                    alt={`${selected.name}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <PhotoPlaceholder category={selected.category} />
                )}
              </div>
              <h3 className="font-[family-name:var(--font-heading)] text-sm font-bold text-[var(--color-text-primary)] leading-tight">
                {selected.name}
              </h3>
              <div className="flex items-center gap-1 mt-1">
                <StarRating rating={selected.rating} size={12} />
                <span className="text-[10px] text-[var(--color-text-secondary)]">
                  ({selected.reviewCount})
                </span>
              </div>
              <Link
                href={`/${selected.slug}`}
                className="mt-2 block text-center text-xs font-semibold text-[var(--color-primary-text)] hover:underline"
              >
                View →
              </Link>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
}
