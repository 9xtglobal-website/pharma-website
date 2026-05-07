"use client";

import { useEffect, useMemo, useState } from "react";
import { useCart } from "@/context/CartContext";
import { formatCurrency, getWhatsAppUrl } from "@/lib/utils";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import { notifyOrder } from "@/lib/notifyOrder";
import FreeShippingProgress from "@/components/ui/FreeShippingProgress";
import TrustBadges from "@/components/ui/TrustBadges";
import CartItem from "./CartItem";
import SuggestedAddOns from "./SuggestedAddOns";
import UpiCheckout from "./UpiCheckout";
import RazorpayCheckout from "./RazorpayCheckout";
import DeliveryForm, {
  DeliveryDetails,
  emptyDeliveryDetails,
} from "./DeliveryForm";

type Step = "cart" | "delivery" | "payment" | "upi" | "razorpay-success";

const STORAGE_KEY = "9xpharma-delivery";

export default function CartDrawer() {
  const { items, isOpen, closeCart, totalItems, subtotal, totalMrp, totalSavings, clearCart } =
    useCart();
  const [step, setStep] = useState<Step>("cart");
  const [delivery, setDelivery] = useState<DeliveryDetails>(emptyDeliveryDetails);

  // Stable order ID for the duration of one checkout session
  const orderId = useMemo(
    () => `9X-${Date.now().toString().slice(-6)}`,
    // Reset only when starting a new checkout (going from cart -> delivery)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [step === "delivery"]
  );

  // Hydrate previously-saved delivery details (so customer doesn't retype on return)
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setDelivery({ ...emptyDeliveryDetails, ...JSON.parse(stored) });
    } catch {
      /* ignore */
    }
  }, []);

  // Persist delivery details on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(delivery));
    } catch {
      /* ignore */
    }
  }, [delivery]);

  // Lock body scroll while drawer is open + reset step when drawer closes
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setStep("cart");
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Handlers ----------------------------------------------------------------

  const handleStartCheckout = () => setStep("delivery");

  const handleDeliverySubmit = () => {
    // Fire-and-forget email to sales@9xtg.com so the team knows a new order has started.
    notifyOrder({
      stage: "started",
      orderId,
      delivery,
      items,
      subtotal,
    });
    setStep("payment");
  };

  const orderLines = items
    .map(
      (i) =>
        `• ${i.product.name} x${i.quantity} — ${formatCurrency(
          i.product.salePrice * i.quantity
        )}`
    )
    .join("\n");

  const deliveryBlock = `Name: ${delivery.name}\nPhone: ${delivery.phone}${
    delivery.email ? `\nEmail: ${delivery.email}` : ""
  }\nAddress: ${delivery.address}, ${delivery.city}, ${delivery.state} - ${
    delivery.pincode
  }${delivery.notes ? `\nNotes: ${delivery.notes}` : ""}`;

  const handleCodOrder = () => {
    notifyOrder({ stage: "cod", orderId, delivery, items, subtotal });
    const message = `New Order ${orderId} (Cash on Delivery / Bank Transfer):\n\n— Delivery Details —\n${deliveryBlock}\n\n— Order —\n${orderLines}\n\nTotal: ${formatCurrency(
      subtotal
    )}\n\nPlease confirm payment method and tracking.`;
    window.open(getWhatsAppUrl(WHATSAPP_NUMBER, message), "_blank");
    clearCart();
    closeCart();
  };

  const handleWhatsAppOrder = () => {
    notifyOrder({ stage: "whatsapp", orderId, delivery, items, subtotal });
    const message = `Hi, I'd like to place order ${orderId}:\n\n— Delivery Details —\n${deliveryBlock}\n\n— Order —\n${orderLines}\n\nTotal: ${formatCurrency(
      subtotal
    )}\n\nPlease confirm.`;
    window.open(getWhatsAppUrl(WHATSAPP_NUMBER, message), "_blank");
    clearCart();
    closeCart();
  };

  const handleUpiPaid = () => {
    notifyOrder({ stage: "paid_upi", orderId, delivery, items, subtotal });
  };

  const handleRazorpayPaid = (paymentId: string) => {
    notifyOrder({ stage: "paid_upi", orderId, delivery, items, subtotal });
    const message = `Payment confirmed via Razorpay ✅\n\nOrder ID: ${orderId}\nPayment ID: ${paymentId}\n\n— Delivery —\n${deliveryBlock}\n\n— Items —\n${orderLines}\n\nTotal: ${formatCurrency(
      subtotal
    )}\n\nPlease share tracking once shipped.`;
    window.open(getWhatsAppUrl(WHATSAPP_NUMBER, message), "_blank");
    clearCart();
    setStep("razorpay-success");
  };

  // Render ------------------------------------------------------------------

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-md flex-col bg-white shadow-2xl animate-slide-in-right">
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-brand-grey-100 px-5 py-4">
          <h2 className="text-lg font-bold text-brand-navy">
            {step === "cart" && `Your Cart (${totalItems})`}
            {step === "delivery" && "Delivery Details"}
            {step === "payment" && "Choose Payment"}
            {step === "upi" && "UPI Payment"}
          </h2>
          <button
            onClick={closeCart}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-brand-grey-500 transition-colors hover:bg-brand-grey-100"
            aria-label="Close cart"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Step indicator (visible during checkout) */}
        {step !== "cart" && (
          <div className="shrink-0 border-b border-brand-grey-100 bg-brand-grey-50 px-5 py-2">
            <div className="flex items-center justify-between text-xs text-brand-grey-500">
              <span className="font-medium text-brand-grey-700">{orderId}</span>
              <span>
                Total: <strong className="text-brand-grey-800">{formatCurrency(subtotal)}</strong>
              </span>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-5 pb-[max(1rem,env(safe-area-inset-bottom))]">
          {/* Empty cart */}
          {items.length === 0 && step === "cart" && (
            <div className="flex flex-col items-center justify-center py-16">
              <svg
                className="mb-4 h-16 w-16 text-brand-grey-200"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
              <p className="text-base font-medium text-brand-grey-500">Your cart is empty</p>
              <p className="mt-1 text-sm text-brand-grey-400">
                Add products to get started
              </p>
              <button onClick={closeCart} className="btn-primary mt-6">
                Browse Products
              </button>
            </div>
          )}

          {/* Cart step */}
          {step === "cart" && items.length > 0 && (
            <>
              <div className="py-3">
                <FreeShippingProgress />
              </div>

              <div className="divide-y divide-brand-grey-100">
                {items.map((item) => (
                  <CartItem key={item.product.id} item={item} />
                ))}
              </div>

              <div className="py-3">
                <SuggestedAddOns />
              </div>
            </>
          )}

          {/* Delivery step */}
          {step === "delivery" && (
            <div className="py-4">
              <DeliveryForm
                value={delivery}
                onChange={setDelivery}
                onSubmit={handleDeliverySubmit}
                onBack={() => setStep("cart")}
              />
            </div>
          )}

          {/* Payment step */}
          {step === "payment" && (
            <div className="space-y-4 py-4">
              <div className="flex items-center gap-2 text-xs text-brand-grey-500">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-navy text-[10px] font-bold text-white">
                  3
                </span>
                Step 3 of 3 — Choose how you&apos;d like to pay
              </div>

              {/* Delivery summary */}
              <div className="rounded-xl border border-brand-grey-100 bg-brand-grey-50 p-3 text-xs text-brand-grey-600">
                <div className="mb-1 flex items-center justify-between">
                  <span className="font-semibold text-brand-grey-700">Shipping to</span>
                  <button
                    type="button"
                    onClick={() => setStep("delivery")}
                    className="text-brand-navy hover:underline"
                  >
                    Edit
                  </button>
                </div>
                <p className="font-medium text-brand-grey-800">{delivery.name}</p>
                <p>{delivery.phone}</p>
                <p>
                  {delivery.address}, {delivery.city}, {delivery.state} -{" "}
                  {delivery.pincode}
                </p>
              </div>

              {/* Primary: Razorpay (cards / UPI / netbanking / wallets / EMI) */}
              <RazorpayCheckout
                delivery={delivery}
                orderId={orderId}
                onPaid={handleRazorpayPaid}
              />

              {/* Divider */}
              <div className="flex items-center gap-3">
                <span className="h-px flex-1 bg-brand-grey-200" />
                <span className="text-[11px] uppercase tracking-wider text-brand-grey-400">
                  or other options
                </span>
                <span className="h-px flex-1 bg-brand-grey-200" />
              </div>

              {/* Direct UPI (no Razorpay fee) */}
              <button
                onClick={() => setStep("upi")}
                className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-brand-grey-200 bg-white px-5 py-3 text-sm font-semibold text-brand-grey-700 transition-colors hover:border-brand-navy hover:bg-brand-grey-50 active:scale-[0.98]"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    d="M2.25 6.75A2.25 2.25 0 014.5 4.5h15a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75zm2.25-.75a.75.75 0 00-.75.75v1.5h16.5v-1.5a.75.75 0 00-.75-.75h-15zM3.75 9.75v7.5c0 .414.336.75.75.75h15a.75.75 0 00.75-.75v-7.5h-16.5z"
                    clipRule="evenodd"
                  />
                </svg>
                Direct UPI ({formatCurrency(subtotal)})
              </button>

              <button onClick={handleCodOrder} className="btn-primary w-full">
                Cash on Delivery / Bank Transfer
              </button>

              <button onClick={handleWhatsAppOrder} className="btn-whatsapp w-full">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Confirm via WhatsApp
              </button>

              <button
                type="button"
                onClick={() => setStep("delivery")}
                className="w-full pt-1 text-center text-sm text-brand-grey-500 hover:text-brand-grey-700"
              >
                ← Back
              </button>
            </div>
          )}

          {/* Razorpay success */}
          {step === "razorpay-success" && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-green-pale">
                <svg
                  className="h-8 w-8 text-brand-green"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-brand-navy">Payment Successful</h3>
              <p className="mt-1 text-sm text-brand-grey-500">
                Thank you for your order!
              </p>
              <p className="mt-3 text-xs text-brand-grey-400">
                Order ID: <span className="font-mono">{orderId}</span>
              </p>
              <p className="mt-3 max-w-xs text-xs text-brand-grey-500">
                You&apos;ll receive a WhatsApp confirmation shortly.
                We&apos;ll ship within 24 hours.
              </p>
              <button onClick={closeCart} className="btn-primary mt-6">
                Continue Shopping
              </button>
            </div>
          )}

          {/* UPI payment step */}
          {step === "upi" && (
            <div className="py-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs text-brand-grey-500">
                  Step 3 of 3 — UPI payment
                </span>
                <button
                  type="button"
                  onClick={() => setStep("payment")}
                  className="text-xs text-brand-grey-500 hover:text-brand-grey-700"
                >
                  ← Other methods
                </button>
              </div>
              <UpiCheckout
                delivery={delivery}
                onClose={closeCart}
                onPaid={handleUpiPaid}
              />
            </div>
          )}
        </div>

        {/* Footer — only on cart step */}
        {items.length > 0 && step === "cart" && (
          <div className="shrink-0 border-t border-brand-grey-100 px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
            {totalSavings > 0 && (
              <div className="mb-3 flex items-center justify-between rounded-lg bg-brand-green-pale px-3 py-2">
                <span className="text-sm font-medium text-brand-green-dark">
                  Total Savings
                </span>
                <span className="text-sm font-bold text-brand-green-dark">
                  {formatCurrency(totalSavings)}
                </span>
              </div>
            )}

            <div className="mb-4 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-sm text-brand-grey-500">MRP Total</span>
                <span className="text-sm text-brand-grey-400 line-through">
                  {formatCurrency(totalMrp)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-base font-semibold text-brand-grey-800">
                  Subtotal
                </span>
                <span className="text-lg font-bold text-brand-grey-800">
                  {formatCurrency(subtotal)}
                </span>
              </div>
            </div>

            <div className="mb-4">
              <TrustBadges compact />
            </div>

            <button
              onClick={handleStartCheckout}
              className="btn-primary w-full py-4 text-base"
            >
              Checkout — {formatCurrency(subtotal)}
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </>
  );
}
