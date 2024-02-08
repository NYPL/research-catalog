export const holds = {
  total: 1,
  start: 0,
  entries: [
    {
      patron:
        "https://nypl-sierra-test.nypl.org/iii/sierra-api/v6/patrons/2772226",
      id: "https://ilsstaff.nypl.org/iii/sierra-api/v6/patrons/holds/48636910",
      record: "https://ilsstaff.nypl.org/iii/sierra-api/v6/items/37603650",
      frozen: false,
      placed: "2023-12-12",
      notWantedBeforeDate: "2023-12-12",
      pickupByDate: "2024-02-15T09:00:00Z",
      pickupLocation: {
        code: "sn",
        name: "SNFL (formerly Mid-Manhattan)",
      },
      status: {
        code: "i",
        name: "Requested item ready for pickup.",
      },
      recordType: "i",
      priority: 1,
      canFreeze: false,
    },
  ],
}

export const checkouts = {
  total: 4,
  start: 0,
  entries: [
    {
      id: "https://nypl-sierra-test.nypl.org/iii/sierra-api/v6/patrons/checkouts/58536119",
      patron:
        "https://nypl-sierra-test.nypl.org/iii/sierra-api/v6/patrons/2772226",
      item: "https://nypl-sierra-test.nypl.org/iii/sierra-api/v6/items/39481193",
      barcode: "32101043146511",
      dueDate: "2023-09-27T08:00:00Z",
      callNumber: "HD9890.M88",
    },
    {
      id: "https://nypl-sierra-test.nypl.org/iii/sierra-api/v6/patrons/checkouts/58536118",
      patron:
        "https://nypl-sierra-test.nypl.org/iii/sierra-api/v6/patrons/2772226",
      item: "https://nypl-sierra-test.nypl.org/iii/sierra-api/v6/items/39481194",
      barcode: "32101088255243",
      dueDate: "2023-09-27T08:00:00Z",
      callNumber: "HE396.E4 H7",
    },
    {
      id: "https://nypl-sierra-test.nypl.org/iii/sierra-api/v6/patrons/checkouts/58536117",
      patron:
        "https://nypl-sierra-test.nypl.org/iii/sierra-api/v6/patrons/2772226",
      item: "https://nypl-sierra-test.nypl.org/iii/sierra-api/v6/items/39481179",
      barcode: "CU00569410",
      dueDate: "2023-09-27T08:00:00Z",
      callNumber: "PL2627 .C472 1987 v.30-34",
    },
    {
      id: "https://nypl-sierra-test.nypl.org/iii/sierra-api/v6/patrons/checkouts/58536116",
      patron:
        "https://nypl-sierra-test.nypl.org/iii/sierra-api/v6/patrons/2772226",
      item: "https://nypl-sierra-test.nypl.org/iii/sierra-api/v6/items/39481192",
      barcode: "CU73981141",
      dueDate: "2023-09-27T08:00:00Z",
      callNumber: "PR6053.R378 T53 2008g",
    },
  ],
}

export const patron = {
  id: 2772226,
  names: ["KAHN, VERA RUTH"],
  barcodes: ["23333121538324"],
  expirationDate: "2025-03-28",
  emails: ["veraruthkahn@gmail.com", "veggievera@gmail.com"],
  homeLibrary: {
    code: "sn",
    name: "Stavros Niarchos Foundation Library (SNFL)",
  },
  phones: [
    {
      number: "646-660-0432",
      type: "t",
    },
  ],
}
