import Hero from "@/components/home/Hero";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import BenefitCards from "@/components/home/BenefitCards";
import BundleSection from "@/components/home/BundleSection";
import TestimonialSection from "@/components/home/TestimonialSection";
import TrustBadges from "@/components/ui/TrustBadges";
import FAQAccordion from "@/components/ui/FAQAccordion";
import { getGlobalFaqs } from "@/data/faqs";
import Link from "next/link";

export default function HomePage() {
  const faqs = getGlobalFaqs();

  return (
    <>
      <Hero />
      <FeaturedProducts />
      <BenefitCards />
      <BundleSection />
      <TestimonialSection />

      {/* Trust Badges Section */}
      <section className="py-12">
        <div className="container-main">
          <TrustBadges />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="border-t border-brand-grey-100 bg-brand-grey-50 py-16 sm:py-20">
        <div className="container-main">
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <h2 className="section-heading">Frequently Asked Questions</h2>
              <p className="section-subheading">
                Got questions? We have answers to help you make an informed decision.
              </p>
            </div>
            <div className="mt-8">
              <FAQAccordion items={faqs} />
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-20">
        <div className="container-main">
          <div className="rounded-3xl bg-gradient-to-r from-brand-navy to-brand-navy-dark p-8 text-center sm:p-12">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Start Your Wellness Routine Today
            </h2>
            <p className="mt-3 text-base text-white/60 sm:text-lg">
              Choose the product that matches your wellness need. Free shipping on orders above ₹999.
            </p>
            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link href="/products" className="btn-primary w-full sm:w-auto sm:px-8 sm:py-4">
                Shop All Products
              </Link>
              <a
                href={`https://wa.me/918590898080?text=${encodeURIComponent("Hi, I need help choosing the right product for me.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp w-full sm:w-auto"
              >
                Chat with Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
