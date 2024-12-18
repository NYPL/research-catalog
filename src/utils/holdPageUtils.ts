import type {
  EDDRequestParams,
  EDDFormValidatedField,
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
