"use client";

import { products } from "@/data/products";
import { formatCurrency, getWhatsAppUrl } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { WHATSAPP_NUMBER } from "@/lib/constants";

export default function ComparisonTable() {
  const { addToCart } = useCart();

  return (
    <div className="overflow-x-auto rounded-2xl border border-brand-grey-100">
      <table className="w-full min-w-[600px] text-sm">
        <thead>
          <tr className="border-b border-brand-grey-100 bg-brand-grey-50">
            <th className="sticky left-0 bg-brand-grey-50 px-4 py-3 text-left font-semibold text-brand-grey-700">
              Feature
            </th>
            {products.map((p) => (
              <th key={p.id} className="px-4 py-3 text-center font-semibold text-brand-navy">
                {p.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-brand-grey-100">
          <tr>
            <td className="sticky left-0 bg-white px-4 py-3 font-medium text-brand-grey-700">Category</td>
            {products.map((p) => (
              <td key={p.id} className="px-4 py-3 text-center text-brand-grey-600">
                {p.categoryLabel}
              </td>
            ))}
          </tr>
          <tr className="bg-brand-grey-50/50">
            <td className="sticky left-0 bg-brand-grey-50/50 px-4 py-3 font-medium text-brand-grey-700">Form</td>
            {products.map((p) => (
              <td key={p.id} className="px-4 py-3 text-center text-brand-grey-600 capitalize">
                {p.form}s
              </td>
            ))}
          </tr>
          <tr>
            <td className="sticky left-0 bg-white px-4 py-3 font-medium text-brand-grey-700">Quantity</td>
            {products.map((p) => (
              <td key={p.id} className="px-4 py-3 text-center text-brand-grey-600">
                {p.unit}
              </td>
            ))}
          </tr>
          <tr className="bg-brand-grey-50/50">
            <td className="sticky left-0 bg-brand-grey-50/50 px-4 py-3 font-medium text-brand-grey-700">Key Ingredients</td>
            {products.map((p) => (
              <td key={p.id} className="px-4 py-3 text-center text-brand-grey-600">
                {p.ingredients.slice(0, 3).map((i) => i.commonName || i.name.split(" ")[0]).join(", ")}
              </td>
            ))}
          </tr>
          <tr>
            <td className="sticky left-0 bg-white px-4 py-3 font-medium text-brand-grey-700">Usage</td>
            {products.map((p) => (
              <td key={p.id} className="px-4 py-3 text-center text-brand-grey-600">
                {p.usageDetails[0]}
              </td>
            ))}
          </tr>
          <tr className="bg-brand-grey-50/50">
            <td className="sticky left-0 bg-brand-grey-50/50 px-4 py-3 font-medium text-brand-grey-700">Vegetarian</td>
            {products.map((p) => (
              <td key={p.id} className="px-4 py-3 text-center">
                <span className="text-brand-green">✓</span>
              </td>
            ))}
          </tr>
          <tr>
            <td className="sticky left-0 bg-white px-4 py-3 font-medium text-brand-grey-700">Price</td>
            {products.map((p) => (
              <td key={p.id} className="px-4 py-3 text-center">
                {p.salePrice === 0 ? (
                  <span className="text-xs font-medium text-brand-navy">On request</span>
                ) : (
                  <>
                    <span className="font-bold text-brand-grey-800">{formatCurrency(p.salePrice)}</span>
                    <span className="ml-1 text-xs text-brand-grey-400 line-through">{formatCurrency(p.mrp)}</span>
                  </>
                )}
              </td>
            ))}
          </tr>
          <tr className="bg-brand-grey-50/50">
            <td className="sticky left-0 bg-brand-grey-50/50 px-4 py-3"></td>
            {products.map((p) => (
              <td key={p.id} className="px-4 py-3 text-center">
                {p.salePrice === 0 ? (
                  <a
                    href={getWhatsAppUrl(WHATSAPP_NUMBER, `Hi, I'd like to know more about ${p.name}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg bg-[#25D366] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#1da851]"
                  >
                    Enquire
                  </a>
                ) : (
                  <button
                    onClick={() => addToCart(p)}
                    className="rounded-lg bg-brand-orange px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-brand-orange-dark"
                  >
                    Add to Cart
                  </button>
                )}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
