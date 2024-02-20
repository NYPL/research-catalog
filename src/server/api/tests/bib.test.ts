import { fetchBib } from "../bib"
import type { BibResponse } from "../../../types/bibTypes"

jest.mock("../../nyplApiClient", () => {
  return jest.fn().mockImplementationOnce(async () => {
    return await new Promise((resolve) => {
      resolve({
        get: jest
          .fn()
          .mockResolvedValueOnce({
            "@context":
              "http://discovery-api-qa.us-east-1.elasticbeanstalk.com/api/v0.1/discovery/context_all.jsonld",
            "@type": ["nypl:Item", "nypl:Resource"],
            "@id": "res:b17418167",
            carrierType: [{ "@id": "carriertypes:nc", prefLabel: "volume" }],
            createdString: ["1958"],
            createdYear: 1958,
            creatorLiteral: ["De Regniers, Beatrice Schenk."],
            dateStartYear: 1958,
            dateString: ["1958"],
            dimensions: ["31 cm."],
            electronicResources: [],
            extent: ["1 v. (unpaged) illus."],
            idLccn: ["57013360"],
            idOclc: ["1662173"],
            identifier: [
              { "@type": "nypl:Bnumber", "@value": "17418167" },
              { "@type": "nypl:Oclc", "@value": "1662173" },
              { "@type": "bf:Lccn", "@value": "57013360" },
            ],
            issuance: [
              { "@id": "urn:biblevel:m", prefLabel: "monograph/item" },
            ],
            itemAggregations: [
              {
                "@type": "nypl:Aggregation",
                "@id": "res:location",
                id: "location",
                field: "location",
                values: [Array],
              },
              {
                "@type": "nypl:Aggregation",
                "@id": "res:format",
                id: "format",
                field: "format",
                values: [Array],
              },
              {
                "@type": "nypl:Aggregation",
                "@id": "res:status",
                id: "status",
                field: "status",
                values: [Array],
              },
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
            language: [{ "@id": "lang:eng", prefLabel: "English" }],
            lccClassification: ["PZ10.3.D43 Cat"],
            materialType: [{ "@id": "resourcetypes:txt", prefLabel: "Text" }],
            mediaType: [{ "@id": "mediatypes:n", prefLabel: "unmediated" }],
            numCheckinCardItems: 0,
            numElectronicResources: 0,
            numItemDatesParsed: 0,
            numItemVolumesParsed: 0,
            numItemsMatched: 1,
            numItemsTotal: 1,
            nyplSource: ["sierra-nypl"],
            placeOfPublication: ["New York"],
            publicationStatement: ["New York : Pantheon, [1958]"],
            publisherLiteral: ["Pantheon"],
            title: ["Cats cats cats cats cats."],
            titleDisplay: [
              "Cats cats cats cats cats. Drawing and design by Bill Sokol.",
            ],
            type: ["nypl:Item"],
            updatedAt: 1701467093398,
            uri: "b17418167",
            suppressed: false,
            hasItemVolumes: false,
            hasItemDates: false,
          })
          .mockResolvedValueOnce({
            bib: {
              id: "17418167",
              nyplSource: "sierra-nypl",
              fields: [
                { label: "Author", values: [Array] },
                { label: "Title", values: [Array] },
                { label: "Imprint", values: [Array] },
                { label: "Edition", values: [Array] },
                { label: "Description", values: [Array] },
                { label: "LCCN", values: [Array] },
                { label: "Branch Call Number", values: [Array] },
              ],
            },
          }),
      })
    })
  })
})

describe("fetchBib", () => {
  it("should search results return data from Discovery API", async () => {
    const bibResponse = (await fetchBib("b17418167", {})) as BibResponse
    console.log(bibResponse)
  })

  // Intentionally throw an error from the NYPLApiClient
  // it("should throw an error if there was one", async () => {
  //   await expect(
  //     async () => (await fetchResults({ q: "cat" })) as SearchResultsResponse
  //   ).rejects.toThrow("Bad API URL")
  // })
})
