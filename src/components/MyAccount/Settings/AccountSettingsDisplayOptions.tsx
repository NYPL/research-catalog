import {
  Text,
  FormField,
  Select,
  TextInput,
  Box,
} from "@nypl/design-system-react-components"
import { notificationPreferenceTuples } from "../../../utils/myAccountUtils"
import type { Patron } from "../../../types/myAccountTypes"
import { accountSettings, getLibraryByCode } from "./AccountSettingsUtils"
import { buildListElementsWithIcons } from "../IconListElement"
import type { JSX, ReactNode } from "react"
import { useState, useEffect, useCallback, createRef } from "react"
import { filteredPickupLocations } from "../../../../__test__/fixtures/processedMyAccountData"
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
  onValidateForm,
}: {
  patron: Patron
  onValidateForm: (any) => void
}) => {
  const [formData, setFormData] = useState({
    primaryPhone: patron.phones[0]?.number,
    secondaryPhone: patron.phones[1]?.number,
    notificationPreference:
      patron.notificationPreference === "Phone" ? "p" : "z",
  })

  const validateForm = useCallback(() => {
    const regex = /^\d+$/
    if (patron.notificationPreference == "Mobile") {
      return formData.primaryPhone !== "" && regex.test(formData.primaryPhone)
    } else if (patron.notificationPreference == "Phone") {
      return (
        (formData.primaryPhone !== "" && regex.test(formData.primaryPhone)) ||
        (formData.secondaryPhone !== "" && regex.test(formData.secondaryPhone))
      )
    } else return true
  }, [formData])

  useEffect(() => {
    onValidateForm(validateForm())
  }, [formData, validateForm, onValidateForm])

  const handleInputChange = (e) => {
    const { id, value } = e.target
    let updatedFormData = { ...formData }
    if (id === "phone-text-input") {
      updatedFormData = {
        ...updatedFormData,
        primaryPhone: value,
      }
    } else if (id === "secondary-phone-text-input") {
      updatedFormData = {
        ...updatedFormData,
        secondaryPhone: value,
      }
    } else if (id === "notification-preference-selector") {
      updatedFormData = {
        ...updatedFormData,
        notificationPreference: value,
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
        case "Notification preference": {
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
              onChange={handleInputChange}
            >
              {sortedNotPrefs.map((pref) => (
                <option key={pref + "-option"} value={pref[0]}>
                  {pref[1]}
                </option>
              ))}
            </Select>
          )
          break
        }
        case "Phone":
          inputField = (
            <>
              <TextInput
                name={setting.field}
                defaultValue={patron.phones[0]?.number}
                id="phone-text-input"
                labelText="Mobile phone"
                showLabel={true}
                onChange={handleInputChange}
                isRequired
                showRequiredLabel={false}
              />
              <TextInput
                name={setting.field}
                defaultValue={patron.phones[1]?.number}
                id="secondary-phone-text-input"
                labelText="Home phone"
                onChange={handleInputChange}
                showLabel={true}
              />
            </>
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
          inputField = (
            <Box sx={{}}>
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
