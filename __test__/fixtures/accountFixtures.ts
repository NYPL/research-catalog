export const mockPatron = {
  name: "NONNA, STREGA",
  barcode: "23333121538324",
  expirationDate: "2025-03-28",
  primaryEmail: "streganonna@gmail.com",
  emails: ["streganonna@gmail.com", "spaghettigrandma@gmail.com"],
  primaryPhone: "123-456-7890",
  phones: [
    {
      number: "123-456-7890",
      type: "t",
    },
  ],
  homeLibrary: "Stavros Niarchos Foundation Library (SNFL)",
  id: 2772226,
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
  },
]

export const mockHolds = [
  {
    patron: "2772226",
    id: "48636910",
    pickupByDate: "2024-02-15T09:00:00Z",
    canFreeze: false,
    frozen: false,
    status: "Requested item ready for pickup.",
    pickupLocation: "SNFL (formerly Mid-Manhattan)",
    title:
      "Quit like a woman : the radical choice to not drink in a culture obsessed with alcohol",
    isResearch: false,
    bibId: "22002760",
    isNyplOwned: false,
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
