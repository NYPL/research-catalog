export const mockPatron = {
  notificationPreference: "Email",
  name: "NONNA, STREGA",
  barcode: "23333121538324",
  expirationDate: "2025-03-28",
  emails: ["streganonna@gmail.com", "spaghettigrandma@gmail.com"],
  phones: [
    {
      number: "123-456-7890",
      type: "t",
    },
  ],
  homeLibrary: { name: "Stavros Niarchos Foundation Library (SNFL)", code: "sn   " },
  id: 2772226,
}

export const emptyPatron = {
  name: "NONNA, STREGA",
  barcode: "23333121538324",
  expirationDate: "2025-03-28",
  emails: [],
  phones: [],
  homeLibrary: { name: "Stavros Niarchos Foundation Library (SNFL)", code: "sn   " },
  id: 2772226,
  notificationPreference: null,
}

export const mockCheckouts = [
  {
    id: "65060571",
    callNumber: "972.93 D",
    barcode: "33333432264691",
    dueDate: "2024-02-09T09:00:00Z",
    patron: "2772226",
    title: "The Dominican Republic reader : history, culture, politics",
    isResearch: false,
    bibId: "21678146",
    isNyplOwned: true,
    catalogHref: "https://nypl.na2.iiivega.com/search/card?recordId=21678146",
  },
  {
    id: "65060570",
    callNumber: "Spa FIC ALVAREZ",
    barcode: "33333455520789",
    dueDate: "2024-02-09T09:00:00Z",
    patron: "2772226",
    title: "En el tiempo de las mariposas",
    isResearch: false,
    bibId: "17699134",
    isNyplOwned: true,
    catalogHref: "https://nypl.na2.iiivega.com/search/card?recordId=17699134",
  },
]

export const mockHolds = [
  {
    patron: "2772226",
    id: "48636910",
    pickupByDate: "2024-02-15T09:00:00Z",
    canFreeze: true,
    frozen: false,
    status: "Requested item ready for pickup.",
    pickupLocation: { code: "mal", name: "SNFL (formerly Mid-Manhattan)" },
    title:
      "Quit like a woman : the radical choice to not drink in a culture obsessed with alcohol",
    isResearch: false,
    bibId: "22002760",
    isNyplOwned: true,
    catalogHref: "https://nypl.na2.iiivega.com/search/card?recordId=22002760",
  },
  {
    patron: "2772226",
    id: "48636911",
    pickupByDate: "2024-02-15T09:00:00Z",
    canFreeze: false,
    frozen: false,
    status: "Requested item ready for pickup.",
    pickupLocation: { code: "mal", name: "SNFL (formerly Mid-Manhattan)" },
    title:
      "Quit like a woman : the radical choice to not drink in a culture obsessed with alcohol",
    isResearch: false,
    bibId: "22002761",
    isNyplOwned: true,
    catalogHref: "https://nypl.na2.iiivega.com/search/card?recordId=22002760",
  },
]
export const mockFines = {
  total: 14.99,
  entries: [
    {
      detail: "Replacement",
      amount: 14.99,
      date: "2023-06-15T17:34:46Z",
    },
  ],
}

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
