"use client";

import Map, { Marker } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { ArrowRight } from "@phosphor-icons/react";
import { Category } from "@/types/listing";
import { CategoryIcon } from "./category-icon";

interface ListingLocationProps {
  latitude: number;
  longitude: number;
  barangay: string;
  category: Category;
}

// Dark map style using CartoDB dark matter tiles
const MAP_STYLE = {
  version: 8 as const,
  sources: {
    carto: {
      type: "raster" as const,
      tiles: [
        "https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png",
        "https://b.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png",
      ],
      tileSize: 256,
      attribution: "© OpenStreetMap contributors, © CARTO",
    },
  },
  layers: [{ id: "carto", type: "raster" as const, source: "carto" }],
};

export function ListingLocation({
  latitude,
  longitude,
  barangay,
  category,
}: ListingLocationProps) {
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

  return (
    <div className="mt-10">
      <h2 className="text-xl text-[var(--text)] mb-4">Location</h2>
      <div className="rounded-[var(--radius-md)] overflow-hidden border border-[var(--border)]">
        <div className="h-48 w-full">
          <Map
            initialViewState={{ latitude, longitude, zoom: 15 }}
            mapStyle={MAP_STYLE}
            style={{ width: "100%", height: "100%" }}
            interactive={false}
            attributionControl={false}
          >
            <Marker latitude={latitude} longitude={longitude} anchor="bottom">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[var(--accent)] text-white shadow-lg">
                <CategoryIcon category={category} size={16} weight="fill" />
              </div>
            </Marker>
          </Map>
        </div>
        <div className="flex items-center justify-between p-3 bg-[var(--bg-elevated)]">
          <span className="text-sm text-[var(--text-muted)]">
            {barangay}, Marikina City
          </span>
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-medium text-[var(--accent)] hover:underline"
          >
            Directions <ArrowRight size={12} />
          </a>
        </div>
      </div>
    </div>
  );
}
