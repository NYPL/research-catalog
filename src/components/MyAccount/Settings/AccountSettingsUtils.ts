import type { IconNames } from "@nypl/design-system-react-components"
import type { Patron } from "../../../types/myAccountTypes"

export const accountSettings = [
  {
    field: "primaryPhone",
    icon: "communicationCall",
    term: "Phone",
  },
  {
    field: "primaryEmail",
    icon: "communicationEmail",
    term: "Email",
  },
  {
    field: "notificationPreference",
    icon: "communicationChatBubble",
    term: "Notification preference",
  },
  {
    field: "homeLibrary",
    icon: "actionHome",
    term: "Home library",
  },
  {
    field: "pin",
    icon: "actionLockClosed",
    term: "Pin/Password",
    description: "****",
  },
] as {
  field: string
  icon: IconNames
  term: string
  description: string | JSX.Element
}[]

type PhoneOrEmail = string | { number: string; type: string }
export const updateArrayValue = (
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

export const parsePayload = (formSubmissionBody, settingsData: Patron) => {
  return accountSettings.reduce((putRequestPayload, setting) => {
    const fieldValue = formSubmissionBody[setting.field]?.value
    const field = setting.field
    if (fieldValue?.length < 1) return putRequestPayload
    switch (field) {
      case "pin":
        // pin is handled in a separate dialog
        break
      case "primaryEmail":
        putRequestPayload["emails"] = updateArrayValue(
          fieldValue,
          settingsData.emails
        )
        break
      // TODO: right now we are assuming that all phones are mobile phones.
      // follow on ticket outlines two different inputs
      case "primaryPhone":
        putRequestPayload["phones"] = updateArrayValue(
          { number: fieldValue, type: "t" },
          settingsData.phones
        )
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
        putRequestPayload[field] = fieldValue
    }
    return putRequestPayload
  }, {})
}
