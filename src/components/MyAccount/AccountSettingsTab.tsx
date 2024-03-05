import { List } from "@nypl/design-system-react-components"
import type { Patron } from "../../types/myAccountTypes"
import { buildListElementsWithIcons } from "./IconListElement"
import styles from "../../../styles/components/MyAccount.module.scss"

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
    <List className={styles.myAccountList} type="dl">
      {accountSettingsData}
    </List>
  )
}

export default AccountSettingsTab
