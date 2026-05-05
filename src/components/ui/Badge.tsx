"use client";

interface BadgeProps {
  text: string;
  variant?: "default" | "discount" | "bestseller" | "stock" | "new";
}

const variantStyles: Record<string, string> = {
  default: "bg-brand-green-pale text-brand-green-dark border-brand-green/20",
  discount: "bg-red-50 text-red-600 border-red-200",
  bestseller: "bg-amber-50 text-amber-700 border-amber-200",
  stock: "bg-orange-50 text-orange-600 border-orange-200",
  new: "bg-blue-50 text-blue-600 border-blue-200",
};

export default function Badge({ text, variant = "default" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium ${variantStyles[variant]}`}
    >
      {text}
    </span>
  );
}
