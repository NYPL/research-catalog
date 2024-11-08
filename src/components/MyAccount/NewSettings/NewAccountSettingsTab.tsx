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
  const [status, setStatus] = useState<[string, string?]>(["none"])
  const [editingField, setEditingField] = useState("")
  const bannerRef = useRef<HTMLDivElement>(null)

  const settingsState = {
    setStatus,
    editingField,
    setEditingField,
  }

  useEffect(() => {
    if (status[0] !== "none" && bannerRef.current) {
      bannerRef.current.focus()
    }
  }, [status])

  return (
    <>
      {status[0] !== "none" && (
        <div ref={bannerRef} tabIndex={-1}>
          <Banner
            sx={{ marginTop: "m" }}
            isDismissible
            content={
              <div style={{ alignItems: "center" }}>
                {status[0] === "failure" ? (
                  status[1] ? (
                    <Text marginBottom={0} color={"ui.black !important"}>
                      {status[1]} Please try again or{" "}
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
            type={status[0] === "failure" ? "negative" : "positive"}
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
          settingsState={settingsState}
          type="notification"
        />
        <PasswordForm settingsState={settingsState} patronData={patron} />
      </Flex>
    </>
  )
}

export default NewAccountSettingsTab
