import type { CartItem } from "@/types";
import type { DeliveryDetails } from "@/components/cart/DeliveryForm";
import { FORMSUBMIT_ENDPOINT } from "./constants";
import { formatCurrency } from "./utils";

/**
 * Order stages — only fired for confirmed orders:
 *   - "razorpay_paid"   : Customer completed online payment via Razorpay
 *   - "cod"             : Customer chose Cash on Delivery / Bank Transfer
 */
export type OrderStage = "razorpay_paid" | "cod";

interface NotifyArgs {
  stage: OrderStage;
  orderId: string;
  delivery: DeliveryDetails;
  items: CartItem[];
  /** Cart subtotal before any payment-mode adjustment */
  subtotalBase: number;
  /** Final amount the customer is paying (after online discount or +COD fee) */
  totalCharged: number;
  /** Razorpay payment ID (only present for stage = "razorpay_paid") */
  paymentId?: string;
  /** True only when server HMAC-verified the Razorpay signature */
  verified?: boolean;
}

interface OrderMeta {
  subject: string;
  paymentMode: string;
  paymentStatus: string;
}

function buildMeta(args: NotifyArgs): OrderMeta {
  switch (args.stage) {
    case "razorpay_paid":
      return {
        subject: args.verified
          ? "✅ PAID (verified) — New order — 9X Pharma"
          : "⚠️ PAID (NOT verified) — New order — 9X Pharma",
        paymentMode: "Razorpay (Online)",
        paymentStatus: args.verified
          ? "Paid ✅ — Server-verified signature"
          : "Paid ⚠️ — Signature NOT verified — please confirm in Razorpay dashboard before shipping",
      };
    case "cod":
      return {
        subject: "📦 New COD / Bank Transfer order — 9X Pharma",
        paymentMode: "Cash on Delivery / Bank Transfer",
        paymentStatus: "Pending — collect on delivery or confirm bank transfer",
      };
  }
}

/**
 * Sends order details to SALES_EMAIL via FormSubmit.co (no backend needed).
 * Fails silently — never block the order completion because of email failure.
 */
export async function notifyOrder(args: NotifyArgs): Promise<void> {
  const {
    orderId,
    delivery,
    items,
    subtotalBase,
    totalCharged,
    paymentId,
  } = args;
  const meta = buildMeta(args);

  const itemsText = items
    .map(
      (i) =>
        `${i.product.name} × ${i.quantity} = ${formatCurrency(
          i.product.salePrice * i.quantity
        )}`
    )
    .join(" | ");

  const adjustment = totalCharged - subtotalBase;
  const adjustmentLabel =
    adjustment === 0
      ? "(no adjustment)"
      : adjustment > 0
        ? `+ ${formatCurrency(adjustment)} (COD handling fee)`
        : `- ${formatCurrency(Math.abs(adjustment))} (online payment discount)`;

  const payload: Record<string, string> = {
    _subject: meta.subject,
    _captcha: "false",
    _template: "table",
    "Order ID": orderId,
    "Payment Mode": meta.paymentMode,
    "Payment Status": meta.paymentStatus,
    "Customer Name": delivery.name,
    "Phone": delivery.phone,
    "Email": delivery.email || "(not provided)",
    "Address": delivery.address,
    "City": delivery.city,
    "State": delivery.state,
    "Pincode": delivery.pincode,
    "Notes": delivery.notes || "(none)",
    "Items": itemsText,
    "Cart Subtotal": formatCurrency(subtotalBase),
    "Adjustment": adjustmentLabel,
    "Total Charged": formatCurrency(totalCharged),
    "Submitted at": new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
    }),
  };

  if (paymentId) {
    payload["Razorpay Payment ID"] = paymentId;
  }

  try {
    await fetch(FORMSUBMIT_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn("notifyOrder failed", err);
  }
}
