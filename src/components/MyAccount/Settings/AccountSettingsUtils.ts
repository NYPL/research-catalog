import type { IconNames } from "@nypl/design-system-react-components"
import type { Patron } from "../../../types/myAccountTypes"
import { notificationPreferenceMap } from "../../../utils/myAccountData"
import { filteredPickupLocations } from "../../../../__test__/fixtures/processedMyAccountData"
import MyAccount from "../../../models/MyAccount"

type PutRequestPayloadType = {
  emails?: string[]
  phones?: Phone[]
  fixedFields?: {
    /* eslint-disable @typescript-eslint/naming-convention */
    268: {
      label: "Notice Preference"
      value: string
    }
  }
  homeLibrary?: string
}
type Phone = { number: string; type: string }
type PhoneOrEmail = string | Phone

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
        ) as string[]
        break
      // TODO: right now we are assuming that all phones are mobile phones.
      // follow on ticket outlines two different inputs
      case "primaryPhone":
        putRequestPayload["phones"] = updateArrayValue(
          { number: fieldValue, type: "t" },
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
        putRequestPayload[field] = fieldValue
    }
    return putRequestPayload
  }, {} as PutRequestPayloadType)
}

export const updatePatronData = (
  originalPatronData: Patron,
  patronUpdateBody: PutRequestPayloadType
) => {
  const newData = { ...originalPatronData }
  newData.notificationPreference =
    notificationPreferenceMap[patronUpdateBody.fixedFields[268].value]
  newData.emails = patronUpdateBody.emails
  newData.primaryEmail = patronUpdateBody.emails[0]
  newData.phones = patronUpdateBody.phones
  newData.primaryPhone = patronUpdateBody.phones[0].number
  newData.homeLibrary = filteredPickupLocations[patronUpdateBody.homeLibrary]
  return newData
}
