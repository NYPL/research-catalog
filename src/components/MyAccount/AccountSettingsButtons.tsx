import { Icon, Button } from "@nypl/design-system-react-components"
import { useState } from "react"

const AccountSettingsButtons = () => {
  const [currentlyEditing, setCurrentlyEditing] = useState(false)

  const toggleCurrentlyEditing = () => setCurrentlyEditing(!currentlyEditing)

  const editButton = (
    <Button
      id="edit-account-settings-button"
      buttonType="secondary"
      onClick={toggleCurrentlyEditing}
    >
      {/* {placeholder icon before pencil is included in DS} */}
      <Icon name="socialTwitter" align="left" size="medium" />
      Edit account Settings
    </Button>
  )

  const cancelAndSaveButtons = (
    <>
      <Button
        id="account-settings-cancel-update-button"
        screenreaderOnlyText="cancel account settings update"
        buttonType="secondary"
      >
        Cancel
      </Button>
      <Button id="account-settings-update-button" buttonType="primary">
        Save Changes
      </Button>
    </>
  )

  return currentlyEditing ? cancelAndSaveButtons : editButton
}

export default AccountSettingsButtons
