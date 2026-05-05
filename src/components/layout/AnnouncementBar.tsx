"use client";

import { useState } from "react";
import CountdownTimer from "@/components/ui/CountdownTimer";

export default function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="relative bg-brand-navy text-white">
      <div className="container-main flex items-center justify-center gap-4 py-2 text-sm">
        <span className="hidden sm:inline">🌿</span>
        <span className="font-medium">Launch offer — Free shipping on orders above ₹999</span>
        <span className="hidden sm:inline">|</span>
        <span className="hidden sm:inline">
          <CountdownTimer compact label="Ends in" />
        </span>
        <button
          onClick={() => setDismissed(true)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 transition-colors hover:text-white"
          aria-label="Dismiss"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
