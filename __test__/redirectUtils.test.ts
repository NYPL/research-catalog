import { getBrowseDestination } from "../src/utils/redirectUtils"

// mock SHEP to browse url mapping
jest.mock("../data/shepToBrowse.json", () => ({
  "/subject_headings/test-exact": "/browse/subjects/Test Exact",
}))

describe("getBrowseDestination", () => {
  it("redirects exact SHEP mapping", () => {
    const url = new URL("http://localhost/subject_headings/test-exact")
    const dest = getBrowseDestination(url)
    expect(dest).toBe("/browse/subjects/Test Exact")
  })

  it("redirects filter query URLs", () => {
    const url = new URL("http://localhost/subject_headings?filter=Bronx+River")
    const dest = getBrowseDestination(url)
    expect(dest).toBe("/browse?q=Bronx%20River&search_scope=starts_with")
  })

  it("redirects UUID with label URLs and adds final period if missing", () => {
    const url = new URL("http://localhost/subject_headings/uuid?label=Emma")
    const dest = getBrowseDestination(url)
    expect(dest).toBe("/browse/subjects/Emma.")
  })

  it("does not add extra period if label ends with a parenthesis", () => {
    const url = new URL(
      "http://localhost/subject_headings/uuid?label=Some Subject (N.Y.)"
    )
    const dest = getBrowseDestination(url)
    expect(dest).toBe("/browse/subjects/Some%20Subject%20(N.Y.)")
  })

  it("catch-all redirect to /browse", () => {
    const url = new URL(
      "http://localhost/subject_headings/unknown-uuid-or-something"
    )
    const dest = getBrowseDestination(url)
    expect(dest).toBe("/browse")
  })

  it("works with + and %20 in query parameters", () => {
    const url1 = new URL(
      "http://localhost/subject_headings?filter=Jewish+Cooking"
    )
    const url2 = new URL(
      "http://localhost/subject_headings?filter=Jewish%20Cooking"
    )
    expect(getBrowseDestination(url1)).toBe(
      "/browse?q=Jewish%20Cooking&search_scope=starts_with"
    )
    expect(getBrowseDestination(url2)).toBe(
      "/browse?q=Jewish%20Cooking&search_scope=starts_with"
    )
  })
})
