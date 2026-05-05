"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { formatCurrency, getWhatsAppUrl } from "@/lib/utils";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import FreeShippingProgress from "@/components/ui/FreeShippingProgress";
import TrustBadges from "@/components/ui/TrustBadges";
import CartItem from "./CartItem";
import SuggestedAddOns from "./SuggestedAddOns";

export default function CartDrawer() {
  const { items, isOpen, closeCart, totalItems, subtotal, totalMrp, totalSavings } =
    useCart();
  const [showCheckout, setShowCheckout] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", address: "", pincode: "" });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setShowCheckout(false);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleWhatsAppOrder = () => {
    const orderLines = items
      .map((i) => `• ${i.product.name} x${i.quantity} — ${formatCurrency(i.product.salePrice * i.quantity)}`)
      .join("\n");
    const message = `Hi, I'd like to place an order:\n\n${orderLines}\n\nTotal: ${formatCurrency(subtotal)}\n\nPlease confirm availability and payment details.`;
    window.open(getWhatsAppUrl(WHATSAPP_NUMBER, message), "_blank");
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const orderLines = items
      .map((i) => `• ${i.product.name} x${i.quantity} — ${formatCurrency(i.product.salePrice * i.quantity)}`)
      .join("\n");
    const message = `New Order:\n\nName: ${form.name}\nPhone: ${form.phone}\nAddress: ${form.address}\nPincode: ${form.pincode}\n\n${orderLines}\n\nTotal: ${formatCurrency(subtotal)}`;
    window.open(getWhatsAppUrl(WHATSAPP_NUMBER, message), "_blank");
    setShowCheckout(false);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-white shadow-2xl animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-brand-grey-100 px-5 py-4">
          <h2 className="text-lg font-bold text-brand-navy">
            Your Cart ({totalItems})
          </h2>
          <button
            onClick={closeCart}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-brand-grey-500 transition-colors hover:bg-brand-grey-100"
            aria-label="Close cart"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-5">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <svg className="mb-4 h-16 w-16 text-brand-grey-200" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              <p className="text-base font-medium text-brand-grey-500">Your cart is empty</p>
              <p className="mt-1 text-sm text-brand-grey-400">Add products to get started</p>
              <button onClick={closeCart} className="btn-primary mt-6">
                Browse Products
              </button>
            </div>
          ) : (
            <>
              {/* Free shipping progress */}
              <div className="py-3">
                <FreeShippingProgress />
              </div>

              {/* Cart items */}
              <div className="divide-y divide-brand-grey-100">
                {items.map((item) => (
                  <CartItem key={item.product.id} item={item} />
                ))}
              </div>

              {/* Suggested add-ons */}
              <div className="py-3">
                <SuggestedAddOns />
              </div>

              {/* Checkout form */}
              {showCheckout && (
                <div className="border-t border-brand-grey-100 py-4">
                  <h4 className="mb-3 text-sm font-semibold text-brand-grey-700">Delivery Details</h4>
                  <form onSubmit={handlePlaceOrder} className="space-y-3">
                    <input
                      type="text"
                      placeholder="Full Name"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full rounded-lg border border-brand-grey-200 px-3 py-2.5 text-sm outline-none transition-colors focus:border-brand-navy focus:ring-1 focus:ring-brand-navy"
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full rounded-lg border border-brand-grey-200 px-3 py-2.5 text-sm outline-none transition-colors focus:border-brand-navy focus:ring-1 focus:ring-brand-navy"
                    />
                    <textarea
                      placeholder="Delivery Address"
                      required
                      rows={2}
                      value={form.address}
                      onChange={(e) => setForm({ ...form, address: e.target.value })}
                      className="w-full rounded-lg border border-brand-grey-200 px-3 py-2.5 text-sm outline-none transition-colors focus:border-brand-navy focus:ring-1 focus:ring-brand-navy"
                    />
                    <input
                      type="text"
                      placeholder="Pincode"
                      required
                      value={form.pincode}
                      onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                      className="w-full rounded-lg border border-brand-grey-200 px-3 py-2.5 text-sm outline-none transition-colors focus:border-brand-navy focus:ring-1 focus:ring-brand-navy"
                    />
                    <button type="submit" className="btn-primary w-full">
                      Confirm Order via WhatsApp
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowCheckout(false)}
                      className="w-full text-center text-sm text-brand-grey-500 hover:text-brand-grey-700"
                    >
                      Cancel
                    </button>
                  </form>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer - Cart Summary */}
        {items.length > 0 && !showCheckout && (
          <div className="border-t border-brand-grey-100 px-5 py-4">
            {/* Savings */}
            {totalSavings > 0 && (
              <div className="mb-3 flex items-center justify-between rounded-lg bg-brand-green-pale px-3 py-2">
                <span className="text-sm font-medium text-brand-green-dark">Total Savings</span>
                <span className="text-sm font-bold text-brand-green-dark">{formatCurrency(totalSavings)}</span>
              </div>
            )}

            {/* Totals */}
            <div className="mb-4 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-sm text-brand-grey-500">MRP Total</span>
                <span className="text-sm text-brand-grey-400 line-through">{formatCurrency(totalMrp)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-base font-semibold text-brand-grey-800">Subtotal</span>
                <span className="text-lg font-bold text-brand-grey-800">{formatCurrency(subtotal)}</span>
              </div>
            </div>

            {/* Trust */}
            <div className="mb-4">
              <TrustBadges compact />
            </div>

            {/* CTAs */}
            <div className="space-y-2">
              <button onClick={handleWhatsAppOrder} className="btn-whatsapp w-full">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Order via WhatsApp
              </button>
              <button
                onClick={() => setShowCheckout(true)}
                className="btn-primary w-full"
              >
                Place Order
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
