import Link from "next/link";
import { SUPPLEMENT_DISCLAIMER, WHATSAPP_NUMBER } from "@/lib/constants";
import Logo from "@/components/ui/Logo";

export default function Footer() {
  return (
    <footer className="border-t border-brand-grey-100 bg-brand-grey-50">
      <div className="container-main py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center">
              <Logo height={56} />
            </div>
            <p className="mt-3 text-sm leading-relaxed text-brand-grey-500">
              Science-backed nutraceutical formulations for modern wellness.
              Quality-focused products designed to support your daily health routine.
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-brand-grey-800">
              Products
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/products/nexiwell" className="text-sm text-brand-grey-500 transition-colors hover:text-brand-navy">
                  Nexiwell — Daily Wellness
                </Link>
              </li>
              <li>
                <Link href="/products/sleepexia" className="text-sm text-brand-grey-500 transition-colors hover:text-brand-navy">
                  Slepexia — Sleep Support
                </Link>
              </li>
              <li>
                <Link href="/products/ulida" className="text-sm text-brand-grey-500 transition-colors hover:text-brand-navy">
                  Ulida — Men&apos;s Vitality
                </Link>
              </li>
              <li>
                <Link href="/products/erexio" className="text-sm text-brand-grey-500 transition-colors hover:text-brand-navy">
                  Erexio — Intimate Wellness
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-sm text-brand-grey-500 transition-colors hover:text-brand-navy">
                  View All Products
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-brand-grey-800">
              Support
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-brand-grey-500 transition-colors hover:text-brand-navy"
                >
                  WhatsApp Support
                </a>
              </li>
              <li>
                <span className="text-sm text-brand-grey-500">Shipping & Delivery</span>
              </li>
              <li>
                <span className="text-sm text-brand-grey-500">Returns & Refunds</span>
              </li>
              <li>
                <span className="text-sm text-brand-grey-500">Privacy Policy</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-brand-grey-800">
              Contact
            </h4>
            <ul className="space-y-2.5">
              <li className="text-sm text-brand-grey-500">
                Marketed by AMT Pharma Pvt. Ltd.
              </li>
              <li className="text-sm text-brand-grey-500">
                Navi Mumbai, Maharashtra, India
              </li>
              <li>
                <a href="mailto:info@amtpharma.com" className="text-sm text-brand-grey-500 transition-colors hover:text-brand-navy">
                  info@amtpharma.com
                </a>
              </li>
              <li>
                <a href="tel:+917039345030" className="text-sm text-brand-grey-500 transition-colors hover:text-brand-navy">
                  +91 7039345030
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-10 border-t border-brand-grey-200 pt-6">
          <p className="text-xs leading-relaxed text-brand-grey-400">
            <strong>Disclaimer:</strong> {SUPPLEMENT_DISCLAIMER} The information provided on this
            website is for informational purposes only and is not a substitute for professional
            medical advice. Always consult your healthcare provider before starting any supplement.
            Individual results may vary.
          </p>
          <p className="mt-4 text-xs text-brand-grey-400">
            © {new Date().getFullYear()} 9X Pharma. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
