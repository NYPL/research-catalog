export const searchResultPartnerSource = {
  "@context":
    "http://discovery-api-qa.nypl.org/api/v0.1/discovery/context_all.jsonld",
  "@type": ["nypl:Item", "nypl:Resource"],
  "@id": "res:cb15294890",
  buildingLocationIds: ["rc"],
  carrierType: [
    {
      "@id": "carriertypes:nc",
      prefLabel: "volume",
    },
  ],
  contributorLiteral: [
    "Leemans, Koen",
    "Ilegems, Danny",
    "Verherstraeten, Tim",
    "Cultuurcentrum Mechelen",
    "De Garage (Art gallery : Mechelen, Belgium)",
  ],
  contributorsDisplay: [
    {
      display: "Leemans, Koen, writer of added commentary",
      "@value": "Leemans, Koen",
    },
    {
      display: "Ilegems, Danny, writer of added commentary",
      "@value": "Ilegems, Danny",
    },
    {
      display: "Verherstraeten, Tim, writer of added commentary",
      "@value": "Verherstraeten, Tim",
    },
    {
      display: "Cultuurcentrum Mechelen, host institution",
      "@value": "Cultuurcentrum Mechelen",
    },
    {
      display: "De Garage (Art gallery : Mechelen, Belgium), host institution",
      "@value": "De Garage (Art gallery : Mechelen, Belgium)",
    },
  ],
  createdString: ["2020"],
  createdYear: 2020,
  creatorLiteral: ["Beukelaer, Sergio de, 1971-"],
  creatorsDisplay: [
    {
      display: "Beukelaer, Sergio de, 1971-, artist",
      "@value": "Beukelaer, Sergio de, 1971-",
    },
  ],
  dateStartYear: 2020,
  dateString: ["2020"],
  dates: [
    {
      range: {
        lt: "2021",
        gte: "2020",
      },
      raw: "210204s2020    be a     c    000 0 eng d",
      tag: "s",
    },
  ],
  dimensions: ["30 cm"],
  extent: ["321 pages : chiefly color illustrations ;"],
  idIsbn: ["9789077207765", "9077207767"],
  idOclc: ["on1231708012", "1231708012", "SCSB-13596972"],
  identifier: [
    {
      "@type": "nypl:Bnumber",
      "@value": "15294890",
    },
    {
      "@type": "bf:Isbn",
      "@value": "9789077207765",
    },
    {
      "@type": "bf:Isbn",
      "@value": "9077207767",
    },
    {
      "@type": "nypl:Oclc",
      "@value": "on1231708012",
    },
    {
      "@type": "nypl:Oclc",
      "@value": "1231708012",
    },
    {
      "@type": "nypl:Oclc",
      "@value": "SCSB-13596972",
    },
    {
      "@type": "bf:Identifier",
      "@value": "(OCoLC)on1231708012",
    },
    {
      "@type": "bf:Identifier",
      "@value": "(OCoLC)1231708012",
    },
  ],
  issuance: [
    {
      "@id": "urn:biblevel:m",
      prefLabel: "monograph/item",
    },
  ],
  itemAggregations: [
    {
      "@type": "nypl:Aggregation",
      "@id": "res:location",
      id: "location",
      field: "location",
      values: [],
    },
    {
      "@type": "nypl:Aggregation",
      "@id": "res:format",
      id: "format",
      field: "format",
      values: [
        {
          value: "Book/text",
          count: 1,
          label: "Book/text",
        },
      ],
    },
    {
      "@type": "nypl:Aggregation",
      "@id": "res:status",
      id: "status",
      field: "status",
      values: [
        {
          value: "status:na",
          count: 1,
          label: "Not available",
        },
      ],
    },
  ],
  items: [
    {
      "@id": "res:ci9934515",
      "@type": ["bf:Item"],
      accessMessage: [
        {
          "@id": "accessMessage:1",
          prefLabel: "Use in library",
        },
      ],
      catalogItemType: [
        {
          "@id": "catalogItemType:1",
          prefLabel: "non-circ",
        },
      ],
      eddFulfillment: {
        "@id": "fulfillment:recap-edd",
      },
      eddRequestable: true,
      formatLiteral: ["Book/text"],
      idBarcode: ["AR02786060"],
      identifier: [
        {
          "@type": "bf:ShelfMark",
          "@value": "N6973.B458 A4 2020g",
        },
        {
          "@type": "bf:Barcode",
          "@value": "AR02786060",
        },
      ],
      owner: [
        {
          "@id": "orgs:0002",
          prefLabel: "Columbia University Libraries",
        },
      ],
      physFulfillment: {
        "@id": "fulfillment:recap-offsite",
      },
      physRequestable: true,
      physicalLocation: ["N6973.B458 A4 2020g"],
      recapCustomerCode: ["AR"],
      requestable: [true],
      shelfMark: ["N6973.B458 A4 2020g"],
      specRequestable: false,
      status: [
        {
          "@id": "status:na",
          prefLabel: "Not available",
        },
      ],
      uri: "ci9934515",
      idNyplSourceId: {
        "@type": "RecapCul",
        "@value": "9934515",
      },
    },
  ],
  language: [
    {
      "@id": "lang:eng",
      prefLabel: "English",
    },
  ],
  lccClassification: ["N6973.B458 A4 2020"],
  materialType: [
    {
      "@id": "resourcetypes:txt",
      prefLabel: "Text",
    },
  ],
  mediaType: [
    {
      "@id": "mediatypes:n",
      prefLabel: "unmediated",
    },
  ],
  note: [
    {
      noteType: "Note",
      "@type": "bf:Note",
      prefLabel:
        '"Text by Koen Leemans, Danny Ilegems, Tim Verherstraeten"--Colophon.',
    },
  ],
  numCheckinCardItems: 0,
  numElectronicResources: 0,
  numItemDatesParsed: 0,
  numItemVolumesParsed: 0,
  numItemsMatched: 1,
  numItemsTotal: 1,
  nyplSource: ["recap-cul"],
  parallelContributorLiteral: [null, null, null, null, null],
  parallelContributorsDisplay: [],
  parallelCreatorLiteral: [null],
  parallelCreatorsDisplay: [],
  parallelSeriesAddedEntry: [],
  parallelSeriesAddedEntryDisplay: [],
  parallelSubjectLiteral: [],
  physicalDescription: ["321 pages : chiefly color illustrations ; 30 cm"],
  placeOfPublication: ["[Antwerpen]"],
  publicationStatement: [
    "[Antwerpen] : Stockmans Art Books in collaboration with Plus-One Gallery and De Garage, [2020]",
  ],
  publisherLiteral: [
    "Stockmans Art Books in collaboration with Plus-One Gallery and De Garage",
  ],
  seriesAddedEntry: [],
  seriesAddedEntryDisplay: [],
  shelfMark: [],
  subjectLiteral: ["Beukelaer, Sergio de, 1971- -- Exhibitions."],
  summary: [
    "On the occasion of Sergio De Beukelaer's solo exhibition at Cultuurcentrum Mechelen / De Garage, opening October 30, Stockmans Art Books publishes the first monography of SDB, as an artist's book. This publication will encompass the 25 year career of the artist, insight in the restless mind of the artist. A unique multiple (edition of 12) is made to accompany the special edition of the book. Exhibition: Cultuurcentrum Mechelen / De Garage, Mechelen, Belgium (01.12.2020 - 21.03.2021).",
  ],
  title: ["(Cat.)"],
  titleAlt: ["Works.", "(Cat.) (colophon.)", "Sergio de Beukelaer"],
  titleDisplay: ["(Cat.) / Sergio de Beukelaer."],
  type: ["nypl:Item"],
  uniformTitle: ["Works. Selections"],
  updatedAt: 1779421250887,
  uri: "cb15294890",
  updatedAtDate: "2026-05-22T03:40:50.887Z",
  hasItemVolumes: false,
  hasItemDates: false,
  collection: [],
  format: [
    {
      "@id": "a",
      prefLabel: "Book/text",
    },
  ],
  electronicResources: [],
}
