import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products, getProductBySlug, getOtherProducts } from "@/data/products";
import { getProductFaqs } from "@/data/faqs";
import { getProductReviews } from "@/data/reviews";
import ProductInfo from "@/components/product/ProductInfo";
import ProductImageGallery from "@/components/product/ProductImageGallery";
import IngredientTable from "@/components/product/IngredientTable";
import ProductCard from "@/components/product/ProductCard";
import FAQAccordion from "@/components/ui/FAQAccordion";
import ReviewCard from "@/components/ui/ReviewCard";
import { SUPPLEMENT_DISCLAIMER } from "@/lib/constants";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const product = getProductBySlug(params.slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: product.metaTitle,
    description: product.metaDescription,
  };
}

export default function ProductDetailPage({ params }: PageProps) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const faqs = getProductFaqs(product.slug);
  const reviews = getProductReviews(product.slug);
  const otherProducts = getOtherProducts(product.slug);

  return (
    <div className="py-6 sm:py-10">
      <div className="container-main">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-sm text-brand-grey-400">
          <Link href="/" className="transition-colors hover:text-brand-navy">Home</Link>
          <span>/</span>
          <Link href="/products" className="transition-colors hover:text-brand-navy">Products</Link>
          <span>/</span>
          <span className="text-brand-grey-700">{product.name}</span>
        </nav>

        {/* Product Hero: 2-column layout */}
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left: Product Image */}
          <div>
            <ProductImageGallery product={product} />
          </div>

          {/* Right: Product Info */}
          <ProductInfo product={product} />
        </div>

        {/* Description */}
        <section className="mt-12 rounded-2xl border border-brand-grey-100 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-brand-navy">About {product.name}</h2>
          <p className="mt-3 text-sm leading-relaxed text-brand-grey-600">{product.description}</p>

          {/* Highlights */}
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {product.highlights.map((highlight, i) => (
              <div key={i} className="flex items-center gap-2 rounded-lg bg-brand-grey-50 px-4 py-3">
                <svg className="h-5 w-5 shrink-0 text-brand-green" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium text-brand-grey-700">{highlight}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Ingredients */}
        <section className="mt-8">
          <h2 className="mb-4 text-xl font-bold text-brand-navy">Ingredients</h2>
          <IngredientTable ingredients={product.ingredients} />
          <p className="mt-3 text-xs text-brand-grey-400">Per serving. Approximate values.</p>
        </section>

        {/* How to Use */}
        <section className="mt-8 rounded-2xl border border-brand-grey-100 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-brand-navy">How to Use</h2>
          <p className="mt-3 text-sm text-brand-grey-600">{product.usage}</p>
          <ul className="mt-4 space-y-2">
            {product.usageDetails.map((detail, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-brand-grey-600">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-navy text-xs font-bold text-white">
                  {i + 1}
                </span>
                {detail}
              </li>
            ))}
          </ul>

          {/* Storage */}
          <div className="mt-6 rounded-lg bg-brand-grey-50 p-4">
            <p className="text-sm text-brand-grey-600">
              <span className="font-semibold text-brand-grey-700">Storage: </span>
              {product.storage}
            </p>
          </div>
        </section>

        {/* Safety & Warnings */}
        <section className="mt-8 rounded-2xl border border-amber-100 bg-amber-50/50 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-brand-grey-800">Safety Information</h2>
          <ul className="mt-3 space-y-2">
            {product.warnings.map((warning, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-brand-grey-600">
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
                {warning}
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-start gap-2 text-sm">
            <span className="font-medium text-brand-grey-700">Manufactured by:</span>
            <span className="text-brand-grey-500">{product.manufacturer}</span>
          </div>
          <div className="flex items-start gap-2 text-sm">
            <span className="font-medium text-brand-grey-700">Marketed by:</span>
            <span className="text-brand-grey-500">{product.marketedBy}</span>
          </div>
        </section>

        {/* Reviews */}
        <section className="mt-12">
          <h2 className="text-xl font-bold text-brand-navy">Customer Reviews</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-12">
          <h2 className="mb-4 text-xl font-bold text-brand-navy">Frequently Asked Questions</h2>
          <FAQAccordion items={faqs} />
        </section>

        {/* Related Products */}
        <section className="mt-12">
          <h2 className="mb-6 text-xl font-bold text-brand-navy">Complete Your Wellness Routine</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {otherProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

        {/* Disclaimer */}
        <p className="mt-10 rounded-lg bg-brand-grey-50 p-4 text-xs text-brand-grey-400">
          {SUPPLEMENT_DISCLAIMER}
        </p>
      </div>
    </div>
  );
}
