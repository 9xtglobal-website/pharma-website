"use client";

import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/lib/utils";

export default function StickyMobileCTA() {
  const { totalItems, subtotal, toggleCart, isOpen } = useCart();

  // Hide when cart is empty OR when the cart drawer is already open
  // (otherwise it sits on top of the drawer's checkout button on mobile)
  if (totalItems === 0 || isOpen) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-brand-grey-200 bg-white p-3 shadow-[0_-4px_12px_rgba(0,0,0,0.1)] md:hidden">
      <button
        onClick={toggleCart}
        className="flex w-full items-center justify-between rounded-xl bg-brand-orange px-5 py-3 text-white shadow-lg"
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[10px] font-bold text-brand-orange">
              {totalItems}
            </span>
          </div>
          <span className="text-sm font-medium">{totalItems} {totalItems === 1 ? "item" : "items"}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-base font-bold">{formatCurrency(subtotal)}</span>
          <span className="text-sm">View Cart →</span>
        </div>
      </button>
    </div>
  );
}
