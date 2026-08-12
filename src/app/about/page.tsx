import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — G sa Marikina",
  description: "G sa Marikina is a local food directory for Marikina City.",
};

export default function AboutPage() {
  return (
    <main className="px-5 md:px-10 pt-12 pb-20 max-w-[800px] mx-auto">
      <h1 className="text-[36px] md:text-[48px] font-bold text-[var(--color-text-secondary)] tracking-[-0.03em]">
        About
      </h1>
      <div className="mt-10 space-y-6 text-[16px] leading-[1.8] tracking-tight text-[var(--color-text-primary)]">
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
      <p className="mt-12 text-[13px] tracking-tight text-[var(--color-text-primary)] opacity-60">
        Built for the Marikina food community.
      </p>
    </main>
  );
}
