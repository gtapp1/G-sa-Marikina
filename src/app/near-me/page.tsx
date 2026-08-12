import { Metadata } from "next";
import { NearMe } from "@/components/near-me";

export const metadata: Metadata = {
  title: "Near me — G sa Marikina",
  description: "Find Marikina food spots closest to you.",
};

export default function NearMePage() {
  return (
    <main className="px-6 pt-10 pb-16 max-w-[1200px] mx-auto">
      <h1 className="text-3xl md:text-4xl text-[var(--text)]">Near me</h1>
      <p className="mt-2 text-sm text-[var(--text-muted)] mb-8">
        Share your location to see the closest spots first.
      </p>
      <NearMe />
    </main>
  );
}
