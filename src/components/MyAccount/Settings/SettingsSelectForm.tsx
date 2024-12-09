import { useContext, useRef, useState } from "react"
import { PatronDataContext } from "../../../context/PatronDataContext"
import {
  Flex,
  Select,
  SkeletonLoader,
  Text,
} from "@nypl/design-system-react-components"
import SettingsLabel from "./SettingsLabel"
import SaveCancelButtons from "./SaveCancelButtons"
import type { Patron, SierraCodeName } from "../../../types/myAccountTypes"
import EditButton from "./EditButton"

interface SettingsSelectFormProps {
  type: "library" | "notification"
  patronData: Patron
  settingsState
  pickupLocations: SierraCodeName[]
}

const SettingsSelectForm = ({
  type,
  patronData,
  settingsState,
  pickupLocations,
}: SettingsSelectFormProps) => {
  const { getMostUpdatedSierraAccountData } = useContext(PatronDataContext)
  const [isLoading, setIsLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [error, setError] = useState(false)

  const { setStatus, editingField, setEditingField } = settingsState
  const focusRef = useRef<HTMLSelectElement | HTMLButtonElement | null>()

  const notificationPreferenceMap =
    patronData.notificationPreference === "-"
      ? [
          { code: "z", name: "Email" },
          { code: "p", name: "Phone" },
          { code: "-", name: "None" },
        ]
      : [
          { code: "z", name: "Email" },
          { code: "p", name: "Phone" },
        ]

  const sortedPickupLocations = [
    patronData.homeLibrary,
    ...pickupLocations.filter(
      (loc) => loc.code.trim() !== patronData.homeLibrary.code.trim()
    ),
  ]

  const notificationFormUtils = {
    initialState: notificationPreferenceMap.find(
      (pref) => pref.code === patronData.notificationPreference
    )?.name,
    options: notificationPreferenceMap,
    icon: "communicationChatBubble",
    label: "Notification preference",
    selectorId: "notification-preference-selector",
  }

  const libraryFormUtils = {
    initialState: patronData.homeLibrary.name,
    options: sortedPickupLocations,
    icon: "actionHome",
    label: "Home library",
    selectorId: "update-home-library-selector",
  }

  const formUtils =
    type === "notification" ? notificationFormUtils : libraryFormUtils

  const [selection, setSelection] = useState(formUtils.initialState)

  const [tempSelection, setTempSelection] = useState(selection)

  const validateInput = (input) => {
    if (input == "Phone" && patronData.phones.length === 0) {
      setError(true)
    }
  }

  const handleSelectChange = (event) => {
    setTempSelection(event.target.value)
    validateInput(event.target.value)
  }

  const cancelEditing = () => {
    setIsEditing(false)
    setEditingField("")
    setTimeout(() => {
      focusRef.current?.focus()
    }, 0)
  }

  const submitSelection = async () => {
    setIsLoading(true)
    setIsEditing(false)
    setStatus("")
    const code =
      type === "notification"
        ? notificationPreferenceMap.find((pref) => pref.name === tempSelection)
            ?.code
        : pickupLocations.find((loc) => loc.name === tempSelection)?.code

    const body =
      type === "notification"
        ? {
            fixedFields: { "268": { label: "Notice Preference", value: code } },
          }
        : { homeLibraryCode: `${code}` }

    try {
      const response = await fetch(
        `/research/research-catalog/api/account/settings/${patronData.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      )

      if (response.status === 200) {
        await getMostUpdatedSierraAccountData()
        setStatus("success")
        setSelection(tempSelection)
        setTempSelection(tempSelection)
      } else {
        setStatus("failure")
        setTempSelection(tempSelection)
      }
    } catch (error) {
      console.error("Error submitting", error)
    } finally {
      setIsLoading(false)
      setEditingField("")
    }
  }

  return (
    <>
      <Flex
        flexDir={{ base: "column", lg: "row" }}
        alignItems="flex-start"
        width="100%"
      >
        <SettingsLabel icon={formUtils.icon} text={formUtils.label} />
        {isLoading ? (
          <SkeletonLoader
            sx={{ "> div": { marginTop: "-s" } }}
            contentSize={2}
            showImage={false}
            headingSize={0}
          />
        ) : isEditing ? (
          <Flex
            marginLeft={{ base: "m", lg: "unset" }}
            marginTop={{ base: "s", md: "unset" }}
            flexDir="column"
            alignItems="flex-start"
            width="-webkit-fill-available"
          >
            <Select
              ref={focusRef as React.Ref<HTMLSelectElement>}
              width={{ base: "100%", md: "max-content" }}
              name={`select-${type}`}
              id={formUtils.selectorId}
              labelText={`Update ${formUtils.label.toLowerCase()}`}
              showLabel={false}
              onChange={handleSelectChange}
              value={tempSelection}
            >
              {formUtils.options.map((option, index) => (
                <option key={`${type}-option-${index}`} value={option.name}>
                  {option.name}
                </option>
              ))}
            </Select>
          </Flex>
        ) : (
          <Flex marginLeft={{ base: "m", lg: "unset" }}>
            <Text
              sx={{
                marginTop: { base: "xs", lg: "unset" },
                width: { base: "200px", sm: "250px" },
                marginBottom: 0,
              }}
            >
              {selection}
            </Text>
            {editingField === "" && (
              <EditButton
                ref={focusRef as React.Ref<HTMLButtonElement>}
                buttonLabel={`Edit ${type}`}
                buttonId={`edit-${type}-button`}
                onClick={() => {
                  setIsEditing(true)
                  setEditingField(type)
                  setTimeout(() => {
                    focusRef.current?.focus()
                  }, 0)
                }}
              />
            )}
          </Flex>
        )}
        {isEditing && (
          <SaveCancelButtons
            inputType={type}
            onCancel={cancelEditing}
            onSave={submitSelection}
            isDisabled={error}
          />
        )}
      </Flex>
    </>
  )
}

export default SettingsSelectForm
