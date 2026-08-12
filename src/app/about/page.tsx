import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — G sa Marikina",
  description: "G sa Marikina is a local food directory for Marikina City.",
};

export default function AboutPage() {
  return (
    <main className="px-4 md:px-6 pt-10 pb-16 max-w-[640px] mx-auto">
      <h1 className="text-[26px] md:text-[32px] font-bold text-[var(--color-text-secondary)] tracking-[-0.03em]">
        About
      </h1>

      <div className="mt-8 space-y-5 text-[14px] leading-[1.75] tracking-tight text-[var(--color-text-primary)]">
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
      </div>

      <p className="mt-10 text-[11px] tracking-tight text-[var(--color-text-primary)] opacity-60">
        Built for the Marikina food community.
      </p>
    </main>
  );
}
