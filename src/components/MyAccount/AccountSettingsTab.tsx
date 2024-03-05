import { Box, List, Spacer } from "@nypl/design-system-react-components"
import type { Patron } from "../../types/myAccountTypes"
import { buildListElementsWithIcons } from "./IconListElement"
import styles from "../../../styles/components/MyAccount.module.scss"
import AccountSettingsButtons from "./AccountSettingsButtons"

const buildAccountSettings = (settingsData: Patron) => {
  return [
    {
      icon: "communicationCall",
      term: "Phone:",
      description: settingsData.primaryPhone,
    },
    {
      icon: "communicationEmail",
      term: "Email:",
      description: settingsData.primaryEmail,
    },
    {
      icon: "communicationChatBubble",
      term: "Notification preference:",
      description: settingsData.notificationPreference,
    },
    {
      icon: "actionHome",
      term: "Home library:",
      description: settingsData.homeLibrary,
    },
    {
      icon: "actionLockClosed",
      term: "Pin/Password:",
      description: "****",
    },
  ]
    .filter((listData) => listData.description)
    .map(buildListElementsWithIcons)
}

const AccountSettingsTab = ({ settingsData }: { settingsData: Patron }) => {
  const accountSettingsData = buildAccountSettings(settingsData)

  return (
    <Box className={styles.accountSettingsTab}>
      <List
        sx={{ border: "none", h2: { border: "none" } }}
        className={styles.myAccountList}
        type="dl"
      >
        {accountSettingsData}
      </List>
      <Spacer />
      <AccountSettingsButtons />
    </Box>
  )
}

export default AccountSettingsTab
