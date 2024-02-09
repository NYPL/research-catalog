export const checkouts = {
  total: 2,
  start: 0,
  entries: [
    {
      id: "https://ilsstaff.nypl.org/iii/sierra-api/v6/patrons/checkouts/65060571",
      patron: "https://ilsstaff.nypl.org/iii/sierra-api/v6/patrons/2772226",
      item: {
        id: "36633383",
        updatedDate: "2024-02-06T03:08:46Z",
        createdDate: "2018-11-19T14:01:00Z",
        deleted: false,
        bibIds: ["21678146"],
        location: {
          code: "sna9n",
          name: "Stavros Niarchos Foundation Library - Adult Non-Fiction",
        },
        status: {
          code: "-",
          display: "AVAILABLE",
          duedate: "2024-02-09T09:00:00Z",
        },
        volumes: [],
        barcode: "33333432264691",
        callNumber: "972.93 D",
      },
      dueDate: "2024-02-09T09:00:00Z",
      numberOfRenewals: 2,
      outDate: "2023-12-18T21:04:19Z",
    },
    {
      id: "https://ilsstaff.nypl.org/iii/sierra-api/v6/patrons/checkouts/65060570",
      patron: "https://ilsstaff.nypl.org/iii/sierra-api/v6/patrons/2772226",
      item: {
        id: "40648363",
        updatedDate: "2024-02-06T03:08:50Z",
        createdDate: "2023-12-06T21:11:00Z",
        deleted: false,
        bibIds: ["17699134"],
        location: {
          code: "sna4l",
          name: "Stavros Niarchos Foundation Library - Adult World Language",
        },
        status: {
          code: "-",
          display: "AVAILABLE",
          duedate: "2024-02-09T09:00:00Z",
        },
        volumes: [],
        barcode: "33333455520789",
        callNumber: "Spa FIC ALVAREZ",
      },
      dueDate: "2024-02-09T09:00:00Z",
      numberOfRenewals: 2,
      outDate: "2023-12-18T21:04:18Z",
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

export const bibs = {
  total: 2,
  start: 0,
  entries: [
    {
      id: "10833141",
      updatedDate: "2023-08-21T17:40:05Z",
      createdDate: "2008-12-14T06:50:00Z",
      deleted: false,
      suppressed: false,
      issn: "0028792X",
      lang: {
        code: "eng",
        name: "English",
      },
      title: "The New Yorker.",
      author: "",
      materialType: {
        code: "a  ",
        value: "BOOK/TEXT",
      },
      bibLevel: {
        code: "s",
        value: "SERIAL",
      },
      publishYear: 1925,
      catalogDate: "2022-12-30",
      country: {
        code: "nyu",
        name: "New York (State)",
      },
      callNumber: "*DA+ (New Yorker)",
    },
    {
      id: "21678146",
      updatedDate: "2024-01-06T19:03:27Z",
      createdDate: "2018-10-22T13:47:11Z",
      deleted: false,
      suppressed: false,
      isbn: "9780822356882",
      lang: {
        code: "eng",
        name: "English",
      },
      title: "The Dominican Republic reader : history, culture, politics",
      author: "",
      materialType: {
        code: "a  ",
        value: "BOOK/TEXT",
      },
      bibLevel: {
        code: "m",
        value: "MONOGRAPH",
      },
      publishYear: 2014,
      catalogDate: "2018-10-23",
      country: {
        code: "ncu",
        name: "North Carolina",
      },
      callNumber: "972.93 D",
    },
  ],
}

export const holds = {
  total: 1,
  start: 0,
  entries: [
    {
      id: "https://ilsstaff.nypl.org/iii/sierra-api/v6/patrons/holds/48636910",
      record: {
        id: "37603650",
        updatedDate: "2024-02-07T12:14:57Z",
        createdDate: "2019-12-26T19:28:13Z",
        deleted: false,
        bibIds: ["22002760"],
        location: {
          code: "tha0n",
          name: "Todt Hill-Westerleigh Non-Fiction",
        },
        status: {
          code: "!",
          display: "ON HOLDSHELF",
        },
        volumes: [],
        barcode: "33333857749226",
        callNumber: "616.861 W",
      },
      patron: "https://ilsstaff.nypl.org/iii/sierra-api/v6/patrons/2772226",
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
    },
  ],
}
