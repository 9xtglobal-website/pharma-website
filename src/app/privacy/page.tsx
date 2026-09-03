import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for 9X Pharma.",
};

export default function PrivacyPage() {
  return (
    <div className="py-10 sm:py-14">
      <div className="container-main max-w-3xl">
        <nav className="mb-6 flex items-center gap-2 text-sm text-brand-grey-400">
          <Link href="/" className="transition-colors hover:text-brand-navy">Home</Link>
          <span>/</span>
          <span className="text-brand-grey-700">Privacy Policy</span>
        </nav>

        <h1 className="section-heading">Privacy Policy</h1>
        <div className="mt-6 space-y-6 text-sm leading-relaxed text-brand-grey-600 sm:text-base">
          <section>
            <h2 className="text-lg font-bold text-brand-navy">Information we collect</h2>
            <p className="mt-2">
              When you place an order or contact us, we may collect your name, phone number, email,
              shipping address, product selection, payment status, and customer support messages.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-brand-navy">How we use it</h2>
            <p className="mt-2">
              We use this information to confirm orders, arrange delivery, provide customer support,
              process payments, handle returns, and improve our service.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-brand-navy">Payments and delivery partners</h2>
            <p className="mt-2">
              Payment and delivery information may be shared with trusted payment gateways, courier
              partners, and service providers only for completing your order and related support.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-brand-navy">Contact</h2>
            <p className="mt-2">
              For privacy questions or correction requests, email info@9xtg.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
