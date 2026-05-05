/** @type {import('next').NextConfig} */

// When building for GitHub Pages, the site is served at:
// https://<user-or-org>.github.io/<repo>/
// So we need a base path. The Actions workflow sets NEXT_PUBLIC_BASE_PATH
// to "/<repo-name>" automatically.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath,
  images: { unoptimized: true },
};

export default nextConfig;
