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
      "Ulida is marketed by 9X Pharma. The formulation is licensed from SUGANT SAS, France.",
    productSlug: "ulida",
  },

  // Erexio FAQs (based on creative information only)
  {
    question: "What is Erexio Gel?",
    answer:
      "Erexio Gel is a fast-acting topical stimul gel intended for use by adult men. It is designed to support men experiencing erectile dysfunction (ED). It is a topical product and has no known drug interactions, and may be considered by men who are unable to use oral PDE5 inhibitors.",
    productSlug: "erexio",
  },
  {
    question: "How do I use Erexio Gel?",
    answer:
      "Apply 0.3 ml directly to the glans (head) of the penis, gently massage for approximately 15 seconds, and use immediately prior to intercourse. Each 0.3 ml amount is intended for one-time use for a single intercourse attempt. Always follow the instructions provided with the product.",
    productSlug: "erexio",
  },
  {
    question: "What is the suggested single-use amount?",
    answer:
      "0.3 ml per application. The 15 gm tube provides multiple applications. Each 0.3 ml amount is intended for one-time use for a single intercourse attempt.",
    productSlug: "erexio",
  },
  {
    question: "Does Erexio have drug interactions?",
    answer:
      "Erexio Gel has no known drug interactions. It is a topical product and may be considered by men unable to use oral PDE5 inhibitors. If you have underlying medical conditions, consult a healthcare professional before use.",
    productSlug: "erexio",
  },
  {
    question: "What are the ingredients in Erexio Gel?",
    answer:
      "Erexio contains Ethanol, Aqua, Glycerin, Propylene Glycol, Carbomer, and Potassium Hydroxide. For the complete ingredient list, please refer to the enclosed instructions on the product packaging.",
    productSlug: "erexio",
  },
  {
    question: "Who is Erexio Gel designed for?",
    answer:
      "Erexio Gel is intended for adult men only and is for external use only. If you have underlying medical conditions or are allergic to any of the listed ingredients, consult a healthcare professional before use.",
    productSlug: "erexio",
  },
];

export function getGlobalFaqs(): FAQ[] {
  return faqs.filter((f) => !f.productSlug);
}

export function getProductFaqs(slug: string): FAQ[] {
  return faqs.filter((f) => f.productSlug === slug || !f.productSlug);
}
