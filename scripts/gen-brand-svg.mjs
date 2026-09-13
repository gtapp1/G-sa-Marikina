/*
  Generates the brand app-icon SVGs using the EXACT Sora glyph outlines for
  "G!" on brand red, matching the in-app badge (tracking-tight).

  Weight is tunable via WEIGHT below (Sora axis range 100-800).

  Pipeline:
    scripts/.fonts/Sora.ttf (variable font)  ->  opentype.js
      -> set wght axis to WEIGHT
      -> extract vector paths for "G" and "!"
      -> center on a pure-red canvas
      -> write public/icon.svg + public/icon-maskable.svg

  Then run `npm run icons` to rasterize the PNGs from these SVGs.

  Run: node scripts/gen-brand-svg.mjs
*/
import opentype from "opentype.js";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const fontPath = join(root, "scripts/.fonts/Sora.ttf");

const CANVAS = 512;
const RED = "#EB1700";
const WHITE = "#FFFFFF";
const FONT_SIZE = 300; // glyph cap size on the 512 canvas
const TRACKING = -0.03; // "tracking-tight" ~= -0.03em, matches the app badge
const WEIGHT = 700; // Sora wght axis (100-800). 800 = ExtraBold, 700 = Bold.

const font = opentype.loadSync(fontPath);

// Variable font: pin the weight axis if present.
const variation =
  font.tables.fvar && font.tables.fvar.axes.some((a) => a.tag === "wght")
    ? { wght: WEIGHT }
    : undefined;

function glyphFor(char) {
  const glyph = font.charToGlyph(char);
  return glyph;
}

// Build absolute SVG path data for a string, centered on the canvas.
function buildPaths(text) {
  const scale = FONT_SIZE / font.unitsPerEm;
  const trackingUnits = TRACKING * FONT_SIZE;

  // First pass: total advance width (with tracking between glyphs).
  let totalWidth = 0;
  const glyphs = [...text].map(glyphFor);
  glyphs.forEach((g, i) => {
    totalWidth += g.advanceWidth * scale;
    if (i < glyphs.length - 1) totalWidth += trackingUnits;
  });

  // Vertical centering: use the font's cap height for optical balance.
  const capHeight =
    (font.tables.os2 && font.tables.os2.sCapHeight) || font.unitsPerEm * 0.7;
  const glyphHeight = capHeight * scale;
  const baselineY = CANVAS / 2 + glyphHeight / 2;

  let penX = (CANVAS - totalWidth) / 2;
  const pathData = [];
  glyphs.forEach((g, i) => {
    const p = g.getPath(penX, baselineY, FONT_SIZE, { variation });
    pathData.push(p.toPathData(3));
    penX += g.advanceWidth * scale;
    if (i < glyphs.length - 1) penX += trackingUnits;
  });
  return pathData.join(" ");
}

const gBang = buildPaths("G!");

const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${CANVAS} ${CANVAS}" fill="none">
  <!-- Full-bleed brand red, matching the in-app G! badge (#EB1700). -->
  <rect width="${CANVAS}" height="${CANVAS}" fill="${RED}"/>
  <!-- Exact Sora (wght ${WEIGHT}) outlines for "G!", generated from Sora.ttf. -->
  <path d="${gBang}" fill="${WHITE}"/>
</svg>
`;

// Maskable: same glyphs at ~80% inside the maskable safe zone.
const maskableSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${CANVAS} ${CANVAS}" fill="none">
  <!-- Full-bleed brand red so any OS mask stays on-brand. -->
  <rect width="${CANVAS}" height="${CANVAS}" fill="${RED}"/>
  <!-- Same Sora (wght ${WEIGHT}) "G!", scaled to the maskable safe zone. -->
  <g transform="translate(${CANVAS / 2} ${CANVAS / 2}) scale(0.8) translate(${-CANVAS / 2} ${-CANVAS / 2})">
    <path d="${gBang}" fill="${WHITE}"/>
  </g>
</svg>
`;

writeFileSync(join(root, "public/icon.svg"), iconSvg);
writeFileSync(join(root, "public/icon-maskable.svg"), maskableSvg);
console.log(`wrote public/icon.svg and public/icon-maskable.svg (Sora wght ${WEIGHT})`);
