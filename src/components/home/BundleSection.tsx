"use client";

import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/lib/utils";

// Only include products that have a price set (Erexio is on enquiry-only)
const bundleProducts = products.filter((p) => p.salePrice > 0);

export default function BundleSection() {
  const { addToCart } = useCart();

  const totalMrp = bundleProducts.reduce((sum, p) => sum + p.mrp, 0);
  const totalSale = bundleProducts.reduce((sum, p) => sum + p.salePrice, 0);
  const savings = totalMrp - totalSale;

  const handleAddBundle = () => {
    bundleProducts.forEach((product) => {
      addToCart(product, 1);
    });
  };

  return (
    <section className="py-16 sm:py-20">
      <div className="container-main">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-brand-navy to-brand-navy-dark">
          <div className="grid lg:grid-cols-2">
            {/* Left: Content */}
            <div className="p-8 sm:p-10 lg:p-12">
              <span className="inline-flex items-center gap-1 rounded-full bg-brand-orange/20 px-3 py-1 text-sm font-medium text-brand-orange-light">
                Bundle & Save
              </span>
              <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
                Complete Wellness Bundle
              </h2>
              <p className="mt-3 text-base leading-relaxed text-white/60">
                Get our daily wellness range together and support your overall wellness routine —
                from daily vitality to restful nights.
              </p>

              {/* Products list */}
              <div className="mt-6 space-y-3">
                {bundleProducts.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3"
                  >
                    <div>
                      <p className="text-sm font-semibold text-white">{p.name}</p>
                      <p className="text-xs text-white/50">{p.tagline}</p>
                    </div>
                    <p className="text-sm font-semibold text-white">
                      {formatCurrency(p.salePrice)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Pricing */}
              <div className="mt-6 rounded-xl bg-white/10 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/60">MRP Total</span>
                  <span className="text-sm text-white/40 line-through">{formatCurrency(totalMrp)}</span>
                </div>
                <div className="mt-1 flex items-center justify-between">
                  <span className="text-lg font-bold text-white">Bundle Price</span>
                  <span className="text-2xl font-bold text-white">{formatCurrency(totalSale)}</span>
                </div>
                <div className="mt-2 flex items-center justify-between rounded-lg bg-brand-green/20 px-3 py-1.5">
                  <span className="text-sm font-medium text-brand-green-light">You Save</span>
                  <span className="text-sm font-bold text-brand-green-light">{formatCurrency(savings)}</span>
                </div>
              </div>

              {/* CTA */}
              <button
                onClick={handleAddBundle}
                className="btn-primary mt-6 w-full py-4 text-lg"
              >
                Add Bundle to Cart
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
            </div>

            {/* Right: Visual */}
            <div className="hidden items-center justify-center bg-white/5 p-12 lg:flex">
              <div className="space-y-6 text-center">
                <div className="text-6xl font-bold text-white/10">9X</div>
                <div className="space-y-2">
                  {bundleProducts.map((p) => (
                    <div key={p.id} className="rounded-xl bg-white/10 px-6 py-4">
                      <p className="text-lg font-bold text-white">{p.name}</p>
                      <p className="text-sm text-white/50">{p.categoryLabel}</p>
                    </div>
                  ))}
                </div>
                <p className="text-sm font-medium text-brand-green-light">
                  Complete daily wellness support
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
