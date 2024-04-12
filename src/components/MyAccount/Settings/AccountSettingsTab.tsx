import { Box, Form, List, Spacer } from "@nypl/design-system-react-components"
import { useState } from "react"
import type { Patron } from "../../../types/myAccountTypes"
import styles from "../../../../styles/components/MyAccount.module.scss"
import AccountSettingsButtons from "./AccountSettingsButtons"
import {
  AccountSettingsForm,
  AccountSettingsDisplay,
} from "./AccountSettingsDisplayOptions"
import { parsePayload } from "./AccountSettingsUtils"

const AccountSettingsTab = ({ settingsData }: { settingsData: Patron }) => {
  const [currentlyEditing, setCurrentlyEditing] = useState(false)
  const listElements = currentlyEditing ? (
    <AccountSettingsForm patron={settingsData} />
  ) : (
    <AccountSettingsDisplay patron={{ emails: [], ...settingsData }} />
  )

  const submitAccountSettings = (e) => {
    e.preventDefault()
    parsePayload(e.target, settingsData)
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
