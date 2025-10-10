import nextConfig from "../next.config"

describe("redirects", () => {
  it("redirects shared-collection-catalog to research-catalog", async () => {
    const redirects = await nextConfig.redirects()
    const redirect = redirects.find(
      (r) => r.source === "/research/collections/shared-collection-catalog"
    )

    expect(redirect).toBeDefined()
    expect(redirect?.destination).toBe("/research/research-catalog")
    expect(redirect?.permanent).toBe(true)
  })
})
