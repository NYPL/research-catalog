import { List } from "../../src/types/listTypes"

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
    createdDate: "04/15/2026",
    modifiedDate: "04/15/2026",
    listName: "First list",
    description: null,
  },
  {
    id: "1234-cc-vv",
    patronId: "12345",
    recordCount: 1,
    records: [
      {
        uri: "b12404033",
        addedDate: "04/16/2026",
        title: "Record",
      },
    ],
    createdDate: "04/21/2026",
    modifiedDate: "04/21/2026",
    listName: "Spaghetti westerns",
    description: "all about spaghetti",
  },
]
