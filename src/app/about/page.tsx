import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — G sa Marikina",
  description:
    "G sa Marikina is a local food discovery platform for Marikina City. Helping small food businesses get discovered.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen px-4 pt-6 pb-16 max-w-[720px] mx-auto">
      <h1 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-extrabold text-[var(--color-text-primary)]">
        About G sa Marikina
      </h1>

      <div className="mt-6 space-y-4 text-base text-[var(--color-text-primary)] leading-relaxed">
        <p>
          G sa Marikina is a food discovery platform built for one city:
          Marikina. It&apos;s a place where small food businesses, from
          home-based bakers to starting restos, can be found by the people who
          want to eat their food.
        </p>
        <p>
          Small food businesses in Marikina make great products but struggle
          to get discovered. Their marketing is scattered across Facebook
          groups, tarpaulin signs, and word of mouth. G sa Marikina gives them
          one home: a shareable page with photos, menu, location, and reviews.
        </p>
        <p>
          For food lovers, it&apos;s the easiest way to find your next favorite
          spot. Browse by category, explore the map, and support local
          Marikeño businesses.
        </p>
        <p className="text-[var(--color-text-secondary)]">
          Made with 💛 for the Marikina food community.
        </p>
      </div>
    </main>
  );
}
