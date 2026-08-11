import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — G sa Marikina",
  description:
    "G sa Marikina is a local food directory for Marikina City, built to help small food businesses get found.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen px-6 pt-10 pb-16 max-w-[680px] mx-auto">
      <h1 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-extrabold text-[var(--color-text-primary)]">
        About
      </h1>

      <div className="mt-6 space-y-5 text-base leading-relaxed text-[var(--color-text-primary)]">
        <p>
          G sa Marikina is a food directory for one city: Marikina. Each spot
          gets a page with photos, a menu, a location, and a way to order.
        </p>
        <p>
          Most small food sellers here rely on Facebook posts, group shares,
          and tarpaulin signs. Those work, but the reach fades fast and there
          is no single place to send someone. This gives every spot one link.
        </p>
        <p>
          If you are looking for something to eat, browse by category or open
          the map to see what is near you.
        </p>
        <p className="text-[var(--color-text-secondary)]">
          Built for the Marikina food community.
        </p>
      </div>
    </main>
  );
}
