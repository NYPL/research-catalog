import type {
  EDDRequestParams,
  EDDFormValidatedField,
  HoldPageStatus,
  EDDStatusMessage,
} from "../types/holdPageTypes"

import { EMAIL_REGEX } from "../config/constants"

export const initialEDDFormState: EDDRequestParams = {
  emailAddress: "",
  startPage: "",
  endPage: "",
  chapterTitle: "",
  date: "",
  volume: "",
  issue: "",
  itemId: "",
  patronId: "",
  source: "",
  author: "",
  requestNotes: "",
  pickupLocation: "edd",
}

export const HoldPageErrorHeadings = {
  failed: "Request failed",
  eddUnavailable:
    "Electronic delivery options for this item are currently unavailable.",
  invalid: "Some fields contain errors. Please correct and submit again.",
  patronIneligible: "There is a problem with your library account.",
}

export const HoldPageErrorMessages: Record<HoldPageStatus, EDDStatusMessage> = {
  failed: {
    heading: "Request failed",
    message: "We were unable to process your request at this time.",
  },
  eddUnavailable: {
    heading: "Electronic delivery unavailable",
    message:
      "Electronic delivery options for this item are currently unavailable.",
  },
  invalid: {
    message: "Some fields contain errors. Please correct and submit again.",
  },
  patronIneligible: {
    heading: "There is a problem with your library account.",
    message: "This is because:",
  },
}

// Initial state for invalid fields in the EDD form to keep track of the first invalid field for focus on submit
export const initialEDDInvalidFields: EDDFormValidatedField[] = [
  { key: "emailAddress", isInvalid: false },
  { key: "startPage", isInvalid: false },
  { key: "endPage", isInvalid: false },
  { key: "chapterTitle", isInvalid: false },
]

// Gets updated invalidFields to set them in state based on the inputted field name and value
export const getUpdatedInvalidFields = (
  fieldName: string,
  fieldValue: string,
  prevInvalidFields: EDDFormValidatedField[]
): EDDFormValidatedField[] => {
  return prevInvalidFields.map((field) => {
    if (field.key === fieldName) {
      switch (field.key) {
        // Validate email field
        case "emailAddress":
          return {
            key: "emailAddress",
            isInvalid: !fieldValue.length || !EMAIL_REGEX.test(fieldValue),
          }
        // Validate presence of required fields
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
    return getUpdatedInvalidFields(field.key, eddForm[field.key], accumulator)
  }, prevInvalidFields)

export const isInvalidField = (
  fieldName: string,
  invalidFields: EDDFormValidatedField[]
): boolean => invalidFields.find((field) => field.key === fieldName).isInvalid
