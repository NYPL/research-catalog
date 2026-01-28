export const physicalDescriptionBib = {
  "@context":
    "http://discovery-api-qa.nypl.org/api/v0.1/discovery/context_all.jsonld",
  "@type": ["nypl:Item", "nypl:Resource"],
  "@id": "res:b10118017",
  buildingLocationIds: ["pa"],
  carrierType: [
    {
      "@id": "carriertypes:nc",
      prefLabel: "volume",
    },
  ],
  contributorLiteral: ["Kavenoki, Severin"],
  createdString: ["1935"],
  createdYear: 1935,
  creatorLiteral: ["Copley, Richard"],
  dateEndString: ["1939"],
  dateEndYear: 1939,
  dateStartYear: 1935,
  dateString: ["1935"],
  dates: [
    {
      range: {
        lt: "1936",
        gte: "1935",
      },
      raw: "731024q19351939nyu                 eng dcpcIia",
      tag: "q",
    },
    {
      range: {
        lt: "1940",
        gte: "1939",
      },
      raw: "731024q19351939nyu                 eng dcpcIia",
      tag: "q",
    },
  ],
  description: [
    "Typescript reproduction of press releases by Richard Copley intended to be distributed to concert managers and press as publicity for concerts of music composed by, played by, or conducted by Igor Stravinsky.",
  ],
  dimensions: ["37 cm"],
  extent: ["13 pages [on 20 leaves] ;"],
  idOclc: ["80535211"],
  identifier: [
    {
      "@type": "bf:ShelfMark",
      "@value": "JOG 73-164",
    },
    {
      "@type": "nypl:Bnumber",
      "@value": "10118017",
    },
    {
      "@type": "nypl:Oclc",
      "@value": "80535211",
    },
    {
      "@type": "bf:Identifier",
      "@value": "(OCoLC)80535211",
    },
  ],
  issuance: [
    {
      "@id": "urn:biblevel:c",
      prefLabel: "collection",
    },
  ],
  itemAggregations: [
    {
      "@type": "nypl:Aggregation",
      "@id": "res:location",
      id: "location",
      field: "location",
      values: [
        {
          value: "loc:pam38",
          count: 1,
          label: "Performing Arts Research Collections - Music",
        },
      ],
    },
    {
      "@type": "nypl:Aggregation",
      "@id": "res:format",
      id: "format",
      field: "format",
      values: [
        {
          value: "Archival Mix",
          count: 1,
          label: "Archival Mix",
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
          value: "status:a",
          count: 1,
          label: "Available",
        },
      ],
    },
  ],
  items: [
    {
      "@id": "res:i14777680",
      "@type": ["bf:Item"],
      accessMessage: [
        {
          "@id": "accessMessage:u",
          prefLabel: "Supervised use",
        },
      ],
      aeonUrl: [
        "https://nypl-aeon-test.aeon.atlas-sys.com/aeon/Aeon.dll?Action=10&Author=Copley%2C+Richard&CallNumber=JOG+73-164&Date=1935&Form=30&Genre=archival+material&ItemInfo1=Supervised+use&ItemInfo3=https%3A%2F%2Fcatalog.nypl.org%2Frecord%3Db10118017&ItemISxN=i147776806&ItemNumber=33433093824898&ItemPlace=New+York&ItemPublisher=Richard+Copley%2C+%5B1935%3F-1939%3F%5D&Location=Performing+Arts+Music+and+Recorded+Sound+Division&ReferenceNumber=b101180172&Site=LPAMR&Title=Press+book+for+Igor+Stravinsky",
      ],
      catalogItemType: [
        {
          "@id": "catalogItemType:21",
          prefLabel: "archival material",
        },
      ],
      eddRequestable: false,
      formatLiteral: ["Archival Mix"],
      holdingLocation: [
        {
          "@id": "loc:pam38",
          prefLabel: "Performing Arts Research Collections - Music",
        },
      ],
      idBarcode: ["33433093824898"],
      identifier: [
        {
          "@type": "bf:ShelfMark",
          "@value": "JOG 73-164",
        },
        {
          "@type": "bf:Barcode",
          "@value": "33433093824898",
        },
      ],
      physRequestable: false,
      physicalLocation: ["JOG 73-164"],
      requestable: [true],
      shelfMark: ["JOG 73-164"],
      specRequestable: true,
      status: [
        {
          "@id": "status:a",
          prefLabel: "Available",
        },
      ],
      uri: "i14777680",
      idNyplSourceId: {
        "@type": "SierraNypl",
        "@value": "14777680",
      },
    },
  ],
  language: [
    {
      "@id": "lang:eng",
      prefLabel: "English",
    },
  ],
  materialType: [
    {
      "@id": "resourcetypes:mix",
      prefLabel: "Mixed material",
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
        '"It is suggested that the enclosed articles, combined as desired, be retyped and filled in as to the date of concert, place, time, etc. before they are submitted to periodicals" -- on page of table of contents.',
    },
    {
      noteType: "Biography",
      "@type": "bf:Note",
      prefLabel:
        "Richard Copley (May 27, 1875-February 27, 1939) was an American concert agent.  He was Igor Stravinsky's New York agent from 1935 until his death. Severin Kavenoki (later: Severin Kaven) was employed by Richard Copley.",
    },
    {
      noteType: "Provenance",
      "@type": "bf:Note",
      prefLabel: "From the collection of Severin Kavenoki.",
    },
  ],
  numCheckinCardItems: 0,
  numElectronicResources: 0,
  numItemDatesParsed: 0,
  numItemVolumesParsed: 0,
  numItemsMatched: 1,
  numItemsTotal: 1,
  nyplSource: ["sierra-nypl"],
  physicalDescription: [
    "13 pages [on 20 leaves] ; 37 cm",
    "another physical description",
  ],
  placeOfPublication: ["New York"],
  publicationStatement: ["New York : Richard Copley, [1935?-1939?]"],
  publisherLiteral: ["Richard Copley"],
  shelfMark: ["JOG 73-164"],
  subjectLiteral: ["Stravinsky, Igor, 1882-1971.", "Press releases."],
  tableOfContents: [
    "Stravinsky comes to America -- Biography of the composer -- Ballet of a poker game -- Stravinsky as a conductor -- Stravinsky as a pianist -- The man Stravinsky -- Stravinsky, a figure in modern art -- Music and controversy -- Stravinsky explains himself -- Stravinsky, at home anywhere -- Stravinsky's laboratory -- Stravinsky finds a collaborator -- Stravinsky and Dushkin.",
  ],
  title: ["Press book for Igor Stravinsky"],
  titleDisplay: ["Press book for Igor Stravinsky / Richard Copley."],
  type: ["nypl:Item"],
  updatedAt: 1765575864350,
  uri: "b10118017",
  updatedAtDate: "2025-12-12T21:44:24.350Z",
  hasItemVolumes: false,
  hasItemDates: false,
  collection: [
    {
      "@id": "pam",
      prefLabel: "Music Division",
      buildingLocationLabel:
        "The New York Public Library for the Performing Arts (LPA)",
    },
  ],
  format: [
    {
      "@id": "p",
      prefLabel: "Archival mix",
    },
  ],
  electronicResources: [],
}

export const princetonRecord = {
  "@context":
    "http://discovery-api-qa.nypl.org/api/v0.1/discovery/context_all.jsonld",
  "@type": ["nypl:Item", "nypl:Resource"],
  "@id": "res:pb2608686",
  buildingLocationIds: [],
  carrierType: [
    {
      "@id": "carriertypes:nc",
      prefLabel: "volume",
    },
  ],
  contributorLiteral: ["Brown, David, journalist, joint author."],
  createdString: ["1943"],
  createdYear: 1943,
  creatorLiteral: ["Wagg, Alfred."],
  dateStartYear: 1943,
  dateString: ["1943"],
  dimensions: ["23 cm."],
  extent: ["231 p."],
  idLccn: ["   44003956  "],
  identifier: [
    {
      "@type": "nypl:Bnumber",
      "@value": "2608686",
    },
    {
      "@type": "bf:Lccn",
      "@value": "   44003956  ",
    },
    {
      "@type": "bf:Identifier",
      "@value": "(OCoLC)ocm02088006",
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
      values: [],
    },
    {
      "@type": "nypl:Aggregation",
      "@id": "res:status",
      id: "status",
      field: "status",
      values: [
        {
          value: "status:a",
          count: 1,
          label: "Available",
        },
      ],
    },
  ],
  items: [
    {
      "@id": "res:pi5153471",
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
      idBarcode: ["32101067443802"],
      identifier: [
        {
          "@type": "bf:ShelfMark",
          "@value": "D763.I8 W3 1943",
        },
        {
          "@type": "bf:Barcode",
          "@value": "32101067443802",
        },
      ],
      idNyplSourceId: {
        "@type": "RecapPul",
        "@value": "25791623",
      },
      owner: [
        {
          "@id": "orgs:0003",
          prefLabel: "Princeton University Library",
        },
      ],
      physFulfillment: {
        "@id": "fulfillment:recap-offsite",
      },
      physRequestable: true,
      requestable: [true],
      shelfMark: ["D763.I8 W3 1943"],
      specRequestable: false,
      status: [
        {
          "@id": "status:na",
          prefLabel: "Not available",
        },
      ],
      uri: "pi5153471",
    },
  ],
  language: [
    {
      "@id": "lang:eng",
      prefLabel: "English",
    },
  ],
  lccClassification: ["D763.I8 W3"],
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
      prefLabel: '"First published in 1943."',
    },
  ],
  numAvailable: 1,
  numItems: 1,
  numItemsMatched: 1,
  numItemsTotal: 1,
  placeOfPublication: ["London,"],
  publicationStatement: ["London, Nicholson & Watson [1943]"],
  publisherLiteral: ["Nicholson & Watson"],
  subjectLiteral: [
    "World War, 1939-1945 -- Campaigns -- Italy.",
    "World War, 1939-1945 -- Naval operations.",
    "World War, 1939-1945 -- Personal narratives.",
  ],
  title: ["No spaghetti for breakfast"],
  titleDisplay: [
    "No spaghetti for breakfast [by] Alfred Wagg and David Brown.",
  ],
  type: ["nypl:Item"],
  updatedAt: 1543536484228,
  uri: "pb2608686",
  updatedAtDate: "2018-11-30T00:08:04.228Z",
  hasItemVolumes: false,
  hasItemDates: false,
  electronicResources: [],
}

