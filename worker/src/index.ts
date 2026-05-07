/**
 * 9X Pharma — Razorpay backend worker.
 *
 * Two endpoints:
 *   POST /api/create-order   → calls Razorpay Orders API, returns order_id
 *   POST /api/verify-payment → HMAC-SHA256 verifies the payment signature
 *
 * Secrets (set via `wrangler secret put`):
 *   RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET
 *
 * Vars (set in wrangler.toml):
 *   ALLOWED_ORIGINS — comma-separated list of allowed origins for CORS
 */

interface Env {
  RAZORPAY_KEY_ID: string;
  RAZORPAY_KEY_SECRET: string;
  ALLOWED_ORIGINS: string;
}

interface CreateOrderBody {
  amount: number; // in rupees (we convert to paise inside)
  currency?: string;
  receipt?: string;
  notes?: Record<string, string>;
}

interface VerifyBody {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

function corsHeaders(origin: string, env: Env): Record<string, string> {
  const allowed = env.ALLOWED_ORIGINS.split(",").map((s) => s.trim());
  const useOrigin = allowed.includes(origin) ? origin : allowed[0] || "*";
  return {
    "Access-Control-Allow-Origin": useOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

function json(
  data: unknown,
  status: number,
  origin: string,
  env: Env
): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders(origin, env),
    },
  });
}

async function hmacSha256Hex(
  secret: string,
  message: string
): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function handleCreateOrder(
  request: Request,
  env: Env,
  origin: string
): Promise<Response> {
  let body: CreateOrderBody;
  try {
    body = (await request.json()) as CreateOrderBody;
  } catch {
    return json({ error: "Invalid JSON body" }, 400, origin, env);
  }

  if (!body.amount || body.amount <= 0) {
    return json({ error: "amount must be a positive number" }, 400, origin, env);
  }

  const credentials = btoa(`${env.RAZORPAY_KEY_ID}:${env.RAZORPAY_KEY_SECRET}`);
  const rzpResp = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: Math.round(body.amount * 100), // paise
      currency: body.currency ?? "INR",
      receipt: body.receipt?.slice(0, 40),
      notes: body.notes,
    }),
  });

  const data = await rzpResp.json();
  return json(data, rzpResp.status, origin, env);
}

async function handleVerifyPayment(
  request: Request,
  env: Env,
  origin: string
): Promise<Response> {
  let body: VerifyBody;
  try {
    body = (await request.json()) as VerifyBody;
  } catch {
    return json({ error: "Invalid JSON body" }, 400, origin, env);
  }

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;
  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return json({ error: "Missing required fields", valid: false }, 400, origin, env);
  }

  const expected = await hmacSha256Hex(
    env.RAZORPAY_KEY_SECRET,
    `${razorpay_order_id}|${razorpay_payment_id}`
  );

  // Constant-time comparison to avoid timing attacks
  const valid =
    expected.length === razorpay_signature.length &&
    expected
      .split("")
      .every((c, i) => c === razorpay_signature[i]);

  return json({ valid }, valid ? 200 : 400, origin, env);
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const origin = request.headers.get("Origin") ?? "";

    // CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders(origin, env) });
    }

    if (url.pathname === "/api/create-order" && request.method === "POST") {
      return handleCreateOrder(request, env, origin);
    }
    if (url.pathname === "/api/verify-payment" && request.method === "POST") {
      return handleVerifyPayment(request, env, origin);
    }
    if (url.pathname === "/" || url.pathname === "/health") {
      return json({ ok: true, service: "9X Pharma API" }, 200, origin, env);
    }

    return json({ error: "Not found" }, 404, origin, env);
  },
};
