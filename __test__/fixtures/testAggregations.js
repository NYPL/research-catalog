export const normalAggs = [
  {
    "@type": "nypl:Aggregation",
    "@id": "res:location",
    id: "location",
    field: "location",
    values: [
      {
        value: "ma",
        count: 572,
        label: "Stephen A. Schwarzman Building",
      },
      {
        value: "rc",
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
        value: "E-BOOK",
        count: 109,
        label: "E-BOOK",
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
        value: "pa",
        count: 8,
        label: "The New York Public Library for the Performing Arts",
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
