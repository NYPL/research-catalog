import { Box, Form, List, Spacer } from "@nypl/design-system-react-components"
import { useState } from "react"
import type { Patron } from "../../../types/myAccountTypes"
import styles from "../../../../styles/components/MyAccount.module.scss"
import AccountSettingsButtons from "./AccountSettingsButtons"
import {
  buildAccountSettingsForm,
  buildAccountSettingsDisplay,
} from "./AccountSettingsDisplayOptions"

const AccountSettingsTab = ({ settingsData }: { settingsData: Patron }) => {
  const [currentlyEditing, setCurrentlyEditing] = useState(false)
  const listElements = currentlyEditing
    ? buildAccountSettingsForm(settingsData)
    : buildAccountSettingsDisplay(settingsData)

  return (
    <Box className={styles.accountSettingsTab}>
      <Form id="account-settings-container">
        <List
          sx={{ border: "none", h2: { border: "none" } }}
          className={styles.myAccountList}
          type="dl"
        >
          {listElements}
        </List>

        <Spacer />
      </Form>
      <AccountSettingsButtons
        currentlyEditing={currentlyEditing}
        setCurrentlyEditing={setCurrentlyEditing}
      />
    </Box>
  )
}

export default AccountSettingsTab
