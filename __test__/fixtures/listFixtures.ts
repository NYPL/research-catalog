import type { List } from "../../src/types/listTypes"

export const listsResponse = [
  {
    id: "12345000-aabb-bb",
    patronId: "12345",
    records: [],
    createdDate: "2026-04-15T15:26:18.209896",
    modifiedDate: "2026-04-15T15:26:18.209897",
    listName: "First list",
    description: null,
  },
  {
    id: "1234-cc-vv",
    patronId: "12345",
    records: [
      {
        uri: "b12404033",
        addedToListDate: "2026-04-21T16:23:22.319202",
        description: "",
        sortIndex: 0,
      },
    ],
    createdDate: "2026-04-21T16:23:22.326377",
    modifiedDate: "2026-04-21T16:23:22.326378",
    listName: "Spaghetti westerns",
    description: "all about spaghetti",
  },
]

export const processedLists: List[] = [
  {
    id: "12345000-aabb-bb",
    patronId: "12345",
    records: [],
    recordCount: 0,
    createdDate: "4/15/2026",
    modifiedDate: "4/15/2026",
    listName: "First list",
    description: null,
    isDefaultList: true,
  },
  {
    id: "1234-cc-vv",
    patronId: "12345",
    recordCount: 1,
    isDefaultList: false,
    records: [
      {
        uri: "b12404033",
        addedDate: "4/21/2026",
        title: null,
        itemCount: 0,
        creatorLiteral: null,
        callNumber: "Multiple",
        location: "Multiple",
        publicationStatement: null,
      },
    ],
    createdDate: "4/21/2026",
    modifiedDate: "4/21/2026",
    listName: "Spaghetti westerns",
    description: "all about spaghetti",
  },
]
