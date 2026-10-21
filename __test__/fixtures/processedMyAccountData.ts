import type { Patron } from "../../src/types/myAccountTypes"

export const filteredPickupLocations = [
  {
    code: "ft   ",
    name: "53rd Street",
  },
  {
    code: "fe   ",
    name: "58th Street",
  },
  {
    code: "ss   ",
    name: "67th Street",
  },
  {
    code: "ns   ",
    name: "96th Street (CLOSING 7/11)",
  },
  {
    code: "ag   ",
    name: "Aguilar",
  },
  {
    code: "al   ",
    name: "Allerton",
  },
  {
    code: "lb   ",
    name: "Andrew Heiskell",
  },
  {
    code: "bt   ",
    name: "Battery Park",
  },
  {
    code: "ba   ",
    name: "Baychester",
  },
  {
    code: "be   ",
    name: "Belmont",
  },
  {
    code: "bc   ",
    name: "Bronx Library Center",
  },
  {
    code: "cn   ",
    name: "Charleston",
  },
  {
    code: "ch   ",
    name: "Chatham Square",
  },
  {
    code: "ci   ",
    name: "City Island",
  },
  {
    code: "cp   ",
    name: "Clasons Point",
  },
  {
    code: "cs   ",
    name: "Columbus",
  },
  {
    code: "ht   ",
    name: "Countee Cullen",
  },
  {
    code: "dh   ",
    name: "Dongan Hills",
  },
  {
    code: "ea   ",
    name: "Eastchester",
  },
  {
    code: "ew   ",
    name: "Edenwald",
  },
  {
    code: "ep   ",
    name: "Epiphany",
  },
  {
    code: "fx   ",
    name: "Francis Martin",
  },
  {
    code: "gc   ",
    name: "Grand Central",
  },
  {
    code: "gd   ",
    name: "Grand Concourse",
  },
  {
    code: "gk   ",
    name: "Great Kills",
  },
  {
    code: "hg   ",
    name: "Hamilton Grange",
  },
  {
    code: "hl   ",
    name: "Harlem",
  },
  {
    code: "hu   ",
    name: "Harry Belafonte - 115th Street",
  },
  {
    code: "hb   ",
    name: "High Bridge",
  },
  {
    code: "hp   ",
    name: "Hudson Park",
  },
  {
    code: "hk   ",
    name: "Huguenot Park",
  },
  {
    code: "in   ",
    name: "Inwood",
  },
  {
    code: "jp   ",
    name: "Jerome Park",
  },
  {
    code: "kb   ",
    name: "Kingsbridge",
  },
  {
    code: "kp   ",
    name: "Kips Bay",
  },
  {
    code: "my   ",
    name: "LPA - Circulating",
  },
  {
    code: "myarv",
    name: "LPA Reserve Film and Video",
  },
  {
    code: "mb   ",
    name: "Macombs Bridge",
  },
  {
    code: "mn   ",
    name: "Mariners Harbor",
  },
  {
    code: "cl   ",
    name: "Morningside Heights",
  },
  {
    code: "mp   ",
    name: "Morris Park",
  },
  {
    code: "mr   ",
    name: "Morrisania",
  },
  {
    code: "mo   ",
    name: "Mosholu",
  },
  {
    code: "mh   ",
    name: "Mott Haven",
  },
  {
    code: "ml   ",
    name: "Mulberry Street",
  },
  {
    code: "lm   ",
    name: "New Amsterdam",
  },
  {
    code: "nd   ",
    name: "New Dorp",
  },
  {
    code: "ot   ",
    name: "Ottendorfer",
  },
  {
    code: "pk   ",
    name: "Parkchester",
  },
  {
    code: "pm   ",
    name: "Pelham Bay",
  },
  {
    code: "vn   ",
    name: "Pelham Parkway-Van Nest",
  },
  {
    code: "rt   ",
    name: "Richmondtown",
  },
  {
    code: "rd   ",
    name: "Riverdale",
  },
  {
    code: "rs   ",
    name: "Riverside",
  },
  {
    code: "ri   ",
    name: "Roosevelt Island",
  },
  {
    code: "sa   ",
    name: "Saint Agnes",
  },
  {
    code: "sd   ",
    name: "Sedgwick",
  },
  {
    code: "sn   ",
    name: "SNFL (formerly Mid-Manhattan)",
  },
  {
    code: "se   ",
    name: "Seward Park",
  },
  {
    code: "sv   ",
    name: "Soundview",
  },
  {
    code: "sb   ",
    name: "South Beach",
  },
  {
    code: "dy   ",
    name: "Spuyten Duyvil",
  },
  {
    code: "st   ",
    name: "Stapleton",
  },
  {
    code: "tg   ",
    name: "Throgs Neck",
  },
  {
    code: "th   ",
    name: "Todt Hill",
  },
  {
    code: "ts   ",
    name: "Tompkins Square",
  },
  {
    code: "tv   ",
    name: "Tottenville",
  },
  {
    code: "tm   ",
    name: "Tremont",
  },
  {
    code: "vc   ",
    name: "Van Cortlandt",
  },
  {
    code: "wk   ",
    name: "Wakefield",
  },
  {
    code: "wh   ",
    name: "Washington Heights",
  },
  {
    code: "wb   ",
    name: "Webster",
  },
  {
    code: "wf   ",
    name: "West Farms",
  },
  {
    code: "nb   ",
    name: "West New Brighton",
  },
  {
    code: "wt   ",
    name: "Westchester Square",
  },
  {
    code: "wl   ",
    name: "Woodlawn Heights",
  },
  {
    code: "wo   ",
    name: "Woodstock",
  },
  {
    code: "yv   ",
    name: "Yorkville",
  },
]

