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
  layers: [{ id: "osm", type: "raster" as const, source: "osm" }],
};

export function ListingLocation({
  latitude,
  longitude,
  barangay,
  category,
}: ListingLocationProps) {
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

  return (
    <div className="mt-8">
      <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold text-[var(--color-text-primary)] mb-3">
        Location
      </h2>
      <div className="rounded-[var(--radius-md)] overflow-hidden border border-[var(--color-border)]">
        <div className="h-48 w-full">
          <Map
            initialViewState={{ latitude, longitude, zoom: 15 }}
            mapStyle={MAP_STYLE}
            style={{ width: "100%", height: "100%" }}
            interactive={false}
            attributionControl={false}
          >
            <Marker latitude={latitude} longitude={longitude} anchor="bottom">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[var(--color-primary)] text-white shadow-[0_2px_8px_rgba(61,44,30,0.3)]">
                <CategoryIcon category={category} size={16} weight="fill" />
              </div>
            </Marker>
          </Map>
        </div>
        <div className="flex items-center justify-between p-3 bg-[var(--color-surface)]">
          <span className="text-sm text-[var(--color-text-secondary)]">
            {barangay}, Marikina City
          </span>
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-primary-text)] hover:underline"
          >
            Get directions <ArrowRight size={14} weight="bold" />
          </a>
        </div>
      </div>
    </div>
  );
}
