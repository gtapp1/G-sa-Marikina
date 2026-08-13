"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import Map, {
  Marker,
  Popup,
  NavigationControl,
  Source,
  Layer,
  MapRef,
} from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { List, MapTrifold, X } from "@phosphor-icons/react";
import { Listing, CATEGORY_LABELS } from "@/types/listing";
import { StarRating } from "./star-rating";
import { CategoryIcon } from "./category-icon";
import { PhotoPlaceholder } from "./photo-placeholder";
import barangayBoundaries from "@/data/barangay-boundaries.json";

interface FoodMapProps {
  listings: Listing[];
  showSidebar?: boolean;
}

const MARIKINA_CENTER = { longitude: 121.1029, latitude: 14.6407, zoom: 13 };

type BoundaryFeature = {
  type: "Feature";
  properties: { name: string; id: string };
  geometry: { type: "Polygon"; coordinates: number[][][] };
};

const BOUNDARIES = barangayBoundaries as {
  type: "FeatureCollection";
  features: BoundaryFeature[];
};

// Barangays with a mapped polygon (from src/data/barangay-boundaries.json).
// Only these show up in the selector — no point offering a barangay whose
// boundary we don't have.
const AVAILABLE_BARANGAYS = BOUNDARIES.features
  .map((f) => f.properties.name)
  .sort();

