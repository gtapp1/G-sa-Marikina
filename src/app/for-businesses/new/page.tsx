import { Metadata } from "next";
import { SubmitForm } from "./submit-form";

export const metadata: Metadata = {
  title: "List your spot — G sa Marikina",
  description: "Submit your Marikina food business to the directory.",
};

export default function NewBusinessPage() {
  return (
    <main className="min-h-screen px-6 pt-8 pb-16 max-w-[680px] mx-auto">
      <h1 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-extrabold text-[var(--color-text-primary)]">
        List your spot
      </h1>
      <p className="mt-2 text-[var(--color-text-secondary)]">
        Add your Marikina food business. Submissions are reviewed before they go
        live.
      </p>
      <SubmitForm />
    </main>
  );
}
