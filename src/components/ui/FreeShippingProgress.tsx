"use client";

import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/lib/utils";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/constants";

export default function FreeShippingProgress() {
  const { subtotal, isFreeShipping, amountToFreeShipping } = useCart();

  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <div className="rounded-xl bg-brand-grey-50 p-3">
      {isFreeShipping ? (
        <div className="flex items-center gap-2 text-sm font-medium text-brand-green">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          You&apos;ve unlocked FREE shipping!
        </div>
      ) : (
        <div className="space-y-2">
          <p className="text-sm text-brand-grey-600">
            Add <span className="font-semibold text-brand-orange">{formatCurrency(amountToFreeShipping)}</span> more
            for <span className="font-semibold text-brand-green">FREE shipping</span>
          </p>
          <div className="h-2 w-full overflow-hidden rounded-full bg-brand-grey-200">
            <div
              className="h-full rounded-full bg-gradient-to-r from-brand-green to-brand-green-light transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
