import nextConfig from "../next.config"

describe("redirects", () => {
  it("redirects legacy research/collections/shared-collection-catalog correctly", async () => {
    const redirects = await nextConfig.redirects()
    const redirect = redirects.find(
      (r) =>
        r.source === "/research/collections/shared-collection-catalog/:path*"
    )
    expect(redirect).toBeDefined()
    expect(redirect?.destination).toBe("/research/research-catalog/:path*")
    expect(redirect?.permanent).toBe(true)
    expect(redirect?.basePath).toBe(false)
  })
})
