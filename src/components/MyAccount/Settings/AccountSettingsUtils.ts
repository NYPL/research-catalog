import type { IconNames } from "@nypl/design-system-react-components"

export const accountSettings = [
  {
    field: "primaryPhone",
    icon: "communicationCall",
    term: "Phone",
  },
  {
    field: "primaryEmail",
    icon: "communicationEmail",
    term: "Email",
  },
  {
    field: "notificationPreference",
    icon: "communicationChatBubble",
    term: "Notification preference",
  },
  {
    field: "homeLibrary",
    icon: "actionHome",
    term: "Home library",
  },
  {
    field: "pin",
    icon: "actionLockClosed",
    term: "Pin/Password",
    description: "****",
  },
] as {
  field: string
  icon: IconNames
  term: string
  description: string | JSX.Element
}[]
