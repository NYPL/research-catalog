import type {
  EDDRequestParams,
  EDDFormValidatedField,
  EDDPageStatus,
  EDDStatusMessage,
} from "../types/holdTypes"

import { EMAIL_REGEX } from "../config/constants"

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

export const EDDPageStatusMessages: Record<EDDPageStatus, EDDStatusMessage> = {
  failed: {
    heading: "Request failed",
    body: "We were unable to process your request at this time.",
  },
  unavailable: {
    heading: "Electronic delivery unavailable",
    body: "Electronic delivery options for this item are currently unavailable.",
  },
  invalid: {
    body: "Some fields contain errors. Please correct and submit again.",
  },
}

// Initial state for invalid fields in the EDD form to keep track of the first invalid field for focus on submit
export const initialEDDInvalidFields: EDDFormValidatedField[] = [
  { key: "email", isInvalid: false },
  { key: "startingNumber", isInvalid: false },
  { key: "endingNumber", isInvalid: false },
  { key: "chapter", isInvalid: false },
]

// Updates the invalidFields in state based on the field name and value and validation rules per field
export const updateInvalidFields = (
  fieldName: string,
  fieldValue: string,
  prevInvalidFields: EDDFormValidatedField[]
): EDDFormValidatedField[] => {
  return prevInvalidFields.map((field) => {
    if (field.key === fieldName) {
      switch (field.key) {
        // Validate email field
        case "email":
          return {
            key: "email",
            isInvalid: !fieldValue.length || !EMAIL_REGEX.test(fieldValue),
          }
        // Validate other fields
        default:
          return { key: field.key, isInvalid: !fieldValue.length }
      }
    }
    return field
  })
}

// Validates all fields on submit in case the user hasn't typed in all the required fields
export const validateEDDForm = (
  eddForm: EDDRequestParams,
  prevInvalidFields: EDDFormValidatedField[]
): EDDFormValidatedField[] =>
  prevInvalidFields.reduce((accumulator, field) => {
    return updateInvalidFields(field.key, eddForm[field.key], accumulator)
  }, prevInvalidFields)
