import {
  Form,
  FormField,
  Select,
  TextInput,
} from "@nypl/design-system-react-components"
import { notificationPreferenceMap } from "../../../utils/myAccountData"
import type { Patron } from "../../../types/myAccountTypes"
import { accountSettings } from "./AccountSettingsUtils"
import { buildListElementsWithIcons } from "../IconListElement"
import type { JSX, ReactNode } from "react"

export const buildAccountSettingsForm = (settingsData: Patron) => {
  return accountSettings
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
              <option>another library</option>
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
        default:
          inputField = <TextInput id="spaghetti" labelText="defaultInput" />
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
}
