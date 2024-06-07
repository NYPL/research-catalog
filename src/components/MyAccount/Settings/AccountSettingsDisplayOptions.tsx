import {
  Text,
  FormField,
  Select,
  TextInput,
  Box,
  type TextInputRefType,
} from "@nypl/design-system-react-components"
import { notificationPreferenceTuples } from "../../../utils/myAccountUtils"
import type { Patron } from "../../../types/myAccountTypes"
import { accountSettings, isFormValid } from "./AccountSettingsUtils"
import { buildListElementsWithIcons } from "../IconListElement"
import type { Dispatch, JSX, MutableRefObject, ReactNode } from "react"
import { useState } from "react"
import { filteredPickupLocations } from "../../../utils/myAccountUtils"
import PasswordModal from "./PasswordModal"

export const AccountSettingsDisplay = ({ patron }: { patron: Patron }) => {
  const terms = accountSettings
    .map((setting) => {
      const description = setting.description
        ? setting.description(patron[setting.field])
        : patron[setting.field]
      return {
        icon: setting.icon,
        term: setting.term,
        description,
      }
    })
    .filter((listData) => !!listData.description)
  return <>{terms.map(buildListElementsWithIcons)}</>
}

export const AccountSettingsForm = ({
  patron,
  setIsFormValid,
  firstInputRef,
}: {
  firstInputRef: MutableRefObject<TextInputRefType>
  patron: Patron
  setIsFormValid: Dispatch<React.SetStateAction<boolean>>
}) => {
  const [formData, setFormData] = useState({
    phones: patron.phones[0]?.number,
    emails: patron.emails[0],
    notificationPreference:
      notificationPreferenceTuples.find(
        (pref) => pref[1] === patron.notificationPreference
      ) || notificationPreferenceTuples[0],
  })

  const handleInputChange = (e) => {
    const { value, name } = e.target
    const updatedFormData = { ...formData, [name]: value }
    setIsFormValid(isFormValid(updatedFormData))
    setFormData(updatedFormData)
  }

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
            const sortedPickupLocations = [
              patron.homeLibrary,
              ...filteredPickupLocations.filter(
                (loc) => loc.code.trim() !== patron.homeLibrary.code.trim()
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
                  <option
                    key={`location-option-${i}`}
                    value={`${loc.code}@${loc.name}`}
                  >
                    {loc.name}
                  </option>
                ))}
              </Select>
            )
          }
          break
        case "Notification preference":
          {
            inputField = (
              <Select
                onChange={handleInputChange}
                name={setting.field}
                id="notification-preference-selector"
                labelText="Update notification preference"
                showLabel={false}
                value={formData.notificationPreference}
              >
                {notificationPreferenceTuples.map((pref) => (
                  <option key={pref + "-option"} value={pref[0]}>
                    {pref[1]}
                  </option>
                ))}
              </Select>
            )
          }
          break
        case "Phone":
          inputField = (
            <TextInput
              ref={firstInputRef}
              name={setting.field}
              value={formData.phones}
              id="phone-text-input"
              labelText="Update phone number"
              showLabel={false}
              onChange={handleInputChange}
              placeholder="000-000-0000"
            />
          )
          break
        case "Email":
          inputField = (
            <TextInput
              name={setting.field}
              value={formData.emails}
              id="email-text-input"
              labelText="Update email"
              showLabel={false}
              onChange={handleInputChange}
            />
          )
          break
        case "Pin/Password":
          inputField = (
            <Box>
              <Text>****</Text>
              <PasswordModal patron={patron} />
            </Box>
          )
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
