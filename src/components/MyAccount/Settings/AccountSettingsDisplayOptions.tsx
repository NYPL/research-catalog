import {
  Text,
  FormField,
  Select,
  TextInput,
  Box,
} from "@nypl/design-system-react-components"
import { notificationPreferenceTuples } from "../../../utils/myAccountUtils"
import type { Patron } from "../../../types/myAccountTypes"
import { accountSettings } from "./AccountSettingsUtils"
import { buildListElementsWithIcons } from "../IconListElement"
import type { Dispatch, JSX, ReactNode } from "react"
import { useState, useEffect, useCallback } from "react"
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
}: {
  patron: Patron
  setIsFormValid: Dispatch<React.SetStateAction<boolean>>
}) => {
  const [formData, setFormData] = useState({
    primaryPhone: patron.phones[0]?.number,
    email: patron.emails[0],
  })

  const isFormValid = useCallback(() => {
    const phoneRegex = /^(?:\D*\d){10}\D*$/
    if (patron.notificationPreference == "Phone") {
      return (
        formData.primaryPhone !== "" && phoneRegex.test(formData.primaryPhone)
      )
    } else if (patron.notificationPreference == "Email") {
      return formData.email !== ""
    } else return true
  }, [formData])

  useEffect(() => {
    setIsFormValid(isFormValid())
  }, [formData, isFormValid, setIsFormValid])

  const handleInputChange = (e) => {
    const { id, value } = e.target
    let updatedFormData = { ...formData }
    if (id === "phone-text-input") {
      updatedFormData = {
        ...updatedFormData,
        primaryPhone: value,
      }
    } else if (id === "email-text-input") {
      updatedFormData = {
        ...updatedFormData,
        email: value,
      }
    }
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
            const patronNotPref =
              notificationPreferenceTuples.find(
                (pref) => pref[1] === patron.notificationPreference
              ) || notificationPreferenceTuples[0]
            const sortedNotPrefs = [
              patronNotPref,
              ...notificationPreferenceTuples.filter(
                (pref) => pref[1] !== patronNotPref[1]
              ),
            ]
            inputField = (
              <Select
                name={setting.field}
                id="notification-preference-selector"
                labelText="Update notification preference"
                showLabel={false}
              >
                {sortedNotPrefs.map((pref) => (
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
              name={setting.field}
              defaultValue={patron.phones[0]?.number}
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
              defaultValue={patron.emails[0]}
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
