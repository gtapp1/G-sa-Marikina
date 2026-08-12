import { Metadata } from "next";
import { SubmitForm } from "./submit-form";

export const metadata: Metadata = {
  title: "List your spot — G sa Marikina",
  description: "Submit your Marikina food business to the directory.",
};

export default function NewBusinessPage() {
  return (
    <main className="px-4 md:px-6 pt-8 pb-16 max-w-[640px] mx-auto">
      <h1 className="text-[26px] md:text-[32px] font-bold text-[var(--color-text-secondary)] tracking-[-0.03em]">
        List your spot
      </h1>
      <p className="mt-1 text-[13px] tracking-tight text-[var(--color-text-primary)]">
        Add your Marikina food business. Submissions are reviewed before going live.
      </p>
      <SubmitForm />
    </main>
  );
}
