import {
  Text,
  FormField,
  Select,
  TextInput,
} from "@nypl/design-system-react-components"
import { notificationPreferenceMap } from "../../../utils/myAccountUtils"
import type { Patron } from "../../../types/myAccountTypes"
import { accountSettings, getLibraryByCode } from "./AccountSettingsUtils"
import { buildListElementsWithIcons } from "../IconListElement"
import type { JSX, ReactNode } from "react"
import { filteredPickupLocations } from "../../../../__test__/fixtures/processedMyAccountData"

export const AccountSettingsDisplay = ({ patron }: { patron: Patron }) => {
  const terms = accountSettings
    .map((setting) => {
      const description = setting.description
        ? setting.description(patron[setting.field])
        : patron[setting.field]
      return {
        icon: setting.icon,
        term: setting.term,
        // pin is masked so description is a default "****"
        description,
      }
    })
    .filter((listData) => !!listData.description)
  return <>{terms.map(buildListElementsWithIcons)}</>
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
          {
            const patronHomeLibrary = getLibraryByCode(patron.homeLibraryCode)
            const sortedPickupLocations = [
              patronHomeLibrary,
              ...filteredPickupLocations.filter(
                (loc) => loc.code.trim() !== patron.homeLibraryCode.trim()
              ),
            ]
            inputField = (
              <Select
                name={setting.field}
                id="update-home-library-selector"
                labelText="Update home library"
                showLabel={false}
              >
                {sortedPickupLocations.map((loc, i) => (
                  <option key={`location-option-${i}`} value={loc.code}>
                    {loc.name}
                  </option>
                ))}
              </Select>
            )
          }
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
              defaultValue={patron.phones[0]?.number}
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
              defaultValue={patron.emails[0]}
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
