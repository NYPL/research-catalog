import { Flex, Banner } from "@nypl/design-system-react-components"
import { useContext, useState } from "react"
import { PatronDataContext } from "../../../context/PatronDataContext"
import PhoneEmailForm from "./SettingsInputForm"
import HomeLibraryNotificationForm from "./SettingsSelectForm"
import PasswordForm from "./PasswordForm"

const NewAccountSettingsTab = () => {
  const {
    updatedAccountData: { patron, pickupLocations },
  } = useContext(PatronDataContext)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isFailure, setIsFailure] = useState(false)
  const [isOtherEditing, setIsOtherEditing] = useState(false)

  const settingsState = {
    setIsSuccess,
    setIsFailure,
    isOtherEditing,
    setIsOtherEditing,
  }

  return (
    <>
      {(isSuccess || isFailure) && (
        <Banner
          isDismissible
          content={
            <div style={{ alignItems: "center" }}>
              {isFailure
                ? "Your changes were not saved."
                : "Your changes were saved."}
            </div>
          }
          type={isFailure ? "warning" : "positive"}
          sx={{ marginTop: "m" }}
        />
      )}
      <Flex flexDir="column" sx={{ marginTop: "xl", gap: "s" }}>
        <PhoneEmailForm
          patronData={patron}
          settingsState={settingsState}
          inputType="phones"
        />
        <PhoneEmailForm
          patronData={patron}
          settingsState={settingsState}
          inputType="emails"
        />
        <HomeLibraryNotificationForm
          patronData={patron}
          pickupLocations={pickupLocations}
          settingsState={settingsState}
          type="library"
        />
        <HomeLibraryNotificationForm
          patronData={patron}
          pickupLocations={pickupLocations}
          settingsState={settingsState}
          type="notification"
        />
        <PasswordForm settingsState={settingsState} patronData={patron} />
      </Flex>
    </>
  )
}

export default NewAccountSettingsTab
