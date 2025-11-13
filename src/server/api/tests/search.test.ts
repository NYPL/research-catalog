import { fetchSearchResults } from "../search"
import type { SearchResultsResponse } from "../../../types/searchTypes"

jest.mock("../../nyplApiClient")
import nyplApiClient from "../../nyplApiClient"

const mockClient = {
  get: jest.fn(),
}

beforeEach(() => {
  jest.clearAllMocks()
  ;(nyplApiClient as jest.Mock).mockResolvedValue(mockClient)
})

describe("fetchSearchResults", () => {
  it("fetches valid search and aggregation results", async () => {
    mockClient.get
      .mockResolvedValueOnce({
        itemListElement: [{}, {}, {}, {}],
        totalResults: 4,
      })
      .mockResolvedValueOnce({
        itemListElement: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
        totalResults: 4,
      })

    const response = (await fetchSearchResults({
      q: "cat",
    })) as SearchResultsResponse

    expect(response.results.totalResults).toBe(4)
    expect(response.results.itemListElement.length).toBe(4)
    expect(response.aggregations.itemListElement.length).toBe(10)
  })

  it("returns 500 if search results API call fails", async () => {
    mockClient.get
      .mockResolvedValueOnce({ status: 500, error: "No connection" })
      .mockResolvedValueOnce({
        itemListElement: [],
        totalResults: 0,
      })

    const response = await fetchSearchResults({ q: "cat" })
    expect(response).toEqual({
      status: 500,
      error: expect.stringContaining("No connection"),
    })
  })

  it("returns 200 if only aggregations API call fails", async () => {
    mockClient.get
      .mockResolvedValueOnce({
        itemListElement: [{}, {}, {}, {}],
        totalResults: 4,
      })
      .mockResolvedValueOnce({ status: 500, error: "No aggs" })

    const response = await fetchSearchResults({ q: "cat" })
    expect(response.status).toEqual(200)
  })

  it("handles 422 response from results", async () => {
    mockClient.get
      .mockResolvedValueOnce({
        status: 422,
        error: "Invalid query",
      })
      .mockResolvedValueOnce({
        itemListElement: [],
        totalResults: 0,
      })

    const response = await fetchSearchResults({ q: "!!!" })
    expect(response).toEqual({
      status: 422,
      error: "Invalid query",
    })
  })

  it("handles valid response but no results", async () => {
    mockClient.get
      .mockResolvedValueOnce({
        totalResults: 0,
        itemListElement: [],
      })
      .mockResolvedValueOnce({
        totalResults: 0,
        itemListElement: [],
      })

    const response = await fetchSearchResults({ q: "empty" })
    expect(response).toEqual({
      status: 404,
      error:
        "No results found for search ?q=empty&per_page=50, aggregations /aggregations?q=empty",
    })
  })
})
