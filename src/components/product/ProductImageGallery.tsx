"use client";

import { useState } from "react";
import { Product } from "@/types";
import ProductImage from "@/components/ui/ProductImage";

interface ProductImageGalleryProps {
  product: Product;
}

export default function ProductImageGallery({ product }: ProductImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="sticky top-24">
      {/* Main image */}
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-brand-grey-50 to-brand-grey-100">
        <ProductImage
          src={product.images[activeIndex]}
          alt={`${product.name} — view ${activeIndex + 1}`}
          productName={product.name}
          unit={product.unit}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>

      {/* Thumbnail strip */}
      <div className="mt-4 grid grid-cols-4 gap-2">
        {product.images.map((src, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActiveIndex(i)}
            className={`relative aspect-square overflow-hidden rounded-lg border-2 bg-brand-grey-50 transition-colors ${
              i === activeIndex
                ? "border-brand-navy"
                : "border-transparent hover:border-brand-grey-300"
            }`}
            aria-label={`View image ${i + 1}`}
          >
            <ProductImage
              src={src}
              alt={`${product.name} thumbnail ${i + 1}`}
              productName={product.name}
              fill
              sizes="120px"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
