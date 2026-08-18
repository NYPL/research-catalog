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
  it("fetches valid search and aggregation results (no filters)", async () => {
    mockClient.get.mockResolvedValueOnce({
      itemListElement: [{}, {}, {}, {}],
      totalResults: 4,
      aggregations: {
        itemListElement: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
      },
    })

    const response = (await fetchSearchResults({
      q: "cat",
    })) as SearchResultsResponse

    expect(response.results.totalResults).toBe(4)
    expect(response.results.itemListElement.length).toBe(4)
    expect(response.aggregations.itemListElement.length).toBe(10)
  })

  it("normalizes aggregations when returned as array (with filters)", async () => {
    const aggsArray = [{}, {}, {}, {}, {}]
    mockClient.get.mockResolvedValueOnce({
      itemListElement: [{}, {}],
      totalResults: 2,
      aggregations: aggsArray,
    })

    const response = (await fetchSearchResults({
      q: "cat",
      filters: { language: ["lang:eng"] },
    })) as SearchResultsResponse

    expect(response.aggregations.itemListElement).toEqual(aggsArray)
  })

  it("returns 500 if the API call fails", async () => {
    mockClient.get.mockResolvedValueOnce({
      status: 500,
      name: "IndexConnectionError",
      error: "No connection",
    })

    const response = await fetchSearchResults({ q: "cat" })
    expect(response).toEqual({
      status: 500,
      name: "IndexConnectionError",
      error: expect.stringContaining("No connection"),
    })
    expect(logger.error).toHaveBeenCalledWith(
      "Error in fetchSearchResults: IndexConnectionError No connection Request: search ?q=cat&per_page=50&include_aggregations=true"
    )
  })

  it("returns 422 query syntax error", async () => {
    mockClient.get.mockResolvedValueOnce({
      status: 422,
      name: "InvalidQuerySyntaxError",
      error: "Unknown parsing or whatever",
    })

    const response = await fetchSearchResults({ q: "cat" })
    expect(response).toEqual({
      status: 422,
      name: "InvalidQuerySyntaxError",
      error: "Unknown parsing or whatever",
    })
    expect(logger.error).toHaveBeenCalledWith(
      "Error in fetchSearchResults: InvalidQuerySyntaxError Unknown parsing or whatever Request: search ?q=cat&per_page=50&include_aggregations=true"
    )
  })

  it("handles 422 response from results", async () => {
    mockClient.get.mockResolvedValueOnce({
      status: 422,
      error: "Invalid query",
    })

    const response = await fetchSearchResults({ q: "!!!" })
    expect(response).toEqual({
      status: 422,
      error: "Invalid query",
    })
    expect(logger.error).toHaveBeenCalledWith(
      "Error in fetchSearchResults: Invalid query Request: search ?q=!!!&per_page=50&include_aggregations=true"
    )
  })

  it("handles valid response but no results", async () => {
    mockClient.get.mockResolvedValueOnce({
      totalResults: 0,
      itemListElement: [],
      aggregations: { itemListElement: [] },
    })

    const response = await fetchSearchResults({ q: "empty" })
    expect(response).toEqual({
      status: 404,
      error:
        "No results found for search ?q=empty&per_page=50&include_aggregations=true",
    })
  })
})