export const processedPatron = {
  notificationPreference: "z",
  username: "pastadisciple",
  name: "Strega Nonna",
  barcode: "23333121538324",
  formattedBarcode: "2 3333 12153 8324",
  expirationDate: "March 28, 2025",
  emails: ["streganonna@gmail.com", "spaghettigrandma@gmail.com"],
  phones: [
    {
      number: "123-456-7890",
      type: "t",
    },
  ],
  homeLibrary: { code: "sn   ", name: "SNFL (formerly Mid-Manhattan)" },
  id: 6742743,
} as Patron

export const emptyPatron = {
  notificationPreference: "z",
  name: "Strega Nonna",
  barcode: "23333121538324",
  formattedBarcode: "2 3333 12153 8324",
  expirationDate: "March 28, 2025",
  emails: [],
  phones: [],
  homeLibrary: { code: "sn   ", name: "SNFL (formerly Mid-Manhattan)" },
  id: 6742743,
} as Patron

export const processedCheckouts = [
  {
    id: "66527401",
    callNumber: "J PIC COUSINS",
    barcode: "33333455951331",
    dueDate: "May 30, 2024",
    patron: "6742743",
    title: "Good night, Little Fish / Cousins, Lucy, author.",
    isResearch: false,
    numberOfRenewals: 10,
    bibId: "23129476",
    isNyplOwned: true,
    catalogHref: "https://borrow.nypl.org/search/card?recordId=23129476",
    volume: null,
  },
  {
    id: "66527400",
    callNumber: "J PIC A",
    barcode: "33333072760735",
    dueDate: "May 7, 2024",
    patron: "6742743",
    title: "Fish, fish, fish / Adams, Georgie.",
    isResearch: true,
    numberOfRenewals: 1,
    bibId: "17226308",
    isNyplOwned: true,
    catalogHref: "https://nypl.org/research/research-catalog/bib/b17226308",
    volume: null,
  },
  {
    id: "66527399",
    callNumber: "test 5/6 01 xx",
    barcode: "1715021087264",
    dueDate: "May 7, 2024",
    patron: "6742743",
    title: "test 5/6 01",
    isResearch: true,
    numberOfRenewals: 0,
    bibId: "23296884",
    isNyplOwned: false,
    catalogHref: null,
    volume: null,
  },
  {
    id: "66527379",
    callNumber: "PJ5055.37.O4222 H64 2016g",
    barcode: "CU25631586",
    dueDate: "April 24, 2024",
    patron: "6742743",
    title:
      "[Standard NYPL restrictions apply] HOF HA-KELAVIM HA-MESHUHRARIM = THE BEACH OF FREE DOGS / AVRON POLAKOW. [RECAP]",
    isResearch: true,
    bibId: "23296866",
    numberOfRenewals: 0,
    isNyplOwned: false,
    catalogHref: null,
    volume: null,
  },
]

