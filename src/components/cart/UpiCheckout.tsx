"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import {
  UPI_VPA,
  UPI_MERCHANT_NAME,
  WHATSAPP_NUMBER,
} from "@/lib/constants";
import { formatCurrency, getWhatsAppUrl } from "@/lib/utils";

/**
 * Builds a UPI deep-link URI per NPCI spec.
 * Opens GPay / PhonePe / Paytm / CRED / BHIM on mobile.
 */
function buildUpiUri({
  vpa,
  name,
  amount,
  note,
}: {
  vpa: string;
  name: string;
  amount: number;
  note: string;
}): string {
  const params = new URLSearchParams({
    pa: vpa,
    pn: name,
    am: amount.toFixed(2),
    cu: "INR",
    tn: note.slice(0, 50), // UPI note max ~50 chars
  });
  return `upi://pay?${params.toString()}`;
}

function isMobileDevice(): boolean {
  if (typeof window === "undefined") return false;
  return /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
}

interface UpiCheckoutProps {
  onClose?: () => void;
}

export default function UpiCheckout({ onClose }: UpiCheckoutProps) {
  const { items, subtotal, totalItems } = useCart();
  const [isMobile, setIsMobile] = useState(false);
  const [paymentTriggered, setPaymentTriggered] = useState(false);

  useEffect(() => {
    setIsMobile(isMobileDevice());
  }, []);

  // Build a short order ID and note based on cart contents
  const orderId = `9X-${Date.now().toString().slice(-6)}`;
  const note = `${orderId} ${totalItems}item${totalItems > 1 ? "s" : ""}`;

  const upiUri = buildUpiUri({
    vpa: UPI_VPA,
    name: UPI_MERCHANT_NAME,
    amount: subtotal,
    note,
  });

  // Build the WhatsApp confirmation message
  const orderLines = items
    .map(
      (i) =>
        `• ${i.product.name} x${i.quantity} — ${formatCurrency(
          i.product.salePrice * i.quantity
        )}`
    )
    .join("\n");

  const confirmMessage = `Hi, I've completed UPI payment for order ${orderId}.\n\n${orderLines}\n\nTotal: ${formatCurrency(
    subtotal
  )}\n\nPlease confirm receipt and share delivery details.`;

  const whatsappConfirmUrl = getWhatsAppUrl(WHATSAPP_NUMBER, confirmMessage);

  const handlePayClick = () => {
    setPaymentTriggered(true);
  };

  // QR code URL — uses qrserver.com for desktop users to scan
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=10&data=${encodeURIComponent(
    upiUri
  )}`;

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-brand-grey-100 bg-white p-4">
        <div className="mb-3 flex items-center justify-between">
          <h4 className="text-sm font-semibold text-brand-grey-800">
            Pay {formatCurrency(subtotal)} via UPI
          </h4>
          <span className="text-xs text-brand-grey-400">Order {orderId}</span>
        </div>

        {/* Mobile: deep-link button */}
        {isMobile ? (
          <a
            href={upiUri}
            onClick={handlePayClick}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#5f259f] via-[#0f9d58] to-[#00aaff] px-5 py-3.5 text-base font-semibold text-white shadow-lg transition-all hover:shadow-xl active:scale-[0.98]"
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
                d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
              />
            </svg>
            Pay via GPay / PhonePe / Paytm
          </a>
        ) : (
          /* Desktop: QR code */
          <div className="flex flex-col items-center gap-3">
            <div className="rounded-xl bg-white p-2 shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={qrUrl}
                alt={`Scan to pay ${formatCurrency(subtotal)} via UPI`}
                width={240}
                height={240}
                className="h-60 w-60"
              />
            </div>
            <p className="text-center text-xs text-brand-grey-500">
              Scan with any UPI app — GPay, PhonePe, Paytm, CRED, BHIM
            </p>
          </div>
        )}

        {/* Payment details (visible always) */}
        <div className="mt-4 space-y-1 rounded-lg bg-brand-grey-50 px-3 py-2 text-xs">
          <div className="flex justify-between">
            <span className="text-brand-grey-500">Pay to</span>
            <span className="font-medium text-brand-grey-700">
              {UPI_MERCHANT_NAME}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-brand-grey-500">UPI ID</span>
            <span className="font-mono font-medium text-brand-grey-700">
              {UPI_VPA}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-brand-grey-500">Amount</span>
            <span className="font-semibold text-brand-grey-800">
              {formatCurrency(subtotal)}
            </span>
          </div>
        </div>
      </div>

      {/* After payment, customer confirms via WhatsApp so we know to ship */}
      <div className="rounded-xl border border-brand-grey-100 p-4">
        <p className="text-sm font-medium text-brand-grey-700">
          {paymentTriggered
            ? "Already paid? Confirm your order so we can ship it."
            : "After paying, confirm your order via WhatsApp:"}
        </p>
        <a
          href={whatsappConfirmUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-whatsapp mt-3 w-full"
          onClick={onClose}
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Send order details on WhatsApp
        </a>
        <p className="mt-2 text-center text-[11px] text-brand-grey-400">
          We&apos;ll confirm payment receipt and share tracking details.
        </p>
      </div>
    </div>
  );
}
