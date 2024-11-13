import { Flex, Banner, Link, Text } from "@nypl/design-system-react-components"
import { useContext, useEffect, useRef, useState } from "react"
import { PatronDataContext } from "../../../context/PatronDataContext"
import SettingsInputForm from "./SettingsInputForm"
import SettingsSelectForm from "./SettingsSelectForm"
import PasswordForm from "./PasswordForm"

const NewAccountSettingsTab = () => {
  const {
    updatedAccountData: { patron, pickupLocations },
  } = useContext(PatronDataContext)
  const [status, setStatus] = useState<string>("")
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
          <Banner
            sx={{ marginTop: "m" }}
            isDismissible
            content={
              <div style={{ alignItems: "center" }}>
                {status === "failure" ? (
                  statusMessage !== "" ? (
                    <Text marginBottom={0} color={"ui.black !important"}>
                      {statusMessage} Please try again or{" "}
                      <Link
                        sx={{
                          color: "ui.link.primary !important",
                          textDecorationColor: "ui.link.primary !important",
                          textDecoration: "underline",
                        }}
                        href="https://www.nypl.org/get-help/contact-us"
                      >
                        contact us
                      </Link>{" "}
                      for assistance.
                    </Text>
                  ) : (
                    <Text marginBottom={0} color={"ui.black !important"}>
                      Your changes were not saved.
                    </Text>
                  )
                ) : (
                  <Text marginBottom={0} color={"ui.black !important"}>
                    Your changes were saved.
                  </Text>
                )}
              </div>
            }
            type={status === "failure" ? "negative" : "positive"}
          />
        </div>
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
          settingsState={passwordSettingsState}
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

export default NewAccountSettingsTab
