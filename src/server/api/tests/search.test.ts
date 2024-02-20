import { fetchResults } from "../search"
import type { SearchResultsResponse } from "../../../types/searchTypes"

jest.mock("../../nyplApiClient", () => {
  return jest
    .fn()
    .mockImplementationOnce(async () => {
      return await new Promise((resolve) => {
        resolve({
          get: jest
            .fn()
            .mockResolvedValueOnce({
              itemListElement: [{}, {}, {}, {}],
              totalResults: 4,
            })
            .mockResolvedValueOnce({
              itemListElement: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
              totalResults: 4,
            }),
        })
      })
    })
    .mockImplementationOnce(async () => {
      return await new Promise((resolve) => {
        resolve({
          get: jest.fn().mockResolvedValueOnce({
            totalWorks: 1,
            works: [{}],
          }),
        })
      })
    })
    .mockImplementationOnce(async () => {
      return await new Promise((resolve) => {
        resolve({
          get: () => {
            throw new Error("Bad API URL")
          },
        })
      })
    })
})

describe("fetchResults", () => {
  it("should search results return data from Discovery API", async () => {
    const searchResults = (await fetchResults({
      q: "cat",
    })) as SearchResultsResponse

    expect(searchResults.results.totalResults).toEqual(4)
    expect(searchResults.results.itemListElement.length).toEqual(4)

    expect(searchResults.aggregations.totalResults).toEqual(4)
    expect(searchResults.aggregations.itemListElement.length).toEqual(10)

    expect(searchResults.drbResults.totalWorks).toEqual(1)
    expect(searchResults.drbResults.works.length).toEqual(1)
  })

  // Intentionally throw an error from the NYPLApiClient
  it("should throw an error if there was one", async () => {
    await expect(
      async () => (await fetchResults({ q: "cat" })) as SearchResultsResponse
    ).rejects.toThrow("Bad API URL")
  })
})
