export const SITE_NAME = "9X Pharma";
export const SITE_TAGLINE = "Science-Backed Nutraceuticals for Modern Wellness";
export const FREE_SHIPPING_THRESHOLD = 999;
export const WHATSAPP_NUMBER = "918590898080";
export const WHATSAPP_DEFAULT_MESSAGE = "Hi, I'd like to know more about your products.";
export const SUPPLEMENT_DISCLAIMER =
  "This product is not intended to diagnose, treat, cure, or prevent any disease.";
export const MAX_QUANTITY = 10;
export const DELIVERY_DAYS = "3-5 business days";
export const COD_AVAILABLE = true;
export const RETURN_POLICY_DAYS = 7;

// UPI payment config — used by the UPI deep-link checkout.
export const UPI_VPA = "nithincgovindan@okaxis";
export const UPI_MERCHANT_NAME = "9X Pharma";

// Email address that receives order notifications.
// FormSubmit.co requires the FIRST submission to be confirmed (a verification
// email lands at SALES_EMAIL — click the link, then all future submissions go through).
export const SALES_EMAIL = "sales@9xtg.com";
export const FORMSUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${SALES_EMAIL}`;

// Razorpay payment gateway config.
// Sign up free at https://dashboard.razorpay.com — under Settings → API Keys generate
// a "Test Mode" key first (starts with "rzp_test_"), then switch to "Live Mode" after KYC.
// Only the KEY ID is needed in the frontend (the Key Secret stays in the Cloudflare Worker).
export const RAZORPAY_KEY_ID = "rzp_test_SmNxVfGZIFmCxJ";
export const RAZORPAY_BRAND_COLOR = "#1e3a5f"; // matches brand-navy
export const RAZORPAY_CHECKOUT_SCRIPT = "https://checkout.razorpay.com/v1/checkout.js";

// Backend API (Cloudflare Worker) — deploy from /worker.
export const API_BASE_URL = "https://9xpharma-api.9xtglobal.workers.dev";
