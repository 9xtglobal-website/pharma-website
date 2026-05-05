"use client";

import { CartItem as CartItemType } from "@/types";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/lib/utils";
import QuantitySelector from "@/components/ui/QuantitySelector";
import ProductImage from "@/components/ui/ProductImage";

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity } = item;

  return (
    <div className="flex gap-3 py-4">
      {/* Product image */}
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-brand-grey-100">
        <ProductImage
          src={product.images[0]}
          alt={product.name}
          productName={product.name}
          fill
          sizes="80px"
        />
      </div>

      <div className="flex flex-1 flex-col">
        <div className="flex items-start justify-between">
          <div>
            <h4 className="text-sm font-semibold text-brand-grey-800">{product.name}</h4>
            <p className="text-xs text-brand-grey-500">{product.unit}</p>
          </div>
          <button
            onClick={() => removeFromCart(product.id)}
            className="text-brand-grey-400 transition-colors hover:text-red-500"
            aria-label={`Remove ${product.name}`}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <QuantitySelector
            value={quantity}
            onChange={(val) => updateQuantity(product.id, val)}
          />
          <div className="text-right">
            <p className="text-sm font-bold text-brand-grey-800">
              {formatCurrency(product.salePrice * quantity)}
            </p>
            {product.mrp > product.salePrice && (
              <p className="text-xs text-brand-grey-400 line-through">
                {formatCurrency(product.mrp * quantity)}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
