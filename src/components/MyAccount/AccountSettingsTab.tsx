import { List } from "@nypl/design-system-react-components"
import type { Patron } from "../../types/myAccountTypes"
import { buildListElementsWithIcons } from "./IconListElement"
import styles from "../../../styles/components/MyAccount.module.scss"
import PinUpdateModal from "./PinUpdateModal"

const AccountSettingsTab = ({ settingsData }: { settingsData: Patron }) => {
  const listData = [
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
  ].filter((listData) => listData.description)
  return (
    <>
      <List className={styles.myAccountList} type="dl">
        {listData.map(buildListElementsWithIcons)}
      </List>
      <PinUpdateModal patron={settingsData} />
    </>
  )
}

export default AccountSettingsTab
