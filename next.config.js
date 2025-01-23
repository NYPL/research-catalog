/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  basePath: "/research/research-catalog",
  // pageExtensions: ["page.tsx", "page.ts", "page.jsx", "page.js"],
  webpack(config, { isServer }) {
    if (!isServer) {
      // Ignore 'fs' module in the client-side code
      config.resolve.fallback = {
        fs: false,
      }
    }
    return config
  },
}

module.exports = nextConfig
