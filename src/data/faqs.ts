import { FAQ } from "@/types";

export const faqs: FAQ[] = [
  // Global FAQs
  {
    question: "Are your products safe to consume?",
    answer:
      "All our products are manufactured in certified facilities following strict quality control processes. Each product is formulated with well-researched ingredients at specified dosages. However, we always recommend consulting a healthcare professional before starting any new supplement.",
  },
  {
    question: "Do you offer free shipping?",
    answer:
      "Yes, we offer free shipping on all orders above ₹999. For orders below ₹999, a nominal shipping fee applies. Delivery typically takes 3-5 business days across India.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We offer a 7-day return policy on all unopened products. If you receive a damaged or incorrect product, please contact us via WhatsApp and we will arrange a replacement or refund.",
  },
  {
    question: "Is Cash on Delivery (COD) available?",
    answer:
      "Yes, Cash on Delivery is available for orders across India. You can also pay online via UPI, credit/debit cards, or net banking.",
  },
  {
    question: "Are these products vegetarian?",
    answer:
      "Yes, Nexiwell and Ulida capsules are vegetarian. Slepexia tablets are film-coated tablets suitable for vegetarians. All products carry the vegetarian mark on their packaging.",
  },

  // Nexiwell FAQs
  {
    question: "What are the key ingredients in Nexiwell?",
    answer:
      "Nexiwell contains Trigonella foenum-graecum (Fenugreek) extract 142 mg, Mucuna pruriens extract 108 mg, Withania somnifera (Ashwagandha) extract 99 mg, and L-Arginine 49.5 mg per serving.",
    productSlug: "nexiwell",
  },
  {
    question: "How should I take Nexiwell?",
    answer:
      "Take 1 capsule twice daily or as recommended by your healthcare professional. Swallow with water, preferably with or after meals.",
    productSlug: "nexiwell",
  },
  {
    question: "Who is Nexiwell designed for?",
    answer:
      "Nexiwell is a daily wellness supplement designed for adults looking for nutritional support. It is a vegetarian formulation suitable for both men and women.",
    productSlug: "nexiwell",
  },
  {
    question: "How long should I take Nexiwell?",
    answer:
      "Consistent daily use is recommended for best results. Individual experiences may vary. Consult your healthcare professional for guidance on the duration that suits your wellness goals.",
    productSlug: "nexiwell",
  },

  // Sleepexia FAQs
  {
    question: "Does Slepexia contain melatonin?",
    answer:
      "No, Slepexia is a melatonin-free formula. It uses Magnesium Bisglycinate, Bacopa monnieri, Ashwagandha, and Vitamin D2 to support relaxation and sleep quality without melatonin dependency.",
    productSlug: "sleepexia",
  },
  {
    question: "When should I take Slepexia?",
    answer:
      "Take 1 tablet daily, preferably in the evening. Swallow with water. For best results, complement with sleep-supportive habits like a fixed bedtime routine and reduced screen time before bed.",
    productSlug: "sleepexia",
  },
  {
    question: "Is Slepexia habit-forming?",
    answer:
      "Slepexia is a nutritional supplement, not a medication. It contains plant extracts and nutrients commonly used in dietary supplements. It is not classified as habit-forming. Always use as directed.",
    productSlug: "sleepexia",
  },
  {
    question: "Can I take Slepexia with other supplements?",
    answer:
      "We recommend consulting your healthcare professional before combining any supplements, especially if you are currently taking medications or have specific health conditions.",
    productSlug: "sleepexia",
  },

  // Ulida FAQs
  {
    question: "What is E-BIOCAT technology in Ulida?",
    answer:
      "E-BIOCAT is an innovative enzyme-based delivery system included in Ulida's formulation. It contains enzymes like Bromelain, Papain, Alpha-amylase, and Cellulase designed to support the delivery and absorption of the active ingredients.",
    productSlug: "ulida",
  },
  {
    question: "How should I take Ulida capsules?",
    answer:
      "Take 1 capsule 3 times a day before meals with a glass of water, or as recommended by your healthcare professional. Ulida is designed for adult men.",
    productSlug: "ulida",
  },
  {
    question: "Is Ulida suitable for all men?",
    answer:
      "Ulida is designed for adult men. If you have any specific medical conditions, are taking medications, or are allergic to any of the ingredients, please consult your healthcare professional before use.",
    productSlug: "ulida",
  },
  {
    question: "Where is Ulida manufactured?",
    answer:
      "Ulida is manufactured by Bangalore Pharmaceutical & Research Laboratory (P) Ltd. in Karnataka, India, and marketed by AMT Pharma Pvt. Ltd. The formulation is licensed from SUGANT SAS, France.",
    productSlug: "ulida",
  },

  // Erexio FAQs (based on creative information only)
  {
    question: "What is Erexio?",
    answer:
      "Erexio is a fast-acting topical gel designed to support stronger, longer-lasting performance for adult men. It comes in a 15 gm pack and is formulated for convenient external application.",
    productSlug: "erexio",
  },
  {
    question: "What are the ingredients in Erexio?",
    answer:
      "Erexio contains Ethanol, Aqua, Glycerin, Propylene Glycol, Carbomer, and Potassium Hydroxide. For the complete ingredient list and any percentage details, please refer to the product packaging.",
    productSlug: "erexio",
  },
  {
    question: "How do I use Erexio?",
    answer:
      "Erexio is a topical gel for external use only. Please follow the directions printed on the product packaging or consult a healthcare professional for guidance.",
    productSlug: "erexio",
  },
  {
    question: "Is Erexio a medicine?",
    answer:
      "No. As stated on the product, Erexio is not a medicine and is for external use only. Always read the label carefully before use and keep out of reach of children.",
    productSlug: "erexio",
  },
  {
    question: "Who is Erexio designed for?",
    answer:
      "Erexio is designed for adult men. If you are allergic to any of the listed ingredients or have specific medical conditions, please consult a healthcare professional before use.",
    productSlug: "erexio",
  },
];

export function getGlobalFaqs(): FAQ[] {
  return faqs.filter((f) => !f.productSlug);
}

export function getProductFaqs(slug: string): FAQ[] {
  return faqs.filter((f) => f.productSlug === slug || !f.productSlug);
}
