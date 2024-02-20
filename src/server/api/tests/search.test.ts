import { fetchResults } from "../search"
import type { SearchResultsResponse } from "../../../types/searchTypes"

jest.mock("../../nyplApiClient", () => {
  return jest
    .fn()
    .mockImplementationOnce(async () => {
      return await new Promise((resolve) => {
        resolve({
          get: () => {
            return new Promise((resolve) => {
              resolve({
                data: {},
              })
            })
          },
        })
      })
    })
    .mockImplementationOnce(async () => {
      return await new Promise((resolve) => {
        resolve({
          get: () => {
            return new Promise((resolve) => {
              resolve({
                data: {},
              })
            })
          },
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

    console.log(searchResults)
    // expect(drbResults.works.length).toEqual(2)
    // expect(drbResults.totalWorks).toEqual(520)
  })

  // Intentionally throw an error from the NYPLApiClient
  it("should throw an error if there was one", async () => {
    await expect(
      async () => (await fetchResults({ q: "cat" })) as SearchResultsResponse
    ).rejects.toThrow("Bad API URL")
  })
})
