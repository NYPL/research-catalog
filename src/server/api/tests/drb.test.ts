import { fetchDRBResults } from "../drb"
import type { DRBResults } from "../../../types/drbTypes"

jest.mock("../../nyplApiClient", () => {
  return jest
    .fn()
    .mockImplementationOnce(async () => {
      return await new Promise((resolve) => {
        resolve({
          get: () => {
            return new Promise((resolve) => {
              resolve({
                data: {
                  works: [
                    {
                      authors: [
                        {
                          lcnaf: "",
                          name: "Reighard, Jacob (1861-)",
                          primary: "true",
                          viaf: "",
                        },
                      ],
                      editions: [],
                      languages: [
                        {
                          iso_2: null,
                          iso_3: "und",
                          language: "Undetermined",
                        },
                        {
                          iso_2: "en",
                          iso_3: "eng",
                          language: "English",
                        },
                      ],
                      title: "Anatomy of the cat",
                      uuid: "84306f57-3285-403a-bff4-3d8286d98183",
                    },
                    {
                      authors: [
                        {
                          lcnaf: "",
                          name: "Reighard, Jacob, (1861-1942.)",
                          primary: "true",
                          viaf: "",
                        },
                      ],
                      editions: [],
                      languages: [
                        {
                          iso_2: "en",
                          iso_3: "eng",
                          language: "English",
                        },
                        {
                          iso_2: null,
                          iso_3: "und",
                          language: "Undetermined",
                        },
                      ],
                      title: "Anatomy of the cat",
                      uuid: "a724ea94-bc62-4460-85b7-312cb4b51fb9",
                    },
                  ],
                  totalWorks: 520,
                },
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

describe("fetchDRBResults", () => {
  it("should return data from DRB", async () => {
    const drbResults = (await fetchDRBResults({ q: "cat" })) as DRBResults

    expect(drbResults.works.length).toEqual(2)
    expect(drbResults.totalWorks).toEqual(520)
  })

  // Intentionally throw an error from the NYPLApiClient
  it("should throw an error if there was one", async () => {
    await expect(
      async () => (await fetchDRBResults({ q: "cat" })) as DRBResults
    ).rejects.toThrow("Error: Bad API URL")
  })
})
