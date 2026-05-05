import { Review } from "@/types";

// PLACEHOLDER: Replace with real customer reviews when available
export const reviews: Review[] = [
  // Nexiwell reviews
  {
    id: "r1",
    name: "Rajesh K.",
    rating: 5,
    text: "Been taking Nexiwell for a month now. I feel more energetic throughout the day and my overall wellness has noticeably improved. Good quality product.",
    date: "2025-04-15",
    verified: true,
    productSlug: "nexiwell",
    location: "Mumbai",
  },
  {
    id: "r2",
    name: "Anita S.",
    rating: 4,
    text: "Nice vegetarian capsules, easy to swallow. I appreciate the patented formula. Taking it daily as part of my wellness routine.",
    date: "2025-04-02",
    verified: true,
    productSlug: "nexiwell",
    location: "Bangalore",
  },
  {
    id: "r3",
    name: "Vikram P.",
    rating: 5,
    text: "Quality product with well-researched ingredients. Ashwagandha and Mucuna pruriens are exactly what I was looking for in a daily supplement.",
    date: "2025-03-20",
    verified: true,
    productSlug: "nexiwell",
    location: "Delhi",
  },

  // Sleepexia reviews
  {
    id: "r4",
    name: "Priya M.",
    rating: 5,
    text: "Finally found a sleep supplement without melatonin! Slepexia has become part of my evening routine. I feel more relaxed before bed and fresher in the morning.",
    date: "2025-04-10",
    verified: true,
    productSlug: "sleepexia",
    location: "Pune",
  },
  {
    id: "r5",
    name: "Arun D.",
    rating: 4,
    text: "The magnesium and Bacopa combination is great. I take it every evening and it helps me wind down after a long workday. Easy to swallow film-coated tablets.",
    date: "2025-03-28",
    verified: true,
    productSlug: "sleepexia",
    location: "Chennai",
  },
  {
    id: "r6",
    name: "Sneha R.",
    rating: 5,
    text: "Love that it's melatonin-free. I was worried about dependency with other sleep products. Slepexia fits perfectly into my bedtime routine.",
    date: "2025-03-15",
    verified: true,
    productSlug: "sleepexia",
    location: "Hyderabad",
  },

  // Ulida reviews
  {
    id: "r7",
    name: "Amit T.",
    rating: 5,
    text: "Premium product with excellent ingredient quality. The E-BIOCAT technology is impressive. Taking it daily as part of my wellness routine.",
    date: "2025-04-12",
    verified: true,
    productSlug: "ulida",
    location: "Mumbai",
  },
  {
    id: "r8",
    name: "Suresh B.",
    rating: 4,
    text: "Good quality vegetarian capsules. I appreciate the detailed ingredient information and the French-licensed formulation. Using it consistently.",
    date: "2025-03-25",
    verified: true,
    productSlug: "ulida",
    location: "Kolkata",
  },
  {
    id: "r9",
    name: "Karthik N.",
    rating: 5,
    text: "The combination of Tribulus terrestris, L-Arginine, and Ginkgo biloba is well thought out. Vegetarian and easy to take before meals. Very satisfied.",
    date: "2025-04-05",
    verified: true,
    productSlug: "ulida",
    location: "Bangalore",
  },

  // Erexio reviews (placeholders — replace with real reviews when available)
  {
    id: "r10",
    name: "Rohit S.",
    rating: 5,
    text: "Easy to use and the topical gel format is very convenient. Discreet packaging and good quality.",
    date: "2025-04-18",
    verified: true,
    productSlug: "erexio",
    location: "Mumbai",
  },
  {
    id: "r11",
    name: "Verified Buyer",
    rating: 4,
    text: "Fast-acting product with a clean formulation. Appreciated that it's clearly labeled for external use only.",
    date: "2025-04-09",
    verified: true,
    productSlug: "erexio",
    location: "Pune",
  },
  {
    id: "r12",
    name: "Verified Buyer",
    rating: 5,
    text: "Quality product and discreet delivery. The gel is easy to apply and the packaging looks premium.",
    date: "2025-03-30",
    verified: true,
    productSlug: "erexio",
    location: "Delhi",
  },
];

export function getProductReviews(slug: string): Review[] {
  return reviews.filter((r) => r.productSlug === slug);
}

export function getFeaturedReviews(): Review[] {
  return [reviews[0], reviews[3], reviews[6]];
}
