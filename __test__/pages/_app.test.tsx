import React from "react"
import { render, screen } from "../../src/utils/testUtils"
import App from "../../pages/_app"

jest.mock("next/router", () => jest.requireActual("next-router-mock"))
jest.mock("next/script", () => ({ __esModule: true, default: () => null }))

const MockPage = () => <div>page content</div>

const mockFetchReturning = (contentType: string) =>
  jest.fn().mockResolvedValue({
    headers: {
      get: (key: string) => (key === "content-type" ? contentType : null),
    },
  })

describe("App", () => {
  it("renders the page component", () => {
    render(<App Component={MockPage} pageProps={{}} />)
    expect(screen.getByText("page content")).toBeInTheDocument()
  })
})

describe("fetch interceptor for WAF non-JSON /_next/data responses", () => {
  let originalFetch: typeof window.fetch

  beforeEach(() => {
    originalFetch = window.fetch
  })

  afterEach(() => {
    window.fetch = originalFetch
  })

  it("passes through /_next/data/ responses with JSON content type", async () => {
    window.fetch = mockFetchReturning("application/json")
    render(<App Component={MockPage} pageProps={{}} />)
    await expect(
      window.fetch("/_next/data/abc/search.json")
    ).resolves.toBeDefined()
  })

  it("throws when /_next/data/ returns non-JSON content type", async () => {
    window.fetch = mockFetchReturning("text/html")
    render(<App Component={MockPage} pageProps={{}} />)
    await expect(window.fetch("/_next/data/abc/search.json")).rejects.toThrow(
      "Non-JSON response for data route"
    )
  })

  it("does not throw for non-JSON responses from non-data URLs bc whatever", async () => {
    window.fetch = mockFetchReturning("text/html")
    render(<App Component={MockPage} pageProps={{}} />)
    await expect(window.fetch("/api/search?q=test")).resolves.toBeDefined()
  })

  it("restores the original fetch on unmount", () => {
    const mockFetch = jest.fn()
    window.fetch = mockFetch
    const { unmount } = render(<App Component={MockPage} pageProps={{}} />)
    expect(window.fetch).not.toBe(mockFetch)
    unmount()
    expect(window.fetch).toBe(mockFetch)
  })
})
