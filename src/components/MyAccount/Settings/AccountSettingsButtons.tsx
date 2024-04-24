import { Icon, Button } from "@nypl/design-system-react-components"
import type { Dispatch } from "react"

interface AccountSettingsButtonsPropsType {
  currentlyEditing: boolean
  setCurrentlyEditing: Dispatch<React.SetStateAction<boolean>>
}

const AccountSettingsButtons = ({
  currentlyEditing,
  setCurrentlyEditing,
}: AccountSettingsButtonsPropsType) => {
  const toggleCurrentlyEditing = (doWeWantToEdit) =>
    setCurrentlyEditing(doWeWantToEdit)

  const editButton = (
    <Button
      id="edit-account-settings-button"
      buttonType="secondary"
      onClick={() => toggleCurrentlyEditing(true)}
    >
      {/* {placeholder icon before pencil is included in DS} */}
      <Icon name="editorMode" align="left" size="medium" />
      Edit account Settings
    </Button>
  )

  const cancelAndSaveButtons = (
    <>
      <Button
        onClick={() => toggleCurrentlyEditing(false)}
        id="account-settings-cancel-update-button"
        screenreaderOnlyText="cancel account settings update"
        buttonType="secondary"
      >
        Cancel
      </Button>
      <Button
        id="account-settings-update-button"
        // the click handler for this button is the onSubmit in AccountSettingsTab
        type="submit"
        buttonType="primary"
      >
        Save Changes
      </Button>
    </>
  )

  return currentlyEditing ? cancelAndSaveButtons : editButton
}

export default AccountSettingsButtons
