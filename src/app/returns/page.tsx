import { Metadata } from "next";
import Link from "next/link";
import { RETURN_POLICY_DAYS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Returns & Refunds",
  description: "Returns, replacements, and refund policy for 9X Pharma orders.",
};

export default function ReturnsPage() {
  return (
    <div className="py-10 sm:py-14">
      <div className="container-main max-w-3xl">
        <nav className="mb-6 flex items-center gap-2 text-sm text-brand-grey-400">
          <Link href="/" className="transition-colors hover:text-brand-navy">Home</Link>
          <span>/</span>
          <span className="text-brand-grey-700">Returns & Refunds</span>
        </nav>

        <h1 className="section-heading">Returns & Refunds</h1>
        <div className="mt-6 space-y-6 text-sm leading-relaxed text-brand-grey-600 sm:text-base">
          <section>
            <h2 className="text-lg font-bold text-brand-navy">Return window</h2>
            <p className="mt-2">
              Unopened products may be eligible for return within {RETURN_POLICY_DAYS} days of delivery.
              Opened, used, damaged-after-delivery, or tampered products cannot be accepted for return.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-brand-navy">Damaged or incorrect items</h2>
            <p className="mt-2">
              If you receive a damaged, missing, or incorrect item, contact us within 48 hours of
              delivery with photos of the product, outer package, invoice, and order details.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-brand-navy">Refund processing</h2>
            <p className="mt-2">
              Approved refunds are processed to the original payment method where possible. For COD
              orders, we may request bank or UPI details to process the refund.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
