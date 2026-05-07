"use client";

import { useEffect, useMemo, useState } from "react";
import { useCart } from "@/context/CartContext";
import { formatCurrency, getWhatsAppUrl } from "@/lib/utils";
import {
  WHATSAPP_NUMBER,
  ONLINE_PAYMENT_DISCOUNT,
  COD_HANDLING_FEE,
} from "@/lib/constants";
import { notifyOrder } from "@/lib/notifyOrder";
import FreeShippingProgress from "@/components/ui/FreeShippingProgress";
import TrustBadges from "@/components/ui/TrustBadges";
import CartItem from "./CartItem";
import SuggestedAddOns from "./SuggestedAddOns";
import RazorpayCheckout from "./RazorpayCheckout";
import DeliveryForm, {
  DeliveryDetails,
  emptyDeliveryDetails,
} from "./DeliveryForm";

type Step = "cart" | "delivery" | "payment" | "razorpay-success";

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
    // No email here — we only notify after a confirmed order
    // (Razorpay-paid or Cash on Delivery chosen).
    setStep("payment");
  };

  // Payment-mode adjusted totals
  const onlineTotal = Math.max(0, subtotal - ONLINE_PAYMENT_DISCOUNT);
  const codTotal = subtotal + COD_HANDLING_FEE;

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
    // Confirmed order → email + WhatsApp confirmation
    notifyOrder({
      stage: "cod",
      orderId,
      delivery,
      items,
      subtotalBase: subtotal,
      totalCharged: codTotal,
    });
    const message = `New Order ${orderId} (Cash on Delivery / Bank Transfer)\n\nPayment Mode: Cash on Delivery / Bank Transfer\nPayment Status: Pending — to be collected\n\n— Delivery Details —\n${deliveryBlock}\n\n— Order —\n${orderLines}\n\nCart Subtotal: ${formatCurrency(
      subtotal
    )}\nCOD Handling Fee: + ${formatCurrency(
      COD_HANDLING_FEE
    )}\nTotal Payable: ${formatCurrency(
      codTotal
    )}\n\nPlease confirm payment method and tracking.`;
    window.open(getWhatsAppUrl(WHATSAPP_NUMBER, message), "_blank");
    clearCart();
    closeCart();
  };

  const handleRazorpayPaid = (paymentId: string, verified: boolean) => {
    // Confirmed online payment → email + WhatsApp receipt
    notifyOrder({
      stage: "razorpay_paid",
      orderId,
      delivery,
      items,
      subtotalBase: subtotal,
      totalCharged: onlineTotal,
      paymentId,
      verified,
    });
    const verifyTag = verified
      ? "✅ Server-verified"
      : "⚠️ NOT server-verified — please confirm in Razorpay dashboard";
    const message = `Payment confirmed via Razorpay\n${verifyTag}\n\nOrder ID: ${orderId}\nPayment ID: ${paymentId}\nPayment Mode: Razorpay (Online)\nPayment Status: ${
      verified ? "Paid — Verified" : "Paid — NOT Verified"
    }\n\n— Delivery —\n${deliveryBlock}\n\n— Items —\n${orderLines}\n\nCart Subtotal: ${formatCurrency(
      subtotal
    )}\nOnline Discount: - ${formatCurrency(
      ONLINE_PAYMENT_DISCOUNT
    )}\nTotal Paid: ${formatCurrency(
      onlineTotal
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

              {/* "Save by paying online" callout */}
              <div className="rounded-xl border border-brand-green/30 bg-brand-green-pale px-4 py-3">
                <div className="flex items-center gap-2">
                  <svg
                    className="h-5 w-5 shrink-0 text-brand-green"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-sm font-semibold text-brand-green-dark">
                    Pay online & save {formatCurrency(ONLINE_PAYMENT_DISCOUNT)}
                  </p>
                </div>
                <p className="mt-1 text-xs text-brand-grey-600">
                  Choose UPI, cards or netbanking below for an instant discount.
                </p>
              </div>

              {/* Primary: Razorpay (cards / UPI / netbanking / wallets / EMI) */}
              <RazorpayCheckout
                delivery={delivery}
                orderId={orderId}
                amount={onlineTotal}
                onPaid={handleRazorpayPaid}
              />
              <div className="-mt-1 flex items-center justify-center gap-2 text-xs">
                <span className="text-brand-grey-400 line-through">
                  {formatCurrency(subtotal)}
                </span>
                <span className="font-semibold text-brand-green-dark">
                  {formatCurrency(onlineTotal)}
                </span>
                <span className="rounded-md bg-brand-green-pale px-1.5 py-0.5 font-medium text-brand-green-dark">
                  Save {formatCurrency(ONLINE_PAYMENT_DISCOUNT)}
                </span>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-3">
                <span className="h-px flex-1 bg-brand-grey-200" />
                <span className="text-[11px] uppercase tracking-wider text-brand-grey-400">
                  or
                </span>
                <span className="h-px flex-1 bg-brand-grey-200" />
              </div>

              <button onClick={handleCodOrder} className="btn-primary w-full">
                Cash on Delivery — {formatCurrency(codTotal)}
              </button>
              <p className="-mt-1 text-center text-[11px] text-brand-grey-500">
                Includes {formatCurrency(COD_HANDLING_FEE)} handling fee
              </p>

              <p className="text-center text-[11px] text-brand-grey-400">
                Need help? Tap the WhatsApp button at the bottom-right of the page.
              </p>

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
