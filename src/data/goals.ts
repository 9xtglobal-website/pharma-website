export interface WellnessGoal {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  productSlug: string;
  productName: string;
  points: string[];
}

export const wellnessGoals: WellnessGoal[] = [
  {
    slug: "daily-energy",
    title: "Daily Energy & Vitality",
    shortTitle: "Daily energy",
    description:
      "Nutritional support for adults who want a simple daily wellness routine with clear ingredient information.",
    productSlug: "nexiwell",
    productName: "Nexiwell",
    points: [
      "For everyday nutritional balance",
      "Plant extracts with L-Arginine",
      "Vegetarian capsule format",
    ],
  },
  {
    slug: "sleep-routine",
    title: "Sleep Routine Support",
    shortTitle: "Sleep routine",
    description:
      "Melatonin-free support for adults building a calmer evening routine and sleep-friendly habits.",
    productSlug: "sleepexia",
    productName: "Slepexia",
    points: [
      "Melatonin-free formula",
      "Once-daily evening use",
      "Includes Magnesium Bisglycinate, Bacopa, Ashwagandha, and Vitamin D2",
    ],
  },
  {
    slug: "mens-vitality",
    title: "Men's Vitality Support",
    shortTitle: "Men's vitality",
    description:
      "Adult men's wellness support with botanicals, L-Arginine, Zinc, and a French-licensed E-BIOCAT enzyme system.",
    productSlug: "ulida",
    productName: "Ulida",
    points: [
      "Designed for adult men",
      "60 capsules, 20-day course at suggested use",
      "Licensed from SUGANT SAS, France",
    ],
  },
  {
    slug: "intimate-wellness",
    title: "Intimate Wellness Support",
    shortTitle: "Intimate wellness",
    description:
      "External-use topical support for adult men, with clear usage directions and safety warnings.",
    productSlug: "erexio",
    productName: "Erexio Gel",
    points: [
      "External-use topical format",
      "For adult men only",
      "Read enclosed instructions before use",
    ],
  },
];

export function getWellnessGoalBySlug(slug: string): WellnessGoal | undefined {
  return wellnessGoals.find((goal) => goal.slug === slug);
}
