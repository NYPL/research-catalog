import { Flex } from "@nypl/design-system-react-components"
import { useContext, useRef, useState } from "react"
import { PatronDataContext } from "../../../context/PatronDataContext"
import SettingsInputForm from "./SettingsInputForm"
import SettingsSelectForm from "./SettingsSelectForm"
import PasswordForm from "./PasswordForm"
import { StatusBanner } from "./StatusBanner"
import type { StatusBannerState } from "./StatusBanner"
import { idConstants } from "../../../context/FocusContext"

const AccountSettingsTab = () => {
  const {
    updatedAccountData: { patron, pickupLocations },
  } = useContext(PatronDataContext)
  const [status, setStatus] = useState<StatusBannerState | null>(null)
  const [editingField, setEditingField] = useState<string>("")
  const bannerRef = useRef<HTMLDivElement>(null)

  const settingsState = {
    setStatus,
    editingField,
    setEditingField,
  }

  const passwordSettingsState = {
    ...settingsState,
    setStatus,
  }

  return (
    <>
      {status && (
        <div
          id={idConstants.accountStatusBanner}
          tabIndex={-1}
          style={{ marginTop: "32px" }}
        >
          <StatusBanner type={status.type} message={status.message} />
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
