import { Metadata } from "next";
import Link from "next/link";
import { products } from "@/data/products";
import ProductCard from "@/components/product/ProductCard";
import ComparisonTable from "@/components/product/ComparisonTable";
import TrustBadges from "@/components/ui/TrustBadges";

export const metadata: Metadata = {
  title: "All Products",
  description:
    "Browse all 9X Pharma nutraceutical products. Daily wellness capsules, sleep support tablets, and men's vitality formulations.",
};

export default function ProductsPage() {
  return (
    <div className="py-8 sm:py-12">
      <div className="container-main">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-sm text-brand-grey-400">
          <Link href="/" className="transition-colors hover:text-brand-navy">
            Home
          </Link>
          <span>/</span>
          <span className="text-brand-grey-700">Products</span>
        </nav>

        {/* Header */}
        <div className="mb-10">
          <h1 className="section-heading">Our Products</h1>
          <p className="section-subheading max-w-2xl">
            Explore our range of nutraceutical products designed to support your daily wellness needs.
            Each product is formulated with carefully selected ingredients.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Comparison Table */}
        <div className="mt-16">
          <h2 className="mb-6 text-center text-xl font-bold text-brand-navy sm:text-2xl">
            Compare Products
          </h2>
          <ComparisonTable />
        </div>

        {/* Trust */}
        <div className="mt-12">
          <TrustBadges />
        </div>
      </div>
    </div>
  );
}
