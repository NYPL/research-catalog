import { List } from "@nypl/design-system-react-components"
import type { Patron } from "../../types/myAccountTypes"
import { buildIconListElements } from "./IconListElement"

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
      description: settingsData.primaryPhone,
    },
  ]
  return <List type="dl">{listData.map(buildIconListElements)}</List>
}

export default AccountSettingsTab
