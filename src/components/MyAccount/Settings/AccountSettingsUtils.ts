import type { IconNames } from "@nypl/design-system-react-components"
import type { Patron, PatronUpdateBody } from "../../../types/myAccountTypes"

import { notificationPreferenceTuples } from "../../../utils/myAccountUtils"

type Phone = { number: string; type: string }
type PhoneOrEmail = string | Phone

export const isFormValid = (updatedForm: {
  emails: string
  phones: string
  notificationPreference: string
}) => {
  const phoneRegex = /^(?:\D*\d){10,11}\D*$/
  if (updatedForm.notificationPreference === "p") {
    return updatedForm.phones !== "" && phoneRegex.test(updatedForm.phones)
  } else if (updatedForm.notificationPreference === "z") {
    return updatedForm.emails !== ""
  } else return true
}

export const formatPhoneNumber = (value: Phone[]) => {
  const number = value[0]?.number
  if (!number) return
  if (number.length === 11) {
    return `${number[0]}-${number.substring(1, 4)}-${number.substring(
      4,
      7
    )}-${number.substring(7)}`
  } else if (number.length === 10) {
    return `${number.substring(0, 3)}-${number.substring(
      3,
      6
    )}-${number.substring(6)}`
  } else return number
}

export const accountSettings = [
  {
    field: "phones",
    icon: "communicationCall",
    term: "Phone",
    description: formatPhoneNumber,
  },
  {
    field: "emails",
    icon: "communicationEmail",
    term: "Email",
    description: (value: string[]) => value?.[0],
  },
  {
    field: "notificationPreference",
    icon: "communicationChatBubble",
    term: "Notification preference",
    description: (pref): [code: string, label: string] =>
      notificationPreferenceTuples.find(([code]) => pref === code)?.[1],
  },
  {
    field: "homeLibrary",
    icon: "actionHome",
    term: "Home library",
    description: (location) => location?.name,
  },
  {
    field: "pin",
    icon: "actionLockClosed",
    term: "Pin/Password",
    description: () => "****",
  },
] as {
  field: string
  icon: IconNames
  term: string
  description?: (any) => string
}[]

export const updatePhoneOrEmailArrayWithNewPrimary = (
  newPrimary: PhoneOrEmail,
  currentValues: PhoneOrEmail[]
) => {
  const removedNewPrimaryIfPresent = currentValues.filter((val) => {
    if (val["type"]) return val["number"] !== newPrimary["number"]
    return val !== newPrimary
  })
  return [newPrimary, ...removedNewPrimaryIfPresent]
}

/** Parses the account settings form submission event target and turns it into
 * the payload for the patron settings update request.
 */
export const parseAccountSettingsPayload = (
  formSubmissionBody,
  settingsData: Patron
) => {
  return accountSettings.reduce((putRequestPayload, setting) => {
    const field = setting.field
    const fieldValue = formSubmissionBody[field]?.value
    if (!fieldValue) {
      return putRequestPayload
    }
    switch (field) {
      case "pin":
        // pin is handled in a separate dialog
        break
      case "emails":
        putRequestPayload["emails"] = updatePhoneOrEmailArrayWithNewPrimary(
          fieldValue,
          settingsData.emails
        ) as string[]
        break
      // Accepting one phone number as primary, since NYPL currently doesn't differentiate between mobile
      // and home phones.
      case "phones":
        putRequestPayload["phones"] = updatePhoneOrEmailArrayWithNewPrimary(
          { number: fieldValue.match(/\d+/g).join(""), type: "t" },
          settingsData.phones
        ) as Phone[]
        break
      case "notificationPreference":
        putRequestPayload["fixedFields"] = {
          "268": {
            label: "Notice Preference",
            value: fieldValue,
          },
        }
        break
      case "homeLibrary":
        // Sierra API holds PUT endpoint only takes homeLibraryCode, which is a
        // different type than the homeLibrary object used everywhere else in
        // the app.
        putRequestPayload.homeLibraryCode = fieldValue.split("@")[0]
    }
    return putRequestPayload
  }, {} as PatronUpdateBody)
}
