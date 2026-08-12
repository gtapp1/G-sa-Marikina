import { Metadata } from "next";
import { NearMe } from "@/components/near-me";

export const metadata: Metadata = {
  title: "Near me — G sa Marikina",
  description: "Find Marikina food spots closest to you.",
};

export default function NearMePage() {
  return (
    <main className="px-4 md:px-6 pt-8 pb-16 max-w-[1200px] mx-auto">
      <h1 className="text-[26px] md:text-[32px] font-bold text-[var(--color-text-secondary)] tracking-[-0.03em]">
        Near me
      </h1>
      <p className="mt-1 text-[13px] tracking-tight text-[var(--color-text-primary)] mb-8">
        Share your location to see the closest spots first.
      </p>
      <NearMe />
    </main>
  );
}
