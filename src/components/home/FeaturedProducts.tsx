import { products } from "@/data/products";
import ProductCard from "@/components/product/ProductCard";

export default function FeaturedProducts() {
  return (
    <section id="products" className="py-16 sm:py-20">
      <div className="container-main">
        <div className="text-center">
          <h2 className="section-heading">Our Bestselling Products</h2>
          <p className="section-subheading mx-auto max-w-2xl">
            Carefully formulated nutraceuticals designed to support your daily wellness goals.
            Choose the product that fits your routine.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
