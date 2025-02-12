import { fetchBib } from "../bib"
import type { BibResponse } from "../../../types/bibTypes"

jest.mock("../../nyplApiClient", () => {
  return jest
    .fn()
    .mockImplementationOnce(async () => {
      return await new Promise((resolve) => {
        resolve({
          get: jest
            .fn()
            .mockResolvedValueOnce({
              items: [{}],
              numItemsTotal: 1,
              title: ["Cats cats cats cats cats."],
              uri: "b17418167",
            })
            .mockResolvedValueOnce({
              bib: {
                id: "17418167",
                nyplSource: "sierra-nypl",
                fields: [{}, {}, {}, {}, {}, {}, {}],
              },
            }),
        })
      })
    })
    .mockImplementationOnce(async () => {
      return await new Promise((resolve) => {
        resolve({
          get: jest
            .fn()
            .mockResolvedValueOnce({
              items: [{}],
              numItemsTotal: 1,
              title: ["Cats cats cats cats cats."],
              uri: "b17418167",
            })
            .mockResolvedValueOnce({
              bib: {
                id: "17418167",
                nyplSource: "sierra-nypl",
                fields: [{}, {}, {}, {}, {}, {}, {}],
              },
            }),
        })
      })
    })
    .mockImplementationOnce(async () => {
      return await new Promise((resolve) => {
        resolve({
          get: jest
            .fn()
            .mockResolvedValueOnce({
              items: [{}],
              numItemsTotal: 1,
              title: ["Cats cats cats cats cats."],
              titleDisplay: [
                "Cats cats cats cats cats. Drawing and design by Bill Sokol.",
              ],
            })
            .mockResolvedValueOnce({
              bib: {
                id: "17418167",
                nyplSource: "sierra-nypl",
                fields: [{}, {}, {}, {}, {}, {}, {}],
              },
            })
            .mockResolvedValueOnce({
              statusCode: 200,
            }),
        })
      })
    })
    .mockImplementationOnce(async () => {
      return await new Promise((resolve) => {
        resolve({
          get: jest
            .fn()
            .mockResolvedValueOnce({
              items: [{}],
              numItemsTotal: 1,
              title: ["Cats cats cats cats cats."],
            })
            .mockResolvedValueOnce({
              bib: {
                id: "17418167",
                nyplSource: "sierra-nypl",
                fields: [{}, {}, {}, {}, {}, {}, {}],
              },
            })
            .mockResolvedValueOnce({
              statusCode: 404,
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
    .mockImplementationOnce(async () => {
      return await new Promise((resolve) => {
        resolve({
          get: jest
            .fn()
            .mockResolvedValueOnce({
              items: Array(20).fill({}),
              numItemsTotal: 25,
              numItemsMatched: 25,
              uri: "b17418167",
            })
            .mockResolvedValueOnce({
              items: Array(20).fill({}),
            })
            .mockResolvedValueOnce({
              items: Array(5).fill({}),
            }),
        })
      })
    })
    .mockImplementationOnce(async () => {
      return await new Promise((resolve) => {
        resolve({
          get: jest
            .fn()
            .mockResolvedValueOnce({
              items: Array(20).fill({}),
              status: 200,
            })
            .mockResolvedValueOnce({
              items: Array(5).fill({}),
              status: 200,
            }),
        })
      })
    })
    .mockImplementationOnce(async () => {
      return await new Promise((resolve) => {
        resolve({
          get: jest
            .fn()
            .mockResolvedValueOnce({
              items: Array(20).fill({}),
              numItemsTotal: 25,
              numItemsMatched: 25,
              uri: "b17418167",
            })
            .mockResolvedValueOnce({
              items: Array(20).fill({}),
            })
            .mockResolvedValueOnce({
              items: Array(5).fill({}),
            }),
        })
      })
    })
    .mockImplementationOnce(async () => {
      return await new Promise((resolve) => {
        resolve({
          get: () => {
            throw new Error(
              "There was en error fetching items in one of the batches"
            )
          },
        })
      })
    })
})

describe("fetchBib", () => {
  it("should return bib and annotated data with 200 status code when uri is present", async () => {
    const bibResponse = (await fetchBib("b17418167")) as BibResponse
    expect(bibResponse.discoveryBibResult.numItemsTotal).toEqual(1)
    expect(bibResponse.discoveryBibResult.title).toEqual([
      "Cats cats cats cats cats.",
    ])

    expect(bibResponse.annotatedMarc.id).toEqual("17418167")
    expect(bibResponse.annotatedMarc.fields.length).toEqual(7)

    expect(bibResponse.status).toEqual(200)
  })

  it("should accept an optional item id", async () => {
    const bibResponse = (await fetchBib(
      "b17418167",
      {},
      "i22253043"
    )) as BibResponse
    expect(bibResponse.discoveryBibResult.numItemsTotal).toEqual(1)
    expect(bibResponse.discoveryBibResult.title).toEqual([
      "Cats cats cats cats cats.",
    ])

    expect(bibResponse.annotatedMarc.id).toEqual("17418167")
    expect(bibResponse.annotatedMarc.fields.length).toEqual(7)

    expect(bibResponse.status).toEqual(200)
  })

  it("should redirect when uri is not present and sierra call responds with 200 status", async () => {
    const bibResponse = (await fetchBib("b17418167")) as BibResponse

    expect(bibResponse.status).toEqual(307)
    expect(bibResponse.redirectUrl).toEqual(
      "https://borrow.nypl.org/search/card?recordId=17418167"
    )
  })

  it("should respond with a 404 status when uri is not present and sierra call responds with a non-200 status", async () => {
    const bibResponse = (await fetchBib("b17418167")) as BibResponse

    expect(bibResponse.status).toEqual(404)
  })

  it("should redirect to standardized ID page when id is non-standard", async () => {
    const bibResponse = (await fetchBib("B17418167")) as BibResponse
    expect(bibResponse.status).toEqual(307)
  })

  // Intentionally throw an error from the NYPLApiClient
  it("should throw an error if there was one", async () => {
    await expect(
      async () => (await fetchBib("b17418167")) as BibResponse
    ).rejects.toThrow("Bad API URL")
  })
})
