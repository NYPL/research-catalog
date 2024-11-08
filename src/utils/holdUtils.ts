import type {
  EDDRequestParams,
  EDDFormValidatedField,
} from "../types/holdTypes"
import { isEmail } from "validator"

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

export const initialEDDInvalidFields: EDDFormValidatedField[] = [
  { key: "email", isInvalid: false },
  { key: "startingNumber", isInvalid: false },
  { key: "endingNumber", isInvalid: false },
  { key: "chapter", isInvalid: false },
]

export const validateEDDField = (
  prevInvalidFields: EDDFormValidatedField[],
  name: string,
  value: string
): EDDFormValidatedField[] => {
  return prevInvalidFields.map((field) => {
    if (field.key === name) {
      switch (field.key) {
        // Validate email field
        case "email":
          return {
            key: "email",
            isInvalid: !value.length || !isEmail(value),
          }
        // Validate other fields
        default:
          return { key: field.key, isInvalid: !value.length }
      }
    }
    return field
  })
}

export const validateEDDForm = (
  prevInvalidFields: EDDFormValidatedField[],
  eddForm: EDDRequestParams
): EDDFormValidatedField[] =>
  prevInvalidFields.reduce((prevInvalid, field) => {
    return validateEDDField(prevInvalid, field.key, eddForm[field.key])
  }, prevInvalidFields)
