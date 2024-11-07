import { Flex, Banner } from "@nypl/design-system-react-components"
import { useContext, useState } from "react"
import { PatronDataContext } from "../../../context/PatronDataContext"
import SettingsInputForm from "./SettingsInputForm"
import SettingsSelectForm from "./SettingsSelectForm"
import PasswordForm from "./PasswordForm"

const NewAccountSettingsTab = () => {
  const {
    updatedAccountData: { patron, pickupLocations },
  } = useContext(PatronDataContext)
  const [status, setStatus] = useState("none")
  const [editingField, setEditingField] = useState("")

  const settingsState = {
    setStatus,
    editingField,
    setEditingField,
  }

  return (
    <>
      {status !== "none" && (
        <Banner
          isDismissible
          content={
            <div style={{ alignItems: "center" }}>
              {status === "failure"
                ? "Your changes were not saved."
                : "Your changes were saved."}
            </div>
          }
          type={status === "failure" ? "warning" : "positive"}
          sx={{ marginTop: "m" }}
        />
      )}
      <Flex flexDir="column" sx={{ marginTop: "xl", gap: "s" }}>
        <SettingsInputForm
          patronData={patron}
          settingsState={settingsState}
          inputType="phones"
        />
        <SettingsInputForm
          patronData={patron}
          settingsState={settingsState}
          inputType="emails"
        />
        <SettingsSelectForm
          patronData={patron}
          pickupLocations={pickupLocations}
          settingsState={settingsState}
          type="library"
        />
        <SettingsSelectForm
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
