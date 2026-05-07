import type { CartItem } from "@/types";
import type { DeliveryDetails } from "@/components/cart/DeliveryForm";
import { FORMSUBMIT_ENDPOINT } from "./constants";
import { formatCurrency } from "./utils";

export type OrderStage = "started" | "paid_upi" | "cod" | "whatsapp";

interface NotifyArgs {
  stage: OrderStage;
  orderId: string;
  delivery: DeliveryDetails;
  items: CartItem[];
  subtotal: number;
}

const STAGE_SUBJECT: Record<OrderStage, string> = {
  started: "🛒 New order started — 9X Pharma",
  paid_upi: "✅ UPI Paid — Order ready to ship — 9X Pharma",
  cod: "📦 New COD / Bank Transfer order — 9X Pharma",
  whatsapp: "💬 WhatsApp order initiated — 9X Pharma",
};

/**
 * Sends order details to SALES_EMAIL via FormSubmit.co (no backend needed).
 * Fails silently — we don't want a dead email service to block the user from
 * completing their order.
 */
export async function notifyOrder({
  stage,
  orderId,
  delivery,
  items,
  subtotal,
}: NotifyArgs): Promise<void> {
  const itemsText = items
    .map(
      (i) =>
        `${i.product.name} × ${i.quantity} = ${formatCurrency(
          i.product.salePrice * i.quantity
        )}`
    )
    .join(" | ");

  const payload = {
    _subject: STAGE_SUBJECT[stage],
    _captcha: "false",
    _template: "table",
    "Order ID": orderId,
    "Stage": stage,
    "Customer Name": delivery.name,
    "Phone": delivery.phone,
    "Email": delivery.email || "(not provided)",
    "Address": delivery.address,
    "City": delivery.city,
    "State": delivery.state,
    "Pincode": delivery.pincode,
    "Notes": delivery.notes || "(none)",
    "Items": itemsText,
    "Total": formatCurrency(subtotal),
    "Submitted at": new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
    }),
  };

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
    // Swallow errors — never block checkout because of email failure.
    // eslint-disable-next-line no-console
    console.warn("notifyOrder failed", err);
  }
}
