"use client";

import { FormEvent, useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { trackLead } from "@/components/Analytics";

type Status = "idle" | "submitting" | "submitted" | "error";

const FIELD_BASE =
  "mt-2 block w-full bg-bone border border-line text-navy placeholder:text-ink-mute px-4 py-3 text-[15px] focus:outline-none focus:border-navy focus:ring-1 focus:ring-navy transition-colors";

const LABEL_BASE = "block text-[11px] uppercase tracking-[0.18em] text-ink-soft font-medium";

const INQUIRY_LABELS: Record<string, string> = {
  operator: "Operator or founder seeking a permanent home",
  allocator: "Allocator or family office",
  counterparty: "Counterparty or co-investor",
  board: "Board, governance, or leadership inquiry",
  media: "Media inquiry",
  other: "Other",
};

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setStatus("submitting");
    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries()) as Record<string, string>;
    // Endpoint resolver keys on the human-readable inquiryType label, so map slug -> label.
    if (payload.inquiryType && INQUIRY_LABELS[payload.inquiryType]) {
      payload.inquiryType = INQUIRY_LABELS[payload.inquiryType];
    }
    try {
      const res = await fetch("https://rothenbury-contact-api.vercel.app/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ brand: "rothenbury", ...payload }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Something went wrong. Please try again.");
      }
      trackLead("contact_form");
      setStatus("submitted");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "submitted") {
    return (
      <div className="border border-line bg-cream/40 p-10 lg:p-12 text-center">
        <CheckCircle2 className="mx-auto w-10 h-10 text-bronze-700" strokeWidth={1.25} />
        <h3 className="mt-6 font-serif text-3xl text-navy">Received.</h3>
        <p className="mt-4 text-ink-soft leading-relaxed max-w-md mx-auto">
          Your request has been logged with the Office of the Group. A member of
          the leadership team will respond within two business days.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-line bg-bone p-7 lg:p-9 space-y-6"
      aria-label="Request a private introduction"
      noValidate
    >
      <div>
        <div className="text-[10px] uppercase tracking-[0.24em] text-bronze-700 font-mono">
          Private introduction
        </div>
        <p className="mt-2 text-[13px] text-ink-soft leading-relaxed">
          Specific portfolio detail, leadership identification, and capital
          commitments are discussed privately. Inquiries below are reviewed by
          the Office of the Group.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <label className="block">
          <span className={LABEL_BASE}>First name</span>
          <input
            type="text"
            name="firstName"
            required
            placeholder="Jane"
            className={FIELD_BASE}
          />
        </label>
        <label className="block">
          <span className={LABEL_BASE}>Last name</span>
          <input
            type="text"
            name="lastName"
            required
            placeholder="Smith"
            className={FIELD_BASE}
          />
        </label>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <label className="block">
          <span className={LABEL_BASE}>Email</span>
          <input
            type="email"
            name="email"
            required
            placeholder="jane.smith@firm.com"
            className={FIELD_BASE}
          />
        </label>
        <label className="block">
          <span className={LABEL_BASE}>Organization</span>
          <input
            type="text"
            name="organization"
            required
            placeholder="Firm or operating company"
            className={FIELD_BASE}
          />
        </label>
      </div>
      <label className="block">
        <span className={LABEL_BASE}>Role</span>
        <input
          type="text"
          name="role"
          placeholder="Founder, CIO, principal, counsel, etc."
          className={FIELD_BASE}
        />
      </label>
      <label className="block">
        <span className={LABEL_BASE}>Nature of the inquiry</span>
        <select
          name="inquiryType"
          required
          className={FIELD_BASE}
          defaultValue=""
        >
          <option value="" disabled>
            Select one
          </option>
          <option value="operator">Operator or founder seeking a permanent home</option>
          <option value="allocator">Allocator or family office</option>
          <option value="counterparty">Counterparty or co-investor</option>
          <option value="board">Board, governance, or leadership inquiry</option>
          <option value="media">Media inquiry</option>
          <option value="other">Other</option>
        </select>
      </label>
      <label className="block">
        <span className={LABEL_BASE}>Mutual connection (optional)</span>
        <input
          type="text"
          name="referral"
          placeholder="Name of a shared introduction, board member, or counterparty"
          className={FIELD_BASE}
        />
      </label>
      <label className="block">
        <span className={LABEL_BASE}>Reason for the introduction</span>
        <textarea
          name="message"
          rows={6}
          required
          placeholder="Please share enough context for a member of the leadership team to respond meaningfully."
          className={FIELD_BASE}
        />
      </label>
      <p className="text-[11px] text-ink-soft leading-relaxed">
        By submitting this request, you consent to Rothenbury Group contacting
        you in response, in accordance with our Privacy Policy. Communications
        are subject to standard institutional confidentiality.
      </p>
      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn-primary w-full sm:w-auto group"
      >
        {status === "submitting" ? "Sending..." : "Submit introduction request"}
        <Send className="w-4 h-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
      </button>
      {error && (
        <p role="alert" className="text-sm font-medium text-red-600">
          {error}
        </p>
      )}
    </form>
  );
}
