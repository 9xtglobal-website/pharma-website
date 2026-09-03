import { Metadata } from "next";
import Link from "next/link";
import { DELIVERY_DAYS, FREE_SHIPPING_THRESHOLD } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Shipping & Delivery",
  description: "Shipping and delivery information for 9X Pharma orders in India.",
};

export default function ShippingPage() {
  return (
    <div className="py-10 sm:py-14">
      <div className="container-main max-w-3xl">
        <nav className="mb-6 flex items-center gap-2 text-sm text-brand-grey-400">
          <Link href="/" className="transition-colors hover:text-brand-navy">Home</Link>
          <span>/</span>
          <span className="text-brand-grey-700">Shipping & Delivery</span>
        </nav>

        <h1 className="section-heading">Shipping & Delivery</h1>
        <div className="mt-6 space-y-6 text-sm leading-relaxed text-brand-grey-600 sm:text-base">
          <section>
            <h2 className="text-lg font-bold text-brand-navy">Delivery timeline</h2>
            <p className="mt-2">
              Orders are usually delivered within {DELIVERY_DAYS} after dispatch. Delivery timelines
              can vary by city, courier availability, weather, holidays, or service disruptions.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-brand-navy">Shipping charges</h2>
            <p className="mt-2">
              Shipping is free on prepaid and eligible COD orders above Rs. {FREE_SHIPPING_THRESHOLD}.
              Orders below this value may include a shipping or handling charge shown before checkout.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-brand-navy">Order support</h2>
            <p className="mt-2">
              For delivery questions, contact us on WhatsApp or email info@9xtg.com with your name,
              phone number, and order details.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
