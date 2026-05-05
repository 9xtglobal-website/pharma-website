/** @type {import('next').NextConfig} */

// When building for GitHub Pages, the site is served at:
// https://<user>.github.io/<repo>/
// So we need a base path. Set NEXT_PUBLIC_BASE_PATH in CI to "/9xpharma"
// (or whatever the repo is called).
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath,
  images: { unoptimized: true },
};

export default nextConfig;
