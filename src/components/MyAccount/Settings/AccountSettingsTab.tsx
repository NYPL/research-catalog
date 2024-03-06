import { Box, Form, List, Spacer } from "@nypl/design-system-react-components"
import { useState } from "react"
import type { Patron } from "../../../types/myAccountTypes"
import styles from "../../../../styles/components/MyAccount.module.scss"
import { accountSettings } from "./AccountSettingsUtils"
import AccountSettingsButtons from "./AccountSettingsButtons"
import { buildAccountSettingsForm } from "./AccountSettingsForm"
import { buildListElementsWithIcons } from "../IconListElement"

const AccountSettingsTab = ({ settingsData }: { settingsData: Patron }) => {
  const [currentlyEditing, setCurrentlyEditing] = useState(false)

  const buildAccountSettingsData = (settingsData: Patron) => {
    return accountSettings
      .map((setting) => {
        return {
          icon: setting.icon,
          term: setting.term,
          // pin is masked so description is a default "****"
          description: settingsData[setting.field] || setting.description,
        }
      })
      .filter((listData) => listData.description)
      .map(buildListElementsWithIcons)
  }

  const listElements = currentlyEditing
    ? buildAccountSettingsForm(settingsData)
    : buildAccountSettingsData(settingsData)

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
