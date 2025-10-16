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

  it("returns 500 if the client fails to initialize", async () => {
    ;(nyplApiClient as jest.Mock).mockImplementationOnce(() => {
      throw new Error("Bad API URL")
    })

    const response = await fetchSearchResults({ q: "cat" })
    expect(response).toEqual({ status: 500, message: "Bad API URL" })
  })

  it("returns 500 if results API call fails", async () => {
    mockClient.get
      .mockRejectedValueOnce(new Error("Results error"))
      .mockResolvedValueOnce({
        itemListElement: [],
        totalResults: 0,
      })

    const response = await fetchSearchResults({ q: "cat" })
    expect(response).toEqual({
      status: 500,
      message: expect.stringContaining("Results error"),
    })
  })

  it("returns 500 if aggregations API call fails", async () => {
    mockClient.get
      .mockResolvedValueOnce({
        itemListElement: [{}, {}, {}, {}],
        totalResults: 4,
      })
      .mockRejectedValueOnce(new Error("Aggregations error"))

    const response = await fetchSearchResults({ q: "cat" })
    expect(response).toEqual({
      status: 500,
      message: expect.stringContaining("Aggregations error"),
    })
  })

  it("handles 422 response from results", async () => {
    mockClient.get
      .mockResolvedValueOnce({
        status: 422,
        message: "Invalid query",
      })
      .mockResolvedValueOnce({
        itemListElement: [],
        totalResults: 0,
      })

    const response = await fetchSearchResults({ q: "!!!" })
    expect(response).toEqual({ status: 422, message: "Invalid query" })
  })

  it("handles 404 response from results", async () => {
    mockClient.get
      .mockResolvedValueOnce({
        status: 404,
        message: "Not found",
      })
      .mockResolvedValueOnce({
        itemListElement: [],
        totalResults: 0,
      })

    const response = await fetchSearchResults({ q: "unknown" })
    expect(response).toEqual({ status: 404, message: "Not found" })
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
    expect(response).toEqual({ status: 404, message: "No results found" })
  })
})
