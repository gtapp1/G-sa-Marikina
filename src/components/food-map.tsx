"use client";

import { useState } from "react";
import Link from "next/link";
import Map, { Marker, Popup, NavigationControl } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { List, MapTrifold } from "@phosphor-icons/react";
import { Listing, CATEGORY_LABELS } from "@/types/listing";
import { StarRating } from "./star-rating";
import { CategoryIcon } from "./category-icon";
import { PhotoPlaceholder } from "./photo-placeholder";

interface FoodMapProps {
  listings: Listing[];
  showSidebar?: boolean;
}

const MARIKINA_CENTER = { longitude: 121.1029, latitude: 14.6407, zoom: 13 };

// Light map tiles (standard OpenStreetMap)
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

function SidebarItem({ listing, index, isActive, onHover }: {
  listing: Listing; index: number; isActive: boolean; onHover: (s: string | null) => void;
}) {
  const cat = CATEGORY_LABELS[listing.category];
  return (
    <Link
      href={`/${listing.slug}`}
      className={`group flex gap-3 px-4 py-3.5 border-b border-[var(--border)] transition-colors ${
        isActive ? "bg-[var(--bg-hover)]" : "hover:bg-[var(--bg-hover)]"
      }`}
      onMouseEnter={() => onHover(listing.slug)}
      onMouseLeave={() => onHover(null)}
    >
      <span className="flex-shrink-0 text-xs font-bold text-[var(--text-dim)] w-5 pt-0.5">
        {index + 1}
      </span>
      <div className="flex-shrink-0 w-14 h-14 rounded-[var(--radius-sm)] overflow-hidden bg-[var(--bg-hover)]">
        {listing.photos[0] ? (
          <img src={listing.photos[0]} alt={listing.name} className="w-full h-full object-cover" />
        ) : (
          <PhotoPlaceholder category={listing.category} />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-[var(--text)] truncate group-hover:text-[var(--accent)] transition-colors">
          {listing.name}
        </h3>
        <div className="flex items-center gap-1.5 mt-1">
          <span className="text-[11px] text-[var(--text-muted)]">{cat.label}</span>
          <span className="text-[11px] text-[var(--text-dim)]">·</span>
          <span className="text-[11px] text-[var(--text-muted)]">{listing.barangay}</span>
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

  const mapContent = (
    <Map initialViewState={MARIKINA_CENTER} mapStyle={MAP_STYLE} style={{ width: "100%", height: "100%" }}>
      <NavigationControl position="top-right" />
      {listings.map((listing) => (
        <Marker
          key={listing.slug}
          longitude={listing.longitude}
          latitude={listing.latitude}
          anchor="bottom"
          onClick={(e) => { e.originalEvent.stopPropagation(); setSelected(listing); }}
        >
          <button
            aria-label={`${listing.name} in ${listing.barangay}`}
            className={`flex items-center justify-center w-7 h-7 rounded-full text-white transition-all duration-150 ${
              hoveredSlug === listing.slug ? "bg-[var(--accent-hover)] scale-125" : "bg-[var(--accent)] hover:scale-110"
            }`}
          >
            <CategoryIcon category={listing.category} size={14} weight="fill" />
          </button>
        </Marker>
      ))}
      {selected && (
        <Popup
          longitude={selected.longitude} latitude={selected.latitude}
          anchor="bottom" offset={32} onClose={() => setSelected(null)}
          closeButton={false} maxWidth="200px"
        >
          <div className="w-[180px] bg-[var(--bg-elevated)] rounded-[var(--radius-md)] overflow-hidden border border-[var(--border)]">
            <div className="aspect-[4/3] bg-[var(--bg-hover)]">
              {selected.photos[0] ? (
                <img src={selected.photos[0]} alt={selected.name} className="w-full h-full object-cover" />
              ) : (
                <PhotoPlaceholder category={selected.category} />
              )}
            </div>
            <div className="p-2.5">
              <p className="text-xs font-medium text-[var(--text)] leading-tight">{selected.name}</p>
              <div className="mt-1"><StarRating rating={selected.rating} size={10} /></div>
              <Link href={`/${selected.slug}`} className="mt-1.5 block text-[10px] font-medium text-[var(--accent)]">
                View →
              </Link>
            </div>
          </div>
        </Popup>
      )}
    </Map>
  );

  if (!showSidebar) {
    return <div className="w-full h-[calc(100vh-64px)] md:h-[calc(100vh-80px)]">{mapContent}</div>;
  }

  return (
    <div className="h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] flex flex-col md:flex-row">
      {/* Mobile toggle */}
      <div className="md:hidden flex border-b border-[var(--border)] bg-[var(--bg)]">
        <button
          onClick={() => setMobileView("map")}
          className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors ${
            mobileView === "map" ? "text-[var(--accent)] border-b-2 border-[var(--accent)]" : "text-[var(--text-muted)]"
          }`}
        >
          <MapTrifold size={16} /> Map
        </button>
        <button
          onClick={() => setMobileView("list")}
          className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors ${
            mobileView === "list" ? "text-[var(--accent)] border-b-2 border-[var(--accent)]" : "text-[var(--text-muted)]"
          }`}
        >
          <List size={16} /> List
        </button>
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-[340px] border-r border-[var(--border)] bg-[var(--bg)]">
        <div className="px-4 py-3 border-b border-[var(--border)]">
          <h1 className="text-sm font-semibold text-[var(--text)]">Marikina Food Map</h1>
          <p className="text-xs text-[var(--text-dim)]">{listings.length} spots</p>
        </div>
        <div className="flex-1 overflow-y-auto">
          {listings.map((listing, idx) => (
            <SidebarItem
              key={listing.slug} listing={listing} index={idx}
              isActive={hoveredSlug === listing.slug || selected?.slug === listing.slug}
              onHover={setHoveredSlug}
            />
          ))}
        </div>
      </aside>

      {/* Mobile list */}
      <div className={`md:hidden flex-1 overflow-y-auto bg-[var(--bg)] ${mobileView === "list" ? "block" : "hidden"}`}>
        {listings.map((listing, idx) => (
          <SidebarItem key={listing.slug} listing={listing} index={idx} isActive={false} onHover={() => {}} />
        ))}
      </div>

      {/* Map */}
      <div className={`flex-1 ${mobileView === "map" ? "block" : "hidden"} md:block`}>
        {mapContent}
      </div>
    </div>
  );
}
