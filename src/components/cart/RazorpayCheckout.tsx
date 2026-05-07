"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import {
  RAZORPAY_KEY_ID,
  RAZORPAY_BRAND_COLOR,
  RAZORPAY_CHECKOUT_SCRIPT,
  WHATSAPP_NUMBER,
} from "@/lib/constants";
import { formatCurrency, getWhatsAppUrl } from "@/lib/utils";
import type { DeliveryDetails } from "./DeliveryForm";

// Minimal Razorpay typing — enough for this integration.
type RazorpayPaymentResponse = {
  razorpay_payment_id: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
};
type RazorpayOptions = {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description?: string;
  image?: string;
  prefill?: { name?: string; email?: string; contact?: string };
  notes?: Record<string, string>;
  theme?: { color?: string };
  modal?: { ondismiss?: () => void };
  handler?: (response: RazorpayPaymentResponse) => void;
};
type RazorpayCtor = new (options: RazorpayOptions) => { open: () => void };
declare global {
  interface Window {
    Razorpay?: RazorpayCtor;
  }
}

interface RazorpayCheckoutProps {
  delivery: DeliveryDetails;
  orderId: string;
  onPaid: (paymentId: string) => void;
  onDismiss?: () => void;
}

export default function RazorpayCheckout({
  delivery,
  orderId,
  onPaid,
  onDismiss,
}: RazorpayCheckoutProps) {
  const { items, subtotal } = useCart();
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [scriptError, setScriptError] = useState(false);
  const [opening, setOpening] = useState(false);

  const isPlaceholder = RAZORPAY_KEY_ID === "rzp_test_PLACEHOLDER";

  // Load Razorpay's checkout.js once
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.Razorpay) {
      setScriptLoaded(true);
      return;
    }
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${RAZORPAY_CHECKOUT_SCRIPT}"]`
    );
    if (existing) {
      existing.addEventListener("load", () => setScriptLoaded(true));
      existing.addEventListener("error", () => setScriptError(true));
      return;
    }
    const s = document.createElement("script");
    s.src = RAZORPAY_CHECKOUT_SCRIPT;
    s.async = true;
    s.onload = () => setScriptLoaded(true);
    s.onerror = () => setScriptError(true);
    document.body.appendChild(s);
  }, []);

  const itemsSummary = items
    .map((i) => `${i.product.name} x${i.quantity}`)
    .join(", ");

  const openCheckout = () => {
    if (!window.Razorpay) {
      setScriptError(true);
      return;
    }
    setOpening(true);

    const rzp = new window.Razorpay({
      key: RAZORPAY_KEY_ID,
      amount: subtotal * 100, // Razorpay expects paise
      currency: "INR",
      name: "9X Pharma",
      description: `Order ${orderId} — ${itemsSummary}`.slice(0, 250),
      prefill: {
        name: delivery.name,
        email: delivery.email || undefined,
        contact: delivery.phone,
      },
      notes: {
        order_id: orderId,
        address: `${delivery.address}, ${delivery.city}, ${delivery.state} - ${delivery.pincode}`,
        items: itemsSummary.slice(0, 250),
      },
      theme: { color: RAZORPAY_BRAND_COLOR },
      modal: {
        ondismiss: () => {
          setOpening(false);
          onDismiss?.();
        },
      },
      handler: (response) => {
        setOpening(false);
        onPaid(response.razorpay_payment_id);
      },
    });

    rzp.open();
  };

  // Build a fallback WhatsApp message in case Razorpay fails to load
  const fallbackMessage = `Hi, Razorpay didn't load on my browser. I want to place order ${orderId}.\n\nTotal: ${formatCurrency(
    subtotal
  )}\n\nPlease share alternative payment options.`;
  const fallbackWhatsapp = getWhatsAppUrl(WHATSAPP_NUMBER, fallbackMessage);

  if (isPlaceholder) {
    return (
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
        <p className="font-semibold">Razorpay setup pending</p>
        <p className="mt-1 text-xs leading-relaxed">
          Razorpay isn&apos;t configured yet. Please use Direct UPI, COD, or
          WhatsApp checkout for now.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-brand-grey-100 bg-gradient-to-br from-brand-grey-50 to-white p-4">
        <div className="mb-2 flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-navy text-white">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-brand-grey-800">
              Pay securely with Razorpay
            </p>
            <p className="text-xs text-brand-grey-500">
              Cards · UPI · Netbanking · Wallets · EMI
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={openCheckout}
          disabled={!scriptLoaded || opening || scriptError}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-brand-navy px-5 py-3.5 text-base font-semibold text-white shadow-lg transition-all hover:bg-brand-navy-dark hover:shadow-xl active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {!scriptLoaded && !scriptError && (
            <>
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Loading…
            </>
          )}
          {scriptError && "Razorpay failed to load"}
          {scriptLoaded && !scriptError && !opening && (
            <>
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
                  d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                />
              </svg>
              Pay {formatCurrency(subtotal)}
            </>
          )}
          {scriptLoaded && opening && "Opening…"}
        </button>

        {scriptError && (
          <a
            href={fallbackWhatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp mt-2 w-full"
          >
            Order via WhatsApp instead
          </a>
        )}

        <p className="mt-3 text-center text-[11px] text-brand-grey-400">
          🔒 Secured by Razorpay · 256-bit SSL · PCI-DSS compliant
        </p>
      </div>
    </div>
  );
}
