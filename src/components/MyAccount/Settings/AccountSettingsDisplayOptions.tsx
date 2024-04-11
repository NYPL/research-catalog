import {
  Text,
  FormField,
  Select,
  TextInput,
  Form,
  FormRow,
} from "@nypl/design-system-react-components"
import { notificationPreferenceMap } from "../../../utils/myAccountData"
import type { Patron } from "../../../types/myAccountTypes"
import { accountSettings } from "./AccountSettingsUtils"
import { buildListElementsWithIcons } from "../IconListElement"
import type { JSX, ReactNode } from "react"

export const AccountSettingsDisplay = ({ patron }: { patron: Patron }) => {
  return (
    <>
      {accountSettings
        .map((setting) => {
          return {
            icon: setting.icon,
            term: setting.term,
            // pin is masked so description is a default "****"
            description: patron[setting.field] || setting.description,
          }
        })
        .filter((listData) => !!listData.description)
        .map(buildListElementsWithIcons)}
    </>
  )
}

export const AccountSettingsForm = ({ patron }: { patron: Patron }) => {
  const formInputs = accountSettings
    .map((setting) => {
      let inputField:
        | string
        | number
        | boolean
        | JSX.Element
        | Iterable<ReactNode>
      switch (setting.term) {
        case "Home library":
          inputField = (
            <Select
              name={setting.field}
              id="update-home-library-selector"
              labelText="Update home library"
              showLabel={false}
            >
              <option>{patron.homeLibrary}</option>
            </Select>
          )
          break
        case "Notification preference":
          inputField = (
            <Select
              name={setting.field}
              id="notification-preference-selector"
              labelText="Update notification preference"
              showLabel={false}
            >
              {Object.keys(notificationPreferenceMap).map((pref) => (
                <option key={pref + "-option"} value={pref}>
                  {notificationPreferenceMap[pref]}
                </option>
              ))}
            </Select>
          )
          break
        case "Phone":
          inputField = (
            <TextInput
              name={setting.field}
              defaultValue={patron.primaryPhone}
              id="phone-text-input"
              labelText="Update phone number"
              showLabel={false}
            />
          )
          break
        case "Email":
          inputField = (
            <TextInput
              name={setting.field}
              defaultValue={patron.primaryEmail}
              id="email-text-input"
              labelText="Update email"
              showLabel={false}
            />
          )
          break
        case "Pin/Password":
          inputField = <Text>****</Text>
      }
      return {
        term: setting.term,
        description: (
          <FormField key={setting.field + "-input"}>{inputField}</FormField>
        ),
        icon: setting.icon,
      }
    })
    .map(buildListElementsWithIcons)
  return <>{formInputs}</>
}
