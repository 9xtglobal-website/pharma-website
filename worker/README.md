# 9X Pharma API — Razorpay backend

Tiny Cloudflare Worker that handles the two Razorpay operations the static site
can't do safely on its own:

1. **`POST /api/create-order`** — calls Razorpay's API with the Key Secret to
   create a server-tracked order, then returns the `order_id` to the browser.
2. **`POST /api/verify-payment`** — after the customer pays, the browser sends
   `order_id + payment_id + signature`, and this Worker HMAC-verifies the
   signature using the Key Secret. If it matches, the payment is genuine.

The Key Secret never touches the browser.

## One-time deployment (5 min)

### 1. Sign up for Cloudflare (free)
https://dash.cloudflare.com/sign-up — free tier covers 100,000 Worker requests
per day, more than enough for an early-stage store.

### 2. Install Wrangler and log in
From this `worker/` folder:

```bash
cd worker
npm install
npx wrangler login          # opens a browser, click "Allow"
```

### 3. Set the Razorpay secrets
You'll be prompted to paste the value (it's NOT visible in your shell history,
and never goes to git):

```bash
npx wrangler secret put RAZORPAY_KEY_ID
# paste your Razorpay Key ID, e.g. rzp_test_AbCdEf123

npx wrangler secret put RAZORPAY_KEY_SECRET
# paste your Razorpay Key Secret (only ever shown once in the dashboard)
```

### 4. Deploy
```bash
npx wrangler deploy
```

You'll get a URL back like:
```
https://9xpharma-api.<your-subdomain>.workers.dev
```

Send this URL to your developer to wire into the frontend (`API_BASE_URL` in
`src/lib/constants.ts`).

### 5. Verify it's alive
```bash
curl https://9xpharma-api.<your-subdomain>.workers.dev/health
# {"ok":true,"service":"9X Pharma API"}
```

## Updating later

Editing `src/index.ts` and running `npx wrangler deploy` again updates the
worker globally in seconds.

To rotate keys (e.g. switching from Test to Live mode):

```bash
npx wrangler secret put RAZORPAY_KEY_ID
npx wrangler secret put RAZORPAY_KEY_SECRET
# no redeploy needed — secrets are read fresh on every request
```

## Local development

```bash
npx wrangler dev
# server runs at http://localhost:8787
```

You can hit `http://localhost:8787/api/create-order` while running
`npm run dev` on the main site (port 3000) — CORS already includes localhost.

## Custom domain (optional)

To serve the API at `api.9xtg.com` instead of the workers.dev URL:

1. Make sure `9xtg.com` DNS is on Cloudflare (or proxied through it)
2. Uncomment the `[[routes]]` block in `wrangler.toml`
3. Run `npx wrangler deploy` again
4. In Cloudflare DNS, add a CNAME record `api` → `9xpharma-api.workers.dev`
   (proxied / orange cloud)
