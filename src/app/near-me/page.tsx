import { Metadata } from "next";
import { NearMe } from "@/components/near-me";

export const metadata: Metadata = {
  title: "Near me — G sa Marikina",
  description: "Find Marikina food spots closest to you.",
};

export default function NearMePage() {
  return (
    <main className="min-h-screen px-6 pt-8 pb-16 max-w-[1200px] mx-auto">
      <h1 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-extrabold text-[var(--color-text-primary)]">
        Near me
      </h1>
      <p className="mt-2 mb-6 text-[var(--color-text-secondary)]">
        Share your location to see the closest spots first.
      </p>
      <NearMe />
    </main>
  );
}
