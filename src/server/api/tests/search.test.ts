import { fetchSearchResults } from "../search"
import type { SearchResultsResponse } from "../../../types/searchTypes"

jest.mock("../../nyplApiClient")
import nyplApiClient from "../../nyplApiClient"

const mockClient = {
  get: jest.fn(),
}

jest.mock("@nypl/node-utils", () => ({
  logger: {
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  },
}))
import { logger } from "@nypl/node-utils"

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
      .mockResolvedValueOnce({
        status: 500,
        name: "IndexConnectionError",
        error: "No connection",
      })
      .mockResolvedValueOnce({
        itemListElement: [],
        totalResults: 0,
      })

    const response = await fetchSearchResults({ q: "cat" })
    expect(response).toEqual({
      status: 500,
      name: "IndexConnectionError",
      error: expect.stringContaining("No connection"),
    })
    expect(logger.error).toHaveBeenCalledWith(
      "Error in fetchSearchResults: IndexConnectionError No connection Requests: search ?q=cat&per_page=50, aggregations /aggregations?q=cat"
    )
  })

  it("returns 422 query syntax error", async () => {
    mockClient.get
      .mockResolvedValueOnce({
        status: 422,
        name: "InvalidQuerySyntaxError",
        error: "Unknown parsing or whatever",
      })
      .mockResolvedValueOnce({
        itemListElement: [],
        totalResults: 0,
      })

    const response = await fetchSearchResults({ q: "cat" })
    expect(response).toEqual({
      status: 422,
      name: "InvalidQuerySyntaxError",
      error: "Unknown parsing or whatever",
    })
    expect(logger.error).toHaveBeenCalledWith(
      "Error in fetchSearchResults: InvalidQuerySyntaxError Unknown parsing or whatever Requests: search ?q=cat&per_page=50, aggregations /aggregations?q=cat"
    )
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
    expect(logger.error).toHaveBeenCalledWith(
      "Error in fetchSearchResults: Invalid query Requests: search ?q=!!!&per_page=50, aggregations /aggregations?q=!!!"
    )
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
