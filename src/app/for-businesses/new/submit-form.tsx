"use client";

import { useActionState } from "react";
import { CheckCircle } from "@phosphor-icons/react";
import { CATEGORY_LABELS, CategoryEnum } from "@/types/listing";
import { submitBusiness, type SubmitState } from "./actions";

const initialState: SubmitState = { ok: false };

const inputClass =
  "w-full rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2.5 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)] focus:border-[var(--color-primary)] focus:outline-none";
const labelClass =
  "flex flex-col gap-1.5 text-sm font-semibold text-[var(--color-text-primary)]";

export function SubmitForm() {
  const [state, formAction, pending] = useActionState(
    submitBusiness,
    initialState
  );

  if (state.ok) {
    return (
      <div className="mt-8 flex flex-col items-center gap-3 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] p-8 text-center">
        <span className="text-[var(--color-success)]">
          <CheckCircle size={44} weight="fill" />
        </span>
        <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold text-[var(--color-text-primary)]">
          Submitted for review
        </h2>
        <p className="max-w-sm text-sm text-[var(--color-text-secondary)]">
          Thanks. Your spot is in the queue. We check submissions before they go
          live to keep the directory trustworthy.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="mt-8 space-y-5">
      <label className={labelClass}>
        Business name
        <input name="name" required maxLength={120} className={inputClass} />
      </label>

      <label className={labelClass}>
        Category
        <select name="category" required className={inputClass}>
          {CategoryEnum.options.map((c) => (
            <option key={c} value={c}>
              {CATEGORY_LABELS[c].label}
            </option>
          ))}
        </select>
      </label>

      <label className={labelClass}>
        Barangay
        <input
          name="barangay"
          required
          placeholder="e.g. Sta. Elena"
          maxLength={80}
          className={inputClass}
        />
      </label>

      <label className={labelClass}>
        What do you sell?
        <textarea
          name="description"
          rows={4}
          maxLength={2000}
          placeholder="Tell people what you make and how to order."
          className={inputClass}
        />
      </label>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className={labelClass}>
          Contact number (optional)
          <input name="contactPhone" maxLength={40} className={inputClass} />
        </label>
        <label className={labelClass}>
          Facebook page/link (optional)
          <input
            name="contactFacebook"
            maxLength={200}
            className={inputClass}
          />
        </label>
      </div>

      {state.error && (
        <p className="text-sm text-[var(--color-error)]">{state.error}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center rounded-[var(--radius-sm)] bg-[var(--color-primary)] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-primary-hover)] disabled:opacity-60"
      >
        {pending ? "Submitting…" : "Submit for review"}
      </button>
    </form>
  );
}
