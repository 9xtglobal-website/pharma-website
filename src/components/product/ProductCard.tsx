"use client";

import Link from "next/link";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import PriceDisplay from "@/components/ui/PriceDisplay";
import StarRating from "@/components/ui/StarRating";
import Badge from "@/components/ui/Badge";
import ProductImage from "@/components/ui/ProductImage";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import { getWhatsAppUrl } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

const REVIEW_COUNTS: Record<string, number> = {
  nexiwell: 47,
  sleepexia: 62,
  ulida: 38,
};

function getReviewCount(id: string): number {
  return REVIEW_COUNTS[id] ?? 30;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <div className="group card relative flex h-full flex-col">
      {/* Badges */}
      <div className="absolute left-4 top-4 z-10 flex flex-col gap-1">
        {product.stockStatus === "low_stock" && (
          <Badge text={`Only ${product.stockLeft} left`} variant="stock" />
        )}
        {product.badges[0] && <Badge text={product.badges[0]} />}
      </div>

      {/* Image */}
      <Link href={`/products/${product.slug}`} className="mb-4 block">
        <div className="relative aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-brand-grey-50 to-brand-grey-100">
          <ProductImage
            src={product.images[0]}
            alt={`${product.name} — ${product.tagline}`}
            productName={product.name}
            unit={product.unit}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>

      {/* Category */}
      <span className="mb-1 text-xs font-medium uppercase tracking-wider text-brand-green">
        {product.categoryLabel}
      </span>

      {/* Title */}
      <Link href={`/products/${product.slug}`}>
        <h3 className="text-lg font-bold text-brand-grey-800 transition-colors group-hover:text-brand-navy">
          {product.name}
        </h3>
      </Link>

      {/* Tagline */}
      <p className="mt-1 text-sm text-brand-grey-500">{product.tagline}</p>

      {/* Rating */}
      <div className="mt-2">
        <StarRating rating={4.5} count={getReviewCount(product.id)} size="sm" />
      </div>

      {/* Price */}
      <div className="mt-3">
        <PriceDisplay mrp={product.mrp} salePrice={product.salePrice} size="sm" showSavings={false} />
      </div>

      {/* Actions — pushed to bottom of card so buttons line up across the row */}
      <div className="mt-auto flex gap-2 pt-4">
        {product.salePrice === 0 ? (
          <a
            href={getWhatsAppUrl(WHATSAPP_NUMBER, `Hi, I'd like to know more about ${product.name}.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp flex-1 py-2.5 text-sm"
          >
            Enquire on WhatsApp
          </a>
        ) : (
          <button
            onClick={() => addToCart(product)}
            className="btn-primary flex-1 py-2.5 text-sm"
          >
            Add to Cart
          </button>
        )}
        <Link
          href={`/products/${product.slug}`}
          className="flex items-center justify-center rounded-xl border border-brand-grey-200 px-3 text-brand-grey-500 transition-colors hover:border-brand-navy hover:text-brand-navy"
          aria-label={`View ${product.name} details`}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
