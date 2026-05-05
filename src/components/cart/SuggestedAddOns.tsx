"use client";

import { useCart } from "@/context/CartContext";
import { products } from "@/data/products";
import { formatCurrency } from "@/lib/utils";

export default function SuggestedAddOns() {
  const { items, addToCart } = useCart();
  const cartIds = items.map((i) => i.product.id);
  const suggestions = products.filter((p) => !cartIds.includes(p.id));

  if (suggestions.length === 0) return null;

  return (
    <div className="border-t border-brand-grey-100 pt-4">
      <h4 className="mb-3 text-sm font-semibold text-brand-grey-700">Complete your routine</h4>
      <div className="space-y-2">
        {suggestions.map((product) => (
          <div
            key={product.id}
            className="flex items-center justify-between rounded-xl border border-brand-grey-100 p-3"
          >
            <div className="flex-1">
              <p className="text-sm font-medium text-brand-grey-800">{product.name}</p>
              <p className="text-xs text-brand-grey-500">{product.tagline}</p>
              <p className="mt-1 text-sm font-semibold text-brand-grey-800">
                {formatCurrency(product.salePrice)}
              </p>
            </div>
            <button
              onClick={() => addToCart(product, 1)}
              className="shrink-0 rounded-lg bg-brand-navy px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-brand-navy-dark"
            >
              + Add
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
