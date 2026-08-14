/**
 * Converts raw Overpass API output (docs/overpass-marikina-raw.json) into a
 * clean GeoJSON FeatureCollection of Marikina barangay boundary polygons.
 *
 * Overpass relations return an unordered list of "outer" ways, each with its
 * own coordinate geometry. This script stitches those ways together into a
 * single closed ring per barangay by matching shared endpoints.
 *
 * Run: npx tsx scripts/build-barangay-geojson.ts
 */
import fs from "fs";
import path from "path";

interface OverpassNode {
  lat: number;
  lon: number;
}

interface OverpassWayMember {
  type: string;
  ref: number;
  role: string;
  geometry?: OverpassNode[];
  lat?: number;
  lon?: number;
}

interface OverpassRelation {
  type: "relation";
  id: number;
  members: OverpassWayMember[];
  tags: Record<string, string>;
}

// Barangays covered by current listings data (per design doc fallback scope).
// Matches src/data/listings.ts barangay values.
const TARGET_BARANGAYS = new Set([
  "Malanday",
  "Concepcion Uno",
  "Sta. Elena",
  "Santa Elena", // OSM full name; short_name is "Sta. Elena"
  "Industrial Valley",
  "San Roque",
  "Barangka",
]);

type Ring = [number, number][]; // [lng, lat] pairs

function waysToRing(ways: OverpassWayMember[]): Ring | null {
  // Each way has a geometry array of {lat, lon}. Convert to [lng, lat] segments.
  const segments: [number, number][][] = ways
    .filter((w) => w.geometry && w.geometry.length > 0)
    .map((w) => w.geometry!.map((pt) => [pt.lon, pt.lat] as [number, number]));

  if (segments.length === 0) return null;

  // Stitch segments end-to-end by matching coordinates (within float tolerance).
  const eq = (a: [number, number], b: [number, number]) =>
    Math.abs(a[0] - b[0]) < 1e-7 && Math.abs(a[1] - b[1]) < 1e-7;

  const remaining = [...segments];
  const ring: [number, number][] = remaining.shift()!;

  let guard = 0;
  while (remaining.length > 0 && guard < 500) {
    guard++;
    const tail = ring[ring.length - 1];
    let found = false;

    for (let i = 0; i < remaining.length; i++) {
      const seg = remaining[i];
      if (eq(seg[0], tail)) {
        ring.push(...seg.slice(1));
        remaining.splice(i, 1);
        found = true;
        break;
      }
      if (eq(seg[seg.length - 1], tail)) {
        ring.push(...seg.slice(0, -1).reverse());
        remaining.splice(i, 1);
        found = true;
        break;
      }
    }

    if (!found) {
      // Try matching from the head instead (ring might need reversing/growing at front)
      const head = ring[0];
      let foundHead = false;
      for (let i = 0; i < remaining.length; i++) {
        const seg = remaining[i];
        if (eq(seg[seg.length - 1], head)) {
          ring.unshift(...seg.slice(0, -1));
          remaining.splice(i, 1);
          foundHead = true;
          break;
        }
        if (eq(seg[0], head)) {
          ring.unshift(...seg.slice(1).reverse());
          remaining.splice(i, 1);
          foundHead = true;
          break;
        }
      }
      if (!foundHead) break; // give up stitching remaining fragments
    }
  }

  // Close the ring if not already closed.
  if (!eq(ring[0], ring[ring.length - 1])) {
    ring.push(ring[0]);
  }

  return ring;
}

function main() {
  const rawPath = path.join(__dirname, "..", "docs", "overpass-marikina-raw.json");
  const raw = JSON.parse(fs.readFileSync(rawPath, "utf-8"));
  const elements: OverpassRelation[] = raw.elements.filter(
    (e: any) => e.type === "relation"
  );

  const features: any[] = [];
  const seenNames = new Set<string>();

  for (const rel of elements) {
    const name = rel.tags?.name;
    const shortName = rel.tags?.short_name;
    const matchName = name && TARGET_BARANGAYS.has(name);
    const matchShort = shortName && TARGET_BARANGAYS.has(shortName);
    if (!matchName && !matchShort) continue;

    const displayName = shortName && TARGET_BARANGAYS.has(shortName) ? shortName : name;
    if (seenNames.has(displayName)) continue;

    const outerWays = rel.members.filter((m) => m.type === "way" && m.role === "outer");
    const ring = waysToRing(outerWays);
    if (!ring || ring.length < 4) {
      console.warn(`Skipping ${displayName}: could not assemble closed ring`);
      continue;
    }

    seenNames.add(displayName);
    features.push({
      type: "Feature",
      properties: {
        name: displayName,
        id: displayName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
      },
      geometry: {
        type: "Polygon",
        coordinates: [ring],
      },
    });
  }

  const geojson = {
    type: "FeatureCollection",
    features,
  };

  const outPath = path.join(__dirname, "..", "src", "data", "barangay-boundaries.json");
  fs.writeFileSync(outPath, JSON.stringify(geojson, null, 2));
  console.log(`Wrote ${features.length} barangay polygons to ${outPath}`);
  console.log("Barangays covered:", [...seenNames].join(", "));
}

main();
