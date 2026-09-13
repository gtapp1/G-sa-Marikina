/*
  Generates the default social-share (OpenGraph) image: a 1200x630 card that is
  simply the brand logo — full brand-red background with the white "G!" mark
  centered, matching the app icon.

  Reuses the exact Sora ExtraBold "G!" glyph outlines (same source as the app
  icon), then rasterizes to public/og.png.

  Run: node scripts/gen-og.mjs  (or npm run og)
*/
import opentype from "opentype.js";
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const font = opentype.loadSync(join(root, "scripts/.fonts/Sora.ttf"));

const W = 1200;
const H = 630;
const RED = "#EB1700";
const WHITE = "#FFFFFF";
const FONT_SIZE = 340; // "G!" cap size
const TRACKING = -0.03; // tracking-tight, matches the app badge
const STROKE = 16; // heavier "G!" to match the app badge weight

const wght800 =
  font.tables.fvar && font.tables.fvar.axes.some((a) => a.tag === "wght")
    ? { wght: 800 }
    : undefined;

// Build centered "G!" path data.
function centeredGBang() {
  const scale = FONT_SIZE / font.unitsPerEm;
  const trackUnits = TRACKING * FONT_SIZE;
  const glyphs = [..."G!"].map((c) => font.charToGlyph(c));

  let totalWidth = 0;
  glyphs.forEach((g, i) => {
    totalWidth += g.advanceWidth * scale;
    if (i < glyphs.length - 1) totalWidth += trackUnits;
  });

  const capHeight =
    (font.tables.os2 && font.tables.os2.sCapHeight) || font.unitsPerEm * 0.7;
  const glyphHeight = capHeight * scale;
  const baselineY = H / 2 + glyphHeight / 2;

  let penX = (W - totalWidth) / 2;
  const parts = [];
  glyphs.forEach((g, i) => {
    parts.push(g.getPath(penX, baselineY, FONT_SIZE, { variation: wght800 }).toPathData(3));
    penX += g.advanceWidth * scale;
    if (i < glyphs.length - 1) penX += trackUnits;
  });
  return parts.join(" ");
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${RED}"/>
  <path d="${centeredGBang()}" fill="${WHITE}" stroke="${WHITE}" stroke-width="${STROKE}" stroke-linejoin="miter" stroke-miterlimit="2"/>
</svg>`;

await sharp(Buffer.from(svg), { density: 200 })
  .png()
  .toFile(join(root, "public/og.png"));

console.log("wrote public/og.png (1200x630, brand logo)");