function computeBounds(coords: number[][][]) {
  let minLng = Infinity;
  let minLat = Infinity;
  let maxLng = -Infinity;
  let maxLat = -Infinity;
  for (const ring of coords) {
    for (const [lng, lat] of ring) {
      if (lng < minLng) minLng = lng;
      if (lng > maxLng) maxLng = lng;
      if (lat < minLat) minLat = lat;
      if (lat > maxLat) maxLat = lat;
    }
  }
  return [
    [minLng, minLat],
    [maxLng, maxLat],
  ] as [[number, number], [number, number]];
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

function SidebarItem({
  listing,
  index,
  isActive,
  onHover,
}: {
  listing: Listing;
  index: number;
  isActive: boolean;
  onHover: (s: string | null) => void;
}) {
  const cat = CATEGORY_LABELS[listing.category];
  return (
    <Link
      href={`/${listing.slug}`}
      className={`group flex gap-3 px-4 py-3.5 border-b border-[var(--color-border)] transition-colors ${
        isActive
          ? "bg-[var(--color-accent-light)]"
          : "hover:bg-[var(--color-surface-subtle)]"
      }`}
      onMouseEnter={() => onHover(listing.slug)}
      onMouseLeave={() => onHover(null)}
    >
      <span className="shrink-0 text-[11px] font-bold text-[var(--color-text-primary)] w-5 pt-0.5">
        {index + 1}
      </span>
      <div className="shrink-0 w-14 h-14 overflow-hidden rounded-[var(--radius-xs)] bg-[var(--color-surface-subtle)]">
        {listing.photos[0] ? (
          <img
            src={listing.photos[0]}
            alt={listing.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <PhotoPlaceholder category={listing.category} />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-[13px] font-bold tracking-tight text-[var(--color-text-secondary)] truncate group-hover:text-[var(--color-accent)] transition-colors">
          {listing.name}
        </h3>
        <div className="flex items-center gap-1 mt-1">
          <span className="text-[11px] tracking-tight text-[var(--color-text-primary)]">
            {cat.label}
          </span>
          <span className="text-[11px] text-[var(--color-text-primary)] opacity-40">·</span>
          <span className="text-[11px] tracking-tight text-[var(--color-text-primary)]">
            {listing.barangay}
          </span>
        </div>
        <div className="mt-1">
          <StarRating rating={listing.rating} size={10} />
        </div>
      </div>
    </Link>
  );
}

export function FoodMap({ listings, showSidebar = false }: FoodMapProps) {
  const [selected, setSelected] = useState<Listing | null>(null);
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const [mobileView, setMobileView] = useState<"map" | "list">("map");
  const [activeBarangay, setActiveBarangay] = useState<string | null>(null);
  const mapRef = useRef<MapRef | null>(null);

  const visibleListings = useMemo(
    () =>
      activeBarangay
        ? listings.filter((l) => l.barangay === activeBarangay)
        : listings,
    [listings, activeBarangay]
  );

  function handleSelectBarangay(name: string | null) {
    setActiveBarangay(name);
    setSelected(null);

    if (!name) {
      mapRef.current?.flyTo({ ...MARIKINA_CENTER, duration: 800 });
      return;
    }

    const feature = BOUNDARIES.features.find((f) => f.properties.name === name);
    if (feature && mapRef.current) {
      const bounds = computeBounds(feature.geometry.coordinates);
      mapRef.current.fitBounds(bounds, { padding: 48, duration: 800 });
    }
  }

  const mapContent = (
    <Map
      ref={mapRef}
      initialViewState={MARIKINA_CENTER}
      mapStyle={MAP_STYLE}
      style={{ width: "100%", height: "100%" }}
    >
      <NavigationControl position="top-right" />

      <Source id="barangay-boundaries" type="geojson" data={BOUNDARIES as any}>
        <Layer
          id="barangay-fill"
          type="fill"
          paint={{
            "fill-color": "#E8590C",
            "fill-opacity": activeBarangay ? 0.15 : 0,
          }}
          filter={
            activeBarangay
              ? ["==", ["get", "name"], activeBarangay]
              : ["==", ["get", "name"], "__none__"]
          }
        />
        <Layer
          id="barangay-outline"
          type="line"
          paint={{
            "line-color": "#E8590C",
            "line-width": 2.5,
          }}
          filter={
            activeBarangay
              ? ["==", ["get", "name"], activeBarangay]
              : ["==", ["get", "name"], "__none__"]
          }
        />
      </Source>

      {visibleListings.map((listing) => (
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
            aria-label={`${listing.name} in ${listing.barangay}`}
            style={{
              backgroundColor:
                hoveredSlug === listing.slug
                  ? "#C4320A"
                  : "#E8590C",
              transform:
                hoveredSlug === listing.slug ? "scale(1.25)" : "scale(1)",
            }}
            className="flex items-center justify-center w-8 h-8 rounded-[var(--radius-xs)] bg-[var(--color-accent)] text-white shadow-md transition-all duration-150 hover:scale-110"
          >
            <CategoryIcon category={listing.category} size={15} weight="fill" />
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
          maxWidth="200px"
        >
          <div className="w-[180px] bg-white overflow-hidden rounded-[var(--radius-xs)] border border-[var(--color-border)]">
            <div className="aspect-[4/3] overflow-hidden bg-[var(--color-surface-subtle)]">
              {selected.photos[0] ? (
                <img
                  src={selected.photos[0]}
                  alt={selected.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <PhotoPlaceholder category={selected.category} />
              )}
            </div>
            <div className="p-2.5" style={{ fontFamily: "var(--font-heading), system-ui, sans-serif" }}>
              <p className="text-[12px] font-bold tracking-tight text-[var(--color-text-secondary)] leading-tight">
                {selected.name}
              </p>
              <div className="mt-1">
                <StarRating rating={selected.rating} size={10} />
              </div>
              <span className="text-[10px] tracking-tight text-[var(--color-text-primary)]">
                {selected.barangay}
              </span>
              <Link
                href={`/${selected.slug}`}
                className="mt-2 block text-[11px] font-bold tracking-tight text-[var(--color-accent-red)]"
              >
                View spot →
              </Link>
            </div>
          </div>
        </Popup>
      )}
    </Map>
  );

  const barangaySelector = (
    <div className="flex items-center gap-2 overflow-x-auto px-4 py-2.5 border-b border-[var(--color-border)] bg-white scrollbar-hide">
      <span className="shrink-0 text-[11px] font-bold tracking-tight text-[var(--color-text-primary)] uppercase">
        Barangay:
      </span>
      {AVAILABLE_BARANGAYS.map((name) => (
        <button
          key={name}
          onClick={() => handleSelectBarangay(activeBarangay === name ? null : name)}
          className={`shrink-0 px-3 py-1.5 text-[12px] font-bold tracking-tight rounded-full border transition-colors whitespace-nowrap ${
            activeBarangay === name
              ? "bg-[var(--color-accent)] text-white border-[var(--color-accent)]"
              : "bg-white text-[var(--color-text-secondary)] border-[var(--color-border)] hover:border-[var(--color-accent)]"
          }`}
        >
          {name}
        </button>
      ))}
      {activeBarangay && (
        <button
          onClick={() => handleSelectBarangay(null)}
          className="shrink-0 flex items-center gap-1 px-3 py-1.5 text-[12px] font-bold tracking-tight text-[var(--color-accent-red)]"
        >
          <X size={12} weight="bold" /> Clear
        </button>
      )}
    </div>
  );

  if (!showSidebar) {
    return (
      <div className="w-full h-[calc(100vh-56px)] md:h-[calc(100vh-60px)] flex flex-col">
        {barangaySelector}
        <div className="flex-1">{mapContent}</div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-56px)] md:h-[calc(100vh-60px)] flex flex-col">
      {barangaySelector}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Mobile toggle */}
        <div className="md:hidden flex border-b border-[var(--color-border)] bg-white">
          <button
            onClick={() => setMobileView("map")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-[12px] font-bold tracking-tight transition-colors ${
              mobileView === "map"
                ? "text-[var(--color-accent-red)] border-b-2 border-[var(--color-accent-red)]"
                : "text-[var(--color-text-primary)]"
            }`}
          >
            <MapTrifold size={15} /> Map
          </button>
          <button
            onClick={() => setMobileView("list")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-[12px] font-bold tracking-tight transition-colors ${
              mobileView === "list"
                ? "text-[var(--color-accent-red)] border-b-2 border-[var(--color-accent-red)]"
                : "text-[var(--color-text-primary)]"
            }`}
          >
            <List size={15} /> List
          </button>
        </div>

        {/* Desktop sidebar */}
        <aside className="hidden md:flex flex-col w-[320px] border-r border-[var(--color-border)] bg-white">
          <div className="px-4 py-3 border-b border-[var(--color-border)]">
            <h1 className="text-[13px] font-bold tracking-tight text-[var(--color-text-secondary)]">
              Marikina Food Map
            </h1>
            <p className="text-[11px] tracking-tight text-[var(--color-text-primary)]">
              {visibleListings.length} spots
              {activeBarangay ? ` in ${activeBarangay}` : ""}
            </p>
          </div>
          <div className="flex-1 overflow-y-auto">
            {visibleListings.map((listing, idx) => (
              <SidebarItem
                key={listing.slug}
                listing={listing}
                index={idx}
                isActive={
                  hoveredSlug === listing.slug ||
                  selected?.slug === listing.slug
                }
                onHover={setHoveredSlug}
              />
            ))}
          </div>
        </aside>

        {/* Mobile list */}
        <div
          className={`md:hidden flex-1 overflow-y-auto bg-white ${
            mobileView === "list" ? "block" : "hidden"
          }`}
        >
          {visibleListings.map((listing, idx) => (
            <SidebarItem
              key={listing.slug}
              listing={listing}
              index={idx}
              isActive={false}
              onHover={() => {}}
            />
          ))}
        </div>

        {/* Map */}
        <div
          className={`flex-1 ${
            mobileView === "map" ? "block" : "hidden"
          } md:block`}
        >
          {mapContent}
        </div>
      </div>
    </div>
  );
}
