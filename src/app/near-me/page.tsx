import { Metadata } from "next";
import { NearMe } from "@/components/near-me";

export const metadata: Metadata = {
  title: "Near me — G sa Marikina",
  description: "Find Marikina food spots closest to you.",
};

export default function NearMePage() {
  return (
    <main className="px-5 md:px-10 pt-12 pb-20 max-w-[1400px] mx-auto">
      <h1 className="text-[36px] md:text-[48px] font-bold text-[var(--color-text-secondary)] tracking-[-0.03em]">
        Near me
      </h1>
      <p className="mt-2 text-[15px] tracking-tight text-[var(--color-text-primary)] mb-10">
        Share your location to see the closest spots first.
      </p>
      <NearMe />
    </main>
  );
}
