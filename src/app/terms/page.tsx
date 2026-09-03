import { Metadata } from "next";
import Link from "next/link";
import { SUPPLEMENT_DISCLAIMER } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms and conditions for using the 9X Pharma website.",
};

export default function TermsPage() {
  return (
    <div className="py-10 sm:py-14">
      <div className="container-main max-w-3xl">
        <nav className="mb-6 flex items-center gap-2 text-sm text-brand-grey-400">
          <Link href="/" className="transition-colors hover:text-brand-navy">Home</Link>
          <span>/</span>
          <span className="text-brand-grey-700">Terms & Conditions</span>
        </nav>

        <h1 className="section-heading">Terms & Conditions</h1>
        <div className="mt-6 space-y-6 text-sm leading-relaxed text-brand-grey-600 sm:text-base">
          <section>
            <h2 className="text-lg font-bold text-brand-navy">Website use</h2>
            <p className="mt-2">
              This website is operated for information, product discovery, and order placement for
              9X Pharma products. By using the website, you agree to provide accurate order and
              contact details.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-brand-navy">Product information</h2>
            <p className="mt-2">
              Product information is based on available labels and brand material. Always read the
              product packaging before use and follow the directions printed on the label.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-brand-navy">Health disclaimer</h2>
            <p className="mt-2">
              {SUPPLEMENT_DISCLAIMER} Information on this website is not a substitute for medical
              advice. Consult a healthcare professional before using any supplement or topical
              product if you have medical concerns.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-brand-navy">Orders</h2>
            <p className="mt-2">
              Prices, offers, product availability, delivery estimates, and payment options may
              change. Final order details are confirmed during checkout or customer support follow-up.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
