import { useContext, useState } from "react"
import { PatronDataContext } from "../../../context/PatronDataContext"
import {
  Button,
  Flex,
  Icon,
  Select,
  SkeletonLoader,
  Text,
} from "@nypl/design-system-react-components"
import SettingsLabel from "./SettingsLabel"
import SaveCancelButtons from "./SaveCancelButtons"
import type { Patron, SierraCodeName } from "../../../types/myAccountTypes"

interface HomeLibraryNotificationFormProps {
  type: "library" | "notification"
  patronData: Patron
  setIsSuccess: (boolean) => void
  setIsFailure: (boolean) => void
  pickupLocations: SierraCodeName[]
}

const HomeLibraryNotificationForm = ({
  type,
  patronData,
  setIsSuccess,
  setIsFailure,
  pickupLocations,
}: HomeLibraryNotificationFormProps) => {
  const { getMostUpdatedSierraAccountData } = useContext(PatronDataContext)
  const [isLoading, setIsLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const notificationPreferenceMap = [
    { code: "z", name: "Email" },
    { code: "p", name: "Phone" },
    { code: "-", name: "None" },
  ]

  const sortedPickupLocations = [
    patronData.homeLibrary,
    ...pickupLocations.filter(
      (loc) => loc.code.trim() !== patronData.homeLibrary.code.trim()
    ),
  ]

  const options =
    type === "notification" ? notificationPreferenceMap : sortedPickupLocations

  const formUtils = {
    icon: type === "notification" ? "communicationChatBubble" : "actionHome",
    label: type === "notification" ? "Notification preference" : "Home library",
    selectorId:
      type === "notification"
        ? "notification-preference-selector"
        : "update-home-library-selector",
    body: (code) =>
      type === "notification"
        ? {
            fixedFields: { "268": { label: "Notice Preference", value: code } },
          }
        : { homeLibraryCode: `${code}` },
  }

  const [selection, setSelection] = useState(
    type === "notification"
      ? notificationPreferenceMap.find(
          (pref) => pref.code === patronData.notificationPreference
        )?.name
      : patronData.homeLibrary.name
  )
  const [tempSelection, setTempSelection] = useState(selection)

  const handleSelectChange = (event) => {
    setTempSelection(event.target.value)
  }

  const cancelEditing = () => {
    setIsEditing(false)
  }

  const submitSelection = async () => {
    setIsLoading(true)
    setIsEditing(false)

    const code =
      type === "notification"
        ? notificationPreferenceMap.find((pref) => pref.name === tempSelection)
            ?.code
        : pickupLocations.find((loc) => loc.name === tempSelection)?.code

    const body = formUtils.body(code)

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
        setIsSuccess(true)
        setSelection(tempSelection)
        setTempSelection(tempSelection)
      } else {
        setIsFailure(true)
        setTempSelection(tempSelection)
      }
    } catch (error) {
      console.error("Error submitting", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {isLoading ? (
        <SkeletonLoader contentSize={2} showImage={false} headingSize={0} />
      ) : (
        <Flex
          flexDir={{ base: "column", lg: "row" }}
          alignItems="flex-start"
          width="100%"
        >
          <SettingsLabel icon={formUtils.icon} text={formUtils.label} />
          {isEditing ? (
            <Flex
              sx={{ marginTop: "xs", marginLeft: { base: "l", lg: "unset" } }}
            >
              <Select
                maxWidth="320px"
                name={`select-${type}`}
                id={formUtils.selectorId}
                labelText={`Update ${formUtils.label.toLowerCase()}`}
                showLabel={false}
                onChange={handleSelectChange}
                value={tempSelection}
              >
                {options.map((option, index) => (
                  <option key={`${type}-option-${index}`} value={option.name}>
                    {option.name}
                  </option>
                ))}
              </Select>
            </Flex>
          ) : (
            <Flex>
              <Text
                sx={{
                  width: { base: "l", sm: "250px" },
                  marginTop: "xs",
                  marginLeft: { base: "l", lg: "unset" },
                  marginBottom: 0,
                }}
              >
                {selection}
              </Text>
              <Button
                id={`edit-${type}-button`}
                buttonType="text"
                onClick={() => setIsEditing(true)}
                sx={{
                  paddingLeft: "xs",
                  paddingRight: "xs",
                  marginLeft: "xxl",
                }}
              >
                <Icon name="editorMode" align="left" size="medium" />
                Edit
              </Button>
            </Flex>
          )}
          {isEditing && (
            <SaveCancelButtons
              onCancel={cancelEditing}
              onSave={submitSelection}
            />
          )}
        </Flex>
      )}
    </>
  )
}

export default HomeLibraryNotificationForm
