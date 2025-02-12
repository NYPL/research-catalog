/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  basePath: "/research/research-catalog",
  /**
   * Prevents Webpack from polyfilling 'fs' in client builds.
   * This avoids errors when server-side functions using Winston
   * are imported in page components with getServerSideProps.
   */
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
      }
    }
    return config
  },
}

module.exports = nextConfig
