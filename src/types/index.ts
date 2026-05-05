export interface Ingredient {
  name: string;
  commonName?: string;
  amount: string;
  rdaPercent?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  mrp: number;
  salePrice: number;
  currency: "INR";
  unit: string;
  form: "capsule" | "tablet" | "gel";
  images: string[];
  ingredients: Ingredient[];
  benefits: string[];
  highlights: string[];
  usage: string;
  usageDetails: string[];
  storage: string;
  warnings: string[];
  manufacturer: string;
  marketedBy: string;
  category: "daily-wellness" | "sleep-support" | "mens-vitality" | "intimate-wellness";
  categoryLabel: string;
  stockStatus: "in_stock" | "low_stock";
  stockLeft?: number;
  badges: string[];
  metaTitle: string;
  metaDescription: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface FAQ {
  question: string;
  answer: string;
  productSlug?: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  date: string;
  verified: boolean;
  productSlug: string;
  location?: string;
}