export const processedHolds = [
  {
    itemId: "40367309",
    patron: "6742743",
    id: "49438192",
    pickupByDate: "May 17, 2024",
    canFreeze: false,
    frozen: false,
    status: "READY FOR PICKUP",
    pickupLocation: { code: "sn", name: "SNFL (formerly Mid-Manhattan)" },
    title: "I want to be spaghetti! / Wright-Ruiz, Kiera, author.",
    isResearch: false,
    bibId: "23099273",
    isNyplOwned: true,
    catalogHref: "https://borrow.nypl.org/search/card?recordId=23099273",
    volume: null,
  },
  {
    itemId: "15550040",
    patron: "6742743",
    id: "49438189",
    pickupByDate: null,
    canFreeze: false,
    frozen: false,
    status: "REQUEST PENDING",
    pickupLocation: {
      code: "mal82",
      name: "Schwarzman Room 315 ONSITE USE",
    },
    title: "Spaghetti! / Cortanze, Gérard de.",
    isResearch: true,
    bibId: "16145054",
    isNyplOwned: true,
    catalogHref: "https://nypl.org/research/research-catalog/bib/b16145054",
    volume: null,
  },
  {
    itemId: "23167148",
    patron: "6742743",
    id: "49438190",
    pickupByDate: null,
    canFreeze: true,
    frozen: false,
    status: "REQUEST PENDING",
    pickupLocation: { code: "sn", name: "SNFL (formerly Mid-Manhattan)" },
    title:
      "Pasta every day : make it, shape it, sauce it, eat it / Feinstein, Meryl, author.",
    isResearch: false,
    bibId: "23167148",
    isNyplOwned: true,
    catalogHref: "https://borrow.nypl.org/search/card?recordId=23167148",
    volume: null,
  },
  {
    itemId: "37648023",
    patron: "6742743",
    id: "49438191",
    pickupByDate: null,
    canFreeze: false,
    frozen: false,
    status: "REQUEST CONFIRMED",
    pickupLocation: { code: "sn", name: "SNFL (formerly Mid-Manhattan)" },
    title: "The house of mirth : large print / Wharton, Edith, 1862-1937.",
    isResearch: false,
    bibId: "22046460",
    isNyplOwned: true,
    catalogHref: "https://borrow.nypl.org/search/card?recordId=22046460",
    volume: null,
  },
  {
    itemId: "40875355",
    patron: "6742743",
    id: "49438193",
    pickupByDate: null,
    canFreeze: false,
    frozen: false,
    status: "REQUEST PENDING",
    pickupLocation: {
      code: "mal",
      name: "Schwarzman Room 315 ONSITE USE",
    },
    title: "Partner record",
    isResearch: true,
    bibId: "23296875",
    isNyplOwned: false,
    catalogHref: null,
    volume: null,
  },
]

export const processedCheckoutsFromPatronServices = [
  {
    numberOfRenewals: 0,
    id: "35612676",
    callNumber: "J PIC HUTTON",
    barcode: "33333419885351",
    dueDate: "November 9, 2026",
    patron: "12345",
    title: "Cats! / Hutton, John (John S.), author.",
    volume: null,
    isResearch: false,
    bibId: "21320367",
    isNyplOwned: true,
    catalogHref: "https://borrow.nypl.org/search/card?recordId=21320367",
  },
  {
    numberOfRenewals: 0,
    id: "39894922",
    callNumber: "J 636.7 O",
    barcode: "33333443714874",
    dueDate: "November 9, 2026",
    patron: "12345",
    title: "Curious about dogs / Osborne, M. K., author.",
    volume: null,
    isResearch: false,
    bibId: "22930578",
    isNyplOwned: true,
    catalogHref: "https://borrow.nypl.org/search/card?recordId=22930578",
  },
  {
    numberOfRenewals: 0,
    id: "...",
    callNumber: "callnum value",
    barcode: "barcode value",
    dueDate: "September 14, 2023",
    patron: "12345",
    title: "bib title",
    volume: "volume tag",
    isResearch: true,
    bibId: "bib id",
    isNyplOwned: false,
    catalogHref: null,
  },
  {
    numberOfRenewals: 0,
    id: "...",
    callNumber: "callnum value",
    barcode: "barcode value",
    dueDate: "September 14, 2023",
    patron: "12345",
    title: "bib title",
    volume: "volume tag",
    isResearch: true,
    bibId: "bib id",
    isNyplOwned: false,
    catalogHref: null,
  },
]

