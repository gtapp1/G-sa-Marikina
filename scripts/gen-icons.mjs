/*
  Rasterizes the brand SVGs into the PNG icons Chromium prefers for install
  eligibility. Run once (or after changing the SVGs):

    node scripts/gen-icons.mjs

  Uses `sharp`, which is already present via Next's image pipeline.
*/
import sharp from "sharp";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pub = join(root, "public");

const jobs = [
  { src: "icon.svg", out: "icon-192.png", size: 192 },
  { src: "icon.svg", out: "icon-512.png", size: 512 },
  { src: "icon-maskable.svg", out: "icon-maskable-512.png", size: 512 },
];

for (const { src, out, size } of jobs) {
  const svg = await readFile(join(pub, src));
  await sharp(svg, { density: 384 })
    .resize(size, size, { fit: "contain" })
    .png()
    .toFile(join(pub, out));
  console.log(`generated public/${out} (${size}x${size})`);
}
