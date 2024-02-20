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
              creatorLiteral: ["De Regniers, Beatrice Schenk."],
              dateStartYear: 1958,
              dimensions: ["31 cm."],
              electronicResources: [],
              extent: ["1 v. (unpaged) illus."],
              identifier: [
                { "@type": "nypl:Bnumber", "@value": "17418167" },
                { "@type": "nypl:Oclc", "@value": "1662173" },
                { "@type": "bf:Lccn", "@value": "57013360" },
              ],
              issuance: [
                { "@id": "urn:biblevel:m", prefLabel: "monograph/item" },
              ],
              items: [
                {
                  "@id": "res:i22253043",
                  "@type": [Array],
                  accessMessage: [Array],
                  catalogItemType: [Array],
                  eddRequestable: true,
                  formatLiteral: [Array],
                  holdingLocation: [Array],
                  idBarcode: [Array],
                  identifier: [Array],
                  m2CustomerCode: [Array],
                  physRequestable: true,
                  physicalLocation: [Array],
                  requestable: [Array],
                  shelfMark: [Array],
                  specRequestable: false,
                  status: [Array],
                  uri: "i22253043",
                  idNyplSourceId: [Object],
                },
              ],
              numItemsTotal: 1,
              title: ["Cats cats cats cats cats."],
              titleDisplay: [
                "Cats cats cats cats cats. Drawing and design by Bill Sokol.",
              ],
              uri: "b17418167",
            })
            .mockResolvedValueOnce({
              bib: {
                id: "17418167",
                nyplSource: "sierra-nypl",
                fields: [
                  { label: "Author", values: [[]] },
                  { label: "Title", values: [[]] },
                  { label: "Imprint", values: [[]] },
                  { label: "Edition", values: [[]] },
                  { label: "Description", values: [[]] },
                  { label: "LCCN", values: [[]] },
                  { label: "Branch Call Number", values: [[]] },
                ],
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
              creatorLiteral: ["De Regniers, Beatrice Schenk."],
              dateStartYear: 1958,
              dimensions: ["31 cm."],
              electronicResources: [],
              extent: ["1 v. (unpaged) illus."],
              identifier: [
                { "@type": "nypl:Bnumber", "@value": "17418167" },
                { "@type": "nypl:Oclc", "@value": "1662173" },
                { "@type": "bf:Lccn", "@value": "57013360" },
              ],
              issuance: [
                { "@id": "urn:biblevel:m", prefLabel: "monograph/item" },
              ],
              items: [
                {
                  "@id": "res:i22253043",
                  "@type": [Array],
                  accessMessage: [Array],
                  catalogItemType: [Array],
                  eddRequestable: true,
                  formatLiteral: [Array],
                  holdingLocation: [Array],
                  idBarcode: [Array],
                  identifier: [Array],
                  m2CustomerCode: [Array],
                  physRequestable: true,
                  physicalLocation: [Array],
                  requestable: [Array],
                  shelfMark: [Array],
                  specRequestable: false,
                  status: [Array],
                  uri: "i22253043",
                  idNyplSourceId: [Object],
                },
              ],
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
                fields: [
                  { label: "Author", values: [[]] },
                  { label: "Title", values: [[]] },
                  { label: "Imprint", values: [[]] },
                  { label: "Edition", values: [[]] },
                  { label: "Description", values: [[]] },
                  { label: "LCCN", values: [[]] },
                  { label: "Branch Call Number", values: [[]] },
                ],
              },
            })
            .mockResolvedValueOnce({
              statusCode: 200,
            }),
        })
      })
    })
})

describe("fetchBib", () => {
  it("should return bib and annotated data with 200 status code when uri is present", async () => {
    const bibResponse = (await fetchBib("b17418167", {})) as BibResponse
    expect(bibResponse.bib.numItemsTotal).toEqual(1)
    expect(bibResponse.bib.title).toEqual(["Cats cats cats cats cats."])

    expect(bibResponse.annotatedMarc.id).toEqual("17418167")
    expect(bibResponse.annotatedMarc.fields.length).toEqual(7)

    expect(bibResponse.status).toEqual(200)
  })

  it("should redirect when uri is not present and sierra call responds with 200 status", async () => {
    const bibResponse = (await fetchBib("b17418167", {})) as BibResponse

    expect(bibResponse.status).toEqual(307)
    expect(bibResponse.redirectUrl).toEqual(
      "https://nypl.na2.iiivega.com//iii/encore/record/C__Rb17418167"
    )
  })

  // Intentionally throw an error from the NYPLApiClient
  // it("should throw an error if there was one", async () => {
  //   await expect(
  //     async () => (await fetchResults({ q: "cat" })) as SearchResultsResponse
  //   ).rejects.toThrow("Bad API URL")
  // })
})
