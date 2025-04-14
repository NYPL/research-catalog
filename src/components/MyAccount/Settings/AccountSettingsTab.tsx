import { Flex } from "@nypl/design-system-react-components"
import { useContext, useEffect, useRef, useState } from "react"
import { PatronDataContext } from "../../../context/PatronDataContext"
import SettingsInputForm from "./SettingsInputForm"
import SettingsSelectForm from "./SettingsSelectForm"
import PasswordForm from "./PasswordForm"
import { StatusBanner } from "./StatusBanner"

type StatusType = "" | "failure" | "success"

const AccountSettingsTab = () => {
  const {
    updatedAccountData: { patron, pickupLocations },
  } = useContext(PatronDataContext)
  const [status, setStatus] = useState<StatusType>("")
  const [statusMessage, setStatusMessage] = useState<string>("")
  const [editingField, setEditingField] = useState<string>("")
  const bannerRef = useRef<HTMLDivElement>(null)

  const settingsState = {
    setStatus,
    editingField,
    setEditingField,
  }

  const passwordSettingsState = {
    ...settingsState,
    setStatusMessage,
  }

  useEffect(() => {
    if (status !== "" && bannerRef.current) {
      bannerRef.current.focus()
    }
  }, [status])

  return (
    <>
      {status !== "" && (
        <div ref={bannerRef} tabIndex={-1}>
          <StatusBanner status={status} statusMessage={statusMessage} />
        </div>
      )}
      <Flex flexDir="column" sx={{ marginTop: "m", gap: "s" }}>
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
        <PasswordForm
          settingsState={passwordSettingsState}
          patronData={patron}
        />
      </Flex>
    </>
  )
}

export default AccountSettingsTab