export const bibWithItems = {
  resource: {
    "@context":
      "http://discovery-api-production.us-east-1.elasticbeanstalk.com/api/v0.1/discovery/context_all.jsonld",
    "@type": ["nypl:Item", "nypl:Resource"],
    "@id": "res:b15080796",
    carrierType: [
      {
        "@id": "carriertypes:nc",
        prefLabel: "volume",
      },
    ],
    createdString: ["1999"],
    createdYear: 1999,
    dateEndString: ["9999"],
    dateEndYear: 9999,
    dateStartYear: 1999,
    dateString: ["1999"],
    dimensions: ["22 cm."],
    donor: [
      "Gift of the DeWitt Wallace Endowment Fund, named in honor of the founder of Reader's Digest",
    ],
    electronicResources: [],
    extent: ["v. : ill. ;"],
    holdings: [
      {
        checkInBoxes: [
          {
            coverage: "Vol. 1  No. 1",
            position: 1,
            type: "nypl:CheckInBox",
            shelfMark: ["JFK 01-374"],
            status: "Arrived",
          },
          {
            coverage: "Vol. 2 No. 1 (1999)",
            position: 2,
            type: "nypl:CheckInBox",
            shelfMark: ["JFK 01-374"],
            status: "Arrived",
          },
          {
            coverage: "No. 3 (2000)",
            position: 3,
            type: "nypl:CheckInBox",
            shelfMark: ["JFK 01-374"],
            status: "Arrived",
          },
          {
            coverage: "No. 4",
            position: 4,
            type: "nypl:CheckInBox",
            shelfMark: ["JFK 01-374"],
            status: "Arrived",
          },
        ],
        holdingStatement: ["1(1998)-4(2001)."],
        identifier: [
          {
            type: "bf:shelfMark",
            value: "JFK 01-374",
          },
        ],
        physicalLocation: ["JFK 01-374"],
        format: ["PRINT"],
        location: [
          {
            code: "loc:rc2ma",
            label: "Offsite",
          },
        ],
        shelfMark: ["JFK 01-374"],
        uri: "h1046398",
      },
    ],
    idIssn: ["1521-1371"],
    idLccn: ["sn 98001765"],
    idOclc: ["39690507"],
    identifier: [
      {
        "@type": "bf:ShelfMark",
        "@value": "JFK 01-374",
      },
      {
        "@type": "nypl:Bnumber",
        "@value": "15080796",
      },
      {
        "@type": "nypl:Oclc",
        "@value": "39690507",
      },
      {
        "@type": "bf:Lccn",
        "@value": "sn 98001765",
      },
      {
        "@type": "bf:Issn",
        "@value": "1521-1371",
      },
      {
        "@type": "bf:Identifier",
        "@value": "(WaOLN)S310000006",
      },
    ],
    issuance: [
      {
        "@id": "urn:biblevel:s",
        prefLabel: "serial",
      },
    ],
    itemAggregations: [
      {
        "@type": "nypl:Aggregation",
        "@id": "res:location",
        id: "location",
        field: "location",
        values: [
          {
            value: "loc:mak32",
            count: 2,
            label: "SASB S3 - Periodicals Rm 108",
          },
          {
            value: "loc:rc2ma",
            count: 2,
            label: "Offsite",
          },
        ],
      },
      {
        "@type": "nypl:Aggregation",
        "@id": "res:format",
        id: "format",
        field: "format",
        values: [
          {
            value: "Text",
            count: 4,
            label: "Text",
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
            value: "status:a",
            count: 4,
            label: "Available",
          },
        ],
      },
    ],
    items: [
      {
        "@id": "res:i39333697",
        "@type": ["bf:Item"],
        accessMessage: [
          {
            "@id": "accessMessage:2",
            prefLabel: "Request in advance",
          },
        ],
        catalogItemType: [
          {
            "@id": "catalogItemType:4",
            prefLabel: "serial, loose",
          },
        ],
        dateRange: [
          {
            gte: "2001",
            lte: "2001",
          },
        ],
        eddRequestable: false,
        enumerationChronology: ["no. 4 (2001)"],
        formatLiteral: ["Text"],
        holdingLocation: [
          {
            "@id": "loc:mak32",
            prefLabel: "SASB S3 - Periodicals Rm 108",
            endpoint: "schwarzman",
          },
        ],
        idBarcode: ["33433130221975"],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value": "JFK 01-374 no. 4 (2001)",
          },
          {
            "@type": "bf:Barcode",
            "@value": "33433130221975",
          },
        ],
        physRequestable: false,
        physicalLocation: ["JFK 01-374"],
        requestable: [false],
        shelfMark: ["JFK 01-374 no. 4 (2001)"],
        specRequestable: false,
        status: [
          {
            "@id": "status:a",
            prefLabel: "Available",
          },
        ],
        uri: "i39333697",
        volumeRange: [
          {
            gte: 4,
            lte: 4,
          },
        ],
        idNyplSourceId: {
          "@type": "SierraNypl",
          "@value": "39333697",
        },
      },
      {
        "@id": "res:i39333648",
        "@type": ["bf:Item"],
        accessMessage: [
          {
            "@id": "accessMessage:2",
            prefLabel: "Request in advance",
          },
        ],
        catalogItemType: [
          {
            "@id": "catalogItemType:4",
            prefLabel: "serial, loose",
          },
        ],
        dateRange: [
          {
            gte: "2000",
            lte: "2000",
          },
        ],
        eddRequestable: false,
        enumerationChronology: ["no. 3 (2000)"],
        formatLiteral: ["Text"],
        holdingLocation: [
          {
            "@id": "loc:mak32",
            prefLabel: "SASB S3 - Periodicals Rm 108",
            endpoint: "schwarzman",
          },
        ],
        idBarcode: ["33433130221983"],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value": "JFK 01-374 no. 3 (2000)",
          },
          {
            "@type": "bf:Barcode",
            "@value": "33433130221983",
          },
        ],
        physRequestable: false,
        physicalLocation: ["JFK 01-374"],
        requestable: [false],
        shelfMark: ["JFK 01-374 no. 3 (2000)"],
        specRequestable: false,
        status: [
          {
            "@id": "status:a",
            prefLabel: "Available",
          },
        ],
        uri: "i39333648",
        volumeRange: [
          {
            gte: 3,
            lte: 3,
          },
        ],
        idNyplSourceId: {
          "@type": "SierraNypl",
          "@value": "39333648",
        },
      },
      {
        "@id": "res:i29990380",
        "@type": ["bf:Item"],
        accessMessage: [
          {
            "@id": "accessMessage:2",
            prefLabel: "Request in advance",
          },
        ],
        catalogItemType: [
          {
            "@id": "catalogItemType:4",
            prefLabel: "serial, loose",
          },
        ],
        dateRange: [
          {
            gte: "1999",
            lte: "1999",
          },
        ],
        eddRequestable: true,
        enumerationChronology: ["v. 2, no. 1 (1999)"],
        formatLiteral: ["Text"],
        holdingLocation: [
          {
            "@id": "loc:rc2ma",
            prefLabel: "Offsite",
          },
        ],
        idBarcode: ["33433106905643"],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value": "JFK 01-374 v. 2, no. 1 (1999)",
          },
          {
            "@type": "bf:Barcode",
            "@value": "33433106905643",
          },
        ],
        owner: [
          {
            "@id": "orgs:1000",
            prefLabel: "Stephen A. Schwarzman Building",
          },
        ],
        physRequestable: true,
        physicalLocation: ["JFK 01-374"],
        recapCustomerCode: ["NH"],
        requestable: [true],
        shelfMark: ["JFK 01-374 v. 2, no. 1 (1999)"],
        specRequestable: false,
        status: [
          {
            "@id": "status:a",
            prefLabel: "Available",
          },
        ],
        uri: "i29990380",
        volumeRange: [
          {
            gte: 2,
            lte: 2,
          },
        ],
        idNyplSourceId: {
          "@type": "SierraNypl",
          "@value": "29990380",
        },
      },
      {
        "@id": "res:i29990385",
        "@type": ["bf:Item"],
        accessMessage: [
          {
            "@id": "accessMessage:2",
            prefLabel: "Request in advance",
          },
        ],
        catalogItemType: [
          {
            "@id": "catalogItemType:4",
            prefLabel: "serial, loose",
          },
        ],
        dateRange: [
          {
            gte: "1998",
            lte: "1998",
          },
        ],
        eddRequestable: true,
        enumerationChronology: ["v. 1, no. 1 (1998)"],
        formatLiteral: ["Text"],
        holdingLocation: [
          {
            "@id": "loc:rc2ma",
            prefLabel: "Offsite",
          },
        ],
        idBarcode: ["33433106905650"],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value": "JFK 01-374 v. 1, no. 1 (1998)",
          },
          {
            "@type": "bf:Barcode",
            "@value": "33433106905650",
          },
        ],
        owner: [
          {
            "@id": "orgs:1000",
            prefLabel: "Stephen A. Schwarzman Building",
          },
        ],
        physRequestable: true,
        physicalLocation: ["JFK 01-374"],
        recapCustomerCode: ["NH"],
        requestable: [true],
        shelfMark: ["JFK 01-374 v. 1, no. 1 (1998)"],
        specRequestable: false,
        status: [
          {
            "@id": "status:a",
            prefLabel: "Available",
          },
        ],
        uri: "i29990385",
        volumeRange: [
          {
            gte: 1,
            lte: 1,
          },
        ],
        idNyplSourceId: {
          "@type": "SierraNypl",
          "@value": "29990385",
        },
      },
    ],
    language: [
      {
        "@id": "lang:eng",
        prefLabel: "English",
      },
    ],
    lccClassification: ["IN PROCESS"],
    format: [
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
    numCheckinCardItems: 0,
    numElectronicResources: 0,
    numItemDatesParsed: 4,
    numItemVolumesParsed: 4,
    numItemsMatched: 4,
    numItemsTotal: 4,
    nyplSource: ["sierra-nypl"],
    placeOfPublication: ["Mansfield, Ohio"],
    publicationStatement: ["Mansfield, Ohio : Urban Spaghetti, [1999?-"],
    publisherLiteral: ["Urban Spaghetti"],
    serialPublicationDates: ["Vol. 1, issue 1-"],
    shelfMark: ["JFK 01-374"],
    subjectLiteral: [
      "Arts, Modern -- United States -- Periodicals.",
      "American literature -- 20th ccentury -- Periodicals.",
    ],
    title: ["Urban spaghetti."],
    titleAlt: ["Urban spaghetti", "Urban spaghetti literary arts journal"],
    titleDisplay: ["Urban spaghetti."],
    type: ["nypl:Item"],
    updatedAt: 1711024183694,
    uri: "b15080796",
    suppressed: false,
    hasItemVolumes: true,
    hasItemDates: true,
    subjectHeadings: null,
  },
  annotatedMarc: {
    id: "15080796",
    nyplSource: "sierra-nypl",
    fields: [
      {
        label: "Title",
        values: [
          {
            content: "Urban spaghetti.",
            source: {
              fieldTag: "t",
              marcTag: "245",
              ind1: "0",
              ind2: "0",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "Urban spaghetti.",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Imprint",
        values: [
          {
            content: "Mansfield, Ohio : Urban Spaghetti, [1999?-",
            source: {
              fieldTag: "p",
              marcTag: "260",
              ind1: " ",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "Mansfield, Ohio :",
                },
                {
                  tag: "b",
                  content: "Urban Spaghetti,",
                },
                {
                  tag: "c",
                  content: "[1999?-",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Description",
        values: [
          {
            content: "v. : ill. ; 22 cm.",
            source: {
              fieldTag: "r",
              marcTag: "300",
              ind1: " ",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "v. :",
                },
                {
                  tag: "b",
                  content: "ill. ;",
                },
                {
                  tag: "c",
                  content: "22 cm.",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Current Frequency",
        values: [
          {
            content: "Semiannual",
            source: {
              fieldTag: "r",
              marcTag: "310",
              ind1: " ",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "Semiannual",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Publication Date",
        values: [
          {
            content: "Vol. 1, issue 1-",
            source: {
              fieldTag: "r",
              marcTag: "362",
              ind1: "0",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "Vol. 1, issue 1-",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Subject",
        values: [
          {
            content: "Arts, Modern -- United States -- Periodicals.",
            source: {
              fieldTag: "d",
              marcTag: "650",
              ind1: " ",
              ind2: "0",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "Arts, Modern",
                },
                {
                  tag: "z",
                  content: "United States",
                },
                {
                  tag: "v",
                  content: "Periodicals.",
                },
              ],
            },
          },
          {
            content: "American literature -- 20th ccentury -- Periodicals.",
            source: {
              fieldTag: "d",
              marcTag: "650",
              ind1: " ",
              ind2: "0",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "American literature",
                },
                {
                  tag: "y",
                  content: "20th ccentury",
                },
                {
                  tag: "v",
                  content: "Periodicals.",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Abbreviated Title",
        values: [
          {
            content: "Urban spaghetti",
            source: {
              fieldTag: "u",
              marcTag: "210",
              ind1: "0",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "Urban spaghetti",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Cover Title",
        values: [
          {
            content: "Urban spaghetti literary arts journal",
            source: {
              fieldTag: "u",
              marcTag: "246",
              ind1: "1",
              ind2: "4",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "Urban spaghetti literary arts journal",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Donor/Sponsor",
        values: [
          {
            content:
              "Gift of the DeWitt Wallace Endowment Fund, named in honor of the founder of Reader's Digest",
            source: {
              fieldTag: "u",
              marcTag: "799",
              ind1: "0",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content:
                    "Gift of the DeWitt Wallace Endowment Fund, named in honor of the founder of Reader's Digest",
                },
              ],
            },
          },
        ],
      },
      {
        label: "LCCN",
        values: [
          {
            content: "sn 98001765",
            source: {
              fieldTag: "l",
              marcTag: "010",
              ind1: " ",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "sn 98001765",
                },
              ],
            },
          },
        ],
      },
      {
        label: "ISSN",
        values: [
          {
            content: "1521-1371",
            source: {
              fieldTag: "i",
              marcTag: "022",
              ind1: "0",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "1521-1371",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Research Call Number",
        values: [
          {
            content: "JFK 01-374",
            source: {
              fieldTag: "q",
              marcTag: "852",
              ind1: "8",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "h",
                  content: "JFK 01-374",
                },
              ],
            },
          },
        ],
      },
    ],
  },
}

export const bibNoItems = {
  resource: {
    "@context":
      "http://discovery-api-production.us-east-1.elasticbeanstalk.com/api/v0.1/discovery/context_all.jsonld",
    "@type": ["nypl:Item", "nypl:Resource"],
    "@id": "res:b15080796",
    carrierType: [
      {
        "@id": "carriertypes:nc",
        prefLabel: "volume",
      },
    ],
    createdString: ["1999"],
    createdYear: 1999,
    dateEndString: ["9999"],
    dateEndYear: 9999,
    dateStartYear: 1999,
    dateString: ["1999"],
    dimensions: ["22 cm."],
    donor: [
      "Gift of the DeWitt Wallace Endowment Fund, named in honor of the founder of Reader's Digest",
    ],
    electronicResources: [],
    extent: ["v. : ill. ;"],
    holdings: [
      {
        checkInBoxes: [
          {
            coverage: "Vol. 1  No. 1",
            position: 1,
            type: "nypl:CheckInBox",
            shelfMark: ["JFK 01-374"],
            status: "Arrived",
          },
          {
            coverage: "Vol. 2 No. 1 (1999)",
            position: 2,
            type: "nypl:CheckInBox",
            shelfMark: ["JFK 01-374"],
            status: "Arrived",
          },
          {
            coverage: "No. 3 (2000)",
            position: 3,
            type: "nypl:CheckInBox",
            shelfMark: ["JFK 01-374"],
            status: "Arrived",
          },
          {
            coverage: "No. 4",
            position: 4,
            type: "nypl:CheckInBox",
            shelfMark: ["JFK 01-374"],
            status: "Arrived",
          },
        ],
        holdingStatement: ["1(1998)-4(2001)."],
        identifier: [
          {
            type: "bf:shelfMark",
            value: "JFK 01-374",
          },
        ],
        physicalLocation: ["JFK 01-374"],
        format: ["PRINT"],
        location: [
          {
            code: "loc:rc2ma",
            label: "Offsite",
          },
        ],
        shelfMark: ["JFK 01-374"],
        uri: "h1046398",
      },
    ],
    idIssn: ["1521-1371"],
    idLccn: ["sn 98001765"],
    idOclc: ["39690507"],
    identifier: [
      {
        "@type": "bf:ShelfMark",
        "@value": "JFK 01-374",
      },
      {
        "@type": "nypl:Bnumber",
        "@value": "15080796",
      },
      {
        "@type": "nypl:Oclc",
        "@value": "39690507",
      },
      {
        "@type": "bf:Lccn",
        "@value": "sn 98001765",
      },
      {
        "@type": "bf:Issn",
        "@value": "1521-1371",
      },
      {
        "@type": "bf:Identifier",
        "@value": "(WaOLN)S310000006",
      },
    ],
    issuance: [
      {
        "@id": "urn:biblevel:s",
        prefLabel: "serial",
      },
    ],
    itemAggregations: [],
    items: [],
    language: [
      {
        "@id": "lang:eng",
        prefLabel: "English",
      },
    ],
    lccClassification: ["IN PROCESS"],
    format: [
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
    numCheckinCardItems: 0,
    numElectronicResources: 0,
    numItemDatesParsed: 0,
    numItemVolumesParsed: 0,
    numItemsMatched: 0,
    numItemsTotal: 0,
    nyplSource: ["sierra-nypl"],
    placeOfPublication: ["Mansfield, Ohio"],
    publicationStatement: ["Mansfield, Ohio : Urban Spaghetti, [1999?-"],
    publisherLiteral: ["Urban Spaghetti"],
    serialPublicationDates: ["Vol. 1, issue 1-"],
    shelfMark: ["JFK 01-374"],
    subjectLiteral: [
      "Arts, Modern -- United States -- Periodicals.",
      "American literature -- 20th ccentury -- Periodicals.",
    ],
    title: ["Urban spaghetti."],
    titleAlt: ["Urban spaghetti", "Urban spaghetti literary arts journal"],
    titleDisplay: ["Urban spaghetti."],
    type: ["nypl:Item"],
    updatedAt: 1711024183694,
    uri: "b15080796",
    suppressed: false,
    hasItemVolumes: true,
    hasItemDates: true,
    subjectHeadings: null,
  },
  annotatedMarc: {
    id: "15080796",
    nyplSource: "sierra-nypl",
    fields: [
      {
        label: "Title",
        values: [
          {
            content: "Urban spaghetti.",
            source: {
              fieldTag: "t",
              marcTag: "245",
              ind1: "0",
              ind2: "0",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "Urban spaghetti.",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Imprint",
        values: [
          {
            content: "Mansfield, Ohio : Urban Spaghetti, [1999?-",
            source: {
              fieldTag: "p",
              marcTag: "260",
              ind1: " ",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "Mansfield, Ohio :",
                },
                {
                  tag: "b",
                  content: "Urban Spaghetti,",
                },
                {
                  tag: "c",
                  content: "[1999?-",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Description",
        values: [
          {
            content: "v. : ill. ; 22 cm.",
            source: {
              fieldTag: "r",
              marcTag: "300",
              ind1: " ",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "v. :",
                },
                {
                  tag: "b",
                  content: "ill. ;",
                },
                {
                  tag: "c",
                  content: "22 cm.",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Current Frequency",
        values: [
          {
            content: "Semiannual",
            source: {
              fieldTag: "r",
              marcTag: "310",
              ind1: " ",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "Semiannual",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Publication Date",
        values: [
          {
            content: "Vol. 1, issue 1-",
            source: {
              fieldTag: "r",
              marcTag: "362",
              ind1: "0",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "Vol. 1, issue 1-",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Subject",
        values: [
          {
            content: "Arts, Modern -- United States -- Periodicals.",
            source: {
              fieldTag: "d",
              marcTag: "650",
              ind1: " ",
              ind2: "0",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "Arts, Modern",
                },
                {
                  tag: "z",
                  content: "United States",
                },
                {
                  tag: "v",
                  content: "Periodicals.",
                },
              ],
            },
          },
          {
            content: "American literature -- 20th ccentury -- Periodicals.",
            source: {
              fieldTag: "d",
              marcTag: "650",
              ind1: " ",
              ind2: "0",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "American literature",
                },
                {
                  tag: "y",
                  content: "20th ccentury",
                },
                {
                  tag: "v",
                  content: "Periodicals.",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Abbreviated Title",
        values: [
          {
            content: "Urban spaghetti",
            source: {
              fieldTag: "u",
              marcTag: "210",
              ind1: "0",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "Urban spaghetti",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Cover Title",
        values: [
          {
            content: "Urban spaghetti literary arts journal",
            source: {
              fieldTag: "u",
              marcTag: "246",
              ind1: "1",
              ind2: "4",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "Urban spaghetti literary arts journal",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Donor/Sponsor",
        values: [
          {
            content:
              "Gift of the DeWitt Wallace Endowment Fund, named in honor of the founder of Reader's Digest",
            source: {
              fieldTag: "u",
              marcTag: "799",
              ind1: "0",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content:
                    "Gift of the DeWitt Wallace Endowment Fund, named in honor of the founder of Reader's Digest",
                },
              ],
            },
          },
        ],
      },
      {
        label: "LCCN",
        values: [
          {
            content: "sn 98001765",
            source: {
              fieldTag: "l",
              marcTag: "010",
              ind1: " ",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "sn 98001765",
                },
              ],
            },
          },
        ],
      },
      {
        label: "ISSN",
        values: [
          {
            content: "1521-1371",
            source: {
              fieldTag: "i",
              marcTag: "022",
              ind1: "0",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "1521-1371",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Research Call Number",
        values: [
          {
            content: "JFK 01-374",
            source: {
              fieldTag: "q",
              marcTag: "852",
              ind1: "8",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "h",
                  content: "JFK 01-374",
                },
              ],
            },
          },
        ],
      },
    ],
  },
}

export const bibWithManyItems = {
  resource: {
    "@context":
      "http://discovery-api-qa.us-east-1.elasticbeanstalk.com/api/v0.1/discovery/context_all.jsonld",
    "@type": ["nypl:Item", "nypl:Resource"],
    "@id": "res:pb5579193",
    carrierType: [
      {
        "@id": "carriertypes:nc",
        prefLabel: "volume",
      },
    ],
    contributorLiteral: ["Yunnan Sheng she hui ke xue yuan."],
    createdString: ["2006"],
    createdYear: 2006,
    dateEndString: ["9999"],
    dateEndYear: 9999,
    dateStartYear: 2006,
    dateString: ["2006"],
    dimensions: ["27 cm."],
    electronicResources: [],
    extent: ["v. : ill. ;"],
    idIssn: ["1673-6974"],
    idOclc: ["ocn259154062", "259154062", "SCSB-9177741"],
    identifier: [
      {
        "@type": "nypl:Bnumber",
        "@value": "5579193",
      },
      {
        "@type": "bf:Issn",
        "@value": "1673-6974",
      },
      {
        "@type": "nypl:Oclc",
        "@value": "ocn259154062",
      },
      {
        "@type": "nypl:Oclc",
        "@value": "259154062",
      },
      {
        "@type": "nypl:Oclc",
        "@value": "SCSB-9177741",
      },
      {
        "@type": "bf:Identifier",
        "@value": "(OCoLC)ocn259154062",
      },
      {
        "@type": "bf:Identifier",
        "@value": "(OCoLC)259154062",
      },
    ],
    issuance: [
      {
        "@id": "urn:biblevel:s",
        prefLabel: "serial",
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
            value: "Text",
            count: 26,
            label: "Text",
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
            value: "status:a",
            count: 26,
            label: "Available",
          },
        ],
      },
    ],
    items: [
      {
        "@id": "res:pi6844248",
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
        dateRange: [
          {
            lte: "2013",
            gte: "2013",
          },
        ],
        eddRequestable: true,
        enumerationChronology: ["no.136-138 (2013)"],
        formatLiteral: ["Text"],
        idBarcode: ["32101093532461"],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value": "GF41 .H83 no.136-138 (2013)",
          },
          {
            "@type": "bf:Barcode",
            "@value": "32101093532461",
          },
        ],
        owner: [
          {
            "@id": "orgs:0003",
            prefLabel: "Princeton University Library",
          },
        ],
        physRequestable: true,
        physicalLocation: ["GF41 .H83"],
        recapCustomerCode: ["PA"],
        requestable: [true],
        shelfMark: ["GF41 .H83 no.136-138 (2013)"],
        specRequestable: false,
        status: [
          {
            "@id": "status:a",
            prefLabel: "Available",
          },
        ],
        uri: "pi6844248",
        volumeRange: [
          {
            lte: 138,
            gte: 136,
          },
        ],
        idNyplSourceId: {
          "@type": "RecapPul",
          "@value": "6844248",
        },
      },
      {
        "@id": "res:pi6829519",
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
        dateRange: [
          {
            lte: "2013",
            gte: "2013",
          },
        ],
        eddRequestable: true,
        enumerationChronology: ["no.133-135 (2013)"],
        formatLiteral: ["Text"],
        idBarcode: ["32101093199394"],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value": "GF41 .H83 no.133-135 (2013)",
          },
          {
            "@type": "bf:Barcode",
            "@value": "32101093199394",
          },
        ],
        owner: [
          {
            "@id": "orgs:0003",
            prefLabel: "Princeton University Library",
          },
        ],
        physRequestable: true,
        physicalLocation: ["GF41 .H83"],
        recapCustomerCode: ["PA"],
        requestable: [true],
        shelfMark: ["GF41 .H83 no.133-135 (2013)"],
        specRequestable: false,
        status: [
          {
            "@id": "status:a",
            prefLabel: "Available",
          },
        ],
        uri: "pi6829519",
        volumeRange: [
          {
            lte: 135,
            gte: 133,
          },
        ],
        idNyplSourceId: {
          "@type": "RecapPul",
          "@value": "6829519",
        },
      },
      {
        "@id": "res:pi6729585",
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
        dateRange: [
          {
            lte: "2013",
            gte: "2013",
          },
        ],
        eddRequestable: true,
        enumerationChronology: ["no.130-132 (2013)"],
        formatLiteral: ["Text"],
        idBarcode: ["32101093206231"],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value": "GF41 .H83 no.130-132 (2013)",
          },
          {
            "@type": "bf:Barcode",
            "@value": "32101093206231",
          },
        ],
        owner: [
          {
            "@id": "orgs:0003",
            prefLabel: "Princeton University Library",
          },
        ],
        physRequestable: true,
        physicalLocation: ["GF41 .H83"],
        recapCustomerCode: ["PA"],
        requestable: [true],
        shelfMark: ["GF41 .H83 no.130-132 (2013)"],
        specRequestable: false,
        status: [
          {
            "@id": "status:a",
            prefLabel: "Available",
          },
        ],
        uri: "pi6729585",
        volumeRange: [
          {
            lte: 132,
            gte: 130,
          },
        ],
        idNyplSourceId: {
          "@type": "RecapPul",
          "@value": "6729585",
        },
      },
      {
        "@id": "res:pi6701127",
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
        dateRange: [
          {
            lte: "2013",
            gte: "2013",
          },
        ],
        eddRequestable: true,
        enumerationChronology: ["no.127-129 (2013)"],
        formatLiteral: ["Text"],
        idBarcode: ["32101090108257"],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value": "GF41 .H83 no.127-129 (2013)",
          },
          {
            "@type": "bf:Barcode",
            "@value": "32101090108257",
          },
        ],
        owner: [
          {
            "@id": "orgs:0003",
            prefLabel: "Princeton University Library",
          },
        ],
        physRequestable: true,
        physicalLocation: ["GF41 .H83"],
        recapCustomerCode: ["PA"],
        requestable: [true],
        shelfMark: ["GF41 .H83 no.127-129 (2013)"],
        specRequestable: false,
        status: [
          {
            "@id": "status:a",
            prefLabel: "Available",
          },
        ],
        uri: "pi6701127",
        volumeRange: [
          {
            lte: 129,
            gte: 127,
          },
        ],
        idNyplSourceId: {
          "@type": "RecapPul",
          "@value": "6701127",
        },
      },
      {
        "@id": "res:pi6699165",
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
        dateRange: [
          {
            lte: "2012",
            gte: "2012",
          },
        ],
        eddRequestable: true,
        enumerationChronology: ["no.125-126 (2012)"],
        formatLiteral: ["Text"],
        idBarcode: ["32101088508419"],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value": "GF41 .H83 no.125-126 (2012)",
          },
          {
            "@type": "bf:Barcode",
            "@value": "32101088508419",
          },
        ],
        owner: [
          {
            "@id": "orgs:0003",
            prefLabel: "Princeton University Library",
          },
        ],
        physRequestable: true,
        physicalLocation: ["GF41 .H83"],
        recapCustomerCode: ["PA"],
        requestable: [true],
        shelfMark: ["GF41 .H83 no.125-126 (2012)"],
        specRequestable: false,
        status: [
          {
            "@id": "status:a",
            prefLabel: "Available",
          },
        ],
        uri: "pi6699165",
        volumeRange: [
          {
            lte: 126,
            gte: 125,
          },
        ],
        idNyplSourceId: {
          "@type": "RecapPul",
          "@value": "6699165",
        },
      },
      {
        "@id": "res:pi6699162",
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
        dateRange: [
          {
            lte: "2012",
            gte: "2012",
          },
        ],
        eddRequestable: true,
        enumerationChronology: ["no.122-124 (2012)"],
        formatLiteral: ["Text"],
        idBarcode: ["32101088508401"],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value": "GF41 .H83 no.122-124 (2012)",
          },
          {
            "@type": "bf:Barcode",
            "@value": "32101088508401",
          },
        ],
        owner: [
          {
            "@id": "orgs:0003",
            prefLabel: "Princeton University Library",
          },
        ],
        physRequestable: true,
        physicalLocation: ["GF41 .H83"],
        recapCustomerCode: ["PA"],
        requestable: [true],
        shelfMark: ["GF41 .H83 no.122-124 (2012)"],
        specRequestable: false,
        status: [
          {
            "@id": "status:a",
            prefLabel: "Available",
          },
        ],
        uri: "pi6699162",
        volumeRange: [
          {
            lte: 124,
            gte: 122,
          },
        ],
        idNyplSourceId: {
          "@type": "RecapPul",
          "@value": "6699162",
        },
      },
      {
        "@id": "res:pi6699160",
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
        dateRange: [
          {
            lte: "2012",
            gte: "2012",
          },
        ],
        eddRequestable: true,
        enumerationChronology: ["no.119-121 (2012)"],
        formatLiteral: ["Text"],
        idBarcode: ["32101088508393"],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value": "GF41 .H83 no.119-121 (2012)",
          },
          {
            "@type": "bf:Barcode",
            "@value": "32101088508393",
          },
        ],
        owner: [
          {
            "@id": "orgs:0003",
            prefLabel: "Princeton University Library",
          },
        ],
        physRequestable: true,
        physicalLocation: ["GF41 .H83"],
        recapCustomerCode: ["PA"],
        requestable: [true],
        shelfMark: ["GF41 .H83 no.119-121 (2012)"],
        specRequestable: false,
        status: [
          {
            "@id": "status:a",
            prefLabel: "Available",
          },
        ],
        uri: "pi6699160",
        volumeRange: [
          {
            lte: 121,
            gte: 119,
          },
        ],
        idNyplSourceId: {
          "@type": "RecapPul",
          "@value": "6699160",
        },
      },
      {
        "@id": "res:pi6567919",
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
        dateRange: [
          {
            lte: "2012",
            gte: "2012",
          },
        ],
        eddRequestable: true,
        enumerationChronology: ["no.115-118 (2012)"],
        formatLiteral: ["Text"],
        idBarcode: ["32101082103217"],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value": "GF41 .H83 no.115-118 (2012)",
          },
          {
            "@type": "bf:Barcode",
            "@value": "32101082103217",
          },
        ],
        owner: [
          {
            "@id": "orgs:0003",
            prefLabel: "Princeton University Library",
          },
        ],
        physRequestable: true,
        physicalLocation: ["GF41 .H83"],
        recapCustomerCode: ["PA"],
        requestable: [true],
        shelfMark: ["GF41 .H83 no.115-118 (2012)"],
        specRequestable: false,
        status: [
          {
            "@id": "status:a",
            prefLabel: "Available",
          },
        ],
        uri: "pi6567919",
        volumeRange: [
          {
            lte: 118,
            gte: 115,
          },
        ],
        idNyplSourceId: {
          "@type": "RecapPul",
          "@value": "6567919",
        },
      },
      {
        "@id": "res:pi6550898",
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
        dateRange: [
          {
            lte: "2011",
            gte: "2011",
          },
        ],
        eddRequestable: true,
        enumerationChronology: ["no.111-114 (2011)"],
        formatLiteral: ["Text"],
        idBarcode: ["32101049620683"],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value": "GF41 .H83 no.111-114 (2011)",
          },
          {
            "@type": "bf:Barcode",
            "@value": "32101049620683",
          },
        ],
        owner: [
          {
            "@id": "orgs:0003",
            prefLabel: "Princeton University Library",
          },
        ],
        physRequestable: true,
        physicalLocation: ["GF41 .H83"],
        recapCustomerCode: ["PA"],
        requestable: [true],
        shelfMark: ["GF41 .H83 no.111-114 (2011)"],
        specRequestable: false,
        status: [
          {
            "@id": "status:a",
            prefLabel: "Available",
          },
        ],
        uri: "pi6550898",
        volumeRange: [
          {
            lte: 114,
            gte: 111,
          },
        ],
        idNyplSourceId: {
          "@type": "RecapPul",
          "@value": "6550898",
        },
      },
      {
        "@id": "res:pi6312009",
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
        dateRange: [
          {
            lte: "2011",
            gte: "2011",
          },
        ],
        eddRequestable: true,
        enumerationChronology: ["no.107-110 & suppl. (2011)"],
        formatLiteral: ["Text"],
        idBarcode: ["32101086209457"],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value": "GF41 .H83 no.107-110 & suppl. (2011)",
          },
          {
            "@type": "bf:Barcode",
            "@value": "32101086209457",
          },
        ],
        owner: [
          {
            "@id": "orgs:0003",
            prefLabel: "Princeton University Library",
          },
        ],
        physRequestable: true,
        physicalLocation: ["GF41 .H83"],
        recapCustomerCode: ["PA"],
        requestable: [true],
        shelfMark: ["GF41 .H83 no.107-110 & suppl. (2011)"],
        specRequestable: false,
        status: [
          {
            "@id": "status:a",
            prefLabel: "Available",
          },
        ],
        uri: "pi6312009",
        volumeRange: [
          {
            lte: 110,
            gte: 107,
          },
        ],
        idNyplSourceId: {
          "@type": "RecapPul",
          "@value": "6312009",
        },
      },
      {
        "@id": "res:pi6157050",
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
        dateRange: [
          {
            lte: "2011",
            gte: "2011",
          },
        ],
        eddRequestable: true,
        enumerationChronology: ["no.103-106 (2011)"],
        formatLiteral: ["Text"],
        idBarcode: ["32101075479236"],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value": "GF41 .H83 no.103-106 (2011)",
          },
          {
            "@type": "bf:Barcode",
            "@value": "32101075479236",
          },
        ],
        owner: [
          {
            "@id": "orgs:0003",
            prefLabel: "Princeton University Library",
          },
        ],
        physRequestable: true,
        physicalLocation: ["GF41 .H83"],
        recapCustomerCode: ["PA"],
        requestable: [true],
        shelfMark: ["GF41 .H83 no.103-106 (2011)"],
        specRequestable: false,
        status: [
          {
            "@id": "status:a",
            prefLabel: "Available",
          },
        ],
        uri: "pi6157050",
        volumeRange: [
          {
            lte: 106,
            gte: 103,
          },
        ],
        idNyplSourceId: {
          "@type": "RecapPul",
          "@value": "6157050",
        },
      },
      {
        "@id": "res:pi6152040",
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
        dateRange: [
          {
            lte: "2010",
            gte: "2010",
          },
        ],
        eddRequestable: true,
        enumerationChronology: ["no.99-102 (2010)"],
        formatLiteral: ["Text"],
        idBarcode: ["32101075477891"],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value": "GF41 .H83 no.99-102 (2010)",
          },
          {
            "@type": "bf:Barcode",
            "@value": "32101075477891",
          },
        ],
        owner: [
          {
            "@id": "orgs:0003",
            prefLabel: "Princeton University Library",
          },
        ],
        physRequestable: true,
        physicalLocation: ["GF41 .H83"],
        recapCustomerCode: ["PA"],
        requestable: [true],
        shelfMark: ["GF41 .H83 no.99-102 (2010)"],
        specRequestable: false,
        status: [
          {
            "@id": "status:a",
            prefLabel: "Available",
          },
        ],
        uri: "pi6152040",
        volumeRange: [
          {
            lte: 102,
            gte: 99,
          },
        ],
        idNyplSourceId: {
          "@type": "RecapPul",
          "@value": "6152040",
        },
      },
      {
        "@id": "res:pi6312006",
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
        dateRange: [
          {
            lte: "2010",
            gte: "2010",
          },
        ],
        eddRequestable: true,
        enumerationChronology: ["no.95-98 & suppl. (2010)"],
        formatLiteral: ["Text"],
        idBarcode: ["32101086209440"],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value": "GF41 .H83 no.95-98 & suppl. (2010)",
          },
          {
            "@type": "bf:Barcode",
            "@value": "32101086209440",
          },
        ],
        owner: [
          {
            "@id": "orgs:0003",
            prefLabel: "Princeton University Library",
          },
        ],
        physRequestable: true,
        physicalLocation: ["GF41 .H83"],
        recapCustomerCode: ["PA"],
        requestable: [true],
        shelfMark: ["GF41 .H83 no.95-98 & suppl. (2010)"],
        specRequestable: false,
        status: [
          {
            "@id": "status:a",
            prefLabel: "Available",
          },
        ],
        uri: "pi6312006",
        volumeRange: [
          {
            lte: 98,
            gte: 95,
          },
        ],
        idNyplSourceId: {
          "@type": "RecapPul",
          "@value": "6312006",
        },
      },
      {
        "@id": "res:pi5840838",
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
        dateRange: [
          {
            lte: "2010",
            gte: "2010",
          },
        ],
        eddRequestable: true,
        enumerationChronology: ["no.91-94 (2010)"],
        formatLiteral: ["Text"],
        idBarcode: ["32101075968279"],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value": "GF41 .H83 no.91-94 (2010)",
          },
          {
            "@type": "bf:Barcode",
            "@value": "32101075968279",
          },
        ],
        owner: [
          {
            "@id": "orgs:0003",
            prefLabel: "Princeton University Library",
          },
        ],
        physRequestable: true,
        physicalLocation: ["GF41 .H83"],
        recapCustomerCode: ["PA"],
        requestable: [true],
        shelfMark: ["GF41 .H83 no.91-94 (2010)"],
        specRequestable: false,
        status: [
          {
            "@id": "status:a",
            prefLabel: "Available",
          },
        ],
        uri: "pi5840838",
        volumeRange: [
          {
            lte: 94,
            gte: 91,
          },
        ],
        idNyplSourceId: {
          "@type": "RecapPul",
          "@value": "5840838",
        },
      },
      {
        "@id": "res:pi5834958",
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
        dateRange: [
          {
            lte: "2009",
            gte: "2009",
          },
        ],
        eddRequestable: true,
        enumerationChronology: ["no.87-90 (2009)"],
        formatLiteral: ["Text"],
        idBarcode: ["32101075966901"],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value": "GF41 .H83 no.87-90 (2009)",
          },
          {
            "@type": "bf:Barcode",
            "@value": "32101075966901",
          },
        ],
        owner: [
          {
            "@id": "orgs:0003",
            prefLabel: "Princeton University Library",
          },
        ],
        physRequestable: true,
        physicalLocation: ["GF41 .H83"],
        recapCustomerCode: ["PA"],
        requestable: [true],
        shelfMark: ["GF41 .H83 no.87-90 (2009)"],
        specRequestable: false,
        status: [
          {
            "@id": "status:a",
            prefLabel: "Available",
          },
        ],
        uri: "pi5834958",
        volumeRange: [
          {
            lte: 90,
            gte: 87,
          },
        ],
        idNyplSourceId: {
          "@type": "RecapPul",
          "@value": "5834958",
        },
      },
      {
        "@id": "res:pi5733725",
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
        dateRange: [
          {
            lte: "2009",
            gte: "2009",
          },
        ],
        eddRequestable: true,
        enumerationChronology: ["no.83-86 (2009)"],
        formatLiteral: ["Text"],
        idBarcode: ["32101075414431"],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value": "GF41 .H83 no.83-86 (2009)",
          },
          {
            "@type": "bf:Barcode",
            "@value": "32101075414431",
          },
        ],
        owner: [
          {
            "@id": "orgs:0003",
            prefLabel: "Princeton University Library",
          },
        ],
        physRequestable: true,
        physicalLocation: ["GF41 .H83"],
        recapCustomerCode: ["PA"],
        requestable: [true],
        shelfMark: ["GF41 .H83 no.83-86 (2009)"],
        specRequestable: false,
        status: [
          {
            "@id": "status:a",
            prefLabel: "Available",
          },
        ],
        uri: "pi5733725",
        volumeRange: [
          {
            lte: 86,
            gte: 83,
          },
        ],
        idNyplSourceId: {
          "@type": "RecapPul",
          "@value": "5733725",
        },
      },
      {
        "@id": "res:pi5626144",
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
        dateRange: [
          {
            lte: "2009",
            gte: "2009",
          },
        ],
        eddRequestable: true,
        enumerationChronology: ["no.79-82 (2009)"],
        formatLiteral: ["Text"],
        idBarcode: ["32101072398645"],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value": "GF41 .H83 no.79-82 (2009)",
          },
          {
            "@type": "bf:Barcode",
            "@value": "32101072398645",
          },
        ],
        owner: [
          {
            "@id": "orgs:0003",
            prefLabel: "Princeton University Library",
          },
        ],
        physRequestable: true,
        physicalLocation: ["GF41 .H83"],
        recapCustomerCode: ["PA"],
        requestable: [true],
        shelfMark: ["GF41 .H83 no.79-82 (2009)"],
        specRequestable: false,
        status: [
          {
            "@id": "status:a",
            prefLabel: "Available",
          },
        ],
        uri: "pi5626144",
        volumeRange: [
          {
            lte: 82,
            gte: 79,
          },
        ],
        idNyplSourceId: {
          "@type": "RecapPul",
          "@value": "5626144",
        },
      },
      {
        "@id": "res:pi5626143",
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
        dateRange: [
          {
            lte: "2008",
            gte: "2008",
          },
        ],
        eddRequestable: true,
        enumerationChronology: ["no.75-78 (2008)"],
        formatLiteral: ["Text"],
        idBarcode: ["32101072398637"],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value": "GF41 .H83 no.75-78 (2008)",
          },
          {
            "@type": "bf:Barcode",
            "@value": "32101072398637",
          },
        ],
        owner: [
          {
            "@id": "orgs:0003",
            prefLabel: "Princeton University Library",
          },
        ],
        physRequestable: true,
        physicalLocation: ["GF41 .H83"],
        recapCustomerCode: ["PA"],
        requestable: [true],
        shelfMark: ["GF41 .H83 no.75-78 (2008)"],
        specRequestable: false,
        status: [
          {
            "@id": "status:a",
            prefLabel: "Available",
          },
        ],
        uri: "pi5626143",
        volumeRange: [
          {
            lte: 78,
            gte: 75,
          },
        ],
        idNyplSourceId: {
          "@type": "RecapPul",
          "@value": "5626143",
        },
      },
      {
        "@id": "res:pi5422941",
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
        dateRange: [
          {
            lte: "2008",
            gte: "2008",
          },
        ],
        eddRequestable: true,
        enumerationChronology: ["no.71-74 (2008)"],
        formatLiteral: ["Text"],
        idBarcode: ["32101072390659"],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value": "GF41 .H83 no.71-74 (2008)",
          },
          {
            "@type": "bf:Barcode",
            "@value": "32101072390659",
          },
        ],
        owner: [
          {
            "@id": "orgs:0003",
            prefLabel: "Princeton University Library",
          },
        ],
        physRequestable: true,
        physicalLocation: ["GF41 .H83"],
        recapCustomerCode: ["PA"],
        requestable: [true],
        shelfMark: ["GF41 .H83 no.71-74 (2008)"],
        specRequestable: false,
        status: [
          {
            "@id": "status:a",
            prefLabel: "Available",
          },
        ],
        uri: "pi5422941",
        volumeRange: [
          {
            lte: 74,
            gte: 71,
          },
        ],
        idNyplSourceId: {
          "@type": "RecapPul",
          "@value": "5422941",
        },
      },
      {
        "@id": "res:pi5327716",
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
        dateRange: [
          {
            lte: "2008",
            gte: "2008",
          },
        ],
        eddRequestable: true,
        enumerationChronology: ["no.67-70 (2008)"],
        formatLiteral: ["Text"],
        idBarcode: ["32101066014000"],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value": "GF41 .H83 no.67-70 (2008)",
          },
          {
            "@type": "bf:Barcode",
            "@value": "32101066014000",
          },
        ],
        owner: [
          {
            "@id": "orgs:0003",
            prefLabel: "Princeton University Library",
          },
        ],
        physRequestable: true,
        physicalLocation: ["GF41 .H83"],
        recapCustomerCode: ["PA"],
        requestable: [true],
        shelfMark: ["GF41 .H83 no.67-70 (2008)"],
        specRequestable: false,
        status: [
          {
            "@id": "status:a",
            prefLabel: "Available",
          },
        ],
        uri: "pi5327716",
        volumeRange: [
          {
            lte: 70,
            gte: 67,
          },
        ],
        idNyplSourceId: {
          "@type": "RecapPul",
          "@value": "5327716",
        },
      },
    ],
    language: [
      {
        "@id": "lang:chi",
        prefLabel: "Chinese",
      },
    ],
    format: [
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
        prefLabel: "Title from cover.",
      },
      {
        noteType: "Note",
        "@type": "bf:Note",
        prefLabel: "Latest issue consulted: 2008 nian 8 yue = zong di 74 qi.",
      },
      {
        noteType: "Issued By",
        "@type": "bf:Note",
        prefLabel: "Sponsored by: Yunnan Sheng she hui ke xue yuan.",
      },
    ],
    numAvailable: 26,
    numCheckinCardItems: 0,
    numElectronicResources: 0,
    numItemDatesParsed: 26,
    numItemVolumesParsed: 25,
    numItems: 26,
    numItemsMatched: 26,
    numItemsTotal: 26,
    nyplSource: ["recap-pul"],
    parallelContributorLiteral: ["云南省社会科学院."],
    parallelNote: [null, null, "Sponsored by: 云南省社会科学院."],
    parallelPlaceOfPublication: ["昆明市"],
    parallelPublicationStatement: ["昆明市 : 华夏地理杂志社, 2006-"],
    parallelPublisherLiteral: ["华夏地理杂志社"],
    parallelTitle: ["華夏地理 = National geographic."],
    parallelTitleAlt: ["", "国宝山西 Suppl. 2009"],
    parallelTitleDisplay: ["華夏地理 = National geographic."],
    placeOfPublication: ["Kunming Shi"],
    publicationStatement: ["Kunming Shi : Huaxia di li za zhi she, 2006-"],
    publisherLiteral: ["Huaxia di li za zhi she"],
    serialPublicationDates: ["Zong di 48 qi-"],
    subjectLiteral: ["Human geography -- China -- Periodicals."],
    title: ["Huaxia di li = National geographic."],
    titleAlt: ["National geographic", "Guo bao Shanxi Suppl. 2009"],
    titleDisplay: ["Huaxia di li = National geographic."],
    type: ["nypl:Item"],
    updatedAt: 1675258177507,
    uri: "pb5579193",
    suppressed: false,
    hasItemVolumes: true,
    hasItemDates: true,
    subjectHeadings: null,
  },
  annotatedMarc: {
    id: "15080796",
    nyplSource: "sierra-nypl",
    fields: [
      {
        label: "Title",
        values: [
          {
            content: "Urban spaghetti.",
            source: {
              fieldTag: "t",
              marcTag: "245",
              ind1: "0",
              ind2: "0",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "Urban spaghetti.",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Imprint",
        values: [
          {
            content: "Mansfield, Ohio : Urban Spaghetti, [1999?-",
            source: {
              fieldTag: "p",
              marcTag: "260",
              ind1: " ",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "Mansfield, Ohio :",
                },
                {
                  tag: "b",
                  content: "Urban Spaghetti,",
                },
                {
                  tag: "c",
                  content: "[1999?-",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Description",
        values: [
          {
            content: "v. : ill. ; 22 cm.",
            source: {
              fieldTag: "r",
              marcTag: "300",
              ind1: " ",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "v. :",
                },
                {
                  tag: "b",
                  content: "ill. ;",
                },
                {
                  tag: "c",
                  content: "22 cm.",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Current Frequency",
        values: [
          {
            content: "Semiannual",
            source: {
              fieldTag: "r",
              marcTag: "310",
              ind1: " ",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "Semiannual",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Publication Date",
        values: [
          {
            content: "Vol. 1, issue 1-",
            source: {
              fieldTag: "r",
              marcTag: "362",
              ind1: "0",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "Vol. 1, issue 1-",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Subject",
        values: [
          {
            content: "Arts, Modern -- United States -- Periodicals.",
            source: {
              fieldTag: "d",
              marcTag: "650",
              ind1: " ",
              ind2: "0",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "Arts, Modern",
                },
                {
                  tag: "z",
                  content: "United States",
                },
                {
                  tag: "v",
                  content: "Periodicals.",
                },
              ],
            },
          },
          {
            content: "American literature -- 20th ccentury -- Periodicals.",
            source: {
              fieldTag: "d",
              marcTag: "650",
              ind1: " ",
              ind2: "0",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "American literature",
                },
                {
                  tag: "y",
                  content: "20th ccentury",
                },
                {
                  tag: "v",
                  content: "Periodicals.",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Abbreviated Title",
        values: [
          {
            content: "Urban spaghetti",
            source: {
              fieldTag: "u",
              marcTag: "210",
              ind1: "0",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "Urban spaghetti",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Cover Title",
        values: [
          {
            content: "Urban spaghetti literary arts journal",
            source: {
              fieldTag: "u",
              marcTag: "246",
              ind1: "1",
              ind2: "4",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "Urban spaghetti literary arts journal",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Donor/Sponsor",
        values: [
          {
            content:
              "Gift of the DeWitt Wallace Endowment Fund, named in honor of the founder of Reader's Digest",
            source: {
              fieldTag: "u",
              marcTag: "799",
              ind1: "0",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content:
                    "Gift of the DeWitt Wallace Endowment Fund, named in honor of the founder of Reader's Digest",
                },
              ],
            },
          },
        ],
      },
      {
        label: "LCCN",
        values: [
          {
            content: "sn 98001765",
            source: {
              fieldTag: "l",
              marcTag: "010",
              ind1: " ",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "sn 98001765",
                },
              ],
            },
          },
        ],
      },
      {
        label: "ISSN",
        values: [
          {
            content: "1521-1371",
            source: {
              fieldTag: "i",
              marcTag: "022",
              ind1: "0",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "1521-1371",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Research Call Number",
        values: [
          {
            content: "JFK 01-374",
            source: {
              fieldTag: "q",
              marcTag: "852",
              ind1: "8",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "h",
                  content: "JFK 01-374",
                },
              ],
            },
          },
        ],
      },
    ],
  },
}

export const bibWithSupplementaryContent = {
  resource: {
    "@context":
      "http://discovery-api-production.us-east-1.elasticbeanstalk.com/api/v0.1/discovery/context_all.jsonld",
    "@type": ["nypl:Item", "nypl:Resource"],
    "@id": "res:b21255464",
    carrierType: [
      {
        "@id": "carriertypes:nc",
        prefLabel: "volume",
      },
    ],
    contributorLiteral: ["Long, Ethan", "OverDrive, Inc."],
    createdString: ["2016"],
    createdYear: 2016,
    creatorLiteral: ["Watson, Tom, 1965-"],
    dateStartYear: 2016,
    dateString: ["2016"],
    description: [
      "When they come across spaghetti in their search for a tug-of-war rope, Stick Dog and his hungry friends go on a quest for more pasta that sees them scale their suburb's tallest mountain and sneak into a restaurant filled with humans.",
    ],
    electronicResources: [
      {
        url: "http://link.overdrive.com/?websiteID=37&titleID=2559851",
        prefLabel: "Access eNYPL",
      },
    ],
    extent: ["1 online resource (238 pages) : illustrations."],
    genreForm: ["Humorous fiction."],
    idIsbn: ["9780062343239", "0062343238"],
    idOclc: ["959966725"],
    identifier: [
      {
        "@type": "nypl:Bnumber",
        "@value": "21255464",
      },
      {
        "@type": "bf:Isbn",
        "@value": "9780062343239",
      },
      {
        "@type": "bf:Isbn",
        "@value": "0062343238",
      },
      {
        "@type": "nypl:Oclc",
        "@value": "959966725",
      },
      {
        "@type": "nypl:Oclc",
        "@value": "959966725",
      },
      {
        "@type": "bf:Identifier",
        "@value": "(OCoLC)959966725",
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
            value: "Text",
            count: 1,
            label: "Text",
          },
        ],
      },
      {
        "@type": "nypl:Aggregation",
        "@id": "res:status",
        id: "status",
        field: "status",
        values: [],
      },
    ],
    items: [],
    language: [
      {
        "@id": "lang:eng",
        prefLabel: "English",
      },
    ],
    lccClassification: ["FICTION WAT"],
    format: [
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
    numAvailable: 0,
    numCheckinCardItems: 0,
    numElectronicResources: 1,
    numItemDatesParsed: 0,
    numItemVolumesParsed: 0,
    numItems: 0,
    numItemsMatched: 0,
    numItemsTotal: 0,
    nyplSource: ["sierra-nypl"],
    placeOfPublication: ["New York, NY"],
    publicationStatement: [
      "New York, NY : Harper, An Imprint of HarperCollinsPublishers, [2016]",
    ],
    publisherLiteral: ["Harper, An Imprint of HarperCollinsPublishers"],
    subjectLiteral: [
      "Dogs -- Fiction.",
      "Pasta products -- Fiction.",
      "Friendship -- Fiction.",
      "Illustrated children's books.",
    ],
    supplementaryContent: [
      {
        "@type": "nypl:SupplementaryContent",
        label: "Image",
        url: "http://images.contentreserve.com/ImageType-100/0293-1/{C87D2BB9-0E13-4851-A9E2-547643F41A0E}Img100.jpg",
      },
    ],
    title: ["Stick Dog slurps spaghetti"],
    titleDisplay: [
      "Stick Dog slurps spaghetti / by Tom Watson ; [illustrations by Ethan Long based on original sketches by Tom Watson].",
    ],
    type: ["nypl:Item"],
    updatedAt: 1681297059060,
    uri: "b21255464",
    suppressed: false,
    hasItemVolumes: false,
    hasItemDates: false,
  },
  annotatedMarc: {
    id: "21255464",
    nyplSource: "sierra-nypl",
    fields: [
      {
        label: "Author",
        values: [
          {
            content: "Watson, Tom, 1965- author.",
            source: {
              fieldTag: "a",
              marcTag: "100",
              ind1: "1",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "Watson, Tom,",
                },
                {
                  tag: "d",
                  content: "1965-",
                },
                {
                  tag: "e",
                  content: "author.",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Title",
        values: [
          {
            content:
              "Stick Dog slurps spaghetti / by Tom Watson ; [illustrations by Ethan Long based on original sketches by Tom Watson].",
            source: {
              fieldTag: "t",
              marcTag: "245",
              ind1: "1",
              ind2: "0",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "Stick Dog slurps spaghetti /",
                },
                {
                  tag: "c",
                  content:
                    "by Tom Watson ; [illustrations by Ethan Long based on original sketches by Tom Watson].",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Publisher",
        values: [
          {
            content:
              "New York, NY : Harper, An Imprint of HarperCollinsPublishers, [2016]",
            source: {
              fieldTag: "p",
              marcTag: "264",
              ind1: " ",
              ind2: "1",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "New York, NY :",
                },
                {
                  tag: "b",
                  content: "Harper, An Imprint of HarperCollinsPublishers,",
                },
                {
                  tag: "c",
                  content: "[2016]",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Edition",
        values: [
          {
            content: "First edition.",
            source: {
              fieldTag: "e",
              marcTag: "250",
              ind1: " ",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "First edition.",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Description",
        values: [
          {
            content: "1 online resource (238 pages) : illustrations.",
            source: {
              fieldTag: "r",
              marcTag: "300",
              ind1: " ",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "1 online resource (238 pages) :",
                },
                {
                  tag: "b",
                  content: "illustrations.",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Type of Content",
        values: [
          {
            content: "text",
            source: {
              fieldTag: "r",
              marcTag: "336",
              ind1: " ",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "text",
                },
                {
                  tag: "b",
                  content: "[redacted]",
                },
                {
                  tag: "2",
                  content: "[redacted]",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Type of Medium",
        values: [
          {
            content: "computer",
            source: {
              fieldTag: "r",
              marcTag: "337",
              ind1: " ",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "computer",
                },
                {
                  tag: "b",
                  content: "[redacted]",
                },
                {
                  tag: "2",
                  content: "[redacted]",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Type of Carrier",
        values: [
          {
            content: "online resource",
            source: {
              fieldTag: "r",
              marcTag: "338",
              ind1: " ",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "online resource",
                },
                {
                  tag: "b",
                  content: "[redacted]",
                },
                {
                  tag: "2",
                  content: "[redacted]",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Summary",
        values: [
          {
            content:
              "When they come across spaghetti in their search for a tug-of-war rope, Stick Dog and his hungry friends go on a quest for more pasta that sees them scale their suburb's tallest mountain and sneak into a restaurant filled with humans.",
            source: {
              fieldTag: "n",
              marcTag: "520",
              ind1: " ",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content:
                    "When they come across spaghetti in their search for a tug-of-war rope, Stick Dog and his hungry friends go on a quest for more pasta that sees them scale their suburb's tallest mountain and sneak into a restaurant filled with humans.",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Source of description",
        values: [
          {
            content: "Print version record.",
            source: {
              fieldTag: "n",
              marcTag: "588",
              ind1: "0",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "Print version record.",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Connect to:",
        values: [
          {
            label: "Access eNYPL",
            content: "http://link.overdrive.com/?websiteID=37&titleID=2559851",
            source: {
              fieldTag: "y",
              marcTag: "856",
              ind1: "4",
              ind2: "0",
              content: null,
              subfields: [
                {
                  tag: "u",
                  content:
                    "http://link.overdrive.com/?websiteID=37&titleID=2559851",
                },
                {
                  tag: "y",
                  content: "[redacted]",
                },
              ],
            },
          },
          {
            label: "Image",
            content:
              "http://images.contentreserve.com/ImageType-100/0293-1/{C87D2BB9-0E13-4851-A9E2-547643F41A0E}Img100.jpg",
            source: {
              fieldTag: "y",
              marcTag: "856",
              ind1: "4",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "3",
                  content: "[redacted]",
                },
                {
                  tag: "u",
                  content:
                    "http://images.contentreserve.com/ImageType-100/0293-1/{C87D2BB9-0E13-4851-A9E2-547643F41A0E}Img100.jpg",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Subject",
        values: [
          {
            content: "Dogs -- Fiction.",
            source: {
              fieldTag: "d",
              marcTag: "650",
              ind1: " ",
              ind2: "1",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "Dogs",
                },
                {
                  tag: "v",
                  content: "Fiction.",
                },
              ],
            },
          },
          {
            content: "Pasta products -- Fiction.",
            source: {
              fieldTag: "d",
              marcTag: "650",
              ind1: " ",
              ind2: "1",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "Pasta products",
                },
                {
                  tag: "v",
                  content: "Fiction.",
                },
              ],
            },
          },
          {
            content: "Friendship -- Fiction.",
            source: {
              fieldTag: "d",
              marcTag: "650",
              ind1: " ",
              ind2: "1",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "Friendship",
                },
                {
                  tag: "v",
                  content: "Fiction.",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Genre/Form",
        values: [
          {
            content: "Humorous fiction.",
            source: {
              fieldTag: "d",
              marcTag: "655",
              ind1: " ",
              ind2: "7",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "Humorous fiction.",
                },
                {
                  tag: "2",
                  content: "[redacted]",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Subject",
        values: [
          {
            content: "Illustrated children's books.",
            source: {
              fieldTag: "d",
              marcTag: "650",
              ind1: " ",
              ind2: "0",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "Illustrated children's books.",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Genre/Form",
        values: [
          {
            content: "Humorous fiction.",
            source: {
              fieldTag: "d",
              marcTag: "655",
              ind1: " ",
              ind2: "7",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "Humorous fiction.",
                },
                {
                  tag: "2",
                  content: "[redacted]",
                },
                {
                  tag: "0",
                  content: "[redacted]",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Subject",
        values: [
          {
            content: "Illustrated children's books.",
            source: {
              fieldTag: "d",
              marcTag: "650",
              ind1: " ",
              ind2: "7",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "Illustrated children's books.",
                },
                {
                  tag: "2",
                  content: "[redacted]",
                },
                {
                  tag: "0",
                  content: "[redacted]",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Genre/Form",
        values: [
          {
            content: "Electronic books.",
            source: {
              fieldTag: "d",
              marcTag: "655",
              ind1: " ",
              ind2: "0",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "Electronic books.",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Added Author",
        values: [
          {
            content: "Long, Ethan, illustrator.",
            source: {
              fieldTag: "b",
              marcTag: "700",
              ind1: "1",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "Long, Ethan,",
                },
                {
                  tag: "e",
                  content: "illustrator.",
                },
              ],
            },
          },
          {
            content: "OverDrive, Inc.",
            source: {
              fieldTag: "b",
              marcTag: "710",
              ind1: "2",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "OverDrive, Inc.",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Other Form:",
        values: [
          {
            content:
              "Print version: Watson, Tom, 1965- Stick Dog slurps spaghetti. First edition. New York, NY : Harper, An Imprint of HarperCollinsPublishers, [2016] 006234322X (DLC)  2016932092 (OCoLC)935985696",
            source: {
              fieldTag: "w",
              marcTag: "776",
              ind1: "0",
              ind2: "8",
              content: null,
              subfields: [
                {
                  tag: "i",
                  content: "Print version:",
                },
                {
                  tag: "a",
                  content: "Watson, Tom, 1965-",
                },
                {
                  tag: "t",
                  content: "Stick Dog slurps spaghetti.",
                },
                {
                  tag: "b",
                  content: "First edition.",
                },
                {
                  tag: "d",
                  content:
                    "New York, NY : Harper, An Imprint of HarperCollinsPublishers, [2016]",
                },
                {
                  tag: "z",
                  content: "006234322X",
                },
                {
                  tag: "w",
                  content: "(DLC)  2016932092",
                },
                {
                  tag: "w",
                  content: "(OCoLC)935985696",
                },
              ],
            },
          },
        ],
      },
      {
        label: "ISBN",
        values: [
          {
            content: "9780062343239 (electronic bk.)",
            source: {
              fieldTag: "i",
              marcTag: "020",
              ind1: " ",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "9780062343239",
                },
                {
                  tag: "q",
                  content: "(electronic bk.)",
                },
              ],
            },
          },
          {
            content: "0062343238 (electronic bk.)",
            source: {
              fieldTag: "i",
              marcTag: "020",
              ind1: " ",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "0062343238",
                },
                {
                  tag: "q",
                  content: "(electronic bk.)",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Branch Call Number",
        values: [
          {
            content: "eNYPL Book",
            source: {
              fieldTag: "c",
              marcTag: "091",
              ind1: " ",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "eNYPL Book",
                },
              ],
            },
          },
        ],
      },
    ],
  },
}

export const bibWithFindingAidAndTOC = {
  resource: {
    "@context":
      "http://discovery-api-production.us-east-1.elasticbeanstalk.com/api/v0.1/discovery/context_all.jsonld",
    "@type": ["nypl:Item", "nypl:Resource"],
    "@id": "res:b21255464",
    carrierType: [
      {
        "@id": "carriertypes:nc",
        prefLabel: "volume",
      },
    ],
    contributorLiteral: ["Long, Ethan", "OverDrive, Inc."],
    createdString: ["2016"],
    createdYear: 2016,
    creatorLiteral: ["Watson, Tom, 1965-"],
    dateStartYear: 2016,
    dateString: ["2016"],
    description: [
      "When they come across spaghetti in their search for a tug-of-war rope, Stick Dog and his hungry friends go on a quest for more pasta that sees them scale their suburb's tallest mountain and sneak into a restaurant filled with humans.",
    ],
    electronicResources: [
      {
        url: "http://link.overdrive.com/?websiteID=37&titleID=2559851",
        prefLabel: "Access eNYPL",
      },
      {
        url: "http://link.overdrive.com/?websiteID=37&titleID=2559851",
        prefLabel: "Table of contents only",
      },
    ],
    extent: ["1 online resource (238 pages) : illustrations."],
    genreForm: ["Humorous fiction."],
    idIsbn: ["9780062343239", "0062343238"],
    idOclc: ["959966725"],
    identifier: [
      {
        "@type": "nypl:Bnumber",
        "@value": "21255464",
      },
      {
        "@type": "bf:Isbn",
        "@value": "9780062343239",
      },
      {
        "@type": "bf:Isbn",
        "@value": "0062343238",
      },
      {
        "@type": "nypl:Oclc",
        "@value": "959966725",
      },
      {
        "@type": "nypl:Oclc",
        "@value": "959966725",
      },
      {
        "@type": "bf:Identifier",
        "@value": "(OCoLC)959966725",
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
            value: "Text",
            count: 1,
            label: "Text",
          },
        ],
      },
      {
        "@type": "nypl:Aggregation",
        "@id": "res:status",
        id: "status",
        field: "status",
        values: [],
      },
    ],
    items: [],
    language: [
      {
        "@id": "lang:eng",
        prefLabel: "English",
      },
    ],
    lccClassification: ["FICTION WAT"],
    format: [
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
    numAvailable: 0,
    numCheckinCardItems: 0,
    numElectronicResources: 1,
    numItemDatesParsed: 0,
    numItemVolumesParsed: 0,
    numItems: 0,
    numItemsMatched: 0,
    numItemsTotal: 0,
    nyplSource: ["sierra-nypl"],
    placeOfPublication: ["New York, NY"],
    publicationStatement: [
      "New York, NY : Harper, An Imprint of HarperCollinsPublishers, [2016]",
    ],
    publisherLiteral: ["Harper, An Imprint of HarperCollinsPublishers"],
    subjectLiteral: [
      "Dogs -- Fiction.",
      "Pasta products -- Fiction.",
      "Friendship -- Fiction.",
      "Illustrated children's books.",
    ],
    supplementaryContent: [
      {
        "@type": "nypl:SupplementaryContent",
        label: "Image",
        url: "http://images.contentreserve.com/ImageType-100/0293-1/{C87D2BB9-0E13-4851-A9E2-547643F41A0E}Img100.jpg",
      },
      {
        "@type": "nypl:SupplementaryContent",
        label: "Finding Aid",
        url: "http://archives.nypl.org/scm/20601",
      },
    ],
    title: ["Stick Dog slurps spaghetti"],
    titleDisplay: [
      "Stick Dog slurps spaghetti / by Tom Watson ; [illustrations by Ethan Long based on original sketches by Tom Watson].",
    ],
    type: ["nypl:Item"],
    updatedAt: 1681297059060,
    uri: "b21255464",
    suppressed: false,
    hasItemVolumes: false,
    hasItemDates: false,
  },
  annotatedMarc: {
    id: "21255464",
    nyplSource: "sierra-nypl",
    fields: [
      {
        label: "Author",
        values: [
          {
            content: "Watson, Tom, 1965- author.",
            source: {
              fieldTag: "a",
              marcTag: "100",
              ind1: "1",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "Watson, Tom,",
                },
                {
                  tag: "d",
                  content: "1965-",
                },
                {
                  tag: "e",
                  content: "author.",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Title",
        values: [
          {
            content:
              "Stick Dog slurps spaghetti / by Tom Watson ; [illustrations by Ethan Long based on original sketches by Tom Watson].",
            source: {
              fieldTag: "t",
              marcTag: "245",
              ind1: "1",
              ind2: "0",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "Stick Dog slurps spaghetti /",
                },
                {
                  tag: "c",
                  content:
                    "by Tom Watson ; [illustrations by Ethan Long based on original sketches by Tom Watson].",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Publisher",
        values: [
          {
            content:
              "New York, NY : Harper, An Imprint of HarperCollinsPublishers, [2016]",
            source: {
              fieldTag: "p",
              marcTag: "264",
              ind1: " ",
              ind2: "1",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "New York, NY :",
                },
                {
                  tag: "b",
                  content: "Harper, An Imprint of HarperCollinsPublishers,",
                },
                {
                  tag: "c",
                  content: "[2016]",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Edition",
        values: [
          {
            content: "First edition.",
            source: {
              fieldTag: "e",
              marcTag: "250",
              ind1: " ",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "First edition.",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Description",
        values: [
          {
            content: "1 online resource (238 pages) : illustrations.",
            source: {
              fieldTag: "r",
              marcTag: "300",
              ind1: " ",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "1 online resource (238 pages) :",
                },
                {
                  tag: "b",
                  content: "illustrations.",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Type of Content",
        values: [
          {
            content: "text",
            source: {
              fieldTag: "r",
              marcTag: "336",
              ind1: " ",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "text",
                },
                {
                  tag: "b",
                  content: "[redacted]",
                },
                {
                  tag: "2",
                  content: "[redacted]",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Type of Medium",
        values: [
          {
            content: "computer",
            source: {
              fieldTag: "r",
              marcTag: "337",
              ind1: " ",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "computer",
                },
                {
                  tag: "b",
                  content: "[redacted]",
                },
                {
                  tag: "2",
                  content: "[redacted]",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Type of Carrier",
        values: [
          {
            content: "online resource",
            source: {
              fieldTag: "r",
              marcTag: "338",
              ind1: " ",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "online resource",
                },
                {
                  tag: "b",
                  content: "[redacted]",
                },
                {
                  tag: "2",
                  content: "[redacted]",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Summary",
        values: [
          {
            content:
              "When they come across spaghetti in their search for a tug-of-war rope, Stick Dog and his hungry friends go on a quest for more pasta that sees them scale their suburb's tallest mountain and sneak into a restaurant filled with humans.",
            source: {
              fieldTag: "n",
              marcTag: "520",
              ind1: " ",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content:
                    "When they come across spaghetti in their search for a tug-of-war rope, Stick Dog and his hungry friends go on a quest for more pasta that sees them scale their suburb's tallest mountain and sneak into a restaurant filled with humans.",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Source of description",
        values: [
          {
            content: "Print version record.",
            source: {
              fieldTag: "n",
              marcTag: "588",
              ind1: "0",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "Print version record.",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Connect to:",
        values: [
          {
            label: "Access eNYPL",
            content: "http://link.overdrive.com/?websiteID=37&titleID=2559851",
            source: {
              fieldTag: "y",
              marcTag: "856",
              ind1: "4",
              ind2: "0",
              content: null,
              subfields: [
                {
                  tag: "u",
                  content:
                    "http://link.overdrive.com/?websiteID=37&titleID=2559851",
                },
                {
                  tag: "y",
                  content: "[redacted]",
                },
              ],
            },
          },
          {
            label: "Image",
            content:
              "http://images.contentreserve.com/ImageType-100/0293-1/{C87D2BB9-0E13-4851-A9E2-547643F41A0E}Img100.jpg",
            source: {
              fieldTag: "y",
              marcTag: "856",
              ind1: "4",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "3",
                  content: "[redacted]",
                },
                {
                  tag: "u",
                  content:
                    "http://images.contentreserve.com/ImageType-100/0293-1/{C87D2BB9-0E13-4851-A9E2-547643F41A0E}Img100.jpg",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Subject",
        values: [
          {
            content: "Dogs -- Fiction.",
            source: {
              fieldTag: "d",
              marcTag: "650",
              ind1: " ",
              ind2: "1",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "Dogs",
                },
                {
                  tag: "v",
                  content: "Fiction.",
                },
              ],
            },
          },
          {
            content: "Pasta products -- Fiction.",
            source: {
              fieldTag: "d",
              marcTag: "650",
              ind1: " ",
              ind2: "1",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "Pasta products",
                },
                {
                  tag: "v",
                  content: "Fiction.",
                },
              ],
            },
          },
          {
            content: "Friendship -- Fiction.",
            source: {
              fieldTag: "d",
              marcTag: "650",
              ind1: " ",
              ind2: "1",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "Friendship",
                },
                {
                  tag: "v",
                  content: "Fiction.",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Genre/Form",
        values: [
          {
            content: "Humorous fiction.",
            source: {
              fieldTag: "d",
              marcTag: "655",
              ind1: " ",
              ind2: "7",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "Humorous fiction.",
                },
                {
                  tag: "2",
                  content: "[redacted]",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Subject",
        values: [
          {
            content: "Illustrated children's books.",
            source: {
              fieldTag: "d",
              marcTag: "650",
              ind1: " ",
              ind2: "0",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "Illustrated children's books.",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Genre/Form",
        values: [
          {
            content: "Humorous fiction.",
            source: {
              fieldTag: "d",
              marcTag: "655",
              ind1: " ",
              ind2: "7",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "Humorous fiction.",
                },
                {
                  tag: "2",
                  content: "[redacted]",
                },
                {
                  tag: "0",
                  content: "[redacted]",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Subject",
        values: [
          {
            content: "Illustrated children's books.",
            source: {
              fieldTag: "d",
              marcTag: "650",
              ind1: " ",
              ind2: "7",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "Illustrated children's books.",
                },
                {
                  tag: "2",
                  content: "[redacted]",
                },
                {
                  tag: "0",
                  content: "[redacted]",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Genre/Form",
        values: [
          {
            content: "Electronic books.",
            source: {
              fieldTag: "d",
              marcTag: "655",
              ind1: " ",
              ind2: "0",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "Electronic books.",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Added Author",
        values: [
          {
            content: "Long, Ethan, illustrator.",
            source: {
              fieldTag: "b",
              marcTag: "700",
              ind1: "1",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "Long, Ethan,",
                },
                {
                  tag: "e",
                  content: "illustrator.",
                },
              ],
            },
          },
          {
            content: "OverDrive, Inc.",
            source: {
              fieldTag: "b",
              marcTag: "710",
              ind1: "2",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "OverDrive, Inc.",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Other Form:",
        values: [
          {
            content:
              "Print version: Watson, Tom, 1965- Stick Dog slurps spaghetti. First edition. New York, NY : Harper, An Imprint of HarperCollinsPublishers, [2016] 006234322X (DLC)  2016932092 (OCoLC)935985696",
            source: {
              fieldTag: "w",
              marcTag: "776",
              ind1: "0",
              ind2: "8",
              content: null,
              subfields: [
                {
                  tag: "i",
                  content: "Print version:",
                },
                {
                  tag: "a",
                  content: "Watson, Tom, 1965-",
                },
                {
                  tag: "t",
                  content: "Stick Dog slurps spaghetti.",
                },
                {
                  tag: "b",
                  content: "First edition.",
                },
                {
                  tag: "d",
                  content:
                    "New York, NY : Harper, An Imprint of HarperCollinsPublishers, [2016]",
                },
                {
                  tag: "z",
                  content: "006234322X",
                },
                {
                  tag: "w",
                  content: "(DLC)  2016932092",
                },
                {
                  tag: "w",
                  content: "(OCoLC)935985696",
                },
              ],
            },
          },
        ],
      },
      {
        label: "ISBN",
        values: [
          {
            content: "9780062343239 (electronic bk.)",
            source: {
              fieldTag: "i",
              marcTag: "020",
              ind1: " ",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "9780062343239",
                },
                {
                  tag: "q",
                  content: "(electronic bk.)",
                },
              ],
            },
          },
          {
            content: "0062343238 (electronic bk.)",
            source: {
              fieldTag: "i",
              marcTag: "020",
              ind1: " ",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "0062343238",
                },
                {
                  tag: "q",
                  content: "(electronic bk.)",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Branch Call Number",
        values: [
          {
            content: "eNYPL Book",
            source: {
              fieldTag: "c",
              marcTag: "091",
              ind1: " ",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "eNYPL Book",
                },
              ],
            },
          },
        ],
      },
    ],
  },
}

export const parallelsBib = {
  resource: {
    "@context":
      "http://discovery-api-production.us-east-1.elasticbeanstalk.com/api/v0.1/discovery/context_all.jsonld",
    "@type": ["nypl:Item", "nypl:Resource"],
    "@id": "res:b15349955",
    carrierType: [
      {
        "@id": "carriertypes:nc",
        prefLabel: "volume",
      },
    ],
    contributorLiteral: [
      'Narodna biblioteka "Stefan Prvovenčani", issuing body.',
      "Narodna biblioteka Kraljevo, issuing body.",
      'Narodna biblioteka "Radoslav Vesnić" Kraljevo, issuing body.',
    ],
    createdString: ["1985"],
    createdYear: 1985,
    dateEndString: ["9999"],
    dateEndYear: 9999,
    dateStartYear: 1985,
    dateString: ["1985"],
    description: [
      '"Časopis za književnosti, umetnost, kulturu, prosvetna i društvena pitanja."',
    ],
    dimensions: ["25 cm"],
    donor: [
      "Gift of the DeWitt Wallace Endowment Fund, named in honor of the founder of Reader's Digest",
    ],
    electronicResources: [],
    extent: ["volumes ;"],
    genreForm: ["Periodicals."],
    holdings: [
      {
        checkInBoxes: [
          {
            coverage: "Vol. 43 No. 1 (2013)",
            position: 1,
            type: "nypl:CheckInBox",
            shelfMark: ["*QKKA 08-490"],
            status: "Arrived",
          },
          {
            coverage: "Vol. 43 No. 2 (2013)",
            position: 2,
            type: "nypl:CheckInBox",
            shelfMark: ["*QKKA 08-490"],
            status: "Arrived",
          },
          {
            coverage: "Vol. 43 No. 3 (2013)",
            position: 3,
            type: "nypl:CheckInBox",
            shelfMark: ["*QKKA 08-490"],
            status: "Missing",
          },
          {
            coverage: "Vol. 44 No. 1 (2014)",
            position: 4,
            type: "nypl:CheckInBox",
            shelfMark: ["*QKKA 08-490"],
            status: "Arrived",
          },
          {
            coverage: "Vol. 44 No. 2 (2014)",
            position: 5,
            type: "nypl:CheckInBox",
            shelfMark: ["*QKKA 08-490"],
            status: "Arrived",
          },
          {
            coverage: "Vol. 44 No. 3 (2014)",
            position: 6,
            type: "nypl:CheckInBox",
            shelfMark: ["*QKKA 08-490"],
            status: "Arrived",
          },
          {
            coverage: "Vol. 45 No. 1 (2015)",
            position: 7,
            type: "nypl:CheckInBox",
            shelfMark: ["*QKKA 08-490"],
            status: "Arrived",
          },
          {
            coverage: "Vol. 45 No. 3 (2015)",
            position: 8,
            type: "nypl:CheckInBox",
            shelfMark: ["*QKKA 08-490"],
            status: "Arrived",
          },
          {
            coverage: "Vol. 46 No. 1 (2016)",
            position: 9,
            type: "nypl:CheckInBox",
            shelfMark: ["*QKKA 08-490"],
            status: "Arrived",
          },
          {
            coverage: "Vol. 46 No. 2 (2016)",
            position: 10,
            type: "nypl:CheckInBox",
            shelfMark: ["*QKKA 08-490"],
            status: "Arrived",
          },
          {
            coverage: "Vol. 46 No. 3 (2016)",
            position: 11,
            type: "nypl:CheckInBox",
            shelfMark: ["*QKKA 08-490"],
            status: "Arrived",
          },
          {
            coverage: "Vol. 47 No. 1 (2017)",
            position: 12,
            type: "nypl:CheckInBox",
            shelfMark: ["*QKKA 08-490"],
            status: "Arrived",
          },
          {
            coverage: "Vol. 47 No. 2 (2017)",
            position: 13,
            type: "nypl:CheckInBox",
            shelfMark: ["*QKKA 08-490"],
            status: "Expected",
          },
          {
            coverage: "Vol. 47 No. 3 (2017)",
            position: 14,
            type: "nypl:CheckInBox",
            shelfMark: ["*QKKA 08-490"],
            status: "Arrived",
          },
          {
            coverage: "Vol. 48 No. 1 (2018)",
            position: 15,
            type: "nypl:CheckInBox",
            shelfMark: ["*QKKA 08-490"],
            status: "Arrived",
          },
          {
            coverage: "Vol. 48 No. 2 (2018)",
            position: 16,
            type: "nypl:CheckInBox",
            shelfMark: ["*QKKA 08-490"],
            status: "Arrived",
          },
          {
            coverage: "Vol. 48 No. 3 (2018)",
            position: 17,
            type: "nypl:CheckInBox",
            shelfMark: ["*QKKA 08-490"],
            status: "Arrived",
          },
          {
            coverage: "Vol. 49 No. 1 (2019)",
            position: 18,
            type: "nypl:CheckInBox",
            shelfMark: ["*QKKA 08-490"],
            status: "Arrived",
          },
          {
            coverage: "Vol. 49 No. 2 (2019)",
            position: 19,
            type: "nypl:CheckInBox",
            shelfMark: ["*QKKA 08-490"],
            status: "Arrived",
          },
          {
            coverage: "Vol. 49 No. 3 (2019)",
            position: 20,
            type: "nypl:CheckInBox",
            shelfMark: ["*QKKA 08-490"],
            status: "Arrived",
          },
          {
            coverage: "Vol. 50 No. 1 (2020)",
            position: 21,
            type: "nypl:CheckInBox",
            shelfMark: ["*QKKA 08-490"],
            status: "Expected",
          },
          {
            coverage: "Vol. 50 No. 2 (2020)",
            position: 22,
            type: "nypl:CheckInBox",
            shelfMark: ["*QKKA 08-490"],
            status: "Expected",
          },
          {
            coverage: "Vol. 50 No. 3 (2020)",
            position: 23,
            type: "nypl:CheckInBox",
            shelfMark: ["*QKKA 08-490"],
            status: "Expected",
          },
          {
            coverage: "Vol. 51 No. 1 (2021)",
            position: 24,
            type: "nypl:CheckInBox",
            shelfMark: ["*QKKA 08-490"],
            status: "Expected",
          },
          {
            coverage: "Vol. 51 No. 2 (2021)",
            position: 25,
            type: "nypl:CheckInBox",
            shelfMark: ["*QKKA 08-490"],
            status: "Expected",
          },
          {
            coverage: "Vol. 51 No. 3 (2021)",
            position: 26,
            type: "nypl:CheckInBox",
            shelfMark: ["*QKKA 08-490"],
            status: "Arrived",
          },
          {
            coverage: "Vol. 52 No. 1 (2022)",
            position: 27,
            type: "nypl:CheckInBox",
            shelfMark: ["*QKKA 08-490"],
            status: "Expected",
          },
        ],
        holdingStatement: [
          "29(1999)-36:1(2006), 39:1(2009)-43:2(2013), 44(2014), 45:2(2015)-47:1(2017), 47:3(2017)-49(2019), 51:3(2021)- [incomplete]-",
        ],
        identifier: [
          {
            type: "bf:shelfMark",
            value: "*QKKA 08-490",
          },
        ],
        physicalLocation: ["*QKKA 08-490"],
        location: [
          {
            code: "loc:rc2ma",
            label: "Offsite",
          },
        ],
        shelfMark: ["*QKKA 08-490"],
        uri: "h1047859",
      },
    ],
    idIssn: ["0352-7751"],
    idLccn: ["sn 95033418"],
    idOclc: ["32768016"],
    identifier: [
      {
        "@type": "bf:ShelfMark",
        "@value": "*QKKA 08-490",
      },
      {
        "@type": "nypl:Bnumber",
        "@value": "15349955",
      },
      {
        "@type": "nypl:Oclc",
        "@value": "32768016",
      },
      {
        "@type": "bf:Lccn",
        "@value": "sn 95033418",
      },
      {
        "@type": "bf:Issn",
        "@value": "0352-7751",
      },
      {
        "@type": "bf:Identifier",
        "@value": "(OCoLC)32768016",
      },
    ],
    issuance: [
      {
        "@id": "urn:biblevel:s",
        prefLabel: "serial",
      },
    ],
    itemAggregations: [
      {
        "@type": "nypl:Aggregation",
        "@id": "res:location",
        id: "location",
        field: "location",
        values: [
          {
            value: "loc:rc2ma",
            count: 29,
            label: "Offsite",
          },
          {
            value: "loc:rcma2",
            count: 4,
            label: "Offsite",
          },
        ],
      },
      {
        "@type": "nypl:Aggregation",
        "@id": "res:format",
        id: "format",
        field: "format",
        values: [
          {
            value: "Text",
            count: 33,
            label: "Text",
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
            value: "status:a",
            count: 33,
            label: "Available",
          },
        ],
      },
    ],
    items: [
      {
        "@id": "res:i39598083",
        "@type": ["bf:Item"],
        accessMessage: [
          {
            "@id": "accessMessage:2",
            prefLabel: "Request in advance",
          },
        ],
        catalogItemType: [
          {
            "@id": "catalogItemType:3",
            prefLabel: "serial",
          },
        ],
        dateRange: [
          {
            gte: "2021",
            lte: "2021",
          },
        ],
        eddRequestable: true,
        enumerationChronology: ["v. 51, no. 3 (2021)"],
        formatLiteral: ["Text"],
        holdingLocation: [
          {
            "@id": "loc:rc2ma",
            prefLabel: "Offsite",
          },
        ],
        idBarcode: ["33433133804421"],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value": "*QKKA 08-490 v. 51, no. 3 (2021)",
          },
          {
            "@type": "bf:Barcode",
            "@value": "33433133804421",
          },
        ],
        owner: [
          {
            "@id": "orgs:1000",
            prefLabel: "Stephen A. Schwarzman Building",
          },
        ],
        physRequestable: true,
        physicalLocation: ["*QKKA 08-490"],
        recapCustomerCode: ["NA"],
        requestable: [true],
        shelfMark: ["*QKKA 08-490 v. 51, no. 3 (2021)"],
        specRequestable: false,
        status: [
          {
            "@id": "status:a",
            prefLabel: "Available",
          },
        ],
        uri: "i39598083",
        volumeRange: [
          {
            gte: 51,
            lte: 51,
          },
        ],
        idNyplSourceId: {
          "@type": "SierraNypl",
          "@value": "39598083",
        },
      },
      {
        "@id": "res:i37781503",
        "@type": ["bf:Item"],
        accessMessage: [
          {
            "@id": "accessMessage:2",
            prefLabel: "Request in advance",
          },
        ],
        catalogItemType: [
          {
            "@id": "catalogItemType:4",
            prefLabel: "serial, loose",
          },
        ],
        dateRange: [
          {
            gte: "2019",
            lte: "2019",
          },
        ],
        eddRequestable: true,
        enumerationChronology: ["v. 49, no. 1 (2019)"],
        formatLiteral: ["Text"],
        holdingLocation: [
          {
            "@id": "loc:rc2ma",
            prefLabel: "Offsite",
          },
        ],
        idBarcode: ["33433128574252"],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value": "*QKKA 08-490 v. 49, no. 1 (2019)",
          },
          {
            "@type": "bf:Barcode",
            "@value": "33433128574252",
          },
        ],
        owner: [
          {
            "@id": "orgs:1000",
            prefLabel: "Stephen A. Schwarzman Building",
          },
        ],
        physRequestable: true,
        physicalLocation: ["*QKKA 08-490"],
        recapCustomerCode: ["NA"],
        requestable: [true],
        shelfMark: ["*QKKA 08-490 v. 49, no. 1 (2019)"],
        specRequestable: false,
        status: [
          {
            "@id": "status:a",
            prefLabel: "Available",
          },
        ],
        uri: "i37781503",
        volumeRange: [
          {
            gte: 49,
            lte: 49,
          },
        ],
        idNyplSourceId: {
          "@type": "SierraNypl",
          "@value": "37781503",
        },
      },
      {
        "@id": "res:i37750298",
        "@type": ["bf:Item"],
        accessMessage: [
          {
            "@id": "accessMessage:2",
            prefLabel: "Request in advance",
          },
        ],
        catalogItemType: [
          {
            "@id": "catalogItemType:4",
            prefLabel: "serial, loose",
          },
        ],
        dateRange: [
          {
            gte: "2019",
            lte: "2019",
          },
        ],
        eddRequestable: true,
        enumerationChronology: ["v. 49, no. 2 (2019)"],
        formatLiteral: ["Text"],
        holdingLocation: [
          {
            "@id": "loc:rc2ma",
            prefLabel: "Offsite",
          },
        ],
        idBarcode: ["33433128572629"],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value": "*QKKA 08-490 v. 49, no. 2 (2019)",
          },
          {
            "@type": "bf:Barcode",
            "@value": "33433128572629",
          },
        ],
        owner: [
          {
            "@id": "orgs:1000",
            prefLabel: "Stephen A. Schwarzman Building",
          },
        ],
        physRequestable: true,
        physicalLocation: ["*QKKA 08-490"],
        recapCustomerCode: ["NA"],
        requestable: [true],
        shelfMark: ["*QKKA 08-490 v. 49, no. 2 (2019)"],
        specRequestable: false,
        status: [
          {
            "@id": "status:a",
            prefLabel: "Available",
          },
        ],
        uri: "i37750298",
        volumeRange: [
          {
            gte: 49,
            lte: 49,
          },
        ],
        idNyplSourceId: {
          "@type": "SierraNypl",
          "@value": "37750298",
        },
      },
      {
        "@id": "res:i38171379",
        "@type": ["bf:Item"],
        accessMessage: [
          {
            "@id": "accessMessage:2",
            prefLabel: "Request in advance",
          },
        ],
        catalogItemType: [
          {
            "@id": "catalogItemType:4",
            prefLabel: "serial, loose",
          },
        ],
        dateRange: [
          {
            gte: "2019",
            lte: "2019",
          },
        ],
        eddRequestable: true,
        enumerationChronology: ["v. 49, no. 3 (2019)"],
        formatLiteral: ["Text"],
        holdingLocation: [
          {
            "@id": "loc:rc2ma",
            prefLabel: "Offsite",
          },
        ],
        idBarcode: ["33433130183837"],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value": "*QKKA 08-490 v. 49, no. 3 (2019)",
          },
          {
            "@type": "bf:Barcode",
            "@value": "33433130183837",
          },
        ],
        owner: [
          {
            "@id": "orgs:1000",
            prefLabel: "Stephen A. Schwarzman Building",
          },
        ],
        physRequestable: true,
        physicalLocation: ["*QKKA 08-490"],
        recapCustomerCode: ["NA"],
        requestable: [true],
        shelfMark: ["*QKKA 08-490 v. 49, no. 3 (2019)"],
        specRequestable: false,
        status: [
          {
            "@id": "status:a",
            prefLabel: "Available",
          },
        ],
        uri: "i38171379",
        volumeRange: [
          {
            gte: 49,
            lte: 49,
          },
        ],
        idNyplSourceId: {
          "@type": "SierraNypl",
          "@value": "38171379",
        },
      },
      {
        "@id": "res:i37781404",
        "@type": ["bf:Item"],
        accessMessage: [
          {
            "@id": "accessMessage:2",
            prefLabel: "Request in advance",
          },
        ],
        catalogItemType: [
          {
            "@id": "catalogItemType:4",
            prefLabel: "serial, loose",
          },
        ],
        dateRange: [
          {
            gte: "2018",
            lte: "2018",
          },
        ],
        eddRequestable: true,
        enumerationChronology: ["v. 48, no. 1 (2018)"],
        formatLiteral: ["Text"],
        holdingLocation: [
          {
            "@id": "loc:rc2ma",
            prefLabel: "Offsite",
          },
        ],
        idBarcode: ["33433128574229"],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value": "*QKKA 08-490 v. 48, no. 1 (2018)",
          },
          {
            "@type": "bf:Barcode",
            "@value": "33433128574229",
          },
        ],
        owner: [
          {
            "@id": "orgs:1000",
            prefLabel: "Stephen A. Schwarzman Building",
          },
        ],
        physRequestable: true,
        physicalLocation: ["*QKKA 08-490"],
        recapCustomerCode: ["NA"],
        requestable: [true],
        shelfMark: ["*QKKA 08-490 v. 48, no. 1 (2018)"],
        specRequestable: false,
        status: [
          {
            "@id": "status:a",
            prefLabel: "Available",
          },
        ],
        uri: "i37781404",
        volumeRange: [
          {
            gte: 48,
            lte: 48,
          },
        ],
        idNyplSourceId: {
          "@type": "SierraNypl",
          "@value": "37781404",
        },
      },
      {
        "@id": "res:i37781426",
        "@type": ["bf:Item"],
        accessMessage: [
          {
            "@id": "accessMessage:2",
            prefLabel: "Request in advance",
          },
        ],
        catalogItemType: [
          {
            "@id": "catalogItemType:4",
            prefLabel: "serial, loose",
          },
        ],
        dateRange: [
          {
            gte: "2018",
            lte: "2018",
          },
        ],
        eddRequestable: true,
        enumerationChronology: ["v. 48, no. 2 (2018)"],
        formatLiteral: ["Text"],
        holdingLocation: [
          {
            "@id": "loc:rc2ma",
            prefLabel: "Offsite",
          },
        ],
        idBarcode: ["33433128574237"],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value": "*QKKA 08-490 v. 48, no. 2 (2018)",
          },
          {
            "@type": "bf:Barcode",
            "@value": "33433128574237",
          },
        ],
        owner: [
          {
            "@id": "orgs:1000",
            prefLabel: "Stephen A. Schwarzman Building",
          },
        ],
        physRequestable: true,
        physicalLocation: ["*QKKA 08-490"],
        recapCustomerCode: ["NA"],
        requestable: [true],
        shelfMark: ["*QKKA 08-490 v. 48, no. 2 (2018)"],
        specRequestable: false,
        status: [
          {
            "@id": "status:a",
            prefLabel: "Available",
          },
        ],
        uri: "i37781426",
        volumeRange: [
          {
            gte: 48,
            lte: 48,
          },
        ],
        idNyplSourceId: {
          "@type": "SierraNypl",
          "@value": "37781426",
        },
      },
      {
        "@id": "res:i37781460",
        "@type": ["bf:Item"],
        accessMessage: [
          {
            "@id": "accessMessage:2",
            prefLabel: "Request in advance",
          },
        ],
        catalogItemType: [
          {
            "@id": "catalogItemType:4",
            prefLabel: "serial, loose",
          },
        ],
        dateRange: [
          {
            gte: "2018",
            lte: "2018",
          },
        ],
        eddRequestable: true,
        enumerationChronology: ["v. 48, no. 3 (2018)"],
        formatLiteral: ["Text"],
        holdingLocation: [
          {
            "@id": "loc:rc2ma",
            prefLabel: "Offsite",
          },
        ],
        idBarcode: ["33433128574245"],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value": "*QKKA 08-490 v. 48, no. 3 (2018)",
          },
          {
            "@type": "bf:Barcode",
            "@value": "33433128574245",
          },
        ],
        owner: [
          {
            "@id": "orgs:1000",
            prefLabel: "Stephen A. Schwarzman Building",
          },
        ],
        physRequestable: true,
        physicalLocation: ["*QKKA 08-490"],
        recapCustomerCode: ["NA"],
        requestable: [true],
        shelfMark: ["*QKKA 08-490 v. 48, no. 3 (2018)"],
        specRequestable: false,
        status: [
          {
            "@id": "status:a",
            prefLabel: "Available",
          },
        ],
        uri: "i37781460",
        volumeRange: [
          {
            gte: 48,
            lte: 48,
          },
        ],
        idNyplSourceId: {
          "@type": "SierraNypl",
          "@value": "37781460",
        },
      },
      {
        "@id": "res:i36148948",
        "@type": ["bf:Item"],
        accessMessage: [
          {
            "@id": "accessMessage:2",
            prefLabel: "Request in advance",
          },
        ],
        catalogItemType: [
          {
            "@id": "catalogItemType:3",
            prefLabel: "serial",
          },
        ],
        dateRange: [
          {
            gte: "2017",
            lte: "2017",
          },
        ],
        eddRequestable: true,
        enumerationChronology: ["v. 47, no. 1 (2017)"],
        formatLiteral: ["Text"],
        holdingLocation: [
          {
            "@id": "loc:rc2ma",
            prefLabel: "Offsite",
          },
        ],
        idBarcode: ["33433121646594"],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value": "*QKKA 08-490 v. 47, no. 1 (2017)",
          },
          {
            "@type": "bf:Barcode",
            "@value": "33433121646594",
          },
        ],
        owner: [
          {
            "@id": "orgs:1000",
            prefLabel: "Stephen A. Schwarzman Building",
          },
        ],
        physRequestable: true,
        physicalLocation: ["*QKKA 08-490"],
        recapCustomerCode: ["NA"],
        requestable: [true],
        shelfMark: ["*QKKA 08-490 v. 47, no. 1 (2017)"],
        specRequestable: false,
        status: [
          {
            "@id": "status:a",
            prefLabel: "Available",
          },
        ],
        uri: "i36148948",
        volumeRange: [
          {
            gte: 47,
            lte: 47,
          },
        ],
        idNyplSourceId: {
          "@type": "SierraNypl",
          "@value": "36148948",
        },
      },
      {
        "@id": "res:i36707995",
        "@type": ["bf:Item"],
        accessMessage: [
          {
            "@id": "accessMessage:2",
            prefLabel: "Request in advance",
          },
        ],
        catalogItemType: [
          {
            "@id": "catalogItemType:3",
            prefLabel: "serial",
          },
        ],
        dateRange: [
          {
            gte: "2017",
            lte: "2017",
          },
        ],
        eddRequestable: true,
        enumerationChronology: ["v. 47, no. 3 (2017)"],
        formatLiteral: ["Text"],
        holdingLocation: [
          {
            "@id": "loc:rc2ma",
            prefLabel: "Offsite",
          },
        ],
        idBarcode: ["33433121678811"],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value": "*QKKA 08-490 v. 47, no. 3 (2017)",
          },
          {
            "@type": "bf:Barcode",
            "@value": "33433121678811",
          },
        ],
        owner: [
          {
            "@id": "orgs:1000",
            prefLabel: "Stephen A. Schwarzman Building",
          },
        ],
        physRequestable: true,
        physicalLocation: ["*QKKA 08-490"],
        recapCustomerCode: ["NA"],
        requestable: [true],
        shelfMark: ["*QKKA 08-490 v. 47, no. 3 (2017)"],
        specRequestable: false,
        status: [
          {
            "@id": "status:a",
            prefLabel: "Available",
          },
        ],
        uri: "i36707995",
        volumeRange: [
          {
            gte: 47,
            lte: 47,
          },
        ],
        idNyplSourceId: {
          "@type": "SierraNypl",
          "@value": "36707995",
        },
      },
      {
        "@id": "res:i35541890",
        "@type": ["bf:Item"],
        accessMessage: [
          {
            "@id": "accessMessage:2",
            prefLabel: "Request in advance",
          },
        ],
        catalogItemType: [
          {
            "@id": "catalogItemType:3",
            prefLabel: "serial",
          },
        ],
        dateRange: [
          {
            gte: "2016",
            lte: "2016",
          },
        ],
        eddRequestable: true,
        enumerationChronology: ["v. 46, no. 1 (2016)"],
        formatLiteral: ["Text"],
        holdingLocation: [
          {
            "@id": "loc:rc2ma",
            prefLabel: "Offsite",
          },
        ],
        idBarcode: ["33433121625903"],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value": "*QKKA 08-490 v. 46, no. 1 (2016)",
          },
          {
            "@type": "bf:Barcode",
            "@value": "33433121625903",
          },
        ],
        owner: [
          {
            "@id": "orgs:1000",
            prefLabel: "Stephen A. Schwarzman Building",
          },
        ],
        physRequestable: true,
        physicalLocation: ["*QKKA 08-490"],
        recapCustomerCode: ["NA"],
        requestable: [true],
        shelfMark: ["*QKKA 08-490 v. 46, no. 1 (2016)"],
        specRequestable: false,
        status: [
          {
            "@id": "status:a",
            prefLabel: "Available",
          },
        ],
        uri: "i35541890",
        volumeRange: [
          {
            gte: 46,
            lte: 46,
          },
        ],
        idNyplSourceId: {
          "@type": "SierraNypl",
          "@value": "35541890",
        },
      },
      {
        "@id": "res:i35541893",
        "@type": ["bf:Item"],
        accessMessage: [
          {
            "@id": "accessMessage:2",
            prefLabel: "Request in advance",
          },
        ],
        catalogItemType: [
          {
            "@id": "catalogItemType:3",
            prefLabel: "serial",
          },
        ],
        dateRange: [
          {
            gte: "2016",
            lte: "2016",
          },
        ],
        eddRequestable: true,
        enumerationChronology: ["v. 46, no. 2 (2016)"],
        formatLiteral: ["Text"],
        holdingLocation: [
          {
            "@id": "loc:rc2ma",
            prefLabel: "Offsite",
          },
        ],
        idBarcode: ["33433121625911"],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value": "*QKKA 08-490 v. 46, no. 2 (2016)",
          },
          {
            "@type": "bf:Barcode",
            "@value": "33433121625911",
          },
        ],
        owner: [
          {
            "@id": "orgs:1000",
            prefLabel: "Stephen A. Schwarzman Building",
          },
        ],
        physRequestable: true,
        physicalLocation: ["*QKKA 08-490"],
        recapCustomerCode: ["NA"],
        requestable: [true],
        shelfMark: ["*QKKA 08-490 v. 46, no. 2 (2016)"],
        specRequestable: false,
        status: [
          {
            "@id": "status:a",
            prefLabel: "Available",
          },
        ],
        uri: "i35541893",
        volumeRange: [
          {
            gte: 46,
            lte: 46,
          },
        ],
        idNyplSourceId: {
          "@type": "SierraNypl",
          "@value": "35541893",
        },
      },
      {
        "@id": "res:i35541897",
        "@type": ["bf:Item"],
        accessMessage: [
          {
            "@id": "accessMessage:2",
            prefLabel: "Request in advance",
          },
        ],
        catalogItemType: [
          {
            "@id": "catalogItemType:3",
            prefLabel: "serial",
          },
        ],
        dateRange: [
          {
            gte: "2016",
            lte: "2016",
          },
        ],
        eddRequestable: true,
        enumerationChronology: ["v. 46, no. 3 (2016)"],
        formatLiteral: ["Text"],
        holdingLocation: [
          {
            "@id": "loc:rc2ma",
            prefLabel: "Offsite",
          },
        ],
        idBarcode: ["33433121625929"],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value": "*QKKA 08-490 v. 46, no. 3 (2016)",
          },
          {
            "@type": "bf:Barcode",
            "@value": "33433121625929",
          },
        ],
        owner: [
          {
            "@id": "orgs:1000",
            prefLabel: "Stephen A. Schwarzman Building",
          },
        ],
        physRequestable: true,
        physicalLocation: ["*QKKA 08-490"],
        recapCustomerCode: ["NA"],
        requestable: [true],
        shelfMark: ["*QKKA 08-490 v. 46, no. 3 (2016)"],
        specRequestable: false,
        status: [
          {
            "@id": "status:a",
            prefLabel: "Available",
          },
        ],
        uri: "i35541897",
        volumeRange: [
          {
            gte: 46,
            lte: 46,
          },
        ],
        idNyplSourceId: {
          "@type": "SierraNypl",
          "@value": "35541897",
        },
      },
      {
        "@id": "res:i35339948",
        "@type": ["bf:Item"],
        accessMessage: [
          {
            "@id": "accessMessage:2",
            prefLabel: "Request in advance",
          },
        ],
        catalogItemType: [
          {
            "@id": "catalogItemType:4",
            prefLabel: "serial, loose",
          },
        ],
        dateRange: [
          {
            gte: "2015",
            lte: "2015",
          },
        ],
        eddRequestable: true,
        enumerationChronology: ["v. 45, no. 2 (2015)"],
        formatLiteral: ["Text"],
        holdingLocation: [
          {
            "@id": "loc:rc2ma",
            prefLabel: "Offsite",
          },
        ],
        idBarcode: ["33433118739402"],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value": "*QKKA 08-490 v. 45, no. 2 (2015)",
          },
          {
            "@type": "bf:Barcode",
            "@value": "33433118739402",
          },
        ],
        owner: [
          {
            "@id": "orgs:1000",
            prefLabel: "Stephen A. Schwarzman Building",
          },
        ],
        physRequestable: true,
        physicalLocation: ["*QKKA 08-490"],
        recapCustomerCode: ["NH"],
        requestable: [true],
        shelfMark: ["*QKKA 08-490 v. 45, no. 2 (2015)"],
        specRequestable: false,
        status: [
          {
            "@id": "status:a",
            prefLabel: "Available",
          },
        ],
        uri: "i35339948",
        volumeRange: [
          {
            gte: 45,
            lte: 45,
          },
        ],
        idNyplSourceId: {
          "@type": "SierraNypl",
          "@value": "35339948",
        },
      },
      {
        "@id": "res:i35026629",
        "@type": ["bf:Item"],
        accessMessage: [
          {
            "@id": "accessMessage:2",
            prefLabel: "Request in advance",
          },
        ],
        catalogItemType: [
          {
            "@id": "catalogItemType:4",
            prefLabel: "serial, loose",
          },
        ],
        dateRange: [
          {
            gte: "2015",
            lte: "2015",
          },
        ],
        eddRequestable: true,
        enumerationChronology: ["v. 45, no. 3 (2015)"],
        formatLiteral: ["Text"],
        holdingLocation: [
          {
            "@id": "loc:rc2ma",
            prefLabel: "Offsite",
          },
        ],
        idBarcode: ["33433121359222"],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value": "*QKKA 08-490 v. 45, no. 3 (2015)",
          },
          {
            "@type": "bf:Barcode",
            "@value": "33433121359222",
          },
        ],
        owner: [
          {
            "@id": "orgs:1000",
            prefLabel: "Stephen A. Schwarzman Building",
          },
        ],
        physRequestable: true,
        physicalLocation: ["*QKKA 08-490"],
        recapCustomerCode: ["NA"],
        requestable: [true],
        shelfMark: ["*QKKA 08-490 v. 45, no. 3 (2015)"],
        specRequestable: false,
        status: [
          {
            "@id": "status:a",
            prefLabel: "Available",
          },
        ],
        uri: "i35026629",
        volumeRange: [
          {
            gte: 45,
            lte: 45,
          },
        ],
        idNyplSourceId: {
          "@type": "SierraNypl",
          "@value": "35026629",
        },
      },
      {
        "@id": "res:i35339925",
        "@type": ["bf:Item"],
        accessMessage: [
          {
            "@id": "accessMessage:2",
            prefLabel: "Request in advance",
          },
        ],
        catalogItemType: [
          {
            "@id": "catalogItemType:4",
            prefLabel: "serial, loose",
          },
        ],
        dateRange: [
          {
            gte: "2014",
            lte: "2014",
          },
        ],
        eddRequestable: true,
        enumerationChronology: ["v. 44, no. 1 (2014)"],
        formatLiteral: ["Text"],
        holdingLocation: [
          {
            "@id": "loc:rc2ma",
            prefLabel: "Offsite",
          },
        ],
        idBarcode: ["33433118739576"],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value": "*QKKA 08-490 v. 44, no. 1 (2014)",
          },
          {
            "@type": "bf:Barcode",
            "@value": "33433118739576",
          },
        ],
        owner: [
          {
            "@id": "orgs:1000",
            prefLabel: "Stephen A. Schwarzman Building",
          },
        ],
        physRequestable: true,
        physicalLocation: ["*QKKA 08-490"],
        recapCustomerCode: ["NH"],
        requestable: [true],
        shelfMark: ["*QKKA 08-490 v. 44, no. 1 (2014)"],
        specRequestable: false,
        status: [
          {
            "@id": "status:a",
            prefLabel: "Available",
          },
        ],
        uri: "i35339925",
        volumeRange: [
          {
            gte: 44,
            lte: 44,
          },
        ],
        idNyplSourceId: {
          "@type": "SierraNypl",
          "@value": "35339925",
        },
      },
      {
        "@id": "res:i35339932",
        "@type": ["bf:Item"],
        accessMessage: [
          {
            "@id": "accessMessage:2",
            prefLabel: "Request in advance",
          },
        ],
        catalogItemType: [
          {
            "@id": "catalogItemType:4",
            prefLabel: "serial, loose",
          },
        ],
        dateRange: [
          {
            gte: "2014",
            lte: "2014",
          },
        ],
        eddRequestable: true,
        enumerationChronology: ["v. 44, no. 2 (2014)"],
        formatLiteral: ["Text"],
        holdingLocation: [
          {
            "@id": "loc:rc2ma",
            prefLabel: "Offsite",
          },
        ],
        idBarcode: ["33433118739394"],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value": "*QKKA 08-490 v. 44, no. 2 (2014)",
          },
          {
            "@type": "bf:Barcode",
            "@value": "33433118739394",
          },
        ],
        owner: [
          {
            "@id": "orgs:1000",
            prefLabel: "Stephen A. Schwarzman Building",
          },
        ],
        physRequestable: true,
        physicalLocation: ["*QKKA 08-490"],
        recapCustomerCode: ["NH"],
        requestable: [true],
        shelfMark: ["*QKKA 08-490 v. 44, no. 2 (2014)"],
        specRequestable: false,
        status: [
          {
            "@id": "status:a",
            prefLabel: "Available",
          },
        ],
        uri: "i35339932",
        volumeRange: [
          {
            gte: 44,
            lte: 44,
          },
        ],
        idNyplSourceId: {
          "@type": "SierraNypl",
          "@value": "35339932",
        },
      },
      {
        "@id": "res:i35339941",
        "@type": ["bf:Item"],
        accessMessage: [
          {
            "@id": "accessMessage:2",
            prefLabel: "Request in advance",
          },
        ],
        catalogItemType: [
          {
            "@id": "catalogItemType:4",
            prefLabel: "serial, loose",
          },
        ],
        dateRange: [
          {
            gte: "2014",
            lte: "2014",
          },
        ],
        eddRequestable: true,
        enumerationChronology: ["v. 44. no. 3 (2014)"],
        formatLiteral: ["Text"],
        holdingLocation: [
          {
            "@id": "loc:rc2ma",
            prefLabel: "Offsite",
          },
        ],
        idBarcode: ["33433118739568"],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value": "*QKKA 08-490 v. 44. no. 3 (2014)",
          },
          {
            "@type": "bf:Barcode",
            "@value": "33433118739568",
          },
        ],
        owner: [
          {
            "@id": "orgs:1000",
            prefLabel: "Stephen A. Schwarzman Building",
          },
        ],
        physRequestable: true,
        physicalLocation: ["*QKKA 08-490"],
        recapCustomerCode: ["NH"],
        requestable: [true],
        shelfMark: ["*QKKA 08-490 v. 44. no. 3 (2014)"],
        specRequestable: false,
        status: [
          {
            "@id": "status:a",
            prefLabel: "Available",
          },
        ],
        uri: "i35339941",
        volumeRange: [
          {
            gte: 44,
            lte: 44,
          },
        ],
        idNyplSourceId: {
          "@type": "SierraNypl",
          "@value": "35339941",
        },
      },
      {
        "@id": "res:i35328127",
        "@type": ["bf:Item"],
        accessMessage: [
          {
            "@id": "accessMessage:2",
            prefLabel: "Request in advance",
          },
        ],
        catalogItemType: [
          {
            "@id": "catalogItemType:4",
            prefLabel: "serial, loose",
          },
        ],
        dateRange: [
          {
            gte: "2013",
            lte: "2013",
          },
        ],
        eddRequestable: true,
        enumerationChronology: ["v. 43, no. 1 (2013)"],
        formatLiteral: ["Text"],
        holdingLocation: [
          {
            "@id": "loc:rc2ma",
            prefLabel: "Offsite",
          },
        ],
        idBarcode: ["33433118739584"],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value": "*QKKA 08-490 v. 43, no. 1 (2013)",
          },
          {
            "@type": "bf:Barcode",
            "@value": "33433118739584",
          },
        ],
        owner: [
          {
            "@id": "orgs:1000",
            prefLabel: "Stephen A. Schwarzman Building",
          },
        ],
        physRequestable: true,
        physicalLocation: ["*QKKA 08-490"],
        recapCustomerCode: ["NH"],
        requestable: [true],
        shelfMark: ["*QKKA 08-490 v. 43, no. 1 (2013)"],
        specRequestable: false,
        status: [
          {
            "@id": "status:a",
            prefLabel: "Available",
          },
        ],
        uri: "i35328127",
        volumeRange: [
          {
            gte: 43,
            lte: 43,
          },
        ],
        idNyplSourceId: {
          "@type": "SierraNypl",
          "@value": "35328127",
        },
      },
      {
        "@id": "res:i37234070",
        "@type": ["bf:Item"],
        accessMessage: [
          {
            "@id": "accessMessage:2",
            prefLabel: "Request in advance",
          },
        ],
        catalogItemType: [
          {
            "@id": "catalogItemType:4",
            prefLabel: "serial, loose",
          },
        ],
        dateRange: [
          {
            gte: "2013",
            lte: "2013",
          },
        ],
        eddRequestable: true,
        enumerationChronology: ["v. 43, no. 2 (2013)"],
        formatLiteral: ["Text"],
        holdingLocation: [
          {
            "@id": "loc:rc2ma",
            prefLabel: "Offsite",
          },
        ],
        idBarcode: ["33433127828808"],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value": "*QKKA 08-490 v. 43, no. 2 (2013)",
          },
          {
            "@type": "bf:Barcode",
            "@value": "33433127828808",
          },
        ],
        owner: [
          {
            "@id": "orgs:1000",
            prefLabel: "Stephen A. Schwarzman Building",
          },
        ],
        physRequestable: true,
        physicalLocation: ["*QKKA 08-490"],
        recapCustomerCode: ["NA"],
        requestable: [true],
        shelfMark: ["*QKKA 08-490 v. 43, no. 2 (2013)"],
        specRequestable: false,
        status: [
          {
            "@id": "status:a",
            prefLabel: "Available",
          },
        ],
        uri: "i37234070",
        volumeRange: [
          {
            gte: 43,
            lte: 43,
          },
        ],
        idNyplSourceId: {
          "@type": "SierraNypl",
          "@value": "37234070",
        },
      },
      {
        "@id": "res:i32534074",
        "@type": ["bf:Item"],
        accessMessage: [
          {
            "@id": "accessMessage:u",
            prefLabel: "Supervised use",
          },
        ],
        catalogItemType: [
          {
            "@id": "catalogItemType:29",
            prefLabel: "bundled materials (vols.)",
          },
        ],
        dateRange: [
          {
            gte: "2012",
            lte: "2012",
          },
        ],
        eddRequestable: true,
        enumerationChronology: ["v. 42 (2012)"],
        formatLiteral: ["Text"],
        holdingLocation: [
          {
            "@id": "loc:rc2ma",
            prefLabel: "Offsite",
          },
        ],
        idBarcode: ["33433116773122"],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value": "*QKKA 08-490 v. 42 (2012)",
          },
          {
            "@type": "bf:Barcode",
            "@value": "33433116773122",
          },
        ],
        owner: [
          {
            "@id": "orgs:1000",
            prefLabel: "Stephen A. Schwarzman Building",
          },
        ],
        physRequestable: true,
        physicalLocation: ["*QKKA 08-490"],
        recapCustomerCode: ["NH"],
        requestable: [true],
        shelfMark: ["*QKKA 08-490 v. 42 (2012)"],
        specRequestable: false,
        status: [
          {
            "@id": "status:a",
            prefLabel: "Available",
          },
        ],
        uri: "i32534074",
        volumeRange: [
          {
            gte: 42,
            lte: 42,
          },
        ],
        idNyplSourceId: {
          "@type": "SierraNypl",
          "@value": "32534074",
        },
      },
      {
        "@id": "res:i29633948",
        "@type": ["bf:Item"],
        accessMessage: [
          {
            "@id": "accessMessage:2",
            prefLabel: "Request in advance",
          },
        ],
        catalogItemType: [
          {
            "@id": "catalogItemType:4",
            prefLabel: "serial, loose",
          },
        ],
        dateRange: [
          {
            gte: "2011",
            lte: "2011",
          },
        ],
        eddRequestable: true,
        enumerationChronology: ["v. 41, no. 1 (2011)"],
        formatLiteral: ["Text"],
        holdingLocation: [
          {
            "@id": "loc:rc2ma",
            prefLabel: "Offsite",
          },
        ],
        idBarcode: ["33433106833985"],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value": "*QKKA 08-490 v. 41, no. 1 (2011)",
          },
          {
            "@type": "bf:Barcode",
            "@value": "33433106833985",
          },
        ],
        owner: [
          {
            "@id": "orgs:1000",
            prefLabel: "Stephen A. Schwarzman Building",
          },
        ],
        physRequestable: true,
        physicalLocation: ["*QKKA 08-490"],
        recapCustomerCode: ["NH"],
        requestable: [true],
        shelfMark: ["*QKKA 08-490 v. 41, no. 1 (2011)"],
        specRequestable: false,
        status: [
          {
            "@id": "status:a",
            prefLabel: "Available",
          },
        ],
        uri: "i29633948",
        volumeRange: [
          {
            gte: 41,
            lte: 41,
          },
        ],
        idNyplSourceId: {
          "@type": "SierraNypl",
          "@value": "29633948",
        },
      },
      {
        "@id": "res:i32534068",
        "@type": ["bf:Item"],
        accessMessage: [
          {
            "@id": "accessMessage:u",
            prefLabel: "Supervised use",
          },
        ],
        catalogItemType: [
          {
            "@id": "catalogItemType:29",
            prefLabel: "bundled materials (vols.)",
          },
        ],
        dateRange: [
          {
            gte: "2011",
            lte: "2011",
          },
        ],
        eddRequestable: true,
        enumerationChronology: ["v. 41, no. 2-3 (2011)"],
        formatLiteral: ["Text"],
        holdingLocation: [
          {
            "@id": "loc:rc2ma",
            prefLabel: "Offsite",
          },
        ],
        idBarcode: ["33433116773114"],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value": "*QKKA 08-490 v. 41, no. 2-3 (2011)",
          },
          {
            "@type": "bf:Barcode",
            "@value": "33433116773114",
          },
        ],
        owner: [
          {
            "@id": "orgs:1000",
            prefLabel: "Stephen A. Schwarzman Building",
          },
        ],
        physRequestable: true,
        physicalLocation: ["*QKKA 08-490"],
        recapCustomerCode: ["NH"],
        requestable: [true],
        shelfMark: ["*QKKA 08-490 v. 41, no. 2-3 (2011)"],
        specRequestable: false,
        status: [
          {
            "@id": "status:a",
            prefLabel: "Available",
          },
        ],
        uri: "i32534068",
        volumeRange: [
          {
            gte: 41,
            lte: 41,
          },
        ],
        idNyplSourceId: {
          "@type": "SierraNypl",
          "@value": "32534068",
        },
      },
      {
        "@id": "res:i30979713",
        "@type": ["bf:Item"],
        accessMessage: [
          {
            "@id": "accessMessage:2",
            prefLabel: "Request in advance",
          },
        ],
        catalogItemType: [
          {
            "@id": "catalogItemType:3",
            prefLabel: "serial",
          },
        ],
        dateRange: [
          {
            gte: "2010",
            lte: "2010",
          },
        ],
        eddRequestable: true,
        enumerationChronology: ["v. 40, no. 1 (2010)"],
        formatLiteral: ["Text"],
        holdingLocation: [
          {
            "@id": "loc:rc2ma",
            prefLabel: "Offsite",
          },
        ],
        idBarcode: ["33433110348475"],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value": "*QKKA 08-490 v. 40, no. 1 (2010)",
          },
          {
            "@type": "bf:Barcode",
            "@value": "33433110348475",
          },
        ],
        owner: [
          {
            "@id": "orgs:1000",
            prefLabel: "Stephen A. Schwarzman Building",
          },
        ],
        physRequestable: true,
        physicalLocation: ["*QKKA 08-490"],
        recapCustomerCode: ["NA"],
        requestable: [true],
        shelfMark: ["*QKKA 08-490 v. 40, no. 1 (2010)"],
        specRequestable: false,
        status: [
          {
            "@id": "status:a",
            prefLabel: "Available",
          },
        ],
        uri: "i30979713",
        volumeRange: [
          {
            gte: 40,
            lte: 40,
          },
        ],
        idNyplSourceId: {
          "@type": "SierraNypl",
          "@value": "30979713",
        },
      },
      {
        "@id": "res:i30979714",
        "@type": ["bf:Item"],
        accessMessage: [
          {
            "@id": "accessMessage:2",
            prefLabel: "Request in advance",
          },
        ],
        catalogItemType: [
          {
            "@id": "catalogItemType:3",
            prefLabel: "serial",
          },
        ],
        dateRange: [
          {
            gte: "2010",
            lte: "2010",
          },
        ],
        eddRequestable: true,
        enumerationChronology: ["v. 40, no. 2 (2010)"],
        formatLiteral: ["Text"],
        holdingLocation: [
          {
            "@id": "loc:rc2ma",
            prefLabel: "Offsite",
          },
        ],
        idBarcode: ["33433110348483"],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value": "*QKKA 08-490 v. 40, no. 2 (2010)",
          },
          {
            "@type": "bf:Barcode",
            "@value": "33433110348483",
          },
        ],
        owner: [
          {
            "@id": "orgs:1000",
            prefLabel: "Stephen A. Schwarzman Building",
          },
        ],
        physRequestable: true,
        physicalLocation: ["*QKKA 08-490"],
        recapCustomerCode: ["NA"],
        requestable: [true],
        shelfMark: ["*QKKA 08-490 v. 40, no. 2 (2010)"],
        specRequestable: false,
        status: [
          {
            "@id": "status:a",
            prefLabel: "Available",
          },
        ],
        uri: "i30979714",
        volumeRange: [
          {
            gte: 40,
            lte: 40,
          },
        ],
        idNyplSourceId: {
          "@type": "SierraNypl",
          "@value": "30979714",
        },
      },
      {
        "@id": "res:i30979715",
        "@type": ["bf:Item"],
        accessMessage: [
          {
            "@id": "accessMessage:2",
            prefLabel: "Request in advance",
          },
        ],
        catalogItemType: [
          {
            "@id": "catalogItemType:3",
            prefLabel: "serial",
          },
        ],
        dateRange: [
          {
            gte: "2010",
            lte: "2010",
          },
        ],
        eddRequestable: true,
        enumerationChronology: ["v. 40, no. 3 (2010)"],
        formatLiteral: ["Text"],
        holdingLocation: [
          {
            "@id": "loc:rc2ma",
            prefLabel: "Offsite",
          },
        ],
        idBarcode: ["33433110348491"],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value": "*QKKA 08-490 v. 40, no. 3 (2010)",
          },
          {
            "@type": "bf:Barcode",
            "@value": "33433110348491",
          },
        ],
        owner: [
          {
            "@id": "orgs:1000",
            prefLabel: "Stephen A. Schwarzman Building",
          },
        ],
        physRequestable: true,
        physicalLocation: ["*QKKA 08-490"],
        recapCustomerCode: ["NA"],
        requestable: [true],
        shelfMark: ["*QKKA 08-490 v. 40, no. 3 (2010)"],
        specRequestable: false,
        status: [
          {
            "@id": "status:a",
            prefLabel: "Available",
          },
        ],
        uri: "i30979715",
        volumeRange: [
          {
            gte: 40,
            lte: 40,
          },
        ],
        idNyplSourceId: {
          "@type": "SierraNypl",
          "@value": "30979715",
        },
      },
      {
        "@id": "res:i30979719",
        "@type": ["bf:Item"],
        accessMessage: [
          {
            "@id": "accessMessage:2",
            prefLabel: "Request in advance",
          },
        ],
        catalogItemType: [
          {
            "@id": "catalogItemType:3",
            prefLabel: "serial",
          },
        ],
        dateRange: [
          {
            gte: "2009",
            lte: "2009",
          },
        ],
        eddRequestable: true,
        enumerationChronology: ["v. 39, no. 1 (2009)"],
        formatLiteral: ["Text"],
        holdingLocation: [
          {
            "@id": "loc:rc2ma",
            prefLabel: "Offsite",
          },
        ],
        idBarcode: ["33433110348509"],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value": "*QKKA 08-490 v. 39, no. 1 (2009)",
          },
          {
            "@type": "bf:Barcode",
            "@value": "33433110348509",
          },
        ],
        owner: [
          {
            "@id": "orgs:1000",
            prefLabel: "Stephen A. Schwarzman Building",
          },
        ],
        physRequestable: true,
        physicalLocation: ["*QKKA 08-490"],
        recapCustomerCode: ["NA"],
        requestable: [true],
        shelfMark: ["*QKKA 08-490 v. 39, no. 1 (2009)"],
        specRequestable: false,
        status: [
          {
            "@id": "status:a",
            prefLabel: "Available",
          },
        ],
        uri: "i30979719",
        volumeRange: [
          {
            gte: 39,
            lte: 39,
          },
        ],
        idNyplSourceId: {
          "@type": "SierraNypl",
          "@value": "30979719",
        },
      },
      {
        "@id": "res:i30979720",
        "@type": ["bf:Item"],
        accessMessage: [
          {
            "@id": "accessMessage:2",
            prefLabel: "Request in advance",
          },
        ],
        catalogItemType: [
          {
            "@id": "catalogItemType:3",
            prefLabel: "serial",
          },
        ],
        dateRange: [
          {
            gte: "2009",
            lte: "2009",
          },
        ],
        eddRequestable: true,
        enumerationChronology: ["v. 39, no. 2 (2009)"],
        formatLiteral: ["Text"],
        holdingLocation: [
          {
            "@id": "loc:rc2ma",
            prefLabel: "Offsite",
          },
        ],
        idBarcode: ["33433110348517"],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value": "*QKKA 08-490 v. 39, no. 2 (2009)",
          },
          {
            "@type": "bf:Barcode",
            "@value": "33433110348517",
          },
        ],
        owner: [
          {
            "@id": "orgs:1000",
            prefLabel: "Stephen A. Schwarzman Building",
          },
        ],
        physRequestable: true,
        physicalLocation: ["*QKKA 08-490"],
        recapCustomerCode: ["NA"],
        requestable: [true],
        shelfMark: ["*QKKA 08-490 v. 39, no. 2 (2009)"],
        specRequestable: false,
        status: [
          {
            "@id": "status:a",
            prefLabel: "Available",
          },
        ],
        uri: "i30979720",
        volumeRange: [
          {
            gte: 39,
            lte: 39,
          },
        ],
        idNyplSourceId: {
          "@type": "SierraNypl",
          "@value": "30979720",
        },
      },
      {
        "@id": "res:i30979721",
        "@type": ["bf:Item"],
        accessMessage: [
          {
            "@id": "accessMessage:2",
            prefLabel: "Request in advance",
          },
        ],
        catalogItemType: [
          {
            "@id": "catalogItemType:3",
            prefLabel: "serial",
          },
        ],
        dateRange: [
          {
            gte: "2009",
            lte: "2009",
          },
        ],
        eddRequestable: true,
        enumerationChronology: ["v. 39, no. 3 (2009)"],
        formatLiteral: ["Text"],
        holdingLocation: [
          {
            "@id": "loc:rc2ma",
            prefLabel: "Offsite",
          },
        ],
        idBarcode: ["33433110348525"],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value": "*QKKA 08-490 v. 39, no. 3 (2009)",
          },
          {
            "@type": "bf:Barcode",
            "@value": "33433110348525",
          },
        ],
        owner: [
          {
            "@id": "orgs:1000",
            prefLabel: "Stephen A. Schwarzman Building",
          },
        ],
        physRequestable: true,
        physicalLocation: ["*QKKA 08-490"],
        recapCustomerCode: ["NA"],
        requestable: [true],
        shelfMark: ["*QKKA 08-490 v. 39, no. 3 (2009)"],
        specRequestable: false,
        status: [
          {
            "@id": "status:a",
            prefLabel: "Available",
          },
        ],
        uri: "i30979721",
        volumeRange: [
          {
            gte: 39,
            lte: 39,
          },
        ],
        idNyplSourceId: {
          "@type": "SierraNypl",
          "@value": "30979721",
        },
      },
      {
        "@id": "res:i31157821",
        "@type": ["bf:Item"],
        accessMessage: [
          {
            "@id": "accessMessage:2",
            prefLabel: "Request in advance",
          },
        ],
        catalogItemType: [
          {
            "@id": "catalogItemType:3",
            prefLabel: "serial",
          },
        ],
        dateRange: [
          {
            gte: "2006",
            lte: "2006",
          },
        ],
        eddRequestable: true,
        enumerationChronology: ["v. 36, no. 1 (2006)"],
        formatLiteral: ["Text"],
        holdingLocation: [
          {
            "@id": "loc:rc2ma",
            prefLabel: "Offsite",
          },
        ],
        idBarcode: ["33433115816088"],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value": "*QKKA 08-490 v. 36, no. 1 (2006)",
          },
          {
            "@type": "bf:Barcode",
            "@value": "33433115816088",
          },
        ],
        owner: [
          {
            "@id": "orgs:1000",
            prefLabel: "Stephen A. Schwarzman Building",
          },
        ],
        physRequestable: true,
        physicalLocation: ["*QKKA 08-490"],
        recapCustomerCode: ["NA"],
        requestable: [true],
        shelfMark: ["*QKKA 08-490 v. 36, no. 1 (2006)"],
        specRequestable: false,
        status: [
          {
            "@id": "status:a",
            prefLabel: "Available",
          },
        ],
        uri: "i31157821",
        volumeRange: [
          {
            gte: 36,
            lte: 36,
          },
        ],
        idNyplSourceId: {
          "@type": "SierraNypl",
          "@value": "31157821",
        },
      },
      {
        "@id": "res:i17595234",
        "@type": ["bf:Item"],
        accessMessage: [
          {
            "@id": "accessMessage:2",
            prefLabel: "Request in advance",
          },
        ],
        catalogItemType: [
          {
            "@id": "catalogItemType:3",
            prefLabel: "serial",
          },
        ],
        dateRange: [
          {
            gte: "2005",
            lte: "2005",
          },
        ],
        eddRequestable: true,
        enumerationChronology: ["v. 35 (2005)"],
        formatLiteral: ["Text"],
        holdingLocation: [
          {
            "@id": "loc:rcma2",
            prefLabel: "Offsite",
          },
        ],
        idBarcode: ["33433083243927"],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value": "*QKKA 08-490 v. 35 (2005)",
          },
          {
            "@type": "bf:Barcode",
            "@value": "33433083243927",
          },
        ],
        owner: [
          {
            "@id": "orgs:1000",
            prefLabel: "Stephen A. Schwarzman Building",
          },
        ],
        physRequestable: true,
        physicalLocation: ["*QKKA 08-490"],
        recapCustomerCode: ["NA"],
        requestable: [true],
        shelfMark: ["*QKKA 08-490 v. 35 (2005)"],
        specRequestable: false,
        status: [
          {
            "@id": "status:a",
            prefLabel: "Available",
          },
        ],
        uri: "i17595234",
        volumeRange: [
          {
            gte: 35,
            lte: 35,
          },
        ],
        idNyplSourceId: {
          "@type": "SierraNypl",
          "@value": "17595234",
        },
      },
      {
        "@id": "res:i17595233",
        "@type": ["bf:Item"],
        accessMessage: [
          {
            "@id": "accessMessage:2",
            prefLabel: "Request in advance",
          },
        ],
        catalogItemType: [
          {
            "@id": "catalogItemType:3",
            prefLabel: "serial",
          },
        ],
        dateRange: [
          {
            gte: "2004",
            lte: "2004",
          },
        ],
        eddRequestable: true,
        enumerationChronology: ["v. 34 (2004)"],
        formatLiteral: ["Text"],
        holdingLocation: [
          {
            "@id": "loc:rcma2",
            prefLabel: "Offsite",
          },
        ],
        idBarcode: ["33433083243919"],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value": "*QKKA 08-490 v. 34 (2004)",
          },
          {
            "@type": "bf:Barcode",
            "@value": "33433083243919",
          },
        ],
        owner: [
          {
            "@id": "orgs:1000",
            prefLabel: "Stephen A. Schwarzman Building",
          },
        ],
        physRequestable: true,
        physicalLocation: ["*QKKA 08-490"],
        recapCustomerCode: ["NA"],
        requestable: [true],
        shelfMark: ["*QKKA 08-490 v. 34 (2004)"],
        specRequestable: false,
        status: [
          {
            "@id": "status:a",
            prefLabel: "Available",
          },
        ],
        uri: "i17595233",
        volumeRange: [
          {
            gte: 34,
            lte: 34,
          },
        ],
        idNyplSourceId: {
          "@type": "SierraNypl",
          "@value": "17595233",
        },
      },
      {
        "@id": "res:i17595232",
        "@type": ["bf:Item"],
        accessMessage: [
          {
            "@id": "accessMessage:2",
            prefLabel: "Request in advance",
          },
        ],
        catalogItemType: [
          {
            "@id": "catalogItemType:3",
            prefLabel: "serial",
          },
        ],
        dateRange: [
          {
            gte: "2003",
            lte: "2003",
          },
        ],
        eddRequestable: true,
        enumerationChronology: ["v. 33 (2003)"],
        formatLiteral: ["Text"],
        holdingLocation: [
          {
            "@id": "loc:rcma2",
            prefLabel: "Offsite",
          },
        ],
        idBarcode: ["33433083243901"],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value": "*QKKA 08-490 v. 33 (2003)",
          },
          {
            "@type": "bf:Barcode",
            "@value": "33433083243901",
          },
        ],
        owner: [
          {
            "@id": "orgs:1000",
            prefLabel: "Stephen A. Schwarzman Building",
          },
        ],
        physRequestable: true,
        physicalLocation: ["*QKKA 08-490"],
        recapCustomerCode: ["NA"],
        requestable: [true],
        shelfMark: ["*QKKA 08-490 v. 33 (2003)"],
        specRequestable: false,
        status: [
          {
            "@id": "status:a",
            prefLabel: "Available",
          },
        ],
        uri: "i17595232",
        volumeRange: [
          {
            gte: 33,
            lte: 33,
          },
        ],
        idNyplSourceId: {
          "@type": "SierraNypl",
          "@value": "17595232",
        },
      },
      {
        "@id": "res:i17595231",
        "@type": ["bf:Item"],
        accessMessage: [
          {
            "@id": "accessMessage:2",
            prefLabel: "Request in advance",
          },
        ],
        catalogItemType: [
          {
            "@id": "catalogItemType:3",
            prefLabel: "serial",
          },
        ],
        dateRange: [
          {
            gte: "1999",
            lte: "2002",
          },
        ],
        eddRequestable: true,
        enumerationChronology: ["v. 29-32, inc. (1999-2002)"],
        formatLiteral: ["Text"],
        holdingLocation: [
          {
            "@id": "loc:rcma2",
            prefLabel: "Offsite",
          },
        ],
        idBarcode: ["33433083243893"],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value": "*QKKA 08-490 v. 29-32, inc. (1999-2002)",
          },
          {
            "@type": "bf:Barcode",
            "@value": "33433083243893",
          },
        ],
        owner: [
          {
            "@id": "orgs:1000",
            prefLabel: "Stephen A. Schwarzman Building",
          },
        ],
        physRequestable: true,
        physicalLocation: ["*QKKA 08-490"],
        recapCustomerCode: ["NA"],
        requestable: [true],
        shelfMark: ["*QKKA 08-490 v. 29-32, inc. (1999-2002)"],
        specRequestable: false,
        status: [
          {
            "@id": "status:a",
            prefLabel: "Available",
          },
        ],
        uri: "i17595231",
        volumeRange: [
          {
            gte: 29,
            lte: 32,
          },
        ],
        idNyplSourceId: {
          "@type": "SierraNypl",
          "@value": "17595231",
        },
      },
    ],
    language: [
      {
        "@id": "lang:srp",
        prefLabel: "Serbian",
      },
    ],
    lccClassification: ["DR1932 .P68"],
    format: [
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
        noteType: "Supplement",
        "@type": "bf:Note",
        prefLabel: "Has supplement, <2012-2016>: Pojedinačno.",
      },
      {
        noteType: "Language",
        "@type": "bf:Note",
        prefLabel: "Serbian;",
      },
      {
        noteType: "Issued By",
        "@type": "bf:Note",
        prefLabel: "Issued by: Narodna biblioteka Kraljevo.",
      },
      {
        noteType: "Linking Entry",
        "@type": "bf:Note",
        prefLabel: "Has supplement, <2005-> : Preporučeno, ISSN 1452-3531",
      },
      {
        noteType: "Linking Entry",
        "@type": "bf:Note",
        prefLabel: "Has supplement, <2006-> : Vidi čuda, ISSN 1452-7316",
      },
      {
        noteType: "Source of Description",
        "@type": "bf:Note",
        prefLabel: "G. 46, 3 (2016).",
      },
    ],
    numCheckinCardItems: 0,
    numElectronicResources: 0,
    numItemDatesParsed: 33,
    numItemVolumesParsed: 33,
    numItemsMatched: 33,
    numItemsTotal: 33,
    nyplSource: ["sierra-nypl"],
    parallelContributorLiteral: [
      'Народна библиотека "Стефан Првовенчани," issuing body.',
      "Народна библиотека Краљево, issuing body.",
      'Народна библиотека "Радослав Веснић Краљево, issuing body.',
    ],
    parallelDescription: [
      '"Часопис за књижевности, уметност, културу, просветна и друштвена питања."',
    ],
    parallelNote: [
      null,
      null,
      null,
      null,
      "Has supplement, <2006-> : Види чуда, ISSN 1452-7316",
    ],
    parallelPlaceOfPublication: ["Краљево"],
    parallelPublicationStatement: [
      null,
      'Краљево : Народна библиотека "Стефан Првовенчани"',
    ],
    parallelPublisherLiteral: [
      "Слово",
      'Народна библиотека "Стефан Првовенчани"',
    ],
    parallelTitle: ["Повеља."],
    parallelTitleAlt: ["", "Појединачно."],
    parallelTitleDisplay: ["Повеља."],
    placeOfPublication: ["Kraljevo"],
    publicationStatement: [
      "Kraljevo : Slovo, 1985-",
      'Kraljevo : Narodna biblioteka "Stefan Prvovenčani"',
    ],
    publisherLiteral: ["Slovo", 'Narodna biblioteka "Stefan Prvovenčani"'],
    serialPublicationDates: [
      "Nova serija g. 15, br. 1 (1985)-nova serija 27, br. 4 (1997); g. 28, br. 1 (1998)-",
    ],
    shelfMark: ["*QKKA 08-490"],
    subjectLiteral: [
      "Civilization.",
      "Serbia -- Civilization -- Periodicals.",
      "Serbia.",
      "Serbia and Montenegro.",
    ],
    title: ["Povelja."],
    titleAlt: ["Povelja (1985)", "Pojedinačno."],
    titleDisplay: ["Povelja."],
    type: ["nypl:Item"],
    updatedAt: 1701800645919,
    uri: "b15349955",
    suppressed: false,
    hasItemVolumes: true,
    hasItemDates: true,
  },
  annotatedMarc: {
    id: "15349955",
    nyplSource: "sierra-nypl",
    fields: [
      {
        label: "Title",
        values: [
          {
            content: "Povelja.",
            source: {
              fieldTag: "t",
              marcTag: "245",
              ind1: "0",
              ind2: "0",
              content: null,
              subfields: [
                {
                  tag: "6",
                  content: "[redacted]",
                },
                {
                  tag: "a",
                  content: "Povelja.",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Alternate Script for Title",
        values: [
          {
            content: "Повеља.",
            source: {
              fieldTag: "y",
              marcTag: "880",
              ind1: "0",
              ind2: "0",
              content: null,
              subfields: [
                {
                  tag: "6",
                  content: "[redacted]",
                },
                {
                  tag: "a",
                  content: "Повеља.",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Imprint",
        values: [
          {
            content: "Kraljevo : Slovo, 1985-",
            source: {
              fieldTag: "p",
              marcTag: "260",
              ind1: " ",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "6",
                  content: "[redacted]",
                },
                {
                  tag: "a",
                  content: "Kraljevo :",
                },
                {
                  tag: "b",
                  content: "Slovo,",
                },
                {
                  tag: "c",
                  content: "1985-",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Alternate Script for Imprint",
        values: [
          {
            content: "Краљево : Слово, 1985-",
            source: {
              fieldTag: "y",
              marcTag: "880",
              ind1: " ",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "6",
                  content: "[redacted]",
                },
                {
                  tag: "a",
                  content: "Краљево :",
                },
                {
                  tag: "b",
                  content: "Слово,",
                },
                {
                  tag: "c",
                  content: "1985-",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Current Publisher",
        values: [
          {
            content:
              '<2012-2016>: Kraljevo : Narodna biblioteka "Stefan Prvovenčani"',
            source: {
              fieldTag: "p",
              marcTag: "260",
              ind1: "3",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "6",
                  content: "[redacted]",
                },
                {
                  tag: "3",
                  content: "<2012-2016>:",
                },
                {
                  tag: "a",
                  content: "Kraljevo :",
                },
                {
                  tag: "b",
                  content: 'Narodna biblioteka "Stefan Prvovenčani"',
                },
              ],
            },
          },
        ],
      },
      {
        label: "Alternate Script for Current Publisher",
        values: [
          {
            content:
              '<2012-2016>: Краљево : Народна библиотека "Стефан Првовенчани"',
            source: {
              fieldTag: "y",
              marcTag: "880",
              ind1: "3",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "6",
                  content: "[redacted]",
                },
                {
                  tag: "3",
                  content: "<2012-2016>:",
                },
                {
                  tag: "a",
                  content: "Краљево :",
                },
                {
                  tag: "b",
                  content: 'Народна библиотека "Стефан Првовенчани"',
                },
              ],
            },
          },
        ],
      },
      {
        label: "Description",
        values: [
          {
            content: "v. ; 25 cm",
            source: {
              fieldTag: "r",
              marcTag: "300",
              ind1: " ",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "v. ;",
                },
                {
                  tag: "c",
                  content: "25 cm",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Current Frequency",
        values: [
          {
            content: "3 no. a year, <1998-2016>",
            source: {
              fieldTag: "r",
              marcTag: "310",
              ind1: " ",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "3 no. a year,",
                },
                {
                  tag: "b",
                  content: "<1998-2016>",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Former Frequency",
        values: [
          {
            content: "Four no. a year, 1986-",
            source: {
              fieldTag: "r",
              marcTag: "321",
              ind1: " ",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "Four no. a year,",
                },
                {
                  tag: "b",
                  content: "1986-",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Publication Date",
        values: [
          {
            content:
              "Nova serija g. 15, br. 1 (1985)-nova serija 27, br. 4 (1997); g. 28, br. 1 (1998)-",
            source: {
              fieldTag: "r",
              marcTag: "362",
              ind1: "0",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "6",
                  content: "[redacted]",
                },
                {
                  tag: "a",
                  content:
                    "Nova serija g. 15, br. 1 (1985)-nova serija 27, br. 4 (1997); g. 28, br. 1 (1998)-",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Alternate Script for Publication Date",
        values: [
          {
            content:
              "Нова серија г. 15, бр. 1 (1985)-нова серија 27, бр. 4 (1997); г. 28, бр. 1 (1998)-",
            source: {
              fieldTag: "y",
              marcTag: "880",
              ind1: "0",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "6",
                  content: "[redacted]",
                },
                {
                  tag: "a",
                  content:
                    "Нова серија г. 15, бр. 1 (1985)-нова серија 27, бр. 4 (1997); г. 28, бр. 1 (1998)-",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Summary",
        values: [
          {
            content:
              '"Casopis za književnosti, umetnost, kulturu, prosvetna i društvena pitanja."',
            source: {
              fieldTag: "n",
              marcTag: "520",
              ind1: " ",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "6",
                  content: "[redacted]",
                },
                {
                  tag: "a",
                  content:
                    '"Casopis za književnosti, umetnost, kulturu, prosvetna i društvena pitanja."',
                },
              ],
            },
          },
        ],
      },
      {
        label: "Alternate Script for Summary",
        values: [
          {
            content:
              '"Часопис за књижевности, уметност, културу, просветна и друштвена питања."',
            source: {
              fieldTag: "y",
              marcTag: "880",
              ind1: " ",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "6",
                  content: "[redacted]",
                },
                {
                  tag: "a",
                  content:
                    '"Часопис за књижевности, уметност, културу, просветна и друштвена питања."',
                },
              ],
            },
          },
        ],
      },
      {
        label: "Supplement",
        values: [
          {
            content: "Has supplement, <2012-2016>: Pojedinačno.",
            source: {
              fieldTag: "n",
              marcTag: "525",
              ind1: " ",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "Has supplement, <2012-2016>: Pojedinačno.",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Language",
        values: [
          {
            content: "In Serbian (Cyrillic).",
            source: {
              fieldTag: "n",
              marcTag: "546",
              ind1: " ",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "In Serbian",
                },
                {
                  tag: "b",
                  content: "(Cyrillic).",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Issued By",
        values: [
          {
            content: "Issued by: Narodna biblioteka Kraljevo.",
            source: {
              fieldTag: "n",
              marcTag: "550",
              ind1: " ",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "6",
                  content: "[redacted]",
                },
                {
                  tag: "a",
                  content: "Issued by: Narodna biblioteka Kraljevo.",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Alternate Script for Issued By",
        values: [
          {
            content: "Issued by: Народна библиотека Краљево.",
            source: {
              fieldTag: "y",
              marcTag: "880",
              ind1: " ",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "6",
                  content: "[redacted]",
                },
                {
                  tag: "a",
                  content: "Issued by: Народна библиотека Краљево.",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Note",
        values: [
          {
            content: "Latest issue consulted: G. 46, 3 (2016).",
            source: {
              fieldTag: "n",
              marcTag: "588",
              ind1: " ",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "Latest issue consulted: G. 46, 3 (2016).",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Subject",
        values: [
          {
            content: "Serbia -- Civilization -- Periodicals.",
            source: {
              fieldTag: "d",
              marcTag: "651",
              ind1: " ",
              ind2: "0",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "Serbia",
                },
                {
                  tag: "x",
                  content: "Civilization",
                },
                {
                  tag: "v",
                  content: "Periodicals.",
                },
              ],
            },
          },
          {
            content: "Civilization.",
            source: {
              fieldTag: "d",
              marcTag: "650",
              ind1: " ",
              ind2: "7",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "Civilization.",
                },
                {
                  tag: "2",
                  content: "[redacted]",
                },
                {
                  tag: "0",
                  content: "[redacted]",
                },
              ],
            },
          },
          {
            content: "Serbia.",
            source: {
              fieldTag: "d",
              marcTag: "651",
              ind1: " ",
              ind2: "7",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "Serbia.",
                },
                {
                  tag: "2",
                  content: "[redacted]",
                },
                {
                  tag: "0",
                  content: "[redacted]",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Genre/Form",
        values: [
          {
            content: "Periodicals.",
            source: {
              fieldTag: "d",
              marcTag: "655",
              ind1: " ",
              ind2: "7",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "Periodicals.",
                },
                {
                  tag: "2",
                  content: "[redacted]",
                },
                {
                  tag: "0",
                  content: "[redacted]",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Added Author",
        values: [
          {
            content: 'Narodna biblioteka "Stefan Prvovenčani"',
            source: {
              fieldTag: "b",
              marcTag: "710",
              ind1: "2",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: 'Narodna biblioteka "Stefan Prvovenčani"',
                },
              ],
            },
          },
          {
            content: "Narodna biblioteka Kraljevo.",
            source: {
              fieldTag: "b",
              marcTag: "710",
              ind1: "2",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "6",
                  content: "[redacted]",
                },
                {
                  tag: "a",
                  content: "Narodna biblioteka Kraljevo.",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Alternate Script for Added Author",
        values: [
          {
            content: "Народна библиотека Краљево.",
            source: {
              fieldTag: "y",
              marcTag: "880",
              ind1: "2",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "6",
                  content: "[redacted]",
                },
                {
                  tag: "a",
                  content: "Народна библиотека Краљево.",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Added Author",
        values: [
          {
            content: 'Narodna biblioteka "Stefan Prvovenčani."',
            source: {
              fieldTag: "b",
              marcTag: "710",
              ind1: "2",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: 'Narodna biblioteka "Stefan Prvovenčani."',
                },
              ],
            },
          },
        ],
      },
      {
        label: "Added Title",
        values: [
          {
            content: "Pojedinačno.",
            source: {
              fieldTag: "u",
              marcTag: "740",
              ind1: "0",
              ind2: "2",
              content: null,
              subfields: [
                {
                  tag: "6",
                  content: "[redacted]",
                },
                {
                  tag: "a",
                  content: "Pojedinačno.",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Alternate Script for Added Title",
        values: [
          {
            content: "Појединачно.",
            source: {
              fieldTag: "y",
              marcTag: "880",
              ind1: "0",
              ind2: "2",
              content: null,
              subfields: [
                {
                  tag: "6",
                  content: "[redacted]",
                },
                {
                  tag: "a",
                  content: "Појединачно.",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Continues",
        values: [
          {
            content: "Povelja oktobra",
            source: {
              fieldTag: "x",
              marcTag: "780",
              ind1: "0",
              ind2: "0",
              content: null,
              subfields: [
                {
                  tag: "6",
                  content: "[redacted]",
                },
                {
                  tag: "t",
                  content: "Povelja oktobra",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Alternate Script for Continues",
        values: [
          {
            content: "Повеља октобра",
            source: {
              fieldTag: "y",
              marcTag: "880",
              ind1: "0",
              ind2: "0",
              content: null,
              subfields: [
                {
                  tag: "6",
                  content: "[redacted]",
                },
                {
                  tag: "t",
                  content: "Повеља октобра",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Other Form:",
        values: [
          {
            content: "Online version: Povelja (OCoLC)760047199",
            source: {
              fieldTag: "w",
              marcTag: "776",
              ind1: "0",
              ind2: "8",
              content: null,
              subfields: [
                {
                  tag: "i",
                  content: "Online version:",
                },
                {
                  tag: "t",
                  content: "Povelja",
                },
                {
                  tag: "w",
                  content: "(OCoLC)760047199",
                },
              ],
            },
          },
        ],
      },
      {
        label: "LCCN",
        values: [
          {
            content: "sn 95033418",
            source: {
              fieldTag: "l",
              marcTag: "010",
              ind1: " ",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "sn 95033418",
                },
              ],
            },
          },
        ],
      },
      {
        label: "ISSN",
        values: [
          {
            content: "0352-7751 0352-7751",
            source: {
              fieldTag: "i",
              marcTag: "022",
              ind1: " ",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "0352-7751",
                },
                {
                  tag: "l",
                  content: "0352-7751",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Research Call Number",
        values: [
          {
            content: "*QKKA 08-490",
            source: {
              fieldTag: "q",
              marcTag: "852",
              ind1: "8",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "h",
                  content: "*QKKA 08-490",
                },
              ],
            },
          },
        ],
      },
    ],
  },
}

export const noParallels = {
  resources: {
    "@context":
      "http://discovery-api-production.us-east-1.elasticbeanstalk.com/api/v0.1/discovery/context_all.jsonld",
    "@type": ["nypl:Item", "nypl:Resource"],
    "@id": "res:b16145054",
    carrierType: [
      {
        "@id": "carriertypes:nc",
        prefLabel: "volume",
      },
    ],
    createdString: ["2005"],
    createdYear: 2005,
    creatorLiteral: ["Cortanze, Gérard de."],
    dateStartYear: 2005,
    dateString: ["2005"],
    dimensions: ["19 cm."],
    electronicResources: [],
    extent: ["193 p. : ill. ;"],
    idIsbn: ["2070775178"],
    idLccn: ["2005483039"],
    identifier: [
      {
        "@type": "bf:ShelfMark",
        "@value": "JFC 06-438",
      },
      {
        "@type": "nypl:Bnumber",
        "@value": "16145054",
      },
      {
        "@type": "bf:Isbn",
        "@value": "2070775178",
      },
      {
        "@type": "bf:Lccn",
        "@value": "2005483039",
      },
      {
        "@type": "bf:Identifier",
        "@value": "(WaOLN)M040000221",
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
        values: [
          {
            value: "loc:rc2ma",
            count: 1,
            label: "Offsite",
          },
        ],
      },
      {
        "@type": "nypl:Aggregation",
        "@id": "res:format",
        id: "format",
        field: "format",
        values: [],
      },
      {
        "@type": "nypl:Aggregation",
        "@id": "res:status",
        id: "status",
        field: "status",
        values: [
          {
            value: "status:a",
            count: 1,
            label: "Available",
          },
        ],
      },
    ],
    items: [
      {
        "@id": "res:i15550040",
        accessMessage: [
          {
            "@id": "accessMessage:2",
            prefLabel: "Request in advance",
          },
        ],
        catalogItemType: [
          {
            "@id": "catalogItemType:55",
            prefLabel: "book, limited circ, MaRLI",
          },
        ],
        eddRequestable: true,
        holdingLocation: [
          {
            "@id": "loc:rc2ma",
            prefLabel: "Offsite",
          },
        ],
        idBarcode: ["33433073236758"],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value": "JFC 06-438",
          },
          {
            "@type": "bf:Barcode",
            "@value": "33433073236758",
          },
        ],
        owner: [
          {
            "@id": "orgs:1000",
            prefLabel: "Stephen A. Schwarzman Building",
          },
        ],
        physRequestable: true,
        physicalLocation: ["JFC 06-438"],
        recapCustomerCode: ["NA"],
        requestable: [true],
        shelfMark: ["JFC 06-438"],
        specRequestable: false,
        status: [
          {
            "@id": "status:a",
            prefLabel: "Available",
          },
        ],
        uri: "i15550040",
        idNyplSourceId: {
          "@type": "SierraNypl",
          "@value": "15550040",
        },
      },
    ],
    language: [
      {
        "@id": "lang:fre",
        prefLabel: "French",
      },
    ],
    lccClassification: ["PQ2663.O7223 Z46 2005"],
    format: [
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
    numAvailable: 1,
    numElectronicResources: 0,
    numItems: 1,
    numItemsMatched: 1,
    numItemsTotal: 1,
    nyplSource: ["sierra-nypl"],
    placeOfPublication: ["[Paris, France] :"],
    publicationStatement: ["[Paris, France] : Gallimard, c2005."],
    publisherLiteral: ["Gallimard,"],
    series: ["Childhood"],
    seriesStatement: ["Haute enfance"],
    shelfMark: ["JFC 06-438"],
    subjectLiteral: [
      "Authors, French -- 20th century -- Biography.",
      "Autobiographical Narrative",
      "Cortanze, Gérard de -- Childhood and youth.",
    ],
    title: ["Spaghetti!"],
    titleDisplay: ["Spaghetti! / Gérard de Cortanze."],
    type: ["nypl:Item"],
    uniformTitle: ["Haute enfance (Gallimard (Firm))"],
    updatedAt: 1636662031868,
    uri: "b16145054",
    suppressed: false,
    hasItemVolumes: false,
    hasItemDates: false,
  },
  annotatedMarc: {
    id: "16145054",
    nyplSource: "sierra-nypl",
    fields: [
      {
        label: "Author",
        values: [
          {
            content: "Cortanze, Gérard de.",
            source: {
              fieldTag: "a",
              marcTag: "100",
              ind1: "1",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "Cortanze, Gérard de.",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Title",
        values: [
          {
            content: "Spaghetti! / Gérard de Cortanze.",
            source: {
              fieldTag: "t",
              marcTag: "245",
              ind1: "1",
              ind2: "0",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "Spaghetti! /",
                },
                {
                  tag: "c",
                  content: "Gérard de Cortanze.",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Imprint",
        values: [
          {
            content: "[Paris, France] : Gallimard, c2005.",
            source: {
              fieldTag: "p",
              marcTag: "260",
              ind1: " ",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "[Paris, France] :",
                },
                {
                  tag: "b",
                  content: "Gallimard,",
                },
                {
                  tag: "c",
                  content: "c2005.",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Description",
        values: [
          {
            content: "193 p. : ill. ; 19 cm.",
            source: {
              fieldTag: "r",
              marcTag: "300",
              ind1: " ",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "193 p. :",
                },
                {
                  tag: "b",
                  content: "ill. ;",
                },
                {
                  tag: "c",
                  content: "19 cm.",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Series",
        values: [
          {
            content: "Haute enfance",
            source: {
              fieldTag: "s",
              marcTag: "490",
              ind1: "1",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "Haute enfance",
                },
              ],
            },
          },
          {
            content: "Haute enfance (Gallimard (Firm))",
            source: {
              fieldTag: "s",
              marcTag: "830",
              ind1: " ",
              ind2: "0",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "Haute enfance (Gallimard (Firm))",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Indexed Term",
        values: [
          {
            content: "Autobiographical Narrative",
            source: {
              fieldTag: "d",
              marcTag: "653",
              ind1: " ",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "Autobiographical Narrative",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Subject",
        values: [
          {
            content: "Cortanze, Gérard de -- Childhood and youth.",
            source: {
              fieldTag: "d",
              marcTag: "600",
              ind1: "1",
              ind2: "0",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "Cortanze, Gérard de",
                },
                {
                  tag: "x",
                  content: "Childhood and youth.",
                },
              ],
            },
          },
          {
            content: "Authors, French -- 20th century -- Biography.",
            source: {
              fieldTag: "d",
              marcTag: "650",
              ind1: " ",
              ind2: "0",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "Authors, French",
                },
                {
                  tag: "y",
                  content: "20th century",
                },
                {
                  tag: "v",
                  content: "Biography.",
                },
              ],
            },
          },
        ],
      },
      {
        label: "LCCN",
        values: [
          {
            content: "2005483039",
            source: {
              fieldTag: "l",
              marcTag: "010",
              ind1: " ",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "2005483039",
                },
              ],
            },
          },
        ],
      },
      {
        label: "ISBN",
        values: [
          {
            content: "2070775178",
            source: {
              fieldTag: "i",
              marcTag: "020",
              ind1: " ",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "2070775178",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Research Call Number",
        values: [
          {
            content: "JFC 06-438",
            source: {
              fieldTag: "q",
              marcTag: "852",
              ind1: "8",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "h",
                  content: "JFC 06-438",
                },
              ],
            },
          },
        ],
      },
    ],
  },
}

export const yiddishBib = {
  resource: {
    "@context":
      "http://discovery-api-production.us-east-1.elasticbeanstalk.com/api/v0.1/discovery/context_all.jsonld",
    "@type": ["nypl:Item", "nypl:Resource"],
    "@id": "res:b13966759",
    carrierType: [
      {
        "@id": "carriertypes:nc",
        prefLabel: "volume",
      },
    ],
    contributorLiteral: ["Sztokfisz, David."],
    createdString: ["1968"],
    createdYear: 1968,
    dateStartYear: 1968,
    dateString: ["1968"],
    dimensions: ["25 cm."],
    electronicResources: [
      {
        url: "https://digitalcollections.nypl.org/items/f9706f90-64a7-0133-547d-00505686a51c",
        prefLabel: "NYPL Digital Collections",
      },
      {
        url: "https://www.yiddishbookcenter.org/collections/yizkor-books/yzk-nybc313724",
        prefLabel: "Yiddish Book Center",
      },
    ],
    extent: ["418 p. : ill., facsims., ports. ;"],
    genreForm: ["Memorial books (Holocaust)"],
    idLccn: ["he 68003086"],
    idOclc: ["19207169", "NYPH98-B4722"],
    identifier: [
      {
        "@type": "bf:ShelfMark",
        "@value": "*PXW (Khorostkov) (Sefer Ḥorosṭḳov. 1968)",
      },
      {
        "@type": "nypl:Bnumber",
        "@value": "13966759",
      },
      {
        "@type": "bf:Lccn",
        "@value": "he 68003086",
      },
      {
        "@type": "nypl:Oclc",
        "@value": "19207169",
      },
      {
        "@type": "nypl:Oclc",
        "@value": "19207169",
      },
      {
        "@type": "nypl:Oclc",
        "@value": "NYPH98-B4722",
      },
      {
        "@type": "bf:Identifier",
        "@value": "(WaOLN)nyp0553876",
      },
      {
        "@type": "bf:Identifier",
        "@value": "(OCoLC)19207169",
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
        values: [
          {
            value: "loc:maf82",
            count: 1,
            label: "Schwarzman Building - Dorot Jewish Division Room 111",
          },
          {
            value: "loc:maff3",
            count: 1,
            label: "Schwarzman Building - Dorot Jewish Division Desk Room 111",
          },
        ],
      },
      {
        "@type": "nypl:Aggregation",
        "@id": "res:format",
        id: "format",
        field: "format",
        values: [
          {
            value: "Text",
            count: 3,
            label: "Text",
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
            value: "status:a",
            count: 2,
            label: "Available",
          },
        ],
      },
    ],
    items: [
      {
        "@id": "res:i16894049",
        "@type": ["bf:Item"],
        accessMessage: [
          {
            "@id": "accessMessage:1",
            prefLabel: "Use in library",
          },
        ],
        catalogItemType: [
          {
            "@id": "catalogItemType:65",
            prefLabel: "book, good condition, non-MaRLI",
          },
        ],
        eddRequestable: false,
        formatLiteral: ["Text"],
        holdingLocation: [
          {
            "@id": "loc:maf82",
            prefLabel: "Schwarzman Building - Dorot Jewish Division Room 111",
          },
        ],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value": "*PXW (Khorostkov) (Sefer Horostkov. 1968)",
          },
        ],
        owner: [
          {
            "@id": "orgs:1103",
            prefLabel: "Dorot Jewish Division",
          },
        ],
        physRequestable: false,
        physicalLocation: ["*PXW (Khorostkov) (Sefer Horostkov. 1968)"],
        requestable: [false],
        shelfMark: ["*PXW (Khorostkov) (Sefer Horostkov. 1968)"],
        specRequestable: false,
        status: [
          {
            "@id": "status:a",
            prefLabel: "Available",
          },
        ],
        uri: "i16894049",
        idNyplSourceId: {
          "@type": "SierraNypl",
          "@value": "16894049",
        },
      },
      {
        "@id": "res:i25791623",
        "@type": ["bf:Item"],
        accessMessage: [
          {
            "@id": "accessMessage:1",
            prefLabel: "Use in library",
          },
        ],
        catalogItemType: [
          {
            "@id": "catalogItemType:65",
            prefLabel: "book, good condition, non-MaRLI",
          },
        ],
        eddRequestable: true,
        formatLiteral: ["Text"],
        holdingLocation: [
          {
            "@id": "loc:maff3",
            prefLabel:
              "Schwarzman Building - Dorot Jewish Division Desk Room 111",
          },
        ],
        idBarcode: ["33433084745110"],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value": "*P (Yizkor books. Reprint. Khorostkov)",
          },
          {
            "@type": "bf:Barcode",
            "@value": "33433084745110",
          },
        ],
        owner: [
          {
            "@id": "orgs:1103",
            prefLabel: "Dorot Jewish Division",
          },
        ],
        physRequestable: false,
        physicalLocation: ["*P (Yizkor books. Reprint. Khorostkov)"],
        requestable: [true],
        shelfMark: ["*P (Yizkor books. Reprint. Khorostkov)"],
        specRequestable: false,
        status: [
          {
            "@id": "status:a",
            prefLabel: "Available",
          },
        ],
        uri: "i25791623",
        idNyplSourceId: {
          "@type": "SierraNypl",
          "@value": "25791623",
        },
      },
    ],
    language: [
      {
        "@id": "lang:heb",
        prefLabel: "Hebrew",
      },
    ],
    lccClassification: ["DS135.R93 K42 1968"],
    format: [
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
        noteType: "Language",
        "@type": "bf:Note",
        prefLabel: "Hebrew orYiddish.",
      },
    ],
    numAvailable: 2,
    numCheckinCardItems: 0,
    numElectronicResources: 2,
    numItemDatesParsed: 0,
    numItemVolumesParsed: 0,
    numItems: 2,
    numItemsMatched: 2,
    numItemsTotal: 2,
    nyplSource: ["sierra-nypl"],
    parallelContributorLiteral: ["‏שטאקפיש, דוד."],
    parallelPlaceOfPublication: ["‏תל אביב"],
    parallelPublicationStatement: [
      "‏תל אביב : ועד ארגון יוצאי חורוסטוב בישראל, 8691.",
    ],
    parallelPublisherLiteral: ["‏ועד ארגון יוצאי חורוסטוב בישראל"],
    parallelTitle: ["‏ספר חורוסטוב = Chrostkow book"],
    parallelTitleAlt: ["‏חורוסטקוב; ספר-זכרון"],
    parallelTitleDisplay: [
      "‏ספר חורוסטוב = Chrostkow book / העורך, דוד שטאקפיש.",
    ],
    placeOfPublication: ["Tel Aviv"],
    publicationStatement: [
      "Tel Aviv : Ṿaʻad irgun yotsʼe Ḥorosṭḳov be-Yiśraʼel, 1968.",
    ],
    publisherLiteral: ["Ṿaʻad irgun yotsʼe Ḥorosṭḳov be-Yiśraʼel"],
    shelfMark: ["*PXW (Khorostkov) (Sefer Ḥorosṭḳov. 1968)"],
    subjectLiteral: [
      "Jews -- Khorostkov -- History.",
      "Holocaust, Jewish (1939-1945) -- Khorostkov.",
      "Khorostkov (Ukraine) -- Ethnic relations.",
    ],
    title: ["Sefer Ḥorosṭḳov = Chorostkow book"],
    titleAlt: ["Horosṭḳov; sefer zikaron"],
    titleDisplay: [
      "Sefer Ḥorosṭḳov = Chorostkow book / ha-ʻorekh, Daṿid Shṭoḳfish.",
    ],
    type: ["nypl:Item"],
    updatedAt: 1678659577819,
    uri: "b13966759",
    suppressed: false,
    hasItemVolumes: false,
    hasItemDates: false,
  },
  annotatedMarc: {
    id: "13966759",
    nyplSource: "sierra-nypl",
    fields: [
      {
        label: "Title",
        values: [
          {
            content:
              "Sefer Ḥorosṭḳov = Chorostkow book / ha-ʻorekh, Daṿid Shṭoḳfish.",
            source: {
              fieldTag: "t",
              marcTag: "245",
              ind1: "0",
              ind2: "0",
              content: null,
              subfields: [
                {
                  tag: "6",
                  content: "[redacted]",
                },
                {
                  tag: "a",
                  content: "Sefer Ḥorosṭḳov =",
                },
                {
                  tag: "b",
                  content: "Chorostkow book /",
                },
                {
                  tag: "c",
                  content: "ha-ʻorekh, Daṿid Shṭoḳfish.",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Alternate Script for Title",
        values: [
          {
            content: "ספר חורוסטוב = Chrostkow book / העורך, דוד שטאקפיש.",
            source: {
              fieldTag: "y",
              marcTag: "880",
              ind1: "0",
              ind2: "0",
              content: null,
              subfields: [
                {
                  tag: "6",
                  content: "[redacted]",
                },
                {
                  tag: "a",
                  content: "ספר חורוסטוב =",
                },
                {
                  tag: "b",
                  content: "Chrostkow book /",
                },
                {
                  tag: "c",
                  content: "העורך, דוד שטאקפיש.",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Imprint",
        values: [
          {
            content:
              "Tel Aviv : Ṿaʻad irgun yotsʼe Ḥorosṭḳov be-Yiśraʼel, 1968.",
            source: {
              fieldTag: "p",
              marcTag: "260",
              ind1: " ",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "6",
                  content: "[redacted]",
                },
                {
                  tag: "a",
                  content: "Tel Aviv :",
                },
                {
                  tag: "b",
                  content: "Ṿaʻad irgun yotsʼe Ḥorosṭḳov be-Yiśraʼel,",
                },
                {
                  tag: "c",
                  content: "1968.",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Alternate Script for Imprint",
        values: [
          {
            content: "תל אביב : ועד ארגון יוצאי חורוסטוב בישראל, 8691.",
            source: {
              fieldTag: "y",
              marcTag: "880",
              ind1: " ",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "6",
                  content: "[redacted]",
                },
                {
                  tag: "a",
                  content: "תל אביב :",
                },
                {
                  tag: "b",
                  content: "ועד ארגון יוצאי חורוסטוב בישראל,",
                },
                {
                  tag: "c",
                  content: "8691.",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Description",
        values: [
          {
            content: "418 p. : ill., facsims., ports. ; 25 cm.",
            source: {
              fieldTag: "r",
              marcTag: "300",
              ind1: " ",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "418 p. :",
                },
                {
                  tag: "b",
                  content: "ill., facsims., ports. ;",
                },
                {
                  tag: "c",
                  content: "25 cm.",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Language",
        values: [
          {
            content: "Hebrew orYiddish.",
            source: {
              fieldTag: "n",
              marcTag: "546",
              ind1: " ",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "Hebrew orYiddish.",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Connect to:",
        values: [
          {
            label: "NYPL Digital Collections",
            content: "http://link.nypl.org/QDOW-HthTv2--JmvYIVzeg3",
            source: {
              fieldTag: "y",
              marcTag: "856",
              ind1: "4",
              ind2: "0",
              content: null,
              subfields: [
                {
                  tag: "z",
                  content: "[redacted]",
                },
                {
                  tag: "u",
                  content: "http://link.nypl.org/QDOW-HthTv2--JmvYIVzeg3",
                },
              ],
            },
          },
          {
            label: "Yiddish Book Center",
            content:
              "https://www.yiddishbookcenter.org/collections/yizkor-books/yzk-nybc313724",
            source: {
              fieldTag: "y",
              marcTag: "856",
              ind1: "4",
              ind2: "0",
              content: null,
              subfields: [
                {
                  tag: "z",
                  content: "[redacted]",
                },
                {
                  tag: "u",
                  content:
                    "https://www.yiddishbookcenter.org/collections/yizkor-books/yzk-nybc313724",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Subject",
        values: [
          {
            content: "Jews -- Ukraine -- Khorostkov -- History.",
            source: {
              fieldTag: "d",
              marcTag: "650",
              ind1: " ",
              ind2: "0",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "Jews",
                },
                {
                  tag: "z",
                  content: "Ukraine",
                },
                {
                  tag: "z",
                  content: "Khorostkov",
                },
                {
                  tag: "x",
                  content: "History.",
                },
              ],
            },
          },
          {
            content: "Holocaust, Jewish (1939-1945) -- Ukraine -- Khorostkov.",
            source: {
              fieldTag: "d",
              marcTag: "650",
              ind1: " ",
              ind2: "0",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "Holocaust, Jewish (1939-1945)",
                },
                {
                  tag: "z",
                  content: "Ukraine",
                },
                {
                  tag: "z",
                  content: "Khorostkov.",
                },
              ],
            },
          },
          {
            content: "Khorostkov (Ukraine) -- Ethnic relations.",
            source: {
              fieldTag: "d",
              marcTag: "651",
              ind1: " ",
              ind2: "0",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "Khorostkov (Ukraine)",
                },
                {
                  tag: "x",
                  content: "Ethnic relations.",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Genre/Form",
        values: [
          {
            content: "Memorial books (Holocaust)",
            source: {
              fieldTag: "d",
              marcTag: "655",
              ind1: " ",
              ind2: "0",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "Memorial books (Holocaust)",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Added Author",
        values: [
          {
            content: "Sztokfisz, David.",
            source: {
              fieldTag: "b",
              marcTag: "700",
              ind1: "1",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "6",
                  content: "[redacted]",
                },
                {
                  tag: "a",
                  content: "Sztokfisz, David.",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Alternate Script for Added Author",
        values: [
          {
            content: "שטאקפיש, דוד.",
            source: {
              fieldTag: "y",
              marcTag: "880",
              ind1: "1",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "6",
                  content: "[redacted]",
                },
                {
                  tag: "a",
                  content: "שטאקפיש, דוד.",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Spine Title",
        values: [
          {
            content: "Horosṭḳov; sefer zikaron",
            source: {
              fieldTag: "u",
              marcTag: "246",
              ind1: "1",
              ind2: "8",
              content: null,
              subfields: [
                {
                  tag: "6",
                  content: "[redacted]",
                },
                {
                  tag: "a",
                  content: "Horosṭḳov; sefer zikaron",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Alternate Script for Spine Title",
        values: [
          {
            content: "חורוסטקוב; ספר-זכרון",
            source: {
              fieldTag: "y",
              marcTag: "880",
              ind1: "1",
              ind2: "8",
              content: null,
              subfields: [
                {
                  tag: "6",
                  content: "[redacted]",
                },
                {
                  tag: "a",
                  content: "חורוסטקוב; ספר-זכרון",
                },
              ],
            },
          },
        ],
      },
      {
        label: "LCCN",
        values: [
          {
            content: "he 68003086",
            source: {
              fieldTag: "l",
              marcTag: "010",
              ind1: " ",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "he 68003086",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Research Call Number",
        values: [
          {
            content: "*PXW (Khorostkov) (Sefer Ḥorosṭḳov. 1968)",
            source: {
              fieldTag: "q",
              marcTag: "852",
              ind1: "8",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "h",
                  content: "*PXW (Khorostkov) (Sefer Ḥorosṭḳov. 1968)",
                },
              ],
            },
          },
        ],
      },
    ],
  },
}

export const bibManyEResources = {
  resource: {
    "@context":
      "http://discovery-api-production.nypl.org/api/v0.1/discovery/context_all.jsonld",
    "@type": ["nypl:Item", "nypl:Resource"],
    "@id": "res:b15109087",
    carrierType: [
      {
        "@id": "carriertypes:nc",
        prefLabel: "volume",
      },
    ],
    contributorLiteral: ["Société de gens de lettres."],
    createdString: ["17uu"],
    createdYear: 17,
    dateEndString: ["1uuu"],
    dateEndYear: 1,
    dateStartYear: 17,
    dateString: ["17uu"],
    dimensions: ["15 cm."],
    electronicResources: [
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081743126",
        prefLabel: "Full text available via HathiTrust--Table (1782-1784)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081743134",
        prefLabel: "Full text available via HathiTrust--no. 4 (1818)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081743142",
        prefLabel: "Full text available via HathiTrust--no. 2-3 (1818)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081743159",
        prefLabel:
          "Full text available via HathiTrust--no. 12, 1817-no. 1, 1818",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081743167",
        prefLabel: "Full text available via HathiTrust--no. 10-11 (1817)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081743175",
        prefLabel: "Full text available via HathiTrust--no. 8-9 (1817)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081743183",
        prefLabel: "Full text available via HathiTrust--no. 6-7 (1817)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081743191",
        prefLabel: "Full text available via HathiTrust--no. 4-5 (1817)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081743209",
        prefLabel: "Full text available via HathiTrust--no. 11-12 (1814)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081743217",
        prefLabel: "Full text available via HathiTrust--no. 9-10 (1814)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081743225",
        prefLabel: "Full text available via HathiTrust--no. 7-8 (1814)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081743233",
        prefLabel: "Full text available via HathiTrust--no. 5-6 (1814)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081743241",
        prefLabel: "Full text available via HathiTrust--no. 3-4 (1814)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081743258",
        prefLabel: "Full text available via HathiTrust--no. 1-2 (1814)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081743266",
        prefLabel: "Full text available via HathiTrust--no. 11-12 (1809)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081743274",
        prefLabel: "Full text available via HathiTrust--no. 9-10 (1809)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081743282",
        prefLabel: "Full text available via HathiTrust--no. 7-8 (1809)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081743290",
        prefLabel: "Full text available via HathiTrust--no. 5-6 (1809)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081743308",
        prefLabel: "Full text available via HathiTrust--no. 3-4 (1809)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081743316",
        prefLabel: "Full text available via HathiTrust--no. 1-2 (1809)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081743324",
        prefLabel: "Full text available via HathiTrust--no. 11-12 (1808)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081743332",
        prefLabel: "Full text available via HathiTrust--no. 9-10 (1808)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081743340",
        prefLabel: "Full text available via HathiTrust--no. 5-6 (1808)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081743357",
        prefLabel: "Full text available via HathiTrust--no. 3-4 (1808)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081743365",
        prefLabel: "Full text available via HathiTrust--no. 1-2 (1808)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081743373",
        prefLabel: "Full text available via HathiTrust--no. 11-12 (1807)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081743381",
        prefLabel: "Full text available via HathiTrust--no. 9-10 (1807)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081743399",
        prefLabel: "Full text available via HathiTrust--no. 7-8 (1807)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081743407",
        prefLabel: "Full text available via HathiTrust--no. 5-6 (1807)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081743423",
        prefLabel: "Full text available via HathiTrust--no. 11-12 (1806)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081743431",
        prefLabel: "Full text available via HathiTrust--no. 9-10 (1806)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081743449",
        prefLabel: "Full text available via HathiTrust--no. 7-8 (1806)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081743456",
        prefLabel: "Full text available via HathiTrust--no. 5-6 (1806)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081743464",
        prefLabel: "Full text available via HathiTrust--no. 3-4 (1806)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081743472",
        prefLabel: "Full text available via HathiTrust--no. 1-2 (1806)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081743480",
        prefLabel: "Full text available via HathiTrust--no. 11-12 (1805)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081743498",
        prefLabel: "Full text available via HathiTrust--no. 9-10 (1805)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081743506",
        prefLabel: "Full text available via HathiTrust--no. 7-8 (1805)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081743514",
        prefLabel: "Full text available via HathiTrust--no. 11-12 (1813)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081743522",
        prefLabel: "Full text available via HathiTrust--no. 9-10 (1813)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081743530",
        prefLabel: "Full text available via HathiTrust--no. 7-8 (1813)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081743548",
        prefLabel: "Full text available via HathiTrust--no. 5-6 (1813)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081743555",
        prefLabel: "Full text available via HathiTrust--no. 3-4 (1813)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081743563",
        prefLabel: "Full text available via HathiTrust--no. 1-2 (1813)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081743571",
        prefLabel: "Full text available via HathiTrust--no. 11-12 (1812)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081743589",
        prefLabel: "Full text available via HathiTrust--no. 9-10 (1812)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081743597",
        prefLabel: "Full text available via HathiTrust--no. 7-8 (1812)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081743605",
        prefLabel: "Full text available via HathiTrust--no. 5-6 (1812)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081743613",
        prefLabel: "Full text available via HathiTrust--no. 3-4 (1812)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081743621",
        prefLabel: "Full text available via HathiTrust--no. 1-2 (1812)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081743639",
        prefLabel: "Full text available via HathiTrust--no. 11-12 (1811)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081743647",
        prefLabel: "Full text available via HathiTrust--no. 9-10 (1811)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081743654",
        prefLabel: "Full text available via HathiTrust--no. 7-8 (1811)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081743662",
        prefLabel: "Full text available via HathiTrust--v. 5-6 (1811)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081743670",
        prefLabel: "Full text available via HathiTrust--no. 3-4 (1811)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081743688",
        prefLabel: "Full text available via HathiTrust--no. 1-2 (1811)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081743696",
        prefLabel: "Full text available via HathiTrust--no. 11-12 (1810)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081743704",
        prefLabel: "Full text available via HathiTrust--no. 9-10 (1810)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081743712",
        prefLabel: "Full text available via HathiTrust--no. 7-8 (1810)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081743720",
        prefLabel: "Full text available via HathiTrust--no. 7-8 (1808)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081743738",
        prefLabel: "Full text available via HathiTrust--no. 5-6 (1810)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081743746",
        prefLabel: "Full text available via HathiTrust--no. 3-4 (1810)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081743753",
        prefLabel: "Full text available via HathiTrust--no. 1-2 (1810)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081743761",
        prefLabel: "Full text available via HathiTrust--no. 2 (1793)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081743779",
        prefLabel: "Full text available via HathiTrust--no. 1 (1793)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081743787",
        prefLabel: "Full text available via HathiTrust--no. 12 (1792)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081743795",
        prefLabel: "Full text available via HathiTrust--no. 11 (1792)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081743803",
        prefLabel: "Full text available via HathiTrust--no. 10 (1792)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081743811",
        prefLabel: "Full text available via HathiTrust--no. 9 (1792)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081743829",
        prefLabel: "Full text available via HathiTrust--no. 8 (1792)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081743837",
        prefLabel: "Full text available via HathiTrust--no. 7 (1792)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081743845",
        prefLabel: "Full text available via HathiTrust--no. 6 (1792)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081743852",
        prefLabel: "Full text available via HathiTrust--no. 5 (1792)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081743860",
        prefLabel: "Full text available via HathiTrust--no. 4 (1792)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081743878",
        prefLabel: "Full text available via HathiTrust--no. 3 (1792)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081743886",
        prefLabel: "Full text available via HathiTrust--no. 2 (1792)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081743894",
        prefLabel: "Full text available via HathiTrust--no. 1 (1792)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081743902",
        prefLabel: "Full text available via HathiTrust--no. 12 (1791)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081743910",
        prefLabel: "Full text available via HathiTrust--no. 11 (1791)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081743928",
        prefLabel: "Full text available via HathiTrust--no. 10 (1791)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081743936",
        prefLabel: "Full text available via HathiTrust--no. 9 (1791)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081743944",
        prefLabel: "Full text available via HathiTrust--no. 8 (1791)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081743951",
        prefLabel: "Full text available via HathiTrust--no. 7 (1791)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081743969",
        prefLabel: "Full text available via HathiTrust--no. 6 (1791)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081743977",
        prefLabel: "Full text available via HathiTrust--no. 5 (1791)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081743985",
        prefLabel: "Full text available via HathiTrust--no. 4 (1791)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081743993",
        prefLabel: "Full text available via HathiTrust--no. 3 (1791)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081744009",
        prefLabel: "Full text available via HathiTrust--no. 2 (1791)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081744017",
        prefLabel: "Full text available via HathiTrust--no. 1 (1791)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081744025",
        prefLabel: "Full text available via HathiTrust--no. 12 (1790)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081744033",
        prefLabel: "Full text available via HathiTrust--no. 11 (1790)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081744041",
        prefLabel: "Full text available via HathiTrust--no. 10 (1790)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081744058",
        prefLabel: "Full text available via HathiTrust--no. 9 (1790)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081744066",
        prefLabel: "Full text available via HathiTrust--no. 8 (1790)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081744074",
        prefLabel: "Full text available via HathiTrust--no. 7 (1790)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081744082",
        prefLabel: "Full text available via HathiTrust--no. 6 (1790)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081744090",
        prefLabel: "Full text available via HathiTrust--no. 5 (1790)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081744108",
        prefLabel: "Full text available via HathiTrust--no. 4 (1790)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081744116",
        prefLabel: "Full text available via HathiTrust--no. 3 (1790)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081744124",
        prefLabel: "Full text available via HathiTrust--no. 2 (1790)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081744132",
        prefLabel: "Full text available via HathiTrust--no. 1 (1790)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081744140",
        prefLabel: "Full text available via HathiTrust--no. 12 (1789)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081744157",
        prefLabel: "Full text available via HathiTrust--no. 11 (1789)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081744165",
        prefLabel: "Full text available via HathiTrust--no. 10 (1789)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081744173",
        prefLabel: "Full text available via HathiTrust--no. 9 (1789)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081744181",
        prefLabel: "Full text available via HathiTrust--no. 8 (1789)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081744199",
        prefLabel: "Full text available via HathiTrust--no. 7 (1789)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081744207",
        prefLabel: "Full text available via HathiTrust--no. 6 (1789)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081744215",
        prefLabel: "Full text available via HathiTrust--no. 5 (1789)",
      },
      {
        url: "http://hdl.handle.net/2027/nyp.33433081744223",
        prefLabel: "Full text available via HathiTrust--no. 4 (1789)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081744231",
        prefLabel: "Full text available via HathiTrust--no. 3 (1789)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081744249",
        prefLabel: "Full text available via HathiTrust--no. 2 (1789)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081744256",
        prefLabel: "Full text available via HathiTrust--no. 1 (1789)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081744264",
        prefLabel: "Full text available via HathiTrust--no. 9-12 (1795)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081744272",
        prefLabel: "Full text available via HathiTrust--no. 5-8 (1795)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081744280",
        prefLabel: "Full text available via HathiTrust--no. 1-4 (1795)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081744298",
        prefLabel: "Full text available via HathiTrust--no. 12 (1794)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081744306",
        prefLabel: "Full text available via HathiTrust--no. 11 (1794)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081744314",
        prefLabel: "Full text available via HathiTrust--no. 10 (1794)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081744322",
        prefLabel: "Full text available via HathiTrust--no. 9 (1794)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081744330",
        prefLabel: "Full text available via HathiTrust--no. 8 (1794)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081744348",
        prefLabel: "Full text available via HathiTrust--no. 7 (1794)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081744355",
        prefLabel: "Full text available via HathiTrust--no. 6 (1794)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081744363",
        prefLabel: "Full text available via HathiTrust--no. 5 (1794)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081744371",
        prefLabel: "Full text available via HathiTrust--no. 4 (1794)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081744389",
        prefLabel: "Full text available via HathiTrust--no. 3 (1794)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081744397",
        prefLabel: "Full text available via HathiTrust--no. 2 (1794)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081744405",
        prefLabel: "Full text available via HathiTrust--no. 1 (1794)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081744413",
        prefLabel: "Full text available via HathiTrust--no. 12 (1793)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081744421",
        prefLabel: "Full text available via HathiTrust--no. 11 (1793)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081744439",
        prefLabel: "Full text available via HathiTrust--no. 10 (1793)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081744447",
        prefLabel: "Full text available via HathiTrust--no. 9 (1793)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081744454",
        prefLabel: "Full text available via HathiTrust--no. 8 (1793)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081744462",
        prefLabel: "Full text available via HathiTrust--no. 7 (1793)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081744470",
        prefLabel: "Full text available via HathiTrust--no. 6 (1793)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081744488",
        prefLabel: "Full text available via HathiTrust--no. 5 (1793)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081744496",
        prefLabel: "Full text available via HathiTrust--no. 4 (1793)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081744504",
        prefLabel: "Full text available via HathiTrust--no. 3 (1793)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081744512",
        prefLabel: "Full text available via HathiTrust--no. 1-2 (1801)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081744520",
        prefLabel: "Full text available via HathiTrust--no. 11-12 (1800)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081744538",
        prefLabel: "Full text available via HathiTrust--no. 9-10 (1800)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081744546",
        prefLabel: "Full text available via HathiTrust--no. 7-8 (1800)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081744553",
        prefLabel: "Full text available via HathiTrust--no. 5-6 (1800)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081744561",
        prefLabel: "Full text available via HathiTrust--no. 3-4 (1800)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081744579",
        prefLabel: "Full text available via HathiTrust--no. 1-2 (1800)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081744587",
        prefLabel: "Full text available via HathiTrust--no. 11-12 (1799)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081744595",
        prefLabel: "Full text available via HathiTrust--no. 9-10 (1799)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081744603",
        prefLabel: "Full text available via HathiTrust--no. 7-8 (1799)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081744611",
        prefLabel: "Full text available via HathiTrust--no. 5-6 (1799)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081744629",
        prefLabel: "Full text available via HathiTrust--no. 3-4 (1799)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081744637",
        prefLabel: "Full text available via HathiTrust--no. 1-2 (1799)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081744645",
        prefLabel: "Full text available via HathiTrust--no. 11-12 (1798)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081744652",
        prefLabel: "Full text available via HathiTrust--no. 9-10 (1798)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081744660",
        prefLabel: "Full text available via HathiTrust--no. 7-8 (1798)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081744678",
        prefLabel: "Full text available via HathiTrust--no. 5-6 (1798)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081744686",
        prefLabel: "Full text available via HathiTrust--no. 3-4 (1798)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081744694",
        prefLabel: "Full text available via HathiTrust--no. 1-2 (1798)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081744702",
        prefLabel: "Full text available via HathiTrust--no. 9-12 (1797)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081744710",
        prefLabel: "Full text available via HathiTrust--no. 5-8 (1797)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081744728",
        prefLabel: "Full text available via HathiTrust--no. 1-4 (1797)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081744736",
        prefLabel: "Full text available via HathiTrust--no. 9-12 (1796)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081744744",
        prefLabel: "Full text available via HathiTrust--no. 5-8 (1796)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081744751",
        prefLabel: "Full text available via HathiTrust--no. 1-4 (1796)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081744769",
        prefLabel: "Full text available via HathiTrust--no. 3-4 (1807)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081744777",
        prefLabel: "Full text available via HathiTrust--no. 5-6 (1805)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081744785",
        prefLabel: "Full text available via HathiTrust--no. 3-4 (1805)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081744793",
        prefLabel: "Full text available via HathiTrust--no. 1-2 (1805)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081744801",
        prefLabel:
          "Full text available via HathiTrust--Table Generale 1-28 (1803-1805)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081744819",
        prefLabel: "Full text available via HathiTrust--no. 11-12 (1804)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081744827",
        prefLabel: "Full text available via HathiTrust--no. 9-10 (1804)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081744835",
        prefLabel: "Full text available via HathiTrust--no. 7-8 (1804)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081744843",
        prefLabel: "Full text available via HathiTrust--no. 5-6 (1804)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081744850",
        prefLabel: "Full text available via HathiTrust--no. 3-4 (1804)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081744868",
        prefLabel: "Full text available via HathiTrust--no. 1-2 (1804)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081744876",
        prefLabel: "Full text available via HathiTrust--no. 11-12 (1803)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081744884",
        prefLabel: "Full text available via HathiTrust--no. 9-10 (1803)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081744892",
        prefLabel: "Full text available via HathiTrust--no. 1-3 (1803)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081744900",
        prefLabel: "Full text available via HathiTrust--no. 11-12 (1802)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081744918",
        prefLabel: "Full text available via HathiTrust--no. 9-10 (1802)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081744926",
        prefLabel: "Full text available via HathiTrust--no. 7-8 (1802)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081744934",
        prefLabel: "Full text available via HathiTrust--no. 5-6 (1802)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081744942",
        prefLabel: "Full text available via HathiTrust--no. 3-4 (1802)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081744959",
        prefLabel: "Full text available via HathiTrust--no. 1-2 (1802)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081744967",
        prefLabel: "Full text available via HathiTrust--no. 11-12 (1801)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081744975",
        prefLabel: "Full text available via HathiTrust--no. 9-10 (1801)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081744983",
        prefLabel: "Full text available via HathiTrust--no. 7-8 (1801)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081744991",
        prefLabel: "Full text available via HathiTrust--no. 5-6 (1801)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081745006",
        prefLabel: "Full text available via HathiTrust--no. 3-4 (1801)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081745014",
        prefLabel: "Full text available via HathiTrust--no. 9 (1782)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081745022",
        prefLabel: "Full text available via HathiTrust--no. 8 (1782)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081745030",
        prefLabel: "Full text available via HathiTrust--no. 7 (1782)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081745048",
        prefLabel: "Full text available via HathiTrust--no. 6 (1782)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081745055",
        prefLabel: "Full text available via HathiTrust--no. 5 (1782)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081745063",
        prefLabel: "Full text available via HathiTrust--no. 4 (1782)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081745071",
        prefLabel: "Full text available via HathiTrust--no. 3 (1782)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081745089",
        prefLabel: "Full text available via HathiTrust--no. 2 (1782)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081745097",
        prefLabel: "Full text available via HathiTrust--no. 1 (1782)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081745105",
        prefLabel: "Full text available via HathiTrust--Table (1779-1781)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081745113",
        prefLabel: "Full text available via HathiTrust--no. 12 (1781)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081745121",
        prefLabel: "Full text available via HathiTrust--no. 11 (1781)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081745139",
        prefLabel: "Full text available via HathiTrust--no. 10 (1781)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081745147",
        prefLabel: "Full text available via HathiTrust--no. 9 (1781)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081745154",
        prefLabel: "Full text available via HathiTrust--no. 8 (1781)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081745162",
        prefLabel: "Full text available via HathiTrust--no. 3 (1781)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081745170",
        prefLabel: "Full text available via HathiTrust--no. 7 (1781)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081745188",
        prefLabel: "Full text available via HathiTrust--no. 6 (1781)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081745196",
        prefLabel: "Full text available via HathiTrust--no. 4 (1781)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081745204",
        prefLabel: "Full text available via HathiTrust--no. 5 (1781)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081745212",
        prefLabel: "Full text available via HathiTrust--no. 12 (1780)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081745220",
        prefLabel: "Full text available via HathiTrust--no. 2 (1781)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081745238",
        prefLabel: "Full text available via HathiTrust--no. 1 (1781)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081745246",
        prefLabel: "Full text available via HathiTrust--no. 11 (1780)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081745253",
        prefLabel: "Full text available via HathiTrust--no. 10 (1780)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081745261",
        prefLabel: "Full text available via HathiTrust--no. 9 (1780)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081745279",
        prefLabel: "Full text available via HathiTrust--no. 8 (1780)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081745287",
        prefLabel: "Full text available via HathiTrust--no. 7 (1780)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081745295",
        prefLabel: "Full text available via HathiTrust--no. 6 (1780)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081745303",
        prefLabel: "Full text available via HathiTrust--no. 5 (1780)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081745311",
        prefLabel: "Full text available via HathiTrust--no. 4 (1780)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081745329",
        prefLabel: "Full text available via HathiTrust--no. 3 (1780)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081745337",
        prefLabel: "Full text available via HathiTrust--no. 2 (1780)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081745345",
        prefLabel: "Full text available via HathiTrust--no. 1 (1780)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081745352",
        prefLabel: "Full text available via HathiTrust--no. 12 (1779)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081745360",
        prefLabel: "Full text available via HathiTrust--no. 11 (1779)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081745378",
        prefLabel: "Full text available via HathiTrust--no. 10 (1779)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081745386",
        prefLabel: "Full text available via HathiTrust--no. 9 (1779)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081745394",
        prefLabel: "Full text available via HathiTrust--no. 8 (1779)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081745402",
        prefLabel: "Full text available via HathiTrust--no. 7 (1779)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081745410",
        prefLabel: "Full text available via HathiTrust--no. 6 (1779)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081745428",
        prefLabel: "Full text available via HathiTrust--no. 5 (1779)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081745436",
        prefLabel: "Full text available via HathiTrust--no. 4 (1779)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081745444",
        prefLabel: "Full text available via HathiTrust--no. 3 (1779)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081745451",
        prefLabel: "Full text available via HathiTrust--no. 2 (1779)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081745469",
        prefLabel: "Full text available via HathiTrust--no. 1 (1779)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081745477",
        prefLabel: "Full text available via HathiTrust--Table (1776-1778)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081745485",
        prefLabel: "Full text available via HathiTrust--no. 12 (1778)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081745493",
        prefLabel: "Full text available via HathiTrust--no. 11 (1778)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081745501",
        prefLabel: "Full text available via HathiTrust--no. 10 (1778)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081745519",
        prefLabel: "Full text available via HathiTrust--no. 10 (1784)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081745527",
        prefLabel: "Full text available via HathiTrust--no. 9 (1784)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081745535",
        prefLabel: "Full text available via HathiTrust--no. 8 (1784)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081745543",
        prefLabel: "Full text available via HathiTrust--no. 7 (1784)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081745550",
        prefLabel: "Full text available via HathiTrust--no. 6 (1784)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081745568",
        prefLabel: "Full text available via HathiTrust--no. 5 (1784)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081745576",
        prefLabel: "Full text available via HathiTrust--no. 4 (1784)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081745584",
        prefLabel: "Full text available via HathiTrust--no. 3 (1784)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081745592",
        prefLabel: "Full text available via HathiTrust--no. 2 (1784)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081745600",
        prefLabel: "Full text available via HathiTrust--no. 1 (1784)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081745618",
        prefLabel: "Full text available via HathiTrust--no. 12 (1783)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081745626",
        prefLabel: "Full text available via HathiTrust--no. 11 (1783)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081745634",
        prefLabel: "Full text available via HathiTrust--no. 10 (1783)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081745642",
        prefLabel: "Full text available via HathiTrust--no. 9 (1783)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081745659",
        prefLabel: "Full text available via HathiTrust--no. 8 (1783)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081745667",
        prefLabel: "Full text available via HathiTrust--no. 7 (1783)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081745675",
        prefLabel: "Full text available via HathiTrust--no. 6 (1783)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081745683",
        prefLabel: "Full text available via HathiTrust--no. 5 (1783)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081745691",
        prefLabel: "Full text available via HathiTrust--no. 4 (1783)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081745709",
        prefLabel: "Full text available via HathiTrust--no. 3 (1783)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081745717",
        prefLabel: "Full text available via HathiTrust--no. 2 (1783)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081745725",
        prefLabel: "Full text available via HathiTrust--no. 1 (1783)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081745733",
        prefLabel: "Full text available via HathiTrust--no. 12 (1782)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081745741",
        prefLabel: "Full text available via HathiTrust--no. 11 (1782)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081745758",
        prefLabel: "Full text available via HathiTrust--no. 10 (1782)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081745766",
        prefLabel: "Full text available via HathiTrust--no. 6 (1787)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081745774",
        prefLabel: "Full text available via HathiTrust--no. 1 (1787)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081745782",
        prefLabel: "Full text available via HathiTrust--no. 5 (1787)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081745790",
        prefLabel: "Full text available via HathiTrust--no. 4 (1787)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081745808",
        prefLabel: "Full text available via HathiTrust--no. 8 (1785)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081745816",
        prefLabel: "Full text available via HathiTrust--no. 9 (1785)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081745824",
        prefLabel: "Full text available via HathiTrust--no. 7 (1785)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081745832",
        prefLabel: "Full text available via HathiTrust--no. 6 (1785)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081745840",
        prefLabel: "Full text available via HathiTrust--no. 5 (1785)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081745857",
        prefLabel: "Full text available via HathiTrust--no. 4 (1785)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081745865",
        prefLabel: "Full text available via HathiTrust--no. 3 (1785)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081745873",
        prefLabel: "Full text available via HathiTrust--no. 8 (1786)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081745881",
        prefLabel: "Full text available via HathiTrust--no. 7 (1786)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081745899",
        prefLabel: "Full text available via HathiTrust--no. 6 (1786)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081745907",
        prefLabel: "Full text available via HathiTrust--no. 5 (1786)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081745915",
        prefLabel: "Full text available via HathiTrust--no. 4 (1786)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081745923",
        prefLabel: "Full text available via HathiTrust--no. 3 (1786)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081745931",
        prefLabel: "Full text available via HathiTrust--no. 2 (1786)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081745949",
        prefLabel: "Full text available via HathiTrust--no. 1 (1786)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081745956",
        prefLabel: "Full text available via HathiTrust--no. 12 (1785)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081745964",
        prefLabel: "Full text available via HathiTrust--no. 11 (1785)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081745972",
        prefLabel: "Full text available via HathiTrust--no. 10 (1785)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081745980",
        prefLabel: "Full text available via HathiTrust--no. 1 (1785)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081745998",
        prefLabel: "Full text available via HathiTrust--no. 12 (1784)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081746004",
        prefLabel: "Full text available via HathiTrust--no. 11 (1784)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081746012",
        prefLabel: "Full text available via HathiTrust--no. 12 (1788)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081746020",
        prefLabel: "Full text available via HathiTrust--no. 11 (1788)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081746038",
        prefLabel: "Full text available via HathiTrust--no. 10 (1788)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081746046",
        prefLabel: "Full text available via HathiTrust--no. 9 (1788)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081746053",
        prefLabel: "Full text available via HathiTrust--no. 8 (1788)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081746061",
        prefLabel: "Full text available via HathiTrust--no. 7 (1788)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081746079",
        prefLabel: "Full text available via HathiTrust--no. 6 (1788)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081746087",
        prefLabel: "Full text available via HathiTrust--no. 5 (1788)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081746095",
        prefLabel: "Full text available via HathiTrust--no. 4 (1788)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081746103",
        prefLabel: "Full text available via HathiTrust--no. 3 (1788)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081746111",
        prefLabel: "Full text available via HathiTrust--no. 2 (1788)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081746129",
        prefLabel: "Full text available via HathiTrust--no. 1 (1788)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081746137",
        prefLabel: "Full text available via HathiTrust--no. 12 (1787)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081746145",
        prefLabel: "Full text available via HathiTrust--no. 11 (1787)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081746152",
        prefLabel: "Full text available via HathiTrust--no. 10 (1787)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081746160",
        prefLabel: "Full text available via HathiTrust--no. 9 (1787)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081746178",
        prefLabel: "Full text available via HathiTrust--no. 8 (1787)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081746186",
        prefLabel: "Full text available via HathiTrust--no. 7 (1787)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081746194",
        prefLabel: "Full text available via HathiTrust--no. 12 (1786)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081746202",
        prefLabel: "Full text available via HathiTrust--no. 11 (1786)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081746210",
        prefLabel: "Full text available via HathiTrust--no. 10 (1786)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081746228",
        prefLabel: "Full text available via HathiTrust--no. 9 (1786)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081746236",
        prefLabel: "Full text available via HathiTrust--no. 2 (1785)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081746244",
        prefLabel: "Full text available via HathiTrust--no. 3 (1787)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081746764",
        prefLabel: "Full text available via HathiTrust--no. 10-12 (1773)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081746772",
        prefLabel: "Full text available via HathiTrust--no. 7-9 (1773)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081746780",
        prefLabel: "Full text available via HathiTrust--no. 4-6 (1773)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081746798",
        prefLabel: "Full text available via HathiTrust--no. 1-3 (1773)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081746806",
        prefLabel: "Full text available via HathiTrust--no. 10-12 (1772)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081746814",
        prefLabel: "Full text available via HathiTrust--no. 7-9 (1772)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081747010",
        prefLabel: "Full text available via HathiTrust--no. 12 (1776)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081747028",
        prefLabel: "Full text available via HathiTrust--no. 11 (1776)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081747036",
        prefLabel: "Full text available via HathiTrust--no. 10 (1776)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081747044",
        prefLabel: "Full text available via HathiTrust--no. 9 (1776)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081747051",
        prefLabel: "Full text available via HathiTrust--no. 7 (1776)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081747069",
        prefLabel: "Full text available via HathiTrust--no. 8 (1776)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081747077",
        prefLabel: "Full text available via HathiTrust--no. 6 (1776)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081747085",
        prefLabel: "Full text available via HathiTrust--no. 5 (1776)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081747093",
        prefLabel: "Full text available via HathiTrust--no. 4 (1776)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081747101",
        prefLabel: "Full text available via HathiTrust--no. 3 (1776)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081747119",
        prefLabel: "Full text available via HathiTrust--no. 11 (1776)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081747127",
        prefLabel: "Full text available via HathiTrust--no. 10 (1775)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081747135",
        prefLabel: "Full text available via HathiTrust--no. 9 (1775)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081747143",
        prefLabel: "Full text available via HathiTrust--no. 8 (1775)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081747150",
        prefLabel: "Full text available via HathiTrust--no. 7 (1775)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081747168",
        prefLabel: "Full text available via HathiTrust--no. 6 (1775)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081747176",
        prefLabel: "Full text available via HathiTrust--no. 5 (1775)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081747184",
        prefLabel: "Full text available via HathiTrust--no. 4 (1775)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081747192",
        prefLabel: "Full text available via HathiTrust--no. 3 (1775)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081747200",
        prefLabel: "Full text available via HathiTrust--no. 2 (1775)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081747218",
        prefLabel: "Full text available via HathiTrust--no. 1 (1775)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081747226",
        prefLabel: "Full text available via HathiTrust--no. 10-12 (1774)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081747234",
        prefLabel: "Full text available via HathiTrust--no. 7-9 (1774)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081747242",
        prefLabel: "Full text available via HathiTrust--no. 4-6 (1774)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081747259",
        prefLabel: "Full text available via HathiTrust--no. 1-3 (1774)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081747267",
        prefLabel: "Full text available via HathiTrust--no. 9 (1778)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081747275",
        prefLabel: "Full text available via HathiTrust--no. 8 (1778)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081747283",
        prefLabel: "Full text available via HathiTrust--no. 7 (1778)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081747291",
        prefLabel: "Full text available via HathiTrust--no. 6 (1778)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081747309",
        prefLabel: "Full text available via HathiTrust--no. 5 (1778)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081747317",
        prefLabel: "Full text available via HathiTrust--no. 4 (1778)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081747325",
        prefLabel: "Full text available via HathiTrust--no. 3 (1778)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081747333",
        prefLabel: "Full text available via HathiTrust--no. 2 (1778)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081747341",
        prefLabel: "Full text available via HathiTrust--no. 1 (1778)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081747358",
        prefLabel: "Full text available via HathiTrust--no. 12 (1777)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081747366",
        prefLabel: "Full text available via HathiTrust--no. 11 (1777)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081747374",
        prefLabel: "Full text available via HathiTrust--no. 10 (1777)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081747382",
        prefLabel: "Full text available via HathiTrust--no. 9 (1777)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081747390",
        prefLabel: "Full text available via HathiTrust--no. 8 (1777)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081747408",
        prefLabel: "Full text available via HathiTrust--no. 7 (1777)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081747416",
        prefLabel: "Full text available via HathiTrust--no. 6 (1777)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081747424",
        prefLabel: "Full text available via HathiTrust--no. 5 (1777)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081747432",
        prefLabel: "Full text available via HathiTrust--no. 4 (1777)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081747440",
        prefLabel: "Full text available via HathiTrust--no. 3 (1777)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081747457",
        prefLabel: "Full text available via HathiTrust--no. 2 (1777)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081747465",
        prefLabel: "Full text available via HathiTrust--no. 1 (1777)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081747473",
        prefLabel: "Full text available via HathiTrust--no. 2 (1776)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081747481",
        prefLabel: "Full text available via HathiTrust--no. 1 (1776)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081747499",
        prefLabel: "Full text available via HathiTrust--Table (1772-1775)",
      },
      {
        url: "http://babel.hathitrust.org/cgi/pt?id=nyp.33433081747507",
        prefLabel: "Full text available via HathiTrust--no. 12 (1775)",
      },
    ],
    extent: ["v. : ill. ;"],
    idOclc: [1568232],
    identifier: [
      {
        "@type": "bf:ShelfMark",
        "@value": "*DM (Esprit des Journaux, françois et etrangers)",
      },
      {
        "@type": "nypl:Bnumber",
        "@value": 15109087,
      },
      {
        "@type": "nypl:Oclc",
        "@value": 1568232,
      },
      {
        "@type": "bf:Identifier",
        "@value": 246617,
      },
      {
        "@type": "bf:Identifier",
        "@value": "(WaOLN)Z150000218",
      },
    ],
    issuance: [
      {
        "@id": "urn:biblevel:s",
        prefLabel: "serial",
      },
    ],
    itemAggregations: [
      {
        "@type": "nypl:Aggregation",
        "@id": "res:location",
        id: "location",
        field: "location",
        values: [
          {
            value: "loc:rc2ma",
            count: 370,
            label: "Offsite",
          },
        ],
      },
      {
        "@type": "nypl:Aggregation",
        "@id": "res:format",
        id: "format",
        field: "format",
        values: [
          {
            value: "Text",
            count: 370,
            label: "Text",
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
            value: "status:a",
            count: 370,
            label: "Available",
          },
        ],
      },
    ],
    items: [
      {
        "@id": "res:i17145921",
        "@type": ["bf:Item"],
        accessMessage: [
          {
            "@id": "accessMessage:u",
            prefLabel: "Supervised use",
          },
        ],
        catalogItemType: [
          {
            "@id": "catalogItemType:33",
            prefLabel: "google project, serial",
          },
        ],
        dateRange: [
          {
            gte: "1794",
            lte: "1794",
          },
        ],
        eddRequestable: true,
        enumerationChronology: ["no. 12 (1794)"],
        formatLiteral: ["Text"],
        holdingLocation: [
          {
            "@id": "loc:rc2ma",
            prefLabel: "Offsite",
          },
        ],
        idBarcode: ["33433081744298"],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value":
              "*DM (Esprit des Journaux, françois et etrangers) no. 12 (1794)",
          },
          {
            "@type": "bf:Barcode",
            "@value": "33433081744298",
          },
        ],
        owner: [
          {
            "@id": "orgs:1000",
            prefLabel: "Stephen A. Schwarzman Building",
          },
        ],
        physRequestable: true,
        physicalLocation: ["*DM (Esprit des Journaux, françois et etrangers)"],
        recapCustomerCode: ["NA"],
        requestable: [true],
        shelfMark: [
          "*DM (Esprit des Journaux, françois et etrangers) no. 12 (1794)",
        ],
        specRequestable: false,
        status: [
          {
            "@id": "status:a",
            prefLabel: "Available",
          },
        ],
        uri: "i17145921",
        volumeRange: [
          {
            gte: 12,
            lte: 12,
          },
        ],
        idNyplSourceId: {
          "@type": "SierraNypl",
          "@value": "17145921",
        },
      },
      {
        "@id": "res:i17145909",
        "@type": ["bf:Item"],
        accessMessage: [
          {
            "@id": "accessMessage:u",
            prefLabel: "Supervised use",
          },
        ],
        catalogItemType: [
          {
            "@id": "catalogItemType:33",
            prefLabel: "google project, serial",
          },
        ],
        dateRange: [
          {
            gte: "1793",
            lte: "1793",
          },
        ],
        eddRequestable: true,
        enumerationChronology: ["no. 12 (1793)"],
        formatLiteral: ["Text"],
        holdingLocation: [
          {
            "@id": "loc:rc2ma",
            prefLabel: "Offsite",
          },
        ],
        idBarcode: ["33433081744413"],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value":
              "*DM (Esprit des Journaux, françois et etrangers) no. 12 (1793)",
          },
          {
            "@type": "bf:Barcode",
            "@value": "33433081744413",
          },
        ],
        owner: [
          {
            "@id": "orgs:1000",
            prefLabel: "Stephen A. Schwarzman Building",
          },
        ],
        physRequestable: true,
        physicalLocation: ["*DM (Esprit des Journaux, françois et etrangers)"],
        recapCustomerCode: ["NA"],
        requestable: [true],
        shelfMark: [
          "*DM (Esprit des Journaux, françois et etrangers) no. 12 (1793)",
        ],
        specRequestable: false,
        status: [
          {
            "@id": "status:a",
            prefLabel: "Available",
          },
        ],
        uri: "i17145909",
        volumeRange: [
          {
            gte: 12,
            lte: 12,
          },
        ],
        idNyplSourceId: {
          "@type": "SierraNypl",
          "@value": "17145909",
        },
      },
      {
        "@id": "res:i17145897",
        "@type": ["bf:Item"],
        accessMessage: [
          {
            "@id": "accessMessage:u",
            prefLabel: "Supervised use",
          },
        ],
        catalogItemType: [
          {
            "@id": "catalogItemType:33",
            prefLabel: "google project, serial",
          },
        ],
        dateRange: [
          {
            gte: "1792",
            lte: "1792",
          },
        ],
        eddRequestable: true,
        enumerationChronology: ["no. 12 (1792)"],
        formatLiteral: ["Text"],
        holdingLocation: [
          {
            "@id": "loc:rc2ma",
            prefLabel: "Offsite",
          },
        ],
        idBarcode: ["33433081743787"],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value":
              "*DM (Esprit des Journaux, françois et etrangers) no. 12 (1792)",
          },
          {
            "@type": "bf:Barcode",
            "@value": "33433081743787",
          },
        ],
        owner: [
          {
            "@id": "orgs:1000",
            prefLabel: "Stephen A. Schwarzman Building",
          },
        ],
        physRequestable: true,
        physicalLocation: ["*DM (Esprit des Journaux, françois et etrangers)"],
        recapCustomerCode: ["NA"],
        requestable: [true],
        shelfMark: [
          "*DM (Esprit des Journaux, françois et etrangers) no. 12 (1792)",
        ],
        specRequestable: false,
        status: [
          {
            "@id": "status:a",
            prefLabel: "Available",
          },
        ],
        uri: "i17145897",
        volumeRange: [
          {
            gte: 12,
            lte: 12,
          },
        ],
        idNyplSourceId: {
          "@type": "SierraNypl",
          "@value": "17145897",
        },
      },
      {
        "@id": "res:i17145885",
        "@type": ["bf:Item"],
        accessMessage: [
          {
            "@id": "accessMessage:u",
            prefLabel: "Supervised use",
          },
        ],
        catalogItemType: [
          {
            "@id": "catalogItemType:33",
            prefLabel: "google project, serial",
          },
        ],
        dateRange: [
          {
            gte: "1791",
            lte: "1791",
          },
        ],
        eddRequestable: true,
        enumerationChronology: ["no. 12 (1791)"],
        formatLiteral: ["Text"],
        holdingLocation: [
          {
            "@id": "loc:rc2ma",
            prefLabel: "Offsite",
          },
        ],
        idBarcode: ["33433081743902"],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value":
              "*DM (Esprit des Journaux, françois et etrangers) no. 12 (1791)",
          },
          {
            "@type": "bf:Barcode",
            "@value": "33433081743902",
          },
        ],
        owner: [
          {
            "@id": "orgs:1000",
            prefLabel: "Stephen A. Schwarzman Building",
          },
        ],
        physRequestable: true,
        physicalLocation: ["*DM (Esprit des Journaux, françois et etrangers)"],
        recapCustomerCode: ["NA"],
        requestable: [true],
        shelfMark: [
          "*DM (Esprit des Journaux, françois et etrangers) no. 12 (1791)",
        ],
        specRequestable: false,
        status: [
          {
            "@id": "status:a",
            prefLabel: "Available",
          },
        ],
        uri: "i17145885",
        volumeRange: [
          {
            gte: 12,
            lte: 12,
          },
        ],
        idNyplSourceId: {
          "@type": "SierraNypl",
          "@value": "17145885",
        },
      },
      {
        "@id": "res:i17145873",
        "@type": ["bf:Item"],
        accessMessage: [
          {
            "@id": "accessMessage:u",
            prefLabel: "Supervised use",
          },
        ],
        catalogItemType: [
          {
            "@id": "catalogItemType:33",
            prefLabel: "google project, serial",
          },
        ],
        dateRange: [
          {
            gte: "1790",
            lte: "1790",
          },
        ],
        eddRequestable: true,
        enumerationChronology: ["no. 12 (1790)"],
        formatLiteral: ["Text"],
        holdingLocation: [
          {
            "@id": "loc:rc2ma",
            prefLabel: "Offsite",
          },
        ],
        idBarcode: ["33433081744025"],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value":
              "*DM (Esprit des Journaux, françois et etrangers) no. 12 (1790)",
          },
          {
            "@type": "bf:Barcode",
            "@value": "33433081744025",
          },
        ],
        owner: [
          {
            "@id": "orgs:1000",
            prefLabel: "Stephen A. Schwarzman Building",
          },
        ],
        physRequestable: true,
        physicalLocation: ["*DM (Esprit des Journaux, françois et etrangers)"],
        recapCustomerCode: ["NA"],
        requestable: [true],
        shelfMark: [
          "*DM (Esprit des Journaux, françois et etrangers) no. 12 (1790)",
        ],
        specRequestable: false,
        status: [
          {
            "@id": "status:a",
            prefLabel: "Available",
          },
        ],
        uri: "i17145873",
        volumeRange: [
          {
            gte: 12,
            lte: 12,
          },
        ],
        idNyplSourceId: {
          "@type": "SierraNypl",
          "@value": "17145873",
        },
      },
      {
        "@id": "res:i17145861",
        "@type": ["bf:Item"],
        accessMessage: [
          {
            "@id": "accessMessage:u",
            prefLabel: "Supervised use",
          },
        ],
        catalogItemType: [
          {
            "@id": "catalogItemType:33",
            prefLabel: "google project, serial",
          },
        ],
        dateRange: [
          {
            gte: "1789",
            lte: "1789",
          },
        ],
        eddRequestable: true,
        enumerationChronology: ["no. 12 (1789)"],
        formatLiteral: ["Text"],
        holdingLocation: [
          {
            "@id": "loc:rc2ma",
            prefLabel: "Offsite",
          },
        ],
        idBarcode: ["33433081744140"],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value":
              "*DM (Esprit des Journaux, françois et etrangers) no. 12 (1789)",
          },
          {
            "@type": "bf:Barcode",
            "@value": "33433081744140",
          },
        ],
        owner: [
          {
            "@id": "orgs:1000",
            prefLabel: "Stephen A. Schwarzman Building",
          },
        ],
        physRequestable: true,
        physicalLocation: ["*DM (Esprit des Journaux, françois et etrangers)"],
        recapCustomerCode: ["NA"],
        requestable: [true],
        shelfMark: [
          "*DM (Esprit des Journaux, françois et etrangers) no. 12 (1789)",
        ],
        specRequestable: false,
        status: [
          {
            "@id": "status:a",
            prefLabel: "Available",
          },
        ],
        uri: "i17145861",
        volumeRange: [
          {
            gte: 12,
            lte: 12,
          },
        ],
        idNyplSourceId: {
          "@type": "SierraNypl",
          "@value": "17145861",
        },
      },
      {
        "@id": "res:i17145849",
        "@type": ["bf:Item"],
        accessMessage: [
          {
            "@id": "accessMessage:u",
            prefLabel: "Supervised use",
          },
        ],
        catalogItemType: [
          {
            "@id": "catalogItemType:33",
            prefLabel: "google project, serial",
          },
        ],
        dateRange: [
          {
            gte: "1788",
            lte: "1788",
          },
        ],
        eddRequestable: true,
        enumerationChronology: ["no. 12 (1788)"],
        formatLiteral: ["Text"],
        holdingLocation: [
          {
            "@id": "loc:rc2ma",
            prefLabel: "Offsite",
          },
        ],
        idBarcode: ["33433081746012"],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value":
              "*DM (Esprit des Journaux, françois et etrangers) no. 12 (1788)",
          },
          {
            "@type": "bf:Barcode",
            "@value": "33433081746012",
          },
        ],
        owner: [
          {
            "@id": "orgs:1000",
            prefLabel: "Stephen A. Schwarzman Building",
          },
        ],
        physRequestable: true,
        physicalLocation: ["*DM (Esprit des Journaux, françois et etrangers)"],
        recapCustomerCode: ["NA"],
        requestable: [true],
        shelfMark: [
          "*DM (Esprit des Journaux, françois et etrangers) no. 12 (1788)",
        ],
        specRequestable: false,
        status: [
          {
            "@id": "status:a",
            prefLabel: "Available",
          },
        ],
        uri: "i17145849",
        volumeRange: [
          {
            gte: 12,
            lte: 12,
          },
        ],
        idNyplSourceId: {
          "@type": "SierraNypl",
          "@value": "17145849",
        },
      },
      {
        "@id": "res:i17145837",
        "@type": ["bf:Item"],
        accessMessage: [
          {
            "@id": "accessMessage:u",
            prefLabel: "Supervised use",
          },
        ],
        catalogItemType: [
          {
            "@id": "catalogItemType:33",
            prefLabel: "google project, serial",
          },
        ],
        dateRange: [
          {
            gte: "1787",
            lte: "1787",
          },
        ],
        eddRequestable: true,
        enumerationChronology: ["no. 12 (1787)"],
        formatLiteral: ["Text"],
        holdingLocation: [
          {
            "@id": "loc:rc2ma",
            prefLabel: "Offsite",
          },
        ],
        idBarcode: ["33433081746137"],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value":
              "*DM (Esprit des Journaux, françois et etrangers) no. 12 (1787)",
          },
          {
            "@type": "bf:Barcode",
            "@value": "33433081746137",
          },
        ],
        owner: [
          {
            "@id": "orgs:1000",
            prefLabel: "Stephen A. Schwarzman Building",
          },
        ],
        physRequestable: true,
        physicalLocation: ["*DM (Esprit des Journaux, françois et etrangers)"],
        recapCustomerCode: ["NA"],
        requestable: [true],
        shelfMark: [
          "*DM (Esprit des Journaux, françois et etrangers) no. 12 (1787)",
        ],
        specRequestable: false,
        status: [
          {
            "@id": "status:a",
            prefLabel: "Available",
          },
        ],
        uri: "i17145837",
        volumeRange: [
          {
            gte: 12,
            lte: 12,
          },
        ],
        idNyplSourceId: {
          "@type": "SierraNypl",
          "@value": "17145837",
        },
      },
      {
        "@id": "res:i17145831",
        "@type": ["bf:Item"],
        accessMessage: [
          {
            "@id": "accessMessage:u",
            prefLabel: "Supervised use",
          },
        ],
        catalogItemType: [
          {
            "@id": "catalogItemType:33",
            prefLabel: "google project, serial",
          },
        ],
        dateRange: [
          {
            gte: "1786",
            lte: "1786",
          },
        ],
        eddRequestable: true,
        enumerationChronology: ["no. 12 (1786)"],
        formatLiteral: ["Text"],
        holdingLocation: [
          {
            "@id": "loc:rc2ma",
            prefLabel: "Offsite",
          },
        ],
        idBarcode: ["33433081746194"],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value":
              "*DM (Esprit des Journaux, françois et etrangers) no. 12 (1786)",
          },
          {
            "@type": "bf:Barcode",
            "@value": "33433081746194",
          },
        ],
        owner: [
          {
            "@id": "orgs:1000",
            prefLabel: "Stephen A. Schwarzman Building",
          },
        ],
        physRequestable: true,
        physicalLocation: ["*DM (Esprit des Journaux, françois et etrangers)"],
        recapCustomerCode: ["NA"],
        requestable: [true],
        shelfMark: [
          "*DM (Esprit des Journaux, françois et etrangers) no. 12 (1786)",
        ],
        specRequestable: false,
        status: [
          {
            "@id": "status:a",
            prefLabel: "Available",
          },
        ],
        uri: "i17145831",
        volumeRange: [
          {
            gte: 12,
            lte: 12,
          },
        ],
        idNyplSourceId: {
          "@type": "SierraNypl",
          "@value": "17145831",
        },
      },
      {
        "@id": "res:i17145805",
        "@type": ["bf:Item"],
        accessMessage: [
          {
            "@id": "accessMessage:u",
            prefLabel: "Supervised use",
          },
        ],
        catalogItemType: [
          {
            "@id": "catalogItemType:33",
            prefLabel: "google project, serial",
          },
        ],
        dateRange: [
          {
            gte: "1785",
            lte: "1785",
          },
        ],
        eddRequestable: true,
        enumerationChronology: ["no. 12 (1785)"],
        formatLiteral: ["Text"],
        holdingLocation: [
          {
            "@id": "loc:rc2ma",
            prefLabel: "Offsite",
          },
        ],
        idBarcode: ["33433081745956"],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value":
              "*DM (Esprit des Journaux, françois et etrangers) no. 12 (1785)",
          },
          {
            "@type": "bf:Barcode",
            "@value": "33433081745956",
          },
        ],
        owner: [
          {
            "@id": "orgs:1000",
            prefLabel: "Stephen A. Schwarzman Building",
          },
        ],
        physRequestable: true,
        physicalLocation: ["*DM (Esprit des Journaux, françois et etrangers)"],
        recapCustomerCode: ["NA"],
        requestable: [true],
        shelfMark: [
          "*DM (Esprit des Journaux, françois et etrangers) no. 12 (1785)",
        ],
        specRequestable: false,
        status: [
          {
            "@id": "status:a",
            prefLabel: "Available",
          },
        ],
        uri: "i17145805",
        volumeRange: [
          {
            gte: 12,
            lte: 12,
          },
        ],
        idNyplSourceId: {
          "@type": "SierraNypl",
          "@value": "17145805",
        },
      },
      {
        "@id": "res:i17145801",
        "@type": ["bf:Item"],
        accessMessage: [
          {
            "@id": "accessMessage:u",
            prefLabel: "Supervised use",
          },
        ],
        catalogItemType: [
          {
            "@id": "catalogItemType:33",
            prefLabel: "google project, serial",
          },
        ],
        dateRange: [
          {
            gte: "1784",
            lte: "1784",
          },
        ],
        eddRequestable: true,
        enumerationChronology: ["no. 12 (1784)"],
        formatLiteral: ["Text"],
        holdingLocation: [
          {
            "@id": "loc:rc2ma",
            prefLabel: "Offsite",
          },
        ],
        idBarcode: ["33433081745998"],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value":
              "*DM (Esprit des Journaux, françois et etrangers) no. 12 (1784)",
          },
          {
            "@type": "bf:Barcode",
            "@value": "33433081745998",
          },
        ],
        owner: [
          {
            "@id": "orgs:1000",
            prefLabel: "Stephen A. Schwarzman Building",
          },
        ],
        physRequestable: true,
        physicalLocation: ["*DM (Esprit des Journaux, françois et etrangers)"],
        recapCustomerCode: ["NA"],
        requestable: [true],
        shelfMark: [
          "*DM (Esprit des Journaux, françois et etrangers) no. 12 (1784)",
        ],
        specRequestable: false,
        status: [
          {
            "@id": "status:a",
            prefLabel: "Available",
          },
        ],
        uri: "i17145801",
        volumeRange: [
          {
            gte: 12,
            lte: 12,
          },
        ],
        idNyplSourceId: {
          "@type": "SierraNypl",
          "@value": "17145801",
        },
      },
      {
        "@id": "res:i17145789",
        "@type": ["bf:Item"],
        accessMessage: [
          {
            "@id": "accessMessage:u",
            prefLabel: "Supervised use",
          },
        ],
        catalogItemType: [
          {
            "@id": "catalogItemType:33",
            prefLabel: "google project, serial",
          },
        ],
        dateRange: [
          {
            gte: "1783",
            lte: "1783",
          },
        ],
        eddRequestable: true,
        enumerationChronology: ["no. 12 (1783)"],
        formatLiteral: ["Text"],
        holdingLocation: [
          {
            "@id": "loc:rc2ma",
            prefLabel: "Offsite",
          },
        ],
        idBarcode: ["33433081745618"],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value":
              "*DM (Esprit des Journaux, françois et etrangers) no. 12 (1783)",
          },
          {
            "@type": "bf:Barcode",
            "@value": "33433081745618",
          },
        ],
        owner: [
          {
            "@id": "orgs:1000",
            prefLabel: "Stephen A. Schwarzman Building",
          },
        ],
        physRequestable: true,
        physicalLocation: ["*DM (Esprit des Journaux, françois et etrangers)"],
        recapCustomerCode: ["NA"],
        requestable: [true],
        shelfMark: [
          "*DM (Esprit des Journaux, françois et etrangers) no. 12 (1783)",
        ],
        specRequestable: false,
        status: [
          {
            "@id": "status:a",
            prefLabel: "Available",
          },
        ],
        uri: "i17145789",
        volumeRange: [
          {
            gte: 12,
            lte: 12,
          },
        ],
        idNyplSourceId: {
          "@type": "SierraNypl",
          "@value": "17145789",
        },
      },
    ],
    language: [
      {
        "@id": "lang:fre",
        prefLabel: "French",
      },
    ],
    format: [
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
        prefLabel: "Published at Bruxelles, 1773-1775; at Liége, 1776-1781.",
      },
      {
        noteType: "Note",
        "@type": "bf:Note",
        prefLabel: "Description based on: 19th année, t. 10 (Oct. 1790).",
      },
    ],
    numCheckinCardItems: 0,
    numElectronicResources: 368,
    numItemDatesParsed: 370,
    numItemVolumesParsed: 365,
    numItemsMatched: 370,
    numItemsTotal: 370,
    nyplSource: ["sierra-nypl"],
    placeOfPublication: ["Paris"],
    publicationStatement: ["Paris : Valade"],
    publisherLiteral: ["Valade"],
    shelfMark: ["*DM (Esprit des Journaux, françois et etrangers)"],
    subjectLiteral: ["Periodicals."],
    title: ["L'Esprit des journaux, françois et étrangers"],
    titleAlt: ["Esprit des journaux"],
    titleDisplay: [
      "L'Esprit des journaux, françois et étrangers / par une Société de gens-de-lettres.",
    ],
    type: ["nypl:Item"],
    updatedAt: 1711593229661,
    uri: "b15109087",
    suppressed: false,
    hasItemVolumes: true,
    hasItemDates: true,
    subjectHeadings: null,
  },
}

export const bibWithSubjectHeadings = {
  resource: {
    "@context":
      "http://discovery-api-qa.nypl.org/api/v0.1/discovery/context_all.jsonld",
    "@type": ["nypl:Item", "nypl:Resource"],
    "@id": "res:b16145054",
    buildingLocationIds: ["rc"],
    carrierType: [
      {
        "@id": "carriertypes:nc",
        prefLabel: "volume",
      },
    ],
    createdString: [2005],
    createdYear: 2005,
    creatorLiteral: ["Cortanze, Gérard de."],
    creatorLiteralNormalized: ["Gérard Cortanze", "Gérard de Cortanze"],
    creatorLiteralWithoutDates: ["Cortanze, Gérard de."],
    dateStartYear: 2005,
    dateString: [2005],
    dimensions: ["19 cm."],
    electronicResources: [],
    extent: ["193 p. : ill. ;"],
    idIsbn: [2070775178],
    idLccn: [2005483039],
    idOclc: [61868265],
    identifier: [
      {
        "@type": "bf:ShelfMark",
        "@value": "JFC 06-438",
      },
      {
        "@type": "nypl:Bnumber",
        "@value": 16145054,
      },
      {
        "@type": "bf:Isbn",
        "@value": 2070775178,
      },
      {
        "@type": "nypl:Oclc",
        "@value": 61868265,
      },
      {
        "@type": "bf:Lccn",
        "@value": 2005483039,
      },
      {
        "@type": "bf:Identifier",
        "@value": "(WaOLN)M040000221",
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
        values: [
          {
            value: "loc:rc2ma",
            count: 1,
            label: "Offsite",
          },
        ],
      },
      {
        "@type": "nypl:Aggregation",
        "@id": "res:format",
        id: "format",
        field: "format",
        values: [
          {
            value: "Text",
            count: 1,
            label: "Text",
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
            value: "status:a",
            count: 1,
            label: "Available",
          },
        ],
      },
    ],
    items: [
      {
        "@id": "res:i15550040",
        "@type": ["bf:Item"],
        accessMessage: [
          {
            "@id": "accessMessage:2",
            prefLabel: "Request in advance",
          },
        ],
        catalogItemType: [
          {
            "@id": "catalogItemType:55",
            prefLabel: "book, limited circ, MaRLI",
          },
        ],
        eddFulfillment: {
          "@id": "fulfillment:recap-edd",
        },
        eddRequestable: true,
        formatLiteral: ["Text"],
        holdingLocation: [
          {
            "@id": "loc:rc2ma",
            prefLabel: "Offsite",
          },
        ],
        idBarcode: ["33433073236758"],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value": "JFC 06-438",
          },
          {
            "@type": "bf:Barcode",
            "@value": "33433073236758",
          },
        ],
        owner: [
          {
            "@id": "orgs:1000",
            prefLabel: "Stephen A. Schwarzman Building",
          },
        ],
        physFulfillment: {
          "@id": "fulfillment:recap-offsite",
        },
        physRequestable: true,
        physicalLocation: ["JFC 06-438"],
        recapCustomerCode: ["NA"],
        requestable: [true],
        shelfMark: ["JFC 06-438"],
        specRequestable: false,
        status: [
          {
            "@id": "status:a",
            prefLabel: "Available",
          },
        ],
        uri: "i15550040",
        idNyplSourceId: {
          "@type": "SierraNypl",
          "@value": "15550040",
        },
      },
    ],
    language: [
      {
        "@id": "lang:fre",
        prefLabel: "French",
      },
    ],
    lccClassification: ["PQ2663.O7223 Z46 2005"],
    format: [
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
    numCheckinCardItems: 0,
    numElectronicResources: 0,
    numItemDatesParsed: 0,
    numItemVolumesParsed: 0,
    numItemsMatched: 1,
    numItemsTotal: 1,
    nyplSource: ["sierra-nypl"],
    placeOfPublication: ["[Paris, France]"],
    popularity: 1,
    publicationStatement: ["[Paris, France] : Gallimard, c2005."],
    publisherLiteral: ["Gallimard"],
    seriesStatement: ["Haute enfance"],
    shelfMark: ["JFC 06-438"],
    subjectLiteral: [
      "Cortanze, Gérard de -- Childhood and youth.",
      "Authors, French -- 20th century -- Biography.",
      "Autobiographical Narrative",
    ],
    title: ["Spaghetti!"],
    titleDisplay: ["Spaghetti! / Gérard de Cortanze."],
    type: ["nypl:Item"],
    uniformTitle: ["Haute enfance (Gallimard (Firm))"],
    updatedAt: 1723133852918,
    uri: "b16145054",
    suppressed: false,
    hasItemVolumes: false,
    hasItemDates: false,
    subjectHeadings: [
      {
        label: "Cortanze, Gérard de -- Childhood and youth",
        uuid: "74746d11-638b-4cfb-a72a-9a2bd296e6fd",
        bib_count: 1,
        desc_count: 0,
        parent: {
          label: "Cortanze, Gérard de",
          uuid: "cf347108-e1f2-4c0f-808a-ac4ace2f0765",
          bib_count: 5,
          desc_count: 4,
        },
      },
      {
        label: "Authors, French -- 20th century -- Biography",
        uuid: "9391bc26-e44c-44ac-98cc-e3800da51926",
        bib_count: 5319,
        desc_count: 22,
        parent: {
          label: "Authors, French -- 20th century",
          uuid: "e43674a7-5f02-44f1-95cd-dbcc776331b7",
          bib_count: 8405,
          desc_count: 197,
          parent: {
            label: "Authors, French",
            uuid: "5fd065df-b4e9-48cb-b13c-ea15f36b96b4",
            bib_count: 14275,
            desc_count: 1012,
          },
        },
      },
      {
        label: "Autobiographical Narrative",
        uuid: "3a779ed6-8a07-4d27-80ef-e0c2b10fe78e",
        bib_count: 505,
        desc_count: 343,
      },
    ],
  },
  annotatedMarc: {
    id: "16145054",
    nyplSource: "sierra-nypl",
    fields: [
      {
        label: "Author",
        values: [
          {
            content: "Cortanze, Gérard de.",
            source: {
              fieldTag: "a",
              marcTag: "100",
              ind1: "1",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "Cortanze, Gérard de.",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Title",
        values: [
          {
            content: "Spaghetti! / Gérard de Cortanze.",
            source: {
              fieldTag: "t",
              marcTag: "245",
              ind1: "1",
              ind2: "0",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "Spaghetti! /",
                },
                {
                  tag: "c",
                  content: "Gérard de Cortanze.",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Imprint",
        values: [
          {
            content: "[Paris, France] : Gallimard, c2005.",
            source: {
              fieldTag: "p",
              marcTag: "260",
              ind1: " ",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "[Paris, France] :",
                },
                {
                  tag: "b",
                  content: "Gallimard,",
                },
                {
                  tag: "c",
                  content: "c2005.",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Description",
        values: [
          {
            content: "193 p. : ill. ; 19 cm.",
            source: {
              fieldTag: "r",
              marcTag: "300",
              ind1: " ",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "193 p. :",
                },
                {
                  tag: "b",
                  content: "ill. ;",
                },
                {
                  tag: "c",
                  content: "19 cm.",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Series",
        values: [
          {
            content: "Haute enfance",
            source: {
              fieldTag: "s",
              marcTag: "490",
              ind1: "1",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "Haute enfance",
                },
              ],
            },
          },
          {
            content: "Haute enfance (Gallimard (Firm))",
            source: {
              fieldTag: "s",
              marcTag: "830",
              ind1: " ",
              ind2: "0",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "Haute enfance (Gallimard (Firm))",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Indexed Term",
        values: [
          {
            content: "Autobiographical Narrative",
            source: {
              fieldTag: "d",
              marcTag: "653",
              ind1: " ",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "Autobiographical Narrative",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Subject",
        values: [
          {
            content: "Cortanze, Gérard de -- Childhood and youth.",
            source: {
              fieldTag: "d",
              marcTag: "600",
              ind1: "1",
              ind2: "0",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "Cortanze, Gérard de",
                },
                {
                  tag: "x",
                  content: "Childhood and youth.",
                },
              ],
            },
          },
          {
            content: "Authors, French -- 20th century -- Biography.",
            source: {
              fieldTag: "d",
              marcTag: "650",
              ind1: " ",
              ind2: "0",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "Authors, French",
                },
                {
                  tag: "y",
                  content: "20th century",
                },
                {
                  tag: "v",
                  content: "Biography.",
                },
              ],
            },
          },
        ],
      },
      {
        label: "LCCN",
        values: [
          {
            content: "2005483039",
            source: {
              fieldTag: "l",
              marcTag: "010",
              ind1: " ",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "2005483039",
                },
              ],
            },
          },
        ],
      },
      {
        label: "ISBN",
        values: [
          {
            content: "2070775178",
            source: {
              fieldTag: "i",
              marcTag: "020",
              ind1: " ",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "a",
                  content: "2070775178",
                },
              ],
            },
          },
        ],
      },
      {
        label: "Research Call Number",
        values: [
          {
            content: "JFC 06-438",
            source: {
              fieldTag: "q",
              marcTag: "852",
              ind1: "8",
              ind2: " ",
              content: null,
              subfields: [
                {
                  tag: "h",
                  content: "JFC 06-438",
                },
              ],
            },
          },
        ],
      },
    ],
  },
}

export const bibWithSingleAeonItem = {
  resource: {
    "@context":
      "http://discovery-api-qa.nypl.org/api/v0.1/discovery/context_all.jsonld",
    "@type": ["nypl:Item", "nypl:Resource"],
    "@id": "res:b21086080",
    buildingLocationIds: ["rc"],
    carrierType: [
      {
        "@id": "carriertypes:nc",
        prefLabel: "volume",
      },
    ],
    contributorLiteral: ["Street & Smith, publisher."],
    createdString: [1939],
    createdYear: 1939,
    dateEndString: [1941],
    dateEndYear: 1941,
    dateStartYear: 1939,
    dateString: [1939],
    dimensions: ["24 cm"],
    extent: ["v. : ill. ;"],
    genreForm: ["Fantasy fiction.", "Horror fiction.", "Periodicals."],
    idOclc: [20989396],
    identifier: [
      {
        "@type": "bf:ShelfMark",
        "@value": "ReCAP 16-24063",
      },
      {
        "@type": "nypl:Bnumber",
        "@value": 21086080,
      },
      {
        "@type": "nypl:Oclc",
        "@value": 20989396,
      },
      {
        "@type": "bf:Identifier",
        "@value": "(OCoLC)20989396",
      },
    ],
    issuance: [
      {
        "@id": "urn:biblevel:s",
        prefLabel: "serial",
      },
    ],
    itemAggregations: [
      {
        "@type": "nypl:Aggregation",
        "@id": "res:location",
        id: "location",
        field: "location",
        values: [
          {
            value: "loc:rcmr2",
            count: 1,
            label: "Offsite",
          },
        ],
      },
      {
        "@type": "nypl:Aggregation",
        "@id": "res:format",
        id: "format",
        field: "format",
        values: [
          {
            value: "Text",
            count: 1,
            label: "Text",
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
            value: "status:a",
            count: 1,
            label: "Available",
          },
        ],
      },
    ],
    items: [
      {
        "@id": "res:i34439033",
        "@type": ["bf:Item"],
        accessMessage: [
          {
            "@id": "accessMessage:1",
            prefLabel: "Use in library",
          },
        ],
        aeonUrl: [
          "https://specialcollections.nypl.org/aeon/Aeon.dll?Action=10&CallNumber=ReCAP+16-24063+&Date=1939&Form=30&Genre=serial&ItemInfo1=Use+in+library&ItemInfo3=https%3A%2F%2Fcatalog.nypl.org%2Frecord%3Db21086080&ItemISxN=i344390330&ItemNumber=33433117357388&ItemPlace=New+York&ItemPublisher=Street+%26+Smith%2C+1939-1941.&ItemVolume=Avon+science+fiction+-+Wonder+stories&Location=ReCAP&ReferenceNumber=b210860807&Site=SASRB&SubLocation=rcmr2&Title=Street+%26+Smith%27s+Unknown.",
        ],
        catalogItemType: [
          {
            "@id": "catalogItemType:3",
            prefLabel: "serial",
          },
        ],
        eddRequestable: false,
        enumerationChronology: ["Avon science fiction - Wonder stories"],
        formatLiteral: ["Text"],
        holdingLocation: [
          {
            "@id": "loc:rcmr2",
            prefLabel: "Offsite",
            endpoint: null,
          },
        ],
        idBarcode: [33433117357388],
        identifier: [
          {
            "@type": "bf:ShelfMark",
            "@value": "ReCAP 16-24063  Avon science fiction - Wonder stories",
          },
          {
            "@type": "bf:Barcode",
            "@value": 33433117357388,
          },
        ],
        owner: [
          {
            "@id": "orgs:1000",
            prefLabel: "Stephen A. Schwarzman Building",
          },
        ],
        physRequestable: false,
        physicalLocation: ["ReCAP 16-24063 "],
        recapCustomerCode: ["NQ"],
        requestable: [true],
        shelfMark: ["ReCAP 16-24063  Avon science fiction - Wonder stories"],
        specRequestable: true,
        status: [
          {
            "@id": "status:a",
            prefLabel: "Available",
          },
        ],
        uri: "i34439033",
        idNyplSourceId: {
          "@type": "SierraNypl",
          "@value": 34439033,
        },
      },
    ],
    language: [
      {
        "@id": "lang:eng",
        prefLabel: "English",
      },
    ],
    lccClassification: ["PZ1.Z9 U5"],
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
        noteType: "Source of Description",
        "@type": "bf:Note",
        prefLabel: "Description based on: v. 4 n. 4 (Dec. 1940).",
      },
      {
        noteType: "Source of Description",
        "@type": "bf:Note",
        prefLabel: "Latest issue consulted: v. 5 n. 2 (Aug. 1941).",
      },
    ],
    numCheckinCardItems: 0,
    numElectronicResources: 0,
    numItemDatesParsed: 0,
    numItemVolumesParsed: 0,
    numItemsMatched: 1,
    numItemsTotal: 1,
    nyplSource: ["sierra-nypl"],
    placeOfPublication: ["New York"],
    publicationStatement: ["New York : Street & Smith, 1939-1941."],
    publisherLiteral: ["Street & Smith"],
    serialPublicationDates: [
      "Began with Mar. 1939; ceased with Aug. 1941 issue. Cf. Pulp magazine quick reference guide.",
    ],
    shelfMark: ["ReCAP 16-24063"],
    subjectLiteral: [
      "Fantasy fiction -- Periodicals.",
      "Horror tales -- Periodicals.",
    ],
    title: ["Street & Smith's Unknown."],
    titleAlt: ["Unknown"],
    titleDisplay: ["Street & Smith's Unknown."],
    type: ["nypl:Item"],
    updatedAt: 1712871163628,
    uri: "b21086080",
    updatedAtDate: "2024-04-11T21:32:43.628Z",
    hasItemVolumes: false,
    hasItemDates: false,
    electronicResources: [],
    subjectHeadings: null,
  },
}
