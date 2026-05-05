"use client";

import { MAX_QUANTITY } from "@/lib/constants";

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export default function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = MAX_QUANTITY,
}: QuantitySelectorProps) {
  return (
    <div className="inline-flex items-center rounded-xl border border-brand-grey-200 bg-white">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className="flex h-10 w-10 items-center justify-center rounded-l-xl text-lg font-medium text-brand-grey-600 transition-colors hover:bg-brand-grey-50 disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span className="flex h-10 w-10 items-center justify-center border-x border-brand-grey-200 text-sm font-semibold text-brand-grey-800">
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className="flex h-10 w-10 items-center justify-center rounded-r-xl text-lg font-medium text-brand-grey-600 transition-colors hover:bg-brand-grey-50 disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
