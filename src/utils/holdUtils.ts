import type { EDDRequestFieldErrors } from "../types/holdTypes"

export const eddRequestDefaultInvalidFields: EDDRequestFieldErrors = {
  email: false,
  startingNumber: false,
  endingNumber: false,
  chapter: false,
}
