import { fetchBib } from "../bib"
import type { BibResponse } from "../../../types/bibTypes"

jest.mock("../../nyplApiClient")
import nyplApiClient from "../../nyplApiClient"

const mockClient = {
  get: jest.fn(),
}

const mockBibResponse = (overrides = {}) => ({
  items: [{}],
  numItemsTotal: 1,
  title: ["Cats cats cats cats cats."],
  uri: "b17418167",
  ...overrides,
})

const mockAMResponse = (overrides = {}) => ({
  bib: {
    id: "17418167",
    nyplSource: "sierra-nypl",
    fields: Array(7).fill({}),
  },
  ...overrides,
})

describe("fetchBib", () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(nyplApiClient as jest.Mock).mockResolvedValue(mockClient)
  })

  it("returns bib and annotated data with 200 status when URI is present", async () => {
    mockClient.get
      .mockResolvedValueOnce(mockBibResponse())
      .mockResolvedValueOnce(mockAMResponse())

    const bibResponse = (await fetchBib("b17418167")) as BibResponse

    expect(bibResponse.discoveryBibResult.numItemsTotal).toBe(1)
    expect(bibResponse.discoveryBibResult.title).toEqual([
      "Cats cats cats cats cats.",
    ])
    expect(bibResponse.annotatedMarc.id).toBe("17418167")
    expect(bibResponse.annotatedMarc.fields.length).toBe(7)
    expect(bibResponse.status).toBe(200)
  })

  it("accepts an optional item id", async () => {
    mockClient.get
      .mockResolvedValueOnce(mockBibResponse())
      .mockResolvedValueOnce(mockAMResponse())

    const bibResponse = (await fetchBib(
      "b17418167",
      {},
      "i22253043"
    )) as BibResponse

    expect(bibResponse.discoveryBibResult.numItemsTotal).toBe(1)
    expect(bibResponse.status).toBe(200)
  })

  it("redirects when URI is missing but Sierra call is 200", async () => {
    mockClient.get
      .mockResolvedValueOnce(
        mockBibResponse({ uri: undefined, titleDisplay: ["Some title"] })
      )
      .mockResolvedValueOnce(mockAMResponse())
      .mockResolvedValueOnce({ statusCode: 200 })

    const bibResponse = (await fetchBib("b17418167")) as BibResponse

    expect(bibResponse.status).toBe(307)
    expect(bibResponse.redirectUrl).toBe(
      "https://borrow.nypl.org/search/card?recordId=17418167"
    )
  })

  it("responds with 404 when bib not found and Sierra call fails", async () => {
    mockClient.get
      // Bib
      .mockResolvedValueOnce({
        status: 404,
        name: "NotFoundError",
        error: "Record not found",
      })
      // AM
      .mockResolvedValueOnce({
        status: 404,
        name: "NotFoundError",
        error: "Record not found",
      })
      // Sierra
      .mockResolvedValueOnce({ detail: "Bib with id not found." })

    const bibResponse = (await fetchBib("b17418167")) as BibResponse

    expect(bibResponse.status).toBe(404)
  })

  it("redirects to standardized ID page when ID is non-standard", async () => {
    mockClient.get
      .mockResolvedValueOnce(mockBibResponse())
      .mockResolvedValueOnce(mockAMResponse())

    const bibResponse = (await fetchBib("B17418167")) as BibResponse

    expect(bibResponse.status).toBe(307)
  })
})
