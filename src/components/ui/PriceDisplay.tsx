"use client";

import { formatCurrency, calcDiscountPercent, calcSavings } from "@/lib/utils";

interface PriceDisplayProps {
  mrp: number;
  salePrice: number;
  size?: "sm" | "md" | "lg";
  showSavings?: boolean;
}

export default function PriceDisplay({ mrp, salePrice, size = "md", showSavings = true }: PriceDisplayProps) {
  const priceSize = {
    sm: "text-base",
    md: "text-xl",
    lg: "text-2xl",
  }[size];

  // Price not provided — show "Price on request"
  if (salePrice === 0) {
    return (
      <div className="flex flex-wrap items-baseline gap-2">
        <span className={`${priceSize} font-bold text-brand-navy`}>Price on request</span>
        <span className="text-xs text-brand-grey-400">— Chat with us for details</span>
      </div>
    );
  }

  const discount = calcDiscountPercent(mrp, salePrice);
  const savings = calcSavings(mrp, salePrice);
  const hasDiscount = discount > 0;

  const mainPriceSize = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
  }[size];

  const mrpSize = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  }[size];

  return (
    <div className="flex flex-wrap items-baseline gap-2">
      <span className={`${mainPriceSize} font-bold text-brand-grey-900`}>
        {formatCurrency(salePrice)}
      </span>
      {hasDiscount && (
        <>
          <span className={`${mrpSize} text-brand-grey-400 line-through`}>
            {formatCurrency(mrp)}
          </span>
          <span className="rounded-md bg-brand-green-pale px-2 py-0.5 text-sm font-semibold text-brand-green-dark">
            {discount}% off
          </span>
        </>
      )}
      {hasDiscount && showSavings && (
        <div className="mt-1 w-full text-sm font-medium text-brand-green">
          You save {formatCurrency(savings)}
        </div>
      )}
    </div>
  );
}
