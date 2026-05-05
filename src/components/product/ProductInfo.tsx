"use client";

import { useState } from "react";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import PriceDisplay from "@/components/ui/PriceDisplay";
import StarRating from "@/components/ui/StarRating";
import QuantitySelector from "@/components/ui/QuantitySelector";
import CountdownTimer from "@/components/ui/CountdownTimer";
import Badge from "@/components/ui/Badge";
import TrustBadges from "@/components/ui/TrustBadges";
import { DELIVERY_DAYS, WHATSAPP_NUMBER } from "@/lib/constants";
import { getWhatsAppUrl } from "@/lib/utils";

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setQuantity(1);
  };

  return (
    <div className="space-y-5">
      {/* Category */}
      <span className="text-sm font-medium uppercase tracking-wider text-brand-green">
        {product.categoryLabel}
      </span>

      {/* Title */}
      <h1 className="text-2xl font-bold text-brand-grey-900 sm:text-3xl">{product.name}</h1>

      {/* Tagline */}
      <p className="text-base text-brand-grey-500">{product.tagline}</p>

      {/* Rating */}
      <StarRating rating={4.5} count={42} />

      {/* Badges */}
      <div className="flex flex-wrap gap-2">
        {product.badges.map((badge) => (
          <Badge key={badge} text={badge} />
        ))}
      </div>

      {/* Price */}
      <PriceDisplay mrp={product.mrp} salePrice={product.salePrice} size="lg" />

      {/* Urgency timer */}
      <CountdownTimer compact />

      {/* Stock status */}
      {product.stockStatus === "low_stock" && product.stockLeft && (
        <div className="flex items-center gap-2 rounded-lg bg-orange-50 px-3 py-2">
          <span className="h-2 w-2 animate-pulse rounded-full bg-orange-500" />
          <span className="text-sm font-medium text-orange-700">
            Only {product.stockLeft} left in stock — order soon
          </span>
        </div>
      )}

      {/* Quantity & Add to Cart (or Enquire if price not set) */}
      {product.salePrice === 0 ? (
        <a
          href={getWhatsAppUrl(
            WHATSAPP_NUMBER,
            `Hi, I'd like to know the price and place an order for ${product.name}.`
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-whatsapp w-full py-3.5 text-base"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Enquire on WhatsApp
        </a>
      ) : (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <QuantitySelector value={quantity} onChange={setQuantity} />
          <button onClick={handleAddToCart} className="btn-primary flex-1 py-3.5 text-base">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            Add to Cart
          </button>
        </div>
      )}

      {/* Delivery info */}
      <div className="flex items-center gap-2 text-sm text-brand-grey-500">
        <svg className="h-5 w-5 text-brand-green" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
        </svg>
        <span>Estimated delivery: {DELIVERY_DAYS} | COD available</span>
      </div>

      {/* Benefits */}
      <div className="rounded-xl border border-brand-grey-100 p-4">
        <h3 className="mb-3 text-sm font-semibold text-brand-grey-700">Key Benefits</h3>
        <ul className="space-y-2">
          {product.benefits.map((benefit, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-brand-grey-600">
              <svg className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {benefit}
            </li>
          ))}
        </ul>
      </div>

      {/* Trust badges */}
      <TrustBadges compact />
    </div>
  );
}
