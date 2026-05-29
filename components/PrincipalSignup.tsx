"use client";

import { FormEvent, useState } from "react";

export default function PrincipalSignup() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    // eslint-disable-next-line no-console
    console.log("[Rothenbury principal-only signup]", Object.fromEntries(data));
    e.currentTarget.reset();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="border border-bronze-200/30 bg-walnut/30 px-5 py-4 max-w-md w-full">
        <div className="text-[11px] uppercase tracking-[0.22em] text-bronze-200">
          Received
        </div>
        <p className="mt-2 text-sm text-ivory/85 leading-relaxed">
          Your request has been logged with the Office of the Group.
        </p>
      </div>
    );
  }

  return (
    <form
      className="flex flex-col sm:flex-row gap-2 max-w-md w-full"
      onSubmit={handleSubmit}
    >
      <input
        type="email"
        name="email"
        required
        placeholder="name@firm.com"
        className="flex-1 bg-walnut/40 border border-bronze-200/30 text-ivory placeholder:text-ivory/40 px-4 py-3 text-[14px] focus:outline-none focus:border-bronze-200 focus:ring-1 focus:ring-bronze-200"
      />
      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 bg-bronze text-ivory px-6 py-3 text-[12px] tracking-[0.18em] uppercase font-medium hover:bg-bronze-600 transition-colors"
      >
        Request access
      </button>
    </form>
  );
}
