/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: false,
  basePath: "/research/research-catalog",
  async redirects() {
    return [
      {
        source: "/research/collections/shared-collection-catalog/:path*",
        destination: "/research/research-catalog/:path*", // final URL includes basePath
        permanent: true,
        basePath: false,
      },
    ]
  },
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