export const processedHoldsFromPatronServices = [
  {
    itemId: "17731879",
    patron: "12345",
    id: "54690727",
    pickupByDate: null,
    canFreeze: false,
    frozen: false,
    status: "REQUEST PENDING",
    pickupLocation: { code: "maedd", name: "STAFF ONLY - SASB EDD" },
    title: "Dog / Owen, Catherine, 1971-",
    volume: null,
    isResearch: false,
    bibId: "16879269",
    isNyplOwned: true,
    catalogHref: "https://borrow.nypl.org/search/card?recordId=16879269",
  },
  {
    itemId: "30334451",
    patron: "12345",
    id: "54691918",
    pickupByDate: null,
    canFreeze: false,
    frozen: false,
    status: "REQUEST PENDING",
    pickupLocation: { code: "mal", name: "Schwarzman Room 315 ONSITE USE" },
    title: "The Black cat.",
    volume: "v. 25-26 (Nov. 1919-Feb. 25, 1922)",
    isResearch: false,
    bibId: "10700919",
    isNyplOwned: true,
    catalogHref: "https://borrow.nypl.org/search/card?recordId=10700919",
  },
  {
    itemId: "37894371",
    patron: "12345",
    id: "54691920",
    pickupByDate: null,
    canFreeze: false,
    frozen: false,
    status: "REQUEST PENDING",
    pickupLocation: { code: "sc", name: "Schomburg Reference ONSITE USE" },
    title: "Cross-country cat / Calhoun, Mary.",
    volume:
      "no. 25-41, 43-47, 51, 53 (janv. 1971-mai 1972, juil.-nov. 1972, mars 1973, sept. 1973)",
    isResearch: false,
    bibId: "22175694",
    isNyplOwned: true,
    catalogHref: "https://borrow.nypl.org/search/card?recordId=22175694",
  },
  {
    itemId: "24170488",
    patron: "12345",
    id: "54691921",
    pickupByDate: null,
    canFreeze: false,
    frozen: false,
    status: "REQUEST PENDING",
    pickupLocation: { code: "mal", name: "Schwarzman Room 315 ONSITE USE" },
    title:
      "The early Jurassic pterosaur Dorygnathus bathensis (Teodori, 1830) : and, The early Jurassic pterosaur Campylognathoides, Strand, 1928 / Padian, Kevin.",
    volume: null,
    isResearch: false,
    bibId: "18100608",
    isNyplOwned: true,
    catalogHref: "https://borrow.nypl.org/search/card?recordId=18100608",
  },
  {
    itemId: "39882966",
    patron: "12345",
    id: "54691919",
    pickupByDate: null,
    canFreeze: false,
    frozen: false,
    status: "REQUEST PENDING",
    pickupLocation: { code: "mal", name: "Schwarzman Room 315 ONSITE USE" },
    title: "Poppy / Minden, Joseph ., author.",
    volume: null,
    isResearch: false,
    bibId: "22917285",
    isNyplOwned: true,
    catalogHref: "https://borrow.nypl.org/search/card?recordId=22917285",
  },
  {
    itemId: "40585815",
    patron: "12345",
    id: "54691924",
    pickupByDate: null,
    canFreeze: true,
    frozen: false,
    status: "REQUEST PENDING",
    pickupLocation: { code: "mal", name: "Schwarzman Room 315 ONSITE USE" },
    title:
      "A lecture on analogy out-analogized, being the doctrine of ontology extended : proving by incontestable analogies, the earth to be endowed with animality / Buxton, Mr.",
    volume: "15 titles",
    isResearch: false,
    bibId: "23180362",
    isNyplOwned: true,
    catalogHref: "https://borrow.nypl.org/search/card?recordId=23180362",
  },
]

export const processedFines = {
  total: 14.99,
  entries: [
    {
      detail: "Replacement",
      amount: 14.99,
      date: "June 15, 2023",
    },
  ],
}
