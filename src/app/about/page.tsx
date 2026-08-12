import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — G sa Marikina",
  description: "G sa Marikina is a local food directory for Marikina City.",
};

export default function AboutPage() {
  return (
    <main className="px-6 pt-12 pb-16 max-w-[600px] mx-auto">
      <h1 className="text-3xl md:text-4xl text-[var(--text)]">About</h1>

      <div className="mt-8 space-y-5 text-sm leading-[1.8] text-[var(--text-muted)]">
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

      <p className="mt-10 text-xs text-[var(--text-dim)]">
        Built for the Marikina food community.
      </p>
    </main>
  );
}
