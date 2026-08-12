"use client";

import { useActionState } from "react";
import { CheckCircle } from "@phosphor-icons/react";
import { CATEGORY_LABELS, CategoryEnum } from "@/types/listing";
import { MARIKINA_BARANGAYS } from "@/data/barangays";
import { submitBusiness, type SubmitState } from "./actions";

const initialState: SubmitState = { ok: false };

const inputClass =
  "w-full border border-[var(--color-border)] bg-white px-3 py-2.5 text-[13px] tracking-tight text-[var(--color-text-secondary)] placeholder:text-[var(--color-text-primary)] focus:border-[var(--color-accent)] focus:outline-none transition-colors";
const labelClass =
  "flex flex-col gap-1.5 text-[12px] font-bold uppercase tracking-[0.04em] text-[var(--color-text-secondary)]";

export function SubmitForm() {
  const [state, formAction, pending] = useActionState(
    submitBusiness,
    initialState
  );

  if (state.ok) {
    return (
      <div className="mt-8 flex flex-col items-center gap-3 border border-[var(--color-border)] bg-[var(--color-surface-subtle)] p-8 text-center">
        <span className="text-[var(--color-success)]">
          <CheckCircle size={44} weight="fill" />
        </span>
        <h2 className="text-[16px] font-bold text-[var(--color-text-secondary)] tracking-[-0.02em]">
          Submitted for review
        </h2>
        <p className="max-w-sm text-[13px] tracking-tight text-[var(--color-text-primary)]">
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
        <input
          name="name"
          required
          maxLength={120}
          placeholder="e.g. Aling Nena's Karinderya"
          className={inputClass}
        />
      </label>

      <label className={labelClass}>
        Category
        <select name="category" required className={inputClass}>
          <option value="">Select a category…</option>
          {CategoryEnum.options.map((c) => (
            <option key={c} value={c}>
              {CATEGORY_LABELS[c].label}
            </option>
          ))}
        </select>
      </label>

      <label className={labelClass}>
        Barangay
        <select name="barangay" required className={inputClass}>
          <option value="">Select your barangay…</option>
          {MARIKINA_BARANGAYS.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </label>

      <label className={labelClass}>
        What do you sell?
        <textarea
          name="description"
          rows={4}
          maxLength={2000}
          placeholder="Tell people what you make, your specialties, and how to order."
          className={inputClass}
        />
      </label>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className={labelClass}>
          Contact number
          <input
            name="contactPhone"
            maxLength={40}
            placeholder="09xx xxx xxxx (optional)"
            className={inputClass}
          />
        </label>
        <label className={labelClass}>
          Facebook page link
          <input
            name="contactFacebook"
            maxLength={200}
            placeholder="https://facebook.com/… (optional)"
            className={inputClass}
          />
        </label>
      </div>

      {state.error && (
        <p className="text-[12px] tracking-tight text-[var(--color-error)]">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="bg-[var(--color-accent-red)] text-white text-[13px] font-bold tracking-tight px-6 py-3 hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {pending ? "Submitting…" : "Submit for review"}
      </button>
    </form>
  );
}
