import { Box, List, Select, Spacer } from "@nypl/design-system-react-components"
import type { Patron } from "../../types/myAccountTypes"
import { buildListElementsWithIcons } from "./IconListElement"
import styles from "../../../styles/components/MyAccount.module.scss"
import AccountSettingsButtons from "./AccountSettingsButtons"
import AccountSettingsForm from "./AccountSettingsForm"

import { useState } from "react"

const buildAccountSettingsData = (settingsData: Patron) => {
  return [
    {
      dataProp: "primaryPhone",
      icon: "communicationCall",
      term: "Phone",
      description: settingsData.primaryPhone,
    },
    {
      dataProp: "primaryEmail",
      icon: "communicationEmail",
      term: "Email",
      description: settingsData.primaryEmail,
    },
    {
      dataProp: "notificationPreference",
      icon: "communicationChatBubble",
      term: "Notification preference",
      description: settingsData.notificationPreference,
    },
    {
      dataProp: "homeLibrary",
      icon: "actionHome",
      term: "Home library",
      description: settingsData.homeLibrary,
    },
    {
      icon: "actionLockClosed",
      term: "Pin/Password",
      description: "****",
    },
  ].filter((listData) => listData.description)
}

const buildAccountSettingsForm = (settingsData: Patron) => {
  return buildAccountSettingsData(settingsData).map((setting) => {
    let inputField
    switch (setting.term) {
      case "Home library":
        inputField = (
          <Select
            name="select"
            id="update-home-library-selector"
            labelText="Update home library"
            showLabel={false}
          >
            <option>another library</option>
          </Select>
        )
    }
  })
}

const buildAccountSettingsList = (settingsData: Patron) =>
  buildAccountSettingsData(settingsData).map(buildListElementsWithIcons)

const AccountSettingsTab = ({ settingsData }: { settingsData: Patron }) => {
  const accountSettingsListElements = buildAccountSettingsList(settingsData)
  // const accountSettingsFormElements =

  const [currentlyEditing, setCurrentlyEditing] = useState(false)

  return (
    <Box className={styles.accountSettingsTab}>
      {currentlyEditing ? (
        <AccountSettingsForm />
      ) : (
        <List
          sx={{ border: "none", h2: { border: "none" } }}
          className={styles.myAccountList}
          type="dl"
        >
          {accountSettingsListElements}
        </List>
      )}
      <Spacer />
      <AccountSettingsButtons
        currentlyEditing={currentlyEditing}
        setCurrentlyEditing={setCurrentlyEditing}
      />
    </Box>
  )
}

export default AccountSettingsTab
