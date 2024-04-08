import { Box, Form, List, Spacer } from "@nypl/design-system-react-components"
import { useState } from "react"
import type { Patron } from "../../../types/myAccountTypes"
import styles from "../../../../styles/components/MyAccount.module.scss"
import AccountSettingsButtons from "./AccountSettingsButtons"
import {
  AccountSettingsForm,
  AccountSettingsDisplay,
} from "./AccountSettingsDisplayOptions"
import { accountSettings } from "./AccountSettingsUtils"

const AccountSettingsTab = ({ settingsData }: { settingsData: Patron }) => {
  const [currentlyEditing, setCurrentlyEditing] = useState(false)
  const listElements = currentlyEditing ? (
    <AccountSettingsForm patron={settingsData} />
  ) : (
    <AccountSettingsDisplay patron={{ emails: [], ...settingsData }} />
  )
  const updateArrayValue = (newPrimary: string, currentValues: string[]) => {
    const removedNewPrimaryIfPresent = currentValues.filter(
      (val) => val !== newPrimary
    )
    return [newPrimary, ...removedNewPrimaryIfPresent]
  }
  const submitAccountSettings = (e) => {
    e.preventDefault()
    const payload = accountSettings.reduce((putRequestPayload, setting) => {
      const fieldValue = e.target[setting.field]?.value
      const field = setting.field
      console.log({ field, fieldValue })
      switch (field) {
        case "pin":
          // pin is handled in a separate dialog
          break
        case "email":
          putRequestPayload[field] = updateArrayValue(
            fieldValue,
            settingsData.emails
          )
          break
        // TODO: need input from product about phone type
        //case "phone"
        case "notificationPreference":
        case "homeLibrary":
          putRequestPayload[field] = fieldValue
      }
      return putRequestPayload
    }, {})
    console.log(payload)
  }
  return (
    <Box className={styles.accountSettingsTab}>
      <Form
        id="account-settings-container"
        onSubmit={(e) => submitAccountSettings(e)}
      >
        <AccountSettingsButtons
          currentlyEditing={currentlyEditing}
          setCurrentlyEditing={setCurrentlyEditing}
        />
        <List
          sx={{ border: "none", h2: { border: "none" } }}
          className={styles.myAccountList}
          type="dl"
        >
          {listElements}
        </List>
        <Spacer />
      </Form>
    </Box>
  )
}

export default AccountSettingsTab
