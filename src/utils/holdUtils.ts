import type { EDDRequestParams } from "../types/holdTypes"

export const initialEDDFormState: EDDRequestParams = {
  email: "",
  startingNumber: "",
  endingNumber: "",
  chapter: "",
  publicationDate: "",
  volume: "",
  issue: "",
  itemId: "",
  patronId: "",
  source: "",
  author: "",
  notes: "",
  pickupLocation: "edd",
}
