export const normalAggs = [
  {
    "@type": "nypl:Aggregation",
    "@id": "res:location",
    id: "location",
    field: "location",
    values: [
      {
        value: "loc:mal82",
        count: 572,
        label: "Schwarzman Building - Main Reading Room 315",
      },
      {
        value: "loc:makk3",
        count: 133,
        label: "Schwarzman Building - Dewitt Wallace Reference Desk Room 108",
      },
      {
        value: "loc:rc2ma",
        count: 66,
        label: "Offsite",
      },
      {
        value: "loc:rcma2",
        count: 66,
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
        count: 704,
        label: "Text",
      },
      {
        value: "AUG. 23, 2021-CURRENT",
        count: 109,
        label: "AUG. 23, 2021-CURRENT",
      },
      {
        value: "FEB. 15/22, 2021 - AUG. 16, 2021",
        count: 24,
        label: "FEB. 15/22, 2021 - AUG. 16, 2021",
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
        count: 826,
        label: "Available",
      },
      {
        value: "status:na",
        count: 6,
        label: "Not available",
      },
      {
        value: "status:co",
        count: 4,
        label: "Loaned",
      },
      {
        value: "status:oh",
        count: 1,
        label: "On Holdshelf",
      },
    ],
  },
]

export const aggsWithRepeatedValues = [
  {
    "@type": "nypl:Aggregation",
    "@id": "res:location",
    id: "location",
    field: "location",
    values: [
      {
        value: "loc:mym32",
        count: 8,
        label: "Performing Arts Research Collections - Music",
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
        count: 4,
        label: "Available",
      },
      {
        value: "status:a",
        count: 4,
        label: "Available ",
      },
    ],
  },
]

export const aggsWithMissingProperties = [
  {
    "@id": "res:location",
    "@type": "nypl:Aggregation",
    field: "location",
    id: "location",
    values: [
      {
        count: 4,
        value: "loc:maj03",
        label: "SASB M1 - General Research - Room 315",
      },
      {
        count: 12,
        label: "Offsite",
        value: "loc:rc2ma",
      },
      {
        count: 12,
        label: "Off site",
        value: "loc:rc2ma",
      },
      {
        count: 12,
        label: "Off-site",
        value: "loc:rc2ma",
      },
      {
        count: 12,
        label: "off-site",
        value: "loc:rc2ma",
      },
      {
        count: 12,
        label: "off site",
        value: "loc:rc2ma",
      },
      {
        count: 2,
        value: "offsite",
        label: "Offsite",
      },
      {
        count: 2,
        value: "blank",
        label: "",
      },
      {
        count: 2,
        value: "blaaaank",
      },
    ],
  },
  {
    "@id": "res:format",
    "@type": "nypl:Aggregation",
    field: "format",
    id: "format",
    values: [
      {
        count: 12,
        label: "Text",
        value: "Text",
      },
    ],
  },
  {
    "@id": "res:status",
    "@type": "nypl:Aggregation",
    field: "status",
    id: "status",
    values: [
      {
        count: 12,
        label: "Available",
        value: "status:a",
      },
      {
        count: 12,
        label: "Not Available (ReCAP",
        value: "status:na",
      },
    ],
  },
]
